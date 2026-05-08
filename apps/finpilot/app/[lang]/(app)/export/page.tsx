"use client";

import { useState } from "react";
import { useTranslation } from "@/components/LangProvider";

function getQuarterDates(q: 1 | 2 | 3 | 4, year: number): [string, string] {
  const startMonth = (q - 1) * 3;
  const start = new Date(year, startMonth, 1);
  const end = new Date(year, startMonth + 3, 0);
  return [start.toISOString().split("T")[0], end.toISOString().split("T")[0]];
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      onClick={() => onChange(!checked)}
      style={{
        width: "36px",
        height: "20px",
        padding: 0,
        border: "none",
        borderRadius: "999px",
        background: checked ? "var(--income)" : "var(--border)",
        cursor: "pointer",
        position: "relative",
        flexShrink: 0,
        transition: "background 0.15s",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "2px",
          left: checked ? "18px" : "2px",
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          background: "#fff",
          transition: "left 0.15s",
          boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
        }}
      />
    </button>
  );
}

export default function ExportPage() {
  const { t } = useTranslation();
  const now = new Date();
  const currentYear = now.getFullYear();

  const [fromDate, setFromDate] = useState<string>(() => {
    const q = Math.floor(now.getMonth() / 3);
    const d = new Date(currentYear, q * 3, 1);
    return d.toISOString().split("T")[0];
  });
  const [toDate, setToDate] = useState<string>(() => {
    return now.toISOString().split("T")[0];
  });
  const [includeIncome, setIncludeIncome] = useState(true);
  const [includeExpenses, setIncludeExpenses] = useState(true);
  const [includeVat, setIncludeVat] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [downloadedCount, setDownloadedCount] = useState(0);

  function setQuarter(q: 1 | 2 | 3 | 4) {
    const [f, t2] = getQuarterDates(q, currentYear);
    setFromDate(f);
    setToDate(t2);
  }

  function setThisYear() {
    setFromDate(`${currentYear}-01-01`);
    setToDate(`${currentYear}-12-31`);
  }

  async function handleDownload() {
    if (!includeIncome && !includeExpenses && !includeVat) {
      setError(t("exportPage.atLeastOne"));
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(false);
    setDownloadedCount(0);

    const params = `from=${fromDate}&to=${toDate}`;
    let downloaded = 0;

    async function downloadFile(url: string, filename: string) {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      a.click();
      URL.revokeObjectURL(a.href);
      downloaded++;
    }

    try {
      if (includeIncome) {
        await downloadFile(
          `/api/export/income?${params}`,
          `pillar-finpilot-revenus-${fromDate}-${toDate}.csv`,
        );
      }
      if (includeExpenses) {
        await new Promise((r) => setTimeout(r, 300));
        await downloadFile(
          `/api/export/expenses?${params}`,
          `pillar-finpilot-depenses-${fromDate}-${toDate}.csv`,
        );
      }
      if (includeVat) {
        await new Promise((r) => setTimeout(r, 300));
        await downloadFile(
          `/api/export/vat-summary?${params}`,
          `pillar-finpilot-tva-${fromDate}-${toDate}.csv`,
        );
      }

      setDownloadedCount(downloaded);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError(t("common.error"));
    } finally {
      setLoading(false);
    }
  }

  const cardStyle: React.CSSProperties = {
    background: "#fff",
    border: "1px solid var(--border)",
    borderRadius: "14px",
    padding: "20px",
    marginBottom: "16px",
  };

  const cardTitleStyle: React.CSSProperties = {
    fontSize: "13px",
    fontWeight: 600,
    color: "var(--text)",
    marginBottom: "14px",
    fontFamily: "var(--font-sans)",
  };

  const inputStyle: React.CSSProperties = {
    height: "36px",
    border: "1px solid var(--border-md)",
    borderRadius: "10px",
    padding: "0 12px",
    fontSize: "13px",
    fontFamily: "var(--font-sans)",
    color: "var(--text)",
    background: "var(--ground)",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "11px",
    color: "var(--muted)",
    fontWeight: 500,
    marginBottom: "4px",
    display: "block",
  };

  const chipStyle: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "10px",
    fontWeight: 500,
    padding: "4px 10px",
    borderRadius: "999px",
    border: "1px solid var(--border)",
    background: "var(--surface)",
    color: "var(--muted)",
    cursor: "pointer",
    letterSpacing: "0.02em",
    whiteSpace: "nowrap" as const,
  };

  const includeRows: Array<{
    icon: string;
    iconBg: string;
    iconColor: string;
    label: string;
    sub: string;
    value: boolean;
    onChange: (v: boolean) => void;
  }> = [
    {
      icon: "€",
      iconBg: "var(--income-l)",
      iconColor: "var(--income)",
      label: t("exportPage.includeIncome"),
      sub: t("exportPage.incomeSub"),
      value: includeIncome,
      onChange: setIncludeIncome,
    },
    {
      icon: "€",
      iconBg: "var(--expense-l, #fff3f0)",
      iconColor: "var(--expense, #e05c3a)",
      label: t("exportPage.includeExpenses"),
      sub: t("exportPage.expensesSub"),
      value: includeExpenses,
      onChange: setIncludeExpenses,
    },
    {
      icon: "%",
      iconBg: "var(--vat-l, #f0f4ff)",
      iconColor: "var(--vat, #4361ee)",
      label: t("exportPage.includeVat"),
      sub: t("exportPage.vatSub"),
      value: includeVat,
      onChange: setIncludeVat,
    },
  ];

  return (
    <div className="fp-page" style={{ maxWidth: "640px", margin: "0 auto" }}>
      {/* Page header */}
      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "20px",
            fontWeight: 700,
            color: "var(--text)",
            letterSpacing: "-0.4px",
            marginBottom: "6px",
          }}
        >
          {t("exportPage.title")}
        </div>
        <div style={{ fontSize: "13px", color: "var(--muted)" }}>
          {t("exportPage.description")}
        </div>
      </div>

      {/* Date range card */}
      <div style={cardStyle}>
        <div style={cardTitleStyle}>{t("exportPage.dateRange")}</div>

        <div
          className="fp-form-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
            marginBottom: "12px",
          }}
        >
          <div>
            <label htmlFor="export-from-date" style={labelStyle}>
              {t("exportPage.from")}
            </label>
            <input
              id="export-from-date"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="export-to-date" style={labelStyle}>
              {t("exportPage.to")}
            </label>
            <input
              id="export-to-date"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "6px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              color: "var(--muted)",
              marginRight: "2px",
            }}
          >
            {t("exportPage.quickPeriods")}:
          </span>
          <button type="button" style={chipStyle} onClick={() => setQuarter(1)}>
            Q1
          </button>
          <button type="button" style={chipStyle} onClick={() => setQuarter(2)}>
            Q2
          </button>
          <button type="button" style={chipStyle} onClick={() => setQuarter(3)}>
            Q3
          </button>
          <button type="button" style={chipStyle} onClick={() => setQuarter(4)}>
            Q4
          </button>
          <button type="button" style={chipStyle} onClick={setThisYear}>
            {currentYear}
          </button>
        </div>
      </div>

      {/* Include card */}
      <div style={cardStyle}>
        <div style={cardTitleStyle}>{t("exportPage.include")}</div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {includeRows.map((row, i) => (
            <div
              key={row.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 0",
                borderBottom:
                  i < includeRows.length - 1
                    ? "1px solid var(--border)"
                    : "none",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: row.iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: row.iconColor,
                  flexShrink: 0,
                }}
              >
                {row.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "var(--text)",
                  }}
                >
                  {row.label}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--subtle)",
                    marginTop: "2px",
                  }}
                >
                  {row.sub}
                </div>
              </div>
              <Toggle checked={row.value} onChange={row.onChange} />
            </div>
          ))}
        </div>
      </div>

      {/* Download card */}
      <div style={cardStyle}>
        {success && (
          <div
            style={{
              fontSize: "13px",
              color: "var(--income)",
              fontWeight: 500,
              marginBottom: "12px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            ✓{" "}
            {t("exportPage.filesDownloaded").replace(
              "{n}",
              String(downloadedCount),
            )}
          </div>
        )}

        {error && (
          <div
            style={{
              fontSize: "13px",
              color: "var(--danger)",
              marginBottom: "12px",
            }}
          >
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleDownload}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "999px",
            border: "none",
            background: loading ? "var(--muted)" : "var(--income)",
            color: "#fff",
            fontSize: "14px",
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "var(--font-sans)",
          }}
        >
          {loading ? t("exportPage.generating") : t("exportPage.downloadCsv")}
        </button>

        <div
          style={{
            fontSize: "11px",
            color: "var(--subtle)",
            marginTop: "10px",
            lineHeight: 1.5,
          }}
        >
          {t("exportPage.formatNote")}
        </div>
      </div>
    </div>
  );
}
