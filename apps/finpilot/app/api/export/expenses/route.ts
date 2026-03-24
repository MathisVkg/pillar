import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@pillar/database";

function formatAmount(n: number): string {
  return n.toFixed(2).replace(".", ",");
}

function formatDate(d: Date | string): string {
  const date = new Date(d);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function csvRow(fields: string[]): string {
  return fields
    .map((f) => `"${String(f).replace(/"/g, '""')}"`)
    .join(",");
}

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (!from || !to) {
    return NextResponse.json({ error: "from and to are required" }, { status: 400 });
  }

  const fromDate = new Date(from);
  const toDate = new Date(to);
  toDate.setHours(23, 59, 59, 999);

  const expenses = await prisma.expense.findMany({
    where: {
      clientId: null,
      expenseDate: { gte: fromDate, lte: toDate },
    },
    orderBy: { expenseDate: "asc" },
  });

  const headers = csvRow([
    "Date",
    "Fournisseur",
    "Catégorie",
    "Description",
    "Montant HTVA",
    "TVA",
    "Total TVAC",
    "Justificatif",
  ]);

  let totalAmountExcl = 0;
  let totalVat = 0;

  const rows: string[] = expenses.map((exp) => {
    const amountExcl = Number(exp.amountExcl);
    const vatAmount = Number(exp.vatAmount);
    totalAmountExcl += amountExcl;
    totalVat += vatAmount;

    return csvRow([
      formatDate(exp.expenseDate),
      exp.vendor,
      exp.category,
      exp.description ?? "",
      formatAmount(amountExcl),
      formatAmount(vatAmount),
      formatAmount(amountExcl + vatAmount),
      exp.receiptUrl ? "Oui" : "Non",
    ]);
  });

  const totalsRow = csvRow([
    "",
    "",
    "",
    "TOTAL",
    formatAmount(totalAmountExcl),
    formatAmount(totalVat),
    formatAmount(totalAmountExcl + totalVat),
    "",
  ]);

  const csvString = [headers, ...rows, totalsRow].join("\r\n");

  return new Response("\uFEFF" + csvString, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="pillar-finpilot-depenses-${from}-${to}.csv"`,
    },
  });
}
