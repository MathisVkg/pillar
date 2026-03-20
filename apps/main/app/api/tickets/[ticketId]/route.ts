import { prisma } from "@pillar/database";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

type Params = { params: Promise<{ ticketId: string }> };

export async function GET(_req: Request, { params }: Params) {
	const session = await auth();
	if (!session?.user?.isAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { ticketId } = await params;

	const ticket = await prisma.ticket.findUnique({
		where: { id: ticketId },
		select: {
			id: true,
			reference: true,
			title: true,
			description: true,
			status: true,
			priority: true,
			source: true,
			isBillable: true,
			resolvedAt: true,
			createdAt: true,
			updatedAt: true,
			client: { select: { id: true, name: true, hourlyRate: true } },
			timeEntries: {
				orderBy: { loggedAt: "desc" },
				select: {
					id: true,
					description: true,
					durationMinutes: true,
					hourlyRate: true,
					isBillable: true,
					isInvoiced: true,
					loggedAt: true,
				},
			},
		},
	});

	if (!ticket) {
		return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
	}

	const totalMinutes = ticket.timeEntries.reduce((sum, e) => sum + e.durationMinutes, 0);

	return NextResponse.json({
		...ticket,
		client: { ...ticket.client, hourlyRate: Number(ticket.client.hourlyRate) },
		timeEntries: ticket.timeEntries.map((e) => ({
			...e,
			hourlyRate: Number(e.hourlyRate),
			loggedAt: e.loggedAt.toISOString(),
		})),
		totalMinutes,
		resolvedAt: ticket.resolvedAt?.toISOString() ?? null,
		createdAt: ticket.createdAt.toISOString(),
		updatedAt: ticket.updatedAt.toISOString(),
	});
}

const VALID_STATUSES = ["open", "in_progress", "done", "closed"] as const;
const VALID_PRIORITIES = ["low", "normal", "high", "urgent"] as const;
const VALID_SOURCES = ["manual", "phone", "whatsapp", "email", "portal"] as const;

export async function PATCH(req: Request, { params }: Params) {
	const session = await auth();
	if (!session?.user?.isAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { ticketId } = await params;
	const body = await req.json();
	const { status, priority, title, description, source, isBillable } = body;

	// Validate enums if provided
	if (status && !VALID_STATUSES.includes(status as (typeof VALID_STATUSES)[number])) {
		return NextResponse.json({ error: "Invalid status" }, { status: 400 });
	}
	if (priority && !VALID_PRIORITIES.includes(priority as (typeof VALID_PRIORITIES)[number])) {
		return NextResponse.json({ error: "Invalid priority" }, { status: 400 });
	}
	if (source && !VALID_SOURCES.includes(source as (typeof VALID_SOURCES)[number])) {
		return NextResponse.json({ error: "Invalid source" }, { status: 400 });
	}

	// Auto-set resolvedAt when moving to "done", clear it when moving away
	let resolvedAt: Date | null | undefined = undefined;
	if (status === "done") {
		resolvedAt = new Date();
	} else if (status && status !== "done") {
		resolvedAt = null;
	}

	const ticket = await prisma.ticket.update({
		where: { id: ticketId },
		data: {
			...(status && { status }),
			...(priority && { priority }),
			...(title?.trim() && { title: title.trim() }),
			...(description !== undefined && { description: description?.trim() || null }),
			...(resolvedAt !== undefined && { resolvedAt }),
			...(source && { source }),
			...(isBillable !== undefined && { isBillable }),
		},
		select: {
			id: true,
			status: true,
			priority: true,
			title: true,
			description: true,
			source: true,
			isBillable: true,
			resolvedAt: true,
			updatedAt: true,
		},
	});

	return NextResponse.json({
		...ticket,
		resolvedAt: ticket.resolvedAt?.toISOString() ?? null,
		updatedAt: ticket.updatedAt.toISOString(),
	});
}

export async function DELETE(_req: Request, { params }: Params) {
	const session = await auth();
	if (!session?.user?.isAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { ticketId } = await params;

	const invoicedCount = await prisma.timeEntry.count({
		where: { ticketId, isInvoiced: true },
	});

	if (invoicedCount > 0) {
		return NextResponse.json(
			{ error: "This ticket has invoiced time entries and cannot be deleted. Remove the invoice link first." },
			{ status: 400 },
		);
	}

	await prisma.$transaction([
		prisma.timeEntry.deleteMany({ where: { ticketId } }),
		prisma.ticket.delete({ where: { id: ticketId } }),
	]);

	return new NextResponse(null, { status: 204 });
}
