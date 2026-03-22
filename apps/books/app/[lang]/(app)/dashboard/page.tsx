"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/components/LangProvider";

interface ChartEntry {
  month: string;
  income: number;
  expenses: number;
}

interface VatQuarter {
  period: string;
  totalVatCollected: number;
  totalVatPaid: number;
  balance: number;
}

interface Summary {
  incomeThisMonth: number;
  pillarIncomeThisMonth: number;
  externalIncomeThisMonth: number;
  vatCollectedThisMonth: number;
  expensesThisMonth: number;
  vatPaidThisMonth: number;
  estimatedProfit: number;
  outstandingAmount: number;
  chartData: ChartEntry[];
  vatQuarter: VatQuarter;
  currentMonth: string;
  currentYear: number;
}

function formatEuro(amount: number): string {
  return new Intl.NumberFormat("fr-BE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function SkeletonCard({ accent }: { accent: string }) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "14px",
        padding: "16px 18px",
        borderTop: `3px solid ${accent}`,
      }}
    >
      <div style={{ height: "12px", width: "60%", background: "var(--border)", borderRadius: "4px", marginBottom: "12px" }} />
      <div style={{ height: "28px", width: "50%", background: "var(--border)", borderRadius: "4px", marginBottom: "8px" }} />
      <div style={{ height: "10px", width: "80%", background: "var(--border)", borderRadius: "4px" }} />
    </div>
  );
}

export default function DashboardPage() {
  const { t } = useTranslation();
  const [data, setData] = useState<Summary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/dashboard/summary")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load");
        return r.json();
      })
      .then(setData)
      .catch(() => setError(t("common.error")));
  }, []);

  if (error) {
    return (
      <p style={{ color: "var(--danger)", fontFamily: "var(--font-sans)", fontSize: "14px" }}>
        {error}
      </p>
    );
  }

  // ── Loading skeleton ───────────────────────────────────────────────────────
  if (!data) {
    return (
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "24px" }}>
          <div style={{ height: "28px", width: "200px", background: "var(--border)", borderRadius: "6px", marginBottom: "8px" }} />
          <div style={{ height: "14px", width: "280px", background: "var(--border)", borderRadius: "4px" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "20px" }}>
          <SkeletonCard accent="var(--income)" />
          <SkeletonCard accent="var(--expense)" />
          <SkeletonCard accent="var(--brand)" />
          <SkeletonCard accent="var(--vat)" />
        </div>
      </div>
    );
  }

  // ── Chart calculation ──────────────────────────────────────────────────────
  const maxChartValue = Math.max(
    ...data.chartData.map((d) => Math.max(d.income, d.expenses)),
    1 // guard against division by zero
  );

  // ── KPI card helper ────────────────────────────────────────────────────────
  function KpiCard({
    accent,
    label,
    value,
    sub,
    valueColor,
  }: {
    accent: string;
    label: string;
    value: string;
    sub: string;
    valueColor: string;
  }) {
    return (
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "14px",
          padding: "16px 18px",
          borderTop: `3px solid ${accent}`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ fontSize: "12px", color: "var(--muted)", fontWeight: 500, marginBottom: "8px" }}>
          {label}
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "24px",
            fontWeight: 600,
            lineHeight: 1,
            marginBottom: "6px",
            color: valueColor,
          }}
        >
          {value}
        </div>
        <div style={{ fontSize: "11px", color: "var(--subtle)" }}>{sub}</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      {/* Greeting */}
      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "24px",
            fontWeight: 700,
            color: "var(--text)",
            letterSpacing: "-0.6px",
            marginBottom: "4px",
          }}
        >
          {t("dashboard.goodMorning")}
        </div>
        <div style={{ fontSize: "13px", color: "var(--muted)" }}>
          {t("dashboard.financialOverview")} · {data.currentMonth}
        </div>
      </div>

      {/* KPI grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <KpiCard
          accent="var(--income)"
          label={t("dashboard.incomeThisMonth").replace("{month}", data.currentMonth)}
          value={formatEuro(data.incomeThisMonth)}
          valueColor="var(--income)"
          sub={`${t("dashboard.exclVat")} · ${t("dashboard.allSources")}`}
        />
        <KpiCard
          accent="var(--expense)"
          label={t("dashboard.expensesThisMonth").replace("{month}", data.currentMonth)}
          value={formatEuro(data.expensesThisMonth)}
          valueColor="var(--expense)"
          sub={t("dashboard.exclVat")}
        />
        <KpiCard
          accent="var(--brand)"
          label={t("dashboard.estimatedProfit").replace("{month}", data.currentMonth)}
          value={formatEuro(data.estimatedProfit)}
          valueColor="var(--text)"
          sub={t("dashboard.indicative")}
        />
        {(() => {
          const vatBalance = data.vatQuarter.balance;
          const vatCredit = vatBalance < 0;
          return (
            <KpiCard
              accent="var(--vat)"
              label={t("dashboard.vatBalance").replace("{period}", data.vatQuarter.period)}
              value={vatCredit ? `+${formatEuro(Math.abs(vatBalance))}` : formatEuro(vatBalance)}
              valueColor={vatCredit ? "var(--income)" : "var(--vat)"}
              sub={`${t("dashboard.indicative")} · ${data.vatQuarter.period}`}
            />
          );
        })()}
      </div>

      {/* 6-month bar chart */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "14px",
          padding: "18px 20px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)" }}>
            {t("dashboard.rollingMonths")}
          </div>
          <div style={{ display: "flex", gap: "14px" }}>
            {[
              { color: "var(--income)", label: t("nav.income") },
              { color: "var(--expense)", label: t("nav.expenses") },
            ].map(({ color, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", color: "var(--muted)" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: color }} />
                {label}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "80px", marginBottom: "8px" }}>
          {data.chartData.map((entry) => {
            const incH = Math.round((entry.income / maxChartValue) * 80);
            const expH = Math.round((entry.expenses / maxChartValue) * 80);
            return (
              <div key={entry.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                <div style={{ display: "flex", gap: "2px", alignItems: "flex-end", width: "100%" }}>
                  <div
                    style={{
                      flex: 1,
                      height: `${Math.max(incH, 2)}px`,
                      background: "var(--income)",
                      borderRadius: "3px 3px 0 0",
                      opacity: 0.9,
                    }}
                  />
                  <div
                    style={{
                      flex: 1,
                      height: `${Math.max(expH, 2)}px`,
                      background: "var(--expense)",
                      borderRadius: "3px 3px 0 0",
                      opacity: 0.7,
                    }}
                  />
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    color: "var(--subtle)",
                    textAlign: "center",
                    marginTop: "4px",
                  }}
                >
                  {entry.month}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two-column section */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>

        {/* Income by source */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "14px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "14px 18px",
              borderBottom: "1px solid #f5f5f5",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)" }}>
              {t("dashboard.incomeBySource")}
            </div>
          </div>
          {[
            {
              icon: "P",
              iconBg: "var(--accent-l)",
              iconColor: "var(--accent)",
              name: t("dashboard.pillarInvoices"),
              meta: data.currentMonth,
              amount: formatEuro(data.pillarIncomeThisMonth),
              amountColor: "var(--income)",
            },
            {
              icon: "E",
              iconBg: "var(--income-l)",
              iconColor: "var(--income)",
              name: t("dashboard.externalIncome"),
              meta: t("income.external"),
              amount: formatEuro(data.externalIncomeThisMonth),
              amountColor: "var(--income)",
            },
            {
              icon: "!",
              iconBg: "var(--warn-l)",
              iconColor: "var(--warn)",
              name: t("dashboard.outstanding"),
              meta: "sent · draft",
              amount: formatEuro(data.outstandingAmount),
              amountColor: "var(--warn)",
            },
          ].map((row) => (
            <div
              key={row.name}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 18px",
                borderBottom: "1px solid #f9f9f9",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: row.iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: row.iconColor,
                  flexShrink: 0,
                }}
              >
                {row.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "12px", fontWeight: 500, color: "var(--text)" }}>{row.name}</div>
                <div style={{ fontSize: "11px", color: "var(--subtle)", marginTop: "1px" }}>{row.meta}</div>
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: 600, color: row.amountColor }}>
                {row.amount}
              </div>
            </div>
          ))}
        </div>

        {/* VAT estimate */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "14px",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "14px 18px", borderBottom: "1px solid #f5f5f5" }}>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)" }}>
              {t("dashboard.vatEstimate").replace("{period}", data.vatQuarter.period)}
            </div>
          </div>
          {(() => {
            const vatBalance = data.vatQuarter.balance;
            const vatOwed = vatBalance > 0;
            const vatCredit = vatBalance < 0;
            const balanceLabel = vatCredit
              ? t("dashboard.vatCreditFromState")
              : t("dashboard.vatOwedToState");
            const balanceColor = vatCredit
              ? "var(--income)"
              : vatOwed
              ? "var(--vat)"
              : "var(--muted)";
            const balanceAmount = vatCredit
              ? `+${formatEuro(Math.abs(vatBalance))}`
              : formatEuro(vatBalance);
            const disclaimerBg = vatCredit ? "var(--income-ll)" : "var(--vat-ll)";
            const disclaimerColor = vatCredit ? "var(--income)" : "var(--vat)";
            const disclaimerText = vatOwed
              ? t("dashboard.vatOwedNote")
              : vatCredit
              ? t("dashboard.vatCreditNote")
              : t("dashboard.vatDisclaimer");

            return (
              <>
                {[
                  {
                    label: t("dashboard.collectedOnSales"),
                    amount: `+${formatEuro(data.vatQuarter.totalVatCollected)}`,
                    color: "var(--income)",
                    bold: false,
                  },
                  {
                    label: t("dashboard.paidOnPurchases"),
                    amount: `\u2212${formatEuro(data.vatQuarter.totalVatPaid)}`,
                    color: "var(--expense)",
                    bold: false,
                  },
                  {
                    label: balanceLabel,
                    amount: balanceAmount,
                    color: balanceColor,
                    bold: true,
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 18px",
                      borderBottom: "1px solid #f9f9f9",
                      fontSize: "12px",
                    }}
                  >
                    <div style={{ color: row.bold ? "var(--text)" : "var(--muted)", fontWeight: row.bold ? 600 : 400 }}>
                      {row.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontWeight: 600,
                        color: row.color,
                        fontSize: row.bold ? "15px" : "13px",
                      }}
                    >
                      {row.amount}
                    </div>
                  </div>
                ))}
                <div
                  style={{
                    margin: "10px 18px 14px",
                    padding: "8px 12px",
                    background: disclaimerBg,
                    borderRadius: "8px",
                    fontSize: "11px",
                    color: disclaimerColor,
                    lineHeight: 1.5,
                  }}
                >
                  {disclaimerText}
                </div>
              </>
            );
          })()}
        </div>

      </div>
    </div>
  );
}
