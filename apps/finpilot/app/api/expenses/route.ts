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

export async function GET() {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const expenses = await prisma.expense.findMany({
    where: { clientId: null },
    orderBy: { expenseDate: "desc" },
    take: 50,
  });

  return NextResponse.json(expenses.map(serializeExpense));
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
    receiptUrl,
    notes,
    status,
  } = body;

  if (!vendor || amountTotal === undefined || !category || !expenseDate) {
    return NextResponse.json(
      { error: "vendor, amountTotal, category, expenseDate are required" },
      { status: 400 },
    );
  }

  const totalResult = parseNonNegativeAmount(amountTotal, "amountTotal");
  if (!totalResult.ok) {
    return NextResponse.json({ error: totalResult.error }, { status: 400 });
  }

  const categoryResult = parseExpenseCategory(category);
  if (!categoryResult.ok) {
    return NextResponse.json({ error: categoryResult.error }, { status: 400 });
  }

  const dateResult = parseRequiredDate(expenseDate, "expenseDate");
  if (!dateResult.ok) {
    return NextResponse.json({ error: dateResult.error }, { status: 400 });
  }

  const hasVatResult = parseOptionalBoolean(hasVat, "hasVat");
  if (!hasVatResult.ok) {
    return NextResponse.json({ error: hasVatResult.error }, { status: 400 });
  }

  const statusResult = parseExpenseStatus(status ?? "paid");
  if (!statusResult.ok) {
    return NextResponse.json({ error: statusResult.error }, { status: 400 });
  }

  const total = totalResult.value;
  let amountExcl: number;
  let vatAmount: number;

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

  const expense = await prisma.expense.create({
    data: {
      clientId: null,
      vendor,
      description: description ?? null,
      amountExcl,
      vatAmount,
      category: categoryResult.value,
      expenseDate: dateResult.value,
      receiptUrl: receiptUrl ?? null,
      notes: notes ?? null,
      status: statusResult.value,
    },
  });

  return NextResponse.json(serializeExpense(expense), { status: 201 });
}
