import { prisma } from "@pillar/database";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const VALID_TYPES = ["hardware", "software", "license", "camera", "network"] as const;
const VALID_STATUSES = ["ok", "warning", "critical", "retired"] as const;
const VALID_SENSITIVITIES = ["normal", "restricted", "internal"] as const;

export async function GET(req: Request) {
	const session = await auth();
	if (!session?.user?.isAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { searchParams } = new URL(req.url);
	const clientId = searchParams.get("clientId") ?? undefined;
	const type = searchParams.get("type") ?? undefined;
	const status = searchParams.get("status") ?? undefined;

	const assets = await prisma.asset.findMany({
		where: {
			...(clientId && { clientId }),
			...(type && VALID_TYPES.includes(type as (typeof VALID_TYPES)[number]) && { type }),
			...(status && VALID_STATUSES.includes(status as (typeof VALID_STATUSES)[number]) && { status }),
		},
		orderBy: [{ client: { name: "asc" } }, { name: "asc" }],
		select: {
			id: true,
			name: true,
			type: true,
			serialNumber: true,
			assignedTo: true,
			status: true,
			sensitivity: true,
			showSerialInPortal: true,
			warrantyExpiresAt: true,
			purchasedAt: true,
			notes: true,
			createdAt: true,
			client: { select: { id: true, name: true } },
		},
	});

	return NextResponse.json(
		assets.map((a) => ({
			...a,
			warrantyExpiresAt: a.warrantyExpiresAt?.toISOString().slice(0, 10) ?? null,
			purchasedAt: a.purchasedAt?.toISOString().slice(0, 10) ?? null,
			createdAt: a.createdAt.toISOString(),
		}))
	);
}

export async function POST(req: Request) {
	const session = await auth();
	if (!session?.user?.isAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const body = await req.json();
	const { clientId, name, type, serialNumber, assignedTo, status, sensitivity, notes, warrantyExpiresAt, purchasedAt, showSerialInPortal } = body;

	if (!clientId) return NextResponse.json({ error: "Client is required" }, { status: 400 });
	if (!name?.trim()) return NextResponse.json({ error: "Name is required" }, { status: 400 });
	if (!type || !VALID_TYPES.includes(type)) return NextResponse.json({ error: "Valid type is required" }, { status: 400 });

	const client = await prisma.client.findUnique({ where: { id: clientId }, select: { id: true } });
	if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

	const asset = await prisma.asset.create({
		data: {
			clientId,
			name: name.trim(),
			type,
			serialNumber: serialNumber?.trim() || null,
			assignedTo: assignedTo?.trim() || null,
			status: VALID_STATUSES.includes(status) ? status : "ok",
			sensitivity: VALID_SENSITIVITIES.includes(sensitivity) ? sensitivity : "normal",
			notes: notes?.trim() || null,
			showSerialInPortal: showSerialInPortal === true,
			warrantyExpiresAt: warrantyExpiresAt ? new Date(warrantyExpiresAt) : null,
			purchasedAt: purchasedAt ? new Date(purchasedAt) : null,
		},
		select: {
			id: true,
			name: true,
			type: true,
			serialNumber: true,
			assignedTo: true,
			status: true,
			sensitivity: true,
			showSerialInPortal: true,
			warrantyExpiresAt: true,
			purchasedAt: true,
			notes: true,
			createdAt: true,
			client: { select: { id: true, name: true } },
		},
	});

	return NextResponse.json(
		{
			...asset,
			warrantyExpiresAt: asset.warrantyExpiresAt?.toISOString().slice(0, 10) ?? null,
			purchasedAt: asset.purchasedAt?.toISOString().slice(0, 10) ?? null,
			createdAt: asset.createdAt.toISOString(),
		},
		{ status: 201 }
	);
}
