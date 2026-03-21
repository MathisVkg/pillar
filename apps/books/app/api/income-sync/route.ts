import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { syncPillarIncome } from "@/lib/sync-income";

export async function POST() {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const synced = await syncPillarIncome();
  return NextResponse.json({ synced });
}
