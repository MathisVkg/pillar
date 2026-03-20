import { prisma } from "@pillar/database";
import { getT, type Lang } from "@/lib/i18n";
import ContractsView from "./ContractsView";
import type { Metadata } from "next";

type Props = {
	params: Promise<{ locale: string }>;
	searchParams: Promise<{ clientId?: string; type?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = getT(locale as Lang);
	return { title: `${t("contracts.title")} · Pillar` };
}

function daysUntilRenewal(renewalDate: Date): number {
	const now = new Date();
	now.setHours(0, 0, 0, 0);
	const renewal = new Date(renewalDate);
	renewal.setHours(0, 0, 0, 0);
	return Math.ceil((renewal.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export default async function ContractsPage({ searchParams }: Props) {
	const { clientId, type } = await searchParams;

	const VALID_TYPES = ["software", "hardware", "service", "retainer"];

	const [rawContracts, allClients] = await Promise.all([
		prisma.contract.findMany({
			where: {
				...(clientId && { clientId }),
				...(type && VALID_TYPES.includes(type) && { type }),
			},
			orderBy: { renewalDate: "asc" },
			select: {
				id: true,
				name: true,
				vendor: true,
				type: true,
				renewalDate: true,
				costPerYear: true,
				autoRenews: true,
				notes: true,
				createdAt: true,
				client: { select: { id: true, name: true } },
			},
		}),
		prisma.client.findMany({
			where: { isActive: true },
			orderBy: { name: "asc" },
			select: { id: true, name: true },
		}),
	]);

	const contracts = rawContracts.map((c) => ({
		...c,
		costPerYear: c.costPerYear ? Number(c.costPerYear) : null,
		renewalDate: c.renewalDate.toISOString().slice(0, 10),
		createdAt: c.createdAt.toISOString(),
		daysUntilRenewal: daysUntilRenewal(c.renewalDate),
	}));

	return (
		<ContractsView
			contracts={contracts}
			clients={allClients}
			filterClientId={clientId}
			filterType={type}
		/>
	);
}
