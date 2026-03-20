import { prisma } from "@pillar/database";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const VALID_STATUSES = ["open", "in_progress", "done", "closed"] as const;
const VALID_PRIORITIES = ["low", "normal", "high", "urgent"] as const;
const VALID_SOURCES = ["phone", "whatsapp", "email", "portal", "manual"] as const;

export async function GET(req: Request) {
	const session = await auth();
	if (!session?.user?.isAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { searchParams } = new URL(req.url);
	const clientId = searchParams.get("clientId") ?? undefined;
	const status = searchParams.get("status") ?? undefined;
	const priority = searchParams.get("priority") ?? undefined;

	const tickets = await prisma.ticket.findMany({
		where: {
			...(clientId && { clientId }),
			...(status && VALID_STATUSES.includes(status as (typeof VALID_STATUSES)[number]) && { status }),
			...(priority && VALID_PRIORITIES.includes(priority as (typeof VALID_PRIORITIES)[number]) && { priority }),
		},
		orderBy: { createdAt: "desc" },
		select: {
			id: true,
			reference: true,
			title: true,
			status: true,
			priority: true,
			source: true,
			isBillable: true,
			createdAt: true,
			client: { select: { id: true, name: true } },
		},
	});

	return NextResponse.json(
		tickets.map((t) => ({ ...t, createdAt: t.createdAt.toISOString() }))
	);
}

export async function POST(req: Request) {
	const session = await auth();
	if (!session?.user?.isAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const body = await req.json();
	const { clientId, title, description, priority, source, isBillable } = body;

	if (!clientId) return NextResponse.json({ error: "Client is required" }, { status: 400 });
	if (!title?.trim()) return NextResponse.json({ error: "Title is required" }, { status: 400 });

	// Verify client exists
	const client = await prisma.client.findUnique({ where: { id: clientId }, select: { id: true } });
	if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });

	// Generate next reference number using MAX on the numeric part
	const result = await prisma.$queryRaw<[{ maxRef: bigint | null }]>`
		SELECT MAX(CAST(SUBSTRING(reference, 2) AS UNSIGNED)) AS maxRef FROM ticket
	`;
	const nextNum = (Number(result[0]?.maxRef) || 0) + 1;
	const reference = `#${String(nextNum).padStart(3, "0")}`;

	const ticket = await prisma.ticket.create({
		data: {
			clientId,
			title: title.trim(),
			description: description?.trim() || null,
			reference,
			priority: VALID_PRIORITIES.includes(priority) ? priority : "normal",
			source: VALID_SOURCES.includes(source) ? source : "manual",
			isBillable: isBillable !== false,
		},
		select: {
			id: true,
			reference: true,
			title: true,
			status: true,
			priority: true,
			source: true,
			isBillable: true,
			createdAt: true,
			client: { select: { id: true, name: true } },
		},
	});

	return NextResponse.json(
		{ ...ticket, createdAt: ticket.createdAt.toISOString() },
		{ status: 201 }
	);
}
