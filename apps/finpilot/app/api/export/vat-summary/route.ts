import { prisma } from "@pillar/database";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDateOnlyRange } from "@/lib/date-ranges";

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
  return fields.map((f) => `"${String(f).replace(/"/g, '""')}"`).join(",");
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
    return NextResponse.json(
      { error: "from and to are required" },
      { status: 400 },
    );
  }

  const range = getDateOnlyRange(from, to);
  if (!range) {
    return NextResponse.json(
      { error: "from and to must be valid dates" },
      { status: 400 },
    );
  }

  const [vatCollectedAgg, vatPaidAgg] = await Promise.all([
    prisma.incomeEntry.aggregate({
      _sum: { vatAmount: true },
      where: {
        clientId: null,
        receivedAt: { gte: range.start, lte: range.end },
      },
    }),
    prisma.expense.aggregate({
      _sum: { vatAmount: true },
      where: {
        clientId: null,
        expenseDate: { gte: range.start, lte: range.end },
      },
    }),
  ]);

  const vatCollected = Number(vatCollectedAgg._sum?.vatAmount ?? 0);
  const vatPaid = Number(vatPaidAgg._sum?.vatAmount ?? 0);
  const balance = vatCollected - vatPaid;

  const headers = csvRow(["Poste", "Montant"]);

  const rows = [
    csvRow([
      "Période",
      `${formatDate(range.start)} - ${formatDate(range.end)}`,
    ]),
    csvRow(["TVA collectée sur recettes", formatAmount(vatCollected)]),
    csvRow(["TVA payée sur achats", formatAmount(vatPaid)]),
    csvRow(["Solde estimé", formatAmount(balance)]),
    csvRow(["", ""]),
    csvRow(["Note", "Montant indicatif uniquement."]),
    csvRow(["Note", "La déclaration de votre comptable fait référence."]),
    csvRow(["", ""]),
    csvRow(["Généré par", "Pillar FinPilot"]),
    csvRow(["Date de génération", formatDate(new Date())]),
  ];

  const csvString = [headers, ...rows].join("\r\n");

  return new Response(`\uFEFF${csvString}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="pillar-finpilot-tva-${from}-${to}.csv"`,
    },
  });
}
