import { prisma } from "@pillar/database";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const VALID_TYPES = ["software", "hardware", "service", "retainer"] as const;

function daysUntilRenewal(renewalDate: Date): number {
	const now = new Date();
	now.setHours(0, 0, 0, 0);
	const renewal = new Date(renewalDate);
	renewal.setHours(0, 0, 0, 0);
	return Math.ceil((renewal.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export async function GET(req: Request) {
	const session = await auth();
	if (!session?.user?.isAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { searchParams } = new URL(req.url);
	const clientId = searchParams.get("clientId") ?? undefined;
	const type = searchParams.get("type") ?? undefined;

	const contracts = await prisma.contract.findMany({
		where: {
			...(clientId && { clientId }),
			...(type && VALID_TYPES.includes(type as (typeof VALID_TYPES)[number]) && { type }),
		},
		orderBy: { renewalDate: "asc" },
		select: {
			id: true,
			name: true,
			vendor: true,
			type: true,
			renewalDate: true,
			costPerYear: true,
			autoRenews: true,
			notes: true,
			createdAt: true,
			client: { select: { id: true, name: true } },
		},
	});

	return NextResponse.json(
		contracts.map((c) => ({
			...c,
			costPerYear: c.costPerYear ? Number(c.costPerYear) : null,
			renewalDate: c.renewalDate.toISOString().slice(0, 10),
			createdAt: c.createdAt.toISOString(),
			daysUntilRenewal: daysUntilRenewal(c.renewalDate),
		}))
	);
}

export async function POST(req: Request) {
	const session = await auth();
	if (!session?.user?.isAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const body = await req.json();
	const { clientId, name, type, renewalDate, vendor, costPerYear, autoRenews, notes } = body;

	if (!clientId) return NextResponse.json({ error: "Client is required" }, { status: 400 });
	if (!name?.trim()) return NextResponse.json({ error: "Name is required" }, { status: 400 });
	if (!renewalDate) return NextResponse.json({ error: "Renewal date is required" }, { status: 400 });
	if (!type || !VALID_TYPES.includes(type)) return NextResponse.json({ error: "Valid type is required" }, { status: 400 });

	const client = await prisma.client.findUnique({ where: { id: clientId }, select: { id: true } });
	if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

	const contract = await prisma.contract.create({
		data: {
			clientId,
			name: name.trim(),
			type,
			renewalDate: new Date(renewalDate),
			vendor: vendor?.trim() || null,
			costPerYear: costPerYear != null ? Number(costPerYear) : null,
			autoRenews: autoRenews === true,
			notes: notes?.trim() || null,
		},
		select: {
			id: true,
			name: true,
			vendor: true,
			type: true,
			renewalDate: true,
			costPerYear: true,
			autoRenews: true,
			notes: true,
			createdAt: true,
			client: { select: { id: true, name: true } },
		},
	});

	return NextResponse.json(
		{
			...contract,
			costPerYear: contract.costPerYear ? Number(contract.costPerYear) : null,
			renewalDate: contract.renewalDate.toISOString().slice(0, 10),
			createdAt: contract.createdAt.toISOString(),
			daysUntilRenewal: daysUntilRenewal(contract.renewalDate),
		},
		{ status: 201 }
	);
}
