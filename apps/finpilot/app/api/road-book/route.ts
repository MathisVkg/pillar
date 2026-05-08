import { prisma } from "@pillar/database";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { parseDateOnly } from "@/lib/date-ranges";
import {
  parseRoadBookType,
  validateRoadBookInput,
} from "@/lib/validation";

function endOfDay(date: Date): Date {
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  return end;
}

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

type RoadBookCreateData = {
  tripDate: Date;
  type: string;
  vehicleName: string;
  startLocation: string;
  endLocation: string;
  purpose?: string | null;
  odometerStart?: number | null;
  odometerEnd?: number | null;
  distanceKm: number;
  notes?: string | null;
};

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const vehicle = searchParams.get("vehicle");
  const search = searchParams.get("search");

  const where: Record<string, unknown> = { clientId: null };

  if (type) {
    const typeResult = parseRoadBookType(type);
    if (!typeResult.ok) {
      return NextResponse.json({ error: typeResult.error }, { status: 400 });
    }
    where.type = typeResult.value;
  }

  const dateFilter: Record<string, Date> = {};
  if (from) {
    const parsedFrom = parseDateOnly(from);
    if (!parsedFrom) {
      return NextResponse.json(
        { error: "from must be a valid date" },
        { status: 400 },
      );
    }
    dateFilter.gte = parsedFrom;
  }
  if (to) {
    const parsedTo = parseDateOnly(to);
    if (!parsedTo) {
      return NextResponse.json(
        { error: "to must be a valid date" },
        { status: 400 },
      );
    }
    dateFilter.lte = endOfDay(parsedTo);
  }
  if (dateFilter.gte || dateFilter.lte) where.tripDate = dateFilter;

  if (vehicle?.trim()) {
    where.vehicleName = { contains: vehicle.trim() };
  }

  if (search?.trim()) {
    const q = search.trim();
    where.OR = [
      { vehicleName: { contains: q } },
      { startLocation: { contains: q } },
      { endLocation: { contains: q } },
      { purpose: { contains: q } },
      { notes: { contains: q } },
    ];
  }

  const entries = await prisma.roadBookEntry.findMany({
    where,
    orderBy: { tripDate: "desc" },
    take: 100,
  });

  return NextResponse.json(entries.map(serializeRoadBookEntry));
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const validation = validateRoadBookInput(body);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const entry = await prisma.roadBookEntry.create({
    data: {
      clientId: null,
      ...(validation.value as RoadBookCreateData),
    },
  });

  return NextResponse.json(serializeRoadBookEntry(entry), { status: 201 });
}
