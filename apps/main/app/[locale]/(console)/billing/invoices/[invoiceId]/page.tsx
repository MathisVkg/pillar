import { prisma } from "@pillar/database";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import InvoiceDetailView, { type InvoiceDetail } from "./InvoiceDetailView";

type Props = { params: Promise<{ invoiceId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { invoiceId } = await params;
	const inv = await prisma.invoice.findUnique({
		where: { id: invoiceId },
		select: { number: true },
	});
	return { title: inv ? `${inv.number} · Pillar` : "Invoice · Pillar" };
}

export default async function InvoiceDetailPage({ params }: Props) {
	await auth();

	const { invoiceId } = await params;

	const raw = await prisma.invoice.findUnique({
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
				orderBy: { loggedAt: "asc" },
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
		},
	});

	if (!raw) notFound();

	const invoice: InvoiceDetail = {
		...raw,
		subtotal: Number(raw.subtotal),
		vatRate: Number(raw.vatRate),
		vatAmount: Number(raw.vatAmount),
		total: Number(raw.total),
		periodStart: raw.periodStart.toISOString(),
		periodEnd: raw.periodEnd.toISOString(),
		dueDate: raw.dueDate.toISOString(),
		paidAt: raw.paidAt?.toISOString() ?? null,
		createdAt: raw.createdAt.toISOString(),
		updatedAt: raw.updatedAt.toISOString(),
		client: {
			...raw.client,
			hourlyRate: Number(raw.client.hourlyRate),
			retainerFee: raw.client.retainerFee ? Number(raw.client.retainerFee) : null,
		},
		timeEntries: raw.timeEntries.map((e) => ({
			...e,
			hourlyRate: Number(e.hourlyRate),
			loggedAt: e.loggedAt.toISOString(),
		})),
	};

	return <InvoiceDetailView invoice={invoice} />;
}
