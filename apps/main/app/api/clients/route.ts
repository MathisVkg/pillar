import { prisma } from "@pillar/database";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

function generateSlug(name: string): string {
	return name
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "")
		.slice(0, 50);
}

async function ensureUniqueSlug(base: string): Promise<string> {
	let slug = base;
	let n = 2;
	while (await prisma.client.findUnique({ where: { slug } })) {
		slug = `${base}-${n++}`;
	}
	return slug;
}

export async function GET() {
	const session = await auth();
	if (!session?.user?.isAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const clients = await prisma.client.findMany({
		where: { isActive: true },
		orderBy: { name: "asc" },
		select: {
			id: true,
			name: true,
			slug: true,
			contractType: true,
			hourlyRate: true,
			language: true,
			_count: {
				select: {
					tickets: { where: { status: { in: ["open", "in_progress"] } } },
				},
			},
		},
	});

	return NextResponse.json(
		clients.map((c) => ({ ...c, hourlyRate: Number(c.hourlyRate) }))
	);
}

export async function POST(req: Request) {
	const session = await auth();
	if (!session?.user?.isAdmin) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const body = await req.json();
	const { name, contractType, hourlyRate, language } = body;

	if (!name || typeof name !== "string" || name.trim().length === 0) {
		return NextResponse.json({ error: "Name is required" }, { status: 400 });
	}

	const slug = await ensureUniqueSlug(generateSlug(name.trim()));

	const client = await prisma.client.create({
		data: {
			name: name.trim(),
			slug,
			contractType: contractType === "retainer" ? "retainer" : "adhoc",
			hourlyRate: hourlyRate ? Number(hourlyRate) : 95,
			language: ["fr", "nl", "en"].includes(language) ? language : "fr",
		},
		select: {
			id: true,
			name: true,
			slug: true,
			contractType: true,
			hourlyRate: true,
			language: true,
		},
	});

	return NextResponse.json(
		{ ...client, hourlyRate: Number(client.hourlyRate) },
		{ status: 201 }
	);
}
