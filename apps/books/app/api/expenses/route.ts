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
      { status: 400 }
    );
  }

  const total = Number(amountTotal);
  let amountExcl: number;
  let vatAmount: number;

  if (hasVat) {
    vatAmount = bodyVatAmount !== undefined
      ? round2(Number(bodyVatAmount))
      : round2((total / 1.21) * 0.21);
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
      category,
      expenseDate: new Date(expenseDate),
      receiptUrl: receiptUrl ?? null,
      notes: notes ?? null,
      status: status ?? "paid",
    },
  });

  return NextResponse.json(serializeExpense(expense), { status: 201 });
}
