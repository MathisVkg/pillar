"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/components/LangProvider";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

type TimeEntry = {
	id: string;
	description: string;
	durationMinutes: number;
	hourlyRate: number;
	isBillable: boolean;
	isInvoiced: boolean;
	loggedAt: string;
};

type Ticket = {
	id: string;
	reference: string;
	title: string;
	description: string | null;
	status: string;
	priority: string;
	source: string;
	isBillable: boolean;
	resolvedAt: string | null;
	createdAt: string;
	updatedAt: string;
	totalMinutes: number;
	client: { id: string; name: string; hourlyRate: number };
	timeEntries: TimeEntry[];
};

// ─── Style maps ───────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
	open:        { bg: "rgba(37,99,235,0.12)",   color: "var(--accent)" },
	in_progress: { bg: "rgba(234,179,8,0.15)",   color: "#ca8a04" },
	done:        { bg: "rgba(34,197,94,0.12)",   color: "#16a34a" },
	closed:      { bg: "rgba(148,163,184,0.15)", color: "var(--con-muted)" },
};

const PRIORITY_STYLES: Record<string, { bg: string; color: string }> = {
	low:    { bg: "rgba(148,163,184,0.15)", color: "var(--con-muted)" },
	normal: { bg: "rgba(148,163,184,0.15)", color: "var(--con-text)" },
	high:   { bg: "rgba(234,179,8,0.15)",   color: "#ca8a04" },
	urgent: { bg: "rgba(239,68,68,0.12)",   color: "#dc2626" },
};

function pillSelect(map: Record<string, { bg: string; color: string }>, value: string): React.CSSProperties {
	const s = map[value] ?? { bg: "rgba(148,163,184,0.15)", color: "var(--con-muted)" };
	return {
		fontFamily: "var(--font-mono)",
		fontSize: "10px",
		fontWeight: 700,
		letterSpacing: "0.06em",
		textTransform: "uppercase",
		background: s.bg,
		color: s.color,
		border: "none",
		borderRadius: "4px",
		padding: "4px 10px",
		cursor: "pointer",
		appearance: "none" as const,
		WebkitAppearance: "none" as const,
		outline: "none",
	};
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toHours(minutes: number): string {
	const h = minutes / 60;
	return `${h % 1 === 0 ? h.toFixed(0) : h.toFixed(2)}h`;
}

function calcAmount(minutes: number, rate: number): number {
	return (minutes / 60) * rate;
}

function nowLocalInput(): string {
	const now = new Date();
	now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
	return now.toISOString().slice(0, 16);
}

// ─── Shared style constants ───────────────────────────────────────────────────

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
	padding: "9px 12px",
	borderBottom: "1px solid var(--con-border)",
	whiteSpace: "nowrap",
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

const fi: React.CSSProperties = {
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

const actionBtn = (color?: string): React.CSSProperties => ({
	fontFamily: "var(--font-mono)",
	fontSize: "9px",
	letterSpacing: "0.06em",
	textTransform: "uppercase",
	background: "none",
	border: `1px solid ${color ?? "var(--con-border)"}`,
	borderRadius: "3px",
	padding: "2px 7px",
	color: color ?? "var(--con-muted)",
	cursor: "pointer",
});

// ─── Main component ───────────────────────────────────────────────────────────

export default function TicketDetailView({ ticket: initial }: { ticket: Ticket }) {
	const { t } = useTranslation();
	const router = useRouter();

	const [ticket, setTicket] = useState(initial);

	// ── "Saved" flash ─────────────────────────────────────────────────────────
	const [showSaved, setShowSaved] = useState(false);
	const savedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	function flashSaved() {
		setShowSaved(true);
		if (savedTimer.current) clearTimeout(savedTimer.current);
		savedTimer.current = setTimeout(() => setShowSaved(false), 2000);
	}
	useEffect(() => () => { if (savedTimer.current) clearTimeout(savedTimer.current); }, []);

	// ── Ticket delete confirm ─────────────────────────────────────────────────
	const [confirmingDelete, setConfirmingDelete] = useState(false);
	const [deleteError, setDeleteError] = useState<string | null>(null);

	// ── Title editing ─────────────────────────────────────────────────────────
	const [editingTitle, setEditingTitle] = useState(false);
	const [titleValue, setTitleValue] = useState(initial.title);
	const titleRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (editingTitle) titleRef.current?.select();
	}, [editingTitle]);

	async function saveTitleIfChanged() {
		const trimmed = titleValue.trim();
		if (!trimmed || trimmed === ticket.title) { setEditingTitle(false); return; }
		const updated = await patchTicket({ title: trimmed });
		if (updated) { setTicket((p) => ({ ...p, title: updated.title })); flashSaved(); }
		setEditingTitle(false);
	}

	// ── Description editing ───────────────────────────────────────────────────
	const [editingDesc, setEditingDesc] = useState(false);
	const [descValue, setDescValue] = useState(initial.description ?? "");
	const [savingDesc, setSavingDesc] = useState(false);

	async function handleSaveDesc() {
		setSavingDesc(true);
		const updated = await patchTicket({ description: descValue });
		setSavingDesc(false);
		if (updated) { setTicket((p) => ({ ...p, description: updated.description })); flashSaved(); }
		setEditingDesc(false);
	}

	// ── Status / priority (auto-save on change) ───────────────────────────────
	const [updatingStatus, setUpdatingStatus] = useState(false);
	const [updatingPriority, setUpdatingPriority] = useState(false);

	async function handleStatusChange(value: string) {
		setUpdatingStatus(true);
		const updated = await patchTicket({ status: value });
		setUpdatingStatus(false);
		if (updated) { setTicket((p) => ({ ...p, status: updated.status, resolvedAt: updated.resolvedAt })); flashSaved(); }
	}

	async function handlePriorityChange(value: string) {
		setUpdatingPriority(true);
		const updated = await patchTicket({ priority: value });
		setUpdatingPriority(false);
		if (updated) { setTicket((p) => ({ ...p, priority: updated.priority })); flashSaved(); }
	}

	// ── Source (auto-save on change) ──────────────────────────────────────────
	const [updatingSource, setUpdatingSource] = useState(false);

	async function handleSourceChange(value: string) {
		setUpdatingSource(true);
		const updated = await patchTicket({ source: value });
		setUpdatingSource(false);
		if (updated) { setTicket((p) => ({ ...p, source: updated.source })); flashSaved(); }
	}

	// ── isBillable toggle ─────────────────────────────────────────────────────
	const [updatingBillable, setUpdatingBillable] = useState(false);

	async function handleToggleBillable() {
		setUpdatingBillable(true);
		const updated = await patchTicket({ isBillable: !ticket.isBillable });
		setUpdatingBillable(false);
		if (updated) { setTicket((p) => ({ ...p, isBillable: updated.isBillable })); flashSaved(); }
	}

	// ── Shared PATCH helper ───────────────────────────────────────────────────
	async function patchTicket(data: Record<string, unknown>) {
		const res = await fetch(`/api/tickets/${ticket.id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!res.ok) return null;
		return res.json();
	}

	// ── Ticket delete ─────────────────────────────────────────────────────────
	async function handleDelete() {
		setDeleteError(null);
		const res = await fetch(`/api/tickets/${ticket.id}`, { method: "DELETE" });
		if (!res.ok) {
			const data = await res.json().catch(() => ({}));
			setDeleteError(data.error ?? t("common.error"));
			setConfirmingDelete(false);
			return;
		}
		router.push("/tickets");
	}

	// ── Log time form ─────────────────────────────────────────────────────────
	const [showLogForm, setShowLogForm] = useState(false);
	const [logPending, setLogPending] = useState(false);
	const [logError, setLogError] = useState<string | null>(null);
	const [logDesc, setLogDesc] = useState("");
	const [logDuration, setLogDuration] = useState("60");
	const [logRate, setLogRate] = useState(String(initial.client.hourlyRate));
	const [logBillable, setLogBillable] = useState(true);
	const [logDate, setLogDate] = useState(nowLocalInput);

	function resetLogForm() {
		setLogDesc(""); setLogDuration("60"); setLogRate(String(ticket.client.hourlyRate));
		setLogBillable(true); setLogDate(nowLocalInput()); setLogError(null);
	}

	async function handleLogTime(e: React.FormEvent) {
		e.preventDefault();
		setLogPending(true); setLogError(null);
		const res = await fetch("/api/time-entries", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				clientId: ticket.client.id,
				ticketId: ticket.id,
				description: logDesc,
				durationMinutes: Number(logDuration),
				hourlyRate: Number(logRate),
				isBillable: logBillable,
				loggedAt: new Date(logDate).toISOString(),
			}),
		});
		setLogPending(false);
		if (!res.ok) {
			const d = await res.json().catch(() => ({}));
			setLogError(d.error ?? t("common.error")); return;
		}
		const newEntry: TimeEntry = await res.json();
		setTicket((p) => ({ ...p, timeEntries: [newEntry, ...p.timeEntries], totalMinutes: p.totalMinutes + newEntry.durationMinutes }));
		resetLogForm(); setShowLogForm(false);
	}

	// ── Time entry edit state ─────────────────────────────────────────────────
	const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
	const [entryDesc, setEntryDesc] = useState("");
	const [entryDuration, setEntryDuration] = useState("");
	const [entryRate, setEntryRate] = useState("");
	const [entryBillable, setEntryBillable] = useState(true);
	const [entryDate, setEntryDate] = useState("");
	const [entryPending, setEntryPending] = useState(false);
	const [entryError, setEntryError] = useState<string | null>(null);

	function startEditEntry(e: TimeEntry) {
		setEditingEntryId(e.id);
		setEntryDesc(e.description);
		setEntryDuration(String(e.durationMinutes));
		setEntryRate(String(e.hourlyRate));
		setEntryBillable(e.isBillable);
		const d = new Date(e.loggedAt);
		d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
		setEntryDate(d.toISOString().slice(0, 16));
		setEntryError(null);
		setDeletingEntryId(null);
	}

	async function handleSaveEntry(e: React.FormEvent) {
		e.preventDefault();
		if (!editingEntryId) return;
		setEntryPending(true); setEntryError(null);
		const res = await fetch(`/api/time-entries/${editingEntryId}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				description: entryDesc,
				durationMinutes: Number(entryDuration),
				hourlyRate: Number(entryRate),
				isBillable: entryBillable,
				loggedAt: new Date(entryDate).toISOString(),
			}),
		});
		setEntryPending(false);
		if (!res.ok) {
			const d = await res.json().catch(() => ({}));
			setEntryError(d.error ?? t("common.error")); return;
		}
		const updated: TimeEntry = await res.json();
		const oldMinutes = ticket.timeEntries.find((x) => x.id === editingEntryId)?.durationMinutes ?? 0;
		setTicket((p) => ({
			...p,
			totalMinutes: p.totalMinutes - oldMinutes + updated.durationMinutes,
			timeEntries: p.timeEntries.map((x) => x.id === editingEntryId ? updated : x),
		}));
		setEditingEntryId(null);
	}

	// ── Time entry delete state ───────────────────────────────────────────────
	const [deletingEntryId, setDeletingEntryId] = useState<string | null>(null);
	const [deletingEntryPending, setDeletingEntryPending] = useState(false);

	async function handleDeleteEntry(entryId: string) {
		setDeletingEntryPending(true);
		const res = await fetch(`/api/time-entries/${entryId}`, { method: "DELETE" });
		setDeletingEntryPending(false);
		if (!res.ok) return;
		const removed = ticket.timeEntries.find((x) => x.id === entryId);
		setTicket((p) => ({
			...p,
			totalMinutes: p.totalMinutes - (removed?.durationMinutes ?? 0),
			timeEntries: p.timeEntries.filter((x) => x.id !== entryId),
		}));
		setDeletingEntryId(null);
	}

	// ── Derived ───────────────────────────────────────────────────────────────
	const totalAmount = ticket.timeEntries.reduce((s, e) => s + calcAmount(e.durationMinutes, e.hourlyRate), 0);

	// ─────────────────────────────────────────────────────────────────────────
	return (
		<div>
			{/* Back */}
			<Link href="/tickets" style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--con-subtle)", textDecoration: "none", letterSpacing: "0.04em", display: "inline-block", marginBottom: "16px" }}>
				{t("tickets.backToTickets")}
			</Link>

			{/* Header card */}
			<div style={{ background: "var(--con-surface)", border: "1px solid var(--con-border)", borderRadius: "4px", padding: "16px 20px", marginBottom: "16px" }}>

				{/* Title row */}
				<div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "12px" }}>
					<span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: 700, color: "var(--accent)", flexShrink: 0, paddingTop: "2px" }}>
						{ticket.reference}
					</span>

					{editingTitle ? (
						<input
							ref={titleRef}
							value={titleValue}
							onChange={(e) => setTitleValue(e.target.value)}
							onBlur={saveTitleIfChanged}
							onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); saveTitleIfChanged(); } if (e.key === "Escape") { setEditingTitle(false); setTitleValue(ticket.title); } }}
							style={{ ...fi, flex: 1, fontSize: "15px", fontWeight: 700, padding: "2px 8px" }}
						/>
					) : (
						<h1
							onClick={() => { setTitleValue(ticket.title); setEditingTitle(true); }}
							title="Click to edit"
							style={{ fontFamily: "var(--font-mono)", fontSize: "15px", fontWeight: 700, color: "var(--con-text)", flex: 1, margin: 0, lineHeight: 1.3, cursor: "text" }}
						>
							{ticket.title}
						</h1>
					)}

					{/* Saved flash */}
					{showSaved && (
						<span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.06em", textTransform: "uppercase", color: "#16a34a", flexShrink: 0, paddingTop: "4px", transition: "opacity 0.3s" }}>
							{t("tickets.saved")}
						</span>
					)}

					{/* Delete */}
					{deleteError && (
						<span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--danger)", flexShrink: 0 }}>{deleteError}</span>
					)}
					{!confirmingDelete ? (
						<button type="button" onClick={() => setConfirmingDelete(true)} style={{ ...actionBtn("var(--danger)"), flexShrink: 0 }}>
							{t("tickets.deleteTicket")}
						</button>
					) : (
						<div style={{ display: "flex", gap: "6px", alignItems: "center", flexShrink: 0 }}>
							<div style={{ textAlign: "right" }}>
								<div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--danger)", marginBottom: "2px" }}>{t("tickets.confirmDelete")}</div>
								<div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--con-subtle)" }}>{t("tickets.confirmDeleteEntryWarning")}</div>
							</div>
							<button type="button" onClick={handleDelete} style={{ fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 600, background: "var(--danger)", color: "#fff", border: "none", borderRadius: "3px", padding: "3px 8px", cursor: "pointer" }}>
								{t("tickets.deleteTicket")}
							</button>
							<button type="button" onClick={() => setConfirmingDelete(false)} style={{ ...actionBtn() }}>
								{t("common.cancel")}
							</button>
						</div>
					)}
				</div>

				{/* Meta row */}
				<div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap", marginBottom: "14px" }}>
					<span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--con-muted)", fontWeight: 600 }}>{ticket.client.name}</span>
					<span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--con-subtle)" }}>
						{new Date(ticket.createdAt).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}
					</span>
					{ticket.resolvedAt && (
						<span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#16a34a" }}>
							{t("tickets.resolvedAt")}: {new Date(ticket.resolvedAt).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}
						</span>
					)}
				</div>

				{/* Pills + source + billable row */}
				<div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
					{/* Status pill */}
					<select value={ticket.status} disabled={updatingStatus} onChange={(e) => handleStatusChange(e.target.value)}
						style={{ ...pillSelect(STATUS_STYLES, ticket.status), opacity: updatingStatus ? 0.5 : 1 }}>
						<option value="open">{t("tickets.statusOpen")}</option>
						<option value="in_progress">{t("tickets.statusInProgress")}</option>
						<option value="done">{t("tickets.statusDone")}</option>
						<option value="closed">{t("tickets.statusClosed")}</option>
					</select>

					{/* Priority pill */}
					<select value={ticket.priority} disabled={updatingPriority} onChange={(e) => handlePriorityChange(e.target.value)}
						style={{ ...pillSelect(PRIORITY_STYLES, ticket.priority), opacity: updatingPriority ? 0.5 : 1 }}>
						<option value="low">{t("tickets.priorityLow")}</option>
						<option value="normal">{t("tickets.priorityNormal")}</option>
						<option value="high">{t("tickets.priorityHigh")}</option>
						<option value="urgent">{t("tickets.priorityUrgent")}</option>
					</select>

					{/* Source dropdown */}
					<select value={ticket.source} disabled={updatingSource} onChange={(e) => handleSourceChange(e.target.value)}
						style={{ fontFamily: "var(--font-mono)", fontSize: "10px", background: "var(--con-bg)", border: "1px solid var(--con-border)", borderRadius: "4px", padding: "4px 8px", color: "var(--con-subtle)", outline: "none", cursor: "pointer", opacity: updatingSource ? 0.5 : 1 }}>
						<option value="manual">{t("tickets.sourceManual")}</option>
						<option value="phone">{t("tickets.sourcePhone")}</option>
						<option value="whatsapp">{t("tickets.sourceWhatsapp")}</option>
						<option value="email">{t("tickets.sourceEmail")}</option>
						<option value="portal">{t("tickets.sourcePortal")}</option>
					</select>

					{/* Billable toggle */}
					<button
						type="button"
						disabled={updatingBillable}
						onClick={handleToggleBillable}
						style={{
							fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.06em",
							textTransform: "uppercase",
							background: ticket.isBillable ? "rgba(37,99,235,0.08)" : "rgba(148,163,184,0.1)",
							color: ticket.isBillable ? "var(--accent)" : "var(--con-subtle)",
							border: `1px solid ${ticket.isBillable ? "rgba(37,99,235,0.3)" : "var(--con-border)"}`,
							borderRadius: "4px", padding: "4px 8px", cursor: "pointer", opacity: updatingBillable ? 0.5 : 1,
						}}
					>
						{ticket.isBillable ? `✓ ${t("tickets.billable")}` : t("tickets.notBillableLabel")}
					</button>
				</div>
			</div>

			{/* Description */}
			<div style={{ background: "var(--con-surface)", border: "1px solid var(--con-border)", borderRadius: "4px", padding: "14px 16px", marginBottom: "16px" }}>
				<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: editingDesc ? "10px" : "6px" }}>
					<span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--con-subtle)" }}>
						{t("tickets.description")}
					</span>
					{!editingDesc && (
						<button type="button" onClick={() => { setDescValue(ticket.description ?? ""); setEditingDesc(true); }} style={actionBtn()}>
							{t("tickets.editDescription")}
						</button>
					)}
				</div>
				{editingDesc ? (
					<div>
						<textarea value={descValue} onChange={(e) => setDescValue(e.target.value)} rows={5}
							style={{ ...fi, resize: "vertical" }}
							onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
							onBlur={(e) => (e.currentTarget.style.borderColor = "var(--con-border)")} />
						<div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
							<button type="button" onClick={handleSaveDesc} disabled={savingDesc} style={{
								fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 600,
								background: savingDesc ? "var(--con-border)" : "var(--accent)",
								color: "#fff", border: "none", borderRadius: "4px", padding: "6px 12px",
								cursor: savingDesc ? "not-allowed" : "pointer",
							}}>
								{savingDesc ? t("tickets.saving") : t("tickets.saveDescription")}
							</button>
							<button type="button" onClick={() => setEditingDesc(false)} style={{ fontFamily: "var(--font-mono)", fontSize: "10px", background: "none", border: "1px solid var(--con-border)", borderRadius: "4px", padding: "6px 12px", color: "var(--con-muted)", cursor: "pointer" }}>
								{t("common.cancel")}
							</button>
						</div>
					</div>
				) : (
					<p style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: ticket.description ? "var(--con-text)" : "var(--con-subtle)", margin: 0, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
						{ticket.description ?? "—"}
					</p>
				)}
			</div>

			{/* Time entries */}
			<div style={{ background: "var(--con-surface)", border: "1px solid var(--con-border)", borderRadius: "4px", overflow: "hidden" }}>
				{/* Section header */}
				<div style={{ padding: "10px 16px", borderBottom: "1px solid var(--con-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
					<span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--con-subtle)" }}>
						{t("tickets.timeEntriesSection")}
					</span>
					<button type="button"
						onClick={() => { setShowLogForm((v) => !v); if (showLogForm) resetLogForm(); }}
						style={{
							fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.04em",
							background: showLogForm ? "transparent" : "var(--accent)",
							color: showLogForm ? "var(--con-muted)" : "#fff",
							border: showLogForm ? "1px solid var(--con-border)" : "none",
							borderRadius: "4px", padding: "5px 10px", cursor: "pointer",
						}}>
						{showLogForm ? t("common.cancel") : `+ ${t("tickets.logTime")}`}
					</button>
				</div>

				{/* Log time form */}
				{showLogForm && (
					<form onSubmit={handleLogTime} style={{ padding: "14px 16px", borderBottom: "1px solid var(--con-border)", background: "var(--con-bg)" }}>
						<div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: "10px", marginBottom: "10px" }}>
							<div>
								<label style={labelStyle}>{t("tickets.description")}</label>
								<input required value={logDesc} onChange={(e) => setLogDesc(e.target.value)} style={fi}
									onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
									onBlur={(e) => (e.currentTarget.style.borderColor = "var(--con-border)")} />
							</div>
							<div>
								<label style={labelStyle}>{t("tickets.durationLabel")}</label>
								<input required type="number" min="1" step="1" value={logDuration} onChange={(e) => setLogDuration(e.target.value)} style={fi}
									onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
									onBlur={(e) => (e.currentTarget.style.borderColor = "var(--con-border)")} />
							</div>
							<div>
								<label style={labelStyle}>{t("tickets.rateLabel")}</label>
								<input required type="number" min="0" step="0.01" value={logRate} onChange={(e) => setLogRate(e.target.value)} style={fi}
									onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
									onBlur={(e) => (e.currentTarget.style.borderColor = "var(--con-border)")} />
							</div>
							<div>
								<label style={labelStyle}>{t("tickets.billable")}</label>
								<select value={logBillable ? "yes" : "no"} onChange={(e) => setLogBillable(e.target.value === "yes")} style={{ ...fi, cursor: "pointer" }}>
									<option value="yes">{t("tickets.yes")}</option>
									<option value="no">{t("tickets.no")}</option>
								</select>
							</div>
							<div>
								<label style={labelStyle}>{t("tickets.loggedAtLabel")}</label>
								<input required type="datetime-local" value={logDate} onChange={(e) => setLogDate(e.target.value)} style={fi}
									onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
									onBlur={(e) => (e.currentTarget.style.borderColor = "var(--con-border)")} />
							</div>
						</div>
						<div style={{ marginBottom: "10px", fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--con-subtle)" }}>
							{logDuration && logRate ? `${toHours(Number(logDuration))} × €${Number(logRate).toFixed(2)}/h = €${calcAmount(Number(logDuration), Number(logRate)).toFixed(2)}` : ""}
						</div>
						<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
							<button type="submit" disabled={logPending} style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 600, background: logPending ? "var(--con-border)" : "var(--accent)", color: "#fff", border: "none", borderRadius: "4px", padding: "7px 14px", cursor: logPending ? "not-allowed" : "pointer" }}>
								{logPending ? t("tickets.loggingTime") : t("tickets.logTime")}
							</button>
							{logError && <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--danger)" }}>{logError}</span>}
						</div>
					</form>
				)}

				{/* Entries */}
				{ticket.timeEntries.length === 0 && !showLogForm ? (
					<p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--con-subtle)", padding: "32px", textAlign: "center" }}>{t("tickets.noTimeEntries")}</p>
				) : ticket.timeEntries.length > 0 ? (
					<>
						<table style={{ width: "100%", borderCollapse: "collapse" }}>
							<thead>
								<tr>
									<th style={TH}>{t("tickets.loggedAtLabel")}</th>
									<th style={TH}>{t("tickets.description")}</th>
									<th style={{ ...TH, textAlign: "right" }}>{t("tickets.durationLabel").replace(" (min)", "")}</th>
									<th style={{ ...TH, textAlign: "right" }}>{t("tickets.rateLabel").replace(" (€/h)", "")}</th>
									<th style={{ ...TH, textAlign: "right" }}>{t("tickets.amountLabel")}</th>
									<th style={{ ...TH, textAlign: "right" }}>{t("common.actions")}</th>
								</tr>
							</thead>
							<tbody>
								{ticket.timeEntries.map((e) => (
									<React.Fragment key={e.id}>
										{/* Main entry row */}
										<tr key={e.id}>
											<td style={{ ...TD, color: "var(--con-subtle)" }}>
												{new Date(e.loggedAt).toLocaleDateString(undefined, { day: "numeric", month: "short" })}
											</td>
											<td style={{ ...TD, maxWidth: "280px", overflow: "hidden", textOverflow: "ellipsis" }}>
												{e.description}
												{e.isInvoiced && (
													<span style={{ marginLeft: "8px", fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.06em", textTransform: "uppercase", background: "rgba(34,197,94,0.1)", color: "#16a34a", borderRadius: "3px", padding: "1px 5px" }}>
														{t("tickets.invoicedBadge")}
													</span>
												)}
											</td>
											<td style={{ ...TD, textAlign: "right" }}>{toHours(e.durationMinutes)}</td>
											<td style={{ ...TD, textAlign: "right", color: "var(--con-muted)" }}>€{e.hourlyRate.toFixed(2)}</td>
											<td style={{ ...TD, textAlign: "right" }}>
												{e.isBillable
													? `€${calcAmount(e.durationMinutes, e.hourlyRate).toFixed(2)}`
													: <span style={{ color: "var(--con-subtle)", fontSize: "10px" }}>{t("tickets.notBillableLabel")}</span>}
											</td>
											<td style={{ ...TD, textAlign: "right" }}>
												{e.isInvoiced ? (
													<span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--con-subtle)", letterSpacing: "0.04em" }} title={t("tickets.invoicedLock")}>
														🔒
													</span>
												) : (
													<div style={{ display: "flex", gap: "4px", justifyContent: "flex-end" }}>
														<button type="button"
															onClick={() => editingEntryId === e.id ? setEditingEntryId(null) : startEditEntry(e)}
															style={actionBtn(editingEntryId === e.id ? "var(--accent)" : undefined)}>
															{editingEntryId === e.id ? t("common.cancel") : t("tickets.editEntry")}
														</button>
														<button type="button"
															onClick={() => { setDeletingEntryId(deletingEntryId === e.id ? null : e.id); setEditingEntryId(null); }}
															style={actionBtn("var(--danger)")}>
															{t("tickets.deleteEntry")}
														</button>
													</div>
												)}
											</td>
										</tr>

										{/* Inline edit form row */}
										{editingEntryId === e.id && (
											<tr key={`${e.id}-edit`}>
												<td colSpan={6} style={{ padding: 0, borderBottom: "1px solid var(--con-border)" }}>
													<form onSubmit={handleSaveEntry} style={{ padding: "12px 16px", background: "var(--con-bg)" }}>
														<div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: "10px", marginBottom: "10px" }}>
															<div>
																<label style={labelStyle}>{t("tickets.description")}</label>
																<input required value={entryDesc} onChange={(e) => setEntryDesc(e.target.value)} style={fi}
																	onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
																	onBlur={(e) => (e.currentTarget.style.borderColor = "var(--con-border)")} />
															</div>
															<div>
																<label style={labelStyle}>{t("tickets.durationLabel")}</label>
																<input required type="number" min="1" step="1" value={entryDuration} onChange={(e) => setEntryDuration(e.target.value)} style={fi}
																	onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
																	onBlur={(e) => (e.currentTarget.style.borderColor = "var(--con-border)")} />
															</div>
															<div>
																<label style={labelStyle}>{t("tickets.rateLabel")}</label>
																<input required type="number" min="0" step="0.01" value={entryRate} onChange={(e) => setEntryRate(e.target.value)} style={fi}
																	onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
																	onBlur={(e) => (e.currentTarget.style.borderColor = "var(--con-border)")} />
															</div>
															<div>
																<label style={labelStyle}>{t("tickets.billable")}</label>
																<select value={entryBillable ? "yes" : "no"} onChange={(e) => setEntryBillable(e.target.value === "yes")} style={{ ...fi, cursor: "pointer" }}>
																	<option value="yes">{t("tickets.yes")}</option>
																	<option value="no">{t("tickets.no")}</option>
																</select>
															</div>
															<div>
																<label style={labelStyle}>{t("tickets.loggedAtLabel")}</label>
																<input required type="datetime-local" value={entryDate} onChange={(e) => setEntryDate(e.target.value)} style={fi}
																	onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
																	onBlur={(e) => (e.currentTarget.style.borderColor = "var(--con-border)")} />
															</div>
														</div>
														<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
															<button type="submit" disabled={entryPending} style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 600, background: entryPending ? "var(--con-border)" : "var(--accent)", color: "#fff", border: "none", borderRadius: "4px", padding: "6px 12px", cursor: entryPending ? "not-allowed" : "pointer" }}>
																{entryPending ? t("tickets.saving") : t("common.save")}
															</button>
															<button type="button" onClick={() => setEditingEntryId(null)} style={{ fontFamily: "var(--font-mono)", fontSize: "10px", background: "none", border: "1px solid var(--con-border)", borderRadius: "4px", padding: "6px 10px", color: "var(--con-muted)", cursor: "pointer" }}>
																{t("common.cancel")}
															</button>
															{entryError && <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--danger)" }}>{entryError}</span>}
														</div>
													</form>
												</td>
											</tr>
										)}

										{/* Delete confirm row */}
										{deletingEntryId === e.id && (
											<tr key={`${e.id}-delete`}>
												<td colSpan={6} style={{ padding: 0, borderBottom: "1px solid var(--con-border)" }}>
													<div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 16px", background: "rgba(239,68,68,0.05)", borderTop: "1px solid rgba(239,68,68,0.15)" }}>
														<span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--danger)", flex: 1 }}>{t("tickets.confirmDeleteEntry")}</span>
														<button type="button" onClick={() => handleDeleteEntry(e.id)} disabled={deletingEntryPending}
															style={{ fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 600, background: "var(--danger)", color: "#fff", border: "none", borderRadius: "3px", padding: "4px 10px", cursor: deletingEntryPending ? "not-allowed" : "pointer", opacity: deletingEntryPending ? 0.6 : 1 }}>
															{deletingEntryPending ? "…" : t("tickets.deleteEntry")}
														</button>
														<button type="button" onClick={() => setDeletingEntryId(null)} style={actionBtn()}>
															{t("common.cancel")}
														</button>
													</div>
												</td>
											</tr>
										)}
									</React.Fragment>
								))}
							</tbody>
						</table>

						{/* Totals footer */}
						<div style={{ padding: "10px 16px", borderTop: "1px solid var(--con-border)", display: "flex", justifyContent: "flex-end", gap: "32px" }}>
							<div style={{ textAlign: "right" }}>
								<div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--con-subtle)", marginBottom: "2px" }}>{t("tickets.totalLabel")}</div>
								<div style={{ fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: 700, color: "var(--con-text)" }}>{toHours(ticket.totalMinutes)}</div>
							</div>
							<div style={{ textAlign: "right" }}>
								<div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--con-subtle)", marginBottom: "2px" }}>{t("tickets.amountLabel")}</div>
								<div style={{ fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: 700, color: "var(--con-text)" }}>€{totalAmount.toFixed(2)}</div>
							</div>
						</div>
					</>
				) : null}
			</div>
		</div>
	);
}
