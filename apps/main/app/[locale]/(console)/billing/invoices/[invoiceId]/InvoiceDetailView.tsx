"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/components/LangProvider";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

type TimeEntry = {
	id: string;
	description: string;
	durationMinutes: number;
	hourlyRate: number;
	loggedAt: string;
	isBillable: boolean;
	ticket: { id: string; reference: string } | null;
};

type Client = {
	id: string;
	name: string;
	contractType: string;
	hourlyRate: number;
	retainerHours: number | null;
	retainerFee: number | null;
	vatNumber: string | null;
	address: string | null;
	city: string | null;
};

export type InvoiceDetail = {
	id: string;
	number: string;
	status: string;
	periodStart: string;
	periodEnd: string;
	subtotal: number;
	vatRate: number;
	vatAmount: number;
	total: number;
	dueDate: string;
	paidAt: string | null;
	notes: string | null;
	createdAt: string;
	updatedAt: string;
	client: Client;
	timeEntries: TimeEntry[];
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MONO: React.CSSProperties = { fontFamily: "var(--font-mono)" };

function toHours(min: number): string {
	const h = min / 60;
	return `${h % 1 === 0 ? h.toFixed(0) : h.toFixed(2)}h`;
}

function fmtDate(iso: string): string {
	return new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

function fmtPeriod(start: string, end: string): string {
	const s = new Date(start);
	const e = new Date(end);
	if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
		return s.toLocaleDateString(undefined, { month: "long", year: "numeric" });
	}
	return `${fmtDate(start)} – ${fmtDate(end)}`;
}

function isoToDateInput(iso: string): string {
	return new Date(iso).toISOString().slice(0, 10);
}

function fmtTime(ts: number): string {
	return new Date(ts).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

// ─── Status badge ─────────────────────────────────────────────────────────────

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
	draft:   { bg: "rgba(148,163,184,0.18)", color: "var(--con-muted)" },
	sent:    { bg: "rgba(37,99,235,0.12)",   color: "#2563EB" },
	paid:    { bg: "rgba(22,163,74,0.12)",   color: "#16a34a" },
	overdue: { bg: "rgba(220,38,38,0.12)",   color: "#dc2626" },
	voided:  { bg: "rgba(100,116,139,0.14)", color: "#64748b" },
};

function StatusBadge({ status, isOverdue }: { status: string; isOverdue: boolean }) {
	const { t } = useTranslation();
	const key = isOverdue ? "overdue" : status;
	const s = STATUS_STYLE[key] ?? STATUS_STYLE.draft;
	const labels: Record<string, string> = {
		draft: t("billing.statusDraft"),
		sent: t("billing.statusSent"),
		paid: t("billing.statusPaid"),
		overdue: t("billing.statusOverdue"),
		voided: t("billing.statusVoided"),
	};
	return (
		<span style={{
			...MONO,
			display: "inline-block",
			fontSize: "10px",
			letterSpacing: "0.06em",
			textTransform: "uppercase",
			fontWeight: 700,
			padding: "4px 9px",
			borderRadius: "3px",
			background: s.bg,
			color: s.color,
		}}>
			{labels[key] ?? key}
		</span>
	);
}

// ─── Table styles ─────────────────────────────────────────────────────────────

const TH: React.CSSProperties = {
	...MONO,
	fontSize: "9px",
	letterSpacing: "0.1em",
	textTransform: "uppercase",
	color: "var(--con-subtle)",
	padding: "8px 14px",
	textAlign: "left",
	fontWeight: 500,
	borderBottom: "1px solid var(--con-border)",
	whiteSpace: "nowrap",
};

const TD: React.CSSProperties = {
	...MONO,
	fontSize: "12px",
	color: "var(--con-text)",
	padding: "10px 14px",
	borderBottom: "1px solid var(--con-border)",
	whiteSpace: "nowrap",
};

// ─── Main component ───────────────────────────────────────────────────────────

export default function InvoiceDetailView({ invoice: initial }: { invoice: InvoiceDetail }) {
	const { t } = useTranslation();
	const router = useRouter();

	const [invoice, setInvoice] = useState(initial);
	const [actionPending, setActionPending] = useState<string | null>(null);
	const [flash, setFlash] = useState<string | null>(null);

	// Notes
	const [notes, setNotes] = useState(initial.notes ?? "");
	const [notesDirty, setNotesDirty] = useState(false);
	const [notesSaving, setNotesSaving] = useState(false);
	const [notesLastSaved, setNotesLastSaved] = useState<number | null>(null);

	// Editable dates (periodStart, periodEnd, dueDate)
	const [editPeriodStart, setEditPeriodStart] = useState(isoToDateInput(initial.periodStart));
	const [editPeriodEnd, setEditPeriodEnd] = useState(isoToDateInput(initial.periodEnd));
	const [editDueDate, setEditDueDate] = useState(isoToDateInput(initial.dueDate));
	const [datesDirty, setDatesDirty] = useState(false);
	const [datesSaving, setDatesSaving] = useState(false);
	const [datesLastSaved, setDatesLastSaved] = useState<number | null>(null);

	// Mark as paid date picker
	const [showPaidPicker, setShowPaidPicker] = useState(false);
	const [paidDate, setPaidDate] = useState(isoToDateInput(new Date().toISOString()));

	// Void confirm
	const [confirmingVoid, setConfirmingVoid] = useState(false);

	// Collapsible entries
	const [showEntries, setShowEntries] = useState(false);

	const isRetainer = invoice.client.contractType === "retainer";
	const totalMinutes = invoice.timeEntries.reduce((s, e) => s + e.durationMinutes, 0);
	const totalHours = totalMinutes / 60;
	const includedHours = invoice.client.retainerHours ?? 0;
	const extraHours = Math.max(totalHours - includedHours, 0);
	const isOverdue = invoice.status === "sent" && new Date(invoice.dueDate) < new Date();
	const canEdit = invoice.status === "draft" || invoice.status === "sent";

	// ── API actions ────────────────────────────────────────────────────────────

	async function patch(body: Record<string, unknown>) {
		const res = await fetch(`/api/invoices/${invoice.id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});
		if (!res.ok) {
			const d = await res.json().catch(() => ({}));
			throw new Error(d.error ?? "Error");
		}
		return res.json() as Promise<InvoiceDetail>;
	}

	async function handleMarkSent() {
		setActionPending("sent");
		try {
			const updated = await patch({ status: "sent" });
			setInvoice(updated);
			setFlash(t("billing.sentSuccess"));
			setTimeout(() => setFlash(null), 3000);
		} catch { /* ignore */ }
		setActionPending(null);
	}

	async function handleMarkPaid() {
		setActionPending("paid");
		try {
			const updated = await patch({ status: "paid", paidAt: new Date(paidDate).toISOString() });
			setInvoice(updated);
			setShowPaidPicker(false);
			setFlash(t("billing.paidSuccess"));
			setTimeout(() => setFlash(null), 3000);
		} catch { /* ignore */ }
		setActionPending(null);
	}

	async function handleVoid() {
		setActionPending("void");
		const res = await fetch(`/api/invoices/${invoice.id}`, { method: "DELETE" });
		setActionPending(null);
		if (res.ok) {
			setInvoice((inv) => ({ ...inv, status: "voided" }));
			setConfirmingVoid(false);
			router.refresh();
		}
	}

	async function handleSaveNotes() {
		setNotesSaving(true);
		try {
			const updated = await patch({ notes });
			setInvoice(updated);
			setNotesDirty(false);
			setNotesLastSaved(Date.now());
		} catch { /* ignore */ }
		setNotesSaving(false);
	}

	async function handleSaveDates() {
		setDatesSaving(true);
		try {
			const updated = await patch({
				periodStart: new Date(editPeriodStart).toISOString(),
				periodEnd: new Date(editPeriodEnd).toISOString(),
				dueDate: new Date(editDueDate).toISOString(),
			});
			setInvoice(updated);
			setDatesDirty(false);
			setDatesLastSaved(Date.now());
		} catch { /* ignore */ }
		setDatesSaving(false);
	}

	// ── Line items ─────────────────────────────────────────────────────────────

	const lineItems: { label: string; hours: string; rate: string; amount: number }[] = [];

	if (isRetainer && invoice.client.retainerFee != null) {
		lineItems.push({
			label: t("billing.retainerLine", { hours: includedHours }),
			hours: `${includedHours}h`,
			rate: "—",
			amount: invoice.client.retainerFee,
		});
		if (extraHours > 0) {
			lineItems.push({
				label: t("billing.extraHoursLine", { hours: extraHours.toFixed(2), rate: invoice.client.hourlyRate.toFixed(2) }),
				hours: `${extraHours.toFixed(2)}h`,
				rate: `€${invoice.client.hourlyRate.toFixed(2)}/h`,
				amount: extraHours * invoice.client.hourlyRate,
			});
		}
	} else {
		for (const e of invoice.timeEntries) {
			const amt = (e.durationMinutes / 60) * e.hourlyRate;
			lineItems.push({
				label: e.description,
				hours: toHours(e.durationMinutes),
				rate: `€${e.hourlyRate.toFixed(2)}/h`,
				amount: amt,
			});
		}
	}

	// ── Render ─────────────────────────────────────────────────────────────────

	const canSend = invoice.status === "draft";
	const canPay = invoice.status === "sent" || isOverdue;
	const canVoid = invoice.status === "draft" || invoice.status === "sent";

	const inputStyle: React.CSSProperties = {
		...MONO,
		fontSize: "11px",
		background: "var(--con-bg)",
		border: "1px solid var(--con-border)",
		borderRadius: "4px",
		padding: "5px 8px",
		color: "var(--con-text)",
		outline: "none",
	};

	return (
		<div style={{ maxWidth: "820px", margin: "0 auto", position: "relative" }}>

			{/* VOIDED watermark */}
			{invoice.status === "voided" && (
				<div style={{
					position: "fixed",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%) rotate(-30deg)",
					pointerEvents: "none",
					zIndex: 10,
					opacity: 0.07,
					fontSize: "96px",
					fontWeight: 900,
					letterSpacing: "0.05em",
					color: "#dc2626",
					fontFamily: "var(--font-mono)",
					userSelect: "none",
					whiteSpace: "nowrap",
				}}>
					VOIDED
				</div>
			)}

			{/* Back link */}
			<Link
				href="/billing/invoices"
				style={{ ...MONO, fontSize: "10px", color: "var(--con-subtle)", textDecoration: "none", letterSpacing: "0.04em", display: "inline-block", marginBottom: "16px" }}
			>
				{t("billing.backToBilling")}
			</Link>

			{/* Flash message */}
			{flash && (
				<div style={{ ...MONO, fontSize: "11px", fontWeight: 600, color: "#16a34a", background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.25)", borderRadius: "4px", padding: "8px 14px", marginBottom: "14px" }}>
					{flash}
				</div>
			)}

			{/* Voided banner */}
			{invoice.status === "voided" && (
				<div style={{ ...MONO, fontSize: "11px", fontWeight: 600, color: "#64748b", background: "rgba(100,116,139,0.08)", border: "1px solid rgba(100,116,139,0.25)", borderRadius: "4px", padding: "10px 14px", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
					<span style={{ fontSize: "14px" }}>⊘</span>
					<span>{t("billing.voidedBanner")}</span>
				</div>
			)}

			{/* Invoice header card */}
			<div style={{ background: "var(--con-surface)", border: "1px solid var(--con-border)", borderRadius: "6px", overflow: "hidden", marginBottom: "12px" }}>

				{/* Top strip: number + status + actions */}
				<div style={{ background: "#0F172A", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
					<div>
						<div style={{ ...MONO, fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#64748b", marginBottom: "4px" }}>
							{t("billing.invoiceNumber")}
						</div>
						<div style={{ ...MONO, fontSize: "22px", fontWeight: 700, color: "#fff", letterSpacing: "0.02em" }}>
							{invoice.number}
						</div>
					</div>

					<div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
						<StatusBadge status={invoice.status} isOverdue={isOverdue} />

						{/* Action buttons */}
						{canSend && (
							<button
								type="button"
								onClick={handleMarkSent}
								disabled={actionPending !== null}
								style={{ ...MONO, fontSize: "10px", fontWeight: 600, letterSpacing: "0.04em", background: "#2563EB", color: "#fff", border: "none", borderRadius: "4px", padding: "7px 14px", cursor: actionPending ? "not-allowed" : "pointer", opacity: actionPending ? 0.6 : 1 }}
							>
								{actionPending === "sent" ? "…" : t("billing.markAsSent")}
							</button>
						)}

						{canPay && !showPaidPicker && (
							<button
								type="button"
								onClick={() => setShowPaidPicker(true)}
								disabled={actionPending !== null}
								style={{ ...MONO, fontSize: "10px", fontWeight: 600, letterSpacing: "0.04em", background: "#16a34a", color: "#fff", border: "none", borderRadius: "4px", padding: "7px 14px", cursor: actionPending ? "not-allowed" : "pointer", opacity: actionPending ? 0.6 : 1 }}
							>
								{t("billing.markAsPaid")}
							</button>
						)}

						{/* Download PDF */}
						<a
							href={`/api/invoices/${invoice.id}/pdf`}
							download={`${invoice.number}.pdf`}
							style={{ ...MONO, fontSize: "10px", letterSpacing: "0.04em", background: "none", color: "#CBD5E1", border: "1px solid #1e2a44", borderRadius: "4px", padding: "7px 12px", textDecoration: "none", display: "inline-block" }}
						>
							{t("billing.downloadPdf")}
						</a>
					</div>
				</div>

				{/* Paid date picker */}
				{showPaidPicker && (
					<div style={{ background: "rgba(22,163,74,0.06)", borderBottom: "1px solid rgba(22,163,74,0.2)", padding: "12px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
						<label style={{ ...MONO, fontSize: "10px", color: "var(--con-muted)" }}>{t("billing.enterPaidDate")}</label>
						<input
							type="date"
							value={paidDate}
							onChange={(e) => setPaidDate(e.target.value)}
							style={inputStyle}
						/>
						<button
							type="button"
							onClick={handleMarkPaid}
							disabled={actionPending !== null}
							style={{ ...MONO, fontSize: "10px", fontWeight: 600, background: "#16a34a", color: "#fff", border: "none", borderRadius: "4px", padding: "6px 12px", cursor: actionPending ? "not-allowed" : "pointer" }}
						>
							{actionPending === "paid" ? "…" : t("common.save")}
						</button>
						<button
							type="button"
							onClick={() => setShowPaidPicker(false)}
							style={{ ...MONO, fontSize: "10px", background: "none", border: "1px solid var(--con-border)", borderRadius: "4px", padding: "6px 10px", color: "var(--con-muted)", cursor: "pointer" }}
						>
							{t("common.cancel")}
						</button>
					</div>
				)}

				{/* Meta grid */}
				<div style={{ padding: "16px 20px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "16px", borderBottom: canEdit ? "1px solid var(--con-border)" : "none" }}>
					{[
						{ label: t("billing.client"), value: invoice.client.name },
						{ label: t("billing.periodLabel"), value: fmtPeriod(invoice.periodStart, invoice.periodEnd) },
						{ label: t("billing.dueDate"), value: fmtDate(invoice.dueDate), danger: isOverdue },
						...(invoice.paidAt ? [{ label: t("billing.paidDate"), value: fmtDate(invoice.paidAt), green: true }] : []),
						...(invoice.client.vatNumber ? [{ label: "VAT", value: invoice.client.vatNumber }] : []),
					].map((item) => (
						<div key={item.label}>
							<div style={{ ...MONO, fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--con-subtle)", marginBottom: "3px" }}>
								{item.label}
							</div>
							<div style={{ ...MONO, fontSize: "13px", fontWeight: 600, color: (item as { danger?: boolean }).danger ? "#dc2626" : (item as { green?: boolean }).green ? "#16a34a" : "var(--con-text)" }}>
								{item.value}
							</div>
						</div>
					))}
				</div>

				{/* Editable dates section — draft and sent only */}
				{canEdit && (
					<div style={{ padding: "14px 20px", background: "rgba(37,99,235,0.03)", borderTop: "1px solid var(--con-border)" }}>
						<div style={{ ...MONO, fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--con-subtle)", marginBottom: "10px" }}>
							{t("billing.editDates")}
						</div>
						<div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "flex-end" }}>
							<label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
								<span style={{ ...MONO, fontSize: "9px", color: "var(--con-subtle)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{t("billing.periodStart")}</span>
								<input
									type="date"
									value={editPeriodStart}
									onChange={(e) => { setEditPeriodStart(e.target.value); setDatesDirty(true); }}
									style={inputStyle}
								/>
							</label>
							<label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
								<span style={{ ...MONO, fontSize: "9px", color: "var(--con-subtle)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{t("billing.periodEnd")}</span>
								<input
									type="date"
									value={editPeriodEnd}
									onChange={(e) => { setEditPeriodEnd(e.target.value); setDatesDirty(true); }}
									style={inputStyle}
								/>
							</label>
							<label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
								<span style={{ ...MONO, fontSize: "9px", color: "var(--con-subtle)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{t("billing.dueDate")}</span>
								<input
									type="date"
									value={editDueDate}
									onChange={(e) => { setEditDueDate(e.target.value); setDatesDirty(true); }}
									style={inputStyle}
								/>
							</label>
							{datesDirty && (
								<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
									<button
										type="button"
										onClick={handleSaveDates}
										disabled={datesSaving}
										style={{ ...MONO, fontSize: "10px", fontWeight: 600, background: datesSaving ? "var(--con-border)" : "#2563EB", color: "#fff", border: "none", borderRadius: "4px", padding: "6px 12px", cursor: datesSaving ? "not-allowed" : "pointer" }}
									>
										{datesSaving ? "…" : t("common.save")}
									</button>
									<button
										type="button"
										onClick={() => {
											setEditPeriodStart(isoToDateInput(invoice.periodStart));
											setEditPeriodEnd(isoToDateInput(invoice.periodEnd));
											setEditDueDate(isoToDateInput(invoice.dueDate));
											setDatesDirty(false);
										}}
										style={{ ...MONO, fontSize: "10px", background: "none", border: "1px solid var(--con-border)", borderRadius: "4px", padding: "6px 10px", color: "var(--con-muted)", cursor: "pointer" }}
									>
										{t("common.cancel")}
									</button>
								</div>
							)}
							{!datesDirty && datesLastSaved && (
								<span style={{ ...MONO, fontSize: "9px", color: "var(--con-subtle)", alignSelf: "center" }}>
									{t("billing.savedAt", { time: fmtTime(datesLastSaved) })}
								</span>
							)}
						</div>
					</div>
				)}
			</div>

			{/* Line items */}
			<div style={{ background: "var(--con-surface)", border: "1px solid var(--con-border)", borderRadius: "6px", overflow: "hidden", marginBottom: "12px" }}>
				<table style={{ width: "100%", borderCollapse: "collapse" }}>
					<thead>
						<tr>
							<th style={{ ...TH, width: "55%" }}>{t("billing.description")}</th>
							<th style={{ ...TH, textAlign: "right" }}>{t("billing.duration")}</th>
							<th style={{ ...TH, textAlign: "right" }}>€/h</th>
							<th style={{ ...TH, textAlign: "right" }}>{t("billing.amount")}</th>
						</tr>
					</thead>
					<tbody>
						{lineItems.map((item, i) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: stable synthetic list
							<tr key={i}>
								<td style={TD}>{item.label}</td>
								<td style={{ ...TD, textAlign: "right", color: "var(--con-muted)" }}>{item.hours}</td>
								<td style={{ ...TD, textAlign: "right", color: "var(--con-muted)" }}>{item.rate}</td>
								<td style={{ ...TD, textAlign: "right", fontWeight: 600 }}>€{item.amount.toFixed(2)}</td>
							</tr>
						))}
					</tbody>
				</table>

				{/* Totals block */}
				<div style={{ borderTop: "2px solid var(--con-border)", padding: "14px 14px 14px 0" }}>
					{[
						{ label: t("billing.subtotal"), value: `€${invoice.subtotal.toFixed(2)}`, muted: true },
						{ label: t("billing.vatRate"), value: `€${invoice.vatAmount.toFixed(2)}`, muted: true },
					].map((row) => (
						<div key={row.label} style={{ display: "flex", justifyContent: "flex-end", gap: "48px", padding: "3px 14px" }}>
							<span style={{ ...MONO, fontSize: "11px", color: "var(--con-subtle)", minWidth: "120px", textAlign: "right" }}>{row.label}</span>
							<span style={{ ...MONO, fontSize: "12px", color: "var(--con-muted)", minWidth: "80px", textAlign: "right" }}>{row.value}</span>
						</div>
					))}
					<div style={{ display: "flex", justifyContent: "flex-end", gap: "48px", padding: "8px 14px 0" }}>
						<span style={{ ...MONO, fontSize: "12px", fontWeight: 700, color: "var(--con-text)", minWidth: "120px", textAlign: "right" }}>
							{t("billing.totalInclVat")}
						</span>
						<span style={{ ...MONO, fontSize: "18px", fontWeight: 700, color: "#2563EB", minWidth: "80px", textAlign: "right" }}>
							€{invoice.total.toFixed(2)}
						</span>
					</div>
				</div>
			</div>

			{/* Logged time entries (collapsible) */}
			{invoice.timeEntries.length > 0 && (
				<div style={{ background: "var(--con-surface)", border: "1px solid var(--con-border)", borderRadius: "6px", overflow: "hidden", marginBottom: "12px" }}>
					<button
						type="button"
						onClick={() => setShowEntries((v) => !v)}
						style={{ width: "100%", padding: "10px 14px", display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", cursor: "pointer", borderBottom: showEntries ? "1px solid var(--con-border)" : "none" }}
					>
						<span style={{ ...MONO, fontSize: "10px", color: "var(--con-subtle)" }}>
							{showEntries ? "▾" : "▸"}
						</span>
						<span style={{ ...MONO, fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--con-subtle)", fontWeight: 500 }}>
							{t("billing.timeEntriesLogged")} · {t("billing.totalEntries", { n: invoice.timeEntries.length })}
						</span>
					</button>
					{showEntries && (
						<table style={{ width: "100%", borderCollapse: "collapse" }}>
							<thead>
								<tr>
									<th style={TH}>{t("billing.date")}</th>
									<th style={TH}>{t("billing.description")}</th>
									<th style={TH}>{t("billing.ticket")}</th>
									<th style={{ ...TH, textAlign: "right" }}>{t("billing.duration")}</th>
									<th style={{ ...TH, textAlign: "right" }}>{t("billing.amount")}</th>
								</tr>
							</thead>
							<tbody>
								{invoice.timeEntries.map((e) => (
									<tr key={e.id}>
										<td style={{ ...TD, color: "var(--con-subtle)" }}>
											{new Date(e.loggedAt).toLocaleDateString(undefined, { day: "numeric", month: "short" })}
										</td>
										<td style={{ ...TD, maxWidth: "320px", overflow: "hidden", textOverflow: "ellipsis" }}>
											{e.description}
										</td>
										<td style={TD}>
											{e.ticket ? (
												<Link href={`/tickets/${e.ticket.id}`} style={{ color: "#2563EB", fontWeight: 700, textDecoration: "none", ...MONO, fontSize: "11px" }}>
													{e.ticket.reference}
												</Link>
											) : (
												<span style={{ color: "var(--con-subtle)" }}>—</span>
											)}
										</td>
										<td style={{ ...TD, textAlign: "right" }}>{toHours(e.durationMinutes)}</td>
										<td style={{ ...TD, textAlign: "right", fontWeight: 600 }}>
											€{((e.durationMinutes / 60) * e.hourlyRate).toFixed(2)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
			)}

			{/* Notes */}
			<div style={{ background: "var(--con-surface)", border: "1px solid var(--con-border)", borderRadius: "6px", padding: "14px 16px", marginBottom: "12px" }}>
				<div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "8px" }}>
					<label style={{ ...MONO, fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--con-subtle)" }}>
						{t("billing.notes")}
					</label>
					{!notesDirty && notesLastSaved && (
						<span style={{ ...MONO, fontSize: "9px", color: "var(--con-subtle)" }}>
							{t("billing.savedAt", { time: fmtTime(notesLastSaved) })}
						</span>
					)}
				</div>
				<textarea
					value={notes}
					onChange={(e) => { setNotes(e.target.value); setNotesDirty(true); }}
					disabled={!canEdit}
					placeholder={canEdit ? t("billing.notesPlaceholder") : ""}
					rows={3}
					style={{
						width: "100%", ...MONO, fontSize: "12px", color: "var(--con-text)",
						background: canEdit ? "var(--con-bg)" : "transparent",
						border: canEdit ? "1px solid var(--con-border)" : "none",
						borderRadius: "4px", padding: canEdit ? "8px 10px" : "0",
						resize: canEdit ? "vertical" : "none",
						outline: "none", boxSizing: "border-box",
						cursor: canEdit ? "text" : "default",
					}}
					onFocus={(e) => canEdit && (e.currentTarget.style.borderColor = "#2563EB")}
					onBlur={(e) => canEdit && (e.currentTarget.style.borderColor = "var(--con-border)")}
				/>
				{notesDirty && (
					<div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
						<button
							type="button"
							onClick={handleSaveNotes}
							disabled={notesSaving}
							style={{ ...MONO, fontSize: "10px", fontWeight: 600, background: notesSaving ? "var(--con-border)" : "#2563EB", color: "#fff", border: "none", borderRadius: "4px", padding: "6px 12px", cursor: notesSaving ? "not-allowed" : "pointer" }}
						>
							{notesSaving ? t("billing.savingNotes") : t("common.save")}
						</button>
						<button
							type="button"
							onClick={() => { setNotes(invoice.notes ?? ""); setNotesDirty(false); }}
							style={{ ...MONO, fontSize: "10px", background: "none", border: "1px solid var(--con-border)", borderRadius: "4px", padding: "6px 10px", color: "var(--con-muted)", cursor: "pointer" }}
						>
							{t("common.cancel")}
						</button>
					</div>
				)}
			</div>

			{/* Void zone — draft or sent only */}
			{canVoid && (
				<div style={{ background: "var(--con-surface)", border: "1px solid var(--con-border)", borderRadius: "6px", padding: "14px 16px" }}>
					{!confirmingVoid ? (
						<button
							type="button"
							onClick={() => setConfirmingVoid(true)}
							style={{ ...MONO, fontSize: "10px", color: "var(--danger)", background: "none", border: "1px solid var(--con-border)", borderRadius: "4px", padding: "6px 12px", cursor: "pointer", letterSpacing: "0.04em" }}
						>
							{t("billing.voidInvoice")}
						</button>
					) : (
						<div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
							<span style={{ ...MONO, fontSize: "11px", color: "var(--danger)", flex: 1 }}>
								{invoice.status === "sent" ? t("billing.confirmVoidSent") : t("billing.confirmVoid")}
							</span>
							<button
								type="button"
								onClick={handleVoid}
								disabled={actionPending !== null}
								style={{ ...MONO, fontSize: "10px", fontWeight: 600, background: "var(--danger)", color: "#fff", border: "none", borderRadius: "4px", padding: "6px 12px", cursor: actionPending ? "not-allowed" : "pointer" }}
							>
								{actionPending === "void" ? "…" : t("billing.voidConfirmBtn")}
							</button>
							<button
								type="button"
								onClick={() => setConfirmingVoid(false)}
								style={{ ...MONO, fontSize: "10px", background: "none", border: "1px solid var(--con-border)", borderRadius: "4px", padding: "6px 10px", color: "var(--con-muted)", cursor: "pointer" }}
							>
								{t("common.cancel")}
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
