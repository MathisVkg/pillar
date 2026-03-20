import { prisma } from "@pillar/database";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const VALID_TYPES = ["software", "hardware", "service", "retainer"] as const;

type Params = { params: Promise<{ contractId: string }> };

export async function PATCH(req: Request, { params }: Params) {
	const session = await auth();
	if (!session?.user?.isAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { contractId } = await params;
	const body = await req.json();

	const data: Record<string, unknown> = {};
	if (body.name !== undefined) data.name = body.name.trim();
	if (body.vendor !== undefined) data.vendor = body.vendor?.trim() || null;
	if (body.type !== undefined && VALID_TYPES.includes(body.type)) data.type = body.type;
	if (body.renewalDate !== undefined) data.renewalDate = new Date(body.renewalDate);
	if (body.costPerYear !== undefined) data.costPerYear = body.costPerYear != null ? Number(body.costPerYear) : null;
	if (body.autoRenews !== undefined) data.autoRenews = Boolean(body.autoRenews);
	if (body.notes !== undefined) data.notes = body.notes?.trim() || null;

	const contract = await prisma.contract.update({
		where: { id: contractId },
		data,
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

	const now = new Date();
	now.setHours(0, 0, 0, 0);
	const renewal = new Date(contract.renewalDate);
	renewal.setHours(0, 0, 0, 0);
	const daysUntilRenewal = Math.ceil((renewal.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

	return NextResponse.json({
		...contract,
		costPerYear: contract.costPerYear ? Number(contract.costPerYear) : null,
		renewalDate: contract.renewalDate.toISOString().slice(0, 10),
		createdAt: contract.createdAt.toISOString(),
		daysUntilRenewal,
	});
}

export async function DELETE(_req: Request, { params }: Params) {
	const session = await auth();
	if (!session?.user?.isAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { contractId } = await params;
	await prisma.contract.delete({ where: { id: contractId } });
	return new NextResponse(null, { status: 204 });
}
