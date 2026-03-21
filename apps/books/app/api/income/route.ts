import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@pillar/database";
import { syncPillarIncome } from "@/lib/sync-income";

export async function GET() {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await syncPillarIncome();

  // Paid entries (all Pillar invoices + paid external income via income_entry)
  const entries = await prisma.incomeEntry.findMany({
    where: { clientId: null },
    orderBy: { receivedAt: "desc" },
    take: 50,
  });

  // Non-paid external income — no income_entry row by design
  const nonPaidExternal = await prisma.externalIncome.findMany({
    where: {
      clientId: null,
      status: { not: "paid" },
    },
    orderBy: { receivedAt: "desc" },
  });

  // Batch-fetch source records for income_entry rows
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
      ? prisma.externalIncome.findMany({
          where: { id: { in: externalIds } },
        })
      : Promise.resolve([]),
  ]);

  const invoiceMap = new Map(invoices.map((inv) => [inv.id, inv]));
  const externalMap = new Map(externalIncomes.map((e) => [e.id, e]));

  // Build rows from income_entry
  const entryRows = entries.map((entry) => {
    if (entry.sourceType === "pillar") {
      const inv = invoiceMap.get(entry.sourceId);
      return {
        id: entry.id,
        sourceType: "pillar" as const,
        label: entry.label,
        amountExcl: Number(entry.amountExcl),
        vatAmount: Number(entry.vatAmount),
        receivedAt: entry.receivedAt.toISOString(),
        invoiceNumber: inv?.number ?? null,
        clientName: inv?.client?.name ?? null,
        externalId: null,
        source: null,
        description: null,
        status: null,
        notes: null,
      };
    } else {
      const ext = externalMap.get(entry.sourceId);
      return {
        id: entry.id,
        sourceType: "external" as const,
        label: entry.label,
        amountExcl: Number(entry.amountExcl),
        vatAmount: Number(entry.vatAmount),
        receivedAt: entry.receivedAt.toISOString(),
        invoiceNumber: null,
        clientName: null,
        externalId: ext?.id ?? null,
        source: ext?.source ?? null,
        description: ext?.description ?? null,
        status: ext?.status ?? null,
        notes: ext?.notes ?? null,
      };
    }
  });

  // Build rows from non-paid external_income
  const nonPaidRows = nonPaidExternal.map((ext) => ({
    id: `ext_${ext.id}`,
    sourceType: "external" as const,
    label: ext.source,
    amountExcl: Number(ext.amountExcl),
    vatAmount: Number(ext.vatAmount),
    receivedAt: ext.receivedAt.toISOString(),
    invoiceNumber: null,
    clientName: null,
    externalId: ext.id,
    source: ext.source,
    description: ext.description,
    status: ext.status,
    notes: ext.notes,
  }));

  // Merge and sort by receivedAt DESC
  const merged = [...entryRows, ...nonPaidRows].sort(
    (a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime()
  );

  return NextResponse.json(merged);
}
