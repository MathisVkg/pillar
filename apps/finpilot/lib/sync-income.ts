import { prisma } from "@pillar/database";

export async function syncPillarIncome(): Promise<number> {
  const paidInvoices = await prisma.invoice.findMany({
    where: { status: "paid", paidAt: { not: null } },
    include: { client: { select: { name: true } } },
  });

  const existingEntries = await prisma.incomeEntry.findMany({
    where: { sourceType: "pillar", clientId: null },
    select: { sourceId: true },
  });

  const syncedIds = new Set(existingEntries.map((e) => e.sourceId));

  let synced = 0;
  for (const invoice of paidInvoices) {
    if (syncedIds.has(invoice.id)) continue;
    if (!invoice.paidAt) continue;
    await prisma.incomeEntry.create({
      data: {
        clientId: null,
        sourceType: "pillar",
        sourceId: invoice.id,
        amountExcl: invoice.subtotal,
        vatAmount: invoice.vatAmount,
        receivedAt: invoice.paidAt,
        label: `${invoice.number} · ${invoice.client.name}`,
      },
    });
    synced++;
  }
  return synced;
}
