"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  status: string;
  createdAt: string;
}

interface ExpenseFormValues {
  vendor: string;
  amountTotal: string;
  hasVat: boolean;
  vatAmount: string;
  category: string;
  expenseDate: string;
  description: string;
  notes: string;
  status: string;
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

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

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
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ── Shared styles ────────────────────────────────────────────────────────────

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
  boxSizing: "border-box" as const,
};

const actionBtnStyle: React.CSSProperties = {
  width: "28px",
  height: "28px",
  borderRadius: "6px",
  border: "1px solid var(--border)",
  background: "transparent",
  color: "var(--muted)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

// ── Toggle pill ───────────────────────────────────────────────────────────────

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: "36px",
        height: "20px",
        borderRadius: "999px",
        background: checked ? "var(--expense)" : "var(--border)",
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
    </div>
  );
}

// ── ExpenseForm ───────────────────────────────────────────────────────────────

function ExpenseForm({
  initial,
  onSave,
  onCancel,
  submitting,
  error,
}: {
  initial?: Partial<ExpenseFormValues>;
  onSave: (values: ExpenseFormValues) => Promise<void>;
  onCancel: () => void;
  submitting: boolean;
  error: string | null;
}) {
  const { t } = useTranslation();
  const today = new Date().toISOString().split("T")[0];

  const [vendor, setVendor] = useState(initial?.vendor ?? "");
  const [amountTotal, setAmountTotal] = useState(initial?.amountTotal ?? "");
  const [hasVat, setHasVat] = useState(initial?.hasVat ?? true);
  const [vatAmount, setVatAmount] = useState(initial?.vatAmount ?? "");
  const [category, setCategory] = useState(initial?.category ?? "software_license");
  const [expenseDate, setExpenseDate] = useState(initial?.expenseDate ?? today);
  const [description, setDescription] = useState(initial?.description ?? "");
  const [notes] = useState(initial?.notes ?? "");
  const [status, setStatus] = useState(initial?.status ?? "paid");

  // Skip auto-calc on mount so edit form shows saved vatAmount
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    if (hasVat && amountTotal) {
      const total = parseFloat(amountTotal);
      if (!isNaN(total)) {
        setVatAmount(round2((total / 1.21) * 0.21).toFixed(2));
      }
    } else if (!hasVat) {
      setVatAmount("0");
    }
  }, [amountTotal, hasVat]);

  function handleHasVatToggle(v: boolean) {
    setHasVat(v);
    if (!v) {
      setVatAmount("0");
    } else {
      const total = parseFloat(amountTotal);
      if (!isNaN(total) && total > 0) {
        setVatAmount(round2((total / 1.21) * 0.21).toFixed(2));
      }
    }
  }

  // Live breakdown
  const totalNum = parseFloat(amountTotal) || 0;
  const vatNum = hasVat ? (parseFloat(vatAmount) || 0) : 0;
  const exclNum = Math.round((totalNum - vatNum) * 100) / 100;
  const showBreakdown = hasVat && totalNum > 0;

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    await onSave({ vendor, amountTotal, hasVat, vatAmount, category, expenseDate, description, notes, status });
  }

  const labelStyle: React.CSSProperties = {
    fontSize: "11px",
    color: "var(--muted)",
    fontWeight: 500,
    marginBottom: "4px",
    display: "block",
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Row 1 */}
      <div
        className="fp-form-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr auto",
          gap: "8px",
          marginBottom: "8px",
          alignItems: "end",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>{t("expenses.vendor")}</label>
          <input
            type="text"
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
            placeholder={t("expenses.vendorPlaceholder")}
            style={inputStyle}
            required
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>{t("expenses.totalAmount")}</label>
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={amountTotal}
            onChange={(e) => setAmountTotal(e.target.value)}
            style={{ ...inputStyle, fontFamily: "var(--font-mono)" }}
            required
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>{t("expenses.vatAmount")}</label>
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={vatAmount}
            onChange={(e) => setVatAmount(e.target.value)}
            disabled={!hasVat}
            style={{
              ...inputStyle,
              fontFamily: "var(--font-mono)",
              opacity: hasVat ? 1 : 0.4,
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", paddingBottom: "2px" }}>
          <label style={{ ...labelStyle, marginBottom: 0 }}>{t("expenses.hasVat")}</label>
          <Toggle checked={hasVat} onChange={handleHasVatToggle} />
        </div>
      </div>

      {/* Breakdown */}
      {showBreakdown && (
        <div style={{ fontSize: "11px", color: "var(--subtle)", marginBottom: "8px", fontFamily: "var(--font-mono)" }}>
          {t("expenses.breakdown")
            .replace("{excl}", exclNum.toFixed(2))
            .replace("{vat}", vatNum.toFixed(2))
            .replace("{total}", totalNum.toFixed(2))}
        </div>
      )}

      {/* Row 2 */}
      <div
        className="fp-form-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 2fr auto",
          gap: "8px",
          alignItems: "end",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>{t("expenses.category")}</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ ...inputStyle, appearance: "none" as const }}
            required
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {t(CATEGORY_KEYS[cat])}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>{t("expenses.date")}</label>
          <input
            type="date"
            value={expenseDate}
            onChange={(e) => setExpenseDate(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ ...inputStyle, appearance: "none" as const }}
          >
            <option value="paid">{t("expenses.statusPaid")}</option>
            <option value="pending">{t("expenses.statusPending")}</option>
            <option value="draft">{t("expenses.statusDraft")}</option>
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>{t("income.description")}</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={{ display: "flex", gap: "6px", alignItems: "flex-end" }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              height: "36px",
              padding: "0 14px",
              borderRadius: "8px",
              border: "1px solid var(--border)",
              background: "transparent",
              color: "var(--muted)",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
              whiteSpace: "nowrap" as const,
            }}
          >
            {t("common.cancel")}
          </button>
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
              whiteSpace: "nowrap" as const,
            }}
          >
            {submitting ? t("common.loading") : t("common.save")}
          </button>
        </div>
      </div>

      {error && (
        <p style={{ fontSize: "12px", color: "var(--danger)", marginTop: "8px" }}>{error}</p>
      )}
    </form>
  );
}

// ── Status helpers ────────────────────────────────────────────────────────────

function statusBadgeStyle(status: string): React.CSSProperties {
  if (status === "pending") return { background: "var(--warn-l)", color: "var(--warn)" };
  if (status === "draft") return { background: "var(--border)", color: "var(--muted)" };
  return { background: "var(--income-l)", color: "var(--income)" };
}

// ── Group by month ────────────────────────────────────────────────────────────

function groupByMonth(expenses: Expense[]): Array<{ label: string; items: Expense[] }> {
  const groups = new Map<string, Expense[]>();
  for (const e of expenses) {
    const d = new Date(e.expenseDate);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(e);
  }
  return Array.from(groups.entries())
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([, items]) => ({
      label: items[0]
        ? new Date(items[0].expenseDate).toLocaleString("fr-BE", { month: "long", year: "numeric" })
        : "",
      items,
    }));
}

// ── Page ──────────────────────────────────────────────────────────────────────

type StatusFilter = "all" | "paid" | "pending" | "draft";

const PAGE_SIZE = 20;

export default function ExpensesPage() {
  const { t } = useTranslation();

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<Category | "all">("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addSubmitting, setAddSubmitting] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [monthFilter, setMonthFilter] = useState("all");

  const availableMonths = useMemo(() => {
    const seen = new Set<string>();
    const months: Array<{ key: string; label: string }> = [];
    for (const e of expenses) {
      const d = new Date(e.expenseDate);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      if (!seen.has(key)) {
        seen.add(key);
        months.push({
          key,
          label: d.toLocaleString("fr-BE", { month: "long", year: "numeric" }),
        });
      }
    }
    return months.sort((a, b) => b.key.localeCompare(a.key));
  }, [expenses]);

  // Reset to page 1 when filters or search change
  useEffect(() => { setPage(1); }, [search, categoryFilter, statusFilter, monthFilter]);

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

  async function handleAdd(values: ExpenseFormValues) {
    setAddSubmitting(true);
    setAddError(null);
    const res = await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setAddSubmitting(false);
    if (!res.ok) {
      setAddError(t("common.error"));
      return;
    }
    setShowForm(false);
    setLoading(true);
    await loadExpenses();
  }

  async function handleEdit(id: string, values: ExpenseFormValues) {
    setEditSubmitting(true);
    setEditError(null);
    const res = await fetch(`/api/expenses/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setEditSubmitting(false);
    if (!res.ok) {
      setEditError(t("common.error"));
      return;
    }
    setEditingId(null);
    setLoading(true);
    await loadExpenses();
  }

  async function handleDelete(id: string) {
    if (!confirm(t("expenses.confirmDelete"))) return;
    const res = await fetch(`/api/expenses/${id}`, { method: "DELETE" });
    if (res.ok) {
      setLoading(true);
      await loadExpenses();
    }
  }

  const displayed = expenses
    .filter((e) => categoryFilter === "all" || e.category === categoryFilter)
    .filter((e) => statusFilter === "all" || e.status === statusFilter)
    .filter((e) => {
      if (monthFilter === "all") return true;
      const d = new Date(e.expenseDate);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      return key === monthFilter;
    })
    .filter((e) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        e.vendor.toLowerCase().includes(q) ||
        e.description?.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q)
      );
    });

  const total = displayed.reduce((s, e) => s + e.amountExcl + e.vatAmount, 0);
  const totalPages = Math.ceil(displayed.length / PAGE_SIZE);
  const paginated = displayed.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const grouped = groupByMonth(paginated);

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

  const statusChipStyle = (value: StatusFilter): React.CSSProperties => {
    const active = statusFilter === value;
    const colors: Record<StatusFilter, string> = {
      all: "var(--text)",
      paid: "var(--income)",
      pending: "var(--warn)",
      draft: "var(--muted)",
    };
    return {
      fontFamily: "var(--font-mono)",
      fontSize: "10px",
      fontWeight: 500,
      padding: "5px 12px",
      borderRadius: "999px",
      border: `1px solid ${active ? colors[value] : "var(--border)"}`,
      background: active ? colors[value] : "var(--surface)",
      color: active ? (value === "draft" ? "var(--text)" : "#fff") : "var(--muted)",
      cursor: "pointer",
      letterSpacing: "0.02em",
      whiteSpace: "nowrap" as const,
    };
  };

  function statusLabel(s: string): string {
    if (s === "pending") return t("expenses.statusPending");
    if (s === "draft") return t("expenses.statusDraft");
    return t("expenses.statusPaid");
  }

  return (
    <div className="fp-page" style={{ maxWidth: "1100px", margin: "0 auto" }}>

      {/* Toolbar */}
      <div className="fp-mobile-stack" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px", gap: "12px" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.4px" }}>
          {t("expenses.title")}
        </div>
        <button
          onClick={() => { setShowForm((v) => !v); setAddError(null); }}
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

      {/* Add form */}
      {showForm && (
        <div
          style={{
            background: "#fff",
            border: "1px solid var(--border)",
            borderRadius: "14px",
            padding: "18px 20px",
            marginBottom: "16px",
          }}
        >
          <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)", marginBottom: "14px", fontFamily: "var(--font-display)" }}>
            {t("expenses.quickAdd")}
          </div>
          <ExpenseForm
            onSave={handleAdd}
            onCancel={() => { setShowForm(false); setAddError(null); }}
            submitting={addSubmitting}
            error={addError}
          />
        </div>
      )}

      {/* Search */}
      <input
        type="text"
        placeholder={t("expenses.searchPlaceholder")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          boxSizing: "border-box" as const,
          border: "1px solid var(--border-md)",
          borderRadius: "10px",
          padding: "10px 14px",
          fontSize: "13px",
          fontFamily: "var(--font-sans)",
          color: "var(--text)",
          background: "#fff",
          outline: "none",
          marginBottom: "10px",
        }}
      />

      {/* Filter chips */}
      <div className="fp-mobile-stack" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          <button style={chipStyle(categoryFilter === "all")} onClick={() => setCategoryFilter("all")}>
            {t("common.all")}
          </button>
          {CATEGORIES.map((cat) => (
            <button key={cat} style={chipStyle(categoryFilter === cat)} onClick={() => setCategoryFilter(cat)}>
              {t(CATEGORY_KEYS[cat])}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ display: "flex", gap: "6px" }}>
            <button style={statusChipStyle("all")} onClick={() => setStatusFilter("all")}>{t("common.all")}</button>
            <button style={statusChipStyle("paid")} onClick={() => setStatusFilter("paid")}>{t("expenses.statusPaid")}</button>
            <button style={statusChipStyle("pending")} onClick={() => setStatusFilter("pending")}>{t("expenses.statusPending")}</button>
            <button style={statusChipStyle("draft")} onClick={() => setStatusFilter("draft")}>{t("expenses.statusDraft")}</button>
          </div>
          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
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
            <option value="all">All months</option>
            {availableMonths.map((m) => (
              <option key={m.key} value={m.key}>{m.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Expense list */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", overflow: "hidden" }}>
        <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fafafa" }}>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)" }}>
            {displayed.length} {displayed.length === 1 ? "expense" : "expenses"}
          </div>
          <div style={{ background: "var(--expense-l)", color: "var(--expense)", fontSize: "11px", fontWeight: 600, padding: "4px 10px", borderRadius: "999px" }}>
            −{formatEuro(total)}
          </div>
        </div>

        {loading ? (
          <div style={{ padding: "32px", textAlign: "center", color: "var(--subtle)", fontSize: "13px" }}>
            {t("common.loading")}
          </div>
        ) : displayed.length === 0 ? (
          <div style={{ padding: "32px", textAlign: "center", color: "var(--subtle)", fontSize: "13px" }}>
            {t("expenses.noExpenses")}
          </div>
        ) : (
          grouped.map((group) => (
            <div key={group.label}>
              {/* Month header */}
              <div style={{ padding: "8px 18px", background: "#f8f9fb", borderBottom: "1px solid var(--border)", fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 600, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase" as const, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>{group.label}</span>
                <span style={{ color: "var(--expense)" }}>−{formatEuro(group.items.reduce((s, e) => s + e.amountExcl + e.vatAmount, 0))}</span>
              </div>
              {group.items.map((expense) => (
            <div key={expense.id}>
              {/* Row */}
              <div className="fp-mobile-row" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "13px 18px", borderBottom: "1px solid #f5f5f5" }}>
                {/* Icon */}
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "var(--expense-ll, #f5f0ff)",
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

                {/* Body */}
                <div data-mobile-main style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--text)" }}>{expense.vendor}</div>
                  <div style={{ fontSize: "11px", color: "var(--subtle)", marginTop: "2px" }}>
                    {formatDate(expense.expenseDate)} · {t(CATEGORY_KEYS[expense.category as Category] ?? "expenses.categoryOther")}
                    {expense.receiptUrl ? ` · ${t("expenses.receiptAttached")}` : ` · ${t("expenses.noReceipt")}`}
                  </div>
                  {expense.description && (
                    <div style={{ fontSize: "11px", color: "var(--subtle)", marginTop: "2px" }}>
                      {expense.description}
                    </div>
                  )}
                </div>

                {/* Right side */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                  {/* Amount */}
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "14px", fontWeight: 600, color: "var(--expense)" }}>
                      −{formatEuro(expense.amountExcl + expense.vatAmount)}
                    </div>
                    {expense.vatAmount > 0 ? (
                      <div style={{ fontSize: "11px", color: "var(--subtle)", marginTop: "2px" }}>
                        {t("expenses.vatAmount")} {formatEuro(expense.vatAmount)}
                      </div>
                    ) : (
                      <div style={{ fontSize: "11px", color: "var(--subtle)", marginTop: "2px" }}>
                        No VAT
                      </div>
                    )}
                  </div>

                  {/* Status badge */}
                  <div
                    style={{
                      ...statusBadgeStyle(expense.status),
                      fontSize: "10px",
                      fontWeight: 600,
                      padding: "3px 8px",
                      borderRadius: "999px",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {statusLabel(expense.status)}
                  </div>

                  {/* Edit / Delete */}
                  <div style={{ display: "flex", gap: "4px" }}>
                    <button
                      title={t("common.edit")}
                      style={actionBtnStyle}
                      onClick={() => setEditingId(editingId === expense.id ? null : expense.id)}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <path d="M9.5 2.5l2 2L5 11H3v-2l6.5-6.5z" />
                      </svg>
                    </button>
                    <button
                      title={t("common.delete")}
                      style={{ ...actionBtnStyle, color: "var(--danger)" }}
                      onClick={() => handleDelete(expense.id)}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <path d="M2 4h10M5 4V2h4v2M6 7v4M8 7v4M3 4l1 8h6l1-8" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Inline edit form */}
              {editingId === expense.id && (
                <div style={{ borderTop: "1px solid #f0f0f0", padding: "16px 18px", background: "#fafafa" }}>
                  <ExpenseForm
                    initial={{
                      vendor: expense.vendor,
                      amountTotal: String(round2(expense.amountExcl + expense.vatAmount)),
                      hasVat: expense.vatAmount > 0,
                      vatAmount: String(expense.vatAmount),
                      category: expense.category,
                      expenseDate: expense.expenseDate.split("T")[0],
                      description: expense.description ?? "",
                      notes: expense.notes ?? "",
                      status: expense.status,
                    }}
                    onSave={(values) => handleEdit(expense.id, values)}
                    onCancel={() => { setEditingId(null); setEditError(null); }}
                    submitting={editSubmitting}
                    error={editError}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        ))
      )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", fontSize: "13px", color: "var(--muted)" }}>
          <span>
            {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, displayed.length)} of {displayed.length}
          </span>
          <div style={{ display: "flex", gap: "6px" }}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{ padding: "6px 14px", borderRadius: "8px", border: "1px solid var(--border)", background: page === 1 ? "var(--ground)" : "var(--surface)", color: page === 1 ? "var(--subtle)" : "var(--text)", fontSize: "13px", cursor: page === 1 ? "not-allowed" : "pointer", fontFamily: "var(--font-sans)" }}
            >
              ←
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              style={{ padding: "6px 14px", borderRadius: "8px", border: "1px solid var(--border)", background: page === totalPages ? "var(--ground)" : "var(--surface)", color: page === totalPages ? "var(--subtle)" : "var(--text)", fontSize: "13px", cursor: page === totalPages ? "not-allowed" : "pointer", fontFamily: "var(--font-sans)" }}
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
