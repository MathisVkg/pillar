"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/components/LangProvider";

interface PLQuarter {
  label: string;
  period: string;
  revenue: number;
  expenses: number;
  result: number;
}

interface PLSummary {
  year: number;
  revenue: {
    total: number;
    pillar: number;
    external: number;
  };
  expenses: {
    total: number;
    byCategory: Record<string, number>;
  };
  recurringRef: {
    yearlyTotal: number;
    count: number;
  };
  result: {
    operating: number;
    margin: number;
  };
  vatPosition: {
    collected: number;
    paid: number;
    net: number;
  };
  quarters: PLQuarter[];
}

const CATEGORY_KEYS: Record<string, string> = {
  software_license: "expenses.categorySoftware",
  hosting: "expenses.categoryHosting",
  telecom: "expenses.categoryTelecom",
  hardware: "expenses.categoryHardware",
  office: "expenses.categoryOffice",
  vehicle: "expenses.categoryVehicle",
  other: "expenses.categoryOther",
};

function formatEuro(amount: number): string {
  return new Intl.NumberFormat("fr-BE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

const now = new Date();
const CURRENT_YEAR = now.getFullYear();
const YEAR_OPTIONS = [CURRENT_YEAR, CURRENT_YEAR - 1, CURRENT_YEAR - 2];

const yearSelectStyle: React.CSSProperties = {
  height: "32px",
  border: "1px solid var(--border-md)",
  borderRadius: "8px",
  padding: "0 10px",
  fontSize: "12px",
  fontFamily: "var(--font-mono)",
  color: "var(--text)",
  background: "var(--surface)",
  cursor: "pointer",
  outline: "none",
};

export default function PLPage() {
  const { t } = useTranslation();

  const [year, setYear] = useState(CURRENT_YEAR);
  const [data, setData] = useState<PLSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setData(null);
    fetch(`/api/pl-summary?year=${year}`)
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [year]);

  // ── KPI card ───────────────────────────────────────────────────────────────

  function KpiCard({
    accent,
    label,
    value,
    valueColor,
    sub,
  }: {
    accent: string;
    label: string;
    value: string;
    valueColor: string;
    sub: string;
  }) {
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

  // ── Breakdown row ──────────────────────────────────────────────────────────

  function BreakdownRow({
    icon,
    iconBg,
    iconColor,
    label,
    amount,
    amountColor,
    pct,
    bold,
  }: {
    icon?: string;
    iconBg?: string;
    iconColor?: string;
    label: string;
    amount: string;
    amountColor: string;
    pct?: string;
    bold?: boolean;
  }) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "10px 0",
        }}
      >
        {icon && (
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "7px",
              background: iconBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              fontWeight: 700,
              color: iconColor,
              flexShrink: 0,
            }}
          >
            {icon}
          </div>
        )}
        {!icon && <div style={{ width: "28px", flexShrink: 0 }} />}
        <div style={{ flex: 1, fontSize: "13px", fontWeight: bold ? 600 : 400, color: bold ? "var(--text)" : "var(--muted)" }}>
          {label}
        </div>
        {pct && (
          <div style={{ fontSize: "11px", color: "var(--subtle)", fontFamily: "var(--font-mono)" }}>
            {pct}
          </div>
        )}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: bold ? "16px" : "13px",
            fontWeight: bold ? 600 : 500,
            color: amountColor,
            minWidth: "110px",
            textAlign: "right",
          }}
        >
          {amount}
        </div>
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className="fp-page" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div className="fp-mobile-stack" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", gap: "12px" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.4px" }}>
            {t("pl.title")}
          </div>
          <select value={year} onChange={(e) => setYear(Number(e.target.value))} style={yearSelectStyle}>
            {YEAR_OPTIONS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <div style={{ padding: "60px", textAlign: "center", color: "var(--subtle)", fontSize: "13px" }}>
          {t("common.loading")}
        </div>
      </div>
    );
  }

  const { revenue, expenses, recurringRef, result, vatPosition, quarters } = data;

  const resultAccent = result.operating >= 0 ? "var(--income)" : "var(--danger)";
  const resultColor = result.operating >= 0 ? "var(--income)" : "var(--danger)";

  // Category rows sorted by amount DESC, only > 0
  const categoryRows = Object.entries(expenses.byCategory)
    .filter(([, amount]) => amount > 0)
    .sort(([, a], [, b]) => b - a);

  return (
    <div className="fp-page" style={{ maxWidth: "1100px", margin: "0 auto" }}>

      {/* Toolbar */}
      <div className="fp-mobile-stack" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px", gap: "12px" }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.4px" }}>
            {t("pl.title")}
          </div>
          <div style={{ fontSize: "13px", color: "var(--muted)", marginTop: "2px" }}>
            {t("pl.subtitle").replace("{year}", String(data.year))}
          </div>
        </div>
        <select value={year} onChange={(e) => setYear(Number(e.target.value))} style={yearSelectStyle}>
          {YEAR_OPTIONS.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>

      {/* KPI cards */}
      <div className="fp-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "20px" }}>
        <KpiCard
          accent="var(--income)"
          label={t("pl.revenueLabel").replace("{year}", String(data.year))}
          value={formatEuro(revenue.total)}
          valueColor="var(--income)"
          sub={t("pl.exclVat")}
        />
        <KpiCard
          accent="var(--expense)"
          label={t("pl.expensesLabel").replace("{year}", String(data.year))}
          value={formatEuro(expenses.total)}
          valueColor="var(--expense)"
          sub="excl. VAT"
        />
        <KpiCard
          accent={resultAccent}
          label={t("pl.resultLabel").replace("{year}", String(data.year))}
          value={formatEuro(result.operating)}
          valueColor={resultColor}
          sub={t("pl.revenueMinusExpenses")}
        />
        <KpiCard
          accent="var(--vat)"
          label={t("pl.margin")}
          value={`${result.margin.toFixed(1)}%`}
          valueColor="var(--vat)"
          sub={t("pl.resultOverRevenue")}
        />
      </div>

      {/* Two-column breakdown */}
      <div className="fp-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>

        {/* Revenue breakdown */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", padding: "20px" }}>
          <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)", marginBottom: "4px" }}>
            {t("pl.revenueBreakdown")}
          </div>

          <BreakdownRow
            icon="P"
            iconBg="var(--accent-l)"
            iconColor="var(--accent)"
            label={t("pl.pillarInvoices")}
            amount={formatEuro(revenue.pillar)}
            amountColor="var(--income)"
            pct={revenue.total > 0 ? `${((revenue.pillar / revenue.total) * 100).toFixed(1)}%` : "—"}
          />
          <BreakdownRow
            icon="E"
            iconBg="var(--income-l)"
            iconColor="var(--income)"
            label={t("pl.externalIncome")}
            amount={formatEuro(revenue.external)}
            amountColor="var(--income)"
            pct={revenue.total > 0 ? `${((revenue.external / revenue.total) * 100).toFixed(1)}%` : "—"}
          />

          <div style={{ borderTop: "1px solid var(--border)", margin: "8px 0" }} />

          <BreakdownRow
            label={t("pl.totalRevenue")}
            amount={formatEuro(revenue.total)}
            amountColor="var(--income)"
            bold
          />
        </div>

        {/* Expenses by category */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", padding: "20px" }}>
          <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)", marginBottom: "4px" }}>
            {t("pl.expensesByCategory")}
          </div>

          {categoryRows.map(([cat, amount]) => (
            <BreakdownRow
              key={cat}
              label={t(CATEGORY_KEYS[cat] ?? "expenses.categoryOther")}
              amount={formatEuro(amount)}
              amountColor="var(--expense)"
              pct={expenses.total > 0 ? `${((amount / expenses.total) * 100).toFixed(1)}%` : "—"}
            />
          ))}

          <div style={{ borderTop: "1px solid var(--border)", margin: "8px 0" }} />

          <BreakdownRow
            label={t("pl.totalExpenses")}
            amount={formatEuro(expenses.total)}
            amountColor="var(--expense)"
            bold
          />

          {/* Recurring reference */}
          <div style={{ borderTop: "1px dashed var(--border)", marginTop: "12px", paddingTop: "10px", display: "flex", alignItems: "flex-start", gap: "10px" }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="var(--subtle)" strokeWidth="1.5" strokeLinecap="round" style={{ marginTop: "2px", flexShrink: 0 }}>
              <path d="M13 3.5A6 6 0 1 1 7 2" />
              <path d="M13 2v2h-2" />
            </svg>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "11px", color: "var(--subtle)", fontStyle: "italic" }}>
                {t("pl.recurringRef")}
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--subtle)", marginTop: "2px" }}>
                <span>{"~"}</span>
                <span>{formatEuro(recurringRef.yearlyTotal)}</span>
                <span>/yr</span>
              </div>
              <div style={{ fontSize: "10px", color: "var(--subtle)", marginTop: "2px" }}>
                {t("pl.recurringNotCounted")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quarterly breakdown */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)", marginBottom: "12px" }}>
          {t("pl.quarterlyBreakdown")}
        </div>
        <div className="fp-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
          {quarters.map((q) => (
            <div
              key={q.label}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "14px",
                padding: "16px",
              }}
            >
              <div style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.3px" }}>
                {q.label}
              </div>
              <div style={{ fontSize: "11px", color: "var(--muted)", marginTop: "1px", marginBottom: "12px" }}>
                {q.period.replace(` ${data.year}`, "")}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: 600, color: "var(--income)" }}>
                  {formatEuro(q.revenue)}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: 600, color: "var(--expense)" }}>
                  <span>{"−"}</span>
                  <span>{formatEuro(q.expenses)}</span>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: q.result >= 0 ? "var(--income)" : "var(--danger)",
                    borderTop: "1px solid var(--border)",
                    paddingTop: "6px",
                    marginTop: "6px",
                  }}
                >
                  {formatEuro(q.result)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom summary strip */}
      <div
        className="fp-pl-summary-grid"
        style={{
          background: "var(--brand)",
          borderRadius: "14px",
          padding: "20px 24px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 2fr",
          gap: "24px",
          alignItems: "center",
        }}
      >
        {/* Operating result */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              marginBottom: "6px",
            }}
          >
            {t("pl.operatingResult")}
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "20px",
              fontWeight: 700,
              color: result.operating >= 0 ? "#fff" : "var(--danger-l, #fca5a5)",
            }}
          >
            {formatEuro(result.operating)}
          </div>
        </div>

        {/* VAT position */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              marginBottom: "6px",
            }}
          >
            VAT position
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "16px",
              fontWeight: 600,
              color: vatPosition.net >= 0 ? "var(--vat-l, #bae6fd)" : "var(--income-l, #bbf7d0)",
            }}
          >
            {vatPosition.net >= 0 ? (
              <>
                <span>Owed: </span>
                <span>{formatEuro(vatPosition.net)}</span>
              </>
            ) : (
              <>
                <span>Credit: +</span>
                <span>{formatEuro(Math.abs(vatPosition.net))}</span>
              </>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <div
          style={{
            fontSize: "10px",
            color: "rgba(255,255,255,0.4)",
            lineHeight: 1.6,
            fontFamily: "var(--font-sans)",
          }}
        >
          {t("pl.disclaimer")}
        </div>
      </div>

    </div>
  );
}
