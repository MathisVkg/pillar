import { prisma } from "@pillar/database";
import ClientsView from "./ClientsView";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Pillar · Clients" };

export default async function ClientsPage() {
	const clients = await prisma.client.findMany({
		orderBy: { name: "asc" },
		select: {
			id: true,
			name: true,
			slug: true,
			contractType: true,
			hourlyRate: true,
			language: true,
			isActive: true,
			_count: {
				select: {
					tickets: { where: { status: { in: ["open", "in_progress"] } } },
				},
			},
		},
	});

	const serialized = clients.map((c) => ({
		...c,
		hourlyRate: Number(c.hourlyRate),
	}));

	return <ClientsView clients={serialized} />;
}
