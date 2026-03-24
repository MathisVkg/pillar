import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@pillar/database";

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

async function getExpensesWithVat(
  year: number,
  monthStart: number,
  monthEnd: number,
  dayStart: number,
  dayEnd: number
): Promise<QuarterExpense[]> {
  const startStr = `${year}-${String(monthStart).padStart(2, "0")}-${String(dayStart).padStart(2, "0")}`;
  const endStr = `${year}-${String(monthEnd).padStart(2, "0")}-${String(dayEnd).padStart(2, "0")}`;

  const rows = await prisma.$queryRaw<Array<{
    id: string;
    vendor: string;
    category: string;
    expenseDate: Date;
    amountExcl: number;
    vatAmount: number;
    status: string;
  }>>`
    SELECT id, vendor, category, expenseDate,
           amountExcl, vatAmount, status
    FROM finpilot_expense
    WHERE clientId IS NULL
    AND vatAmount > 0
    AND expenseDate >= ${startStr}
    AND expenseDate <= ${endStr}
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

const QUARTERS = (year: number) => [
  {
    label: "Q1",
    period: `Jan – Mar ${year}`,
    incomeStart: new Date(`${year}-01-01T00:00:00.000Z`),
    incomeEnd:   new Date(`${year}-03-31T23:59:59.999Z`),
    monthStart: 1, monthEnd: 3, dayStart: 1, dayEnd: 31,
  },
  {
    label: "Q2",
    period: `Apr – Jun ${year}`,
    incomeStart: new Date(`${year}-04-01T00:00:00.000Z`),
    incomeEnd:   new Date(`${year}-06-30T23:59:59.999Z`),
    monthStart: 4, monthEnd: 6, dayStart: 1, dayEnd: 30,
  },
  {
    label: "Q3",
    period: `Jul – Sep ${year}`,
    incomeStart: new Date(`${year}-07-01T00:00:00.000Z`),
    incomeEnd:   new Date(`${year}-09-30T23:59:59.999Z`),
    monthStart: 7, monthEnd: 9, dayStart: 1, dayEnd: 30,
  },
  {
    label: "Q4",
    period: `Oct – Dec ${year}`,
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
  const year = parseInt(url.searchParams.get("year") ?? String(new Date().getFullYear()));

  const yearStart = new Date(`${year}-01-01T00:00:00.000Z`);
  const yearEnd = new Date(`${year}-12-31T23:59:59.999Z`);

  // ── Annual aggregates ──────────────────────────────────────────────────────

  const [annualVatCollectedAgg, annualExpenses] = await Promise.all([
    prisma.incomeEntry.aggregate({
      _sum: { vatAmount: true },
      where: {
        clientId: null,
        receivedAt: { gte: yearStart, lte: yearEnd },
      },
    }),
    getExpenseSum(year, 1, 12, 1, 31),
  ]);

  const withVatRows = await prisma.$queryRaw<Array<{ total: number }>>`
    SELECT COALESCE(SUM(amountExcl + vatAmount), 0) as total
    FROM finpilot_expense
    WHERE clientId IS NULL
    AND vatAmount > 0
    AND expenseDate >= ${`${year}-01-01`}
    AND expenseDate <= ${`${year}-12-31`}
  `;

  const totalVatCollected = Number(annualVatCollectedAgg._sum?.vatAmount ?? 0);
  const totalExpenses = annualExpenses.amountExcl + annualExpenses.vatAmount;
  const totalExpensesWithVat = Number(withVatRows[0]?.total ?? 0);
  const totalVatPaid = annualExpenses.vatAmount;

  const effectiveVatRate =
    totalExpenses > 0
      ? Math.round((totalExpensesWithVat / totalExpenses) * 100 * 10) / 10
      : 0;

  // ── Per-quarter data ───────────────────────────────────────────────────────

  const quarters: Quarter[] = await Promise.all(
    QUARTERS(year).map(async (q) => {
      const [expSum, vatCollectedAgg, expenses] = await Promise.all([
        getExpenseSum(year, q.monthStart, q.monthEnd, q.dayStart, q.dayEnd),
        prisma.incomeEntry.aggregate({
          _sum: { vatAmount: true },
          where: {
            clientId: null,
            receivedAt: { gte: q.incomeStart, lte: q.incomeEnd },
          },
        }),
        getExpensesWithVat(year, q.monthStart, q.monthEnd, q.dayStart, q.dayEnd),
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
    })
  );

  return NextResponse.json({
    year,
    totalVatCollected,
    totalVatPaid,
    totalExpenses,
    totalExpensesWithVat,
    effectiveVatRate,
    netVatPosition: totalVatCollected - totalVatPaid,
    quarters,
  });
}
