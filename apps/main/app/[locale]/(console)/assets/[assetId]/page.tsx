import { prisma } from "@pillar/database";
import { notFound } from "next/navigation";
import AssetDetailView from "./AssetDetailView";
import type { Metadata } from "next";

type Props = {
	params: Promise<{ assetId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { assetId } = await params;
	const asset = await prisma.asset.findUnique({ where: { id: assetId }, select: { name: true } });
	return { title: asset ? `${asset.name} · Pillar` : "Asset · Pillar" };
}

export default async function AssetDetailPage({ params }: Props) {
	const { assetId } = await params;

	const raw = await prisma.asset.findUnique({
		where: { id: assetId },
		select: {
			id: true,
			name: true,
			type: true,
			serialNumber: true,
			assignedTo: true,
			status: true,
			sensitivity: true,
			showSerialInPortal: true,
			notes: true,
			warrantyExpiresAt: true,
			purchasedAt: true,
			createdAt: true,
			client: { select: { id: true, name: true } },
		},
	});

	if (!raw) notFound();

	const asset = {
		...raw,
		warrantyExpiresAt: raw.warrantyExpiresAt?.toISOString().slice(0, 10) ?? null,
		purchasedAt: raw.purchasedAt?.toISOString().slice(0, 10) ?? null,
		createdAt: raw.createdAt.toISOString(),
	};

	return <AssetDetailView asset={asset} />;
}
