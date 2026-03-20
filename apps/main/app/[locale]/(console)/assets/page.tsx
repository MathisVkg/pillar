import { prisma } from "@pillar/database";
import { getT, type Lang } from "@/lib/i18n";
import AssetsView from "./AssetsView";
import type { Metadata } from "next";

type Props = {
	params: Promise<{ locale: string }>;
	searchParams: Promise<{ clientId?: string; type?: string; status?: string; search?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = getT(locale as Lang);
	return { title: `${t("assets.title")} · Pillar` };
}

export default async function AssetsPage({ params, searchParams }: Props) {
	const { clientId, type, status } = await searchParams;

	const VALID_TYPES = ["hardware", "software", "license", "camera", "network"];
	const VALID_STATUSES = ["ok", "warning", "critical", "retired"];

	const [rawAssets, allClients] = await Promise.all([
		prisma.asset.findMany({
			where: {
				...(clientId && { clientId }),
				...(type && VALID_TYPES.includes(type) && { type }),
				...(status && VALID_STATUSES.includes(status) && { status }),
			},
			orderBy: [{ client: { name: "asc" } }, { name: "asc" }],
			select: {
				id: true,
				name: true,
				type: true,
				serialNumber: true,
				assignedTo: true,
				status: true,
				sensitivity: true,
				warrantyExpiresAt: true,
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

	const assets = rawAssets.map((a) => ({
		...a,
		warrantyExpiresAt: a.warrantyExpiresAt?.toISOString().slice(0, 10) ?? null,
		createdAt: a.createdAt.toISOString(),
	}));

	return (
		<AssetsView
			assets={assets}
			clients={allClients}
			filterClientId={clientId}
			filterType={type}
			filterStatus={status}
		/>
	);
}
