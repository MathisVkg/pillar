import { prisma } from "@pillar/database";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

function days(from: Date, to: Date): number {
	const f = new Date(from); f.setHours(0, 0, 0, 0);
	const t = new Date(to);   t.setHours(0, 0, 0, 0);
	return Math.ceil((t.getTime() - f.getTime()) / (1000 * 60 * 60 * 24));
}

export async function GET() {
	const session = await auth();
	if (!session?.user?.isAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const now = new Date();
	const in60Days = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);

	const [
		openTickets,
		activeClientCount,
		rawUnbilledEntries,
		rawWarranties,
		rawRenewals,
		rawAssetCounts,
	] = await Promise.all([
		prisma.ticket.count({
			where: { status: { in: ["open", "in_progress"] }, client: { isActive: true } },
		}),
		prisma.client.count({ where: { isActive: true } }),
		prisma.timeEntry.findMany({
			where: { isInvoiced: false, isBillable: true, client: { isActive: true } },
			select: {
				durationMinutes: true,
				hourlyRate: true,
				clientId: true,
				client: { select: { id: true, name: true } },
			},
		}),
		prisma.asset.findMany({
			where: {
				warrantyExpiresAt: { lte: in60Days },
				status: { not: "retired" },
				client: { isActive: true },
			},
			orderBy: { warrantyExpiresAt: "asc" },
			select: {
				id: true,
				name: true,
				warrantyExpiresAt: true,
				client: { select: { id: true, name: true } },
			},
		}),
		prisma.contract.findMany({
			where: {
				renewalDate: { lte: in60Days },
				client: { isActive: true },
			},
			orderBy: { renewalDate: "asc" },
			select: {
				id: true,
				name: true,
				vendor: true,
				renewalDate: true,
				costPerYear: true,
				client: { select: { id: true, name: true } },
			},
		}),
		prisma.asset.groupBy({
			by: ["status"],
			where: { client: { isActive: true }, status: { in: ["ok", "warning", "critical"] } },
			_count: { _all: true },
		}),
	]);

	// Aggregate unbilled by client
	const clientMap = new Map<string, { id: string; name: string; minutes: number; amount: number }>();
	for (const e of rawUnbilledEntries) {
		const cur = clientMap.get(e.clientId) ?? { id: e.clientId, name: e.client.name, minutes: 0, amount: 0 };
		cur.minutes += e.durationMinutes;
		cur.amount += (e.durationMinutes / 60) * Number(e.hourlyRate);
		clientMap.set(e.clientId, cur);
	}
	const unbilledByClient = Array.from(clientMap.values())
		.sort((a, b) => b.amount - a.amount)
		.map((c) => ({ ...c, amount: Math.round(c.amount * 100) / 100 }));

	// Expiring warranties with days
	const expiringWarranties = rawWarranties.map((a) => ({
		id: a.id,
		name: a.name,
		clientId: a.client.id,
		clientName: a.client.name,
		warrantyExpiresAt: a.warrantyExpiresAt!.toISOString().slice(0, 10),
		daysLeft: days(now, a.warrantyExpiresAt!),
	}));

	// Upcoming renewals
	const upcomingRenewals = rawRenewals.map((c) => ({
		id: c.id,
		name: c.name,
		vendor: c.vendor,
		clientId: c.client.id,
		clientName: c.client.name,
		renewalDate: c.renewalDate.toISOString().slice(0, 10),
		daysUntilRenewal: days(now, c.renewalDate),
		costPerYear: c.costPerYear ? Number(c.costPerYear) : null,
	}));

	// Asset health summary
	const assetHealthSummary: Record<string, number> = { ok: 0, warning: 0, critical: 0 };
	for (const row of rawAssetCounts) {
		assetHealthSummary[row.status] = row._count._all;
	}

	return NextResponse.json({
		openTickets,
		activeClientCount,
		unbilledByClient,
		expiringWarranties,
		upcomingRenewals,
		assetHealthSummary,
	});
}
