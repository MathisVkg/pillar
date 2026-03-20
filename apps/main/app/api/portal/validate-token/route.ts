// Internal endpoint — called only from middleware to validate portal magic-link tokens.
// Not intended for direct client use; protected by token being a UUID (cryptographically hard to guess).
import { prisma } from "@pillar/database";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const token = searchParams.get("token");
	const slug = searchParams.get("slug");

	if (!token || !slug) {
		return NextResponse.json({ valid: false }, { status: 400 });
	}

	const clientUser = await prisma.clientUser.findUnique({
		where: { portalToken: token },
		select: {
			isActive: true,
			tokenExpiresAt: true,
			client: {
				select: { slug: true, isActive: true },
			},
		},
	});

	const valid =
		!!clientUser &&
		clientUser.isActive &&
		clientUser.client.isActive &&
		clientUser.client.slug === slug &&
		(!clientUser.tokenExpiresAt || clientUser.tokenExpiresAt > new Date());

	return NextResponse.json({ valid });
}
