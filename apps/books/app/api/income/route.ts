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

  const entries = await prisma.incomeEntry.findMany({
    where: { clientId: null },
    orderBy: { receivedAt: "desc" },
    take: 50,
  });

  // Batch-fetch source records to avoid N+1 queries
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

  return NextResponse.json(
    entries.map((entry) => {
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
    })
  );
}
