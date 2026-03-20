"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/components/LangProvider";
import Link from "next/link";

type Client = {
	id: string;
	name: string;
	slug: string;
	contractType: string;
	hourlyRate: number;
	language: string;
	isActive: boolean;
	_count: { tickets: number };
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

const labelStyle: React.CSSProperties = {
	display: "block",
	fontFamily: "var(--font-mono)",
	fontSize: "9px",
	letterSpacing: "0.1em",
	textTransform: "uppercase",
	color: "var(--con-subtle)",
	marginBottom: "5px",
};

export default function ClientsView({ clients: initial }: { clients: Client[] }) {
	const { t } = useTranslation();
	const router = useRouter();

	const [showDeactivated, setShowDeactivated] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [pending, setPending] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const [name, setName] = useState("");
	const [contractType, setContractType] = useState("adhoc");
	const [hourlyRate, setHourlyRate] = useState("95");
	const [language, setLanguage] = useState("fr");

	function resetForm() {
		setName("");
		setContractType("adhoc");
		setHourlyRate("95");
		setLanguage("fr");
		setError(null);
	}

	async function handleCreate(e: React.FormEvent) {
		e.preventDefault();
		setPending(true);
		setError(null);

		const res = await fetch("/api/clients", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, contractType, hourlyRate: Number(hourlyRate), language }),
		});

		setPending(false);

		if (!res.ok) {
			const data = await res.json().catch(() => ({}));
			setError(data.error ?? t("common.error"));
			return;
		}

		resetForm();
		setShowForm(false);
		router.refresh();
	}

	const contractBadge = (type: string) => ({
		display: "inline-block" as const,
		fontFamily: "var(--font-mono)",
		fontSize: "9px",
		letterSpacing: "0.08em",
		textTransform: "uppercase" as const,
		padding: "2px 7px",
		borderRadius: "3px",
		background: type === "retainer" ? "rgba(37,99,235,0.12)" : "rgba(148,163,184,0.15)",
		color: type === "retainer" ? "var(--accent)" : "var(--con-muted)",
		fontWeight: 600,
	});

	const langLabel: Record<string, string> = {
		fr: t("clients.langFr"),
		nl: t("clients.langNl"),
		en: t("clients.langEn"),
	};

	const displayed = showDeactivated ? initial : initial.filter((c) => c.isActive);

	return (
		<div>
			{/* Page header */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					marginBottom: "16px",
				}}
			>
				<h1
					style={{
						fontFamily: "var(--font-mono)",
						fontSize: "11px",
						letterSpacing: "0.1em",
						textTransform: "uppercase",
						color: "var(--con-subtle)",
					}}
				>
					{t("clients.title")}
				</h1>

				<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
					{/* Show deactivated toggle */}
					<button
						type="button"
						onClick={() => setShowDeactivated((v) => !v)}
						style={{
							fontFamily: "var(--font-mono)",
							fontSize: "9px",
							letterSpacing: "0.06em",
							textTransform: "uppercase",
							background: showDeactivated ? "rgba(217,119,6,0.1)" : "none",
							color: showDeactivated ? "#D97706" : "var(--con-subtle)",
							border: showDeactivated ? "1px solid rgba(217,119,6,0.3)" : "1px solid var(--con-border)",
							borderRadius: "4px",
							padding: "5px 10px",
							cursor: "pointer",
						}}
					>
						{t("clients.showDeactivated")}
					</button>

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
							transition: "background 0.12s",
						}}
					>
						{showForm ? t("common.cancel") : `+ ${t("clients.newClient")}`}
					</button>
				</div>
			</div>

			{/* Create form */}
			{showForm && (
				<form
					onSubmit={handleCreate}
					style={{
						background: "var(--con-surface)",
						border: "1px solid var(--con-border)",
						borderRadius: "4px",
						padding: "16px",
						marginBottom: "12px",
						display: "grid",
						gridTemplateColumns: "2fr 1fr 1fr 1fr auto",
						gap: "12px",
						alignItems: "end",
					}}
				>
					<div>
						<label style={labelStyle}>{t("clients.name")}</label>
						<input
							required
							value={name}
							onChange={(e) => setName(e.target.value)}
							style={inputStyle}
							onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
							onBlur={(e) => (e.currentTarget.style.borderColor = "var(--con-border)")}
						/>
					</div>

					<div>
						<label style={labelStyle}>{t("clients.contractType")}</label>
						<select
							value={contractType}
							onChange={(e) => setContractType(e.target.value)}
							style={{ ...inputStyle, cursor: "pointer" }}
						>
							<option value="adhoc">{t("clients.adhoc")}</option>
							<option value="retainer">{t("clients.retainer")}</option>
						</select>
					</div>

					<div>
						<label style={labelStyle}>{t("clients.hourlyRate")} (€/h)</label>
						<input
							type="number"
							min="0"
							step="0.01"
							value={hourlyRate}
							onChange={(e) => setHourlyRate(e.target.value)}
							style={inputStyle}
							onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
							onBlur={(e) => (e.currentTarget.style.borderColor = "var(--con-border)")}
						/>
					</div>

					<div>
						<label style={labelStyle}>{t("clients.language")}</label>
						<select
							value={language}
							onChange={(e) => setLanguage(e.target.value)}
							style={{ ...inputStyle, cursor: "pointer" }}
						>
							<option value="fr">{t("clients.langFr")}</option>
							<option value="nl">{t("clients.langNl")}</option>
							<option value="en">{t("clients.langEn")}</option>
						</select>
					</div>

					<button
						type="submit"
						disabled={pending}
						style={{
							fontFamily: "var(--font-mono)",
							fontSize: "10px",
							fontWeight: 600,
							letterSpacing: "0.04em",
							background: pending ? "var(--con-border)" : "var(--accent)",
							color: "#fff",
							border: "none",
							borderRadius: "4px",
							padding: "7px 14px",
							cursor: pending ? "not-allowed" : "pointer",
							whiteSpace: "nowrap",
						}}
					>
						{pending ? t("clients.creating") : t("clients.create")}
					</button>

					{error && (
						<div
							style={{
								gridColumn: "1 / -1",
								fontFamily: "var(--font-mono)",
								fontSize: "10px",
								color: "var(--danger)",
								background: "var(--danger-l)",
								padding: "6px 10px",
								borderRadius: "3px",
							}}
						>
							{error}
						</div>
					)}
				</form>
			)}

			{/* Table */}
			<div
				style={{
					background: "var(--con-surface)",
					border: "1px solid var(--con-border)",
					borderRadius: "4px",
					overflow: "hidden",
				}}
			>
				{displayed.length === 0 ? (
					<p
						style={{
							fontFamily: "var(--font-mono)",
							fontSize: "11px",
							color: "var(--con-subtle)",
							padding: "48px",
							textAlign: "center",
						}}
					>
						{t("clients.emptyState")}
					</p>
				) : (
					<table style={{ width: "100%", borderCollapse: "collapse" }}>
						<thead>
							<tr>
								<th style={TH}>{t("clients.name")}</th>
								<th style={TH}>{t("clients.contractType")}</th>
								<th style={{ ...TH, textAlign: "right" }}>{t("clients.hourlyRate")}</th>
								<th style={{ ...TH, textAlign: "right" }}>{t("clients.openTickets")}</th>
								<th style={TH}>{t("clients.language")}</th>
								<th style={{ ...TH, textAlign: "right" }}>{t("common.actions")}</th>
							</tr>
						</thead>
						<tbody>
							{displayed.map((c) => (
								<tr
									key={c.id}
									style={{ cursor: "pointer", opacity: c.isActive ? 1 : 0.55 }}
									onMouseEnter={(e) => (e.currentTarget.style.background = "var(--con-bg)")}
									onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
								>
									<td style={TD}>
										<Link
											href={`/clients/${c.id}`}
											style={{ color: c.isActive ? "var(--con-text)" : "var(--con-subtle)", fontWeight: 600, textDecoration: "none" }}
										>
											{c.name}
										</Link>
										<span style={{ color: "var(--con-subtle)", marginLeft: "8px", fontSize: "10px" }}>
											/{c.slug}
										</span>
										{!c.isActive && (
											<span style={{
												marginLeft: "8px",
												fontFamily: "var(--font-mono)",
												fontSize: "8px",
												letterSpacing: "0.06em",
												textTransform: "uppercase",
												background: "rgba(217,119,6,0.12)",
												color: "#D97706",
												borderRadius: "3px",
												padding: "1px 5px",
												fontWeight: 600,
											}}>
												{t("clients.deactivatedBadge")}
											</span>
										)}
									</td>
									<td style={TD}>
										<span style={contractBadge(c.contractType)}>
											{c.contractType === "retainer" ? t("clients.retainer") : t("clients.adhoc")}
										</span>
									</td>
									<td style={{ ...TD, textAlign: "right" }}>
										€{Number(c.hourlyRate).toFixed(2)}/h
									</td>
									<td
										style={{
											...TD,
											textAlign: "right",
											color: c._count.tickets > 0 ? "var(--warn)" : "var(--con-subtle)",
											fontWeight: c._count.tickets > 0 ? 700 : 400,
										}}
									>
										{c._count.tickets}
									</td>
									<td style={{ ...TD, color: "var(--con-muted)" }}>
										{langLabel[c.language] ?? c.language}
									</td>
									<td style={{ ...TD, textAlign: "right" }}>
										<div style={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}>
											<Link
												href={`/clients/${c.id}`}
												style={{
													fontFamily: "var(--font-mono)",
													fontSize: "9px",
													letterSpacing: "0.06em",
													textTransform: "uppercase",
													color: "var(--con-muted)",
													border: "1px solid var(--con-border)",
													borderRadius: "3px",
													padding: "3px 8px",
													textDecoration: "none",
													whiteSpace: "nowrap",
												}}
											>
												{t("clients.view")}
											</Link>
											{c.isActive && (
												<Link
													href={`/clients/${c.id}?tab=portal`}
													style={{
														fontFamily: "var(--font-mono)",
														fontSize: "9px",
														letterSpacing: "0.06em",
														textTransform: "uppercase",
														color: "var(--accent)",
														border: "1px solid rgba(37,99,235,0.3)",
														borderRadius: "3px",
														padding: "3px 8px",
														textDecoration: "none",
														whiteSpace: "nowrap",
													}}
												>
													{t("clients.portalUsers")}
												</Link>
											)}
										</div>
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
