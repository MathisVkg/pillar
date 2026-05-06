import { prisma } from "@pillar/database";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getQuarterRange, getYearRange, parseYear } from "@/lib/date-ranges";

interface QuarterExpense {
  id: string;
  vendor: string;
  category: string;
  expenseDate: string;
  amountExcl: number;
  vatAmount: number;
  status: string;
}

interface Quarter {
  label: string;
  period: string;
  vatPaid: number;
  vatCollected: number;
  balance: number;
  expenses: QuarterExpense[];
}

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

async function getExpensesWithVat(
  startDateOnly: string,
  endDateOnly: string,
): Promise<QuarterExpense[]> {
  const rows = await prisma.$queryRaw<
    Array<{
      id: string;
      vendor: string;
      category: string;
      expenseDate: Date;
      amountExcl: number;
      vatAmount: number;
      status: string;
    }>
  >`
    SELECT id, vendor, category, expenseDate,
           amountExcl, vatAmount, status
    FROM finpilot_expense
    WHERE clientId IS NULL
    AND vatAmount > 0
    AND expenseDate >= ${startDateOnly}
    AND expenseDate <= ${endDateOnly}
    ORDER BY expenseDate ASC
  `;

  return rows.map((r) => ({
    id: r.id,
    vendor: r.vendor,
    category: r.category,
    expenseDate: new Date(r.expenseDate).toISOString(),
    amountExcl: Number(r.amountExcl),
    vatAmount: Number(r.vatAmount),
    status: r.status,
  }));
}

function roundPercent(value: number): number {
  return Math.round(value * 100 * 10) / 10;
}

const QUARTERS = (year: number) => [
  {
    label: "Q1",
    period: `Jan – Mar ${year}`,
    range: getQuarterRange(year, 1),
  },
  {
    label: "Q2",
    period: `Apr – Jun ${year}`,
    range: getQuarterRange(year, 2),
  },
  {
    label: "Q3",
    period: `Jul – Sep ${year}`,
    range: getQuarterRange(year, 3),
  },
  {
    label: "Q4",
    period: `Oct – Dec ${year}`,
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

  // ── Annual aggregates ──────────────────────────────────────────────────────

  const [annualVatCollectedAgg, annualExpenses] = await Promise.all([
    prisma.incomeEntry.aggregate({
      _sum: { vatAmount: true },
      where: {
        clientId: null,
        receivedAt: { gte: yearRange.start, lte: yearRange.end },
      },
    }),
    getExpenseSum(yearRange.startDateOnly, yearRange.endDateOnly),
  ]);

  const withVatRows = await prisma.$queryRaw<Array<{ total: number }>>`
    SELECT COALESCE(SUM(amountExcl + vatAmount), 0) as total
    FROM finpilot_expense
    WHERE clientId IS NULL
    AND vatAmount > 0
    AND expenseDate >= ${yearRange.startDateOnly}
    AND expenseDate <= ${yearRange.endDateOnly}
  `;

  const totalVatCollected = Number(annualVatCollectedAgg._sum?.vatAmount ?? 0);
  const totalExpensesExclVat = annualExpenses.amountExcl;
  const totalExpensesInclVat =
    annualExpenses.amountExcl + annualExpenses.vatAmount;
  const totalExpenses = totalExpensesInclVat;
  const totalExpensesWithVat = Number(withVatRows[0]?.total ?? 0);
  const totalVatPaid = annualExpenses.vatAmount;

  const effectiveVatRate =
    totalExpensesExclVat > 0
      ? roundPercent(totalVatPaid / totalExpensesExclVat)
      : 0;
  const vatExpenseShare =
    totalExpensesInclVat > 0
      ? roundPercent(totalExpensesWithVat / totalExpensesInclVat)
      : 0;

  // ── Per-quarter data ───────────────────────────────────────────────────────

  const quarters: Quarter[] = await Promise.all(
    QUARTERS(year).map(async (q) => {
      const [expSum, vatCollectedAgg, expenses] = await Promise.all([
        getExpenseSum(q.range.startDateOnly, q.range.endDateOnly),
        prisma.incomeEntry.aggregate({
          _sum: { vatAmount: true },
          where: {
            clientId: null,
            receivedAt: { gte: q.range.start, lte: q.range.end },
          },
        }),
        getExpensesWithVat(q.range.startDateOnly, q.range.endDateOnly),
      ]);

      const vatPaid = expSum.vatAmount;
      const vatCollected = Number(vatCollectedAgg._sum?.vatAmount ?? 0);

      return {
        label: q.label,
        period: q.period,
        vatPaid,
        vatCollected,
        balance: vatCollected - vatPaid,
        expenses,
      };
    }),
  );

  return NextResponse.json({
    year,
    totalVatCollected,
    totalVatPaid,
    totalExpenses,
    totalExpensesExclVat,
    totalExpensesInclVat,
    totalExpensesWithVat,
    effectiveVatRate,
    vatExpenseShare,
    netVatPosition: totalVatCollected - totalVatPaid,
    quarters,
  });
}
