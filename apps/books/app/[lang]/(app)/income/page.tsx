"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/components/LangProvider";

interface IncomeEntry {
  id: string;
  number: string;
  clientName: string | null;
  subtotal: number;
  vatAmount: number;
  total: number;
  paidAt: string | null;
  periodStart: string;
  periodEnd: string;
}

type SourceFilter = "all" | "pillar" | "external";

function formatEuro(amount: number): string {
  return new Intl.NumberFormat("fr-BE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-BE", { day: "numeric", month: "short", year: "numeric" });
}

export default function IncomePage() {
  const { t } = useTranslation();
  const [entries, setEntries] = useState<IncomeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<SourceFilter>("all");

  useEffect(() => {
    fetch("/api/income")
      .then((r) => r.json())
      .then((data) => {
        setEntries(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // External only is empty in Phase 1 — Pillar invoices only for now
  const displayed = filter === "external" ? [] : entries;
  const total = displayed.reduce((sum, e) => sum + e.subtotal, 0);

  const chipStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: "var(--font-mono)",
    fontSize: "10px",
    fontWeight: 500,
    padding: "5px 12px",
    borderRadius: "999px",
    border: `1px solid ${active ? "var(--text)" : "var(--border)"}`,
    background: active ? "var(--text)" : "var(--surface)",
    color: active ? "#fff" : "var(--muted)",
    cursor: "pointer",
    letterSpacing: "0.02em",
  });

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.4px" }}>
          {t("income.title")}
        </div>
        <button
          onClick={() => {
            // TODO: Phase 2 — external income entry form
          }}
          style={{
            padding: "9px 18px",
            borderRadius: "999px",
            border: "none",
            background: "var(--income)",
            color: "#fff",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "var(--font-sans)",
          }}
        >
          {t("income.addExternal")}
        </button>
      </div>

      {/* Filter chips */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "14px" }}>
        <button style={chipStyle(filter === "all")} onClick={() => setFilter("all")}>
          {t("income.allSources")}
        </button>
        <button style={chipStyle(filter === "pillar")} onClick={() => setFilter("pillar")}>
          {t("income.pillarOnly")}
        </button>
        <button style={chipStyle(filter === "external")} onClick={() => setFilter("external")}>
          {t("income.externalOnly")}
        </button>
      </div>

      {/* Entry list */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", overflow: "hidden" }}>
        <div
          style={{
            padding: "12px 18px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#fafafa",
          }}
        >
          <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)" }}>
            {displayed.length} {displayed.length === 1 ? "entry" : "entries"}
          </div>
          <div
            style={{
              background: "var(--income-l)",
              color: "var(--income)",
              fontSize: "11px",
              fontWeight: 600,
              padding: "4px 10px",
              borderRadius: "999px",
            }}
          >
            +{formatEuro(total)}
          </div>
        </div>

        {loading ? (
          <div style={{ padding: "32px", textAlign: "center", color: "var(--subtle)", fontSize: "13px" }}>
            {t("common.loading")}
          </div>
        ) : displayed.length === 0 ? (
          <div style={{ padding: "32px", textAlign: "center", color: "var(--subtle)", fontSize: "13px" }}>
            {filter === "external" ? "External income coming in Phase 2." : t("income.noIncome")}
          </div>
        ) : (
          displayed.map((entry) => (
            <div
              key={entry.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "13px 18px",
                borderBottom: "1px solid #f5f5f5",
              }}
            >
              {/* Pillar invoice icon */}
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "var(--accent-l)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "var(--accent)",
                  flexShrink: 0,
                }}
              >
                P
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--text)" }}>
                  {entry.number}{entry.clientName ? ` · ${entry.clientName}` : ""}
                </div>
                <div style={{ fontSize: "11px", color: "var(--subtle)", marginTop: "2px" }}>
                  {t("income.pillarInvoice")} · {entry.paidAt ? t("income.paidOn").replace("{date}", formatDate(entry.paidAt)) : ""}
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "14px", fontWeight: 600, color: "var(--income)" }}>
                  +{formatEuro(entry.subtotal)}
                </div>
                <div style={{ fontSize: "11px", color: "var(--subtle)", marginTop: "2px" }}>
                  {t("expenses.vatAmount")} {formatEuro(entry.vatAmount)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
