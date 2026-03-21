"use client";

import { useEffect, useState, useRef } from "react";
import { useTranslation } from "@/components/LangProvider";

interface Expense {
  id: string;
  vendor: string;
  description: string | null;
  amountExcl: number;
  vatAmount: number;
  category: string;
  expenseDate: string;
  receiptUrl: string | null;
  notes: string | null;
  createdAt: string;
}

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

const CATEGORIES = [
  "software_license",
  "hosting",
  "telecom",
  "hardware",
  "office",
  "vehicle",
  "other",
] as const;

type Category = (typeof CATEGORIES)[number];

const CATEGORY_KEYS: Record<Category, string> = {
  software_license: "expenses.categorySoftware",
  hosting: "expenses.categoryHosting",
  telecom: "expenses.categoryTelecom",
  hardware: "expenses.categoryHardware",
  office: "expenses.categoryOffice",
  vehicle: "expenses.categoryVehicle",
  other: "expenses.categoryOther",
};

export default function ExpensesPage() {
  const { t } = useTranslation();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<Category | "all">("all");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function loadExpenses() {
    const res = await fetch("/api/expenses");
    if (res.ok) {
      const data = await res.json();
      setExpenses(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadExpenses();
  }, []);

  async function handleQuickAdd(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const vendor = (form.elements.namedItem("vendor") as HTMLInputElement).value.trim();
    const amountExcl = parseFloat((form.elements.namedItem("amountExcl") as HTMLInputElement).value);
    const category = (form.elements.namedItem("category") as HTMLSelectElement).value;
    const today = new Date().toISOString().split("T")[0];

    if (!vendor || isNaN(amountExcl) || !category) {
      setFormError("vendor, amount and category are required");
      setSubmitting(false);
      return;
    }

    const res = await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vendor, amountExcl, category, expenseDate: today }),
    });

    setSubmitting(false);

    if (!res.ok) {
      setFormError(t("common.error"));
      return;
    }

    formRef.current?.reset();
    await loadExpenses();
  }

  const filtered = activeFilter === "all"
    ? expenses
    : expenses.filter((e) => e.category === activeFilter);

  const total = filtered.reduce((sum, e) => sum + e.amountExcl, 0);

  const inputStyle: React.CSSProperties = {
    height: "36px",
    border: "1px solid var(--border-md)",
    borderRadius: "8px",
    padding: "0 10px",
    fontSize: "13px",
    fontFamily: "var(--font-sans)",
    color: "var(--text)",
    background: "var(--ground)",
    outline: "none",
    width: "100%",
  };

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
    whiteSpace: "nowrap" as const,
  });

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.4px" }}>
          {t("expenses.title")}
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => {
              // TODO: Phase 2 — receipt upload
            }}
            style={{
              padding: "9px 18px",
              borderRadius: "999px",
              border: "none",
              background: "#f4f4f4",
              color: "var(--text)",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            📎 {t("expenses.attachReceipt")}
          </button>
          <button
            onClick={() => formRef.current?.querySelector("input")?.focus()}
            style={{
              padding: "9px 18px",
              borderRadius: "999px",
              border: "none",
              background: "var(--expense)",
              color: "#fff",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
            }}
          >
            {t("expenses.addExpense")}
          </button>
        </div>
      </div>

      {/* Quick add form */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "14px",
          padding: "18px 20px",
          marginBottom: "16px",
        }}
      >
        <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)", marginBottom: "14px" }}>
          {t("expenses.quickAdd")}
        </div>
        <form
          ref={formRef}
          onSubmit={handleQuickAdd}
          style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr auto", gap: "8px", alignItems: "end" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ fontSize: "11px", color: "var(--muted)", fontWeight: 500 }}>
              {t("expenses.vendor")}
            </label>
            <input
              name="vendor"
              type="text"
              placeholder={t("expenses.vendorPlaceholder")}
              style={inputStyle}
              required
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ fontSize: "11px", color: "var(--muted)", fontWeight: 500 }}>
              {t("expenses.amountExcl")}
            </label>
            <input
              name="amountExcl"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              style={{ ...inputStyle, fontFamily: "var(--font-mono)" }}
              required
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ fontSize: "11px", color: "var(--muted)", fontWeight: 500 }}>
              {t("expenses.category")}
            </label>
            <select
              name="category"
              style={{ ...inputStyle, appearance: "none" }}
              required
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {t(CATEGORY_KEYS[cat])}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={submitting}
            style={{
              height: "36px",
              padding: "0 20px",
              borderRadius: "8px",
              border: "none",
              background: submitting ? "var(--muted)" : "var(--expense)",
              color: "#fff",
              fontSize: "13px",
              fontWeight: 600,
              cursor: submitting ? "not-allowed" : "pointer",
              fontFamily: "var(--font-sans)",
              whiteSpace: "nowrap",
            }}
          >
            {submitting ? t("common.loading") : t("common.save")}
          </button>
        </form>
        {formError && (
          <p style={{ fontSize: "12px", color: "var(--danger)", marginTop: "8px" }}>{formError}</p>
        )}
      </div>

      {/* Filter chips */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "14px", flexWrap: "wrap" }}>
        <button style={chipStyle(activeFilter === "all")} onClick={() => setActiveFilter("all")}>
          {t("common.all")}
        </button>
        {CATEGORIES.map((cat) => (
          <button key={cat} style={chipStyle(activeFilter === cat)} onClick={() => setActiveFilter(cat)}>
            {t(CATEGORY_KEYS[cat])}
          </button>
        ))}
      </div>

      {/* Expense list */}
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
            {filtered.length} {filtered.length === 1 ? "expense" : "expenses"}
          </div>
          <div
            style={{
              background: "var(--expense-l)",
              color: "var(--expense)",
              fontSize: "11px",
              fontWeight: 600,
              padding: "4px 10px",
              borderRadius: "999px",
            }}
          >
            −{formatEuro(total)}
          </div>
        </div>

        {loading ? (
          <div style={{ padding: "32px", textAlign: "center", color: "var(--subtle)", fontSize: "13px" }}>
            {t("common.loading")}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: "32px", textAlign: "center", color: "var(--subtle)", fontSize: "13px" }}>
            {t("expenses.noExpenses")}
          </div>
        ) : (
          filtered.map((expense) => (
            <div
              key={expense.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "13px 18px",
                borderBottom: "1px solid #f5f5f5",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "var(--expense-ll)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--expense)" strokeWidth="1.5" strokeLinecap="round">
                  <rect x="2" y="3" width="12" height="10" rx="2" />
                  <path d="M5 7h6M5 10h4" />
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--text)" }}>{expense.vendor}</div>
                <div style={{ fontSize: "11px", color: "var(--subtle)", marginTop: "2px" }}>
                  {formatDate(expense.expenseDate)} · {t(CATEGORY_KEYS[expense.category as Category] ?? "expenses.categoryOther")}
                  {expense.receiptUrl ? ` · ${t("expenses.receiptAttached")}` : ` · ${t("expenses.noReceipt")}`}
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "14px", fontWeight: 600, color: "var(--expense)" }}>
                  −{formatEuro(expense.amountExcl)}
                </div>
                {expense.vatAmount > 0 && (
                  <div style={{ fontSize: "11px", color: "var(--subtle)", marginTop: "2px" }}>
                    {t("expenses.vatAmount")} {formatEuro(expense.vatAmount)}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
