import { prisma } from "@pillar/database";

type SyncPillarIncomeResult = {
  upserted: number;
  removed: number;
};

export async function syncPillarIncome(): Promise<SyncPillarIncomeResult> {
  const paidInvoices = await prisma.invoice.findMany({
    where: { status: "paid", paidAt: { not: null } },
    include: { client: { select: { name: true } } },
  });

  const paidInvoiceIds = paidInvoices.map((invoice) => invoice.id);

  return prisma.$transaction(async (tx) => {
    const removed = await tx.incomeEntry.deleteMany({
      where: {
        sourceType: "pillar",
        ...(paidInvoiceIds.length > 0
          ? { sourceId: { notIn: paidInvoiceIds } }
          : {}),
      },
    });

    for (const invoice of paidInvoices) {
      if (!invoice.paidAt) continue;

      await tx.incomeEntry.upsert({
        where: {
          sourceType_sourceId: {
            sourceType: "pillar",
            sourceId: invoice.id,
          },
        },
        create: {
          clientId: null,
          sourceType: "pillar",
          sourceId: invoice.id,
          amountExcl: invoice.subtotal,
          vatAmount: invoice.vatAmount,
          receivedAt: invoice.paidAt,
          label: `${invoice.number} · ${invoice.client.name}`,
        },
        update: {
          clientId: null,
          amountExcl: invoice.subtotal,
          vatAmount: invoice.vatAmount,
          receivedAt: invoice.paidAt,
          label: `${invoice.number} · ${invoice.client.name}`,
        },
      });
    }

    return { upserted: paidInvoices.length, removed: removed.count };
  });
}
