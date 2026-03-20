import { prisma } from "@pillar/database";
import { getT, type Lang } from "@/lib/i18n";
import TicketsView from "./TicketsView";
import type { Metadata } from "next";

type Props = {
	params: Promise<{ locale: string }>;
	searchParams: Promise<{ clientId?: string; status?: string; priority?: string; showDeactivated?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = getT(locale as Lang);
	return { title: `${t("tickets.title")} \u00B7 Pillar` };
}

const VALID_STATUSES = ["open", "in_progress", "done", "closed"] as const;
const VALID_PRIORITIES = ["low", "normal", "high", "urgent"] as const;

export default async function TicketsPage({ searchParams }: Props) {
	const { clientId, status, priority, showDeactivated } = await searchParams;
	const includeDeactivated = showDeactivated === "1";

	const [rawTickets, allClients] = await Promise.all([
		prisma.ticket.findMany({
			where: {
				...(clientId && { clientId }),
				...(!clientId && !includeDeactivated && { client: { isActive: true } }),
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
				client: { select: { id: true, name: true, isActive: true } },
			},
		}),
		prisma.client.findMany({
			orderBy: { name: "asc" },
			select: { id: true, name: true, isActive: true },
		}),
	]);

	const tickets = rawTickets.map((t) => ({
		...t,
		createdAt: t.createdAt.toISOString(),
	}));

	return (
		<TicketsView
			tickets={tickets}
			clients={allClients}
			filterClientId={clientId}
			filterStatus={status}
			filterPriority={priority}
			showDeactivated={includeDeactivated}
		/>
	);
}
