"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "@/components/LangProvider";

interface RecurringExpense {
  id: string;
  name: string;
  category: string;
  frequency: "monthly" | "quarterly" | "yearly";
  amount: number;
  isActive: boolean;
  notes: string | null;
  createdAt: string;
}

interface FormValues {
  name: string;
  category: string;
  frequency: string;
  amount: string;
  notes: string;
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

const FREQ_LABELS: Record<RecurringExpense["frequency"], string> = {
  monthly: "recurringExpenses.freqMonthly",
  quarterly: "recurringExpenses.freqQuarterly",
  yearly: "recurringExpenses.freqYearly",
};

function toMonthly(item: RecurringExpense): number {
  if (item.frequency === "monthly") return item.amount;
  if (item.frequency === "quarterly") return item.amount / 3;
  return item.amount / 12;
}

function formatEuro(amount: number): string {
  return new Intl.NumberFormat("fr-BE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

// ── Shared styles ─────────────────────────────────────────────────────────────

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

const labelStyle: React.CSSProperties = {
  fontSize: "11px",
  color: "var(--muted)",
  fontWeight: 500,
  marginBottom: "4px",
  display: "block",
};

// ── RecurringForm ─────────────────────────────────────────────────────────────

function RecurringForm({
  initial,
  onSave,
  onCancel,
  submitting,
  error,
}: {
  initial?: Partial<FormValues>;
  onSave: (values: FormValues) => Promise<void>;
  onCancel: () => void;
  submitting: boolean;
  error: string | null;
}) {
  const { t } = useTranslation();

  const [name, setName] = useState(initial?.name ?? "");
  const [category, setCategory] = useState(
    initial?.category ?? "software_license",
  );
  const [frequency, setFrequency] = useState(initial?.frequency ?? "monthly");
  const [amount, setAmount] = useState(initial?.amount ?? "");
  const [notes, setNotes] = useState(initial?.notes ?? "");

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    await onSave({ name, category, frequency, amount, notes });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="fp-form-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr 2fr auto",
          gap: "8px",
          alignItems: "end",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="recurring-name" style={labelStyle}>
            {t("expenses.vendor")}
          </label>
          <input
            id="recurring-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("recurringExpenses.vendorPlaceholder")}
            style={inputStyle}
            required
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="recurring-category" style={labelStyle}>
            {t("expenses.category")}
          </label>
          <select
            id="recurring-category"
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
          <label htmlFor="recurring-frequency" style={labelStyle}>
            {t("recurringExpenses.frequency")}
          </label>
          <select
            id="recurring-frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            style={{ ...inputStyle, appearance: "none" as const }}
            required
          >
            <option value="monthly">
              {t("recurringExpenses.freqMonthly")}
            </option>
            <option value="quarterly">
              {t("recurringExpenses.freqQuarterly")}
            </option>
            <option value="yearly">{t("recurringExpenses.freqYearly")}</option>
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="recurring-amount" style={labelStyle}>
            {t("expenses.totalAmount")}
          </label>
          <input
            id="recurring-amount"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ ...inputStyle, fontFamily: "var(--font-mono)" }}
            required
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="recurring-notes" style={labelStyle}>
            {t("income.description")}
          </label>
          <input
            id="recurring-notes"
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
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
        <p
          style={{ fontSize: "12px", color: "var(--danger)", marginTop: "8px" }}
        >
          {error}
        </p>
      )}
    </form>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RecurringPage() {
  const { t } = useTranslation();

  const [items, setItems] = useState<RecurringExpense[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/recurring-expenses");
    if (res.ok) {
      setItems(await res.json());
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // ── KPI calculations (active only) ─────────────────────────────────────────

  const active = items.filter((i) => i.isActive);

  const monthlyTotal = active
    .filter((i) => i.frequency === "monthly")
    .reduce((s, i) => s + i.amount, 0);

  const quarterlyTotal = active
    .filter((i) => i.frequency === "quarterly")
    .reduce((s, i) => s + i.amount, 0);

  const yearlyTotal = active
    .filter((i) => i.frequency === "yearly")
    .reduce((s, i) => s + i.amount, 0);

  const annualProjection = monthlyTotal * 12 + quarterlyTotal * 4 + yearlyTotal;

  // ── Handlers ───────────────────────────────────────────────────────────────

  async function handleAdd(values: FormValues) {
    setSubmitting(true);
    setFormError(null);
    const res = await fetch("/api/recurring-expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        category: values.category,
        frequency: values.frequency,
        amount: Number(values.amount),
        notes: values.notes || null,
      }),
    });
    setSubmitting(false);
    if (!res.ok) {
      setFormError(t("common.error"));
      return;
    }
    setShowForm(false);
    setLoading(true);
    await load();
  }

  async function handleEdit(id: string, values: FormValues) {
    setSubmitting(true);
    setFormError(null);
    const res = await fetch(`/api/recurring-expenses/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        category: values.category,
        frequency: values.frequency,
        amount: Number(values.amount),
        notes: values.notes || null,
      }),
    });
    setSubmitting(false);
    if (!res.ok) {
      setFormError(t("common.error"));
      return;
    }
    setEditingId(null);
    setLoading(true);
    await load();
  }

  async function handleToggle(item: RecurringExpense) {
    await fetch(`/api/recurring-expenses/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !item.isActive }),
    });
    await load();
  }

  async function handleDelete(id: string) {
    if (!confirm(t("recurringExpenses.confirmDelete"))) return;
    const res = await fetch(`/api/recurring-expenses/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setLoading(true);
      await load();
    }
  }

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
        <div
          style={{
            fontSize: "12px",
            color: "var(--muted)",
            fontWeight: 500,
            marginBottom: "8px",
          }}
        >
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
    <div className="fp-page" style={{ maxWidth: "1100px", margin: "0 auto" }}>
      {/* Toolbar */}
      <div
        className="fp-mobile-stack"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "18px",
          gap: "12px",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "20px",
              fontWeight: 700,
              color: "var(--text)",
              letterSpacing: "-0.4px",
            }}
          >
            {t("recurringExpenses.title")}
          </div>
          <div
            style={{
              fontSize: "13px",
              color: "var(--muted)",
              marginTop: "2px",
            }}
          >
            {t("recurringExpenses.subtitle")}
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setShowForm((v) => !v);
            setFormError(null);
          }}
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
          {t("recurringExpenses.addRecurring")}
        </button>
      </div>

      {/* KPI grid */}
      <div
        className="fp-grid-4"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <KpiCard
          accent="var(--expense)"
          label={t("recurringExpenses.monthlyTotal")}
          value={formatEuro(monthlyTotal)}
          valueColor="var(--expense)"
          sub={t("recurringExpenses.monthlyItemsOnly")}
        />
        <KpiCard
          accent="var(--expense)"
          label={t("recurringExpenses.quarterlyTotal")}
          value={formatEuro(quarterlyTotal)}
          valueColor="var(--expense)"
          sub={t("recurringExpenses.quarterlyItemsOnly")}
        />
        <KpiCard
          accent="var(--brand)"
          label={t("recurringExpenses.yearlyTotal")}
          value={formatEuro(yearlyTotal)}
          valueColor="var(--text)"
          sub={t("recurringExpenses.yearlyItemsOnly")}
        />
        <KpiCard
          accent="var(--vat)"
          label={t("recurringExpenses.annualProjection")}
          value={formatEuro(annualProjection)}
          valueColor="var(--vat)"
          sub={t("recurringExpenses.annualProjectionSub")}
        />
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
          <RecurringForm
            onSave={handleAdd}
            onCancel={() => {
              setShowForm(false);
              setFormError(null);
            }}
            submitting={submitting}
            error={formError}
          />
        </div>
      )}

      {/* List */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "14px",
          overflow: "hidden",
        }}
      >
        {/* Header */}
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
          <div
            style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)" }}
          >
            {items.length}{" "}
            {items.length === 1
              ? t("recurringExpenses.countSingular")
              : t("recurringExpenses.countPlural")}
          </div>
          <div
            style={{
              background: "var(--expense-l)",
              color: "var(--expense)",
              fontSize: "11px",
              fontWeight: 600,
              padding: "4px 10px",
              borderRadius: "999px",
              display: "flex",
              alignItems: "center",
              gap: "1px",
            }}
          >
            <span>{"~"}</span>
            <span>{formatEuro(annualProjection)}</span>
            <span>{t("recurringExpenses.perYearShort")}</span>
          </div>
        </div>

        {loading ? (
          <div
            style={{
              padding: "32px",
              textAlign: "center",
              color: "var(--subtle)",
              fontSize: "13px",
            }}
          >
            {t("common.loading")}
          </div>
        ) : items.length === 0 ? (
          <div
            style={{
              padding: "32px",
              textAlign: "center",
              color: "var(--subtle)",
              fontSize: "13px",
            }}
          >
            {t("recurringExpenses.noItems")}
          </div>
        ) : (
          items.map((item) => {
            const monthlyEq = toMonthly(item);
            const yearlyEq = monthlyEq * 12;
            const isNotMonthly = item.frequency !== "monthly";

            return (
              <div key={item.id}>
                {/* Row */}
                <div
                  className="fp-mobile-row"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "13px 18px",
                    borderBottom: "1px solid #f5f5f5",
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: item.isActive
                        ? "var(--expense-ll, #f5f0ff)"
                        : "var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke={
                        item.isActive ? "var(--expense)" : "var(--subtle)"
                      }
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    >
                      <path d="M13 3.5A6 6 0 1 1 7 2" />
                      <path d="M13 2v2h-2" />
                    </svg>
                  </div>

                  {/* Body */}
                  <div data-mobile-main style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 500,
                        color: item.isActive ? "var(--text)" : "var(--subtle)",
                        textDecoration: item.isActive ? "none" : "line-through",
                      }}
                    >
                      {item.name}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "var(--subtle)",
                        marginTop: "2px",
                      }}
                    >
                      {t(
                        CATEGORY_KEYS[item.category as Category] ??
                          "expenses.categoryOther",
                      )}
                      {" \u00B7 "}
                      {t(FREQ_LABELS[item.frequency])}
                    </div>
                    {item.notes && (
                      <div
                        style={{
                          fontSize: "11px",
                          color: "var(--subtle)",
                          marginTop: "2px",
                          fontStyle: "italic",
                        }}
                      >
                        {item.notes}
                      </div>
                    )}
                  </div>

                  {/* Right side */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      flexShrink: 0,
                    }}
                  >
                    {/* Amount */}
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "var(--expense)",
                        }}
                      >
                        {formatEuro(item.amount)}
                      </div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "var(--subtle)",
                          marginTop: "1px",
                        }}
                      >
                        {t(FREQ_LABELS[item.frequency]).toLowerCase()}
                      </div>
                      {isNotMonthly && (
                        <div
                          style={{
                            fontSize: "10px",
                            color: "var(--subtle)",
                            marginTop: "1px",
                          }}
                        >
                          <span>{"= "}</span>
                          <span>{formatEuro(yearlyEq)}</span>
                          <span>{t("recurringExpenses.perYearShort")}</span>
                        </div>
                      )}
                    </div>

                    {/* Active toggle */}
                    <button
                      type="button"
                      aria-pressed={item.isActive}
                      onClick={() => handleToggle(item)}
                      style={{
                        width: "36px",
                        height: "20px",
                        padding: 0,
                        border: "none",
                        borderRadius: "999px",
                        background: item.isActive
                          ? "var(--income)"
                          : "var(--border)",
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
                          left: item.isActive ? "18px" : "2px",
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                          background: "#fff",
                          transition: "left 0.15s",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                        }}
                      />
                    </button>

                    {/* Edit / Delete */}
                    <div style={{ display: "flex", gap: "4px" }}>
                      <button
                        type="button"
                        title={t("common.edit")}
                        style={actionBtnStyle}
                        onClick={() => {
                          setEditingId(editingId === item.id ? null : item.id);
                          setFormError(null);
                        }}
                      >
                        <svg
                          aria-hidden="true"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        >
                          <path d="M9.5 2.5l2 2L5 11H3v-2l6.5-6.5z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        title={t("common.delete")}
                        style={{ ...actionBtnStyle, color: "var(--danger)" }}
                        onClick={() => handleDelete(item.id)}
                      >
                        <svg
                          aria-hidden="true"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        >
                          <path d="M2 4h10M5 4V2h4v2M6 7v4M8 7v4M3 4l1 8h6l1-8" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Inline edit form */}
                {editingId === item.id && (
                  <div
                    style={{
                      borderTop: "1px solid #f0f0f0",
                      padding: "16px 18px",
                      background: "#fafafa",
                    }}
                  >
                    <RecurringForm
                      initial={{
                        name: item.name,
                        category: item.category,
                        frequency: item.frequency,
                        amount: String(item.amount),
                        notes: item.notes ?? "",
                      }}
                      onSave={(values) => handleEdit(item.id, values)}
                      onCancel={() => {
                        setEditingId(null);
                        setFormError(null);
                      }}
                      submitting={submitting}
                      error={formError}
                    />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
