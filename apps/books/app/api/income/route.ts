import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@pillar/database";

export async function GET() {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const invoices = await prisma.invoice.findMany({
    where: { status: "paid" },
    orderBy: { paidAt: "desc" },
    take: 50,
    include: { client: { select: { name: true } } },
  });

  return NextResponse.json(
    invoices.map((inv) => ({
      id: inv.id,
      number: inv.number,
      clientName: inv.client?.name ?? null,
      subtotal: Number(inv.subtotal),
      vatAmount: Number(inv.vatAmount),
      total: Number(inv.total),
      paidAt: inv.paidAt?.toISOString() ?? null,
      periodStart: inv.periodStart.toISOString(),
      periodEnd: inv.periodEnd.toISOString(),
    }))
  );
}
