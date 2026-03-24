import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@pillar/database";

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function serializeExpense(e: {
  id: string;
  clientId: string | null;
  vendor: string;
  description: string | null;
  amountExcl: { toString(): string };
  vatAmount: { toString(): string };
  category: string;
  expenseDate: Date;
  receiptUrl: string | null;
  notes: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: e.id,
    vendor: e.vendor,
    description: e.description,
    amountExcl: Number(e.amountExcl),
    vatAmount: Number(e.vatAmount),
    category: e.category,
    expenseDate: e.expenseDate.toISOString(),
    receiptUrl: e.receiptUrl,
    notes: e.notes,
    status: e.status,
    createdAt: e.createdAt.toISOString(),
    updatedAt: e.updatedAt.toISOString(),
  };
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const existing = await prisma.expense.findFirst({
    where: { id, clientId: null },
  });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await req.json();
  const {
    vendor,
    description,
    amountTotal,
    hasVat,
    vatAmount: bodyVatAmount,
    category,
    expenseDate,
    notes,
    status,
  } = body;

  let amountExcl: number | undefined;
  let vatAmount: number | undefined;

  if (amountTotal !== undefined) {
    const total = Number(amountTotal);
    if (hasVat) {
      vatAmount = bodyVatAmount !== undefined
        ? round2(Number(bodyVatAmount))
        : round2((total / 1.21) * 0.21);
      amountExcl = round2(total - vatAmount);
    } else {
      vatAmount = 0;
      amountExcl = total;
    }
  } else if (hasVat === false) {
    vatAmount = 0;
    amountExcl = Number(existing.amountExcl) + Number(existing.vatAmount);
  }

  const updated = await prisma.expense.update({
    where: { id },
    data: {
      ...(vendor !== undefined && { vendor }),
      ...(description !== undefined && { description: description || null }),
      ...(amountExcl !== undefined && { amountExcl }),
      ...(vatAmount !== undefined && { vatAmount }),
      ...(category !== undefined && { category }),
      ...(expenseDate !== undefined && { expenseDate: new Date(expenseDate) }),
      ...(notes !== undefined && { notes: notes || null }),
      ...(status !== undefined && { status }),
    },
  });

  return NextResponse.json(serializeExpense(updated));
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

  const existing = await prisma.expense.findFirst({
    where: { id, clientId: null },
  });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.expense.delete({ where: { id } });

  return NextResponse.json({ deleted: true });
}
