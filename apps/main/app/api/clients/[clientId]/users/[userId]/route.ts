import { prisma } from "@pillar/database";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";

type Params = { params: Promise<{ clientId: string; userId: string }> };

async function resolveUser(clientId: string, userId: string) {
	const user = await prisma.clientUser.findUnique({
		where: { id: userId },
		select: { id: true, clientId: true, isActive: true, passwordHash: true },
	});
	if (!user || user.clientId !== clientId) return null;
	return user;
}

export async function PATCH(req: Request, { params }: Params) {
	const session = await auth();
	if (!session?.user?.isAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { clientId, userId } = await params;
	const existing = await resolveUser(clientId, userId);
	if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

	const body = await req.json();

	// Regenerate portal token
	if (body.regenerateToken === true) {
		const portalToken = randomBytes(32).toString("hex");
		const updated = await prisma.clientUser.update({
			where: { id: userId },
			data: { portalToken },
			select: { id: true, portalToken: true },
		});
		return NextResponse.json(updated);
	}

	// Toggle active
	if (typeof body.isActive === "boolean") {
		const updated = await prisma.clientUser.update({
			where: { id: userId },
			data: { isActive: body.isActive },
			select: { id: true, isActive: true },
		});
		return NextResponse.json(updated);
	}

	// Edit user fields (name, email, role, optional password reset)
	if (body.name !== undefined || body.email !== undefined || body.role !== undefined || body.password !== undefined) {
		const data: Record<string, unknown> = {};

		if (body.name?.trim()) data.name = body.name.trim();
		if (body.email?.trim()) data.email = body.email.trim().toLowerCase();
		if (body.role && ["admin", "viewer"].includes(body.role)) data.role = body.role;
		if (body.password?.trim()) {
			data.passwordHash = await bcrypt.hash(body.password.trim(), 12);
		}

		if (Object.keys(data).length === 0) {
			return NextResponse.json({ error: "No valid fields provided" }, { status: 400 });
		}

		const updated = await prisma.clientUser.update({
			where: { id: userId },
			data,
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
		});

		return NextResponse.json({
			id: updated.id,
			name: updated.name,
			email: updated.email,
			role: updated.role,
			hasPassword: updated.passwordHash !== null,
			portalToken: updated.portalToken,
			lastLoginAt: updated.lastLoginAt?.toISOString() ?? null,
			isActive: updated.isActive,
		});
	}

	return NextResponse.json({ error: "No valid action provided" }, { status: 400 });
}

export async function DELETE(_req: Request, { params }: Params) {
	const session = await auth();
	if (!session?.user?.isAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { clientId, userId } = await params;
	const existing = await resolveUser(clientId, userId);
	if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

	await prisma.clientUser.delete({ where: { id: userId } });

	return new NextResponse(null, { status: 204 });
}
