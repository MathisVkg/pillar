"use client";

import { useEffect, useState, useRef } from "react";
import { useTranslation } from "@/components/LangProvider";

interface IncomeEntry {
  id: string;
  sourceType: "pillar" | "external";
  label: string;
  amountExcl: number;
  vatAmount: number;
  receivedAt: string;
  invoiceNumber: string | null;
  clientName: string | null;
  externalId: string | null;
  source: string | null;
  description: string | null;
  status: string | null;
  notes: string | null;
}

type SourceFilter = "all" | "pillar" | "external";
type StatusFilter = "all" | "paid" | "waiting" | "draft";

function formatEuro(amount: number): string {
  return new Intl.NumberFormat("fr-BE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-BE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function toDateInput(iso: string): string {
  return iso.split("T")[0];
}

export default function IncomePage() {
  const { t } = useTranslation();
  const [entries, setEntries] = useState<IncomeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [addSubmitting, setAddSubmitting] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const addFormRef = useRef<HTMLFormElement>(null);

  async function loadEntries() {
    const res = await fetch("/api/income");
    if (res.ok) {
      const data = await res.json();
      setEntries(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadEntries();
  }, []);

  async function handleAdd(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setAddError(null);
    setAddSubmitting(true);

    const form = e.currentTarget;
    const source = (form.elements.namedItem("source") as HTMLInputElement).value.trim();
    const amountExcl = parseFloat((form.elements.namedItem("amountExcl") as HTMLInputElement).value);
    const vatAmount = parseFloat((form.elements.namedItem("vatAmount") as HTMLInputElement).value) || 0;
    const receivedAt = (form.elements.namedItem("receivedAt") as HTMLInputElement).value;
    const description = (form.elements.namedItem("description") as HTMLInputElement).value.trim() || undefined;
    const status = (form.elements.namedItem("status") as HTMLSelectElement).value;

    if (!source || isNaN(amountExcl) || !receivedAt) {
      setAddError(t("common.error"));
      setAddSubmitting(false);
      return;
    }

    const res = await fetch("/api/external-income", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source, amountExcl, vatAmount, receivedAt, description, status }),
    });

    setAddSubmitting(false);
    if (!res.ok) {
      setAddError(t("common.error"));
      return;
    }

    addFormRef.current?.reset();
    setShowAddForm(false);
    setLoading(true);
    await loadEntries();
  }

  async function handleEdit(externalId: string, e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setEditError(null);
    setEditSubmitting(true);

    const form = e.currentTarget;
    const source = (form.elements.namedItem("source") as HTMLInputElement).value.trim();
    const amountExcl = parseFloat((form.elements.namedItem("amountExcl") as HTMLInputElement).value);
    const vatAmount = parseFloat((form.elements.namedItem("vatAmount") as HTMLInputElement).value) || 0;
    const receivedAt = (form.elements.namedItem("receivedAt") as HTMLInputElement).value;
    const description = (form.elements.namedItem("description") as HTMLInputElement).value.trim() || undefined;
    const status = (form.elements.namedItem("status") as HTMLSelectElement).value;

    const res = await fetch(`/api/external-income/${externalId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source, amountExcl, vatAmount, receivedAt, description, status }),
    });

    setEditSubmitting(false);
    if (!res.ok) {
      setEditError(t("common.error"));
      return;
    }

    setEditingId(null);
    setEditError(null);
    setLoading(true);
    await loadEntries();
  }

  async function handleDelete(externalId: string) {
    if (!confirm(t("income.confirmDelete"))) return;
    const res = await fetch(`/api/external-income/${externalId}`, { method: "DELETE" });
    if (res.ok) {
      setLoading(true);
      await loadEntries();
    }
  }

  const displayed = entries
    .filter((e) => sourceFilter === "all" || e.sourceType === sourceFilter)
    .filter((e) => {
      if (statusFilter === "all") return true;
      if (e.sourceType === "pillar") return statusFilter === "paid";
      return e.status === statusFilter;
    })
    .filter((e) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        e.label.toLowerCase().includes(q) ||
        e.source?.toLowerCase().includes(q) ||
        e.description?.toLowerCase().includes(q) ||
        e.invoiceNumber?.toLowerCase().includes(q) ||
        e.clientName?.toLowerCase().includes(q)
      );
    });

  const total = displayed
    .filter((e) => e.sourceType === "pillar" || e.status === "paid")
    .reduce((sum, e) => sum + e.amountExcl, 0);

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

  const statusChipStyle = (value: StatusFilter, current: StatusFilter): React.CSSProperties => {
    const active = value === current;
    const activeColors: Record<StatusFilter, string> = {
      all: "var(--text)",
      paid: "var(--income)",
      waiting: "var(--warn)",
      draft: "var(--muted)",
    };
    return {
      fontFamily: "var(--font-mono)",
      fontSize: "10px",
      fontWeight: 500,
      padding: "5px 12px",
      borderRadius: "999px",
      border: `1px solid ${active ? activeColors[value] : "var(--border)"}`,
      background: active ? activeColors[value] : "var(--surface)",
      color: active ? "#fff" : "var(--muted)",
      cursor: "pointer",
      letterSpacing: "0.02em",
      whiteSpace: "nowrap" as const,
    };
  };

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

  function statusBadgeStyle(status: string | null): React.CSSProperties {
    if (status === "waiting") return { background: "var(--warn-l)", color: "var(--warn)" };
    if (status === "draft") return { background: "var(--border)", color: "var(--muted)" };
    return { background: "var(--income-l)", color: "var(--income)" };
  }

  function statusLabel(status: string | null): string {
    if (status === "waiting") return t("income.statusWaiting");
    if (status === "draft") return t("income.statusDraft");
    return t("income.statusPaid");
  }

  function amountColor(entry: IncomeEntry): string {
    if (entry.sourceType === "pillar") return "var(--income)";
    if (entry.status === "waiting") return "var(--warn)";
    if (entry.status === "draft") return "var(--muted)";
    return "var(--income)";
  }

  const today = new Date().toISOString().split("T")[0];

  function ExternalForm({
    onSubmit,
    submitting,
    error,
    onCancel,
    defaultValues,
    formRef,
  }: {
    onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
    submitting: boolean;
    error: string | null;
    onCancel: () => void;
    defaultValues?: Partial<IncomeEntry>;
    formRef?: React.RefObject<HTMLFormElement | null>;
  }) {
    return (
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
          {defaultValues ? t("income.editEntry") : t("income.addExternal")}
        </div>
        <form ref={formRef} onSubmit={onSubmit}>
          {/* Row 1 */}
          <div className="fp-form-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "8px", marginBottom: "8px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label style={{ fontSize: "11px", color: "var(--muted)", fontWeight: 500 }}>{t("income.source")}</label>
              <input name="source" type="text" style={inputStyle} defaultValue={defaultValues?.source ?? ""} required />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label style={{ fontSize: "11px", color: "var(--muted)", fontWeight: 500 }}>{t("expenses.amountExcl")}</label>
              <input name="amountExcl" type="number" min="0" step="0.01" placeholder="0.00" style={{ ...inputStyle, fontFamily: "var(--font-mono)" }} defaultValue={defaultValues?.amountExcl ?? ""} required />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label style={{ fontSize: "11px", color: "var(--muted)", fontWeight: 500 }}>{t("expenses.vatAmount")}</label>
              <input name="vatAmount" type="number" min="0" step="0.01" placeholder="0.00" style={{ ...inputStyle, fontFamily: "var(--font-mono)" }} defaultValue={defaultValues?.vatAmount ?? ""} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label style={{ fontSize: "11px", color: "var(--muted)", fontWeight: 500 }}>{t("expenses.category")}</label>
              <select name="status" style={{ ...inputStyle, appearance: "none" }} defaultValue={defaultValues?.status ?? "paid"}>
                <option value="paid">{t("income.statusPaid")}</option>
                <option value="waiting">{t("income.statusWaiting")}</option>
                <option value="draft">{t("income.statusDraft")}</option>
              </select>
            </div>
          </div>
          {/* Row 2 */}
          <div className="fp-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 3fr auto", gap: "8px", alignItems: "end" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label style={{ fontSize: "11px", color: "var(--muted)", fontWeight: 500 }}>{t("expenses.date")}</label>
              <input name="receivedAt" type="date" style={inputStyle} defaultValue={defaultValues ? toDateInput(defaultValues.receivedAt ?? today) : today} required />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label style={{ fontSize: "11px", color: "var(--muted)", fontWeight: 500 }}>{t("income.description")}</label>
              <input name="description" type="text" style={inputStyle} defaultValue={defaultValues?.description ?? ""} />
            </div>
            <div style={{ display: "flex", gap: "6px", alignItems: "flex-end" }}>
              <button
                type="button"
                onClick={onCancel}
                style={{ height: "36px", padding: "0 14px", borderRadius: "8px", border: "1px solid var(--border)", background: "transparent", color: "var(--muted)", fontSize: "13px", fontWeight: 500, cursor: "pointer", fontFamily: "var(--font-sans)", whiteSpace: "nowrap" }}
              >
                {t("common.cancel")}
              </button>
              <button
                type="submit"
                disabled={submitting}
                style={{ height: "36px", padding: "0 20px", borderRadius: "8px", border: "none", background: submitting ? "var(--muted)" : "var(--income)", color: "#fff", fontSize: "13px", fontWeight: 600, cursor: submitting ? "not-allowed" : "pointer", fontFamily: "var(--font-sans)", whiteSpace: "nowrap" }}
              >
                {submitting ? t("common.loading") : t("common.save")}
              </button>
            </div>
          </div>
        </form>
        {error && <p style={{ fontSize: "12px", color: "var(--danger)", marginTop: "8px" }}>{error}</p>}
      </div>
    );
  }

  return (
    <div className="fp-page" style={{ maxWidth: "1100px", margin: "0 auto" }}>

      {/* Toolbar */}
      <div className="fp-mobile-stack" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px", gap: "12px" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.4px" }}>
          {t("income.title")}
        </div>
        <button
          onClick={() => { setShowAddForm((v) => !v); setAddError(null); }}
          style={{ padding: "9px 18px", borderRadius: "999px", border: "none", background: "var(--income)", color: "#fff", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-sans)" }}
        >
          {t("income.addExternal")}
        </button>
      </div>

      {/* Add form */}
      {showAddForm && (
        <ExternalForm
          formRef={addFormRef}
          onSubmit={handleAdd}
          submitting={addSubmitting}
          error={addError}
          onCancel={() => { setShowAddForm(false); setAddError(null); }}
        />
      )}

      {/* Search bar */}
      <input
        type="text"
        placeholder={t("income.searchPlaceholder")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", boxSizing: "border-box", border: "1px solid var(--border-md)", borderRadius: "10px", padding: "10px 14px", fontSize: "13px", fontFamily: "var(--font-sans)", color: "var(--text)", background: "#fff", outline: "none", marginBottom: "10px" }}
      />

      {/* Filter chips — source left, status right */}
      <div className="fp-mobile-stack" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: "6px" }}>
          <button style={chipStyle(sourceFilter === "all")} onClick={() => setSourceFilter("all")}>{t("income.allSources")}</button>
          <button style={chipStyle(sourceFilter === "pillar")} onClick={() => setSourceFilter("pillar")}>{t("income.pillarOnly")}</button>
          <button style={chipStyle(sourceFilter === "external")} onClick={() => setSourceFilter("external")}>{t("income.externalOnly")}</button>
        </div>
        {(sourceFilter === "all" || sourceFilter === "external") && (
          <div style={{ display: "flex", gap: "6px" }}>
            <button style={statusChipStyle("all", statusFilter)} onClick={() => setStatusFilter("all")}>{t("common.all")}</button>
            <button style={statusChipStyle("paid", statusFilter)} onClick={() => setStatusFilter("paid")}>{t("income.statusPaid")}</button>
            <button style={statusChipStyle("waiting", statusFilter)} onClick={() => setStatusFilter("waiting")}>{t("income.statusWaiting")}</button>
            <button style={statusChipStyle("draft", statusFilter)} onClick={() => setStatusFilter("draft")}>{t("income.statusDraft")}</button>
          </div>
        )}
      </div>

      {/* Entry list */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", overflow: "hidden" }}>
        <div
          style={{ padding: "12px 18px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fafafa" }}
        >
          <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)" }}>
            {displayed.length} {displayed.length === 1 ? "entry" : "entries"}
          </div>
          <div style={{ background: "var(--income-l)", color: "var(--income)", fontSize: "11px", fontWeight: 600, padding: "4px 10px", borderRadius: "999px" }}>
            +{formatEuro(total)}
          </div>
        </div>

        {loading ? (
          <div style={{ padding: "32px", textAlign: "center", color: "var(--subtle)", fontSize: "13px" }}>{t("common.loading")}</div>
        ) : displayed.length === 0 ? (
          <div style={{ padding: "32px", textAlign: "center", color: "var(--subtle)", fontSize: "13px" }}>{t("income.noIncome")}</div>
        ) : (
          displayed.map((entry) => (
            <div key={entry.id}>
              {/* Entry row */}
              <div className="fp-mobile-row" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "13px 18px", borderBottom: "1px solid #f5f5f5" }}>
                {/* Source icon */}
                <div
                  style={{ width: "36px", height: "36px", borderRadius: "10px", background: entry.sourceType === "pillar" ? "var(--accent-l)" : "var(--income-l)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700, color: entry.sourceType === "pillar" ? "var(--accent)" : "var(--income)", flexShrink: 0 }}
                >
                  {entry.sourceType === "pillar" ? "P" : "E"}
                </div>

                <div data-mobile-main style={{ flex: 1, minWidth: 0 }}>
                  {entry.sourceType === "pillar" ? (
                    <>
                      <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--text)" }}>
                        {entry.invoiceNumber ?? entry.label}{entry.clientName ? ` · ${entry.clientName}` : ""}
                      </div>
                      <div style={{ fontSize: "11px", color: "var(--subtle)", marginTop: "2px" }}>
                        {t("income.pillarInvoice")} · {t("income.paidOn").replace("{date}", formatDate(entry.receivedAt))}
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--text)" }}>
                        {entry.source ?? entry.label}
                      </div>
                      <div style={{ fontSize: "11px", color: "var(--subtle)", marginTop: "2px" }}>
                        {t("income.external")} · {formatDate(entry.receivedAt)}
                      </div>
                      {entry.description && (
                        <div style={{ fontSize: "11px", color: "var(--subtle)", marginTop: "2px" }}>
                          {entry.description}
                        </div>
                      )}
                    </>
                  )}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                  {/* Status badge */}
                  <div style={{ ...statusBadgeStyle(entry.sourceType === "pillar" ? "paid" : entry.status), fontSize: "10px", fontWeight: 600, padding: "3px 8px", borderRadius: "999px", fontFamily: "var(--font-mono)" }}>
                    {statusLabel(entry.sourceType === "pillar" ? "paid" : entry.status)}
                  </div>

                  {/* Amount */}
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "14px", fontWeight: 600, color: amountColor(entry) }}>
                      +{formatEuro(entry.amountExcl)}
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--subtle)", marginTop: "2px" }}>
                      {t("expenses.vatAmount")} {formatEuro(entry.vatAmount)}
                    </div>
                  </div>

                  {/* Edit / Delete — external only */}
                  {entry.sourceType === "external" && entry.externalId && (
                    <div style={{ display: "flex", gap: "4px" }}>
                      <button
                        title={t("income.editEntry")}
                        style={actionBtnStyle}
                        onClick={() => setEditingId(editingId === entry.externalId ? null : entry.externalId)}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M9.5 2.5l2 2L5 11H3v-2l6.5-6.5z" />
                        </svg>
                      </button>
                      <button
                        title={t("income.deleteEntry")}
                        style={{ ...actionBtnStyle, color: "var(--danger)" }}
                        onClick={() => handleDelete(entry.externalId!)}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M2 4h10M5 4V2h4v2M6 7v4M8 7v4M3 4l1 8h6l1-8" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Inline edit form */}
              {entry.sourceType === "external" && editingId === entry.externalId && (
                <div
                  key={entry.externalId + "-edit"}
                  style={{ borderTop: "1px solid #f0f0f0", padding: "16px 18px", background: "#fafafa" }}
                >
                  <ExternalForm
                    onSubmit={(e) => handleEdit(entry.externalId!, e)}
                    submitting={editSubmitting}
                    error={editError}
                    onCancel={() => { setEditingId(null); setEditError(null); }}
                    defaultValues={entry}
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
