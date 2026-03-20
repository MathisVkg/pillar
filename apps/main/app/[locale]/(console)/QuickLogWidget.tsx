"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "@/components/LangProvider";

type Client = { id: string; name: string; hourlyRate: number };

export default function QuickLogWidget() {
	const { t } = useTranslation();

	const [open, setOpen] = useState(false);
	const [clients, setClients] = useState<Client[]>([]);
	const [clientId, setClientId] = useState("");
	const [description, setDescription] = useState("");
	const [duration, setDuration] = useState("");
	const [pending, setPending] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const [hovered, setHovered] = useState(false);

	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	// Fetch active clients when widget opens
	useEffect(() => {
		if (!open || clients.length > 0) return;
		fetch("/api/clients")
			.then((r) => r.json())
			.then((data: Client[]) => {
				setClients(data);
				if (data.length > 0) setClientId(data[0].id);
			})
			.catch(() => {});
	}, [open, clients.length]);

	// Auto-close after success
	useEffect(() => {
		if (success) {
			timerRef.current = setTimeout(() => {
				setOpen(false);
				setSuccess(false);
				reset();
			}, 2000);
		}
		return () => { if (timerRef.current) clearTimeout(timerRef.current); };
	}, [success]);

	function reset() {
		setDescription("");
		setDuration("");
		setError(null);
		setSuccess(false);
		if (clients.length > 0) setClientId(clients[0].id);
	}

	function handleClose() {
		setOpen(false);
		reset();
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const selected = clients.find((c) => c.id === clientId);
		if (!selected) return;

		setPending(true);
		setError(null);

		const res = await fetch("/api/time-entries", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				clientId,
				description,
				durationMinutes: Number(duration),
				hourlyRate: selected.hourlyRate,
				loggedAt: new Date().toISOString(),
				isBillable: true,
			}),
		});

		setPending(false);

		if (!res.ok) {
			const data = await res.json().catch(() => ({}));
			setError(data.error ?? "Error");
			return;
		}

		setSuccess(true);
	}

	const FAB_SIZE = 48;

	return (
		<>
			{/* Floating action button */}
			<button
				type="button"
				aria-label={t("quickLog.title")}
				onClick={() => setOpen((v) => !v)}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				style={{
					position: "fixed",
					bottom: "28px",
					right: "28px",
					width: `${FAB_SIZE}px`,
					height: `${FAB_SIZE}px`,
					borderRadius: "50%",
					background: hovered ? "#2563EB" : "#0F172A",
					border: "none",
					cursor: "pointer",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					boxShadow: "0 4px 16px rgba(0,0,0,0.32)",
					zIndex: 9999,
					transition: "background 0.15s",
				}}
			>
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
					<path d="M10 4v12M4 10h12" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
				</svg>
			</button>

			{/* Modal overlay */}
			{open && (
				<div
					role="dialog"
					aria-modal
					aria-label={t("quickLog.title")}
					style={{
						position: "fixed",
						inset: 0,
						zIndex: 9998,
						display: "flex",
						alignItems: "flex-end",
						justifyContent: "flex-end",
						padding: "0 28px 96px 0",
					}}
					onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
				>
					<div style={{
						background: "var(--con-surface)",
						border: "1px solid var(--con-border)",
						borderRadius: "6px",
						padding: "20px",
						width: "320px",
						boxShadow: "0 8px 32px rgba(0,0,0,0.24)",
					}}>
						{/* Header */}
						<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
							<span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--con-subtle)", fontWeight: 600 }}>
								{t("quickLog.title")}
							</span>
							<button
								type="button"
								onClick={handleClose}
								style={{
									background: "none", border: "none", cursor: "pointer",
									fontFamily: "var(--font-mono)", fontSize: "16px", color: "var(--con-subtle)",
									lineHeight: 1, padding: "0 2px",
								}}
							>
								×
							</button>
						</div>

						{success ? (
							<div style={{
								fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: 600,
								color: "#16A34A", textAlign: "center", padding: "16px 0",
							}}>
								{t("quickLog.success")}
							</div>
						) : (
							<form onSubmit={handleSubmit}>
								{/* Client */}
								<div style={{ marginBottom: "12px" }}>
									<label style={LABEL}>{t("quickLog.client")}</label>
									<select
										required
										value={clientId}
										onChange={(e) => setClientId(e.target.value)}
										style={INPUT}
									>
										{clients.map((c) => (
											<option key={c.id} value={c.id}>{c.name}</option>
										))}
									</select>
								</div>

								{/* Description */}
								<div style={{ marginBottom: "12px" }}>
									<label style={LABEL}>{t("quickLog.description")}</label>
									<input
										required
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										style={INPUT}
										onFocus={(e) => (e.currentTarget.style.borderColor = "#2563EB")}
										onBlur={(e) => (e.currentTarget.style.borderColor = "var(--con-border)")}
									/>
								</div>

								{/* Duration */}
								<div style={{ marginBottom: "16px" }}>
									<label style={LABEL}>{t("quickLog.duration")}</label>
									<input
										required
										type="number"
										min="1"
										step="1"
										placeholder={t("quickLog.durationHint")}
										value={duration}
										onChange={(e) => setDuration(e.target.value)}
										style={INPUT}
										onFocus={(e) => (e.currentTarget.style.borderColor = "#2563EB")}
										onBlur={(e) => (e.currentTarget.style.borderColor = "var(--con-border)")}
									/>
								</div>

								{error && (
									<div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--danger)", marginBottom: "10px" }}>
										{error}
									</div>
								)}

								<button
									type="submit"
									disabled={pending}
									style={{
										width: "100%",
										fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 600,
										letterSpacing: "0.04em",
										background: pending ? "var(--con-border)" : "#2563EB",
										color: "#fff", border: "none", borderRadius: "4px",
										padding: "9px 0", cursor: pending ? "not-allowed" : "pointer",
									}}
								>
									{pending ? t("quickLog.submitting") : t("quickLog.submit")}
								</button>
							</form>
						)}
					</div>
				</div>
			)}
		</>
	);
}

const LABEL: React.CSSProperties = {
	display: "block",
	fontFamily: "var(--font-mono)",
	fontSize: "9px",
	letterSpacing: "0.1em",
	textTransform: "uppercase",
	color: "var(--con-subtle)",
	marginBottom: "5px",
};

const INPUT: React.CSSProperties = {
	width: "100%",
	background: "var(--con-bg)",
	border: "1px solid var(--con-border)",
	borderRadius: "4px",
	padding: "7px 10px",
	fontFamily: "var(--font-mono)",
	fontSize: "12px",
	color: "var(--con-text)",
	outline: "none",
	boxSizing: "border-box",
};
