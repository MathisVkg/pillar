import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@pillar/database";

async function getExpenseSum(
  year: number,
  monthStart: number,
  monthEnd: number,
  dayStart: number,
  dayEnd: number
): Promise<{ amountExcl: number; vatAmount: number }> {
  const startStr = `${year}-${String(monthStart).padStart(2, "0")}-${String(dayStart).padStart(2, "0")}`;
  const endStr = `${year}-${String(monthEnd).padStart(2, "0")}-${String(dayEnd).padStart(2, "0")}`;

  const result = await prisma.$queryRaw<Array<{ amountExcl: number; vatAmount: number }>>`
    SELECT
      COALESCE(SUM(amountExcl), 0) as amountExcl,
      COALESCE(SUM(vatAmount), 0) as vatAmount
    FROM finpilot_expense
    WHERE clientId IS NULL
    AND expenseDate >= ${startStr}
    AND expenseDate <= ${endStr}
  `;

  return {
    amountExcl: Number(result[0]?.amountExcl ?? 0),
    vatAmount: Number(result[0]?.vatAmount ?? 0),
  };
}

const QUARTERS = (year: number) => [
  {
    label: "Q1",
    period: `Jan \u2013 Mar ${year}`,
    incomeStart: new Date(`${year}-01-01T00:00:00.000Z`),
    incomeEnd:   new Date(`${year}-03-31T23:59:59.999Z`),
    monthStart: 1, monthEnd: 3, dayStart: 1, dayEnd: 31,
  },
  {
    label: "Q2",
    period: `Apr \u2013 Jun ${year}`,
    incomeStart: new Date(`${year}-04-01T00:00:00.000Z`),
    incomeEnd:   new Date(`${year}-06-30T23:59:59.999Z`),
    monthStart: 4, monthEnd: 6, dayStart: 1, dayEnd: 30,
  },
  {
    label: "Q3",
    period: `Jul \u2013 Sep ${year}`,
    incomeStart: new Date(`${year}-07-01T00:00:00.000Z`),
    incomeEnd:   new Date(`${year}-09-30T23:59:59.999Z`),
    monthStart: 7, monthEnd: 9, dayStart: 1, dayEnd: 30,
  },
  {
    label: "Q4",
    period: `Oct \u2013 Dec ${year}`,
    incomeStart: new Date(`${year}-10-01T00:00:00.000Z`),
    incomeEnd:   new Date(`${year}-12-31T23:59:59.999Z`),
    monthStart: 10, monthEnd: 12, dayStart: 1, dayEnd: 31,
  },
];

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const year = parseInt(
    url.searchParams.get("year") ?? String(new Date().getFullYear())
  );

  const yearStart = new Date(`${year}-01-01T00:00:00.000Z`);
  const yearEnd = new Date(`${year}-12-31T23:59:59.999Z`);

  // ── Annual revenue ─────────────────────────────────────────────────────────

  const [totalRevenueAgg, pillarRevenueAgg, externalRevenueAgg] =
    await Promise.all([
      prisma.incomeEntry.aggregate({
        _sum: { amountExcl: true },
        where: { clientId: null, receivedAt: { gte: yearStart, lte: yearEnd } },
      }),
      prisma.incomeEntry.aggregate({
        _sum: { amountExcl: true },
        where: {
          clientId: null,
          sourceType: "pillar",
          receivedAt: { gte: yearStart, lte: yearEnd },
        },
      }),
      prisma.incomeEntry.aggregate({
        _sum: { amountExcl: true },
        where: {
          clientId: null,
          sourceType: "external",
          receivedAt: { gte: yearStart, lte: yearEnd },
        },
      }),
    ]);

  // ── Annual expenses ────────────────────────────────────────────────────────

  const annualExpenses = await getExpenseSum(year, 1, 12, 1, 31);

  const categoryRows = await prisma.$queryRaw<Array<{ category: string; total: number }>>`
    SELECT category,
           COALESCE(SUM(amountExcl), 0) as total
    FROM finpilot_expense
    WHERE clientId IS NULL
    AND expenseDate >= ${`${year}-01-01`}
    AND expenseDate <= ${`${year}-12-31`}
    GROUP BY category
  `;

  const expensesByCategory = Object.fromEntries(
    categoryRows.map((r) => [r.category, Number(r.total)])
  );

  // ── Recurring reference ────────────────────────────────────────────────────

  const activeRecurring = await prisma.recurringExpense.findMany({
    where: { clientId: null, isActive: true },
    select: { frequency: true, amount: true },
  });

  const recurringYearlyRef = activeRecurring.reduce((sum, r) => {
    const amount = Number(r.amount);
    if (r.frequency === "monthly") return sum + amount * 12;
    if (r.frequency === "quarterly") return sum + amount * 4;
    return sum + amount;
  }, 0);

  // ── VAT position ───────────────────────────────────────────────────────────

  const vatCollectedAgg = await prisma.incomeEntry.aggregate({
    _sum: { vatAmount: true },
    where: { clientId: null, receivedAt: { gte: yearStart, lte: yearEnd } },
  });

  const vatPaid = annualExpenses.vatAmount;

  // ── Per-quarter breakdown ──────────────────────────────────────────────────

  const quarters = await Promise.all(
    QUARTERS(year).map(async (q) => {
      const [rev, exp] = await Promise.all([
        prisma.incomeEntry.aggregate({
          _sum: { amountExcl: true },
          where: {
            clientId: null,
            receivedAt: { gte: q.incomeStart, lte: q.incomeEnd },
          },
        }),
        getExpenseSum(year, q.monthStart, q.monthEnd, q.dayStart, q.dayEnd),
      ]);

      const revenue = Number(rev._sum?.amountExcl ?? 0);
      const expenses = exp.amountExcl;

      return {
        label: q.label,
        period: q.period,
        revenue,
        expenses,
        result: revenue - expenses,
      };
    })
  );

  // ── Compute totals ─────────────────────────────────────────────────────────

  const totalRevenue = Number(totalRevenueAgg._sum?.amountExcl ?? 0);
  const pillarRevenue = Number(pillarRevenueAgg._sum?.amountExcl ?? 0);
  const externalRevenue = Number(externalRevenueAgg._sum?.amountExcl ?? 0);
  const totalExpenses = annualExpenses.amountExcl;
  const operatingResult = totalRevenue - totalExpenses;
  const margin =
    totalRevenue > 0
      ? Math.round((operatingResult / totalRevenue) * 100 * 10) / 10
      : 0;

  const vatCollected = Number(vatCollectedAgg._sum?.vatAmount ?? 0);

  return NextResponse.json({
    year,
    revenue: {
      total: totalRevenue,
      pillar: pillarRevenue,
      external: externalRevenue,
    },
    expenses: {
      total: totalExpenses,
      byCategory: expensesByCategory,
    },
    recurringRef: {
      yearlyTotal: recurringYearlyRef,
      count: activeRecurring.length,
    },
    result: {
      operating: operatingResult,
      margin,
    },
    vatPosition: {
      collected: vatCollected,
      paid: vatPaid,
      net: vatCollected - vatPaid,
    },
    quarters,
  });
}
