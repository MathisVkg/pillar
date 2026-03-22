import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@pillar/database";

function serializeRecurringExpense(r: {
  id: string;
  clientId: string | null;
  name: string;
  category: string;
  frequency: string;
  amount: { toString(): string };
  isActive: boolean;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: r.id,
    name: r.name,
    category: r.category,
    frequency: r.frequency,
    amount: Number(r.amount),
    isActive: r.isActive,
    notes: r.notes,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  };
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const items = await prisma.recurringExpense.findMany({
    where: { clientId: null },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(items.map(serializeRecurringExpense));
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, category, frequency, amount, notes } = body;

  if (!name || !category || !frequency || amount === undefined) {
    return NextResponse.json(
      { error: "name, category, frequency, amount are required" },
      { status: 400 }
    );
  }

  if (!["monthly", "quarterly", "yearly"].includes(frequency)) {
    return NextResponse.json(
      { error: "frequency must be monthly | quarterly | yearly" },
      { status: 400 }
    );
  }

  const item = await prisma.recurringExpense.create({
    data: {
      clientId: null,
      name,
      category,
      frequency,
      amount: Number(amount),
      isActive: true,
      notes: notes ?? null,
    },
  });

  return NextResponse.json(serializeRecurringExpense(item), { status: 201 });
}
