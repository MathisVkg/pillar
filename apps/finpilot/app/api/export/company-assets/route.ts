import { prisma } from "@pillar/database";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  parseCompanyAssetCategory,
  parseCompanyAssetStatus,
} from "@/lib/validation";

function formatAmount(n: number): string {
  return n.toFixed(2).replace(".", ",");
}

function formatDate(d: Date | string | null): string {
  if (!d) return "";
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
  const status = searchParams.get("status");
  const category = searchParams.get("category");

  const where: Record<string, unknown> = { clientId: null };

  if (status && status !== "all") {
    const statusResult = parseCompanyAssetStatus(status);
    if (!statusResult.ok) {
      return NextResponse.json({ error: statusResult.error }, { status: 400 });
    }
    where.status = statusResult.value;
  }

  if (category && category !== "all") {
    const categoryResult = parseCompanyAssetCategory(category);
    if (!categoryResult.ok) {
      return NextResponse.json(
        { error: categoryResult.error },
        { status: 400 },
      );
    }
    where.category = categoryResult.value;
  }

  const assets = await prisma.companyAsset.findMany({
    where,
    orderBy: { purchaseDate: "asc" },
  });

  const headers = csvRow([
    "Nom",
    "Catégorie",
    "Fournisseur",
    "Date d'achat",
    "Prix HTVA",
    "TVA",
    "Total TVAC",
    "Numéro de série",
    "Garantie jusqu'au",
    "Statut",
    "Emplacement",
    "Notes",
  ]);

  let totalAmountExcl = 0;
  let totalVat = 0;
  const rows = assets.map((asset) => {
    const amountExcl = Number(asset.purchasePriceExcl);
    const vatAmount = Number(asset.vatAmount);
    totalAmountExcl += amountExcl;
    totalVat += vatAmount;

    return csvRow([
      asset.name,
      asset.category,
      asset.vendor ?? "",
      formatDate(asset.purchaseDate),
      formatAmount(amountExcl),
      formatAmount(vatAmount),
      formatAmount(amountExcl + vatAmount),
      asset.serialNumber ?? "",
      formatDate(asset.warrantyUntil),
      asset.status,
      asset.location ?? "",
      asset.notes ?? "",
    ]);
  });

  const totalsRow = csvRow([
    "TOTAL",
    "",
    "",
    "",
    formatAmount(totalAmountExcl),
    formatAmount(totalVat),
    formatAmount(totalAmountExcl + totalVat),
    "",
    "",
    "",
    "",
    "",
  ]);
  const csvString = [headers, ...rows, totalsRow].join("\r\n");

  return new Response(`\uFEFF${csvString}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="pillar-finpilot-company-assets.csv"`,
    },
  });
}
