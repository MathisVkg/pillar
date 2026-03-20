import { prisma } from "@pillar/database";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const VALID_TYPES = ["hardware", "software", "license", "camera", "network"] as const;
const VALID_STATUSES = ["ok", "warning", "critical", "retired"] as const;
const VALID_SENSITIVITIES = ["normal", "restricted", "internal"] as const;

type Params = { params: Promise<{ assetId: string }> };

export async function GET(_req: Request, { params }: Params) {
	const session = await auth();
	if (!session?.user?.isAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { assetId } = await params;
	const asset = await prisma.asset.findUnique({
		where: { id: assetId },
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

	if (!asset) return NextResponse.json({ error: "Not found" }, { status: 404 });

	return NextResponse.json({
		...asset,
		warrantyExpiresAt: asset.warrantyExpiresAt?.toISOString().slice(0, 10) ?? null,
		purchasedAt: asset.purchasedAt?.toISOString().slice(0, 10) ?? null,
		createdAt: asset.createdAt.toISOString(),
	});
}

export async function PATCH(req: Request, { params }: Params) {
	const session = await auth();
	if (!session?.user?.isAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { assetId } = await params;
	const body = await req.json();

	const data: Record<string, unknown> = {};
	if (body.name !== undefined) data.name = body.name.trim();
	if (body.type !== undefined && VALID_TYPES.includes(body.type)) data.type = body.type;
	if (body.serialNumber !== undefined) data.serialNumber = body.serialNumber?.trim() || null;
	if (body.assignedTo !== undefined) data.assignedTo = body.assignedTo?.trim() || null;
	if (body.status !== undefined && VALID_STATUSES.includes(body.status)) data.status = body.status;
	if (body.sensitivity !== undefined && VALID_SENSITIVITIES.includes(body.sensitivity)) data.sensitivity = body.sensitivity;
	if (body.notes !== undefined) data.notes = body.notes?.trim() || null;
	if (body.showSerialInPortal !== undefined) data.showSerialInPortal = Boolean(body.showSerialInPortal);
	if (body.warrantyExpiresAt !== undefined) data.warrantyExpiresAt = body.warrantyExpiresAt ? new Date(body.warrantyExpiresAt) : null;
	if (body.purchasedAt !== undefined) data.purchasedAt = body.purchasedAt ? new Date(body.purchasedAt) : null;

	const asset = await prisma.asset.update({
		where: { id: assetId },
		data,
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

	return NextResponse.json({
		...asset,
		warrantyExpiresAt: asset.warrantyExpiresAt?.toISOString().slice(0, 10) ?? null,
		purchasedAt: asset.purchasedAt?.toISOString().slice(0, 10) ?? null,
		createdAt: asset.createdAt.toISOString(),
	});
}

export async function DELETE(_req: Request, { params }: Params) {
	const session = await auth();
	if (!session?.user?.isAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { assetId } = await params;
	await prisma.asset.delete({ where: { id: assetId } });
	return new NextResponse(null, { status: 204 });
}
