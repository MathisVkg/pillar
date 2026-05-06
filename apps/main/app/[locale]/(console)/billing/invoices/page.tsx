import { prisma } from "@pillar/database";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { isInvoiceStatus } from "@/lib/billing/invoice-status";
import { getT, type Lang } from "@/lib/i18n";
import InvoicesView, { type ClientOption, type InvoiceRow } from "./InvoicesView";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params;
	const t = getT(locale as Lang);
	return { title: `${t("billing.invoices")} 00B7 Pillar` };
}

type Props = {
	searchParams: Promise<{ status?: string; clientId?: string }>;
};

export default async function InvoicesPage({ searchParams }: Props) {
	await auth();

	const { status, clientId } = await searchParams;

	const validStatus = isInvoiceStatus(status) ? status : undefined;

	const [rawInvoices, allClients] = await Promise.all([
		prisma.invoice.findMany({
			where: {
				...(validStatus && { status: validStatus }),
				...(clientId && { clientId }),
			},
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
		}),
		prisma.client.findMany({
			orderBy: { name: "asc" },
			select: { id: true, name: true },
		}),
	]);

	const invoices: InvoiceRow[] = rawInvoices.map((inv) => ({
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
	}));

	const clients: ClientOption[] = allClients;

	return (
		<InvoicesView
			invoices={invoices}
			clients={clients}
			filterStatus={validStatus}
			filterClientId={clientId}
		/>
	);
}
