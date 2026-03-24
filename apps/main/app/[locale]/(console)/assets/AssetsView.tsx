"use client";

import { useState, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "@/components/LangProvider";

export type AssetRow = {
	id: string;
	name: string;
	type: string;
	serialNumber: string | null;
	assignedTo: string | null;
	status: string;
	sensitivity: string;
	warrantyExpiresAt: string | null;
	createdAt: string;
	client: { id: string; name: string };
};

type Client = { id: string; name: string };

type Props = {
	assets: AssetRow[];
	clients: Client[];
	filterClientId?: string;
	filterType?: string;
	filterStatus?: string;
	// When embedded in client detail — no client column, pre-filled clientId
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

// ─── Badge maps ───────────────────────────────────────────────────────────────

const TYPE_COLORS: Record<string, { bg: string; color: string }> = {
	hardware: { bg: "rgba(37,99,235,0.12)",   color: "var(--accent)" },
	software: { bg: "rgba(139,92,246,0.12)",  color: "#7c3aed" },
	license:  { bg: "rgba(234,179,8,0.15)",   color: "#b45309" },
	camera:   { bg: "rgba(148,163,184,0.15)", color: "var(--con-muted)" },
	network:  { bg: "rgba(20,184,166,0.12)",  color: "#0f766e" },
};

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
	ok:       { bg: "rgba(34,197,94,0.12)",   color: "#16a34a" },
	warning:  { bg: "rgba(234,179,8,0.15)",   color: "#ca8a04" },
	critical: { bg: "rgba(239,68,68,0.12)",   color: "#dc2626" },
	retired:  { bg: "rgba(148,163,184,0.15)", color: "var(--con-muted)" },
};

const SENSITIVITY_COLORS: Record<string, { bg: string; color: string } | null> = {
	normal:     null,
	restricted: { bg: "rgba(234,179,8,0.15)",  color: "#b45309" },
	internal:   { bg: "rgba(239,68,68,0.12)",  color: "#dc2626" },
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

// ─── Warranty date cell ───────────────────────────────────────────────────────

function WarrantyCell({ dateStr, t }: { dateStr: string | null; t: (k: string) => string }) {
	if (!dateStr) return <span style={{ color: "var(--con-muted)" }}>—</span>;

	const date = new Date(dateStr);
	const now = new Date();
	const daysLeft = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

	let color = "var(--con-text)";
	let suffix: string | null = null;

	if (daysLeft < 0) {
		color = "#dc2626";
		suffix = t("assets.warrantyExpired");
	} else if (daysLeft <= 60) {
		color = "#dc2626";
		suffix = t("assets.warrantyExpiredSoon");
	} else if (daysLeft <= 90) {
		color = "#ca8a04";
	}

	return (
		<span style={{ color }}>
			{dateStr}
			{suffix && (
				<span style={{ marginLeft: "6px", fontSize: "9px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
					{suffix}
				</span>
			)}
		</span>
	);
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AssetsView({ assets, clients, filterClientId, filterType, filterStatus, embeddedClientId }: Props) {
	const { t } = useTranslation();
	const router = useRouter();
	const { locale } = useParams<{ locale: string }>();
	const isEmbedded = Boolean(embeddedClientId);

	const [search, setSearch] = useState("");
	const [clientId, setClientId] = useState(filterClientId ?? "");
	const [typeFilter, setTypeFilter] = useState(filterType ?? "");
	const [statusFilter, setStatusFilter] = useState(filterStatus ?? "");

	const [showForm, setShowForm] = useState(false);
	const [formPending, setFormPending] = useState(false);
	const [formError, setFormError] = useState<string | null>(null);

	// Form state
	const [fClientId, setFClientId] = useState(embeddedClientId ?? clients[0]?.id ?? "");
	const [fName, setFName] = useState("");
	const [fType, setFType] = useState("hardware");
	const [fSerial, setFSerial] = useState("");
	const [fAssignedTo, setFAssignedTo] = useState("");
	const [fStatus, setFStatus] = useState("ok");
	const [fSensitivity, setFSensitivity] = useState("normal");
	const [fWarranty, setFWarranty] = useState("");
	const [fPurchasedAt, setFPurchasedAt] = useState("");
	const [fNotes, setFNotes] = useState("");

	function applyFilters(c: string, tp: string, s: string) {
		if (isEmbedded) return; // Embedded mode doesn't use URL filters
		const params = new URLSearchParams();
		if (c) params.set("clientId", c);
		if (tp) params.set("type", tp);
		if (s) params.set("status", s);
		const qs = params.toString();
		router.push(qs ? `/${locale}/assets?${qs}` : `/${locale}/assets`);
	}

	function handleFilterChange(field: "client" | "type" | "status", value: string) {
		const next = { c: clientId, tp: typeFilter, s: statusFilter };
		if (field === "client") { setClientId(value); next.c = value; }
		if (field === "type")   { setTypeFilter(value); next.tp = value; }
		if (field === "status") { setStatusFilter(value); next.s = value; }
		applyFilters(next.c, next.tp, next.s);
	}

	function resetForm() {
		setFClientId(embeddedClientId ?? clients[0]?.id ?? "");
		setFName(""); setFType("hardware"); setFSerial(""); setFAssignedTo("");
		setFStatus("ok"); setFSensitivity("normal"); setFWarranty(""); setFPurchasedAt(""); setFNotes("");
		setFormError(null);
	}

	async function handleCreate(e: React.FormEvent) {
		e.preventDefault();
		setFormPending(true);
		setFormError(null);

		const res = await fetch("/api/assets", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				clientId: fClientId,
				name: fName,
				type: fType,
				serialNumber: fSerial || undefined,
				assignedTo: fAssignedTo || undefined,
				status: fStatus,
				sensitivity: fSensitivity,
				warrantyExpiresAt: fWarranty || undefined,
				purchasedAt: fPurchasedAt || undefined,
				notes: fNotes || undefined,
			}),
		});

		setFormPending(false);

		if (!res.ok) {
			const data = await res.json().catch(() => ({}));
			setFormError(data.error ?? t("common.error"));
			return;
		}

		resetForm();
		setShowForm(false);
		router.refresh();
	}

	const TYPE_LABEL_KEYS: Record<string, string> = {
		hardware: "assets.typeHardware", software: "assets.typeSoftware",
		license: "assets.typeLicense",   camera: "assets.typeCamera",
		network: "assets.typeNetwork",
	};

	const STATUS_LABEL_KEYS: Record<string, string> = {
		ok: "assets.statusOk",         warning: "assets.statusWarning",
		critical: "assets.statusCritical", retired: "assets.statusRetired",
	};

	const SENSITIVITY_LABEL_KEYS: Record<string, string> = {
		normal: "assets.sensitivityNormal",
		restricted: "assets.sensitivityRestricted",
		internal: "assets.sensitivityInternal",
	};

	// Client-side search filter
	const filtered = useMemo(() => {
		const q = search.toLowerCase();
		return assets.filter((a) => {
			if (isEmbedded && a.client.id !== embeddedClientId) return false;
			if (!isEmbedded && clientId && a.client.id !== clientId) return false;
			if (typeFilter && a.type !== typeFilter) return false;
			if (statusFilter && a.status !== statusFilter) return false;
			if (q && !a.name.toLowerCase().includes(q) && !(a.serialNumber ?? "").toLowerCase().includes(q)) return false;
			return true;
		});
	}, [assets, search, clientId, typeFilter, statusFilter, isEmbedded, embeddedClientId]);

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
			{/* Page header */}
			<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
				{!isEmbedded && (
					<h1 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--con-subtle)" }}>
						{t("assets.title")}
					</h1>
				)}
				{isEmbedded && <div />}
				<button
					type="button"
					onClick={() => { setShowForm((v) => !v); if (showForm) resetForm(); }}
					style={{
						fontFamily: "var(--font-mono)",
						fontSize: "10px",
						fontWeight: 600,
						letterSpacing: "0.04em",
						background: showForm ? "transparent" : "var(--accent)",
						color: showForm ? "var(--con-muted)" : "#fff",
						border: showForm ? "1px solid var(--con-border)" : "none",
						borderRadius: "4px",
						padding: "6px 12px",
						cursor: "pointer",
					}}
				>
					{showForm ? t("common.cancel") : `+ ${t("assets.newAsset")}`}
				</button>
			</div>

			{/* Add asset form */}
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
					{/* Row 1: client, name, type */}
					<div style={{ display: "grid", gridTemplateColumns: isEmbedded ? "2fr 1fr" : "1fr 2fr 1fr", gap: "12px", marginBottom: "12px" }}>
						{!isEmbedded && (
							<div>
								<label style={labelStyle}>{t("assets.client")}</label>
								<select value={fClientId} onChange={(e) => setFClientId(e.target.value)} style={{ ...formInputStyle, cursor: "pointer" }}>
									{clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
								</select>
							</div>
						)}
						<div>
							<label style={labelStyle}>{t("assets.name")}</label>
							<input
								required
								value={fName}
								onChange={(e) => setFName(e.target.value)}
								placeholder="e.g. Dell Latitude 5540"
								style={formInputStyle}
							/>
						</div>
						<div>
							<label style={labelStyle}>{t("assets.type")}</label>
							<select value={fType} onChange={(e) => setFType(e.target.value)} style={{ ...formInputStyle, cursor: "pointer" }}>
								{Object.entries(TYPE_LABEL_KEYS).map(([v, k]) => <option key={v} value={v}>{t(k)}</option>)}
							</select>
						</div>
					</div>

					{/* Row 2: serial, assignedTo, status, sensitivity */}
					<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "12px", marginBottom: "12px" }}>
						<div>
							<label style={labelStyle}>{t("assets.serialNumber")}</label>
							<input value={fSerial} onChange={(e) => setFSerial(e.target.value)} style={{ ...formInputStyle, fontFamily: "var(--font-mono)" }} />
						</div>
						<div>
							<label style={labelStyle}>{t("assets.assignedTo")}</label>
							<input value={fAssignedTo} onChange={(e) => setFAssignedTo(e.target.value)} style={formInputStyle} />
						</div>
						<div>
							<label style={labelStyle}>{t("assets.status")}</label>
							<select value={fStatus} onChange={(e) => setFStatus(e.target.value)} style={{ ...formInputStyle, cursor: "pointer" }}>
								{Object.entries(STATUS_LABEL_KEYS).map(([v, k]) => <option key={v} value={v}>{t(k)}</option>)}
							</select>
						</div>
						<div>
							<label style={labelStyle}>{t("assets.sensitivity")}</label>
							<select value={fSensitivity} onChange={(e) => setFSensitivity(e.target.value)} style={{ ...formInputStyle, cursor: "pointer" }}>
								{Object.entries(SENSITIVITY_LABEL_KEYS).map(([v, k]) => <option key={v} value={v}>{t(k)}</option>)}
							</select>
						</div>
					</div>

					{/* Row 3: warranty, purchased */}
					<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "12px" }}>
						<div>
							<label style={labelStyle}>{t("assets.warrantyExpiry")}</label>
							<input type="date" value={fWarranty} onChange={(e) => setFWarranty(e.target.value)} style={{ ...formInputStyle, cursor: "pointer" }} />
						</div>
						<div>
							<label style={labelStyle}>{t("assets.purchasedAt")}</label>
							<input type="date" value={fPurchasedAt} onChange={(e) => setFPurchasedAt(e.target.value)} style={{ ...formInputStyle, cursor: "pointer" }} />
						</div>
					</div>

					{/* Notes */}
					<div style={{ marginBottom: "12px" }}>
						<label style={labelStyle}>
							{t("assets.notes")}
							<span style={{ marginLeft: "6px", color: "var(--con-muted)", fontSize: "9px", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>
								{t("assets.notesHint")}
							</span>
						</label>
						<textarea
							value={fNotes}
							onChange={(e) => setFNotes(e.target.value)}
							rows={2}
							style={{ ...formInputStyle, resize: "vertical" }}
						/>
					</div>

					{formError && (
						<p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#dc2626", marginBottom: "10px" }}>{formError}</p>
					)}

					<div style={{ display: "flex", gap: "8px" }}>
						<button
							type="submit"
							disabled={formPending}
							style={{
								fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.04em",
								background: "var(--accent)", color: "#fff", border: "none", borderRadius: "4px",
								padding: "6px 14px", cursor: "pointer", opacity: formPending ? 0.6 : 1,
							}}
						>
							{formPending ? t("assets.creating") : t("assets.create")}
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

			{/* Filter bar + search */}
			<div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
				<input
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder={t("assets.searchPlaceholder")}
					style={{ ...inputStyle, minWidth: "200px", cursor: "text" }}
				/>
				{!isEmbedded && (
					<select
						value={clientId}
						onChange={(e) => handleFilterChange("client", e.target.value)}
						style={inputStyle}
					>
						<option value="">{t("assets.allClients")}</option>
						{clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
					</select>
				)}
				<select value={typeFilter} onChange={(e) => handleFilterChange("type", e.target.value)} style={inputStyle}>
					<option value="">{t("assets.allTypes")}</option>
					{Object.entries(TYPE_LABEL_KEYS).map(([v, k]) => <option key={v} value={v}>{t(k)}</option>)}
				</select>
				<select value={statusFilter} onChange={(e) => handleFilterChange("status", e.target.value)} style={inputStyle}>
					<option value="">{t("assets.allStatuses")}</option>
					{Object.entries(STATUS_LABEL_KEYS).map(([v, k]) => <option key={v} value={v}>{t(k)}</option>)}
				</select>
			</div>

			{/* Table */}
			<div style={{ background: "var(--con-surface)", border: "1px solid var(--con-border)", borderRadius: "4px", overflow: "hidden" }}>
				<table style={{ width: "100%", borderCollapse: "collapse" }}>
					<thead>
						<tr>
							{!isEmbedded && <th style={TH}>{t("assets.client")}</th>}
							<th style={TH}>{t("assets.name")}</th>
							<th style={TH}>{t("assets.type")}</th>
							<th style={TH}>{t("assets.assignedTo")}</th>
							<th style={TH}>{t("assets.status")}</th>
							<th style={TH}>{t("assets.warrantyExpiry")}</th>
							<th style={TH}>{t("assets.sensitivity")}</th>
						</tr>
					</thead>
					<tbody>
						{filtered.length === 0 ? (
							<tr>
								<td
									colSpan={isEmbedded ? 6 : 7}
									style={{ ...TD, color: "var(--con-muted)", textAlign: "center", padding: "24px" }}
								>
									{t("assets.emptyState")}
								</td>
							</tr>
						) : (
							filtered.map((asset) => {
								const sensitivityColors = SENSITIVITY_COLORS[asset.sensitivity];
								return (
									<tr
										key={asset.id}
										style={{ cursor: "pointer" }}
										onClick={() => router.push(`/${locale}/assets/${asset.id}`)}
										onMouseEnter={(e) => (e.currentTarget.style.background = "var(--con-hover, rgba(148,163,184,0.05))")}
										onMouseLeave={(e) => (e.currentTarget.style.background = "")}
									>
										{!isEmbedded && (
											<td style={TD}>
												<Link
													href={`/${locale}/clients/${asset.client.id}`}
													onClick={(e) => e.stopPropagation()}
													style={{ color: "var(--con-text)", textDecoration: "none" }}
												>
													{asset.client.name}
												</Link>
											</td>
										)}
										<td style={{ ...TD, fontWeight: 500 }}>{asset.name}</td>
										<td style={TD}>
											<Badge
												label={t(TYPE_LABEL_KEYS[asset.type] ?? "assets.typeHardware")}
												colors={TYPE_COLORS[asset.type] ?? TYPE_COLORS.hardware}
											/>
										</td>
										<td style={{ ...TD, color: asset.assignedTo ? "var(--con-text)" : "var(--con-muted)" }}>
											{asset.assignedTo ?? "—"}
										</td>
										<td style={TD}>
											<Badge
												label={t(STATUS_LABEL_KEYS[asset.status] ?? "assets.statusOk")}
												colors={STATUS_COLORS[asset.status] ?? STATUS_COLORS.ok}
											/>
										</td>
										<td style={TD}>
											<WarrantyCell dateStr={asset.warrantyExpiresAt} t={t} />
										</td>
										<td style={TD}>
											{sensitivityColors ? (
												<Badge
													label={t(SENSITIVITY_LABEL_KEYS[asset.sensitivity])}
													colors={sensitivityColors}
												/>
											) : (
												<span style={{ color: "var(--con-muted)" }}>—</span>
											)}
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
