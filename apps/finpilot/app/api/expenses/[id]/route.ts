import { prisma } from "@pillar/database";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  parseExpenseCategory,
  parseExpenseStatus,
  parseNonNegativeAmount,
  parseOptionalBoolean,
  parseRequiredDate,
} from "@/lib/validation";

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
  { params }: { params: Promise<{ id: string }> },
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

  const hasVatResult = parseOptionalBoolean(hasVat, "hasVat");
  if (!hasVatResult.ok) {
    return NextResponse.json({ error: hasVatResult.error }, { status: 400 });
  }

  if (amountTotal !== undefined) {
    const totalResult = parseNonNegativeAmount(amountTotal, "amountTotal");
    if (!totalResult.ok) {
      return NextResponse.json({ error: totalResult.error }, { status: 400 });
    }

    const total = totalResult.value;
    if (hasVatResult.value) {
      if (bodyVatAmount !== undefined) {
        const vatResult = parseNonNegativeAmount(bodyVatAmount, "vatAmount");
        if (!vatResult.ok) {
          return NextResponse.json({ error: vatResult.error }, { status: 400 });
        }
        if (vatResult.value > total) {
          return NextResponse.json(
            { error: "vatAmount must be less than or equal to amountTotal" },
            { status: 400 },
          );
        }
        vatAmount = round2(vatResult.value);
      } else {
        vatAmount = round2((total / 1.21) * 0.21);
      }
      amountExcl = round2(total - vatAmount);
    } else {
      vatAmount = 0;
      amountExcl = total;
    }
  } else if (hasVatResult.value === false) {
    vatAmount = 0;
    amountExcl = Number(existing.amountExcl) + Number(existing.vatAmount);
  }

  const categoryResult =
    category !== undefined ? parseExpenseCategory(category) : null;
  if (categoryResult && !categoryResult.ok) {
    return NextResponse.json({ error: categoryResult.error }, { status: 400 });
  }

  const dateResult =
    expenseDate !== undefined
      ? parseRequiredDate(expenseDate, "expenseDate")
      : null;
  if (dateResult && !dateResult.ok) {
    return NextResponse.json({ error: dateResult.error }, { status: 400 });
  }

  const statusResult = status !== undefined ? parseExpenseStatus(status) : null;
  if (statusResult && !statusResult.ok) {
    return NextResponse.json({ error: statusResult.error }, { status: 400 });
  }

  const updated = await prisma.expense.update({
    where: { id },
    data: {
      ...(vendor !== undefined && { vendor }),
      ...(description !== undefined && { description: description || null }),
      ...(amountExcl !== undefined && { amountExcl }),
      ...(vatAmount !== undefined && { vatAmount }),
      ...(categoryResult?.ok && { category: categoryResult.value }),
      ...(dateResult?.ok && { expenseDate: dateResult.value }),
      ...(notes !== undefined && { notes: notes || null }),
      ...(statusResult?.ok && { status: statusResult.value }),
    },
  });

  return NextResponse.json(serializeExpense(updated));
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

  const existing = await prisma.expense.findFirst({
    where: { id, clientId: null },
  });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.expense.delete({ where: { id } });

  return NextResponse.json({ deleted: true });
}
