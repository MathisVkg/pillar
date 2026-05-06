import { Prisma, prisma } from "@pillar/database";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MAX_NUMBER_RETRIES = 5;

type GeneratedInvoice = {
	id: string;
	number: string;
	status: string;
	subtotal: Prisma.Decimal;
	vatRate: Prisma.Decimal;
	vatAmount: Prisma.Decimal;
	total: Prisma.Decimal;
	periodStart: Date;
	periodEnd: Date;
	dueDate: Date;
	createdAt: Date;
};

async function nextInvoiceNumber(): Promise<string> {
	const year = new Date().getFullYear();
	const prefix = `INV-${year}-`;

	const last = await prisma.invoice.findFirst({
		where: { number: { startsWith: prefix } },
		orderBy: { number: "desc" },
		select: { number: true },
	});

	const seq = last ? (Number(last.number.slice(prefix.length)) || 0) + 1 : 1;
	return `${prefix}${String(seq).padStart(3, "0")}`;
}

function isUniqueConstraintError(error: unknown): boolean {
	return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}

function round2(n: number): number {
	return Math.round(n * 100) / 100;
}

function parseBillingPeriodDate(value: unknown, boundary: "start" | "end"): Date | null {
	if (typeof value !== "string" || value.trim() === "") return null;

	const datePart = value.trim().match(/^(\d{4})-(\d{2})-(\d{2})/);
	if (datePart) {
		const [, y, m, d] = datePart;
		const date = new Date(Number(y), Number(m) - 1, Number(d));
		if (Number.isNaN(date.getTime())) return null;
		if (boundary === "start") date.setHours(0, 0, 0, 0);
		else date.setHours(23, 59, 59, 999);
		return date;
	}

	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? null : date;
}

// ─── GET — invoice list ────────────────────────────────────────────────────────

export async function GET() {
	const session = await auth();
	if (!session?.user?.isAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const invoices = await prisma.invoice.findMany({
		orderBy: { createdAt: "desc" },
		select: {
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
			createdAt: true,
			client: { select: { id: true, name: true } },
		},
	});

	return NextResponse.json(
		invoices.map((inv) => ({
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
		})),
	);
}

// ─── POST — generate invoice ───────────────────────────────────────────────────

export async function POST(req: Request) {
	const session = await auth();
	if (!session?.user?.isAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const body = await req.json();
	const { clientId, periodStart: rawPeriodStart, periodEnd: rawPeriodEnd, dueDate: rawDueDate } = body;

	if (!clientId) {
		return NextResponse.json({ error: "clientId is required" }, { status: 400 });
	}

	const now = new Date();
	const periodStart = rawPeriodStart
		? parseBillingPeriodDate(rawPeriodStart, "start")
		: new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
	const periodEnd = rawPeriodEnd
		? parseBillingPeriodDate(rawPeriodEnd, "end")
		: now;

	if (!periodStart || !periodEnd) {
		return NextResponse.json({ error: "Valid periodStart and periodEnd are required" }, { status: 400 });
	}
	if (periodStart > periodEnd) {
		return NextResponse.json({ error: "periodStart must be before or equal to periodEnd" }, { status: 400 });
	}

	// Fetch client (need retainer info for subtotal calculation)
	const client = await prisma.client.findUnique({
		where: { id: clientId, isActive: true },
		select: { id: true, contractType: true, hourlyRate: true, retainerHours: true, retainerFee: true },
	});
	if (!client) {
		return NextResponse.json({ error: "Client not found" }, { status: 404 });
	}

	// Fetch unbilled billable entries inside the selected billing period.
	const entries = await prisma.timeEntry.findMany({
		where: {
			clientId,
			isBillable: true,
			isInvoiced: false,
			loggedAt: { gte: periodStart, lte: periodEnd },
		},
		select: { id: true, durationMinutes: true, hourlyRate: true },
	});

	if (entries.length === 0) {
		return NextResponse.json(
			{ error: "No unbilled entries for this client in the selected period" },
			{ status: 400 },
		);
	}

	// ── Calculate financials ────────────────────────────────────────────────────
	const totalMinutes = entries.reduce((s, e) => s + e.durationMinutes, 0);
	const totalHours = totalMinutes / 60;

	let subtotal: number;

	if (
		client.contractType === "retainer" &&
		client.retainerFee != null &&
		client.retainerHours != null
	) {
		// Retainer: flat fee covers included hours; only extra hours are billed additionally
		const extraHours = Math.max(totalHours - client.retainerHours, 0);
		subtotal = round2(Number(client.retainerFee) + extraHours * Number(client.hourlyRate));
	} else {
		// Ad hoc: sum per-entry (each entry's own rate snapshot)
		subtotal = round2(
			entries.reduce((s, e) => s + (e.durationMinutes / 60) * Number(e.hourlyRate), 0),
		);
	}

	const vatRate = 0.21;
	const vatAmount = round2(subtotal * vatRate);
	const total = round2(subtotal + vatAmount);

	// ── Period & due date ───────────────────────────────────────────────────────
	const dueDate = rawDueDate
		? new Date(rawDueDate)
		: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

	const entryIds = entries.map((e) => e.id);

	// ── Transaction: create invoice + mark entries ──────────────────────────────
	let invoice: GeneratedInvoice | null = null;

	for (let attempt = 1; attempt <= MAX_NUMBER_RETRIES; attempt++) {
		const number = await nextInvoiceNumber();

		try {
			invoice = await prisma.$transaction(async (tx) => {
				const created = await tx.invoice.create({
					data: {
						clientId,
						number,
						status: "draft",
						periodStart,
						periodEnd,
						subtotal,
						vatRate,
						vatAmount,
						total,
						dueDate,
					},
					select: {
						id: true,
						number: true,
						status: true,
						subtotal: true,
						vatRate: true,
						vatAmount: true,
						total: true,
						periodStart: true,
						periodEnd: true,
						dueDate: true,
						createdAt: true,
					},
				});

				await tx.timeEntry.updateMany({
					where: { id: { in: entryIds } },
					data: { isInvoiced: true, invoiceId: created.id },
				});

				return created;
			});
			break;
		} catch (error) {
			if (!isUniqueConstraintError(error)) throw error;
			if (attempt === MAX_NUMBER_RETRIES) {
				return NextResponse.json(
					{ error: "Could not generate a unique invoice number. Please try again." },
					{ status: 500 },
				);
			}
		}
	}

	if (!invoice) {
		return NextResponse.json(
			{ error: "Could not generate invoice. Please try again." },
			{ status: 500 },
		);
	}

	return NextResponse.json(
		{
			...invoice,
			subtotal: Number(invoice.subtotal),
			vatRate: Number(invoice.vatRate),
			vatAmount: Number(invoice.vatAmount),
			total: Number(invoice.total),
			periodStart: invoice.periodStart.toISOString(),
			periodEnd: invoice.periodEnd.toISOString(),
			dueDate: invoice.dueDate.toISOString(),
			createdAt: invoice.createdAt.toISOString(),
		},
		{ status: 201 },
	);
}
