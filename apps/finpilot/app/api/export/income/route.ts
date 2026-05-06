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

  const entries = await prisma.incomeEntry.findMany({
    where: {
      clientId: null,
      receivedAt: { gte: range.start, lte: range.end },
    },
    orderBy: { receivedAt: "asc" },
  });

  // Batch-fetch source records
  const pillarIds = entries
    .filter((e) => e.sourceType === "pillar")
    .map((e) => e.sourceId);
  const externalIds = entries
    .filter((e) => e.sourceType === "external")
    .map((e) => e.sourceId);

  const [invoices, externalIncomes] = await Promise.all([
    pillarIds.length > 0
      ? prisma.invoice.findMany({
          where: { id: { in: pillarIds } },
          include: { client: { select: { name: true } } },
        })
      : Promise.resolve([]),
    externalIds.length > 0
      ? prisma.externalIncome.findMany({ where: { id: { in: externalIds } } })
      : Promise.resolve([]),
  ]);

  const invoiceMap = new Map(invoices.map((inv) => [inv.id, inv]));
  const externalMap = new Map(externalIncomes.map((e) => [e.id, e]));

  const headers = csvRow([
    "Date",
    "Type",
    "Reference",
    "Client / Source",
    "Description",
    "Montant HTVA",
    "TVA",
    "Total TVAC",
  ]);

  let totalAmountExcl = 0;
  let totalVat = 0;

  const rows: string[] = entries.map((entry) => {
    const amountExcl = Number(entry.amountExcl);
    const vatAmount = Number(entry.vatAmount);
    totalAmountExcl += amountExcl;
    totalVat += vatAmount;

    if (entry.sourceType === "pillar") {
      const inv = invoiceMap.get(entry.sourceId);
      return csvRow([
        formatDate(entry.receivedAt),
        "Pillar",
        inv?.number ?? "",
        inv?.client?.name ?? "",
        entry.label,
        formatAmount(amountExcl),
        formatAmount(vatAmount),
        formatAmount(amountExcl + vatAmount),
      ]);
    } else {
      const ext = externalMap.get(entry.sourceId);
      return csvRow([
        formatDate(entry.receivedAt),
        "Externe",
        "",
        ext?.source ?? entry.label,
        ext?.description ?? "",
        formatAmount(amountExcl),
        formatAmount(vatAmount),
        formatAmount(amountExcl + vatAmount),
      ]);
    }
  });

  const totalsRow = csvRow([
    "",
    "",
    "",
    "",
    "TOTAL",
    formatAmount(totalAmountExcl),
    formatAmount(totalVat),
    formatAmount(totalAmountExcl + totalVat),
  ]);

  const csvString = [headers, ...rows, totalsRow].join("\r\n");

  return new Response(`\uFEFF${csvString}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="pillar-finpilot-revenus-${from}-${to}.csv"`,
    },
  });
}
