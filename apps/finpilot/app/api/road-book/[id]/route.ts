import { prisma } from "@pillar/database";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { validateRoadBookInput } from "@/lib/validation";

function serializeRoadBookEntry(entry: {
  id: string;
  clientId: string | null;
  tripDate: Date;
  type: string;
  vehicleName: string;
  startLocation: string;
  endLocation: string;
  purpose: string | null;
  odometerStart: number | null;
  odometerEnd: number | null;
  distanceKm: { toString(): string };
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: entry.id,
    clientId: entry.clientId,
    tripDate: entry.tripDate.toISOString(),
    type: entry.type,
    vehicleName: entry.vehicleName,
    startLocation: entry.startLocation,
    endLocation: entry.endLocation,
    purpose: entry.purpose,
    odometerStart: entry.odometerStart,
    odometerEnd: entry.odometerEnd,
    distanceKm: Number(entry.distanceKm),
    notes: entry.notes,
    createdAt: entry.createdAt.toISOString(),
    updatedAt: entry.updatedAt.toISOString(),
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
  const existing = await prisma.roadBookEntry.findFirst({
    where: { id, clientId: null },
  });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await req.json();
  const validation = validateRoadBookInput(body, {
    partial: true,
    existing: {
      type: existing.type,
      purpose: existing.purpose,
      odometerStart: existing.odometerStart,
      odometerEnd: existing.odometerEnd,
    },
  });
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const updated = await prisma.roadBookEntry.update({
    where: { id },
    data: validation.value,
  });

  return NextResponse.json(serializeRoadBookEntry(updated));
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
  const existing = await prisma.roadBookEntry.findFirst({
    where: { id, clientId: null },
  });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.roadBookEntry.delete({ where: { id } });

  return NextResponse.json({ deleted: true });
}
