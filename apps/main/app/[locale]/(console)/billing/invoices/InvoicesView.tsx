"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/components/LangProvider";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

export type InvoiceRow = {
	id: string;
	number: string;
	status: string;
	periodStart: string;
	periodEnd: string;
	subtotal: number;
	vatAmount: number;
	total: number;
	dueDate: string;
	paidAt: string | null;
	createdAt: string;
	client: { id: string; name: string };
};

export type ClientOption = { id: string; name: string };

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isOverdue(inv: InvoiceRow): boolean {
	return inv.status === "sent" && new Date(inv.dueDate) < new Date();
}

function fmtDate(iso: string): string {
	return new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

function fmtPeriod(start: string, end: string): string {
	const s = new Date(start);
	const e = new Date(end);
	const month = s.toLocaleDateString(undefined, { month: "short", year: "numeric" });
	if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) return month;
	return `${s.toLocaleDateString(undefined, { month: "short" })} \u2013 ${e.toLocaleDateString(undefined, { month: "short", year: "numeric" })}`;
}

// ─── Status badge ─────────────────────────────────────────────────────────────

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
	draft:   { bg: "rgba(148,163,184,0.18)", color: "var(--con-muted)" },
	sent:    { bg: "rgba(37,99,235,0.12)",   color: "#2563EB" },
	paid:    { bg: "rgba(22,163,74,0.12)",   color: "#16a34a" },
	overdue: { bg: "rgba(220,38,38,0.12)",   color: "#dc2626" },
	voided:  { bg: "rgba(100,116,139,0.14)", color: "#64748b" },
};

function StatusBadge({ status, overdue }: { status: string; overdue: boolean }) {
	const { t } = useTranslation();
	const key = overdue ? "overdue" : status;
	const s = STATUS_STYLE[key] ?? STATUS_STYLE.draft;
	const label = {
		draft: t("billing.statusDraft"),
		sent: t("billing.statusSent"),
		paid: t("billing.statusPaid"),
		overdue: t("billing.statusOverdue"),
		voided: t("billing.statusVoided"),
	}[key] ?? key;

	return (
		<span style={{
			display: "inline-block",
			fontFamily: "var(--font-mono)",
			fontSize: "9px",
			letterSpacing: "0.06em",
			textTransform: "uppercase",
			fontWeight: 600,
			padding: "3px 7px",
			borderRadius: "3px",
			background: s.bg,
			color: s.color,
		}}>
			{label}
		</span>
	);
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
	fontFamily: "var(--font-mono)",
	fontSize: "11px",
	background: "var(--con-bg)",
	border: "1px solid var(--con-border)",
	borderRadius: "4px",
	padding: "6px 10px",
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
	marginBottom: "4px",
};

const TH: React.CSSProperties = {
	fontFamily: "var(--font-mono)",
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
	fontFamily: "var(--font-mono)",
	fontSize: "12px",
	color: "var(--con-text)",
	padding: "11px 14px",
	borderBottom: "1px solid var(--con-border)",
	whiteSpace: "nowrap",
};

// ─── Main component ───────────────────────────────────────────────────────────

export default function InvoicesView({
	invoices,
	clients,
	filterStatus,
	filterClientId,
}: {
	invoices: InvoiceRow[];
	clients: ClientOption[];
	filterStatus?: string;
	filterClientId?: string;
}) {
	const { t } = useTranslation();
	const router = useRouter();

	const [status, setStatus] = useState(filterStatus ?? "");
	const [clientId, setClientId] = useState(filterClientId ?? "");
	const [showVoided, setShowVoided] = useState(false);

	function applyFilters(s: string, c: string) {
		const p = new URLSearchParams();
		if (s) p.set("status", s);
		if (c) p.set("clientId", c);
		const qs = p.toString();
		router.push(qs ? `/billing/invoices?${qs}` : "/billing/invoices");
	}

	function handleStatusChange(v: string) {
		setStatus(v);
		applyFilters(v, clientId);
	}

	function handleClientChange(v: string) {
		setClientId(v);
		applyFilters(status, v);
	}

	const visibleInvoices = showVoided ? invoices : invoices.filter((inv) => inv.status !== "voided");
	const voidedCount = invoices.filter((inv) => inv.status === "voided").length;
	const totalAmount = visibleInvoices.reduce((s, inv) => s + inv.total, 0);

	return (
		<div>
			{/* Page header */}
			<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
				<div>
					<Link
						href="/billing"
						style={{
							fontFamily: "var(--font-mono)",
							fontSize: "10px",
							color: "var(--con-subtle)",
							textDecoration: "none",
							letterSpacing: "0.04em",
							display: "inline-block",
							marginBottom: "6px",
						}}
					>
						{t("billing.backToBilling")}
					</Link>
					<h1 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--con-subtle)", margin: 0 }}>
						{t("billing.invoices")}
					</h1>
				</div>

				{visibleInvoices.length > 0 && (
					<div style={{ textAlign: "right" }}>
						<div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--con-subtle)", marginBottom: "2px" }}>
							{t("billing.total")} ({visibleInvoices.length})
						</div>
						<div style={{ fontFamily: "var(--font-mono)", fontSize: "18px", fontWeight: 700, color: "#2563EB" }}>
							{"\u20AC"}{totalAmount.toFixed(2)}
						</div>
					</div>
				)}
			</div>

			{/* Filter bar */}
			<div style={{ display: "flex", gap: "12px", marginBottom: "14px", alignItems: "flex-end", flexWrap: "wrap" }}>
				<div>
					<label style={labelStyle}>{t("billing.filterStatus")}</label>
					<select value={status} onChange={(e) => handleStatusChange(e.target.value)} style={inputStyle}>
						<option value="">{t("billing.allStatuses")}</option>
						<option value="draft">{t("billing.statusDraft")}</option>
						<option value="sent">{t("billing.statusSent")}</option>
						<option value="paid">{t("billing.statusPaid")}</option>
					</select>
				</div>
				<div>
					<label style={labelStyle}>{t("billing.filterClient")}</label>
					<select value={clientId} onChange={(e) => handleClientChange(e.target.value)} style={inputStyle}>
						<option value="">{t("billing.allClients")}</option>
						{clients.map((c) => (
							<option key={c.id} value={c.id}>{c.name}</option>
						))}
					</select>
				</div>
				{voidedCount > 0 && (
					<button
						type="button"
						onClick={() => setShowVoided((v) => !v)}
						style={{
							...inputStyle,
							cursor: "pointer",
							border: showVoided ? "1px solid #64748b" : "1px solid var(--con-border)",
							color: showVoided ? "#64748b" : "var(--con-subtle)",
							padding: "6px 12px",
							background: "none",
							alignSelf: "flex-end",
						}}
					>
						{showVoided ? t("billing.hideVoided", { n: voidedCount }) : t("billing.showVoided", { n: voidedCount })}
					</button>
				)}
			</div>

			{/* Table */}
			<div style={{ background: "var(--con-surface)", border: "1px solid var(--con-border)", borderRadius: "4px", overflow: "hidden" }}>
				{visibleInvoices.length === 0 ? (
					<p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--con-subtle)", padding: "48px", textAlign: "center", margin: 0 }}>
						{t("billing.noInvoices")}
					</p>
				) : (
					<table style={{ width: "100%", borderCollapse: "collapse" }}>
						<thead>
							<tr>
								<th style={TH}>{t("billing.invoiceNumber")}</th>
								<th style={TH}>{t("billing.client")}</th>
								<th style={TH}>{t("billing.period")}</th>
								<th style={TH}>{t("billing.status")}</th>
								<th style={{ ...TH, textAlign: "right" }}>{t("billing.total")}</th>
								<th style={TH}>{t("billing.dueDate")}</th>
								<th style={TH}>{t("billing.paidDate")}</th>
							</tr>
						</thead>
						<tbody>
							{visibleInvoices.map((inv) => {
								const overdue = isOverdue(inv);
								const isVoided = inv.status === "voided";
								return (
									<tr
										key={inv.id}
										style={{ cursor: "pointer", opacity: isVoided ? 0.5 : 1 }}
										onClick={() => router.push(`/billing/invoices/${inv.id}`)}
										onMouseEnter={(e) => (e.currentTarget.style.background = "var(--con-bg)")}
										onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
									>
										<td style={{ ...TD, fontWeight: 700, letterSpacing: "0.03em", textDecoration: isVoided ? "line-through" : "none" }}>
											{inv.number}
										</td>
										<td style={TD}>{inv.client.name}</td>
										<td style={{ ...TD, color: "var(--con-muted)" }}>
											{fmtPeriod(inv.periodStart, inv.periodEnd)}
										</td>
										<td style={TD}>
											<StatusBadge status={inv.status} overdue={overdue} />
										</td>
										<td style={{ ...TD, textAlign: "right", fontWeight: 700, color: isVoided ? "var(--con-muted)" : "#2563EB" }}>
											{"\u20AC"}{inv.total.toFixed(2)}
										</td>
										<td style={{ ...TD, color: overdue ? "#dc2626" : "var(--con-muted)" }}>
											{fmtDate(inv.dueDate)}
										</td>
										<td style={{ ...TD, color: "var(--con-muted)" }}>
											{inv.paidAt ? fmtDate(inv.paidAt) : "\u2014"}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
}
