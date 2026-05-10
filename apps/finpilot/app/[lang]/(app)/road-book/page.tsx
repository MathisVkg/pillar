"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "@/components/LangProvider";

type RoadBookType = "professional" | "personal";

interface RoadBookEntry {
  id: string;
  tripDate: string;
  type: RoadBookType;
  vehicleName: string;
  startLocation: string;
  endLocation: string;
  purpose: string | null;
  odometerStart: number | null;
  odometerEnd: number | null;
  distanceKm: number;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

interface FormValues {
  tripDate: string;
  type: RoadBookType;
  vehicleName: string;
  startLocation: string;
  endLocation: string;
  odometerStart: string;
  odometerEnd: string;
  distanceKm: string;
  purpose: string;
  notes: string;
}

const emptyForm = (): FormValues => ({
  tripDate: new Date().toISOString().split("T")[0],
  type: "professional",
  vehicleName: "",
  startLocation: "",
  endLocation: "",
  odometerStart: "",
  odometerEnd: "",
  distanceKm: "",
  purpose: "",
  notes: "",
});

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
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  fontSize: "11px",
  color: "var(--muted)",
  fontWeight: 500,
  marginBottom: "4px",
  display: "block",
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

function EditIcon() {
  return (
    <svg
      aria-hidden="true"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg
      aria-hidden="true"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}

function toDateInputValue(iso: string): string {
  return new Date(iso).toISOString().split("T")[0];
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-BE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatKm(value: number): string {
  return new Intl.NumberFormat("fr-BE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatPercent(value: number): string {
  return new Intl.NumberFormat("fr-BE", {
    maximumFractionDigits: 1,
  }).format(value);
}

function typeBadgeStyle(type: RoadBookType): React.CSSProperties {
  if (type === "professional") {
    return {
      background: "var(--income-l)",
      border: "1px solid rgba(5, 150, 105, 0.18)",
      color: "var(--income)",
    };
  }

  return {
    background: "var(--expense-l)",
    border: "1px solid rgba(124, 58, 237, 0.18)",
    color: "var(--expense)",
  };
}

function toFormValues(entry: RoadBookEntry): FormValues {
  return {
    tripDate: toDateInputValue(entry.tripDate),
    type: entry.type,
    vehicleName: entry.vehicleName,
    startLocation: entry.startLocation,
    endLocation: entry.endLocation,
    odometerStart: entry.odometerStart?.toString() ?? "",
    odometerEnd: entry.odometerEnd?.toString() ?? "",
    distanceKm: entry.distanceKm.toString(),
    purpose: entry.purpose ?? "",
    notes: entry.notes ?? "",
  };
}

function RoadBookForm({
  initial,
  onSave,
  onCancel,
  submitting,
  error,
}: {
  initial?: FormValues;
  onSave: (values: FormValues) => Promise<void>;
  onCancel: () => void;
  submitting: boolean;
  error: string | null;
}) {
  const { t } = useTranslation();
  const [values, setValues] = useState<FormValues>(initial ?? emptyForm());

  useEffect(() => {
    setValues(initial ?? emptyForm());
  }, [initial]);

  const update = (field: keyof FormValues, value: string) => {
    setValues((current) => {
      const next = { ...current, [field]: value };
      const start = Number(
        field === "odometerStart" ? value : next.odometerStart,
      );
      const end = Number(field === "odometerEnd" ? value : next.odometerEnd);
      if (
        next.odometerStart.trim() !== "" &&
        next.odometerEnd.trim() !== "" &&
        Number.isInteger(start) &&
        Number.isInteger(end) &&
        end >= start
      ) {
        next.distanceKm = String(end - start);
      }
      return next;
    });
  };

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    await onSave(values);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="fp-form-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1.2fr 1.2fr",
          gap: "8px",
          alignItems: "end",
        }}
      >
        <div>
          <label htmlFor="road-book-date" style={labelStyle}>
            {t("roadBook.tripDate")}
          </label>
          <input
            id="road-book-date"
            type="date"
            value={values.tripDate}
            onChange={(e) => update("tripDate", e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        <div>
          <label htmlFor="road-book-type" style={labelStyle}>
            {t("roadBook.type")}
          </label>
          <select
            id="road-book-type"
            value={values.type}
            onChange={(e) => update("type", e.target.value as RoadBookType)}
            style={{ ...inputStyle, appearance: "none" }}
            required
          >
            <option value="professional">{t("roadBook.professional")}</option>
            <option value="personal">{t("roadBook.personal")}</option>
          </select>
        </div>

        <div>
          <label htmlFor="road-book-vehicle" style={labelStyle}>
            {t("roadBook.vehicle")}
          </label>
          <input
            id="road-book-vehicle"
            type="text"
            value={values.vehicleName}
            onChange={(e) => update("vehicleName", e.target.value)}
            placeholder={t("roadBook.vehiclePlaceholder")}
            style={inputStyle}
            required
          />
        </div>

        <div>
          <label htmlFor="road-book-purpose" style={labelStyle}>
            {values.type === "professional"
              ? t("roadBook.purposeRequired")
              : t("roadBook.purpose")}
          </label>
          <input
            id="road-book-purpose"
            type="text"
            value={values.purpose}
            onChange={(e) => update("purpose", e.target.value)}
            style={inputStyle}
            required={values.type === "professional"}
          />
        </div>

        <div>
          <label htmlFor="road-book-start" style={labelStyle}>
            {t("roadBook.startLocation")}
          </label>
          <input
            id="road-book-start"
            type="text"
            value={values.startLocation}
            onChange={(e) => update("startLocation", e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        <div>
          <label htmlFor="road-book-end" style={labelStyle}>
            {t("roadBook.endLocation")}
          </label>
          <input
            id="road-book-end"
            type="text"
            value={values.endLocation}
            onChange={(e) => update("endLocation", e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        <div>
          <label htmlFor="road-book-odometer-start" style={labelStyle}>
            {t("roadBook.odometerStart")}
          </label>
          <input
            id="road-book-odometer-start"
            type="number"
            min="0"
            step="1"
            value={values.odometerStart}
            onChange={(e) => update("odometerStart", e.target.value)}
            style={{ ...inputStyle, fontFamily: "var(--font-mono)" }}
          />
        </div>

        <div>
          <label htmlFor="road-book-odometer-end" style={labelStyle}>
            {t("roadBook.odometerEnd")}
          </label>
          <input
            id="road-book-odometer-end"
            type="number"
            min="0"
            step="1"
            value={values.odometerEnd}
            onChange={(e) => update("odometerEnd", e.target.value)}
            style={{ ...inputStyle, fontFamily: "var(--font-mono)" }}
          />
        </div>

        <div>
          <label htmlFor="road-book-distance" style={labelStyle}>
            {t("roadBook.distanceKm")}
          </label>
          <input
            id="road-book-distance"
            type="number"
            min="0"
            step="0.01"
            value={values.distanceKm}
            onChange={(e) => update("distanceKm", e.target.value)}
            style={{ ...inputStyle, fontFamily: "var(--font-mono)" }}
            required
          />
        </div>

        <div>
          <label htmlFor="road-book-notes" style={labelStyle}>
            {t("roadBook.notes")}
          </label>
          <input
            id="road-book-notes"
            type="text"
            value={values.notes}
            onChange={(e) => update("notes", e.target.value)}
            style={inputStyle}
          />
        </div>

        <div
          className="fp-mobile-stack"
          style={{ display: "flex", gap: "6px", alignItems: "flex-end" }}
        >
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
              background: submitting ? "var(--muted)" : "var(--income)",
              color: "#fff",
              fontSize: "13px",
              fontWeight: 600,
              cursor: submitting ? "not-allowed" : "pointer",
              fontFamily: "var(--font-sans)",
            }}
          >
            {submitting ? t("common.loading") : t("common.save")}
          </button>
        </div>
      </div>

      {error && (
        <div
          style={{
            marginTop: "10px",
            color: "var(--danger)",
            fontSize: "12px",
          }}
        >
          {error}
        </div>
      )}
    </form>
  );
}

export default function RoadBookPage() {
  const { t } = useTranslation();
  const [entries, setEntries] = useState<RoadBookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<RoadBookEntry | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formVersion, setFormVersion] = useState(0);
  const [typeFilter, setTypeFilter] = useState<"all" | RoadBookType>("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [vehicleFilter, setVehicleFilter] = useState("");
  const [search, setSearch] = useState("");

  const loadEntries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/road-book");
      if (!res.ok) throw new Error("Failed to load road book");
      setEntries(await res.json());
    } catch {
      setError(t("common.error"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  const now = new Date();
  const currentYear = now.getFullYear();

  const kpis = useMemo(() => {
    return entries.reduce(
      (acc, entry) => {
        const date = new Date(entry.tripDate);
        if (date.getFullYear() === currentYear) {
          acc.totalYear += entry.distanceKm;
          if (entry.type === "professional")
            acc.professionalYear += entry.distanceKm;
          if (entry.type === "personal") acc.personalYear += entry.distanceKm;
        }
        return acc;
      },
      {
        totalYear: 0,
        professionalYear: 0,
        personalYear: 0,
      },
    );
  }, [entries, currentYear]);

  const totalSplitDistance = kpis.professionalYear + kpis.personalYear;
  const professionalPercent =
    totalSplitDistance > 0
      ? Math.round((kpis.professionalYear / totalSplitDistance) * 1000) / 10
      : 0;
  const personalPercent =
    totalSplitDistance > 0
      ? Math.round((kpis.personalYear / totalSplitDistance) * 1000) / 10
      : 0;

  const filteredEntries = useMemo(() => {
    const from = fromDate ? new Date(`${fromDate}T00:00:00`) : null;
    const to = toDate ? new Date(`${toDate}T23:59:59`) : null;
    const vehicle = vehicleFilter.trim().toLowerCase();
    const q = search.trim().toLowerCase();

    return entries.filter((entry) => {
      const date = new Date(entry.tripDate);
      if (typeFilter !== "all" && entry.type !== typeFilter) return false;
      if (from && date < from) return false;
      if (to && date > to) return false;
      if (vehicle && !entry.vehicleName.toLowerCase().includes(vehicle)) {
        return false;
      }
      if (q) {
        const haystack = [
          entry.vehicleName,
          entry.startLocation,
          entry.endLocation,
          entry.purpose ?? "",
          entry.notes ?? "",
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [entries, fromDate, search, toDate, typeFilter, vehicleFilter]);

  async function handleSave(values: FormValues) {
    setSubmitting(true);
    setError(null);
    try {
      const payload = {
        tripDate: values.tripDate,
        type: values.type,
        vehicleName: values.vehicleName,
        startLocation: values.startLocation,
        endLocation: values.endLocation,
        odometerStart: values.odometerStart || undefined,
        odometerEnd: values.odometerEnd || undefined,
        distanceKm: values.distanceKm,
        purpose: values.purpose,
        notes: values.notes,
      };

      const res = await fetch(
        editing ? `/api/road-book/${editing.id}` : "/api/road-book",
        {
          method: editing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Failed to save road book entry");
      }

      setEditing(null);
      setFormVersion((version) => version + 1);
      setIsFormOpen(false);
      await loadEntries();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("common.error"));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(entry: RoadBookEntry) {
    if (!window.confirm(t("roadBook.confirmDelete"))) return;

    setError(null);
    try {
      const res = await fetch(`/api/road-book/${entry.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete road book entry");
      if (editing?.id === entry.id) setEditing(null);
      await loadEntries();
    } catch {
      setError(t("common.error"));
    }
  }

  function handleExport() {
    const params = new URLSearchParams();
    if (fromDate) params.set("from", fromDate);
    if (toDate) params.set("to", toDate);
    if (typeFilter !== "all") params.set("type", typeFilter);
    window.location.href = `/api/export/road-book?${params.toString()}`;
  }

  const kpiCards = [
    {
      accent: "var(--brand)",
      label: t("roadBook.totalYear"),
      tint: "var(--ground)",
      value: `${formatKm(kpis.totalYear)} ${t("roadBook.km")}`,
    },
    {
      accent: "var(--income)",
      label: t("roadBook.professionalYear"),
      tint: "var(--income-l)",
      value: `${formatKm(kpis.professionalYear)} ${t("roadBook.km")}`,
    },
    {
      accent: "var(--expense)",
      label: t("roadBook.personalYear"),
      tint: "var(--expense-l)",
      value: `${formatKm(kpis.personalYear)} ${t("roadBook.km")}`,
    },
    {
      accent: "var(--vat)",
      label: t("roadBook.usageSplit"),
      tint: "var(--vat-l)",
      value: `${formatPercent(professionalPercent)}% ${t(
        "roadBook.professional",
      )} / ${formatPercent(personalPercent)}% ${t("roadBook.personal")}`,
    },
  ];

  return (
    <div className="fp-page" style={{ maxWidth: "1180px", margin: "0 auto" }}>
      <div
        className="fp-mobile-stack"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: 700,
              color: "var(--text)",
              fontFamily: "var(--font-display)",
            }}
          >
            {t("roadBook.title")}
          </h1>
          <p
            style={{
              margin: "6px 0 0",
              fontSize: "13px",
              color: "var(--muted)",
            }}
          >
            {t("roadBook.subtitle")}
          </p>
        </div>
        <div
          className="fp-mobile-stack"
          style={{ display: "flex", gap: "8px", alignItems: "center" }}
        >
          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setError(null);
              setFormVersion((version) => version + 1);
              setIsFormOpen(true);
            }}
            style={{
              height: "36px",
              padding: "0 16px",
              borderRadius: "8px",
              border: "none",
              background: "var(--income)",
              color: "#fff",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
              whiteSpace: "nowrap",
            }}
          >
            {t("roadBook.addTrip")}
          </button>
          <button
            type="button"
            onClick={handleExport}
            style={{
              height: "36px",
              padding: "0 16px",
              borderRadius: "8px",
              border: "1px solid var(--border)",
              background: "#fff",
              color: "var(--income)",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
              whiteSpace: "nowrap",
            }}
          >
            {t("roadBook.exportCsv")}
          </button>
        </div>
      </div>

      <div
        className="fp-grid-4"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        {kpiCards.map((card) => (
          <div
            key={card.label}
            style={{
              background: `linear-gradient(180deg, ${card.tint}, #fff 70%)`,
              border: "1px solid var(--border)",
              borderTop: `4px solid ${card.accent}`,
              borderRadius: "12px",
              padding: "16px",
            }}
          >
            <div style={{ fontSize: "11px", color: "var(--muted)" }}>
              {card.label}
            </div>
            <div
              style={{
                marginTop: "8px",
                fontSize: "24px",
                fontWeight: 700,
                color: card.accent,
                fontFamily: "var(--font-mono)",
                lineHeight: 1.2,
                overflowWrap: "anywhere",
              }}
            >
              {card.value}
            </div>
          </div>
        ))}
      </div>

      {isFormOpen ? (
        <div
          style={{
            background: "#fff",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "16px",
          }}
        >
          <RoadBookForm
            key={`${editing?.id ?? "new"}-${formVersion}`}
            initial={editing ? toFormValues(editing) : undefined}
            onSave={handleSave}
            onCancel={() => {
              setEditing(null);
              setFormVersion((version) => version + 1);
              setIsFormOpen(false);
            }}
            submitting={submitting}
            error={error}
          />
        </div>
      ) : null}

      <div
        style={{
          background: "#fff",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "16px",
          marginBottom: "16px",
        }}
      >
        <div
          className="fp-form-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr 1.4fr",
            gap: "8px",
            alignItems: "end",
          }}
        >
          <div>
            <label htmlFor="road-book-filter-from" style={labelStyle}>
              {t("exportPage.from")}
            </label>
            <input
              id="road-book-filter-from"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="road-book-filter-to" style={labelStyle}>
              {t("exportPage.to")}
            </label>
            <input
              id="road-book-filter-to"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="road-book-filter-type" style={labelStyle}>
              {t("roadBook.type")}
            </label>
            <select
              id="road-book-filter-type"
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value as "all" | RoadBookType)
              }
              style={{ ...inputStyle, appearance: "none" }}
            >
              <option value="all">{t("common.all")}</option>
              <option value="professional">{t("roadBook.professional")}</option>
              <option value="personal">{t("roadBook.personal")}</option>
            </select>
          </div>
          <div>
            <label htmlFor="road-book-filter-vehicle" style={labelStyle}>
              {t("roadBook.vehicle")}
            </label>
            <input
              id="road-book-filter-vehicle"
              type="text"
              value={vehicleFilter}
              onChange={(e) => setVehicleFilter(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="road-book-search" style={labelStyle}>
              {t("common.filter")}
            </label>
            <input
              id="road-book-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("roadBook.searchPlaceholder")}
              style={inputStyle}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {loading ? (
          <div
            style={{ padding: "24px", color: "var(--muted)", fontSize: "13px" }}
          >
            {t("common.loading")}
          </div>
        ) : filteredEntries.length === 0 ? (
          <div
            style={{ padding: "24px", color: "var(--muted)", fontSize: "13px" }}
          >
            {t("roadBook.noEntries")}
          </div>
        ) : (
          <div className="fp-responsive-table">
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "13px",
              }}
            >
              <thead>
                <tr style={{ background: "var(--ground)" }}>
                  {[
                    t("roadBook.tripDate"),
                    t("roadBook.type"),
                    t("roadBook.vehicle"),
                    t("roadBook.from"),
                    t("roadBook.to"),
                    t("roadBook.distanceKm"),
                    t("roadBook.purpose"),
                    "",
                  ].map((header) => (
                    <th
                      key={header || "actions"}
                      style={{
                        textAlign: "left",
                        padding: "10px 12px",
                        color: "var(--muted)",
                        fontWeight: 600,
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredEntries.map((entry) => (
                  <tr key={entry.id}>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      {formatDate(entry.tripDate)}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      <span
                        style={{
                          ...typeBadgeStyle(entry.type),
                          borderRadius: "999px",
                          display: "inline-flex",
                          fontSize: "12px",
                          fontWeight: 800,
                          padding: "4px 9px",
                        }}
                      >
                        {t(`roadBook.${entry.type}`)}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      {entry.vehicleName}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      {entry.startLocation}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      {entry.endLocation}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid var(--border)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {formatKm(entry.distanceKm)} {t("roadBook.km")}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      {entry.purpose ?? "-"}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "6px",
                          justifyContent: "flex-end",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setEditing(entry);
                            setError(null);
                            setIsFormOpen(true);
                          }}
                          style={actionBtnStyle}
                          aria-label={t("roadBook.editEntry")}
                          title={t("roadBook.editEntry")}
                        >
                          <EditIcon />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(entry)}
                          style={{
                            ...actionBtnStyle,
                            color: "var(--danger)",
                          }}
                          aria-label={t("roadBook.deleteEntry")}
                          title={t("roadBook.deleteEntry")}
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
