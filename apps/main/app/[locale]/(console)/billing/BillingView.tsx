"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/components/LangProvider";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

export type BillingEntry = {
	id: string;
	description: string;
	durationMinutes: number;
	hourlyRate: number;
	loggedAt: string;
	ticket: { id: string; reference: string } | null;
};

export type ClientBilling = {
	clientId: string;
	clientName: string;
	contractType: string;
	hourlyRate: number;
	retainerHours: number | null;
	retainerFee: number | null;
	totalMinutes: number;
	totalAmount: number;
	entries: BillingEntry[];
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toHours(minutes: number): string {
	const h = minutes / 60;
	return `${h % 1 === 0 ? h.toFixed(0) : h.toFixed(2)}h`;
}

function fmtAmount(n: number): string {
	return `€${n.toFixed(2)}`;
}

// ─── Style tokens ─────────────────────────────────────────────────────────────

const MONO: React.CSSProperties = { fontFamily: "var(--font-mono)" };

const TH: React.CSSProperties = {
	...MONO,
	fontSize: "9px",
	letterSpacing: "0.1em",
	textTransform: "uppercase",
	color: "var(--con-subtle)",
	padding: "7px 12px",
	textAlign: "left",
	fontWeight: 500,
	borderBottom: "1px solid var(--con-border)",
	whiteSpace: "nowrap",
};

const TD: React.CSSProperties = {
	...MONO,
	fontSize: "11px",
	color: "var(--con-text)",
	padding: "8px 12px",
	borderBottom: "1px solid var(--con-border)",
	whiteSpace: "nowrap",
};

// ─── Retainer progress bar ────────────────────────────────────────────────────

function RetainerBar({
	usedMinutes,
	includedHours,
	t,
}: {
	usedMinutes: number;
	includedHours: number;
	t: (key: string, vars?: Record<string, string | number>) => string;
}) {
	const usedH = usedMinutes / 60;
	const pct = Math.min((usedH / includedHours) * 100, 100);
	const over = usedH > includedHours;

	return (
		<div style={{ marginBottom: "12px" }}>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
				<span style={{ ...MONO, fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--con-subtle)" }}>
					{t("billing.retainerUsage")}
				</span>
				<span style={{ ...MONO, fontSize: "11px", fontWeight: 600, color: over ? "#dc2626" : "#2563EB" }}>
					{t("billing.retainerUsed", { used: usedH.toFixed(1), total: includedHours })}
				</span>
			</div>
			<div style={{ height: "6px", borderRadius: "3px", background: "#DBEAFE", overflow: "hidden" }}>
				<div style={{
					height: "100%",
					width: `${pct}%`,
					borderRadius: "3px",
					background: over ? "#dc2626" : "#2563EB",
					transition: "width 0.3s ease",
				}} />
			</div>
		</div>
	);
}

// ─── Client billing card ──────────────────────────────────────────────────────

function ClientCard({
	billing,
	onInvoiced,
}: {
	billing: ClientBilling;
	onInvoiced: (clientId: string) => void;
}) {
	const { t } = useTranslation();

	const [generating, setGenerating] = useState(false);
	const [flash, setFlash] = useState<"success" | "error" | null>(null);
	const [expanded, setExpanded] = useState(true);

	const isRetainer = billing.contractType === "retainer";
	const includedMinutes = (billing.retainerHours ?? 0) * 60;
	const extraMinutes = Math.max(billing.totalMinutes - includedMinutes, 0);
	const includedUsedMinutes = Math.min(billing.totalMinutes, includedMinutes);

	// For retainer: amount = retainerFee + (extra hours × rate)
	const retainerDisplay = isRetainer && billing.retainerFee != null
		? billing.retainerFee + (extraMinutes / 60) * billing.hourlyRate
		: null;

	const displayAmount = retainerDisplay ?? billing.totalAmount;

	async function handleGenerate() {
		setGenerating(true);
		setFlash(null);

		const res = await fetch("/api/invoices", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ clientId: billing.clientId }),
		});

		setGenerating(false);

		if (!res.ok) {
			setFlash("error");
			setTimeout(() => setFlash(null), 3000);
			return;
		}

		setFlash("success");
		setTimeout(() => {
			setFlash(null);
			onInvoiced(billing.clientId);
		}, 1500);
	}

	const contractBadge: React.CSSProperties = {
		display: "inline-block",
		...MONO,
		fontSize: "9px",
		letterSpacing: "0.06em",
		textTransform: "uppercase",
		padding: "2px 7px",
		borderRadius: "3px",
		background: isRetainer ? "rgba(37,99,235,0.12)" : "rgba(148,163,184,0.15)",
		color: isRetainer ? "#2563EB" : "var(--con-muted)",
		fontWeight: 600,
		marginLeft: "8px",
		verticalAlign: "middle",
	};

	return (
		<div style={{
			background: "var(--con-surface)",
			border: "1px solid var(--con-border)",
			borderRadius: "6px",
			overflow: "hidden",
		}}>
			{/* Card header */}
			<div style={{
				padding: "14px 18px",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				borderBottom: expanded ? "1px solid var(--con-border)" : "none",
				gap: "12px",
			}}>
				<div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: 0 }}>
					<button
						type="button"
						onClick={() => setExpanded((v) => !v)}
						style={{
							background: "none", border: "none", cursor: "pointer",
							...MONO, fontSize: "10px", color: "var(--con-subtle)", padding: "0 2px",
							flexShrink: 0,
						}}
					>
						{expanded ? "▾" : "▸"}
					</button>
					<div style={{ minWidth: 0 }}>
						<span style={{ ...MONO, fontSize: "14px", fontWeight: 700, color: "var(--con-text)" }}>
							{billing.clientName}
						</span>
						<span style={contractBadge}>{billing.contractType === "retainer" ? "Retainer" : "Ad hoc"}</span>
						<div style={{ ...MONO, fontSize: "9px", color: "var(--con-subtle)", marginTop: "2px" }}>
							{billing.entries.length} {t("billing.unbilledEntries")}
						</div>
					</div>
				</div>

				{/* Amount + action */}
				<div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
					<div style={{ textAlign: "right" }}>
						<div style={{ ...MONO, fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--con-subtle)", marginBottom: "2px" }}>
							{t("billing.total")}
						</div>
						<div style={{ ...MONO, fontSize: "20px", fontWeight: 700, color: "#2563EB", lineHeight: 1 }}>
							{fmtAmount(displayAmount)}
						</div>
						<div style={{ ...MONO, fontSize: "9px", color: "var(--con-subtle)", marginTop: "2px" }}>
							{t("billing.exclVat")}
						</div>
					</div>

					<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
						{flash === "success" ? (
							<span style={{ ...MONO, fontSize: "10px", color: "#16a34a", fontWeight: 600 }}>
								{t("billing.invoiceCreated")}
							</span>
						) : flash === "error" ? (
							<span style={{ ...MONO, fontSize: "10px", color: "var(--danger)" }}>
								{t("billing.invoiceError")}
							</span>
						) : (
							<button
								type="button"
								onClick={handleGenerate}
								disabled={generating}
								style={{
									...MONO, fontSize: "10px", fontWeight: 600, letterSpacing: "0.04em",
									background: generating ? "var(--con-border)" : "#2563EB",
									color: "#fff", border: "none", borderRadius: "4px",
									padding: "7px 14px", cursor: generating ? "not-allowed" : "pointer",
									whiteSpace: "nowrap",
								}}
							>
								{generating ? t("billing.generating") : t("billing.generateInvoice")}
							</button>
						)}
					</div>
				</div>
			</div>

			{/* Expanded body */}
			{expanded && (
				<div style={{ padding: "14px 18px" }}>
					{/* Retainer progress */}
					{isRetainer && billing.retainerHours != null && billing.retainerHours > 0 && (
						<RetainerBar
							usedMinutes={includedUsedMinutes}
							includedHours={billing.retainerHours}
							t={t}
						/>
					)}

					{/* Entries table */}
					<div style={{ border: "1px solid var(--con-border)", borderRadius: "4px", overflow: "hidden", marginBottom: isRetainer ? "12px" : "0" }}>
						<table style={{ width: "100%", borderCollapse: "collapse" }}>
							<thead>
								<tr>
									<th style={TH}>{t("billing.date")}</th>
									<th style={TH}>{t("billing.description")}</th>
									<th style={TH}>{t("billing.ticket")}</th>
									<th style={{ ...TH, textAlign: "right" }}>{t("billing.duration")}</th>
									<th style={{ ...TH, textAlign: "right" }}>€/h</th>
									<th style={{ ...TH, textAlign: "right" }}>{t("billing.amount")}</th>
								</tr>
							</thead>
							<tbody>
								{billing.entries.map((e) => {
									const amt = (e.durationMinutes / 60) * e.hourlyRate;
									return (
										<tr key={e.id}
											onMouseEnter={(ev) => (ev.currentTarget.style.background = "var(--con-bg)")}
											onMouseLeave={(ev) => (ev.currentTarget.style.background = "transparent")}
										>
											<td style={{ ...TD, color: "var(--con-subtle)" }}>
												{new Date(e.loggedAt).toLocaleDateString(undefined, { day: "numeric", month: "short" })}
											</td>
											<td style={{ ...TD, maxWidth: "320px", overflow: "hidden", textOverflow: "ellipsis" }}>
												{e.description}
											</td>
											<td style={TD}>
												{e.ticket ? (
													<Link href={`/tickets/${e.ticket.id}`} style={{
														color: "#2563EB", fontWeight: 700, textDecoration: "none",
														...MONO, fontSize: "11px",
													}}>
														{e.ticket.reference}
													</Link>
												) : (
													<span style={{ color: "var(--con-subtle)" }}>—</span>
												)}
											</td>
											<td style={{ ...TD, textAlign: "right" }}>{toHours(e.durationMinutes)}</td>
											<td style={{ ...TD, textAlign: "right", color: "var(--con-muted)" }}>
												€{e.hourlyRate.toFixed(2)}
											</td>
											<td style={{ ...TD, textAlign: "right", fontWeight: 600 }}>
												{fmtAmount(amt)}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>

					{/* Retainer breakdown */}
					{isRetainer && billing.retainerFee != null && (
						<div style={{
							marginTop: "12px",
							background: "rgba(37,99,235,0.04)",
							border: "1px solid rgba(37,99,235,0.15)",
							borderRadius: "4px",
							padding: "10px 14px",
							display: "flex",
							flexDirection: "column",
							gap: "6px",
						}}>
							<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
								<span style={{ ...MONO, fontSize: "10px", color: "var(--con-muted)" }}>
									{t("billing.retainerFlat")}
								</span>
								<span style={{ ...MONO, fontSize: "12px", fontWeight: 600, color: "var(--con-text)" }}>
									{fmtAmount(billing.retainerFee)}
								</span>
							</div>
							{extraMinutes > 0 && (
								<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
									<span style={{ ...MONO, fontSize: "10px", color: "var(--con-muted)" }}>
										{t("billing.extraHours")} ({toHours(extraMinutes)} × €{billing.hourlyRate.toFixed(2)}/h)
									</span>
									<span style={{ ...MONO, fontSize: "12px", fontWeight: 600, color: "#dc2626" }}>
										+{fmtAmount((extraMinutes / 60) * billing.hourlyRate)}
									</span>
								</div>
							)}
							<div style={{ borderTop: "1px solid rgba(37,99,235,0.2)", paddingTop: "6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
								<span style={{ ...MONO, fontSize: "10px", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--con-subtle)" }}>
									{t("billing.total")} ({t("billing.exclVat")})
								</span>
								<span style={{ ...MONO, fontSize: "16px", fontWeight: 700, color: "#2563EB" }}>
									{fmtAmount(displayAmount)}
								</span>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

// ─── Main view ────────────────────────────────────────────────────────────────

export default function BillingView({ initialData }: { initialData: ClientBilling[] }) {
	const { t } = useTranslation();
	const router = useRouter();

	const [data, setData] = useState(initialData);

	const grandTotal = data.reduce((s, c) => {
		if (c.contractType === "retainer" && c.retainerFee != null) {
			const extraMin = Math.max(c.totalMinutes - (c.retainerHours ?? 0) * 60, 0);
			return s + c.retainerFee + (extraMin / 60) * c.hourlyRate;
		}
		return s + c.totalAmount;
	}, 0);

	function handleInvoiced(clientId: string) {
		setData((prev) => prev.filter((c) => c.clientId !== clientId));
		router.refresh();
	}

	return (
		<div>
			{/* Page header */}
			<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
				<h1 style={{ ...MONO, fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--con-subtle)" }}>
					{t("billing.title")}
				</h1>
				<Link
					href="/billing/invoices"
					style={{
						...MONO, fontSize: "9px", letterSpacing: "0.06em", textTransform: "uppercase",
						color: "var(--con-muted)", border: "1px solid var(--con-border)",
						borderRadius: "4px", padding: "5px 10px", textDecoration: "none",
					}}
				>
					{t("billing.viewInvoices")} →
				</Link>
			</div>

			{data.length === 0 ? (
				<div style={{
					background: "var(--con-surface)",
					border: "1px solid var(--con-border)",
					borderRadius: "6px",
					padding: "64px 48px",
					textAlign: "center",
				}}>
					<div style={{ fontSize: "28px", marginBottom: "12px" }}>✓</div>
					<p style={{ ...MONO, fontSize: "12px", color: "var(--con-subtle)", margin: 0 }}>
						{t("billing.emptyState")}
					</p>
				</div>
			) : (
				<>
					{/* Summary bar */}
					<div style={{
						background: "#0F172A",
						borderRadius: "6px",
						padding: "16px 20px",
						marginBottom: "20px",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						gap: "16px",
					}}>
						<div>
							<div style={{ ...MONO, fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#64748b", marginBottom: "4px" }}>
								{t("billing.totalUnbilled")}
							</div>
							<div style={{ ...MONO, fontSize: "28px", fontWeight: 700, color: "#fff", lineHeight: 1 }}>
								{fmtAmount(grandTotal)}
							</div>
							<div style={{ ...MONO, fontSize: "9px", color: "#64748b", marginTop: "3px" }}>
								{t("billing.exclVat")} · {t("billing.acrossClients", { n: data.length })}
							</div>
						</div>

						{/* Mini breakdown */}
						<div style={{ display: "flex", gap: "20px" }}>
							{data.map((c) => {
								const amt = c.contractType === "retainer" && c.retainerFee != null
									? c.retainerFee + (Math.max(c.totalMinutes - (c.retainerHours ?? 0) * 60, 0) / 60) * c.hourlyRate
									: c.totalAmount;
								return (
									<div key={c.clientId} style={{ textAlign: "right" }}>
										<div style={{ ...MONO, fontSize: "9px", color: "#64748b", marginBottom: "2px" }}>
											{c.clientName}
										</div>
										<div style={{ ...MONO, fontSize: "13px", fontWeight: 600, color: "#2563EB" }}>
											{fmtAmount(amt)}
										</div>
									</div>
								);
							})}
						</div>
					</div>

					{/* Client cards */}
					<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
						{data.map((billing) => (
							<ClientCard
								key={billing.clientId}
								billing={billing}
								onInvoiced={handleInvoiced}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
}
