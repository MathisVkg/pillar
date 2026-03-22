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

  const [vatCollectedAgg, vatPaidAgg] = await Promise.all([
    prisma.incomeEntry.aggregate({
      _sum: { vatAmount: true },
      where: {
        clientId: null,
        receivedAt: { gte: fromDate, lte: toDate },
      },
    }),
    prisma.expense.aggregate({
      _sum: { vatAmount: true },
      where: {
        clientId: null,
        expenseDate: { gte: fromDate, lte: toDate },
      },
    }),
  ]);

  const vatCollected = Number(vatCollectedAgg._sum?.vatAmount ?? 0);
  const vatPaid = Number(vatPaidAgg._sum?.vatAmount ?? 0);
  const balance = vatCollected - vatPaid;

  const headers = csvRow(["Poste", "Montant"]);

  const rows = [
    csvRow(["Période", `${formatDate(fromDate)} - ${formatDate(toDate)}`]),
    csvRow(["TVA collectée sur recettes", formatAmount(vatCollected)]),
    csvRow(["TVA payée sur achats", formatAmount(vatPaid)]),
    csvRow(["Solde estimé", formatAmount(balance)]),
    csvRow(["", ""]),
    csvRow(["Note", "Montant indicatif uniquement."]),
    csvRow(["Note", "La déclaration de votre comptable fait référence."]),
    csvRow(["", ""]),
    csvRow(["Généré par", "Pillar Books"]),
    csvRow(["Date de génération", formatDate(new Date())]),
  ];

  const csvString = [headers, ...rows].join("\r\n");

  return new Response("\uFEFF" + csvString, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="pillar-books-tva-${from}-${to}.csv"`,
    },
  });
}
