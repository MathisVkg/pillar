import { auth } from "@/lib/auth";
import { prisma } from "@pillar/database";
import { getT, type Lang } from "@/lib/i18n";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Pillar · Dashboard" };

type Props = { params: Promise<{ locale: string }> };

function daysFromNow(date: Date): number {
  const now = new Date(); now.setHours(0, 0, 0, 0);
  const d   = new Date(date); d.setHours(0, 0, 0, 0);
  return Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function urgencyColor(days: number): string {
  if (days < 0)  return "#dc2626";
  if (days <= 30) return "#dc2626";
  if (days <= 60) return "#ca8a04";
  return "#16a34a";
}

export default async function DashboardPage({ params }: Props) {
  await auth();
  const { locale } = await params;
  const t = getT(locale as Lang);

  const now = new Date();
  const in60Days = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);

  // ── Fetch all dashboard data in parallel ───────────────────────────────────
  const [
    openTicketCount,
    activeClientCount,
    rawUnbilledEntries,
    rawWarranties,
    rawRenewals,
    rawAssetCounts,
  ] = await Promise.all([
    prisma.ticket.count({
      where: { status: { in: ["open", "in_progress"] }, client: { isActive: true } },
    }),
    prisma.client.count({ where: { isActive: true } }),
    prisma.timeEntry.findMany({
      where: { isInvoiced: false, isBillable: true, client: { isActive: true } },
      select: {
        durationMinutes: true,
        hourlyRate: true,
        clientId: true,
        client: { select: { id: true, name: true } },
      },
    }),
    prisma.asset.findMany({
      where: {
        warrantyExpiresAt: { lte: in60Days },
        status: { not: "retired" },
        client: { isActive: true },
      },
      orderBy: { warrantyExpiresAt: "asc" },
      select: {
        id: true,
        name: true,
        warrantyExpiresAt: true,
        client: { select: { id: true, name: true } },
      },
    }),
    prisma.contract.findMany({
      where: { renewalDate: { lte: in60Days }, client: { isActive: true } },
      orderBy: { renewalDate: "asc" },
      select: {
        id: true,
        name: true,
        vendor: true,
        renewalDate: true,
        costPerYear: true,
        client: { select: { id: true, name: true } },
      },
    }),
    prisma.asset.groupBy({
      by: ["status"],
      where: { client: { isActive: true }, status: { in: ["ok", "warning", "critical"] } },
      _count: { _all: true },
    }),
  ]);

  // ── Process unbilled by client ─────────────────────────────────────────────
  const clientMap = new Map<string, { id: string; name: string; minutes: number; amount: number }>();
  for (const e of rawUnbilledEntries) {
    const cur = clientMap.get(e.clientId) ?? { id: e.clientId, name: e.client.name, minutes: 0, amount: 0 };
    cur.minutes += e.durationMinutes;
    cur.amount += (e.durationMinutes / 60) * Number(e.hourlyRate);
    clientMap.set(e.clientId, cur);
  }
  const unbilledByClient = Array.from(clientMap.values())
    .sort((a, b) => b.amount - a.amount)
    .map((c) => ({ ...c, amount: Math.round(c.amount * 100) / 100 }));

  const totalUnbilledMinutes = unbilledByClient.reduce((s, c) => s + c.minutes, 0);
  const totalUnbilledAmount  = unbilledByClient.reduce((s, c) => s + c.amount, 0);

  // ── Process warranties ─────────────────────────────────────────────────────
  const expiringWarranties = rawWarranties.map((a) => ({
    ...a,
    warrantyExpiresAt: a.warrantyExpiresAt!.toISOString().slice(0, 10),
    daysLeft: daysFromNow(a.warrantyExpiresAt!),
  }));

  // ── Process contract renewals ──────────────────────────────────────────────
  const upcomingRenewals = rawRenewals.map((c) => ({
    ...c,
    renewalDate: c.renewalDate.toISOString().slice(0, 10),
    daysUntilRenewal: daysFromNow(c.renewalDate),
    costPerYear: c.costPerYear ? Number(c.costPerYear) : null,
  }));

  // ── Asset health summary ───────────────────────────────────────────────────
  const healthMap: Record<string, number> = { ok: 0, warning: 0, critical: 0 };
  for (const row of rawAssetCounts) healthMap[row.status] = row._count._all;

  // ── Metrics ────────────────────────────────────────────────────────────────
  const totalUnbilledHours = Math.round((totalUnbilledMinutes / 60) * 10) / 10;
  const metrics = [
    {
      label: t("dashboard.hoursThisMonth"),
      value: totalUnbilledHours > 0 ? String(totalUnbilledHours) : "—",
      sub: totalUnbilledAmount > 0 ? `€${Math.round(totalUnbilledAmount).toLocaleString("fr-BE")} unbilled` : t("dashboard.noEntriesYet"),
      color: totalUnbilledHours > 0 ? "var(--accent)" : "var(--con-text)",
    },
    {
      label: t("dashboard.openTickets"),
      value: String(openTicketCount),
      sub: t("dashboard.acrossAllClients"),
      color: openTicketCount > 0 ? "#ca8a04" : "var(--con-text)",
    },
    {
      label: t("dashboard.clientsActive"),
      value: String(activeClientCount),
      sub: t("dashboard.goToClients"),
    },
    {
      label: t("dashboard.expiringWarranties"),
      value: String(expiringWarranties.length + upcomingRenewals.length),
      sub: expiringWarranties.length + upcomingRenewals.length > 0 ? "alerts" : "all clear",
      color: expiringWarranties.length + upcomingRenewals.length > 0 ? "#dc2626" : "#16a34a",
    },
  ];

  // ── Shared styles ──────────────────────────────────────────────────────────
  const card: React.CSSProperties = {
    background: "var(--con-surface)",
    border: "1px solid var(--con-border)",
    borderRadius: "4px",
    padding: "14px 16px",
  };

  const cardTitle: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "9px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--con-subtle)",
    marginBottom: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const rowStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    padding: "6px 0",
    borderBottom: "1px solid var(--con-border)",
  };

  const mono: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    color: "var(--con-text)",
  };

  const muted: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "10px",
    color: "var(--con-muted)",
  };

  const OVERDUE_BADGE = (
    <span style={{
      fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.06em",
      textTransform: "uppercase", padding: "1px 5px", borderRadius: "2px",
      background: "#dc2626", color: "#fff", fontWeight: 700, marginRight: "6px",
    }}>
      {t("dashboard.overdueBadge")}
    </span>
  );

  return (
    <div>
      {/* ── Page header ──────────────────────────────────────────────────────── */}
      <div style={{ marginBottom: "20px" }}>
        <h1 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--con-subtle)", marginBottom: "4px" }}>
          {t("dashboard.morningBriefing")}
        </h1>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--con-subtle)" }}>
          {now.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      {/* ── Metric row ───────────────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "6px", marginBottom: "12px" }}>
        {metrics.map((m) => (
          <div key={m.label} style={card}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--con-subtle)", marginBottom: "4px" }}>
              {m.label}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "22px", fontWeight: 600, color: m.color ?? "var(--con-text)", lineHeight: 1 }}>
              {m.value}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--con-subtle)", marginTop: "3px" }}>
              {m.sub}
            </div>
          </div>
        ))}
      </div>

      {/* ── Alert row: warranties + renewals ─────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", marginBottom: "6px" }}>

        {/* Expiring warranties */}
        <div style={card}>
          <div style={cardTitle}>
            <span>{t("dashboard.expiringWarranties")}</span>
            {expiringWarranties.length > 5 && (
              <Link href={`/${locale}/assets`} style={{ ...muted, textDecoration: "none" }}>
                {t("dashboard.viewAll", { n: expiringWarranties.length })}
              </Link>
            )}
          </div>
          {expiringWarranties.length === 0 ? (
            <p style={{ ...muted, padding: "8px 0" }}>{t("dashboard.noExpiring")}</p>
          ) : (
            expiringWarranties.slice(0, 5).map((a) => (
              <div key={a.id} style={rowStyle}>
                <div>
                  <span style={{ ...mono, fontWeight: 500 }}>{a.name}</span>
                  <span style={{ ...muted, marginLeft: "8px" }}>{a.client.name}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ ...mono, color: "var(--con-muted)" }}>{a.warrantyExpiresAt}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700, color: urgencyColor(a.daysLeft), minWidth: "36px", textAlign: "right" }}>
                    {a.daysLeft < 0 ? `${Math.abs(a.daysLeft)}d ago` : t("dashboard.daysLeft", { n: a.daysLeft })}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Contract renewals */}
        <div style={card}>
          <div style={cardTitle}>
            <span>{t("dashboard.contractRenewals")}</span>
            {upcomingRenewals.length > 5 && (
              <Link href={`/${locale}/contracts`} style={{ ...muted, textDecoration: "none" }}>
                {t("dashboard.viewAll", { n: upcomingRenewals.length })}
              </Link>
            )}
          </div>
          {upcomingRenewals.length === 0 ? (
            <p style={{ ...muted, padding: "8px 0" }}>{t("dashboard.noRenewals")}</p>
          ) : (
            upcomingRenewals.slice(0, 5).map((c) => (
              <div key={c.id} style={rowStyle}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <span style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "4px" }}>
                    {c.daysUntilRenewal < 0 && OVERDUE_BADGE}
                    <span style={{ ...mono, fontWeight: 500 }}>{c.name}</span>
                    {c.vendor && <span style={{ ...muted, marginLeft: "4px" }}>· {c.vendor}</span>}
                  </span>
                  <span style={{ ...muted }}>{c.client.name}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0, paddingLeft: "12px" }}>
                  {c.costPerYear != null && (
                    <span style={{ ...muted }}>€{c.costPerYear.toLocaleString("fr-BE", { maximumFractionDigits: 0 })}</span>
                  )}
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700, color: urgencyColor(c.daysUntilRenewal), minWidth: "36px", textAlign: "right" }}>
                    {c.daysUntilRenewal < 0 ? `${Math.abs(c.daysUntilRenewal)}d` : t("dashboard.daysLeft", { n: c.daysUntilRenewal })}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── Bottom row: asset health + unbilled ───────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "6px" }}>

        {/* Asset health */}
        <div style={card}>
          <div style={cardTitle}>
            <span>{t("dashboard.assetHealth")}</span>
            <Link href={`/${locale}/assets`} style={{ ...muted, textDecoration: "none" }}>{t("dashboard.viewAll", { n: healthMap.ok + healthMap.warning + healthMap.critical })}</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              { key: "ok",       label: t("dashboard.statusOk"),       color: "#16a34a", count: healthMap.ok },
              { key: "warning",  label: t("dashboard.statusWarning"),  color: "#ca8a04", count: healthMap.warning },
              { key: "critical", label: t("dashboard.statusCritical"), color: "#dc2626", count: healthMap.critical },
            ].map((s) => (
              <Link
                key={s.key}
                href={`/${locale}/assets?status=${s.key}`}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", textDecoration: "none" }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: s.color, display: "inline-block", flexShrink: 0 }} />
                  <span style={{ ...mono, color: s.count > 0 ? "var(--con-text)" : "var(--con-muted)" }}>{s.label}</span>
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: 600, color: s.count > 0 ? s.color : "var(--con-muted)" }}>
                  {s.count}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Unbilled hours */}
        <div style={card}>
          <div style={cardTitle}>
            <span>{t("dashboard.unbilledSection")}</span>
            {totalUnbilledMinutes > 0 && (
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--accent)" }}>
                {t("dashboard.totalUnbilledValue", {
                  h: Math.round((totalUnbilledMinutes / 60) * 10) / 10,
                  amount: Math.round(totalUnbilledAmount).toLocaleString("fr-BE"),
                })}
              </span>
            )}
          </div>
          {unbilledByClient.length === 0 ? (
            <p style={{ ...muted, padding: "8px 0" }}>{t("dashboard.noUnbilled")}</p>
          ) : (
            unbilledByClient.slice(0, 5).map((c) => (
              <div key={c.id} style={rowStyle}>
                <span style={{ ...mono, fontWeight: 500 }}>{c.name}</span>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <span style={{ ...muted }}>
                    {Math.round((c.minutes / 60) * 10) / 10}h · €{Math.round(c.amount).toLocaleString("fr-BE")}
                  </span>
                  <Link
                    href={`/${locale}/billing?clientId=${c.id}`}
                    style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 600, color: "var(--accent)", textDecoration: "none", letterSpacing: "0.02em" }}
                  >
                    {t("dashboard.invoiceNow")}
                  </Link>
                </div>
              </div>
            ))
          )}
          {unbilledByClient.length > 5 && (
            <div style={{ paddingTop: "8px" }}>
              <Link href={`/${locale}/billing`} style={{ ...muted, textDecoration: "none" }}>
                {t("dashboard.viewAll", { n: unbilledByClient.length })}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
