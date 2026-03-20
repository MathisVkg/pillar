import { prisma } from "@pillar/database";
import { notFound } from "next/navigation";
import ClientDetailView, { type ClientData, type TicketRow, type TimeEntryRow } from "./ClientDetailView";
import type { PortalUser } from "./PortalUsersView";
import type { AssetRow } from "../../assets/AssetsView";
import type { ContractRow } from "../../contracts/ContractsView";
import type { Metadata } from "next";

type Props = {
	params: Promise<{ clientId: string }>;
	searchParams: Promise<{ tab?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { clientId } = await params;
	const client = await prisma.client.findUnique({ where: { id: clientId }, select: { name: true } });
	return { title: client ? `${client.name} · Pillar` : "Client · Pillar" };
}

export default async function ClientDetailPage({ params, searchParams }: Props) {
	const { clientId } = await params;
	const { tab } = await searchParams;

	const [rawClient, rawTickets, rawEntries, rawUsers, rawAssets, rawContracts] = await Promise.all([
		prisma.client.findUnique({
			where: { id: clientId },
			select: {
				id: true,
				name: true,
				slug: true,
				vatNumber: true,
				address: true,
				city: true,
				language: true,
				contractType: true,
				retainerHours: true,
				retainerFee: true,
				hourlyRate: true,
				isActive: true,
			},
		}),
		prisma.ticket.findMany({
			where: { clientId },
			orderBy: { createdAt: "desc" },
			select: {
				id: true,
				reference: true,
				title: true,
				status: true,
				priority: true,
				source: true,
				createdAt: true,
			},
		}),
		prisma.timeEntry.findMany({
			where: { clientId, isInvoiced: false },
			orderBy: { loggedAt: "desc" },
			select: {
				id: true,
				description: true,
				durationMinutes: true,
				hourlyRate: true,
				isBillable: true,
				loggedAt: true,
				ticket: { select: { id: true, reference: true } },
			},
		}),
		prisma.clientUser.findMany({
			where: { clientId },
			orderBy: { createdAt: "asc" },
			select: {
				id: true,
				name: true,
				email: true,
				role: true,
				passwordHash: true,
				portalToken: true,
				lastLoginAt: true,
				isActive: true,
			},
		}),
		prisma.asset.findMany({
			where: { clientId },
			orderBy: { name: "asc" },
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
		prisma.contract.findMany({
			where: { clientId },
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
	]);

	if (!rawClient) notFound();

	const client: ClientData = {
		...rawClient,
		hourlyRate: Number(rawClient.hourlyRate),
		retainerFee: rawClient.retainerFee ? Number(rawClient.retainerFee) : null,
	};

	const tickets: TicketRow[] = rawTickets.map((tk) => ({
		...tk,
		createdAt: tk.createdAt.toISOString(),
	}));

	const timeEntries: TimeEntryRow[] = rawEntries.map((e) => ({
		...e,
		hourlyRate: Number(e.hourlyRate),
		loggedAt: e.loggedAt.toISOString(),
	}));

	const portalUsers: PortalUser[] = rawUsers.map((u) => ({
		id: u.id,
		name: u.name,
		email: u.email,
		role: u.role,
		hasPassword: u.passwordHash !== null,
		portalToken: u.portalToken,
		lastLoginAt: u.lastLoginAt?.toISOString() ?? null,
		isActive: u.isActive,
	}));

	const assets: AssetRow[] = rawAssets.map((a) => ({
		...a,
		warrantyExpiresAt: a.warrantyExpiresAt?.toISOString().slice(0, 10) ?? null,
		createdAt: a.createdAt.toISOString(),
	}));

	function daysUntilRenewal(renewalDate: Date): number {
		const now = new Date();
		now.setHours(0, 0, 0, 0);
		const renewal = new Date(renewalDate);
		renewal.setHours(0, 0, 0, 0);
		return Math.ceil((renewal.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
	}

	const contracts: ContractRow[] = rawContracts.map((c) => ({
		...c,
		costPerYear: c.costPerYear ? Number(c.costPerYear) : null,
		renewalDate: c.renewalDate.toISOString().slice(0, 10),
		createdAt: c.createdAt.toISOString(),
		daysUntilRenewal: daysUntilRenewal(c.renewalDate),
	}));

	const validTabs = ["overview", "tickets", "time", "portal", "assets", "contracts"];
	const initialTab = tab && validTabs.includes(tab) ? tab : "overview";

	return (
		<ClientDetailView
			client={client}
			tickets={tickets}
			timeEntries={timeEntries}
			portalUsers={portalUsers}
			assets={assets}
			contracts={contracts}
			initialTab={initialTab}
		/>
	);
}
