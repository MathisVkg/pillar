"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "@/components/LangProvider";

type Asset = {
	id: string;
	name: string;
	type: string;
	serialNumber: string | null;
	assignedTo: string | null;
	status: string;
	sensitivity: string;
	showSerialInPortal: boolean;
	notes: string | null;
	warrantyExpiresAt: string | null;
	purchasedAt: string | null;
	createdAt: string;
	client: { id: string; name: string };
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
	display: "block",
	fontFamily: "var(--font-mono)",
	fontSize: "9px",
	letterSpacing: "0.1em",
	textTransform: "uppercase",
	color: "var(--con-subtle)",
	marginBottom: "5px",
};

const inputStyle: React.CSSProperties = {
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

const sectionStyle: React.CSSProperties = {
	background: "var(--con-surface)",
	border: "1px solid var(--con-border)",
	borderRadius: "4px",
	padding: "20px",
	marginBottom: "16px",
};

const sectionTitle: React.CSSProperties = {
	fontFamily: "var(--font-mono)",
	fontSize: "9px",
	letterSpacing: "0.1em",
	textTransform: "uppercase",
	color: "var(--con-subtle)",
	marginBottom: "16px",
	paddingBottom: "8px",
	borderBottom: "1px solid var(--con-border)",
};

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

// ─── Main component ───────────────────────────────────────────────────────────

export default function AssetDetailView({ asset: initial }: { asset: Asset }) {
	const { t } = useTranslation();
	const router = useRouter();

	const [asset, setAsset] = useState(initial);
	const [saving, setSaving] = useState(false);
	const [saveError, setSaveError] = useState<string | null>(null);
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [deleting, setDeleting] = useState(false);

	// Editable fields
	const [name, setName] = useState(asset.name);
	const [type, setType] = useState(asset.type);
	const [serialNumber, setSerialNumber] = useState(asset.serialNumber ?? "");
	const [assignedTo, setAssignedTo] = useState(asset.assignedTo ?? "");
	const [status, setStatus] = useState(asset.status);
	const [sensitivity, setSensitivity] = useState(asset.sensitivity);
	const [showSerial, setShowSerial] = useState(asset.showSerialInPortal);
	const [warrantyExpiresAt, setWarrantyExpiresAt] = useState(asset.warrantyExpiresAt ?? "");
	const [purchasedAt, setPurchasedAt] = useState(asset.purchasedAt ?? "");
	const [notes, setNotes] = useState(asset.notes ?? "");

	const TYPE_LABELS: Record<string, string> = {
		hardware: t("assets.typeHardware"), software: t("assets.typeSoftware"),
		license: t("assets.typeLicense"),   camera: t("assets.typeCamera"),
		network: t("assets.typeNetwork"),
	};

	const STATUS_LABELS: Record<string, string> = {
		ok: t("assets.statusOk"),         warning: t("assets.statusWarning"),
		critical: t("assets.statusCritical"), retired: t("assets.statusRetired"),
	};

	const SENSITIVITY_LABELS: Record<string, string> = {
		normal: t("assets.sensitivityNormal"),
		restricted: t("assets.sensitivityRestricted"),
		internal: t("assets.sensitivityInternal"),
	};

	const SENSITIVITY_HINTS: Record<string, string> = {
		normal: t("assets.sensitivityNormalHint"),
		restricted: t("assets.sensitivityRestrictedHint"),
		internal: t("assets.sensitivityInternalHint"),
	};

	async function handleSave() {
		setSaving(true);
		setSaveError(null);

		const res = await fetch(`/api/assets/${asset.id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: name.trim() || asset.name,
				type,
				serialNumber: serialNumber || null,
				assignedTo: assignedTo || null,
				status,
				sensitivity,
				showSerialInPortal: showSerial,
				warrantyExpiresAt: warrantyExpiresAt || null,
				purchasedAt: purchasedAt || null,
				notes: notes || null,
			}),
		});

		setSaving(false);

		if (!res.ok) {
			const data = await res.json().catch(() => ({}));
			setSaveError(data.error ?? t("common.error"));
			return;
		}

		const updated = await res.json();
		setAsset(updated);
	}

	async function handleDelete() {
		setDeleting(true);
		const res = await fetch(`/api/assets/${asset.id}`, { method: "DELETE" });
		if (res.ok) {
			router.push("/assets");
		} else {
			setDeleting(false);
			setConfirmDelete(false);
		}
	}

	return (
		<div style={{ maxWidth: "760px" }}>
			{/* Back + header */}
			<div style={{ marginBottom: "20px" }}>
				<Link
					href="/assets"
					style={{
						fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--con-muted)",
						textDecoration: "none", letterSpacing: "0.04em",
					}}
				>
					{t("assets.backToAssets")}
				</Link>
				<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "10px" }}>
					<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
						<h1 style={{ fontFamily: "var(--font-mono)", fontSize: "14px", fontWeight: 600, color: "var(--con-text)", margin: 0 }}>
							{asset.name}
						</h1>
						<Badge label={TYPE_LABELS[asset.type] ?? asset.type} colors={TYPE_COLORS[asset.type] ?? TYPE_COLORS.hardware} />
						<Badge label={STATUS_LABELS[asset.status] ?? asset.status} colors={STATUS_COLORS[asset.status] ?? STATUS_COLORS.ok} />
					</div>
					<div style={{ display: "flex", gap: "8px" }}>
						<button
							type="button"
							onClick={handleSave}
							disabled={saving}
							style={{
								fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.04em",
								background: "var(--accent)", color: "#fff", border: "none", borderRadius: "4px",
								padding: "6px 14px", cursor: "pointer", opacity: saving ? 0.6 : 1,
							}}
						>
							{saving ? t("assets.saving") : t("assets.save")}
						</button>
						<button
							type="button"
							onClick={() => setConfirmDelete(true)}
							style={{
								fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.04em",
								background: "transparent", color: "#dc2626", border: "1px solid rgba(220,38,38,0.3)",
								borderRadius: "4px", padding: "6px 12px", cursor: "pointer",
							}}
						>
							{t("assets.delete")}
						</button>
					</div>
				</div>
				{/* Client (read-only) */}
				<div style={{ marginTop: "6px" }}>
					<span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--con-muted)" }}>
						{t("assets.client")}:{" "}
					</span>
					<Link
						href={`/clients/${asset.client.id}`}
						style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--accent)", textDecoration: "none" }}
					>
						{asset.client.name}
					</Link>
				</div>
			</div>

			{saveError && (
				<p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#dc2626", marginBottom: "12px" }}>{saveError}</p>
			)}

			{/* Main fields */}
			<div style={sectionStyle}>
				<p style={sectionTitle}>{t("assets.title")}</p>
				<div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
					<div>
						<label style={labelStyle}>{t("assets.name")}</label>
						<input value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
					</div>
					<div>
						<label style={labelStyle}>{t("assets.type")}</label>
						<select value={type} onChange={(e) => setType(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
							{Object.entries(TYPE_LABELS).map(([v, label]) => <option key={v} value={v}>{label}</option>)}
						</select>
					</div>
					<div>
						<label style={labelStyle}>{t("assets.status")}</label>
						<select value={status} onChange={(e) => setStatus(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
							{Object.entries(STATUS_LABELS).map(([v, label]) => <option key={v} value={v}>{label}</option>)}
						</select>
					</div>
				</div>
				<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
					<div>
						<label style={labelStyle}>{t("assets.serialNumber")}</label>
						<input
							value={serialNumber}
							onChange={(e) => setSerialNumber(e.target.value)}
							style={{ ...inputStyle, fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }}
						/>
					</div>
					<div>
						<label style={labelStyle}>{t("assets.assignedTo")}</label>
						<input value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} style={inputStyle} />
					</div>
				</div>
				<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
					<div>
						<label style={labelStyle}>{t("assets.warrantyExpiry")}</label>
						<input type="date" value={warrantyExpiresAt} onChange={(e) => setWarrantyExpiresAt(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }} />
					</div>
					<div>
						<label style={labelStyle}>{t("assets.purchasedAt")}</label>
						<input type="date" value={purchasedAt} onChange={(e) => setPurchasedAt(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }} />
					</div>
				</div>
			</div>

			{/* Portal visibility */}
			<div style={sectionStyle}>
				<p style={sectionTitle}>{t("assets.sensitivity")}</p>

				{/* Sensitivity */}
				<div style={{ marginBottom: "16px" }}>
					<label style={labelStyle}>{t("assets.sensitivity")}</label>
					<div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
						{Object.entries(SENSITIVITY_LABELS).map(([v, label]) => (
							<label key={v} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
								<input
									type="radio"
									name="sensitivity"
									value={v}
									checked={sensitivity === v}
									onChange={() => setSensitivity(v)}
								/>
								<span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--con-text)" }}>{label}</span>
								<span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--con-muted)" }}>
									— {SENSITIVITY_HINTS[v]}
								</span>
							</label>
						))}
					</div>
				</div>

				{/* Show serial toggle */}
				<div>
					<label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
						<input
							type="checkbox"
							checked={showSerial}
							onChange={(e) => setShowSerial(e.target.checked)}
						/>
						<span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--con-text)" }}>
							{t("assets.showSerialLabel")}
						</span>
						<span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--con-muted)" }}>
							— {t("assets.showSerialHint")}
						</span>
					</label>
				</div>
			</div>

			{/* Notes */}
			<div style={sectionStyle}>
				<label style={{ ...sectionTitle, display: "flex", alignItems: "center", gap: "8px" }}>
					{t("assets.notes")}
					<span style={{ fontSize: "9px", color: "var(--con-muted)", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>
						{t("assets.notesHint")}
					</span>
				</label>
				<textarea
					value={notes}
					onChange={(e) => setNotes(e.target.value)}
					rows={4}
					style={{ ...inputStyle, resize: "vertical" }}
				/>
			</div>

			{/* Delete confirmation */}
			{confirmDelete && (
				<div style={{
					background: "rgba(220,38,38,0.06)",
					border: "1px solid rgba(220,38,38,0.25)",
					borderRadius: "4px",
					padding: "16px",
					marginTop: "8px",
				}}>
					<p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#dc2626", margin: "0 0 12px" }}>
						{t("assets.confirmDelete")}
					</p>
					<div style={{ display: "flex", gap: "8px" }}>
						<button
							type="button"
							onClick={handleDelete}
							disabled={deleting}
							style={{
								fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 600,
								background: "#dc2626", color: "#fff", border: "none", borderRadius: "4px",
								padding: "6px 14px", cursor: "pointer", opacity: deleting ? 0.6 : 1,
							}}
						>
							{t("assets.delete")}
						</button>
						<button
							type="button"
							onClick={() => setConfirmDelete(false)}
							style={{
								fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--con-muted)",
								background: "transparent", border: "1px solid var(--con-border)",
								borderRadius: "4px", padding: "6px 12px", cursor: "pointer",
							}}
						>
							{t("common.cancel")}
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
