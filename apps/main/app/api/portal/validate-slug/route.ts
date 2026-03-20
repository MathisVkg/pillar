// Internal endpoint — called from middleware to verify a client session owns a portal slug.
// Not intended for direct client use.
import { prisma } from "@pillar/database";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const clientId = searchParams.get("clientId");
	const slug = searchParams.get("slug");

	if (!clientId || !slug) {
		return NextResponse.json({ allowed: false }, { status: 400 });
	}

	const client = await prisma.client.findUnique({
		where: { slug },
		select: { id: true, isActive: true },
	});

	const allowed = !!client && client.isActive && client.id === clientId;

	return NextResponse.json({ allowed });
}
