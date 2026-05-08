import { prisma } from "@pillar/database";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  parseCompanyAssetCategory,
  parseCompanyAssetStatus,
  validateCompanyAssetInput,
} from "@/lib/validation";

function serializeCompanyAsset(asset: {
  id: string;
  clientId: string | null;
  name: string;
  category: string;
  vendor: string | null;
  purchaseDate: Date;
  purchasePriceExcl: { toString(): string };
  vatAmount: { toString(): string };
  serialNumber: string | null;
  warrantyUntil: Date | null;
  status: string;
  location: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: asset.id,
    clientId: asset.clientId,
    name: asset.name,
    category: asset.category,
    vendor: asset.vendor,
    purchaseDate: asset.purchaseDate.toISOString(),
    purchasePriceExcl: Number(asset.purchasePriceExcl),
    vatAmount: Number(asset.vatAmount),
    serialNumber: asset.serialNumber,
    warrantyUntil: asset.warrantyUntil?.toISOString() ?? null,
    status: asset.status,
    location: asset.location,
    notes: asset.notes,
    createdAt: asset.createdAt.toISOString(),
    updatedAt: asset.updatedAt.toISOString(),
  };
}

type CompanyAssetCreateData = {
  name: string;
  category: string;
  purchaseDate: Date;
  purchasePriceExcl: number;
  vatAmount?: number;
  serialNumber?: string | null;
  vendor?: string | null;
  warrantyUntil?: Date | null;
  status: string;
  location?: string | null;
  notes?: string | null;
};

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  const where: Record<string, unknown> = { clientId: null };

  if (status) {
    const statusResult = parseCompanyAssetStatus(status);
    if (!statusResult.ok) {
      return NextResponse.json({ error: statusResult.error }, { status: 400 });
    }
    where.status = statusResult.value;
  }

  if (category) {
    const categoryResult = parseCompanyAssetCategory(category);
    if (!categoryResult.ok) {
      return NextResponse.json({ error: categoryResult.error }, { status: 400 });
    }
    where.category = categoryResult.value;
  }

  if (search?.trim()) {
    const q = search.trim();
    where.OR = [
      { name: { contains: q } },
      { vendor: { contains: q } },
      { serialNumber: { contains: q } },
      { location: { contains: q } },
      { notes: { contains: q } },
    ];
  }

  const assets = await prisma.companyAsset.findMany({
    where,
    orderBy: { purchaseDate: "desc" },
    take: 100,
  });

  return NextResponse.json(assets.map(serializeCompanyAsset));
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const validation = validateCompanyAssetInput(body);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const asset = await prisma.companyAsset.create({
    data: {
      clientId: null,
      ...(validation.value as CompanyAssetCreateData),
    },
  });

  return NextResponse.json(serializeCompanyAsset(asset), { status: 201 });
}
