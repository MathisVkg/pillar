import { prisma } from "@pillar/database";
import { auth } from "@/lib/auth";
import { generateInvoicePdf } from "@/lib/pdf";
import { NextResponse } from "next/server";

// Must run in Node.js runtime — @react-pdf/renderer requires Node APIs
export const runtime = "nodejs";

type Params = { params: Promise<{ invoiceId: string }> };

export async function GET(_req: Request, { params }: Params) {
	const session = await auth();
	if (!session?.user?.isAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { invoiceId } = await params;

	const invoice = await prisma.invoice.findUnique({
		where: { id: invoiceId },
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
			notes: true,
			createdAt: true,
			client: {
				select: {
					name: true,
					contractType: true,
					hourlyRate: true,
					retainerHours: true,
					retainerFee: true,
					vatNumber: true,
					address: true,
					city: true,
					language: true,
				},
			},
			timeEntries: {
				orderBy: { loggedAt: "asc" },
				select: {
					id: true,
					description: true,
					durationMinutes: true,
					hourlyRate: true,
					loggedAt: true,
					ticket: { select: { reference: true } },
				},
			},
		},
	});

	if (!invoice) {
		return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
	}

	const pdfData = {
		number: invoice.number,
		status: invoice.status,
		periodStart: invoice.periodStart.toISOString(),
		periodEnd: invoice.periodEnd.toISOString(),
		subtotal: Number(invoice.subtotal),
		vatRate: Number(invoice.vatRate),
		vatAmount: Number(invoice.vatAmount),
		total: Number(invoice.total),
		dueDate: invoice.dueDate.toISOString(),
		paidAt: invoice.paidAt?.toISOString() ?? null,
		notes: invoice.notes,
		createdAt: invoice.createdAt.toISOString(),
		client: {
			name: invoice.client.name,
			contractType: invoice.client.contractType,
			hourlyRate: Number(invoice.client.hourlyRate),
			retainerHours: invoice.client.retainerHours,
			retainerFee: invoice.client.retainerFee ? Number(invoice.client.retainerFee) : null,
			vatNumber: invoice.client.vatNumber,
			address: invoice.client.address,
			city: invoice.client.city,
			language: invoice.client.language,
		},
		timeEntries: invoice.timeEntries.map((e) => ({
			id: e.id,
			description: e.description,
			durationMinutes: e.durationMinutes,
			hourlyRate: Number(e.hourlyRate),
			loggedAt: e.loggedAt.toISOString(),
			ticket: e.ticket,
		})),
	};

	const buffer = await generateInvoicePdf(pdfData);
	const filename = `${invoice.number}.pdf`;

	return new Response(new Uint8Array(buffer), {
		status: 200,
		headers: {
			"Content-Type": "application/pdf",
			"Content-Disposition": `attachment; filename="${filename}"`,
			"Content-Length": String(buffer.length),
		},
	});
}
