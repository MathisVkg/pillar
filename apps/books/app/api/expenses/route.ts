import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@pillar/database";

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

  return NextResponse.json(
    expenses.map((e) => ({
      ...e,
      amountExcl: Number(e.amountExcl),
      vatAmount: Number(e.vatAmount),
      expenseDate: e.expenseDate.toISOString(),
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
  const { vendor, description, amountExcl, vatAmount, category, expenseDate, receiptUrl, notes } = body;

  if (!vendor || amountExcl === undefined || !category || !expenseDate) {
    return NextResponse.json({ error: "vendor, amountExcl, category, expenseDate are required" }, { status: 400 });
  }

  const expense = await prisma.expense.create({
    data: {
      clientId: null,
      vendor,
      description: description ?? null,
      amountExcl,
      vatAmount: vatAmount ?? 0,
      category,
      expenseDate: new Date(expenseDate),
      receiptUrl: receiptUrl ?? null,
      notes: notes ?? null,
    },
  });

  return NextResponse.json(
    {
      ...expense,
      amountExcl: Number(expense.amountExcl),
      vatAmount: Number(expense.vatAmount),
      expenseDate: expense.expenseDate.toISOString(),
      createdAt: expense.createdAt.toISOString(),
      updatedAt: expense.updatedAt.toISOString(),
    },
    { status: 201 }
  );
}
