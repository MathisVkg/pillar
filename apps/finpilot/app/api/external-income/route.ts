import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@pillar/database";

export async function GET() {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const entries = await prisma.externalIncome.findMany({
    where: { clientId: null },
    orderBy: { receivedAt: "desc" },
    take: 50,
  });

  return NextResponse.json(
    entries.map((e) => ({
      id: e.id,
      clientId: e.clientId,
      source: e.source,
      description: e.description,
      amountExcl: Number(e.amountExcl),
      vatAmount: Number(e.vatAmount),
      receivedAt: e.receivedAt.toISOString(),
      documentUrl: e.documentUrl,
      notes: e.notes,
      status: e.status,
      createdAt: e.createdAt.toISOString(),
      updatedAt: e.updatedAt.toISOString(),
    }))
  );
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { source, description, amountExcl, vatAmount, receivedAt, documentUrl, notes, status } = body;

  if (!source || amountExcl == null || !receivedAt) {
    return NextResponse.json(
      { error: "source, amountExcl and receivedAt are required" },
      { status: 400 }
    );
  }

  const resolvedStatus: string = status ?? "paid";

  const created = await prisma.$transaction(async (tx) => {
    const externalIncome = await tx.externalIncome.create({
      data: {
        clientId: null,
        source,
        description: description ?? null,
        amountExcl,
        vatAmount: vatAmount ?? 0,
        receivedAt: new Date(receivedAt),
        documentUrl: documentUrl ?? null,
        notes: notes ?? null,
        status: resolvedStatus,
      },
    });

    if (resolvedStatus === "paid") {
      await tx.incomeEntry.create({
        data: {
          clientId: null,
          sourceType: "external",
          sourceId: externalIncome.id,
          amountExcl: externalIncome.amountExcl,
          vatAmount: externalIncome.vatAmount,
          receivedAt: externalIncome.receivedAt,
          label: externalIncome.source,
        },
      });
    }

    return externalIncome;
  });

  return NextResponse.json(
    {
      id: created.id,
      clientId: created.clientId,
      source: created.source,
      description: created.description,
      amountExcl: Number(created.amountExcl),
      vatAmount: Number(created.vatAmount),
      receivedAt: created.receivedAt.toISOString(),
      documentUrl: created.documentUrl,
      notes: created.notes,
      status: created.status,
      createdAt: created.createdAt.toISOString(),
      updatedAt: created.updatedAt.toISOString(),
    },
    { status: 201 }
  );
}
