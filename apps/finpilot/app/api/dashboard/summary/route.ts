import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@pillar/database";
import { syncPillarIncome } from "@/lib/sync-income";

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}

function startOfQuarter(date: Date): Date {
  const q = Math.floor(date.getMonth() / 3);
  return new Date(date.getFullYear(), q * 3, 1);
}

function endOfQuarter(date: Date): Date {
  const q = Math.floor(date.getMonth() / 3);
  return new Date(date.getFullYear(), q * 3 + 3, 0, 23, 59, 59, 999);
}

function quarterLabel(date: Date): string {
  const q = Math.floor(date.getMonth() / 3) + 1;
  return `Q${q} ${date.getFullYear()}`;
}

function monthLabel(date: Date): string {
  return date.toLocaleString("en-US", { month: "short" });
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Sync paid invoices to income_entry (idempotent)
  await syncPillarIncome();

  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  const qStart = startOfQuarter(now);
  const qEnd = endOfQuarter(now);

  // ── Income this month — unified via income_entry ──────────────────────────
  const incomeEntryAgg = await prisma.incomeEntry.aggregate({
    _sum: { amountExcl: true, vatAmount: true },
    where: {
      clientId: null,
      receivedAt: { gte: monthStart, lte: monthEnd },
    },
  });

  // ── Pillar income this month (paid invoices) ──────────────────────────────
  const pillarIncomeAgg = await prisma.invoice.aggregate({
    _sum: { subtotal: true, vatAmount: true },
    where: {
      status: "paid",
      paidAt: { gte: monthStart, lte: monthEnd },
    },
  });

  // ── External income this month (paid only) ───────────────────────────────
  const externalIncomeAgg = await prisma.externalIncome.aggregate({
    _sum: { amountExcl: true, vatAmount: true },
    where: {
      clientId: null,
      status: "paid",
      receivedAt: { gte: monthStart, lte: monthEnd },
    },
  });

  // ── Expenses this month (your company only) ───────────────────────────────
  const expenseAgg = await prisma.expense.aggregate({
    _sum: { amountExcl: true, vatAmount: true },
    where: {
      clientId: null,
      expenseDate: { gte: monthStart, lte: monthEnd },
    },
  });

  // ── Outstanding invoices ──────────────────────────────────────────────────
  const outstandingAgg = await prisma.invoice.aggregate({
    _sum: { total: true },
    where: { status: { in: ["sent", "draft"] } },
  });

  // ── VAT quarter (from income_entry — covers all sources) ──────────────────
  const vatCollectedAgg = await prisma.incomeEntry.aggregate({
    _sum: { vatAmount: true },
    where: {
      clientId: null,
      receivedAt: { gte: qStart, lte: qEnd },
    },
  });

  const vatPaidAgg = await prisma.expense.aggregate({
    _sum: { vatAmount: true },
    where: {
      clientId: null,
      expenseDate: { gte: qStart, lte: qEnd },
    },
  });

  // ── 6-month rolling chart (income from income_entry) ─────────────────────
  const chartData: Array<{ month: string; income: number; expenses: number }> = [];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const mStart = startOfMonth(d);
    const mEnd = endOfMonth(d);

    const [inc, exp] = await Promise.all([
      prisma.incomeEntry.aggregate({
        _sum: { amountExcl: true },
        where: {
          clientId: null,
          receivedAt: { gte: mStart, lte: mEnd },
        },
      }),
      prisma.expense.aggregate({
        _sum: { amountExcl: true },
        where: {
          clientId: null,
          expenseDate: { gte: mStart, lte: mEnd },
        },
      }),
    ]);

    chartData.push({
      month: monthLabel(d),
      income: Number(inc._sum?.amountExcl ?? 0),
      expenses: Number(exp._sum?.amountExcl ?? 0),
    });
  }

  const pillarIncomeThisMonth = Number(pillarIncomeAgg._sum?.subtotal ?? 0);
  const externalIncomeThisMonth = Number(externalIncomeAgg._sum?.amountExcl ?? 0);
  const incomeThisMonth = pillarIncomeThisMonth + externalIncomeThisMonth;
  const vatCollectedThisMonth = Number(incomeEntryAgg._sum?.vatAmount ?? 0);
  const expensesThisMonth = Number(expenseAgg._sum?.amountExcl ?? 0);
  const vatPaidThisMonth = Number(expenseAgg._sum?.vatAmount ?? 0);
  const totalVatCollected = Number(vatCollectedAgg._sum?.vatAmount ?? 0);
  const totalVatPaid = Number(vatPaidAgg._sum?.vatAmount ?? 0);

  const currentMonthName = now.toLocaleString("en-US", { month: "long" });

  return NextResponse.json({
    incomeThisMonth,
    pillarIncomeThisMonth,
    externalIncomeThisMonth,
    vatCollectedThisMonth,
    expensesThisMonth,
    vatPaidThisMonth,
    estimatedProfit: incomeThisMonth - expensesThisMonth,
    outstandingAmount: Number(outstandingAgg._sum?.total ?? 0),
    chartData,
    vatQuarter: {
      period: quarterLabel(now),
      totalVatCollected,
      totalVatPaid,
      balance: totalVatCollected - totalVatPaid,
    },
    currentMonth: `${currentMonthName} ${now.getFullYear()}`,
    currentYear: now.getFullYear(),
  });
}
