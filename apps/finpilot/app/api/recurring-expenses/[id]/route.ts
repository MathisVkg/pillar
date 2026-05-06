import { prisma } from "@pillar/database";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  parseExpenseCategory,
  parseNonNegativeAmount,
  parseOptionalBoolean,
  parseRecurringFrequency,
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

  const item = await prisma.recurringExpense.findFirst({
    where: { id, clientId: null },
  });
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await req.json();

  const categoryResult =
    body.category !== undefined ? parseExpenseCategory(body.category) : null;
  if (categoryResult && !categoryResult.ok) {
    return NextResponse.json({ error: categoryResult.error }, { status: 400 });
  }

  const frequencyResult =
    body.frequency !== undefined
      ? parseRecurringFrequency(body.frequency)
      : null;
  if (frequencyResult && !frequencyResult.ok) {
    return NextResponse.json({ error: frequencyResult.error }, { status: 400 });
  }

  const amountResult =
    body.amount !== undefined
      ? parseNonNegativeAmount(body.amount, "amount")
      : null;
  if (amountResult && !amountResult.ok) {
    return NextResponse.json({ error: amountResult.error }, { status: 400 });
  }

  const isActiveResult = parseOptionalBoolean(body.isActive, "isActive");
  if (!isActiveResult.ok) {
    return NextResponse.json({ error: isActiveResult.error }, { status: 400 });
  }

  const updateData: Record<string, unknown> = {};
  if (body.name !== undefined) updateData.name = body.name;
  if (categoryResult?.ok) updateData.category = categoryResult.value;
  if (frequencyResult?.ok) updateData.frequency = frequencyResult.value;
  if (amountResult?.ok) updateData.amount = amountResult.value;
  if (isActiveResult.value !== undefined)
    updateData.isActive = isActiveResult.value;
  if (body.notes !== undefined) updateData.notes = body.notes ?? null;

  const updated = await prisma.recurringExpense.update({
    where: { id },
    data: updateData,
  });

  return NextResponse.json({
    id: updated.id,
    name: updated.name,
    category: updated.category,
    frequency: updated.frequency,
    amount: Number(updated.amount),
    isActive: updated.isActive,
    notes: updated.notes,
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

  const item = await prisma.recurringExpense.findFirst({
    where: { id, clientId: null },
  });
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.recurringExpense.delete({
    where: { id },
  });

  return NextResponse.json({ deleted: true });
}
