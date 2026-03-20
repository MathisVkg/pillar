import { prisma } from "@pillar/database";
import { notFound } from "next/navigation";
import TicketDetailView from "./TicketDetailView";
import type { Metadata } from "next";

type Props = { params: Promise<{ ticketId: string; locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { ticketId } = await params;
	const ticket = await prisma.ticket.findUnique({
		where: { id: ticketId },
		select: { reference: true, title: true },
	});
	return { title: ticket ? `${ticket.reference} ${ticket.title} \u00B7 Pillar` : "Ticket \u00B7 Pillar" };
}

export default async function TicketDetailPage({ params }: Props) {
	const { ticketId } = await params;

	const ticket = await prisma.ticket.findUnique({
		where: { id: ticketId },
		select: {
			id: true,
			reference: true,
			title: true,
			description: true,
			status: true,
			priority: true,
			source: true,
			isBillable: true,
			resolvedAt: true,
			createdAt: true,
			updatedAt: true,
			client: { select: { id: true, name: true, hourlyRate: true } },
			timeEntries: {
				orderBy: { loggedAt: "desc" },
				select: {
					id: true,
					description: true,
					durationMinutes: true,
					hourlyRate: true,
					isBillable: true,
					isInvoiced: true,
					loggedAt: true,
				},
			},
		},
	});

	if (!ticket) notFound();

	const totalMinutes = ticket.timeEntries.reduce((sum, e) => sum + e.durationMinutes, 0);

	return (
		<TicketDetailView
			ticket={{
				...ticket,
				client: { ...ticket.client, hourlyRate: Number(ticket.client.hourlyRate) },
				timeEntries: ticket.timeEntries.map((e) => ({
					...e,
					hourlyRate: Number(e.hourlyRate),
					loggedAt: e.loggedAt.toISOString(),
				})),
				totalMinutes,
				resolvedAt: ticket.resolvedAt?.toISOString() ?? null,
				createdAt: ticket.createdAt.toISOString(),
				updatedAt: ticket.updatedAt.toISOString(),
			}}
		/>
	);
}
