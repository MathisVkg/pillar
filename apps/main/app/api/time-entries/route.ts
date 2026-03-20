import { prisma } from "@pillar/database";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// ─── GET — list entries (optionally filtered by clientId and invoiced status) ──

export async function GET(req: Request) {
	const session = await auth();
	if (!session?.user?.isAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { searchParams } = new URL(req.url);
	const clientId = searchParams.get("clientId") ?? undefined;
	const invoicedParam = searchParams.get("invoiced");
	const isInvoiced = invoicedParam === "true" ? true : invoicedParam === "false" ? false : undefined;

	const entries = await prisma.timeEntry.findMany({
		where: {
			...(clientId && { clientId }),
			...(isInvoiced !== undefined && { isInvoiced }),
		},
		orderBy: { loggedAt: "desc" },
		select: {
			id: true,
			description: true,
			durationMinutes: true,
			hourlyRate: true,
			isBillable: true,
			isInvoiced: true,
			loggedAt: true,
			ticket: { select: { id: true, reference: true } },
		},
	});

	return NextResponse.json(
		entries.map((e) => ({
			...e,
			hourlyRate: Number(e.hourlyRate),
			loggedAt: e.loggedAt.toISOString(),
		})),
	);
}

export async function POST(req: Request) {
	const session = await auth();
	if (!session?.user?.isAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const body = await req.json();
	const { clientId, ticketId, description, durationMinutes, hourlyRate, isBillable, loggedAt } = body;

	if (!clientId) return NextResponse.json({ error: "Client is required" }, { status: 400 });
	if (!description?.trim()) return NextResponse.json({ error: "Description is required" }, { status: 400 });
	if (!durationMinutes || durationMinutes <= 0) {
		return NextResponse.json({ error: "Duration must be greater than 0" }, { status: 400 });
	}
	if (!hourlyRate || hourlyRate < 0) {
		return NextResponse.json({ error: "Hourly rate is required" }, { status: 400 });
	}

	// Verify client exists
	const client = await prisma.client.findUnique({ where: { id: clientId }, select: { id: true } });
	if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

	// Verify ticket belongs to client (if provided)
	if (ticketId) {
		const ticket = await prisma.ticket.findUnique({ where: { id: ticketId }, select: { clientId: true } });
		if (!ticket || ticket.clientId !== clientId) {
			return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
		}
	}

	const entry = await prisma.timeEntry.create({
		data: {
			clientId,
			ticketId: ticketId ?? null,
			description: description.trim(),
			durationMinutes: Math.round(durationMinutes),
			hourlyRate,
			isBillable: isBillable !== false,
			loggedAt: loggedAt ? new Date(loggedAt) : new Date(),
		},
		select: {
			id: true,
			description: true,
			durationMinutes: true,
			hourlyRate: true,
			isBillable: true,
			isInvoiced: true,
			loggedAt: true,
		},
	});

	return NextResponse.json(
		{
			...entry,
			hourlyRate: Number(entry.hourlyRate),
			loggedAt: entry.loggedAt.toISOString(),
		},
		{ status: 201 }
	);
}
