import { prisma } from "@pillar/database";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDateOnlyRange, parseDateOnly } from "@/lib/date-ranges";
import { parseRoadBookType } from "@/lib/validation";

function formatAmount(n: number): string {
  return n.toFixed(2).replace(".", ",");
}

function formatDate(d: Date | string): string {
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
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const type = searchParams.get("type");

  const where: Record<string, unknown> = { clientId: null };

  if (from || to) {
    if (from && to) {
      const range = getDateOnlyRange(from, to);
      if (!range) {
        return NextResponse.json(
          { error: "from and to must be valid dates" },
          { status: 400 },
        );
      }
      where.tripDate = { gte: range.start, lte: range.end };
    } else if (from) {
      const parsedFrom = parseDateOnly(from);
      if (!parsedFrom) {
        return NextResponse.json(
          { error: "from must be a valid date" },
          { status: 400 },
        );
      }
      where.tripDate = { gte: parsedFrom };
    } else if (to) {
      const parsedTo = parseDateOnly(to);
      if (!parsedTo) {
        return NextResponse.json(
          { error: "to must be a valid date" },
          { status: 400 },
        );
      }
      parsedTo.setHours(23, 59, 59, 999);
      where.tripDate = { lte: parsedTo };
    }
  }

  if (type && type !== "all") {
    const typeResult = parseRoadBookType(type);
    if (!typeResult.ok) {
      return NextResponse.json({ error: typeResult.error }, { status: 400 });
    }
    where.type = typeResult.value;
  }

  const entries = await prisma.roadBookEntry.findMany({
    where,
    orderBy: { tripDate: "asc" },
  });

  const headers = csvRow([
    "Date",
    "Type",
    "Véhicule",
    "Départ",
    "Arrivée",
    "Objet",
    "Compteur début",
    "Compteur fin",
    "Distance km",
    "Notes",
  ]);

  let totalDistance = 0;
  const rows = entries.map((entry) => {
    const distanceKm = Number(entry.distanceKm);
    totalDistance += distanceKm;
    return csvRow([
      formatDate(entry.tripDate),
      entry.type,
      entry.vehicleName,
      entry.startLocation,
      entry.endLocation,
      entry.purpose ?? "",
      entry.odometerStart?.toString() ?? "",
      entry.odometerEnd?.toString() ?? "",
      formatAmount(distanceKm),
      entry.notes ?? "",
    ]);
  });

  const totalsRow = csvRow([
    "",
    "",
    "",
    "",
    "",
    "TOTAL",
    "",
    "",
    formatAmount(totalDistance),
    "",
  ]);
  const csvString = [headers, ...rows, totalsRow].join("\r\n");

  return new Response(`\uFEFF${csvString}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="pillar-finpilot-road-book.csv"`,
    },
  });
}
