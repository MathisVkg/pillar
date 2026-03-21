import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@pillar/database";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const existing = await prisma.externalIncome.findUnique({ where: { id } });
  if (!existing || existing.clientId !== null) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await req.json();
  const oldStatus = existing.status;
  const newStatus: string = body.status ?? oldStatus;

  const updated = await prisma.$transaction(async (tx) => {
    const record = await tx.externalIncome.update({
      where: { id },
      data: {
        ...(body.source !== undefined && { source: body.source }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.amountExcl !== undefined && { amountExcl: body.amountExcl }),
        ...(body.vatAmount !== undefined && { vatAmount: body.vatAmount }),
        ...(body.receivedAt !== undefined && { receivedAt: new Date(body.receivedAt) }),
        ...(body.documentUrl !== undefined && { documentUrl: body.documentUrl }),
        ...(body.notes !== undefined && { notes: body.notes }),
        ...(body.status !== undefined && { status: body.status }),
      },
    });

    if (newStatus === "paid" && oldStatus !== "paid") {
      // Case A: becoming paid — create or update income_entry
      const existingEntry = await tx.incomeEntry.findFirst({
        where: { sourceType: "external", sourceId: id },
      });
      if (existingEntry) {
        await tx.incomeEntry.update({
          where: { id: existingEntry.id },
          data: {
            amountExcl: record.amountExcl,
            vatAmount: record.vatAmount,
            receivedAt: record.receivedAt,
            label: record.source,
          },
        });
      } else {
        await tx.incomeEntry.create({
          data: {
            clientId: null,
            sourceType: "external",
            sourceId: id,
            amountExcl: record.amountExcl,
            vatAmount: record.vatAmount,
            receivedAt: record.receivedAt,
            label: record.source,
          },
        });
      }
    } else if (newStatus !== "paid" && oldStatus === "paid") {
      // Case B: leaving paid — delete income_entry
      await tx.incomeEntry.deleteMany({
        where: { sourceType: "external", sourceId: id },
      });
    } else if (newStatus === "paid" && oldStatus === "paid") {
      // Case C: stays paid — update income_entry amounts
      await tx.incomeEntry.updateMany({
        where: { sourceType: "external", sourceId: id },
        data: {
          amountExcl: record.amountExcl,
          vatAmount: record.vatAmount,
          receivedAt: record.receivedAt,
          label: record.source,
        },
      });
    }
    // Case D: stays non-paid — no income_entry action needed

    return record;
  });

  return NextResponse.json({
    id: updated.id,
    clientId: updated.clientId,
    source: updated.source,
    description: updated.description,
    amountExcl: Number(updated.amountExcl),
    vatAmount: Number(updated.vatAmount),
    receivedAt: updated.receivedAt.toISOString(),
    documentUrl: updated.documentUrl,
    notes: updated.notes,
    status: updated.status,
    createdAt: updated.createdAt.toISOString(),
    updatedAt: updated.updatedAt.toISOString(),
  });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const existing = await prisma.externalIncome.findUnique({ where: { id } });
  if (!existing || existing.clientId !== null) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.$transaction(async (tx) => {
    await tx.incomeEntry.deleteMany({
      where: { sourceType: "external", sourceId: id },
    });
    await tx.externalIncome.delete({ where: { id } });
  });

  return NextResponse.json({ deleted: true });
}
