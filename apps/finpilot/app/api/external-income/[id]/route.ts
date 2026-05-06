import { prisma } from "@pillar/database";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  parseExternalIncomeStatus,
  parseNonNegativeAmount,
  parseRequiredDate,
} from "@/lib/validation";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
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
  const statusResult =
    body.status !== undefined
      ? parseExternalIncomeStatus(body.status)
      : parseExternalIncomeStatus(oldStatus);
  if (!statusResult.ok) {
    return NextResponse.json({ error: statusResult.error }, { status: 400 });
  }

  const amountResult =
    body.amountExcl !== undefined
      ? parseNonNegativeAmount(body.amountExcl, "amountExcl")
      : null;
  if (amountResult && !amountResult.ok) {
    return NextResponse.json({ error: amountResult.error }, { status: 400 });
  }

  const vatResult =
    body.vatAmount !== undefined
      ? parseNonNegativeAmount(body.vatAmount, "vatAmount")
      : null;
  if (vatResult && !vatResult.ok) {
    return NextResponse.json({ error: vatResult.error }, { status: 400 });
  }

  const dateResult =
    body.receivedAt !== undefined
      ? parseRequiredDate(body.receivedAt, "receivedAt")
      : null;
  if (dateResult && !dateResult.ok) {
    return NextResponse.json({ error: dateResult.error }, { status: 400 });
  }

  const newStatus = statusResult.value;

  const updated = await prisma.$transaction(async (tx) => {
    const record = await tx.externalIncome.update({
      where: { id },
      data: {
        ...(body.source !== undefined && { source: body.source }),
        ...(body.description !== undefined && {
          description: body.description,
        }),
        ...(amountResult?.ok && { amountExcl: amountResult.value }),
        ...(vatResult?.ok && { vatAmount: vatResult.value }),
        ...(dateResult?.ok && { receivedAt: dateResult.value }),
        ...(body.documentUrl !== undefined && {
          documentUrl: body.documentUrl,
        }),
        ...(body.notes !== undefined && { notes: body.notes }),
        ...(body.status !== undefined && { status: newStatus }),
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
  { params }: { params: Promise<{ id: string }> },
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
