"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/components/LangProvider";
import Link from "next/link";
import PortalUsersView, { type PortalUser } from "./PortalUsersView";
import AssetsView, { type AssetRow } from "../../assets/AssetsView";
import ContractsView, { type ContractRow } from "../../contracts/ContractsView";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ClientData = {
	id: string;
	name: string;
	slug: string;
	vatNumber: string | null;
	address: string | null;
	city: string | null;
	language: string;
	contractType: string;
	retainerHours: number | null;
	retainerFee: number | null;
	hourlyRate: number;
	isActive: boolean;
};

export type TicketRow = {
	id: string;
	reference: string;
	title: string;
	status: string;
	priority: string;
	source: string;
	createdAt: string;
};

export type TimeEntryRow = {
	id: string;
	description: string;
	durationMinutes: number;
	hourlyRate: number;
	isBillable: boolean;
	loggedAt: string;
	ticket: { id: string; reference: string } | null;
};

type Props = {
	client: ClientData;
	tickets: TicketRow[];
	timeEntries: TimeEntryRow[];
	portalUsers: PortalUser[];
	assets: AssetRow[];
	contracts: ContractRow[];
	initialTab?: string;
};

// ─── Style constants ──────────────────────────────────────────────────────────

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

// ─── Shared helpers ───────────────────────────────────────────────────────────

function toHours(minutes: number): string {
	const h = minutes / 60;
	return `${h % 1 === 0 ? h.toFixed(0) : h.toFixed(2)}h`;
}

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
	open:        { bg: "rgba(37,99,235,0.12)",   color: "var(--accent)" },
	in_progress: { bg: "rgba(234,179,8,0.15)",   color: "#ca8a04" },
	done:        { bg: "rgba(34,197,94,0.12)",   color: "#16a34a" },
	closed:      { bg: "rgba(148,163,184,0.15)", color: "var(--con-muted)" },
};

const STATUS_LABEL_KEYS: Record<string, string> = {
	open: "tickets.statusOpen",
	in_progress: "tickets.statusInProgress",
	done: "tickets.statusDone",
	closed: "tickets.statusClosed",
};

const PRIORITY_STYLES: Record<string, { bg: string; color: string }> = {
	low:    { bg: "rgba(148,163,184,0.15)", color: "var(--con-muted)" },
	normal: { bg: "rgba(148,163,184,0.15)", color: "var(--con-text)" },
	high:   { bg: "rgba(234,179,8,0.15)",   color: "#ca8a04" },
	urgent: { bg: "rgba(239,68,68,0.12)",   color: "#dc2626" },
};

const PRIORITY_LABEL_KEYS: Record<string, string> = {
	low: "tickets.priorityLow",
	normal: "tickets.priorityNormal",
	high: "tickets.priorityHigh",
	urgent: "tickets.priorityUrgent",
};

function Badge({ value, label, map }: { value: string; label: string; map: Record<string, { bg: string; color: string }> }) {
	const s = map[value] ?? { bg: "rgba(148,163,184,0.15)", color: "var(--con-muted)" };
	return (
		<span style={{
			display: "inline-block",
			fontFamily: "var(--font-mono)",
			fontSize: "9px",
			letterSpacing: "0.06em",
			textTransform: "uppercase",
			padding: "2px 6px",
			borderRadius: "3px",
			background: s.bg,
			color: s.color,
			fontWeight: 600,
		}}>
			{label}
		</span>
	);
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ClientDetailView({
	client: initial,
	tickets: initialTickets,
	timeEntries,
	portalUsers,
	assets,
	contracts,
	initialTab = "overview",
}: Props) {
	const { t } = useTranslation();
	const router = useRouter();

	const [client, setClient] = useState(initial);
	const [tickets, setTickets] = useState(initialTickets);
	const [activeTab, setActiveTab] = useState(initialTab);

	// ── Overview edit ─────────────────────────────────────────────────────────
	const [editing, setEditing] = useState(false);
	const [saving, setSaving] = useState(false);
	const [editError, setEditError] = useState<string | null>(null);
	const [eName, setEName] = useState(initial.name);
	const [eContractType, setEContractType] = useState(initial.contractType);
	const [eHourlyRate, setEHourlyRate] = useState(String(initial.hourlyRate));
	const [eLanguage, setELanguage] = useState(initial.language);
	const [eVat, setEVat] = useState(initial.vatNumber ?? "");
	const [eAddress, setEAddress] = useState(initial.address ?? "");
	const [eCity, setECity] = useState(initial.city ?? "");
	const [eRetainerHours, setERetainerHours] = useState(String(initial.retainerHours ?? ""));
	const [eRetainerFee, setERetainerFee] = useState(String(initial.retainerFee ?? ""));

	// Deactivate inline confirm
	const [confirmingDeactivate, setConfirmingDeactivate] = useState(false);

	// ── Time entries local state ───────────────────────────────────────────────
	const [entries, setEntries] = useState(timeEntries);

	// Generate invoice modal
	function defaultPeriodStart(): string {
		const d = new Date();
		d.setDate(1);
		d.setMonth(d.getMonth() - 1);
		return d.toISOString().slice(0, 10);
	}
	function defaultPeriodEnd(): string {
		const d = new Date();
		d.setDate(0); // last day of previous month
		return d.toISOString().slice(0, 10);
	}
	function defaultDueDate(): string {
		const d = new Date();
		d.setDate(d.getDate() + 30);
		return d.toISOString().slice(0, 10);
	}
	const [showInvoiceModal, setShowInvoiceModal] = useState(false);
	const [invPeriodStart, setInvPeriodStart] = useState(defaultPeriodStart);
	const [invPeriodEnd, setInvPeriodEnd] = useState(defaultPeriodEnd);
	const [invDueDate, setInvDueDate] = useState(defaultDueDate);
	const [invGenerating, setInvGenerating] = useState(false);
	const [invError, setInvError] = useState<string | null>(null);

	async function handleGenerateInvoice() {
		setInvGenerating(true);
		setInvError(null);
		const res = await fetch("/api/invoices", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				clientId: client.id,
				periodStart: new Date(invPeriodStart).toISOString(),
				periodEnd: new Date(invPeriodEnd).toISOString(),
				dueDate: new Date(invDueDate).toISOString(),
			}),
		});
		setInvGenerating(false);
		if (!res.ok) {
			const d = await res.json().catch(() => ({}));
			setInvError(d.error ?? t("common.error"));
			return;
		}
		const invoice = await res.json();
		setShowInvoiceModal(false);
		router.push(`/billing/invoices/${invoice.id}`);
	}

	// Time entry edit
	const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
	const [editDesc, setEditDesc] = useState("");
	const [editDuration, setEditDuration] = useState("");
	const [editRate, setEditRate] = useState("");
	const [editSaving, setEditSaving] = useState(false);

	function startEditEntry(e: TimeEntryRow) {
		if (e.ticket) return; // ticket-linked entries edited in ticket detail
		setEditingEntryId(e.id);
		setEditDesc(e.description);
		setEditDuration(String(e.durationMinutes));
		setEditRate(String(e.hourlyRate));
	}

	async function handleSaveEntry() {
		if (!editingEntryId) return;
		setEditSaving(true);
		const res = await fetch(`/api/time-entries/${editingEntryId}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				description: editDesc,
				durationMinutes: Number(editDuration),
				hourlyRate: Number(editRate),
			}),
		});
		setEditSaving(false);
		if (res.ok) {
			const updated = await res.json();
			setEntries((prev) => prev.map((e) => e.id === editingEntryId ? {
				...e,
				description: updated.description,
				durationMinutes: updated.durationMinutes,
				hourlyRate: Number(updated.hourlyRate),
			} : e));
			setEditingEntryId(null);
		}
	}

	// Time entry delete
	const [deletingEntryId, setDeletingEntryId] = useState<string | null>(null);

	async function handleDeleteEntry(entryId: string) {
		const res = await fetch(`/api/time-entries/${entryId}`, { method: "DELETE" });
		if (res.ok) {
			setEntries((prev) => prev.filter((e) => e.id !== entryId));
			setDeletingEntryId(null);
		}
	}

	function startEdit() {
		setEName(client.name);
		setEContractType(client.contractType);
		setEHourlyRate(String(client.hourlyRate));
		setELanguage(client.language);
		setEVat(client.vatNumber ?? "");
		setEAddress(client.address ?? "");
		setECity(client.city ?? "");
		setERetainerHours(String(client.retainerHours ?? ""));
		setERetainerFee(String(client.retainerFee ?? ""));
		setEditError(null);
		setEditing(true);
	}

	async function handleSaveClient(e: React.FormEvent) {
		e.preventDefault();
		setSaving(true);
		setEditError(null);

		const res = await fetch(`/api/clients/${client.id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: eName,
				contractType: eContractType,
				hourlyRate: Number(eHourlyRate),
				language: eLanguage,
				vatNumber: eVat || null,
				address: eAddress || null,
				city: eCity || null,
				retainerHours: eRetainerHours ? Number(eRetainerHours) : null,
				retainerFee: eRetainerFee ? Number(eRetainerFee) : null,
			}),
		});

		setSaving(false);

		if (!res.ok) {
			const data = await res.json().catch(() => ({}));
			setEditError(data.error ?? t("common.error"));
			return;
		}

		const updated = await res.json();
		setClient(updated);
		setEditing(false);
	}

	async function handleDeactivate() {
		const res = await fetch(`/api/clients/${client.id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ isActive: false }),
		});
		if (res.ok) {
			setClient((c) => ({ ...c, isActive: false }));
			setConfirmingDeactivate(false);
		}
	}

	async function handleReactivate() {
		const res = await fetch(`/api/clients/${client.id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ isActive: true }),
		});
		if (res.ok) {
			setClient((c) => ({ ...c, isActive: true }));
		}
	}

	// ── New ticket form ───────────────────────────────────────────────────────
	const [showTicketForm, setShowTicketForm] = useState(false);
	const [tPending, setTPending] = useState(false);
	const [tError, setTError] = useState<string | null>(null);
	const [tTitle, setTTitle] = useState("");
	const [tDesc, setTDesc] = useState("");
	const [tPriority, setTPriority] = useState("normal");
	const [tSource, setTSource] = useState("manual");
	const [tBillable, setTBillable] = useState(true);

	function resetTicketForm() {
		setTTitle(""); setTDesc(""); setTPriority("normal"); setTSource("manual"); setTBillable(true);
		setTError(null);
	}

	async function handleCreateTicket(e: React.FormEvent) {
		e.preventDefault();
		setTPending(true);
		setTError(null);

		const res = await fetch("/api/tickets", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				clientId: client.id,
				title: tTitle,
				description: tDesc || undefined,
				priority: tPriority,
				source: tSource,
				isBillable: tBillable,
			}),
		});

		setTPending(false);

		if (!res.ok) {
			const data = await res.json().catch(() => ({}));
			setTError(data.error ?? t("common.error"));
			return;
		}

		const newTicket = await res.json();
		setTickets((prev) => [newTicket, ...prev]);
		resetTicketForm();
		setShowTicketForm(false);
	}

	// ── Derived values ────────────────────────────────────────────────────────
	const openCount = tickets.filter((tk) => tk.status === "open" || tk.status === "in_progress").length;
	const unbilledEntries = entries.filter((e) => e.isBillable); // ALL billable entries including ticket-linked
	const totalUnbilledMinutes = entries.filter((e) => e.isBillable).reduce((s, e) => s + e.durationMinutes, 0);
	const totalUnbilledAmount = entries.filter((e) => e.isBillable).reduce(
		(s, e) => s + (e.durationMinutes / 60) * e.hourlyRate, 0
	);
	const activePortalUsers = portalUsers.filter((u) => u.isActive).length;

	const langLabel: Record<string, string> = {
		fr: t("clients.langFr"), nl: t("clients.langNl"), en: t("clients.langEn"),
	};

	// ── Tab bar ───────────────────────────────────────────────────────────────
	const TABS = [
		{ key: "overview", label: t("clients.tabOverview") },
		{ key: "tickets", label: `${t("clients.tabTickets")}${openCount > 0 ? ` · ${openCount}` : ""}` },
		{
			key: "time",
			label: totalUnbilledMinutes > 0
				? `${t("clients.tabTimeEntries")} · ${toHours(totalUnbilledMinutes)}`
				: t("clients.tabTimeEntries"),
		},
		{ key: "portal", label: `${t("clients.tabPortal")}${activePortalUsers > 0 ? ` · ${activePortalUsers}` : ""}` },
		{ key: "assets", label: `${t("assets.tabAssets")}${assets.length > 0 ? ` · ${assets.length}` : ""}` },
		{ key: "contracts", label: `${t("contracts.tabContracts")}${contracts.length > 0 ? ` · ${contracts.length}` : ""}` },
	];

	function tabStyle(key: string): React.CSSProperties {
		const active = activeTab === key;
		return {
			fontFamily: "var(--font-mono)",
			fontSize: "10px",
			fontWeight: active ? 700 : 500,
			letterSpacing: "0.05em",
			color: active ? "var(--con-text)" : "var(--con-subtle)",
			background: "none",
			border: "none",
			borderBottom: active ? "2px solid var(--accent)" : "2px solid transparent",
			padding: "8px 14px",
			cursor: "pointer",
			transition: "color 0.1s",
			whiteSpace: "nowrap" as const,
		};
	}

	// ── Invoice modal preview values (period-filtered, entry-rate accurate) ───
	const periodStartTs = invPeriodStart ? new Date(invPeriodStart).getTime() : 0;
	const periodEndTs = invPeriodEnd ? new Date(invPeriodEnd).getTime() + 86400000 : Infinity; // inclusive end
	const previewEntries = unbilledEntries.filter((e) => {
		const t = new Date(e.loggedAt).getTime();
		return t >= periodStartTs && t < periodEndTs;
	});
	const previewEntryCount = previewEntries.length;
	const previewHours = previewEntries.reduce((s, e) => s + e.durationMinutes, 0) / 60;
	const retainerFee = client.retainerFee ?? 0;
	const retainerHours = client.retainerHours ?? 0;
	// For retainer: flat fee + extra hours at client rate (mirrors API logic)
	// For ad hoc: sum each entry's own hourlyRate snapshot
	const extraHoursPreview = Math.max(previewHours - retainerHours, 0);
	const previewSubtotal = client.contractType === "retainer"
		? retainerFee + extraHoursPreview * client.hourlyRate
		: previewEntries.reduce((s, e) => s + (e.durationMinutes / 60) * e.hourlyRate, 0);
	const previewTotal = previewSubtotal * 1.21;
	// Fall back to all unbilled if no period matches (so user sees something useful)
	const allBillableCount = unbilledEntries.length;
	const allBillableHours = unbilledEntries.reduce((s, e) => s + e.durationMinutes, 0) / 60;

	const modalInputStyle: React.CSSProperties = {
		background: "var(--con-bg)",
		border: "1px solid var(--con-border)",
		borderRadius: "4px",
		padding: "7px 10px",
		fontFamily: "var(--font-mono)",
		fontSize: "12px",
		color: "var(--con-text)",
		outline: "none",
		width: "100%",
		boxSizing: "border-box" as const,
	};

	// ─────────────────────────────────────────────────────────────────────────
	return (
		<div>
			{/* Generate invoice modal */}
			{showInvoiceModal && (
				<div
					style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}
					onClick={(e) => { if (e.target === e.currentTarget) setShowInvoiceModal(false); }}
				>
					<div style={{ background: "var(--con-surface)", border: "1px solid var(--con-border)", borderRadius: "8px", width: "100%", maxWidth: "460px", overflow: "hidden" }}>
						{/* Modal header */}
						<div style={{ background: "#0F172A", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
							<span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#fff" }}>
								{t("clients.generateInvoice")}
							</span>
							<button
								type="button"
								onClick={() => setShowInvoiceModal(false)}
								style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: "18px", lineHeight: 1 }}
							>
								×
							</button>
						</div>

						{/* Modal body */}
						<div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
							<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
								<label>
									<span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--con-subtle)", display: "block", marginBottom: "5px" }}>
										{t("clients.periodStartLabel")}
									</span>
									<input type="date" value={invPeriodStart} onChange={(e) => setInvPeriodStart(e.target.value)} style={modalInputStyle} />
								</label>
								<label>
									<span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--con-subtle)", display: "block", marginBottom: "5px" }}>
										{t("clients.periodEndLabel")}
									</span>
									<input type="date" value={invPeriodEnd} onChange={(e) => setInvPeriodEnd(e.target.value)} style={modalInputStyle} />
								</label>
							</div>
							<label>
								<span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--con-subtle)", display: "block", marginBottom: "5px" }}>
									{t("clients.dueDateLabel")}
								</span>
								<input type="date" value={invDueDate} onChange={(e) => setInvDueDate(e.target.value)} style={modalInputStyle} />
							</label>

							{/* Preview */}
							<div style={{ background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.15)", borderRadius: "4px", padding: "12px 14px" }}>
								<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
									<span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--con-subtle)" }}>
										{t("clients.invoicePreview")}
									</span>
									{previewEntryCount > 0 ? (
										<span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--con-subtle)" }}>
											{previewEntryCount} {t("clients.entriesLabel")} · {previewHours.toFixed(2)}h
										</span>
									) : (
										<span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--con-subtle)" }}>
											{allBillableCount} {t("clients.entriesLabel")} · {allBillableHours.toFixed(2)}h {t("clients.allPeriods")}
										</span>
									)}
								</div>
								{previewEntryCount === 0 && allBillableCount > 0 && (
									<div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--warn)", marginBottom: "8px" }}>
										{t("clients.noEntriesInPeriod")}
									</div>
								)}
								<div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--con-muted)", marginBottom: "4px" }}>
									<span>{t("clients.subtotalLabel")}</span>
									<span>{"\u20AC"}{previewSubtotal.toFixed(2)}</span>
								</div>
								<div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--con-muted)", marginBottom: "6px" }}>
									<span>VAT 21%</span>
									<span>{"\u20AC"}{(previewSubtotal * 0.21).toFixed(2)}</span>
								</div>
								<div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: "14px", fontWeight: 700, color: "#2563EB" }}>
									<span>{t("clients.totalInclVat")}</span>
									<span>{"\u20AC"}{previewTotal.toFixed(2)}</span>
								</div>
							</div>

							{invError && (
								<p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--danger)", margin: 0 }}>{invError}</p>
							)}

							<div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "4px" }}>
								<button
									type="button"
									onClick={() => setShowInvoiceModal(false)}
									style={{ fontFamily: "var(--font-mono)", fontSize: "10px", background: "none", border: "1px solid var(--con-border)", borderRadius: "4px", padding: "7px 14px", color: "var(--con-muted)", cursor: "pointer" }}
								>
									{t("common.cancel")}
								</button>
								<button
									type="button"
									onClick={handleGenerateInvoice}
									disabled={invGenerating || entries.filter((e) => e.isBillable).length === 0}
									style={{
										fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 600,
										background: invGenerating || entries.filter((e) => e.isBillable).length === 0 ? "var(--con-border)" : "#2563EB",
										color: "#fff", border: "none", borderRadius: "4px",
										padding: "7px 14px", cursor: invGenerating || entries.filter((e) => e.isBillable).length === 0 ? "not-allowed" : "pointer",
									}}
								>
									{invGenerating ? t("clients.generating") : t("clients.generateInvoice")}
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Back link */}
			<Link
				href="/clients"
				style={{
					fontFamily: "var(--font-mono)",
					fontSize: "10px",
					color: "var(--con-subtle)",
					textDecoration: "none",
					letterSpacing: "0.04em",
					display: "inline-block",
					marginBottom: "16px",
				}}
			>
				{t("clients.backToClients")}
			</Link>

			{/* Deactivated banner */}
			{!client.isActive && (
				<div style={{
					background: "rgba(217,119,6,0.1)",
					border: "1px solid rgba(217,119,6,0.3)",
					borderRadius: "4px",
					padding: "10px 16px",
					marginBottom: "12px",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					gap: "12px",
				}}>
					<span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#D97706", fontWeight: 600 }}>
						{t("clients.deactivatedBanner")}
					</span>
					<button type="button" onClick={handleReactivate} style={{
						fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.04em",
						background: "#16A34A", color: "#fff", border: "none", borderRadius: "4px",
						padding: "5px 12px", cursor: "pointer", flexShrink: 0,
					}}>
						{t("clients.reactivateClient")}
					</button>
				</div>
			)}

			{/* Client header strip */}
			<div
				style={{
					background: "var(--con-surface)",
					border: "1px solid var(--con-border)",
					borderRadius: "4px 4px 0 0",
					borderBottom: "none",
					padding: "14px 20px",
					display: "flex",
					alignItems: "center",
					gap: "20px",
					flexWrap: "wrap",
				}}
			>
				<div style={{ flex: 1, minWidth: 0 }}>
					<h1 style={{ fontFamily: "var(--font-mono)", fontSize: "16px", fontWeight: 700, color: "var(--con-text)", margin: 0 }}>
						{client.name}
					</h1>
					<span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--con-subtle)" }}>
						/portal/{client.slug}
					</span>
				</div>
				<div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
					{[
						{ label: t("clients.contractType"), value: client.contractType === "retainer" ? t("clients.retainer") : t("clients.adhoc"), accent: client.contractType === "retainer" },
						{ label: t("clients.hourlyRate"), value: `€${client.hourlyRate.toFixed(2)}/h` },
						{ label: t("clients.language"), value: langLabel[client.language] ?? client.language },
						...(client.city ? [{ label: t("clients.city"), value: client.city }] : []),
					].map((item) => (
						<div key={item.label} style={{ textAlign: "center" }}>
							<div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--con-subtle)", marginBottom: "2px" }}>
								{item.label}
							</div>
							<div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: 600, color: item.accent ? "var(--accent)" : "var(--con-text)" }}>
								{item.value}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Tab bar */}
			<div
				style={{
					background: "var(--con-surface)",
					borderLeft: "1px solid var(--con-border)",
					borderRight: "1px solid var(--con-border)",
					borderBottom: "1px solid var(--con-border)",
					display: "flex",
					gap: "0",
					overflowX: "auto",
				}}
			>
				{TABS.map((tab) => (
					<button key={tab.key} type="button" onClick={() => setActiveTab(tab.key)} style={tabStyle(tab.key)}>
						{tab.label}
					</button>
				))}
			</div>

			{/* Tab content */}
			<div style={{ marginTop: "20px" }}>

				{/* ── Overview ──────────────────────────────────────────────────────── */}
				{activeTab === "overview" && (
					<div style={{ background: "var(--con-surface)", border: "1px solid var(--con-border)", borderRadius: "4px", padding: "20px" }}>
						<div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginBottom: "16px" }}>
							{!editing && (
								<>
									<button type="button" onClick={startEdit} style={{
										fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.04em",
										background: "var(--accent)", color: "#fff", border: "none", borderRadius: "4px",
										padding: "6px 12px", cursor: "pointer",
									}}>
										{t("clients.editClient")}
									</button>
								{client.isActive && (confirmingDeactivate ? (
									<>
										<span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--danger)" }}>
											{t("clients.confirmDeactivate")}
										</span>
										<button type="button" onClick={handleDeactivate} style={{
											fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 600,
											background: "var(--danger)", color: "#fff", border: "none",
											borderRadius: "4px", padding: "6px 12px", cursor: "pointer",
										}}>
											{t("clients.deactivateClient")}
										</button>
										<button type="button" onClick={() => setConfirmingDeactivate(false)} style={{
											fontFamily: "var(--font-mono)", fontSize: "10px",
											background: "none", border: "1px solid var(--con-border)",
											borderRadius: "4px", padding: "6px 10px",
											color: "var(--con-muted)", cursor: "pointer",
										}}>
											{t("common.cancel")}
										</button>
									</>
								) : (
									<button type="button" onClick={() => setConfirmingDeactivate(true)} style={{
										fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.04em",
										background: "none", color: "var(--danger)", border: "1px solid var(--con-border)",
										borderRadius: "4px", padding: "6px 12px", cursor: "pointer",
									}}>
										{t("clients.deactivateClient")}
									</button>
								))}
								</>
							)}
						</div>

						{editing ? (
							<form onSubmit={handleSaveClient}>
								<div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "14px", marginBottom: "14px" }}>
									<div>
										<label style={labelStyle}>{t("clients.name")}</label>
										<input required value={eName} onChange={(e) => setEName(e.target.value)} style={inputStyle}
											onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
											onBlur={(e) => (e.currentTarget.style.borderColor = "var(--con-border)")} />
									</div>
									<div>
										<label style={labelStyle}>{t("clients.contractType")}</label>
										<select value={eContractType} onChange={(e) => setEContractType(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
											<option value="adhoc">{t("clients.adhoc")}</option>
											<option value="retainer">{t("clients.retainer")}</option>
										</select>
									</div>
									<div>
										<label style={labelStyle}>{t("clients.hourlyRate")} (€/h)</label>
										<input type="number" min="0" step="0.01" value={eHourlyRate} onChange={(e) => setEHourlyRate(e.target.value)} style={inputStyle}
											onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
											onBlur={(e) => (e.currentTarget.style.borderColor = "var(--con-border)")} />
									</div>
									<div>
										<label style={labelStyle}>{t("clients.language")}</label>
										<select value={eLanguage} onChange={(e) => setELanguage(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
											<option value="fr">{t("clients.langFr")}</option>
											<option value="nl">{t("clients.langNl")}</option>
											<option value="en">{t("clients.langEn")}</option>
										</select>
									</div>
								</div>
								<div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "14px", marginBottom: "14px" }}>
									<div>
										<label style={labelStyle}>{t("clients.address")}</label>
										<input value={eAddress} onChange={(e) => setEAddress(e.target.value)} style={inputStyle}
											onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
											onBlur={(e) => (e.currentTarget.style.borderColor = "var(--con-border)")} />
									</div>
									<div>
										<label style={labelStyle}>{t("clients.city")}</label>
										<input value={eCity} onChange={(e) => setECity(e.target.value)} style={inputStyle}
											onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
											onBlur={(e) => (e.currentTarget.style.borderColor = "var(--con-border)")} />
									</div>
									<div>
										<label style={labelStyle}>{t("clients.vatNumber")}</label>
										<input value={eVat} onChange={(e) => setEVat(e.target.value)} style={inputStyle} placeholder="BE0123456789"
											onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
											onBlur={(e) => (e.currentTarget.style.borderColor = "var(--con-border)")} />
									</div>
									<div /></div>
								<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "14px", marginBottom: "16px" }}>
									<div />
									{eContractType === "retainer" && (
										<>
											<div>
												<label style={labelStyle}>{t("clients.retainerHoursLabel")}</label>
												<input type="number" min="0" value={eRetainerHours} onChange={(e) => setERetainerHours(e.target.value)} style={inputStyle}
													onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
													onBlur={(e) => (e.currentTarget.style.borderColor = "var(--con-border)")} />
											</div>
											<div>
												<label style={labelStyle}>{t("clients.retainerFeeLabel")}</label>
												<input type="number" min="0" step="0.01" value={eRetainerFee} onChange={(e) => setERetainerFee(e.target.value)} style={inputStyle}
													onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
													onBlur={(e) => (e.currentTarget.style.borderColor = "var(--con-border)")} />
											</div>
										</>
									)}
								</div>
								<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
									<button type="submit" disabled={saving} style={{
										fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.04em",
										background: saving ? "var(--con-border)" : "var(--accent)", color: "#fff",
										border: "none", borderRadius: "4px", padding: "7px 14px",
										cursor: saving ? "not-allowed" : "pointer",
									}}>
										{saving ? t("clients.saving") : t("common.save")}
									</button>
									<button type="button" onClick={() => setEditing(false)} style={{
										fontFamily: "var(--font-mono)", fontSize: "10px", background: "none",
										border: "1px solid var(--con-border)", borderRadius: "4px", padding: "7px 12px",
										color: "var(--con-muted)", cursor: "pointer",
									}}>
										{t("common.cancel")}
									</button>
									{editError && <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--danger)" }}>{editError}</span>}
								</div>
							</form>
						) : (
							<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "20px" }}>
								{[
									{ label: t("clients.name"), value: client.name },
									{ label: t("clients.contractType"), value: client.contractType === "retainer" ? t("clients.retainer") : t("clients.adhoc") },
									{ label: t("clients.hourlyRate"), value: `€${client.hourlyRate.toFixed(2)}/h` },
									{ label: t("clients.language"), value: langLabel[client.language] ?? client.language },
									...(client.vatNumber ? [{ label: t("clients.vatNumber"), value: client.vatNumber }] : []),
									...(client.address ? [{ label: t("clients.address"), value: client.address }] : []),
									...(client.city ? [{ label: t("clients.city"), value: client.city }] : []),
									...(client.contractType === "retainer" && client.retainerHours ? [{ label: t("clients.retainerHoursLabel"), value: `${client.retainerHours}h` }] : []),
									...(client.contractType === "retainer" && client.retainerFee ? [{ label: t("clients.retainerFeeLabel"), value: `€${client.retainerFee.toFixed(2)}` }] : []),
								].map((item) => (
									<div key={item.label}>
										<div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--con-subtle)", marginBottom: "4px" }}>
											{item.label}
										</div>
										<div style={{ fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: 600, color: "var(--con-text)" }}>
											{item.value}
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				)}

				{/* ── Tickets ───────────────────────────────────────────────────────── */}
				{activeTab === "tickets" && (
					<div>
						{!client.isActive && (
							<div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#D97706", background: "rgba(217,119,6,0.08)", border: "1px solid rgba(217,119,6,0.2)", borderRadius: "4px", padding: "10px 14px", marginBottom: "12px" }}>
								{t("clients.deactivatedTicketsNotice")}
							</div>
						)}
						<div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "12px" }}>
							{client.isActive && <button
								type="button"
								onClick={() => { setShowTicketForm((v) => !v); if (showTicketForm) resetTicketForm(); }}
								style={{
									fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.04em",
									background: showTicketForm ? "transparent" : "var(--accent)",
									color: showTicketForm ? "var(--con-muted)" : "#fff",
									border: showTicketForm ? "1px solid var(--con-border)" : "none",
									borderRadius: "4px", padding: "6px 12px", cursor: "pointer",
								}}
							>
								{showTicketForm ? t("common.cancel") : `+ ${t("tickets.newTicket")}`}
							</button>}
						</div>

						{client.isActive && showTicketForm && (
							<form onSubmit={handleCreateTicket} style={{
								background: "var(--con-surface)", border: "1px solid var(--con-border)",
								borderRadius: "4px", padding: "14px 16px", marginBottom: "12px",
							}}>
								<div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "12px", marginBottom: "10px" }}>
									<div>
										<label style={labelStyle}>{t("tickets.titleLabel")}</label>
										<input required value={tTitle} onChange={(e) => setTTitle(e.target.value)} style={{ ...inputStyle }}
											onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
											onBlur={(e) => (e.currentTarget.style.borderColor = "var(--con-border)")} />
									</div>
									<div>
										<label style={labelStyle}>{t("tickets.priority")}</label>
										<select value={tPriority} onChange={(e) => setTPriority(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
											<option value="low">{t("tickets.priorityLow")}</option>
											<option value="normal">{t("tickets.priorityNormal")}</option>
											<option value="high">{t("tickets.priorityHigh")}</option>
											<option value="urgent">{t("tickets.priorityUrgent")}</option>
										</select>
									</div>
									<div>
										<label style={labelStyle}>{t("tickets.source")}</label>
										<select value={tSource} onChange={(e) => setTSource(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
											<option value="manual">{t("tickets.sourceManual")}</option>
											<option value="phone">{t("tickets.sourcePhone")}</option>
											<option value="whatsapp">{t("tickets.sourceWhatsapp")}</option>
											<option value="email">{t("tickets.sourceEmail")}</option>
											<option value="portal">{t("tickets.sourcePortal")}</option>
										</select>
									</div>
									<div>
										<label style={labelStyle}>{t("tickets.billable")}</label>
										<select value={tBillable ? "yes" : "no"} onChange={(e) => setTBillable(e.target.value === "yes")} style={{ ...inputStyle, cursor: "pointer" }}>
											<option value="yes">{t("tickets.yes")}</option>
											<option value="no">{t("tickets.no")}</option>
										</select>
									</div>
								</div>
								<div style={{ marginBottom: "10px" }}>
									<label style={labelStyle}>{t("tickets.description")} <span style={{ color: "var(--con-subtle)", fontWeight: 400 }}>({t("tickets.optional")})</span></label>
									<textarea value={tDesc} onChange={(e) => setTDesc(e.target.value)} rows={2}
										style={{ ...inputStyle, resize: "vertical" }}
										onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
										onBlur={(e) => (e.currentTarget.style.borderColor = "var(--con-border)")} />
								</div>
								<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
									<button type="submit" disabled={tPending} style={{
										fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.04em",
										background: tPending ? "var(--con-border)" : "var(--accent)", color: "#fff",
										border: "none", borderRadius: "4px", padding: "7px 14px",
										cursor: tPending ? "not-allowed" : "pointer",
									}}>
										{tPending ? t("tickets.creating") : t("tickets.create")}
									</button>
									{tError && <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--danger)" }}>{tError}</span>}
								</div>
							</form>
						)}

						<div style={{ background: "var(--con-surface)", border: "1px solid var(--con-border)", borderRadius: "4px", overflow: "hidden" }}>
							{tickets.length === 0 ? (
								<p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--con-subtle)", padding: "48px", textAlign: "center" }}>
									{t("clients.noTickets")}
								</p>
							) : (
								<table style={{ width: "100%", borderCollapse: "collapse" }}>
									<thead>
										<tr>
											<th style={TH}>{t("tickets.reference")}</th>
											<th style={TH}>{t("tickets.titleLabel")}</th>
											<th style={TH}>{t("tickets.status")}</th>
											<th style={TH}>{t("tickets.priority")}</th>
											<th style={{ ...TH, textAlign: "right" }}>{t("tickets.createdAt")}</th>
											<th style={{ ...TH, textAlign: "right" }}>{t("common.actions")}</th>
										</tr>
									</thead>
									<tbody>
										{tickets.map((tk) => (
											<tr key={tk.id}
												onMouseEnter={(e) => (e.currentTarget.style.background = "var(--con-bg)")}
												onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
											>
												<td style={TD}><span style={{ color: "var(--accent)", fontWeight: 700 }}>{tk.reference}</span></td>
												<td style={{ ...TD, maxWidth: "260px", overflow: "hidden", textOverflow: "ellipsis" }}>{tk.title}</td>
												<td style={TD}><Badge value={tk.status} label={t(STATUS_LABEL_KEYS[tk.status] ?? "tickets.statusOpen")} map={STATUS_STYLES} /></td>
												<td style={TD}><Badge value={tk.priority} label={t(PRIORITY_LABEL_KEYS[tk.priority] ?? "tickets.priorityNormal")} map={PRIORITY_STYLES} /></td>
												<td style={{ ...TD, textAlign: "right", color: "var(--con-subtle)" }}>
													{new Date(tk.createdAt).toLocaleDateString(undefined, { day: "numeric", month: "short" })}
												</td>
												<td style={{ ...TD, textAlign: "right" }}>
													<Link href={`/tickets/${tk.id}`} style={{
														fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.06em",
														textTransform: "uppercase", color: "var(--con-muted)",
														border: "1px solid var(--con-border)", borderRadius: "3px",
														padding: "3px 8px", textDecoration: "none",
													}}>
														{t("view")}
													</Link>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							)}
						</div>
					</div>
				)}

				{/* ── Time entries ──────────────────────────────────────────────────── */}
				{activeTab === "time" && (
					<div>
						{/* Summary strip */}
						<div style={{
							background: "var(--con-surface)", border: "1px solid var(--con-border)",
							borderRadius: "4px", padding: "14px 20px", marginBottom: "12px",
							display: "flex", alignItems: "center", gap: "32px",
						}}>
							<div style={{ flex: 1, fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--con-subtle)" }}>
								{t("clients.unbilledSection")}
							</div>
							<div style={{ textAlign: "center" }}>
								<div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--con-subtle)", marginBottom: "2px" }}>
									{t("clients.totalUnbilledHours")}
								</div>
								<div style={{ fontFamily: "var(--font-mono)", fontSize: "18px", fontWeight: 700, color: totalUnbilledMinutes > 0 ? "var(--con-text)" : "var(--con-subtle)" }}>
									{toHours(totalUnbilledMinutes)}
								</div>
							</div>
							<div style={{ textAlign: "center" }}>
								<div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--con-subtle)", marginBottom: "2px" }}>
									{t("clients.totalUnbilledAmount")}
								</div>
								<div style={{ fontFamily: "var(--font-mono)", fontSize: "18px", fontWeight: 700, color: totalUnbilledAmount > 0 ? "var(--accent)" : "var(--con-subtle)" }}>
									€{totalUnbilledAmount.toFixed(2)}
								</div>
							</div>
							<button
								type="button"
								onClick={() => {
									setInvPeriodStart(defaultPeriodStart());
									setInvPeriodEnd(defaultPeriodEnd());
									setInvDueDate(defaultDueDate());
									setInvError(null);
									setShowInvoiceModal(true);
								}}
								disabled={entries.filter((e) => e.isBillable).length === 0}
								style={{
									fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.04em",
									background: entries.filter((e) => e.isBillable).length === 0 ? "var(--con-border)" : "#2563EB",
									color: entries.filter((e) => e.isBillable).length === 0 ? "var(--con-muted)" : "#fff",
									border: "none", borderRadius: "4px", padding: "7px 14px",
									cursor: entries.filter((e) => e.isBillable).length === 0 ? "not-allowed" : "pointer",
								}}
							>
								{t("clients.generateInvoice")}
							</button>
						</div>

						<div style={{ background: "var(--con-surface)", border: "1px solid var(--con-border)", borderRadius: "4px", overflow: "hidden" }}>
							{entries.length === 0 ? (
								<p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--con-subtle)", padding: "48px", textAlign: "center" }}>
									{t("clients.noUnbilledEntries")}
								</p>
							) : (
								<table style={{ width: "100%", borderCollapse: "collapse" }}>
									<thead>
										<tr>
											<th style={TH}>{t("tickets.loggedAtLabel")}</th>
											<th style={TH}>{t("clients.ticketRef")}</th>
											<th style={TH}>{t("tickets.description")}</th>
											<th style={{ ...TH, textAlign: "right" }}>{t("tickets.durationLabel").replace(" (min)", "")}</th>
											<th style={{ ...TH, textAlign: "right" }}>{t("tickets.rateLabel").replace(" (€/h)", "")}</th>
											<th style={{ ...TH, textAlign: "right" }}>{t("tickets.amountLabel")}</th>
											<th style={{ ...TH, textAlign: "right" }}>{t("common.actions")}</th>
										</tr>
									</thead>
									<tbody>
										{entries.map((e) => {
											const isEditing = editingEntryId === e.id;
											const isDeleting = deletingEntryId === e.id;
											const canEdit = !e.ticket; // ticket-linked entries are read-only here
											return (
												<tr key={e.id}>
													{isEditing ? (
														<>
															<td colSpan={4} style={{ ...TD, padding: "8px 12px" }}>
																<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
																	<input
																		value={editDesc}
																		onChange={(e) => setEditDesc(e.target.value)}
																		placeholder={t("tickets.description")}
																		style={{ ...inputStyle, width: "260px", padding: "5px 8px", fontSize: "11px" }}
																	/>
																	<input
																		type="number"
																		value={editDuration}
																		onChange={(e) => setEditDuration(e.target.value)}
																		placeholder="min"
																		style={{ ...inputStyle, width: "70px", padding: "5px 8px", fontSize: "11px" }}
																	/>
																	<input
																		type="number"
																		value={editRate}
																		onChange={(e) => setEditRate(e.target.value)}
																		placeholder="€/h"
																		style={{ ...inputStyle, width: "70px", padding: "5px 8px", fontSize: "11px" }}
																	/>
																</div>
															</td>
															<td style={{ ...TD, textAlign: "right", color: "var(--con-muted)" }}>
																{editDuration && editRate
																	? `\u20AC${((Number(editDuration) / 60) * Number(editRate)).toFixed(2)}`
																	: "—"}
															</td>
															<td style={{ ...TD, textAlign: "right" }}>
																<div style={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}>
																	<button
																		type="button"
																		onClick={handleSaveEntry}
																		disabled={editSaving}
																		style={{ fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 600, background: "#2563EB", color: "#fff", border: "none", borderRadius: "3px", padding: "4px 8px", cursor: editSaving ? "not-allowed" : "pointer" }}
																	>
																		{editSaving ? "…" : t("common.save")}
																	</button>
																	<button
																		type="button"
																		onClick={() => setEditingEntryId(null)}
																		style={{ fontFamily: "var(--font-mono)", fontSize: "9px", background: "none", border: "1px solid var(--con-border)", borderRadius: "3px", padding: "4px 6px", color: "var(--con-muted)", cursor: "pointer" }}
																	>
																		{t("common.cancel")}
																	</button>
																</div>
															</td>
														</>
													) : isDeleting ? (
														<>
															<td colSpan={5} style={{ ...TD, color: "var(--danger)" }}>
																{t("clients.confirmDeleteEntry")}
															</td>
															<td style={{ ...TD, textAlign: "right" }}>
																<div style={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}>
																	<button
																		type="button"
																		onClick={() => handleDeleteEntry(e.id)}
																		style={{ fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 600, background: "var(--danger)", color: "#fff", border: "none", borderRadius: "3px", padding: "4px 8px", cursor: "pointer" }}
																	>
																		{t("common.delete")}
																	</button>
																	<button
																		type="button"
																		onClick={() => setDeletingEntryId(null)}
																		style={{ fontFamily: "var(--font-mono)", fontSize: "9px", background: "none", border: "1px solid var(--con-border)", borderRadius: "3px", padding: "4px 6px", color: "var(--con-muted)", cursor: "pointer" }}
																	>
																		{t("common.cancel")}
																	</button>
																</div>
															</td>
														</>
													) : (
														<>
															<td style={{ ...TD, color: "var(--con-subtle)" }}>
																{new Date(e.loggedAt).toLocaleDateString(undefined, { day: "numeric", month: "short" })}
															</td>
															<td style={TD}>
																{e.ticket ? (
																	<Link href={`/tickets/${e.ticket.id}`} style={{ color: "var(--accent)", fontWeight: 700, textDecoration: "none", fontFamily: "var(--font-mono)", fontSize: "12px" }}>
																		{e.ticket.reference}
																	</Link>
																) : (
																	<span style={{ color: "var(--con-subtle)" }}>—</span>
																)}
															</td>
															<td style={{ ...TD, maxWidth: "240px", overflow: "hidden", textOverflow: "ellipsis" }}>{e.description}</td>
															<td style={{ ...TD, textAlign: "right" }}>{toHours(e.durationMinutes)}</td>
															<td style={{ ...TD, textAlign: "right", color: "var(--con-muted)" }}>{"\u20AC"}{e.hourlyRate.toFixed(2)}</td>
															<td style={{ ...TD, textAlign: "right" }}>
																{e.isBillable
																	? `\u20AC${((e.durationMinutes / 60) * e.hourlyRate).toFixed(2)}`
																	: <span style={{ color: "var(--con-subtle)", fontSize: "10px" }}>{t("tickets.notBillableLabel")}</span>}
															</td>
															<td style={{ ...TD, textAlign: "right" }}>
																{canEdit ? (
																	<div style={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}>
																		<button
																			type="button"
																			onClick={() => startEditEntry(e)}
																			style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--con-muted)", background: "none", border: "1px solid var(--con-border)", borderRadius: "3px", padding: "3px 7px", cursor: "pointer" }}
																		>
																			{t("common.edit")}
																		</button>
																		<button
																			type="button"
																			onClick={() => setDeletingEntryId(e.id)}
																			style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--danger)", background: "none", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "3px", padding: "3px 7px", cursor: "pointer" }}
																		>
																			{t("common.delete")}
																		</button>
																	</div>
																) : (
																	<span style={{ color: "var(--con-subtle)", fontSize: "10px" }}>—</span>
																)}
															</td>
														</>
													)}
												</tr>
											);
										})}
									</tbody>
								</table>
							)}
						</div>
					</div>
				)}

				{/* ── Portal access ─────────────────────────────────────────────────── */}
				{activeTab === "portal" && (
					<PortalUsersView
						clientId={client.id}
						clientSlug={client.slug}
						initialUsers={portalUsers}
						clientIsActive={client.isActive}
					/>
				)}

				{/* ── Assets ───────────────────────────────────────────────────────── */}
				{activeTab === "assets" && (
					<AssetsView
						assets={assets}
						clients={[{ id: client.id, name: client.name }]}
						embeddedClientId={client.id}
					/>
				)}

				{/* ── Contracts ────────────────────────────────────────────────────── */}
				{activeTab === "contracts" && (
					<ContractsView
						contracts={contracts}
						clients={[{ id: client.id, name: client.name }]}
						embeddedClientId={client.id}
					/>
				)}

			</div>
		</div>
	);
}
