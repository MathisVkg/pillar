"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/components/LangProvider";

export type ContractRow = {
	id: string;
	name: string;
	vendor: string | null;
	type: string;
	renewalDate: string;
	daysUntilRenewal: number;
	costPerYear: number | null;
	autoRenews: boolean;
	notes: string | null;
	createdAt: string;
	client: { id: string; name: string };
};

type Client = { id: string; name: string };

type Props = {
	contracts: ContractRow[];
	clients: Client[];
	filterClientId?: string;
	filterType?: string;
	// Embedded in client detail
	embeddedClientId?: string;
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const TH: React.CSSProperties = {
	fontFamily: "var(--font-mono)",
	fontSize: "9px",
	letterSpacing: "0.1em",
	textTransform: "uppercase",
	color: "var(--con-subtle)",
	padding: "8px 12px",
	textAlign: "left",
	fontWeight: 500,
	borderBottom: "1px solid var(--con-border)",
};

const TD: React.CSSProperties = {
	fontFamily: "var(--font-mono)",
	fontSize: "12px",
	color: "var(--con-text)",
	padding: "10px 12px",
	borderBottom: "1px solid var(--con-border)",
	whiteSpace: "nowrap",
};

const inputStyle: React.CSSProperties = {
	background: "var(--con-bg)",
	border: "1px solid var(--con-border)",
	borderRadius: "4px",
	padding: "6px 10px",
	fontFamily: "var(--font-mono)",
	fontSize: "11px",
	color: "var(--con-text)",
	outline: "none",
	cursor: "pointer",
};

const labelStyle: React.CSSProperties = {
	display: "block",
	fontFamily: "var(--font-mono)",
	fontSize: "9px",
	letterSpacing: "0.1em",
	textTransform: "uppercase",
	color: "var(--con-subtle)",
	marginBottom: "5px",
};

const TYPE_COLORS: Record<string, { bg: string; color: string }> = {
	software: { bg: "rgba(139,92,246,0.12)",  color: "#7c3aed" },
	hardware: { bg: "rgba(37,99,235,0.12)",   color: "var(--accent)" },
	service:  { bg: "rgba(20,184,166,0.12)",  color: "#0f766e" },
	retainer: { bg: "rgba(15,23,42,0.15)",    color: "var(--con-text)" },
};

function Badge({ label, colors }: { label: string; colors: { bg: string; color: string } }) {
	return (
		<span style={{
			display: "inline-block",
			fontFamily: "var(--font-mono)",
			fontSize: "9px",
			letterSpacing: "0.06em",
			textTransform: "uppercase",
			padding: "2px 6px",
			borderRadius: "3px",
			background: colors.bg,
			color: colors.color,
			fontWeight: 600,
		}}>
			{label}
		</span>
	);
}

// ─── Renewal urgency helpers ──────────────────────────────────────────────────

function getRenewalStyle(days: number): React.CSSProperties {
	if (days < 0)  return { color: "#dc2626", fontWeight: 700 };
	if (days <= 30) return { color: "#dc2626", fontWeight: 700 };
	if (days <= 90) return { color: "#ca8a04", fontWeight: 600 };
	return { color: "#16a34a" };
}

function getRenewalRowBg(days: number): string {
	if (days < 0) return "rgba(220,38,38,0.06)";
	return "";
}

function DaysCell({ days, t }: { days: number; t: (k: string, v?: Record<string, string | number>) => string }) {
	if (days < 0) {
		return (
			<span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
				<span style={{
					fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.06em",
					textTransform: "uppercase", padding: "2px 6px", borderRadius: "3px",
					background: "#dc2626", color: "#fff", fontWeight: 700,
				}}>
					{t("contracts.overdue")}
				</span>
				<span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#dc2626", fontWeight: 700 }}>
					{Math.abs(days)}d
				</span>
			</span>
		);
	}
	return (
		<span style={{ ...getRenewalStyle(days), fontFamily: "var(--font-mono)", fontSize: "12px" }}>
			{t("contracts.daysLeft", { n: days })}
		</span>
	);
}

// ─── Inline edit row ──────────────────────────────────────────────────────────

function EditRow({
	contract,
	onSave,
	onCancel,
	onDelete,
	clients,
	isEmbedded,
	t,
}: {
	contract: ContractRow;
	onSave: (data: Partial<ContractRow>) => Promise<void>;
	onCancel: () => void;
	onDelete: () => Promise<void>;
	clients: Client[];
	isEmbedded: boolean;
	t: (k: string, v?: Record<string, string | number>) => string;
}) {
	const [name, setName] = useState(contract.name);
	const [vendor, setVendor] = useState(contract.vendor ?? "");
	const [type, setType] = useState(contract.type);
	const [renewalDate, setRenewalDate] = useState(contract.renewalDate);
	const [costPerYear, setCostPerYear] = useState(contract.costPerYear != null ? String(contract.costPerYear) : "");
	const [autoRenews, setAutoRenews] = useState(contract.autoRenews);
	const [notes, setNotes] = useState(contract.notes ?? "");
	const [saving, setSaving] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [deleting, setDeleting] = useState(false);

	const TYPE_LABELS: Record<string, string> = {
		software: t("contracts.typeSoftware"), hardware: t("contracts.typeHardware"),
		service: t("contracts.typeService"),   retainer: t("contracts.typeRetainer"),
	};

	const cellInput: React.CSSProperties = {
		background: "var(--con-bg)",
		border: "1px solid var(--con-border)",
		borderRadius: "3px",
		padding: "4px 7px",
		fontFamily: "var(--font-mono)",
		fontSize: "11px",
		color: "var(--con-text)",
		outline: "none",
		width: "100%",
	};

	async function handleSave() {
		setSaving(true);
		await onSave({ name, vendor: vendor || null, type, renewalDate, costPerYear: costPerYear ? Number(costPerYear) : null, autoRenews, notes: notes || null });
		setSaving(false);
	}

	async function handleDelete() {
		setDeleting(true);
		await onDelete();
	}

	const colSpan = isEmbedded ? 7 : 8;

	return (
		<tr style={{ background: "var(--con-surface)" }}>
			<td colSpan={colSpan} style={{ padding: "12px 16px", borderBottom: "1px solid var(--con-border)" }}>
				<div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr auto auto", gap: "8px", alignItems: "end", marginBottom: "8px" }}>
					<div>
						<label style={labelStyle}>{t("contracts.name")}</label>
						<input value={name} onChange={(e) => setName(e.target.value)} style={cellInput} />
					</div>
					<div>
						<label style={labelStyle}>{t("contracts.vendor")}</label>
						<input value={vendor} onChange={(e) => setVendor(e.target.value)} style={cellInput} />
					</div>
					<div>
						<label style={labelStyle}>{t("contracts.type")}</label>
						<select value={type} onChange={(e) => setType(e.target.value)} style={{ ...cellInput, cursor: "pointer" }}>
							{Object.entries(TYPE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
						</select>
					</div>
					<div>
						<label style={labelStyle}>{t("contracts.renewalDate")}</label>
						<input type="date" value={renewalDate} onChange={(e) => setRenewalDate(e.target.value)} style={{ ...cellInput, cursor: "pointer" }} />
					</div>
					<div>
						<label style={labelStyle}>{t("contracts.costPerYear")}</label>
						<input type="number" min="0" step="0.01" value={costPerYear} onChange={(e) => setCostPerYear(e.target.value)} style={cellInput} />
					</div>
					<div>
						<label style={labelStyle}>{t("contracts.autoRenews")}</label>
						<label style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "6px", cursor: "pointer" }}>
							<input type="checkbox" checked={autoRenews} onChange={(e) => setAutoRenews(e.target.checked)} />
						</label>
					</div>
				</div>
				<div style={{ marginBottom: "8px" }}>
					<label style={labelStyle}>
						{t("contracts.notes")}
						<span style={{ marginLeft: "6px", color: "var(--con-muted)", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>
							{t("contracts.notesHint")}
						</span>
					</label>
					<textarea
						value={notes}
						onChange={(e) => setNotes(e.target.value)}
						rows={2}
						style={{ ...cellInput, resize: "vertical", width: "100%" }}
					/>
				</div>
				<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
					<button
						type="button"
						onClick={handleSave}
						disabled={saving}
						style={{
							fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 600,
							background: "var(--accent)", color: "#fff", border: "none", borderRadius: "4px",
							padding: "5px 12px", cursor: "pointer", opacity: saving ? 0.6 : 1,
						}}
					>
						{saving ? t("contracts.saving") : t("contracts.save")}
					</button>
					<button
						type="button"
						onClick={onCancel}
						style={{
							fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--con-muted)",
							background: "transparent", border: "1px solid var(--con-border)", borderRadius: "4px",
							padding: "5px 10px", cursor: "pointer",
						}}
					>
						Cancel
					</button>
					<div style={{ marginLeft: "auto" }}>
						{!confirmDelete ? (
							<button
								type="button"
								onClick={() => setConfirmDelete(true)}
								style={{
									fontFamily: "var(--font-mono)", fontSize: "10px", color: "#dc2626",
									background: "transparent", border: "1px solid rgba(220,38,38,0.3)", borderRadius: "4px",
									padding: "5px 10px", cursor: "pointer",
								}}
							>
								{t("contracts.delete")}
							</button>
						) : (
							<span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
								<span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#dc2626" }}>
									{t("contracts.confirmDelete")}
								</span>
								<button
									type="button"
									onClick={handleDelete}
									disabled={deleting}
									style={{
										fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 600,
										background: "#dc2626", color: "#fff", border: "none", borderRadius: "4px",
										padding: "4px 10px", cursor: "pointer",
									}}
								>
									{t("contracts.delete")}
								</button>
								<button
									type="button"
									onClick={() => setConfirmDelete(false)}
									style={{
										fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--con-muted)",
										background: "transparent", border: "1px solid var(--con-border)", borderRadius: "4px",
										padding: "4px 8px", cursor: "pointer",
									}}
								>
									Cancel
								</button>
							</span>
						)}
					</div>
				</div>
			</td>
		</tr>
	);
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ContractsView({ contracts: initial, clients, filterClientId, filterType, embeddedClientId }: Props) {
	const { t } = useTranslation();
	const router = useRouter();
	const isEmbedded = Boolean(embeddedClientId);

	const [contracts, setContracts] = useState(initial);
	const [clientId, setClientId] = useState(filterClientId ?? "");
	const [typeFilter, setTypeFilter] = useState(filterType ?? "");
	const [editingId, setEditingId] = useState<string | null>(null);

	// Add form state
	const [showForm, setShowForm] = useState(false);
	const [formPending, setFormPending] = useState(false);
	const [formError, setFormError] = useState<string | null>(null);
	const [fClientId, setFClientId] = useState(embeddedClientId ?? clients[0]?.id ?? "");
	const [fName, setFName] = useState("");
	const [fVendor, setFVendor] = useState("");
	const [fType, setFType] = useState("software");
	const [fRenewalDate, setFRenewalDate] = useState("");
	const [fCostPerYear, setFCostPerYear] = useState("");
	const [fAutoRenews, setFAutoRenews] = useState(false);
	const [fNotes, setFNotes] = useState("");

	const TYPE_LABELS: Record<string, string> = {
		software: t("contracts.typeSoftware"), hardware: t("contracts.typeHardware"),
		service: t("contracts.typeService"),   retainer: t("contracts.typeRetainer"),
	};

	function applyFilters(c: string, tp: string) {
		if (isEmbedded) return;
		const params = new URLSearchParams();
		if (c) params.set("clientId", c);
		if (tp) params.set("type", tp);
		const qs = params.toString();
		router.push(qs ? `/contracts?${qs}` : "/contracts");
	}

	function handleFilterChange(field: "client" | "type", value: string) {
		const next = { c: clientId, tp: typeFilter };
		if (field === "client") { setClientId(value); next.c = value; }
		if (field === "type")   { setTypeFilter(value); next.tp = value; }
		applyFilters(next.c, next.tp);
	}

	function resetForm() {
		setFClientId(embeddedClientId ?? clients[0]?.id ?? "");
		setFName(""); setFVendor(""); setFType("software"); setFRenewalDate("");
		setFCostPerYear(""); setFAutoRenews(false); setFNotes("");
		setFormError(null);
	}

	async function handleCreate(e: React.FormEvent) {
		e.preventDefault();
		setFormPending(true);
		setFormError(null);

		const res = await fetch("/api/contracts", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				clientId: fClientId,
				name: fName,
				vendor: fVendor || undefined,
				type: fType,
				renewalDate: fRenewalDate,
				costPerYear: fCostPerYear ? Number(fCostPerYear) : undefined,
				autoRenews: fAutoRenews,
				notes: fNotes || undefined,
			}),
		});

		setFormPending(false);

		if (!res.ok) {
			const data = await res.json().catch(() => ({}));
			setFormError(data.error ?? t("common.error"));
			return;
		}

		const created = await res.json();
		setContracts((prev) => [...prev, created].sort((a, b) => a.renewalDate.localeCompare(b.renewalDate)));
		resetForm();
		setShowForm(false);
	}

	async function handleSave(id: string, data: Partial<ContractRow>) {
		const res = await fetch(`/api/contracts/${id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (res.ok) {
			const updated = await res.json();
			setContracts((prev) =>
				prev.map((c) => (c.id === id ? updated : c)).sort((a, b) => a.renewalDate.localeCompare(b.renewalDate))
			);
		}
		setEditingId(null);
	}

	async function handleDelete(id: string) {
		const res = await fetch(`/api/contracts/${id}`, { method: "DELETE" });
		if (res.ok) {
			setContracts((prev) => prev.filter((c) => c.id !== id));
			setEditingId(null);
		}
	}

	const filtered = useMemo(() => {
		return contracts.filter((c) => {
			if (isEmbedded && c.client.id !== embeddedClientId) return false;
			if (!isEmbedded && clientId && c.client.id !== clientId) return false;
			if (typeFilter && c.type !== typeFilter) return false;
			return true;
		});
	}, [contracts, clientId, typeFilter, isEmbedded, embeddedClientId]);

	// Renewal summary for embedded mode
	const renewingSoon = filtered.filter((c) => c.daysUntilRenewal >= 0 && c.daysUntilRenewal <= 60).length;
	const overdue = filtered.filter((c) => c.daysUntilRenewal < 0).length;

	const formInputStyle: React.CSSProperties = {
		width: "100%",
		background: "var(--con-bg)",
		border: "1px solid var(--con-border)",
		borderRadius: "4px",
		padding: "7px 10px",
		fontFamily: "var(--font-mono)",
		fontSize: "12px",
		color: "var(--con-text)",
		outline: "none",
	};

	return (
		<div>
			{/* Header */}
			<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
				{!isEmbedded && (
					<h1 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--con-subtle)" }}>
						{t("contracts.title")}
					</h1>
				)}
				{isEmbedded && <div />}
				<button
					type="button"
					onClick={() => { setShowForm((v) => !v); if (showForm) resetForm(); }}
					style={{
						fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.04em",
						background: showForm ? "transparent" : "var(--accent)",
						color: showForm ? "var(--con-muted)" : "#fff",
						border: showForm ? "1px solid var(--con-border)" : "none",
						borderRadius: "4px", padding: "6px 12px", cursor: "pointer",
					}}
				>
					{showForm ? t("common.cancel") : `+ ${t("contracts.newContract")}`}
				</button>
			</div>

			{/* Renewal summary banner */}
			{(renewingSoon > 0 || overdue > 0) && (
				<div style={{
					display: "flex",
					gap: "12px",
					marginBottom: "12px",
					flexWrap: "wrap",
				}}>
					{overdue > 0 && (
						<div style={{
							background: "rgba(220,38,38,0.08)",
							border: "1px solid rgba(220,38,38,0.3)",
							borderRadius: "4px",
							padding: "8px 14px",
							fontFamily: "var(--font-mono)",
							fontSize: "11px",
							color: "#dc2626",
							fontWeight: 700,
							letterSpacing: "0.02em",
						}}>
							⚠ {overdue} {overdue === 1 ? "contract" : "contracts"} overdue
						</div>
					)}
					{renewingSoon > 0 && (
						<div style={{
							background: "rgba(234,179,8,0.08)",
							border: "1px solid rgba(234,179,8,0.3)",
							borderRadius: "4px",
							padding: "8px 14px",
							fontFamily: "var(--font-mono)",
							fontSize: "11px",
							color: "#b45309",
							fontWeight: 600,
							letterSpacing: "0.02em",
						}}>
							{t("contracts.renewalSummary", { n: renewingSoon })}
						</div>
					)}
				</div>
			)}

			{/* Add contract form */}
			{showForm && (
				<form
					onSubmit={handleCreate}
					style={{
						background: "var(--con-surface)",
						border: "1px solid var(--con-border)",
						borderRadius: "4px",
						padding: "16px",
						marginBottom: "12px",
					}}
				>
					<div style={{ display: "grid", gridTemplateColumns: isEmbedded ? "2fr 1fr 1fr 1fr" : "1fr 2fr 1fr 1fr 1fr", gap: "12px", marginBottom: "12px" }}>
						{!isEmbedded && (
							<div>
								<label style={labelStyle}>{t("contracts.client")}</label>
								<select value={fClientId} onChange={(e) => setFClientId(e.target.value)} style={{ ...formInputStyle, cursor: "pointer" }}>
									{clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
								</select>
							</div>
						)}
						<div>
							<label style={labelStyle}>{t("contracts.name")}</label>
							<input required value={fName} onChange={(e) => setFName(e.target.value)} placeholder="e.g. Sophos Endpoint" style={formInputStyle} />
						</div>
						<div>
							<label style={labelStyle}>{t("contracts.vendor")}</label>
							<input value={fVendor} onChange={(e) => setFVendor(e.target.value)} style={formInputStyle} />
						</div>
						<div>
							<label style={labelStyle}>{t("contracts.type")}</label>
							<select value={fType} onChange={(e) => setFType(e.target.value)} style={{ ...formInputStyle, cursor: "pointer" }}>
								{Object.entries(TYPE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
							</select>
						</div>
						<div>
							<label style={labelStyle}>{t("contracts.renewalDate")}</label>
							<input required type="date" value={fRenewalDate} onChange={(e) => setFRenewalDate(e.target.value)} style={{ ...formInputStyle, cursor: "pointer" }} />
						</div>
					</div>
					<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "12px" }}>
						<div>
							<label style={labelStyle}>{t("contracts.costPerYear")} ({t("contracts.costPerYearLabel")})</label>
							<input type="number" min="0" step="0.01" value={fCostPerYear} onChange={(e) => setFCostPerYear(e.target.value)} style={formInputStyle} />
						</div>
						<div>
							<label style={labelStyle}>{t("contracts.autoRenews")}</label>
							<label style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "9px", cursor: "pointer" }}>
								<input type="checkbox" checked={fAutoRenews} onChange={(e) => setFAutoRenews(e.target.checked)} />
								<span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--con-text)" }}>
									{fAutoRenews ? t("contracts.autoRenewsYes") : t("contracts.autoRenewsNo")}
								</span>
							</label>
						</div>
					</div>
					<div style={{ marginBottom: "12px" }}>
						<label style={labelStyle}>
							{t("contracts.notes")}
							<span style={{ marginLeft: "6px", color: "var(--con-muted)", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>
								— {t("contracts.notesHint")}
							</span>
						</label>
						<textarea value={fNotes} onChange={(e) => setFNotes(e.target.value)} rows={2} style={{ ...formInputStyle, resize: "vertical" }} />
					</div>
					{formError && (
						<p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#dc2626", marginBottom: "10px" }}>{formError}</p>
					)}
					<div style={{ display: "flex", gap: "8px" }}>
						<button
							type="submit"
							disabled={formPending}
							style={{
								fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 600,
								background: "var(--accent)", color: "#fff", border: "none", borderRadius: "4px",
								padding: "6px 14px", cursor: "pointer", opacity: formPending ? 0.6 : 1,
							}}
						>
							{formPending ? t("contracts.creating") : t("contracts.create")}
						</button>
						<button
							type="button"
							onClick={() => { setShowForm(false); resetForm(); }}
							style={{
								fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--con-muted)",
								background: "transparent", border: "1px solid var(--con-border)", borderRadius: "4px",
								padding: "6px 12px", cursor: "pointer",
							}}
						>
							{t("common.cancel")}
						</button>
					</div>
				</form>
			)}

			{/* Filters */}
			{!isEmbedded && (
				<div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
					<select value={clientId} onChange={(e) => handleFilterChange("client", e.target.value)} style={inputStyle}>
						<option value="">{t("contracts.allClients")}</option>
						{clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
					</select>
					<select value={typeFilter} onChange={(e) => handleFilterChange("type", e.target.value)} style={inputStyle}>
						<option value="">{t("contracts.allTypes")}</option>
						{Object.entries(TYPE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
					</select>
				</div>
			)}

			{/* Table */}
			<div style={{ background: "var(--con-surface)", border: "1px solid var(--con-border)", borderRadius: "4px", overflow: "hidden" }}>
				<table style={{ width: "100%", borderCollapse: "collapse" }}>
					<thead>
						<tr>
							{!isEmbedded && <th style={TH}>{t("contracts.client")}</th>}
							<th style={TH}>{t("contracts.name")}</th>
							<th style={TH}>{t("contracts.vendor")}</th>
							<th style={TH}>{t("contracts.type")}</th>
							<th style={TH}>{t("contracts.renewalDate")}</th>
							<th style={TH}>{t("contracts.daysUntilRenewal")}</th>
							<th style={TH}>{t("contracts.costPerYear")}</th>
							<th style={TH}>{t("contracts.autoRenews")}</th>
						</tr>
					</thead>
					<tbody>
						{filtered.length === 0 ? (
							<tr>
								<td
									colSpan={isEmbedded ? 7 : 8}
									style={{ ...TD, color: "var(--con-muted)", textAlign: "center", padding: "24px" }}
								>
									{t("contracts.emptyState")}
								</td>
							</tr>
						) : (
							filtered.map((contract) => {
								if (editingId === contract.id) {
									return (
										<EditRow
											key={contract.id}
											contract={contract}
											onSave={(data) => handleSave(contract.id, data)}
											onCancel={() => setEditingId(null)}
											onDelete={() => handleDelete(contract.id)}
											clients={clients}
											isEmbedded={isEmbedded}
											t={t}
										/>
									);
								}

								const rowBg = getRenewalRowBg(contract.daysUntilRenewal);

								return (
									<tr
										key={contract.id}
										style={{ cursor: "pointer", background: rowBg }}
										onClick={() => setEditingId(contract.id)}
										onMouseEnter={(e) => {
											if (!rowBg) e.currentTarget.style.background = "var(--con-hover, rgba(148,163,184,0.05))";
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.background = rowBg;
										}}
									>
										{!isEmbedded && (
											<td style={TD}>{contract.client.name}</td>
										)}
										<td style={{ ...TD, fontWeight: 500 }}>{contract.name}</td>
										<td style={{ ...TD, color: contract.vendor ? "var(--con-text)" : "var(--con-muted)" }}>
											{contract.vendor ?? "—"}
										</td>
										<td style={TD}>
											<Badge
												label={TYPE_LABELS[contract.type] ?? contract.type}
												colors={TYPE_COLORS[contract.type] ?? TYPE_COLORS.software}
											/>
										</td>
										<td style={{ ...TD, ...getRenewalStyle(contract.daysUntilRenewal) }}>
											{contract.renewalDate}
										</td>
										<td style={TD}>
											<DaysCell days={contract.daysUntilRenewal} t={t} />
										</td>
										<td style={{ ...TD, color: contract.costPerYear ? "var(--con-text)" : "var(--con-muted)" }}>
											{contract.costPerYear != null
												? `€${contract.costPerYear.toLocaleString("fr-BE", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
												: "—"}
										</td>
										<td style={{ ...TD, color: contract.autoRenews ? "#16a34a" : "var(--con-muted)" }}>
											{contract.autoRenews ? t("contracts.autoRenewsYes") : t("contracts.autoRenewsNo")}
										</td>
									</tr>
								);
							})
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
