import { prisma } from "@pillar/database";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
	const session = await auth();
	if (!session?.user?.isAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const clients = await prisma.client.findMany({
		where: {
			isActive: true,
			timeEntries: { some: { isBillable: true, isInvoiced: false } },
		},
		orderBy: { name: "asc" },
		select: {
			id: true,
			name: true,
			contractType: true,
			hourlyRate: true,
			retainerHours: true,
			retainerFee: true,
			timeEntries: {
				where: { isBillable: true, isInvoiced: false },
				orderBy: { loggedAt: "desc" },
				select: {
					id: true,
					description: true,
					durationMinutes: true,
					hourlyRate: true,
					loggedAt: true,
					ticket: { select: { id: true, reference: true } },
				},
			},
		},
	});

	const result = clients.map((c) => {
		const totalMinutes = c.timeEntries.reduce((s, e) => s + e.durationMinutes, 0);
		const totalAmount = c.timeEntries.reduce(
			(s, e) => s + (e.durationMinutes / 60) * Number(e.hourlyRate),
			0,
		);
		return {
			clientId: c.id,
			clientName: c.name,
			contractType: c.contractType,
			hourlyRate: Number(c.hourlyRate),
			retainerHours: c.retainerHours,
			retainerFee: c.retainerFee ? Number(c.retainerFee) : null,
			totalMinutes,
			totalAmount,
			entries: c.timeEntries.map((e) => ({
				id: e.id,
				description: e.description,
				durationMinutes: e.durationMinutes,
				hourlyRate: Number(e.hourlyRate),
				loggedAt: e.loggedAt.toISOString(),
				ticket: e.ticket,
			})),
		};
	});

	return NextResponse.json(result);
}
