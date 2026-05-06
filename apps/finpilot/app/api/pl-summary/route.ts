import { prisma } from "@pillar/database";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getQuarterRange, getYearRange, parseYear } from "@/lib/date-ranges";

async function getExpenseSum(
  startDateOnly: string,
  endDateOnly: string,
): Promise<{ amountExcl: number; vatAmount: number }> {
  const result = await prisma.$queryRaw<
    Array<{ amountExcl: number; vatAmount: number }>
  >`
    SELECT
      COALESCE(SUM(amountExcl), 0) as amountExcl,
      COALESCE(SUM(vatAmount), 0) as vatAmount
    FROM finpilot_expense
    WHERE clientId IS NULL
    AND expenseDate >= ${startDateOnly}
    AND expenseDate <= ${endDateOnly}
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
    range: getQuarterRange(year, 1),
  },
  {
    label: "Q2",
    period: `Apr \u2013 Jun ${year}`,
    range: getQuarterRange(year, 2),
  },
  {
    label: "Q3",
    period: `Jul \u2013 Sep ${year}`,
    range: getQuarterRange(year, 3),
  },
  {
    label: "Q4",
    period: `Oct \u2013 Dec ${year}`,
    range: getQuarterRange(year, 4),
  },
];

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const year = parseYear(url.searchParams.get("year"));

  if (year === null) {
    return NextResponse.json(
      { error: "year must be a valid year" },
      { status: 400 },
    );
  }

  const yearRange = getYearRange(year);

  // ── Annual revenue ─────────────────────────────────────────────────────────

  const [totalRevenueAgg, pillarRevenueAgg, externalRevenueAgg] =
    await Promise.all([
      prisma.incomeEntry.aggregate({
        _sum: { amountExcl: true },
        where: {
          clientId: null,
          receivedAt: { gte: yearRange.start, lte: yearRange.end },
        },
      }),
      prisma.incomeEntry.aggregate({
        _sum: { amountExcl: true },
        where: {
          clientId: null,
          sourceType: "pillar",
          receivedAt: { gte: yearRange.start, lte: yearRange.end },
        },
      }),
      prisma.incomeEntry.aggregate({
        _sum: { amountExcl: true },
        where: {
          clientId: null,
          sourceType: "external",
          receivedAt: { gte: yearRange.start, lte: yearRange.end },
        },
      }),
    ]);

  // ── Annual expenses ────────────────────────────────────────────────────────

  const annualExpenses = await getExpenseSum(
    yearRange.startDateOnly,
    yearRange.endDateOnly,
  );

  const categoryRows = await prisma.$queryRaw<
    Array<{ category: string; total: number }>
  >`
    SELECT category,
           COALESCE(SUM(amountExcl), 0) as total
    FROM finpilot_expense
    WHERE clientId IS NULL
    AND expenseDate >= ${yearRange.startDateOnly}
    AND expenseDate <= ${yearRange.endDateOnly}
    GROUP BY category
  `;

  const expensesByCategory = Object.fromEntries(
    categoryRows.map((r) => [r.category, Number(r.total)]),
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
    where: {
      clientId: null,
      receivedAt: { gte: yearRange.start, lte: yearRange.end },
    },
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
            receivedAt: { gte: q.range.start, lte: q.range.end },
          },
        }),
        getExpenseSum(q.range.startDateOnly, q.range.endDateOnly),
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
    }),
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
