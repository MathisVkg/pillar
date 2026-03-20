import { prisma } from "@pillar/database";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { randomBytes } from "crypto";

type Params = { params: Promise<{ clientId: string }> };

export async function GET(_req: Request, { params }: Params) {
	const session = await auth();
	if (!session?.user?.isAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { clientId } = await params;

	const users = await prisma.clientUser.findMany({
		where: { clientId },
		orderBy: { createdAt: "asc" },
		select: {
			id: true,
			name: true,
			email: true,
			role: true,
			passwordHash: true,
			portalToken: true,
			tokenExpiresAt: true,
			lastLoginAt: true,
			isActive: true,
			createdAt: true,
		},
	});

	// Never expose password hashes — replace with boolean indicator
	return NextResponse.json(
		users.map((u) => ({
			...u,
			hasPassword: u.passwordHash !== null,
			passwordHash: undefined,
			lastLoginAt: u.lastLoginAt?.toISOString() ?? null,
			tokenExpiresAt: u.tokenExpiresAt?.toISOString() ?? null,
			createdAt: u.createdAt.toISOString(),
		}))
	);
}

export async function POST(req: Request, { params }: Params) {
	const session = await auth();
	if (!session?.user?.isAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { clientId } = await params;

	// Verify client exists
	const client = await prisma.client.findUnique({ where: { id: clientId }, select: { id: true } });
	if (!client) {
		return NextResponse.json({ error: "Client not found" }, { status: 404 });
	}

	const body = await req.json();
	const { name, email, role, accessType, password } = body;

	if (!name?.trim()) return NextResponse.json({ error: "Name is required" }, { status: 400 });
	if (!email?.trim()) return NextResponse.json({ error: "Email is required" }, { status: 400 });
	if (accessType === "password" && !password?.trim()) {
		return NextResponse.json({ error: "Password is required for password access" }, { status: 400 });
	}

	// Check email uniqueness
	const existing = await prisma.clientUser.findUnique({ where: { email: email.trim() } });
	if (existing) {
		return NextResponse.json({ error: "Email already in use" }, { status: 409 });
	}

	const portalToken = randomBytes(32).toString("hex");
	const passwordHash = accessType === "password" ? await hash(password, 10) : null;

	const user = await prisma.clientUser.create({
		data: {
			clientId,
			name: name.trim(),
			email: email.trim().toLowerCase(),
			role: role === "admin" ? "admin" : "viewer",
			passwordHash,
			portalToken,
		},
		select: {
			id: true,
			name: true,
			email: true,
			role: true,
			portalToken: true,
			tokenExpiresAt: true,
			lastLoginAt: true,
			isActive: true,
			createdAt: true,
		},
	});

	return NextResponse.json(
		{
			...user,
			hasPassword: passwordHash !== null,
			lastLoginAt: null,
			tokenExpiresAt: null,
			createdAt: user.createdAt.toISOString(),
		},
		{ status: 201 }
	);
}
