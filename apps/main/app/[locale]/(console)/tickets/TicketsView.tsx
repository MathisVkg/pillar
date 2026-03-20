"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/components/LangProvider";

export type Ticket = {
	id: string;
	reference: string;
	title: string;
	status: string;
	priority: string;
	source: string;
	isBillable: boolean;
	createdAt: string;
	client: { id: string; name: string; isActive: boolean };
};

type Client = { id: string; name: string; isActive: boolean };

type Props = {
	tickets: Ticket[];
	clients: Client[];
	filterClientId?: string;
	filterStatus?: string;
	filterPriority?: string;
	showDeactivated: boolean;
};

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

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
	open:        { bg: "rgba(37,99,235,0.12)",   color: "var(--accent)" },
	in_progress: { bg: "rgba(234,179,8,0.15)",   color: "#ca8a04" },
	done:        { bg: "rgba(34,197,94,0.12)",   color: "#16a34a" },
	closed:      { bg: "rgba(148,163,184,0.15)", color: "var(--con-muted)" },
};

const PRIORITY_COLORS: Record<string, { bg: string; color: string }> = {
	low:    { bg: "rgba(148,163,184,0.15)", color: "var(--con-muted)" },
	normal: { bg: "rgba(148,163,184,0.15)", color: "var(--con-text)" },
	high:   { bg: "rgba(234,179,8,0.15)",   color: "#ca8a04" },
	urgent: { bg: "rgba(239,68,68,0.12)",   color: "#dc2626" },
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

const STATUS_LABEL_KEYS: Record<string, string> = {
	open: "tickets.statusOpen",
	in_progress: "tickets.statusInProgress",
	done: "tickets.statusDone",
	closed: "tickets.statusClosed",
};

const PRIORITY_LABEL_KEYS: Record<string, string> = {
	low: "tickets.priorityLow",
	normal: "tickets.priorityNormal",
	high: "tickets.priorityHigh",
	urgent: "tickets.priorityUrgent",
};

const SOURCE_LABEL_KEYS: Record<string, string> = {
	manual: "tickets.sourceManual",
	phone: "tickets.sourcePhone",
	whatsapp: "tickets.sourceWhatsapp",
	email: "tickets.sourceEmail",
	portal: "tickets.sourcePortal",
};

export default function TicketsView({ tickets, clients, filterClientId, filterStatus, filterPriority, showDeactivated }: Props) {
	const { t } = useTranslation();
	const router = useRouter();

	// Filter state (mirrors URL params)
	const [clientId, setClientId] = useState(filterClientId ?? "");
	const [status, setStatus] = useState(filterStatus ?? "");
	const [priority, setPriority] = useState(filterPriority ?? "");

	// New ticket form
	const [showForm, setShowForm] = useState(false);
	const [formPending, setFormPending] = useState(false);
	const [formError, setFormError] = useState<string | null>(null);
	const [fClientId, setFClientId] = useState(clients.find((c) => c.isActive)?.id ?? clients[0]?.id ?? "");
	const [fTitle, setFTitle] = useState("");
	const [fDescription, setFDescription] = useState("");
	const [fPriority, setFPriority] = useState("normal");
	const [fSource, setFSource] = useState("manual");
	const [fBillable, setFBillable] = useState(true);

	function applyFilters(c: string, s: string, p: string, deact: boolean) {
		const params = new URLSearchParams();
		if (c) params.set("clientId", c);
		if (s) params.set("status", s);
		if (p) params.set("priority", p);
		if (deact) params.set("showDeactivated", "1");
		const qs = params.toString();
		router.push(qs ? `/tickets?${qs}` : "/tickets");
	}

	function handleFilterChange(field: "client" | "status" | "priority", value: string) {
		const next = { c: clientId, s: status, p: priority };
		if (field === "client") { setClientId(value); next.c = value; }
		if (field === "status") { setStatus(value); next.s = value; }
		if (field === "priority") { setPriority(value); next.p = value; }
		applyFilters(next.c, next.s, next.p, showDeactivated);
	}

	function toggleDeactivated() {
		applyFilters(clientId, status, priority, !showDeactivated);
	}

	function resetForm() {
		setFClientId(clients.find((c) => c.isActive)?.id ?? clients[0]?.id ?? "");
		setFTitle("");
		setFDescription("");
		setFPriority("normal");
		setFSource("manual");
		setFBillable(true);
		setFormError(null);
	}

	async function handleCreate(e: React.FormEvent) {
		e.preventDefault();
		setFormPending(true);
		setFormError(null);

		const res = await fetch("/api/tickets", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				clientId: fClientId,
				title: fTitle,
				description: fDescription || undefined,
				priority: fPriority,
				source: fSource,
				isBillable: fBillable,
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

	const activeClients = clients.filter((c) => c.isActive);

	return (
		<div>
			{/* Page header */}
			<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
				<h1 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--con-subtle)" }}>
					{t("tickets.title")}
				</h1>
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
					{showForm ? t("common.cancel") : `+ ${t("tickets.newTicket")}`}
				</button>
			</div>

			{/* New ticket form */}
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
					<div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "12px", marginBottom: "12px" }}>
						<div>
							<label style={labelStyle}>{t("tickets.client")}</label>
							<select value={fClientId} onChange={(e) => setFClientId(e.target.value)} style={{ ...formInputStyle, cursor: "pointer" }}>
								{activeClients.map((c) => (
									<option key={c.id} value={c.id}>{c.name}</option>
								))}
							</select>
						</div>
						<div>
							<label style={labelStyle}>{t("tickets.priority")}</label>
							<select value={fPriority} onChange={(e) => setFPriority(e.target.value)} style={{ ...formInputStyle, cursor: "pointer" }}>
								<option value="low">{t("tickets.priorityLow")}</option>
								<option value="normal">{t("tickets.priorityNormal")}</option>
								<option value="high">{t("tickets.priorityHigh")}</option>
								<option value="urgent">{t("tickets.priorityUrgent")}</option>
							</select>
						</div>
						<div>
							<label style={labelStyle}>{t("tickets.source")}</label>
							<select value={fSource} onChange={(e) => setFSource(e.target.value)} style={{ ...formInputStyle, cursor: "pointer" }}>
								<option value="manual">{t("tickets.sourceManual")}</option>
								<option value="phone">{t("tickets.sourcePhone")}</option>
								<option value="whatsapp">{t("tickets.sourceWhatsapp")}</option>
								<option value="email">{t("tickets.sourceEmail")}</option>
								<option value="portal">{t("tickets.sourcePortal")}</option>
							</select>
						</div>
						<div>
							<label style={labelStyle}>{t("tickets.billable")}</label>
							<select value={fBillable ? "yes" : "no"} onChange={(e) => setFBillable(e.target.value === "yes")} style={{ ...formInputStyle, cursor: "pointer" }}>
								<option value="yes">{t("tickets.yes")}</option>
								<option value="no">{t("tickets.no")}</option>
							</select>
						</div>
					</div>

					<div style={{ marginBottom: "12px" }}>
						<label style={labelStyle}>{t("tickets.titleLabel")}</label>
						<input
							required
							value={fTitle}
							onChange={(e) => setFTitle(e.target.value)}
							style={formInputStyle}
							onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
							onBlur={(e) => (e.currentTarget.style.borderColor = "var(--con-border)")}
						/>
					</div>

					<div style={{ marginBottom: "12px" }}>
						<label style={labelStyle}>{t("tickets.description")} <span style={{ color: "var(--con-subtle)", fontWeight: 400 }}>({t("tickets.optional")})</span></label>
						<textarea
							value={fDescription}
							onChange={(e) => setFDescription(e.target.value)}
							rows={3}
							style={{ ...formInputStyle, resize: "vertical" }}
							onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
							onBlur={(e) => (e.currentTarget.style.borderColor = "var(--con-border)")}
						/>
					</div>

					<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
						<button
							type="submit"
							disabled={formPending}
							style={{
								fontFamily: "var(--font-mono)",
								fontSize: "10px",
								fontWeight: 600,
								letterSpacing: "0.04em",
								background: formPending ? "var(--con-border)" : "var(--accent)",
								color: "#fff",
								border: "none",
								borderRadius: "4px",
								padding: "7px 14px",
								cursor: formPending ? "not-allowed" : "pointer",
							}}
						>
							{formPending ? t("tickets.creating") : t("tickets.create")}
						</button>
						{formError && (
							<span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--danger)" }}>
								{formError}
							</span>
						)}
					</div>
				</form>
			)}

			{/* Filter bar */}
			<div style={{ display: "flex", gap: "10px", marginBottom: "12px", alignItems: "flex-end", flexWrap: "wrap" }}>
				<div>
					<label style={labelStyle}>{t("tickets.filterClient")}</label>
					<select value={clientId} onChange={(e) => handleFilterChange("client", e.target.value)} style={inputStyle}>
						<option value="">{t("tickets.allClients")}</option>
						{clients.map((c) => (
							<option key={c.id} value={c.id}>{c.name}{!c.isActive ? " ·" : ""}</option>
						))}
					</select>
				</div>
				<div>
					<label style={labelStyle}>{t("tickets.filterStatus")}</label>
					<select value={status} onChange={(e) => handleFilterChange("status", e.target.value)} style={inputStyle}>
						<option value="">{t("tickets.allStatuses")}</option>
						<option value="open">{t("tickets.statusOpen")}</option>
						<option value="in_progress">{t("tickets.statusInProgress")}</option>
						<option value="done">{t("tickets.statusDone")}</option>
						<option value="closed">{t("tickets.statusClosed")}</option>
					</select>
				</div>
				<div>
					<label style={labelStyle}>{t("tickets.filterPriority")}</label>
					<select value={priority} onChange={(e) => handleFilterChange("priority", e.target.value)} style={inputStyle}>
						<option value="">{t("tickets.allPriorities")}</option>
						<option value="low">{t("tickets.priorityLow")}</option>
						<option value="normal">{t("tickets.priorityNormal")}</option>
						<option value="high">{t("tickets.priorityHigh")}</option>
						<option value="urgent">{t("tickets.priorityUrgent")}</option>
					</select>
				</div>

				{/* Include deactivated toggle */}
				<div style={{ marginLeft: "auto" }}>
					<label style={{ ...labelStyle, opacity: 0 }}>·</label>
					<button
						type="button"
						onClick={toggleDeactivated}
						style={{
							fontFamily: "var(--font-mono)",
							fontSize: "9px",
							letterSpacing: "0.06em",
							textTransform: "uppercase",
							background: showDeactivated ? "rgba(217,119,6,0.1)" : "none",
							color: showDeactivated ? "#D97706" : "var(--con-subtle)",
							border: showDeactivated ? "1px solid rgba(217,119,6,0.3)" : "1px solid var(--con-border)",
							borderRadius: "4px",
							padding: "6px 10px",
							cursor: "pointer",
						}}
					>
						{t("tickets.includeDeactivated")}
					</button>
				</div>
			</div>

			{/* Table */}
			<div style={{ background: "var(--con-surface)", border: "1px solid var(--con-border)", borderRadius: "4px", overflow: "hidden" }}>
				{tickets.length === 0 ? (
					<p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--con-subtle)", padding: "48px", textAlign: "center" }}>
						{t("tickets.emptyState")}
					</p>
				) : (
					<table style={{ width: "100%", borderCollapse: "collapse" }}>
						<thead>
							<tr>
								<th style={TH}>{t("tickets.reference")}</th>
								<th style={TH}>{t("tickets.client")}</th>
								<th style={TH}>{t("tickets.titleLabel")}</th>
								<th style={TH}>{t("tickets.status")}</th>
								<th style={TH}>{t("tickets.priority")}</th>
								<th style={TH}>{t("tickets.source")}</th>
								<th style={{ ...TH, textAlign: "right" }}>{t("tickets.billable")}</th>
								<th style={{ ...TH, textAlign: "right" }}>{t("tickets.createdAt")}</th>
							</tr>
						</thead>
						<tbody>
							{tickets.map((tk) => (
								<tr
									key={tk.id}
									style={{ cursor: "pointer", opacity: tk.client.isActive ? 1 : 0.6 }}
									onClick={() => router.push(`/tickets/${tk.id}`)}
									onMouseEnter={(e) => (e.currentTarget.style.background = "var(--con-bg)")}
									onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
								>
									<td style={TD}>
										<span style={{ color: "var(--accent)", fontWeight: 700 }}>{tk.reference}</span>
									</td>
									<td style={{ ...TD, color: tk.client.isActive ? "var(--con-muted)" : "#D97706" }}>{tk.client.name}</td>
									<td style={{ ...TD, maxWidth: "280px", overflow: "hidden", textOverflow: "ellipsis" }}>{tk.title}</td>
									<td style={TD}>
										<Badge value={tk.status} label={t(STATUS_LABEL_KEYS[tk.status] ?? "tickets.statusOpen")} map={STATUS_COLORS} />
									</td>
									<td style={TD}>
										<Badge value={tk.priority} label={t(PRIORITY_LABEL_KEYS[tk.priority] ?? "tickets.priorityNormal")} map={PRIORITY_COLORS} />
									</td>
									<td style={{ ...TD, color: "var(--con-muted)", fontSize: "11px" }}>{t(SOURCE_LABEL_KEYS[tk.source] ?? "tickets.sourceManual")}</td>
									<td style={{ ...TD, textAlign: "right", color: tk.isBillable ? "var(--con-text)" : "var(--con-subtle)" }}>
										{tk.isBillable ? t("tickets.yes") : t("tickets.no")}
									</td>
									<td style={{ ...TD, textAlign: "right", color: "var(--con-subtle)" }}>
										{new Date(tk.createdAt).toLocaleDateString()}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
}
