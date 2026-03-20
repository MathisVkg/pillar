import { prisma } from "@pillar/database";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

type Params = { params: Promise<{ invoiceId: string }> };

const INVOICE_SELECT = {
	id: true,
	number: true,
	status: true,
	periodStart: true,
	periodEnd: true,
	subtotal: true,
	vatRate: true,
	vatAmount: true,
	total: true,
	dueDate: true,
	paidAt: true,
	notes: true,
	createdAt: true,
	updatedAt: true,
	client: {
		select: {
			id: true,
			name: true,
			contractType: true,
			hourlyRate: true,
			retainerHours: true,
			retainerFee: true,
			vatNumber: true,
			address: true,
			city: true,
		},
	},
	timeEntries: {
		orderBy: { loggedAt: "asc" as const },
		select: {
			id: true,
			description: true,
			durationMinutes: true,
			hourlyRate: true,
			loggedAt: true,
			isBillable: true,
			ticket: { select: { id: true, reference: true } },
		},
	},
} as const;

function serializeInvoice(inv: Awaited<ReturnType<typeof fetchInvoice>>) {
	if (!inv) return null;
	return {
		...inv,
		subtotal: Number(inv.subtotal),
		vatRate: Number(inv.vatRate),
		vatAmount: Number(inv.vatAmount),
		total: Number(inv.total),
		periodStart: inv.periodStart.toISOString(),
		periodEnd: inv.periodEnd.toISOString(),
		dueDate: inv.dueDate.toISOString(),
		paidAt: inv.paidAt?.toISOString() ?? null,
		createdAt: inv.createdAt.toISOString(),
		updatedAt: inv.updatedAt.toISOString(),
		client: {
			...inv.client,
			hourlyRate: Number(inv.client.hourlyRate),
			retainerFee: inv.client.retainerFee ? Number(inv.client.retainerFee) : null,
		},
		timeEntries: inv.timeEntries.map((e) => ({
			...e,
			hourlyRate: Number(e.hourlyRate),
			loggedAt: e.loggedAt.toISOString(),
		})),
	};
}

async function fetchInvoice(invoiceId: string) {
	return prisma.invoice.findUnique({
		where: { id: invoiceId },
		select: INVOICE_SELECT,
	});
}

// ─── GET ───────────────────────────────────────────────────────────────────────

export async function GET(_req: Request, { params }: Params) {
	const session = await auth();
	if (!session?.user?.isAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { invoiceId } = await params;
	const invoice = await fetchInvoice(invoiceId);

	if (!invoice) {
		return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
	}

	return NextResponse.json(serializeInvoice(invoice));
}

// ─── PATCH ─────────────────────────────────────────────────────────────────────

const VALID_STATUS_TRANSITIONS: Record<string, string[]> = {
	draft: ["sent"],
	sent: ["paid"],
	paid: [],
	overdue: ["paid"],
};

export async function PATCH(req: Request, { params }: Params) {
	const session = await auth();
	if (!session?.user?.isAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { invoiceId } = await params;
	const body = await req.json();
	const { status, paidAt, notes, periodStart, periodEnd, dueDate } = body;

	const existing = await prisma.invoice.findUnique({
		where: { id: invoiceId },
		select: { id: true, status: true },
	});

	if (!existing) {
		return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
	}

	// Block edits on paid/voided invoices
	if (existing.status === "paid" || existing.status === "voided") {
		if (periodStart !== undefined || periodEnd !== undefined || dueDate !== undefined || notes !== undefined) {
			return NextResponse.json(
				{ error: "Cannot edit a paid or voided invoice" },
				{ status: 400 },
			);
		}
	}

	// Validate status transition
	if (status !== undefined) {
		const allowed = VALID_STATUS_TRANSITIONS[existing.status] ?? [];
		if (!allowed.includes(status)) {
			return NextResponse.json(
				{ error: `Cannot transition from "${existing.status}" to "${status}"` },
				{ status: 400 },
			);
		}
	}

	const updateData: Record<string, unknown> = {};
	if (status !== undefined) updateData.status = status;
	if (notes !== undefined) updateData.notes = notes?.trim() || null;
	if (periodStart !== undefined) updateData.periodStart = new Date(periodStart);
	if (periodEnd !== undefined) updateData.periodEnd = new Date(periodEnd);
	if (dueDate !== undefined) updateData.dueDate = new Date(dueDate);
	if (status === "paid") {
		updateData.paidAt = paidAt ? new Date(paidAt) : new Date();
	}

	const updated = await prisma.invoice.update({
		where: { id: invoiceId },
		data: updateData,
		select: INVOICE_SELECT,
	});

	return NextResponse.json(serializeInvoice(updated));
}

// ─── DELETE — void invoice (draft or sent; never paid) ─────────────────────────

export async function DELETE(_req: Request, { params }: Params) {
	const session = await auth();
	if (!session?.user?.isAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { invoiceId } = await params;

	const invoice = await prisma.invoice.findUnique({
		where: { id: invoiceId },
		select: { id: true, status: true },
	});

	if (!invoice) {
		return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
	}

	if (invoice.status === "paid") {
		return NextResponse.json(
			{ error: "Paid invoices cannot be voided" },
			{ status: 400 },
		);
	}

	if (invoice.status === "voided") {
		return NextResponse.json(
			{ error: "Invoice is already voided" },
			{ status: 400 },
		);
	}

	// Soft-void: keep the row, unlink entries
	await prisma.$transaction([
		prisma.timeEntry.updateMany({
			where: { invoiceId },
			data: { isInvoiced: false, invoiceId: null },
		}),
		prisma.invoice.update({
			where: { id: invoiceId },
			data: { status: "voided" },
		}),
	]);

	return new NextResponse(null, { status: 204 });
}
