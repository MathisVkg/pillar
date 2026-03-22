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

  const item = await prisma.recurringExpense.findFirst({
    where: { id, clientId: null },
  });
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await req.json();

  const updateData: Record<string, unknown> = {};
  if (body.name !== undefined) updateData.name = body.name;
  if (body.category !== undefined) updateData.category = body.category;
  if (body.frequency !== undefined) updateData.frequency = body.frequency;
  if (body.amount !== undefined) updateData.amount = parseFloat(body.amount);
  if (body.isActive !== undefined) updateData.isActive = Boolean(body.isActive);
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
  req: Request,
  { params }: { params: Promise<{ id: string }> }
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
