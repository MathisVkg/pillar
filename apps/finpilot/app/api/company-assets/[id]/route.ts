import { prisma } from "@pillar/database";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { validateCompanyAssetInput } from "@/lib/validation";

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

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.companyAsset.findFirst({
    where: { id, clientId: null },
  });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await req.json();
  const validation = validateCompanyAssetInput(body, { partial: true });
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const updated = await prisma.companyAsset.update({
    where: { id },
    data: validation.value,
  });

  return NextResponse.json(serializeCompanyAsset(updated));
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.companyAsset.findFirst({
    where: { id, clientId: null },
  });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.companyAsset.delete({ where: { id } });

  return NextResponse.json({ deleted: true });
}
