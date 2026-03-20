import { prisma } from "@pillar/database";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

type Params = { params: Promise<{ clientId: string }> };

export async function GET(_req: Request, { params }: Params) {
	const session = await auth();
	if (!session?.user?.isAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { clientId } = await params;

	const client = await prisma.client.findUnique({
		where: { id: clientId },
		select: {
			id: true,
			name: true,
			slug: true,
			vatNumber: true,
			address: true,
			city: true,
			language: true,
			contractType: true,
			retainerHours: true,
			retainerFee: true,
			hourlyRate: true,
			isActive: true,
			_count: {
				select: {
					users: true,
					tickets: true,
				},
			},
		},
	});

	if (!client) {
		return NextResponse.json({ error: "Client not found" }, { status: 404 });
	}

	// Ticket counts by status
	const ticketGroups = await prisma.ticket.groupBy({
		by: ["status"],
		where: { clientId },
		_count: { id: true },
	});
	const ticketsByStatus: Record<string, number> = {};
	for (const g of ticketGroups) {
		ticketsByStatus[g.status] = g._count.id;
	}

	// Total unbilled minutes (billable, not yet invoiced)
	const unbilledAgg = await prisma.timeEntry.aggregate({
		where: { clientId, isBillable: true, isInvoiced: false },
		_sum: { durationMinutes: true },
	});

	return NextResponse.json({
		...client,
		hourlyRate: Number(client.hourlyRate),
		retainerFee: client.retainerFee ? Number(client.retainerFee) : null,
		ticketsByStatus,
		totalUnbilledMinutes: unbilledAgg._sum.durationMinutes ?? 0,
		portalUserCount: client._count.users,
	});
}

const VALID_CONTRACT_TYPES = ["adhoc", "retainer"] as const;
const VALID_LANGUAGES = ["fr", "nl", "en"] as const;

export async function PATCH(req: Request, { params }: Params) {
	const session = await auth();
	if (!session?.user?.isAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { clientId } = await params;
	const body = await req.json();
	const { name, contractType, hourlyRate, language, vatNumber, address, city, retainerHours, retainerFee, isActive } = body;

	if (name !== undefined && !name?.trim()) {
		return NextResponse.json({ error: "Name cannot be empty" }, { status: 400 });
	}

	const clientData = {
		...(name?.trim() && { name: name.trim() }),
		...(contractType && VALID_CONTRACT_TYPES.includes(contractType) && { contractType }),
		...(hourlyRate !== undefined && { hourlyRate: Number(hourlyRate) }),
		...(language && VALID_LANGUAGES.includes(language) && { language }),
		...(vatNumber !== undefined && { vatNumber: vatNumber?.trim() || null }),
		...(address !== undefined && { address: address?.trim() || null }),
		...(city !== undefined && { city: city?.trim() || null }),
		...(retainerHours !== undefined && { retainerHours: retainerHours ? Number(retainerHours) : null }),
		...(retainerFee !== undefined && { retainerFee: retainerFee ? Number(retainerFee) : null }),
		...(isActive !== undefined && { isActive }),
	};

	const SELECT = {
		id: true,
		name: true,
		slug: true,
		vatNumber: true,
		address: true,
		city: true,
		language: true,
		contractType: true,
		retainerHours: true,
		retainerFee: true,
		hourlyRate: true,
		isActive: true,
	} as const;

	// When toggling isActive, sync all portal users in the same transaction
	const client = isActive !== undefined
		? await prisma.$transaction(async (tx) => {
				const updated = await tx.client.update({
					where: { id: clientId },
					data: clientData,
					select: SELECT,
				});
				await tx.clientUser.updateMany({
					where: { clientId },
					data: { isActive },
				});
				return updated;
			})
		: await prisma.client.update({
				where: { id: clientId },
				data: clientData,
				select: SELECT,
			});

	return NextResponse.json({
		...client,
		hourlyRate: Number(client.hourlyRate),
		retainerFee: client.retainerFee ? Number(client.retainerFee) : null,
	});
}

export async function DELETE(_req: Request, { params }: Params) {
	const session = await auth();
	if (!session?.user?.isAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { clientId } = await params;

	await prisma.client.update({
		where: { id: clientId },
		data: { isActive: false },
	});

	return new NextResponse(null, { status: 204 });
}
