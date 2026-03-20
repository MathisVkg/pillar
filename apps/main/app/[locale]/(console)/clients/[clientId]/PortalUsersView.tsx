"use client";

import React, { useState, useCallback } from "react";
import { useTranslation } from "@/components/LangProvider";

export type PortalUser = {
	id: string;
	name: string;
	email: string;
	role: string;
	hasPassword: boolean;
	portalToken: string;
	lastLoginAt: string | null;
	isActive: boolean;
};

type Props = {
	clientId: string;
	clientSlug: string;
	initialUsers: PortalUser[];
	clientIsActive: boolean;
	seamless?: boolean;
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

function tokenUrl(slug: string, token: string): string {
	if (typeof window === "undefined") return "";
	return `${window.location.origin}/portal/${slug}?portal_token=${token}`;
}

// ─── Small inline confirm strip ───────────────────────────────────────────────
function ConfirmStrip({
	message,
	onConfirm,
	onCancel,
	pending,
}: {
	message: string;
	onConfirm: () => void;
	onCancel: () => void;
	pending: boolean;
}) {
	return (
		<div style={{
			display: "flex",
			alignItems: "center",
			gap: "10px",
			padding: "8px 12px",
			background: "rgba(239,68,68,0.06)",
			borderTop: "1px solid rgba(239,68,68,0.15)",
		}}>
			<span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--danger)", flex: 1 }}>
				{message}
			</span>
			<button
				type="button"
				onClick={onConfirm}
				disabled={pending}
				style={{
					fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 600,
					letterSpacing: "0.06em", textTransform: "uppercase",
					background: "var(--danger)", color: "#fff", border: "none",
					borderRadius: "3px", padding: "4px 10px", cursor: pending ? "not-allowed" : "pointer",
					opacity: pending ? 0.6 : 1,
				}}
			>
				{pending ? "…" : "Delete"}
			</button>
			<button
				type="button"
				onClick={onCancel}
				style={{
					fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.06em",
					textTransform: "uppercase", background: "none",
					border: "1px solid var(--con-border)", borderRadius: "3px",
					padding: "4px 8px", color: "var(--con-muted)", cursor: "pointer",
				}}
			>
				Cancel
			</button>
		</div>
	);
}

export default function PortalUsersView({ clientId, clientSlug, initialUsers, clientIsActive, seamless = false }: Props) {
	const { t } = useTranslation();

	const [users, setUsers] = useState<PortalUser[]>(initialUsers);
	const [showForm, setShowForm] = useState(false);
	const [formPending, setFormPending] = useState(false);
	const [formError, setFormError] = useState<string | null>(null);

	// Add user form fields
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [role, setRole] = useState("viewer");
	const [accessType, setAccessType] = useState("token");
	const [password, setPassword] = useState("");

	// Per-row action states
	const [copying, setCopying] = useState<string | null>(null);
	const [regenerating, setRegenerating] = useState<string | null>(null);
	const [toggling, setToggling] = useState<string | null>(null);

	// Edit state
	const [editingUserId, setEditingUserId] = useState<string | null>(null);
	const [editName, setEditName] = useState("");
	const [editEmail, setEditEmail] = useState("");
	const [editRole, setEditRole] = useState("viewer");
	const [editPassword, setEditPassword] = useState("");
	const [editPending, setEditPending] = useState(false);
	const [editError, setEditError] = useState<string | null>(null);

	// Delete state
	const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
	const [deleteConfirmPending, setDeleteConfirmPending] = useState(false);

	function resetForm() {
		setName(""); setEmail(""); setRole("viewer"); setAccessType("token"); setPassword("");
		setFormError(null);
	}

	function startEdit(u: PortalUser) {
		setEditingUserId(u.id);
		setEditName(u.name);
		setEditEmail(u.email);
		setEditRole(u.role);
		setEditPassword("");
		setEditError(null);
		setDeletingUserId(null);
	}

	function cancelEdit() {
		setEditingUserId(null);
		setEditError(null);
	}

	async function handleAddUser(e: React.FormEvent) {
		e.preventDefault();
		setFormPending(true);
		setFormError(null);

		const res = await fetch(`/api/clients/${clientId}/users`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, email, role, accessType, password: accessType === "password" ? password : undefined }),
		});

		setFormPending(false);

		if (!res.ok) {
			const data = await res.json().catch(() => ({}));
			setFormError(data.error ?? t("common.error"));
			return;
		}

		const newUser: PortalUser = await res.json();
		setUsers((prev) => [...prev, newUser]);
		resetForm();
		setShowForm(false);
	}

	const handleCopy = useCallback(async (userId: string, token: string) => {
		const url = tokenUrl(clientSlug, token);
		await navigator.clipboard.writeText(url);
		setCopying(userId);
		setTimeout(() => setCopying(null), 2000);
	}, [clientSlug]);

	const handleRegenerate = useCallback(async (userId: string) => {
		setRegenerating(userId);
		const res = await fetch(`/api/clients/${clientId}/users/${userId}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ regenerateToken: true }),
		});
		setRegenerating(null);
		if (!res.ok) return;
		const { portalToken } = await res.json();
		setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, portalToken } : u));
	}, [clientId]);

	const handleToggleActive = useCallback(async (userId: string, currentState: boolean) => {
		setToggling(userId);
		const res = await fetch(`/api/clients/${clientId}/users/${userId}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ isActive: !currentState }),
		});
		setToggling(null);
		if (!res.ok) return;
		const { isActive } = await res.json();
		setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, isActive } : u));
	}, [clientId]);

	async function handleSaveEdit(e: React.FormEvent) {
		e.preventDefault();
		if (!editingUserId) return;
		setEditPending(true);
		setEditError(null);

		const res = await fetch(`/api/clients/${clientId}/users/${editingUserId}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: editName,
				email: editEmail,
				role: editRole,
				...(editPassword.trim() ? { password: editPassword.trim() } : {}),
			}),
		});

		setEditPending(false);

		if (!res.ok) {
			const data = await res.json().catch(() => ({}));
			setEditError(data.error ?? t("common.error"));
			return;
		}

		const updated: PortalUser = await res.json();
		setUsers((prev) => prev.map((u) => u.id === editingUserId ? updated : u));
		setEditingUserId(null);
	}

	async function handleDeleteUser(userId: string) {
		setDeleteConfirmPending(true);
		const res = await fetch(`/api/clients/${clientId}/users/${userId}`, { method: "DELETE" });
		setDeleteConfirmPending(false);
		if (!res.ok) return;
		setUsers((prev) => prev.filter((u) => u.id !== userId));
		setDeletingUserId(null);
	}

	const roleBadge = (role: string) => ({
		display: "inline-block" as const,
		fontFamily: "var(--font-mono)",
		fontSize: "9px",
		letterSpacing: "0.06em",
		textTransform: "uppercase" as const,
		padding: "2px 6px",
		borderRadius: "3px",
		background: role === "admin" ? "rgba(37,99,235,0.12)" : "rgba(148,163,184,0.15)",
		color: role === "admin" ? "var(--accent)" : "var(--con-muted)",
		fontWeight: 600,
	});

	const actionBtn = (color?: string): React.CSSProperties => ({
		fontFamily: "var(--font-mono)",
		fontSize: "9px",
		letterSpacing: "0.06em",
		textTransform: "uppercase",
		background: "none",
		border: `1px solid ${color ?? "var(--con-border)"}`,
		borderRadius: "3px",
		padding: "3px 7px",
		color: color ?? "var(--con-muted)",
		cursor: "pointer",
		transition: "opacity 0.12s",
	});

	return (
		<div style={{ marginTop: seamless ? 0 : "32px" }}>
			{/* Section header */}
			<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: seamless ? "0" : "12px" }}>
				{!seamless && (
					<h2 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--con-subtle)" }}>
						{t("clients.portalAccess")}
					</h2>
				)}
				{clientIsActive && (
					<div style={{ marginLeft: "auto" }}>
						<button
							type="button"
							onClick={() => { setShowForm((v) => !v); if (showForm) resetForm(); }}
							style={{
								fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 600,
								letterSpacing: "0.04em",
								background: showForm ? "transparent" : "var(--accent)",
								color: showForm ? "var(--con-muted)" : "#fff",
								border: showForm ? "1px solid var(--con-border)" : "none",
								borderRadius: "4px", padding: "6px 12px", cursor: "pointer",
							}}
						>
							{showForm ? t("common.cancel") : `+ ${t("clients.addUser")}`}
						</button>
					</div>
				)}
			</div>

			{/* Deactivated client notice */}
			{!clientIsActive && (
				<div style={{
					fontFamily: "var(--font-mono)",
					fontSize: "11px",
					color: "#D97706",
					background: "rgba(217,119,6,0.08)",
					border: "1px solid rgba(217,119,6,0.2)",
					borderRadius: "4px",
					padding: "10px 14px",
					marginBottom: "12px",
				}}>
					{t("clients.portalDeactivatedNotice")}
				</div>
			)}

			{/* Add user form */}
			{showForm && (
				<form
					onSubmit={handleAddUser}
					style={{
						background: "var(--con-surface)", border: "1px solid var(--con-border)",
						borderRadius: "4px", padding: "16px", marginBottom: "12px",
					}}
				>
					<div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1fr", gap: "12px", marginBottom: "12px" }}>
						<div>
							<label style={labelStyle}>{t("clients.name")}</label>
							<input required value={name} onChange={(e) => setName(e.target.value)} style={inputStyle}
								onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
								onBlur={(e) => (e.currentTarget.style.borderColor = "var(--con-border)")} />
						</div>
						<div>
							<label style={labelStyle}>{t("auth.email")}</label>
							<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle}
								onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
								onBlur={(e) => (e.currentTarget.style.borderColor = "var(--con-border)")} />
						</div>
						<div>
							<label style={labelStyle}>{t("clients.role")}</label>
							<select value={role} onChange={(e) => setRole(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
								<option value="viewer">{t("clients.viewer")}</option>
								<option value="admin">{t("clients.admin")}</option>
							</select>
						</div>
						<div>
							<label style={labelStyle}>{t("clients.accessType")}</label>
							<select value={accessType} onChange={(e) => setAccessType(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
								<option value="token">{t("clients.tokenOnly")}</option>
								<option value="password">{t("clients.passwordAccess")}</option>
							</select>
						</div>
					</div>

					{accessType === "password" && (
						<div style={{ maxWidth: "280px", marginBottom: "12px" }}>
							<label style={labelStyle}>Password</label>
							<input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle}
								onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
								onBlur={(e) => (e.currentTarget.style.borderColor = "var(--con-border)")} />
						</div>
					)}

					<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
						<button type="submit" disabled={formPending} style={{
							fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 600,
							letterSpacing: "0.04em",
							background: formPending ? "var(--con-border)" : "var(--accent)",
							color: "#fff", border: "none", borderRadius: "4px", padding: "7px 14px",
							cursor: formPending ? "not-allowed" : "pointer",
						}}>
							{formPending ? t("clients.addingUser") : t("clients.addUser")}
						</button>
						{formError && (
							<span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--danger)" }}>
								{formError}
							</span>
						)}
					</div>
				</form>
			)}

			{/* Users table */}
			<div style={{ background: "var(--con-surface)", border: "1px solid var(--con-border)", borderRadius: seamless ? "0 0 4px 4px" : "4px", overflow: "hidden" }}>
				{users.length === 0 ? (
					<p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--con-subtle)", padding: "32px", textAlign: "center" }}>
						{t("clients.noUsers")}
					</p>
				) : (
					<table style={{ width: "100%", borderCollapse: "collapse" }}>
						<thead>
							<tr>
								<th style={TH}>{t("clients.name")}</th>
								<th style={TH}>{t("clients.role")}</th>
								<th style={TH}>{t("clients.accessType")}</th>
								<th style={TH}>{t("clients.lastLogin")}</th>
								<th style={{ ...TH, textAlign: "right" }}>{t("common.actions")}</th>
							</tr>
						</thead>
						<tbody>
							{users.map((u) => (
								<React.Fragment key={u.id}>
									{/* Main row */}
									<tr key={u.id} style={{ opacity: u.isActive ? 1 : 0.45 }}>
										<td style={TD}>
											<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
												<span style={{ fontWeight: 600 }}>{u.name}</span>
												{!clientIsActive && (
													<span style={{
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
											</div>
											<div style={{ fontSize: "10px", color: "var(--con-subtle)", marginTop: "1px" }}>{u.email}</div>
										</td>
										<td style={TD}>
											<span style={roleBadge(u.role)}>
												{u.role === "admin" ? t("clients.admin") : t("clients.viewer")}
											</span>
										</td>
										<td style={TD}>
											<span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--con-muted)" }}>
												{u.hasPassword ? t("clients.passwordLabel") : t("clients.tokenAccess")}
											</span>
										</td>
										<td style={{ ...TD, color: "var(--con-subtle)" }}>
											{u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleDateString() : t("clients.never")}
										</td>
										<td style={{ ...TD, textAlign: "right" }}>
											<div style={{ display: "flex", gap: "5px", justifyContent: "flex-end", alignItems: "center" }}>
												<button type="button" onClick={() => handleCopy(u.id, u.portalToken)} style={actionBtn("var(--accent)")}>
													{copying === u.id ? t("clients.copied") : t("clients.copyLink")}
												</button>
												<button type="button" onClick={() => handleRegenerate(u.id)} disabled={regenerating === u.id} style={actionBtn()}>
													{regenerating === u.id ? "…" : t("clients.regenerate")}
												</button>
												<button
													type="button"
													onClick={() => {
														if (editingUserId === u.id) { cancelEdit(); } else { startEdit(u); }
													}}
													style={actionBtn(editingUserId === u.id ? "var(--accent)" : undefined)}
												>
													{editingUserId === u.id ? t("common.cancel") : t("editUser")}
												</button>
												<button
													type="button"
													onClick={() => handleToggleActive(u.id, u.isActive)}
													disabled={toggling === u.id}
													style={actionBtn(u.isActive ? "var(--warn)" : "var(--ok)")}
												>
													{toggling === u.id ? "…" : u.isActive ? t("clients.deactivate") : t("clients.reactivate")}
												</button>
												<button
													type="button"
													onClick={() => {
														if (deletingUserId === u.id) { setDeletingUserId(null); } else {
															setDeletingUserId(u.id);
															setEditingUserId(null);
														}
													}}
													style={actionBtn("var(--danger)")}
												>
													{t("clients.deleteUser")}
												</button>
											</div>
										</td>
									</tr>

									{/* Edit form row */}
									{editingUserId === u.id && (
										<tr key={`${u.id}-edit`}>
											<td colSpan={5} style={{ padding: "0", borderBottom: "1px solid var(--con-border)" }}>
												<form
													onSubmit={handleSaveEdit}
													style={{ padding: "14px 16px", background: "var(--con-bg)" }}
												>
													<div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr", gap: "12px", marginBottom: "10px" }}>
														<div>
															<label style={labelStyle}>{t("clients.name")}</label>
															<input required value={editName} onChange={(e) => setEditName(e.target.value)} style={inputStyle}
																onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
																onBlur={(e) => (e.currentTarget.style.borderColor = "var(--con-border)")} />
														</div>
														<div>
															<label style={labelStyle}>{t("auth.email")}</label>
															<input required type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} style={inputStyle}
																onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
																onBlur={(e) => (e.currentTarget.style.borderColor = "var(--con-border)")} />
														</div>
														<div>
															<label style={labelStyle}>{t("clients.role")}</label>
															<select value={editRole} onChange={(e) => setEditRole(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
																<option value="viewer">{t("clients.viewer")}</option>
																<option value="admin">{t("clients.admin")}</option>
															</select>
														</div>
													</div>
													{u.hasPassword && (
														<div style={{ maxWidth: "280px", marginBottom: "10px" }}>
															<label style={labelStyle}>{t("clients.newPasswordLabel")}</label>
															<input type="password" value={editPassword} onChange={(e) => setEditPassword(e.target.value)}
																placeholder={t("clients.leaveBlankToKeep")}
																style={inputStyle}
																onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
																onBlur={(e) => (e.currentTarget.style.borderColor = "var(--con-border)")} />
														</div>
													)}
													<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
														<button type="submit" disabled={editPending} style={{
															fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 600,
															letterSpacing: "0.04em",
															background: editPending ? "var(--con-border)" : "var(--accent)",
															color: "#fff", border: "none", borderRadius: "4px",
															padding: "6px 12px", cursor: editPending ? "not-allowed" : "pointer",
														}}>
															{editPending ? t("saving") : t("common.save")}
														</button>
														<button type="button" onClick={cancelEdit} style={{
															fontFamily: "var(--font-mono)", fontSize: "10px",
															background: "none", border: "1px solid var(--con-border)",
															borderRadius: "4px", padding: "6px 10px",
															color: "var(--con-muted)", cursor: "pointer",
														}}>
															{t("common.cancel")}
														</button>
														{editError && (
															<span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--danger)" }}>
																{editError}
															</span>
														)}
													</div>
												</form>
											</td>
										</tr>
									)}

									{/* Delete confirm row */}
									{deletingUserId === u.id && (
										<tr key={`${u.id}-delete`}>
											<td colSpan={5} style={{ padding: "0", borderBottom: "1px solid var(--con-border)" }}>
												<ConfirmStrip
													message={t("clients.confirmDeleteUser")}
													onConfirm={() => handleDeleteUser(u.id)}
													onCancel={() => setDeletingUserId(null)}
													pending={deleteConfirmPending}
												/>
											</td>
										</tr>
									)}
								</React.Fragment>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
}
