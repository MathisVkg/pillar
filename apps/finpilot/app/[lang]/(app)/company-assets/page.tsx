"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "@/components/LangProvider";

type AssetStatus = "active" | "sold" | "retired" | "lost";

interface CompanyAsset {
  id: string;
  name: string;
  category: string;
  vendor: string | null;
  purchaseDate: string;
  purchasePriceExcl: number;
  vatAmount: number;
  serialNumber: string | null;
  warrantyUntil: string | null;
  status: AssetStatus;
  location: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

interface FormValues {
  name: string;
  category: string;
  vendor: string;
  purchaseDate: string;
  purchasePriceExcl: string;
  vatAmount: string;
  serialNumber: string;
  warrantyUntil: string;
  status: AssetStatus;
  location: string;
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

const STATUS_KEYS: Record<AssetStatus, string> = {
  active: "companyAssets.statusActive",
  sold: "companyAssets.statusSold",
  retired: "companyAssets.statusRetired",
  lost: "companyAssets.statusLost",
};

const emptyForm = (): FormValues => ({
  name: "",
  category: "hardware",
  vendor: "",
  purchaseDate: new Date().toISOString().split("T")[0],
  purchasePriceExcl: "",
  vatAmount: "0",
  serialNumber: "",
  warrantyUntil: "",
  status: "active",
  location: "",
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

function calculateDefaultVat(amountExcl: string): string {
  if (amountExcl.trim() === "") return "0";
  const parsed = Number(amountExcl);
  if (!Number.isFinite(parsed) || parsed < 0) return "0";
  return (Math.round(parsed * 0.21 * 100) / 100).toFixed(2);
}

function toDateInputValue(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toISOString().split("T")[0];
}

function formatDate(iso: string | null): string {
  if (!iso) return "-";
  return new Date(iso).toLocaleDateString("fr-BE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatEuro(amount: number): string {
  return new Intl.NumberFormat("fr-BE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function toFormValues(asset: CompanyAsset): FormValues {
  return {
    name: asset.name,
    category: asset.category,
    vendor: asset.vendor ?? "",
    purchaseDate: toDateInputValue(asset.purchaseDate),
    purchasePriceExcl: asset.purchasePriceExcl.toString(),
    vatAmount: asset.vatAmount.toString(),
    serialNumber: asset.serialNumber ?? "",
    warrantyUntil: toDateInputValue(asset.warrantyUntil),
    status: asset.status,
    location: asset.location ?? "",
    notes: asset.notes ?? "",
  };
}

function CompanyAssetForm({
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
  const [vatEditedManually, setVatEditedManually] = useState(false);

  useEffect(() => {
    setValues(initial ?? emptyForm());
    setVatEditedManually(false);
  }, [initial]);

  const update = (field: keyof FormValues, value: string) => {
    if (field === "vatAmount") {
      setVatEditedManually(true);
      setValues((current) => ({ ...current, vatAmount: value }));
      return;
    }

    setValues((current) => {
      const next = { ...current, [field]: value };
      if (field === "purchasePriceExcl" && !vatEditedManually) {
        next.vatAmount = calculateDefaultVat(value);
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
          gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
          gap: "8px",
          alignItems: "end",
        }}
      >
        <div>
          <label htmlFor="asset-name" style={labelStyle}>
            {t("companyAssets.name")}
          </label>
          <input
            id="asset-name"
            type="text"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder={t("companyAssets.namePlaceholder")}
            style={inputStyle}
            required
          />
        </div>

        <div>
          <label htmlFor="asset-category" style={labelStyle}>
            {t("expenses.category")}
          </label>
          <select
            id="asset-category"
            value={values.category}
            onChange={(e) => update("category", e.target.value)}
            style={{ ...inputStyle, appearance: "none" }}
            required
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {t(CATEGORY_KEYS[category])}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="asset-status" style={labelStyle}>
            {t("common.status")}
          </label>
          <select
            id="asset-status"
            value={values.status}
            onChange={(e) => update("status", e.target.value)}
            style={{ ...inputStyle, appearance: "none" }}
            required
          >
            {(Object.keys(STATUS_KEYS) as AssetStatus[]).map((status) => (
              <option key={status} value={status}>
                {t(STATUS_KEYS[status])}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="asset-vendor" style={labelStyle}>
            {t("expenses.vendor")}
          </label>
          <input
            id="asset-vendor"
            type="text"
            value={values.vendor}
            onChange={(e) => update("vendor", e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="asset-purchase-date" style={labelStyle}>
            {t("companyAssets.purchaseDate")}
          </label>
          <input
            id="asset-purchase-date"
            type="date"
            value={values.purchaseDate}
            onChange={(e) => update("purchaseDate", e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        <div>
          <label htmlFor="asset-price" style={labelStyle}>
            {t("companyAssets.purchasePriceExcl")}
          </label>
          <input
            id="asset-price"
            type="number"
            min="0"
            step="0.01"
            value={values.purchasePriceExcl}
            onChange={(e) => update("purchasePriceExcl", e.target.value)}
            style={{ ...inputStyle, fontFamily: "var(--font-mono)" }}
            required
          />
        </div>

        <div>
          <label htmlFor="asset-vat" style={labelStyle}>
            {t("expenses.vatAmount")}
          </label>
          <input
            id="asset-vat"
            type="number"
            min="0"
            step="0.01"
            value={values.vatAmount}
            onChange={(e) => update("vatAmount", e.target.value)}
            style={{ ...inputStyle, fontFamily: "var(--font-mono)" }}
          />
        </div>

        <div>
          <label htmlFor="asset-warranty" style={labelStyle}>
            {t("companyAssets.warrantyUntil")}
          </label>
          <input
            id="asset-warranty"
            type="date"
            value={values.warrantyUntil}
            onChange={(e) => update("warrantyUntil", e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="asset-serial" style={labelStyle}>
            {t("companyAssets.serialNumber")}
          </label>
          <input
            id="asset-serial"
            type="text"
            value={values.serialNumber}
            onChange={(e) => update("serialNumber", e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="asset-location" style={labelStyle}>
            {t("companyAssets.location")}
          </label>
          <input
            id="asset-location"
            type="text"
            value={values.location}
            onChange={(e) => update("location", e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="asset-notes" style={labelStyle}>
            {t("companyAssets.notes")}
          </label>
          <input
            id="asset-notes"
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

export default function CompanyAssetsPage() {
  const { t } = useTranslation();
  const [assets, setAssets] = useState<CompanyAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<CompanyAsset | null>(null);
  const [formVersion, setFormVersion] = useState(0);
  const [statusFilter, setStatusFilter] = useState<"all" | AssetStatus>("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [search, setSearch] = useState("");

  const loadAssets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/company-assets");
      if (!res.ok) throw new Error("Failed to load company assets");
      setAssets(await res.json());
    } catch {
      setError(t("common.error"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    loadAssets();
  }, [loadAssets]);

  const kpis = useMemo(() => {
    const now = new Date();
    const soon = new Date(now);
    soon.setDate(soon.getDate() + 60);

    return assets.reduce(
      (acc, asset) => {
        if (asset.status === "active") acc.activeAssets++;
        acc.totalValue += asset.purchasePriceExcl;
        acc.totalVat += asset.vatAmount;
        if (asset.warrantyUntil) {
          const warranty = new Date(asset.warrantyUntil);
          if (warranty >= now && warranty <= soon) acc.warrantySoon++;
        }
        return acc;
      },
      {
        activeAssets: 0,
        totalValue: 0,
        warrantySoon: 0,
        totalVat: 0,
      },
    );
  }, [assets]);

  const filteredAssets = useMemo(() => {
    const q = search.trim().toLowerCase();

    return assets.filter((asset) => {
      if (statusFilter !== "all" && asset.status !== statusFilter) return false;
      if (categoryFilter !== "all" && asset.category !== categoryFilter) {
        return false;
      }
      if (q) {
        const haystack = [
          asset.name,
          asset.vendor ?? "",
          asset.serialNumber ?? "",
          asset.location ?? "",
          asset.notes ?? "",
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [assets, categoryFilter, search, statusFilter]);

  async function handleSave(values: FormValues) {
    setSubmitting(true);
    setError(null);
    try {
      const payload = {
        name: values.name,
        category: values.category,
        vendor: values.vendor,
        purchaseDate: values.purchaseDate,
        purchasePriceExcl: values.purchasePriceExcl,
        vatAmount: values.vatAmount || 0,
        serialNumber: values.serialNumber,
        warrantyUntil: values.warrantyUntil || null,
        status: values.status,
        location: values.location,
        notes: values.notes,
      };

      const res = await fetch(
        editing ? `/api/company-assets/${editing.id}` : "/api/company-assets",
        {
          method: editing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Failed to save company asset");
      }

      setEditing(null);
      setFormVersion((version) => version + 1);
      await loadAssets();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("common.error"));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(asset: CompanyAsset) {
    if (!window.confirm(t("companyAssets.confirmDelete"))) return;

    setError(null);
    try {
      const res = await fetch(`/api/company-assets/${asset.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete company asset");
      if (editing?.id === asset.id) setEditing(null);
      await loadAssets();
    } catch {
      setError(t("common.error"));
    }
  }

  function handleExport() {
    const params = new URLSearchParams();
    if (statusFilter !== "all") params.set("status", statusFilter);
    if (categoryFilter !== "all") params.set("category", categoryFilter);
    window.location.href = `/api/export/company-assets?${params.toString()}`;
  }

  const kpiCards = [
    { label: t("companyAssets.activeAssets"), value: kpis.activeAssets },
    {
      label: t("companyAssets.totalPurchaseValue"),
      value: formatEuro(kpis.totalValue),
    },
    {
      label: t("companyAssets.warrantyExpiringSoon"),
      value: kpis.warrantySoon,
    },
    {
      label: t("companyAssets.totalVat"),
      value: formatEuro(kpis.totalVat),
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
            {t("companyAssets.title")}
          </h1>
          <p
            style={{
              margin: "6px 0 0",
              fontSize: "13px",
              color: "var(--muted)",
            }}
          >
            {t("companyAssets.subtitle")}
          </p>
        </div>
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
          {t("companyAssets.exportCsv")}
        </button>
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
              background: "#fff",
              border: "1px solid var(--border)",
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
                color: "var(--text)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {card.value}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          background: "#fff",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "16px",
          marginBottom: "16px",
        }}
      >
        <CompanyAssetForm
          key={`${editing?.id ?? "new"}-${formVersion}`}
          initial={editing ? toFormValues(editing) : undefined}
          onSave={handleSave}
          onCancel={() => {
            setEditing(null);
            setFormVersion((version) => version + 1);
          }}
          submitting={submitting}
          error={error}
        />
      </div>

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
            gridTemplateColumns: "1fr 1fr 1.5fr",
            gap: "8px",
            alignItems: "end",
          }}
        >
          <div>
            <label htmlFor="asset-filter-status" style={labelStyle}>
              {t("common.status")}
            </label>
            <select
              id="asset-filter-status"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as "all" | AssetStatus)
              }
              style={{ ...inputStyle, appearance: "none" }}
            >
              <option value="all">{t("common.all")}</option>
              {(Object.keys(STATUS_KEYS) as AssetStatus[]).map((status) => (
                <option key={status} value={status}>
                  {t(STATUS_KEYS[status])}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="asset-filter-category" style={labelStyle}>
              {t("expenses.category")}
            </label>
            <select
              id="asset-filter-category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{ ...inputStyle, appearance: "none" }}
            >
              <option value="all">{t("common.all")}</option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {t(CATEGORY_KEYS[category])}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="asset-search" style={labelStyle}>
              {t("common.filter")}
            </label>
            <input
              id="asset-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("companyAssets.searchPlaceholder")}
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
        ) : filteredAssets.length === 0 ? (
          <div
            style={{ padding: "24px", color: "var(--muted)", fontSize: "13px" }}
          >
            {t("companyAssets.noAssets")}
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
                    t("companyAssets.name"),
                    t("expenses.category"),
                    t("expenses.vendor"),
                    t("companyAssets.purchaseDate"),
                    t("companyAssets.purchasePriceExcl"),
                    t("expenses.vatAmount"),
                    t("common.status"),
                    t("companyAssets.location"),
                    t("companyAssets.warrantyUntil"),
                    t("companyAssets.serialNumber"),
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
                {filteredAssets.map((asset) => (
                  <tr key={asset.id}>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid var(--border)",
                        fontWeight: 600,
                      }}
                    >
                      {asset.name}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      {t(CATEGORY_KEYS[asset.category as Category])}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      {asset.vendor ?? "-"}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      {formatDate(asset.purchaseDate)}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid var(--border)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {formatEuro(asset.purchasePriceExcl)}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid var(--border)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {formatEuro(asset.vatAmount)}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      {t(STATUS_KEYS[asset.status])}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      {asset.location ?? "-"}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      {formatDate(asset.warrantyUntil)}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        borderBottom: "1px solid var(--border)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {asset.serialNumber ?? "-"}
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
                          onClick={() => setEditing(asset)}
                          style={actionBtnStyle}
                          aria-label={t("companyAssets.editAsset")}
                          title={t("companyAssets.editAsset")}
                        >
                          <EditIcon />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(asset)}
                          style={{
                            ...actionBtnStyle,
                            color: "var(--danger)",
                          }}
                          aria-label={t("companyAssets.deleteAsset")}
                          title={t("companyAssets.deleteAsset")}
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
