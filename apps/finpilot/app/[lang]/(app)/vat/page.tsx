"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/components/LangProvider";

interface QuarterExpense {
  id: string;
  vendor: string;
  category: string;
  expenseDate: string;
  amountExcl: number;
  vatAmount: number;
  status: string;
}

interface Quarter {
  label: string;
  period: string;
  vatPaid: number;
  vatCollected: number;
  balance: number;
  expenses: QuarterExpense[];
}

interface VatSummary {
  year: number;
  totalVatCollected: number;
  totalVatPaid: number;
  totalExpenses: number;
  totalExpensesExclVat: number;
  totalExpensesInclVat: number;
  totalExpensesWithVat: number;
  effectiveVatRate: number;
  vatExpenseShare: number;
  netVatPosition: number;
  quarters: Quarter[];
}

const CATEGORIES: Record<string, string> = {
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

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-BE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

const now = new Date();
const CURRENT_YEAR = now.getFullYear();
const YEAR_OPTIONS = [CURRENT_YEAR, CURRENT_YEAR - 1, CURRENT_YEAR - 2];

export default function VatPage() {
  const { t } = useTranslation();

  const [year, setYear] = useState(CURRENT_YEAR);
  const [data, setData] = useState<VatSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedQuarter, setExpandedQuarter] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setData(null);
    fetch(`/api/vat-summary?year=${year}`)
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

  // ── Net VAT position banner ────────────────────────────────────────────────

  function NetBanner({ net }: { net: number }) {
    const owedToState = net > 0;
    const creditFromState = net < 0;

    let bg: string;
    let color: string;
    let label: string;
    let amount: string;

    if (owedToState) {
      bg = "var(--vat-ll)";
      color = "var(--vat)";
      label = t("vatSummary.owedToState");
      amount = formatEuro(net);
    } else if (creditFromState) {
      bg = "var(--income-ll)";
      color = "var(--income)";
      label = t("vatSummary.creditFromState");
      amount = `+${formatEuro(Math.abs(net))}`;
    } else {
      bg = "var(--ground)";
      color = "var(--muted)";
      label = t("vatSummary.netPosition");
      amount = formatEuro(0);
    }

    return (
      <div
        style={{
          background: bg,
          borderRadius: "14px",
          padding: "14px 20px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div style={{ fontSize: "13px", fontWeight: 600, color }}>{label}</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--subtle)", marginTop: "3px", letterSpacing: "0.03em" }}>
            {t("dashboard.indicative")}
          </div>
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "22px", fontWeight: 700, color }}>
          {amount}
        </div>
      </div>
    );
  }

  // ── Quarter card ───────────────────────────────────────────────────────────

  function QuarterCard({ q }: { q: Quarter }) {
    const isExpanded = expandedQuarter === q.label;

    return (
      <div
        onClick={() => setExpandedQuarter(isExpanded ? null : q.label)}
        style={{
          background: isExpanded ? "var(--vat-ll)" : "var(--surface)",
          border: isExpanded ? "2px solid var(--vat)" : "1px solid var(--border)",
          borderRadius: "14px",
          padding: "16px 18px",
          cursor: "pointer",
          transition: "border-color 0.12s, background 0.12s",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.3px" }}>
              {q.label}
            </div>
            <div style={{ fontSize: "11px", color: "var(--muted)", marginTop: "2px" }}>
              {q.period}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "10px", color: "var(--muted)", marginBottom: "3px" }}>
              {t("vatSummary.quarterVatPaid")}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "16px", fontWeight: 600, color: "var(--expense)" }}>
              {formatEuro(q.vatPaid)}
            </div>
          </div>
        </div>

        {/* Footer figures */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontSize: "11px", color: "var(--income)" }}>
            {t("vatSummary.collected")}: {formatEuro(q.vatCollected)}
          </div>
          <div style={{ fontSize: "11px", color: q.balance >= 0 ? "var(--vat)" : "var(--income)" }}>
            {t("vatSummary.balance")}: {q.balance >= 0 ? "" : "+"}{formatEuro(Math.abs(q.balance))}
          </div>
        </div>
      </div>
    );
  }

  // ── Quarter expense table ──────────────────────────────────────────────────

  function QuarterTable({ q }: { q: Quarter }) {
    const sumExcl = q.expenses.reduce((s, e) => s + e.amountExcl, 0);
    const sumVat = q.expenses.reduce((s, e) => s + e.vatAmount, 0);
    const sumTotal = q.expenses.reduce((s, e) => s + e.amountExcl + e.vatAmount, 0);

    const thStyle: React.CSSProperties = {
      fontFamily: "var(--font-mono)",
      fontSize: "10px",
      fontWeight: 600,
      color: "var(--muted)",
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      padding: "8px 16px",
      textAlign: "left",
      background: "#fafafa",
      borderBottom: "1px solid var(--border)",
    };

    const thRightStyle: React.CSSProperties = { ...thStyle, textAlign: "right" };

    const tdStyle: React.CSSProperties = {
      padding: "10px 16px",
      fontSize: "13px",
      color: "var(--text)",
      borderBottom: "1px solid #f5f5f5",
      verticalAlign: "middle",
    };

    const tdRightStyle: React.CSSProperties = {
      ...tdStyle,
      textAlign: "right",
      fontFamily: "var(--font-mono)",
    };

    return (
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "14px",
          overflow: "hidden",
          marginTop: "12px",
          opacity: 1,
        }}
      >
        {/* Header */}
        <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)" }}>
            {q.label} expenses with VAT · {q.period}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); setExpandedQuarter(null); }}
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "6px",
              border: "1px solid var(--border)",
              background: "transparent",
              color: "var(--muted)",
              cursor: "pointer",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {q.expenses.length === 0 ? (
          <div style={{ padding: "32px", textAlign: "center", color: "var(--subtle)", fontSize: "13px" }}>
            {t("vatSummary.noExpenses")}
          </div>
        ) : (
          <div className="fp-responsive-table">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={thStyle}>{t("vatSummary.tableDate")}</th>
                  <th style={thStyle}>{t("vatSummary.tableVendor")}</th>
                  <th style={thStyle}>{t("vatSummary.tableCategory")}</th>
                  <th style={thRightStyle}>{t("vatSummary.tableExcl")}</th>
                  <th style={thRightStyle}>{t("vatSummary.tableVat")}</th>
                  <th style={thRightStyle}>{t("vatSummary.tableTotal")}</th>
                </tr>
              </thead>
              <tbody>
                {q.expenses.map((e) => (
                  <tr key={e.id}>
                    <td style={{ ...tdStyle, fontFamily: "var(--font-mono)", fontSize: "12px", whiteSpace: "nowrap" }}>
                      {formatDate(e.expenseDate)}
                    </td>
                    <td style={tdStyle}>{e.vendor}</td>
                    <td style={{ ...tdStyle, color: "var(--muted)", fontSize: "12px" }}>
                      {t(CATEGORIES[e.category] ?? "expenses.categoryOther")}
                    </td>
                    <td style={tdRightStyle}>{formatEuro(e.amountExcl)}</td>
                    <td style={{ ...tdRightStyle, color: "var(--expense)" }}>{formatEuro(e.vatAmount)}</td>
                    <td style={tdRightStyle}>{formatEuro(e.amountExcl + e.vatAmount)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ background: "#fafafa" }}>
                  <td colSpan={3} style={{ ...tdStyle, fontWeight: 600, fontSize: "12px", borderTop: "2px solid var(--border)", borderBottom: "none" }}>
                    Total
                  </td>
                  <td style={{ ...tdRightStyle, fontWeight: 600, borderTop: "2px solid var(--border)", borderBottom: "none" }}>
                    {formatEuro(sumExcl)}
                  </td>
                  <td style={{ ...tdRightStyle, fontWeight: 600, color: "var(--expense)", borderTop: "2px solid var(--border)", borderBottom: "none" }}>
                    {formatEuro(sumVat)}
                  </td>
                  <td style={{ ...tdRightStyle, fontWeight: 600, borderTop: "2px solid var(--border)", borderBottom: "none" }}>
                    {formatEuro(sumTotal)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  const expandedQ = data?.quarters.find((q) => q.label === expandedQuarter) ?? null;

  return (
    <div className="fp-page" style={{ maxWidth: "1100px", margin: "0 auto" }}>

      {/* Toolbar */}
      <div className="fp-mobile-stack" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", gap: "12px" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.4px" }}>
          {t("vatSummary.title")}
        </div>
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          style={{
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
          }}
        >
          {YEAR_OPTIONS.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {loading || !data ? (
        <div style={{ padding: "60px", textAlign: "center", color: "var(--subtle)", fontSize: "13px" }}>
          {t("common.loading")}
        </div>
      ) : (
        <>
          {/* KPI cards */}
          <div className="fp-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "16px" }}>
            <KpiCard
              accent="var(--income)"
              label={t("vatSummary.vatCollected").replace("{year}", String(data.year))}
              value={formatEuro(data.totalVatCollected)}
              valueColor="var(--income)"
              sub={t("vatSummary.fromIncome")}
            />
            <KpiCard
              accent="var(--expense)"
              label={t("vatSummary.vatPaid").replace("{year}", String(data.year))}
              value={formatEuro(data.totalVatPaid)}
              valueColor="var(--expense)"
              sub={t("vatSummary.onExpenses")}
            />
            <KpiCard
              accent="var(--vat)"
              label={t("vatSummary.effectiveRate")}
              value={`${data.effectiveVatRate}%`}
              valueColor="var(--vat)"
              sub={t("vatSummary.effectiveRateSub")}
            />
          </div>

          {/* Net VAT position banner */}
          <NetBanner net={data.netVatPosition} />

          {/* Quarter grid */}
          <div className="fp-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {data.quarters.map((q) => (
              <QuarterCard key={q.label} q={q} />
            ))}
          </div>

          {/* Expanded quarter table */}
          {expandedQ && <QuarterTable q={expandedQ} />}
        </>
      )}
    </div>
  );
}
