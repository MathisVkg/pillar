import { prisma } from "@pillar/database";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

type Params = { params: Promise<{ entryId: string }> };

export async function PATCH(req: Request, { params }: Params) {
	const session = await auth();
	if (!session?.user?.isAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { entryId } = await params;

	const existing = await prisma.timeEntry.findUnique({
		where: { id: entryId },
		select: { id: true, isInvoiced: true },
	});
	if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
	if (existing.isInvoiced) {
		return NextResponse.json({ error: "This entry has been invoiced and cannot be edited" }, { status: 409 });
	}

	const body = await req.json();
	const { description, durationMinutes, hourlyRate, isBillable, loggedAt } = body;

	if (durationMinutes !== undefined && durationMinutes <= 0) {
		return NextResponse.json({ error: "Duration must be greater than 0" }, { status: 400 });
	}

	const entry = await prisma.timeEntry.update({
		where: { id: entryId },
		data: {
			...(description?.trim() && { description: description.trim() }),
			...(durationMinutes !== undefined && { durationMinutes: Math.round(durationMinutes) }),
			...(hourlyRate !== undefined && { hourlyRate: Number(hourlyRate) }),
			...(isBillable !== undefined && { isBillable }),
			...(loggedAt && { loggedAt: new Date(loggedAt) }),
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

	return NextResponse.json({
		...entry,
		hourlyRate: Number(entry.hourlyRate),
		loggedAt: entry.loggedAt.toISOString(),
	});
}

export async function DELETE(_req: Request, { params }: Params) {
	const session = await auth();
	if (!session?.user?.isAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { entryId } = await params;

	const existing = await prisma.timeEntry.findUnique({
		where: { id: entryId },
		select: { id: true, isInvoiced: true },
	});
	if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
	if (existing.isInvoiced) {
		return NextResponse.json({ error: "This entry has been invoiced and cannot be deleted" }, { status: 409 });
	}

	await prisma.timeEntry.delete({ where: { id: entryId } });

	return new NextResponse(null, { status: 204 });
}
