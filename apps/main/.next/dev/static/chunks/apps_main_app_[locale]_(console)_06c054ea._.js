(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PortalUsersView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$main$2f$components$2f$LangProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/main/components/LangProvider.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const TH = {
    fontFamily: "var(--font-mono)",
    fontSize: "9px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--con-subtle)",
    padding: "8px 12px",
    textAlign: "left",
    fontWeight: 500,
    borderBottom: "1px solid var(--con-border)"
};
const TD = {
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    color: "var(--con-text)",
    padding: "10px 12px",
    borderBottom: "1px solid var(--con-border)",
    whiteSpace: "nowrap"
};
const inputStyle = {
    width: "100%",
    background: "var(--con-bg)",
    border: "1px solid var(--con-border)",
    borderRadius: "4px",
    padding: "7px 10px",
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    color: "var(--con-text)",
    outline: "none"
};
const labelStyle = {
    display: "block",
    fontFamily: "var(--font-mono)",
    fontSize: "9px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--con-subtle)",
    marginBottom: "5px"
};
function tokenUrl(slug, token) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return `${window.location.origin}/portal/${slug}?portal_token=${token}`;
}
// ─── Small inline confirm strip ───────────────────────────────────────────────
function ConfirmStrip({ message, onConfirm, onCancel, pending }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 12px",
            background: "rgba(239,68,68,0.06)",
            borderTop: "1px solid rgba(239,68,68,0.15)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    color: "var(--danger)",
                    flex: 1
                },
                children: message
            }, void 0, false, {
                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                lineNumber: 94,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: onConfirm,
                disabled: pending,
                style: {
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    background: "var(--danger)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "3px",
                    padding: "4px 10px",
                    cursor: pending ? "not-allowed" : "pointer",
                    opacity: pending ? 0.6 : 1
                },
                children: pending ? "…" : "Delete"
            }, void 0, false, {
                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                lineNumber: 97,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: onCancel,
                style: {
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    background: "none",
                    border: "1px solid var(--con-border)",
                    borderRadius: "3px",
                    padding: "4px 8px",
                    color: "var(--con-muted)",
                    cursor: "pointer"
                },
                children: "Cancel"
            }, void 0, false, {
                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                lineNumber: 111,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
        lineNumber: 86,
        columnNumber: 3
    }, this);
}
_c = ConfirmStrip;
function PortalUsersView({ clientId, clientSlug, initialUsers, clientIsActive, seamless = false }) {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$main$2f$components$2f$LangProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialUsers);
    const [showForm, setShowForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [formPending, setFormPending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [formError, setFormError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Add user form fields
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [role, setRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("viewer");
    const [accessType, setAccessType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("token");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    // Per-row action states
    const [copying, setCopying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [regenerating, setRegenerating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [toggling, setToggling] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Edit state
    const [editingUserId, setEditingUserId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editName, setEditName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [editEmail, setEditEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [editRole, setEditRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("viewer");
    const [editPassword, setEditPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [editPending, setEditPending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editError, setEditError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Delete state
    const [deletingUserId, setDeletingUserId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [deleteConfirmPending, setDeleteConfirmPending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    function resetForm() {
        setName("");
        setEmail("");
        setRole("viewer");
        setAccessType("token");
        setPassword("");
        setFormError(null);
    }
    function startEdit(u) {
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
    async function handleAddUser(e) {
        e.preventDefault();
        setFormPending(true);
        setFormError(null);
        const res = await fetch(`/api/clients/${clientId}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                role,
                accessType,
                password: accessType === "password" ? password : undefined
            })
        });
        setFormPending(false);
        if (!res.ok) {
            const data = await res.json().catch(()=>({}));
            setFormError(data.error ?? t("common.error"));
            return;
        }
        const newUser = await res.json();
        setUsers((prev)=>[
                ...prev,
                newUser
            ]);
        resetForm();
        setShowForm(false);
    }
    const handleCopy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PortalUsersView.useCallback[handleCopy]": async (userId, token)=>{
            const url = tokenUrl(clientSlug, token);
            await navigator.clipboard.writeText(url);
            setCopying(userId);
            setTimeout({
                "PortalUsersView.useCallback[handleCopy]": ()=>setCopying(null)
            }["PortalUsersView.useCallback[handleCopy]"], 2000);
        }
    }["PortalUsersView.useCallback[handleCopy]"], [
        clientSlug
    ]);
    const handleRegenerate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PortalUsersView.useCallback[handleRegenerate]": async (userId)=>{
            setRegenerating(userId);
            const res = await fetch(`/api/clients/${clientId}/users/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    regenerateToken: true
                })
            });
            setRegenerating(null);
            if (!res.ok) return;
            const { portalToken } = await res.json();
            setUsers({
                "PortalUsersView.useCallback[handleRegenerate]": (prev)=>prev.map({
                        "PortalUsersView.useCallback[handleRegenerate]": (u)=>u.id === userId ? {
                                ...u,
                                portalToken
                            } : u
                    }["PortalUsersView.useCallback[handleRegenerate]"])
            }["PortalUsersView.useCallback[handleRegenerate]"]);
        }
    }["PortalUsersView.useCallback[handleRegenerate]"], [
        clientId
    ]);
    const handleToggleActive = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PortalUsersView.useCallback[handleToggleActive]": async (userId, currentState)=>{
            setToggling(userId);
            const res = await fetch(`/api/clients/${clientId}/users/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    isActive: !currentState
                })
            });
            setToggling(null);
            if (!res.ok) return;
            const { isActive } = await res.json();
            setUsers({
                "PortalUsersView.useCallback[handleToggleActive]": (prev)=>prev.map({
                        "PortalUsersView.useCallback[handleToggleActive]": (u)=>u.id === userId ? {
                                ...u,
                                isActive
                            } : u
                    }["PortalUsersView.useCallback[handleToggleActive]"])
            }["PortalUsersView.useCallback[handleToggleActive]"]);
        }
    }["PortalUsersView.useCallback[handleToggleActive]"], [
        clientId
    ]);
    async function handleSaveEdit(e) {
        e.preventDefault();
        if (!editingUserId) return;
        setEditPending(true);
        setEditError(null);
        const res = await fetch(`/api/clients/${clientId}/users/${editingUserId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: editName,
                email: editEmail,
                role: editRole,
                ...editPassword.trim() ? {
                    password: editPassword.trim()
                } : {}
            })
        });
        setEditPending(false);
        if (!res.ok) {
            const data = await res.json().catch(()=>({}));
            setEditError(data.error ?? t("common.error"));
            return;
        }
        const updated = await res.json();
        setUsers((prev)=>prev.map((u)=>u.id === editingUserId ? updated : u));
        setEditingUserId(null);
    }
    async function handleDeleteUser(userId) {
        setDeleteConfirmPending(true);
        const res = await fetch(`/api/clients/${clientId}/users/${userId}`, {
            method: "DELETE"
        });
        setDeleteConfirmPending(false);
        if (!res.ok) return;
        setUsers((prev)=>prev.filter((u)=>u.id !== userId));
        setDeletingUserId(null);
    }
    const roleBadge = (role)=>({
            display: "inline-block",
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            padding: "2px 6px",
            borderRadius: "3px",
            background: role === "admin" ? "rgba(37,99,235,0.12)" : "rgba(148,163,184,0.15)",
            color: role === "admin" ? "var(--accent)" : "var(--con-muted)",
            fontWeight: 600
        });
    const actionBtn = (color)=>({
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
            transition: "opacity 0.12s"
        });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            marginTop: seamless ? 0 : "32px"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: seamless ? "0" : "12px"
                },
                children: [
                    !seamless && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: {
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "var(--con-subtle)"
                        },
                        children: t("clients.portalAccess")
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                        lineNumber: 309,
                        columnNumber: 6
                    }, this),
                    clientIsActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginLeft: "auto"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>{
                                setShowForm((v)=>!v);
                                if (showForm) resetForm();
                            },
                            style: {
                                fontFamily: "var(--font-mono)",
                                fontSize: "10px",
                                fontWeight: 600,
                                letterSpacing: "0.04em",
                                background: showForm ? "transparent" : "var(--accent)",
                                color: showForm ? "var(--con-muted)" : "#fff",
                                border: showForm ? "1px solid var(--con-border)" : "none",
                                borderRadius: "4px",
                                padding: "6px 12px",
                                cursor: "pointer"
                            },
                            children: showForm ? t("common.cancel") : `+ ${t("clients.addUser")}`
                        }, void 0, false, {
                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                            lineNumber: 315,
                            columnNumber: 7
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                        lineNumber: 314,
                        columnNumber: 6
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                lineNumber: 307,
                columnNumber: 4
            }, this),
            !clientIsActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "#D97706",
                    background: "rgba(217,119,6,0.08)",
                    border: "1px solid rgba(217,119,6,0.2)",
                    borderRadius: "4px",
                    padding: "10px 14px",
                    marginBottom: "12px"
                },
                children: t("clients.portalDeactivatedNotice")
            }, void 0, false, {
                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                lineNumber: 335,
                columnNumber: 5
            }, this),
            showForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleAddUser,
                style: {
                    background: "var(--con-surface)",
                    border: "1px solid var(--con-border)",
                    borderRadius: "4px",
                    padding: "16px",
                    marginBottom: "12px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: "2fr 2fr 1fr 1fr",
                            gap: "12px",
                            marginBottom: "12px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: t("clients.name")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                        lineNumber: 360,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        required: true,
                                        value: name,
                                        onChange: (e)=>setName(e.target.value),
                                        style: inputStyle,
                                        onFocus: (e)=>e.currentTarget.style.borderColor = "var(--accent)",
                                        onBlur: (e)=>e.currentTarget.style.borderColor = "var(--con-border)"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                        lineNumber: 361,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                lineNumber: 359,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: t("auth.email")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                        lineNumber: 366,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        required: true,
                                        type: "email",
                                        value: email,
                                        onChange: (e)=>setEmail(e.target.value),
                                        style: inputStyle,
                                        onFocus: (e)=>e.currentTarget.style.borderColor = "var(--accent)",
                                        onBlur: (e)=>e.currentTarget.style.borderColor = "var(--con-border)"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                        lineNumber: 367,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                lineNumber: 365,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: t("clients.role")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                        lineNumber: 372,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: role,
                                        onChange: (e)=>setRole(e.target.value),
                                        style: {
                                            ...inputStyle,
                                            cursor: "pointer"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "viewer",
                                                children: t("clients.viewer")
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                lineNumber: 374,
                                                columnNumber: 9
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "admin",
                                                children: t("clients.admin")
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                lineNumber: 375,
                                                columnNumber: 9
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                        lineNumber: 373,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                lineNumber: 371,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: t("clients.accessType")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                        lineNumber: 379,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: accessType,
                                        onChange: (e)=>setAccessType(e.target.value),
                                        style: {
                                            ...inputStyle,
                                            cursor: "pointer"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "token",
                                                children: t("clients.tokenOnly")
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                lineNumber: 381,
                                                columnNumber: 9
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "password",
                                                children: t("clients.passwordAccess")
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                lineNumber: 382,
                                                columnNumber: 9
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                        lineNumber: 380,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                lineNumber: 378,
                                columnNumber: 7
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                        lineNumber: 358,
                        columnNumber: 6
                    }, this),
                    accessType === "password" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            maxWidth: "280px",
                            marginBottom: "12px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: labelStyle,
                                children: "Password"
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                lineNumber: 389,
                                columnNumber: 8
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                required: true,
                                type: "password",
                                value: password,
                                onChange: (e)=>setPassword(e.target.value),
                                style: inputStyle,
                                onFocus: (e)=>e.currentTarget.style.borderColor = "var(--accent)",
                                onBlur: (e)=>e.currentTarget.style.borderColor = "var(--con-border)"
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                lineNumber: 390,
                                columnNumber: 8
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                        lineNumber: 388,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: "8px",
                            alignItems: "center"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: formPending,
                                style: {
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "10px",
                                    fontWeight: 600,
                                    letterSpacing: "0.04em",
                                    background: formPending ? "var(--con-border)" : "var(--accent)",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "4px",
                                    padding: "7px 14px",
                                    cursor: formPending ? "not-allowed" : "pointer"
                                },
                                children: formPending ? t("clients.addingUser") : t("clients.addUser")
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                lineNumber: 397,
                                columnNumber: 7
                            }, this),
                            formError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "10px",
                                    color: "var(--danger)"
                                },
                                children: formError
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                lineNumber: 407,
                                columnNumber: 8
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                        lineNumber: 396,
                        columnNumber: 6
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                lineNumber: 351,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "var(--con-surface)",
                    border: "1px solid var(--con-border)",
                    borderRadius: seamless ? "0 0 4px 4px" : "4px",
                    overflow: "hidden"
                },
                children: users.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        color: "var(--con-subtle)",
                        padding: "32px",
                        textAlign: "center"
                    },
                    children: t("clients.noUsers")
                }, void 0, false, {
                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                    lineNumber: 418,
                    columnNumber: 6
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    style: {
                        width: "100%",
                        borderCollapse: "collapse"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: TH,
                                        children: t("clients.name")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                        lineNumber: 425,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: TH,
                                        children: t("clients.role")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                        lineNumber: 426,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: TH,
                                        children: t("clients.accessType")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                        lineNumber: 427,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: TH,
                                        children: t("clients.lastLogin")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                        lineNumber: 428,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            ...TH,
                                            textAlign: "right"
                                        },
                                        children: t("common.actions")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                        lineNumber: 429,
                                        columnNumber: 9
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                lineNumber: 424,
                                columnNumber: 8
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                            lineNumber: 423,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: users.map((u)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            style: {
                                                opacity: u.isActive ? 1 : 0.45
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: TD,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: "8px"
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        fontWeight: 600
                                                                    },
                                                                    children: u.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                                    lineNumber: 439,
                                                                    columnNumber: 13
                                                                }, this),
                                                                !clientIsActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        fontFamily: "var(--font-mono)",
                                                                        fontSize: "8px",
                                                                        letterSpacing: "0.06em",
                                                                        textTransform: "uppercase",
                                                                        background: "rgba(217,119,6,0.12)",
                                                                        color: "#D97706",
                                                                        borderRadius: "3px",
                                                                        padding: "1px 5px",
                                                                        fontWeight: 600
                                                                    },
                                                                    children: t("clients.deactivatedBadge")
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                                    lineNumber: 441,
                                                                    columnNumber: 14
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                            lineNumber: 438,
                                                            columnNumber: 12
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: "10px",
                                                                color: "var(--con-subtle)",
                                                                marginTop: "1px"
                                                            },
                                                            children: u.email
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                            lineNumber: 456,
                                                            columnNumber: 12
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                    lineNumber: 437,
                                                    columnNumber: 11
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: TD,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: roleBadge(u.role),
                                                        children: u.role === "admin" ? t("clients.admin") : t("clients.viewer")
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                        lineNumber: 459,
                                                        columnNumber: 12
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                    lineNumber: 458,
                                                    columnNumber: 11
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: TD,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontFamily: "var(--font-mono)",
                                                            fontSize: "9px",
                                                            textTransform: "uppercase",
                                                            letterSpacing: "0.06em",
                                                            color: "var(--con-muted)"
                                                        },
                                                        children: u.hasPassword ? t("clients.passwordLabel") : t("clients.tokenAccess")
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                        lineNumber: 464,
                                                        columnNumber: 12
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                    lineNumber: 463,
                                                    columnNumber: 11
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        ...TD,
                                                        color: "var(--con-subtle)"
                                                    },
                                                    children: u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleDateString() : t("clients.never")
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                    lineNumber: 468,
                                                    columnNumber: 11
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        ...TD,
                                                        textAlign: "right"
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "flex",
                                                            gap: "5px",
                                                            justifyContent: "flex-end",
                                                            alignItems: "center"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>handleCopy(u.id, u.portalToken),
                                                                style: actionBtn("var(--accent)"),
                                                                children: copying === u.id ? t("clients.copied") : t("clients.copyLink")
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                                lineNumber: 473,
                                                                columnNumber: 13
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>handleRegenerate(u.id),
                                                                disabled: regenerating === u.id,
                                                                style: actionBtn(),
                                                                children: regenerating === u.id ? "…" : t("clients.regenerate")
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                                lineNumber: 476,
                                                                columnNumber: 13
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>{
                                                                    if (editingUserId === u.id) {
                                                                        cancelEdit();
                                                                    } else {
                                                                        startEdit(u);
                                                                    }
                                                                },
                                                                style: actionBtn(editingUserId === u.id ? "var(--accent)" : undefined),
                                                                children: editingUserId === u.id ? t("common.cancel") : t("editUser")
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                                lineNumber: 479,
                                                                columnNumber: 13
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>handleToggleActive(u.id, u.isActive),
                                                                disabled: toggling === u.id,
                                                                style: actionBtn(u.isActive ? "var(--warn)" : "var(--ok)"),
                                                                children: toggling === u.id ? "…" : u.isActive ? t("clients.deactivate") : t("clients.reactivate")
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                                lineNumber: 488,
                                                                columnNumber: 13
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>{
                                                                    if (deletingUserId === u.id) {
                                                                        setDeletingUserId(null);
                                                                    } else {
                                                                        setDeletingUserId(u.id);
                                                                        setEditingUserId(null);
                                                                    }
                                                                },
                                                                style: actionBtn("var(--danger)"),
                                                                children: t("clients.deleteUser")
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                                lineNumber: 496,
                                                                columnNumber: 13
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                        lineNumber: 472,
                                                        columnNumber: 12
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                    lineNumber: 471,
                                                    columnNumber: 11
                                                }, this)
                                            ]
                                        }, u.id, true, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                            lineNumber: 436,
                                            columnNumber: 10
                                        }, this),
                                        editingUserId === u.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                colSpan: 5,
                                                style: {
                                                    padding: "0",
                                                    borderBottom: "1px solid var(--con-border)"
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                                    onSubmit: handleSaveEdit,
                                                    style: {
                                                        padding: "14px 16px",
                                                        background: "var(--con-bg)"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: "grid",
                                                                gridTemplateColumns: "2fr 2fr 1fr",
                                                                gap: "12px",
                                                                marginBottom: "10px"
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            style: labelStyle,
                                                                            children: t("clients.name")
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                                            lineNumber: 522,
                                                                            columnNumber: 16
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            required: true,
                                                                            value: editName,
                                                                            onChange: (e)=>setEditName(e.target.value),
                                                                            style: inputStyle,
                                                                            onFocus: (e)=>e.currentTarget.style.borderColor = "var(--accent)",
                                                                            onBlur: (e)=>e.currentTarget.style.borderColor = "var(--con-border)"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                                            lineNumber: 523,
                                                                            columnNumber: 16
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                                    lineNumber: 521,
                                                                    columnNumber: 15
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            style: labelStyle,
                                                                            children: t("auth.email")
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                                            lineNumber: 528,
                                                                            columnNumber: 16
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            required: true,
                                                                            type: "email",
                                                                            value: editEmail,
                                                                            onChange: (e)=>setEditEmail(e.target.value),
                                                                            style: inputStyle,
                                                                            onFocus: (e)=>e.currentTarget.style.borderColor = "var(--accent)",
                                                                            onBlur: (e)=>e.currentTarget.style.borderColor = "var(--con-border)"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                                            lineNumber: 529,
                                                                            columnNumber: 16
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                                    lineNumber: 527,
                                                                    columnNumber: 15
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            style: labelStyle,
                                                                            children: t("clients.role")
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                                            lineNumber: 534,
                                                                            columnNumber: 16
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                            value: editRole,
                                                                            onChange: (e)=>setEditRole(e.target.value),
                                                                            style: {
                                                                                ...inputStyle,
                                                                                cursor: "pointer"
                                                                            },
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                    value: "viewer",
                                                                                    children: t("clients.viewer")
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                                                    lineNumber: 536,
                                                                                    columnNumber: 17
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                    value: "admin",
                                                                                    children: t("clients.admin")
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                                                    lineNumber: 537,
                                                                                    columnNumber: 17
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                                            lineNumber: 535,
                                                                            columnNumber: 16
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                                    lineNumber: 533,
                                                                    columnNumber: 15
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                            lineNumber: 520,
                                                            columnNumber: 14
                                                        }, this),
                                                        u.hasPassword && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                maxWidth: "280px",
                                                                marginBottom: "10px"
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    style: labelStyle,
                                                                    children: t("clients.newPasswordLabel")
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                                    lineNumber: 543,
                                                                    columnNumber: 16
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "password",
                                                                    value: editPassword,
                                                                    onChange: (e)=>setEditPassword(e.target.value),
                                                                    placeholder: t("clients.leaveBlankToKeep"),
                                                                    style: inputStyle,
                                                                    onFocus: (e)=>e.currentTarget.style.borderColor = "var(--accent)",
                                                                    onBlur: (e)=>e.currentTarget.style.borderColor = "var(--con-border)"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                                    lineNumber: 544,
                                                                    columnNumber: 16
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                            lineNumber: 542,
                                                            columnNumber: 15
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: "flex",
                                                                gap: "8px",
                                                                alignItems: "center"
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "submit",
                                                                    disabled: editPending,
                                                                    style: {
                                                                        fontFamily: "var(--font-mono)",
                                                                        fontSize: "10px",
                                                                        fontWeight: 600,
                                                                        letterSpacing: "0.04em",
                                                                        background: editPending ? "var(--con-border)" : "var(--accent)",
                                                                        color: "#fff",
                                                                        border: "none",
                                                                        borderRadius: "4px",
                                                                        padding: "6px 12px",
                                                                        cursor: editPending ? "not-allowed" : "pointer"
                                                                    },
                                                                    children: editPending ? t("saving") : t("common.save")
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                                    lineNumber: 552,
                                                                    columnNumber: 15
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: cancelEdit,
                                                                    style: {
                                                                        fontFamily: "var(--font-mono)",
                                                                        fontSize: "10px",
                                                                        background: "none",
                                                                        border: "1px solid var(--con-border)",
                                                                        borderRadius: "4px",
                                                                        padding: "6px 10px",
                                                                        color: "var(--con-muted)",
                                                                        cursor: "pointer"
                                                                    },
                                                                    children: t("common.cancel")
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                                    lineNumber: 561,
                                                                    columnNumber: 15
                                                                }, this),
                                                                editError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        fontFamily: "var(--font-mono)",
                                                                        fontSize: "10px",
                                                                        color: "var(--danger)"
                                                                    },
                                                                    children: editError
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                                    lineNumber: 570,
                                                                    columnNumber: 16
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                            lineNumber: 551,
                                                            columnNumber: 14
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                    lineNumber: 516,
                                                    columnNumber: 13
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                lineNumber: 515,
                                                columnNumber: 12
                                            }, this)
                                        }, `${u.id}-edit`, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                            lineNumber: 514,
                                            columnNumber: 11
                                        }, this),
                                        deletingUserId === u.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                colSpan: 5,
                                                style: {
                                                    padding: "0",
                                                    borderBottom: "1px solid var(--con-border)"
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ConfirmStrip, {
                                                    message: t("clients.confirmDeleteUser"),
                                                    onConfirm: ()=>handleDeleteUser(u.id),
                                                    onCancel: ()=>setDeletingUserId(null),
                                                    pending: deleteConfirmPending
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                    lineNumber: 584,
                                                    columnNumber: 13
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                                lineNumber: 583,
                                                columnNumber: 12
                                            }, this)
                                        }, `${u.id}-delete`, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                            lineNumber: 582,
                                            columnNumber: 11
                                        }, this)
                                    ]
                                }, u.id, true, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                                    lineNumber: 434,
                                    columnNumber: 9
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                            lineNumber: 432,
                            columnNumber: 7
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                    lineNumber: 422,
                    columnNumber: 6
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
                lineNumber: 416,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx",
        lineNumber: 305,
        columnNumber: 3
    }, this);
}
_s(PortalUsersView, "cEdAZ+qa2b6Atad3j1My/HriHVM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$main$2f$components$2f$LangProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c1 = PortalUsersView;
var _c, _c1;
__turbopack_context__.k.register(_c, "ConfirmStrip");
__turbopack_context__.k.register(_c1, "PortalUsersView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AssetsView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$main$2f$components$2f$LangProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/main/components/LangProvider.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
// ─── Styles ───────────────────────────────────────────────────────────────────
const TH = {
    fontFamily: "var(--font-mono)",
    fontSize: "9px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--con-subtle)",
    padding: "8px 12px",
    textAlign: "left",
    fontWeight: 500,
    borderBottom: "1px solid var(--con-border)"
};
const TD = {
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    color: "var(--con-text)",
    padding: "10px 12px",
    borderBottom: "1px solid var(--con-border)",
    whiteSpace: "nowrap"
};
const inputStyle = {
    background: "var(--con-bg)",
    border: "1px solid var(--con-border)",
    borderRadius: "4px",
    padding: "6px 10px",
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    color: "var(--con-text)",
    outline: "none",
    cursor: "pointer"
};
const labelStyle = {
    display: "block",
    fontFamily: "var(--font-mono)",
    fontSize: "9px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--con-subtle)",
    marginBottom: "5px"
};
// ─── Badge maps ───────────────────────────────────────────────────────────────
const TYPE_COLORS = {
    hardware: {
        bg: "rgba(37,99,235,0.12)",
        color: "var(--accent)"
    },
    software: {
        bg: "rgba(139,92,246,0.12)",
        color: "#7c3aed"
    },
    license: {
        bg: "rgba(234,179,8,0.15)",
        color: "#b45309"
    },
    camera: {
        bg: "rgba(148,163,184,0.15)",
        color: "var(--con-muted)"
    },
    network: {
        bg: "rgba(20,184,166,0.12)",
        color: "#0f766e"
    }
};
const STATUS_COLORS = {
    ok: {
        bg: "rgba(34,197,94,0.12)",
        color: "#16a34a"
    },
    warning: {
        bg: "rgba(234,179,8,0.15)",
        color: "#ca8a04"
    },
    critical: {
        bg: "rgba(239,68,68,0.12)",
        color: "#dc2626"
    },
    retired: {
        bg: "rgba(148,163,184,0.15)",
        color: "var(--con-muted)"
    }
};
const SENSITIVITY_COLORS = {
    normal: null,
    restricted: {
        bg: "rgba(234,179,8,0.15)",
        color: "#b45309"
    },
    internal: {
        bg: "rgba(239,68,68,0.12)",
        color: "#dc2626"
    }
};
function Badge({ label, colors }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
            display: "inline-block",
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            padding: "2px 6px",
            borderRadius: "3px",
            background: colors.bg,
            color: colors.color,
            fontWeight: 600
        },
        children: label
    }, void 0, false, {
        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
        lineNumber: 103,
        columnNumber: 3
    }, this);
}
_c = Badge;
// ─── Warranty date cell ───────────────────────────────────────────────────────
function WarrantyCell({ dateStr, t }) {
    if (!dateStr) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
            color: "var(--con-muted)"
        },
        children: "—"
    }, void 0, false, {
        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
        lineNumber: 123,
        columnNumber: 23
    }, this);
    const date = new Date(dateStr);
    const now = new Date();
    const daysLeft = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    let color = "var(--con-text)";
    let suffix = null;
    if (daysLeft < 0) {
        color = "#dc2626";
        suffix = t("assets.warrantyExpired");
    } else if (daysLeft <= 60) {
        color = "#dc2626";
        suffix = t("assets.warrantyExpiredSoon");
    } else if (daysLeft <= 90) {
        color = "#ca8a04";
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
            color
        },
        children: [
            dateStr,
            suffix && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    marginLeft: "6px",
                    fontSize: "9px",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase"
                },
                children: suffix
            }, void 0, false, {
                fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                lineNumber: 146,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
        lineNumber: 143,
        columnNumber: 3
    }, this);
}
_c1 = WarrantyCell;
function AssetsView({ assets, clients, filterClientId, filterType, filterStatus, embeddedClientId }) {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$main$2f$components$2f$LangProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const isEmbedded = Boolean(embeddedClientId);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [clientId, setClientId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(filterClientId ?? "");
    const [typeFilter, setTypeFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(filterType ?? "");
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(filterStatus ?? "");
    const [showForm, setShowForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [formPending, setFormPending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [formError, setFormError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Form state
    const [fClientId, setFClientId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(embeddedClientId ?? clients[0]?.id ?? "");
    const [fName, setFName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [fType, setFType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("hardware");
    const [fSerial, setFSerial] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [fAssignedTo, setFAssignedTo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [fStatus, setFStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("ok");
    const [fSensitivity, setFSensitivity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("normal");
    const [fWarranty, setFWarranty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [fPurchasedAt, setFPurchasedAt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [fNotes, setFNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    function applyFilters(c, tp, s) {
        if (isEmbedded) return; // Embedded mode doesn't use URL filters
        const params = new URLSearchParams();
        if (c) params.set("clientId", c);
        if (tp) params.set("type", tp);
        if (s) params.set("status", s);
        const qs = params.toString();
        router.push(qs ? `/assets?${qs}` : "/assets");
    }
    function handleFilterChange(field, value) {
        const next = {
            c: clientId,
            tp: typeFilter,
            s: statusFilter
        };
        if (field === "client") {
            setClientId(value);
            next.c = value;
        }
        if (field === "type") {
            setTypeFilter(value);
            next.tp = value;
        }
        if (field === "status") {
            setStatusFilter(value);
            next.s = value;
        }
        applyFilters(next.c, next.tp, next.s);
    }
    function resetForm() {
        setFClientId(embeddedClientId ?? clients[0]?.id ?? "");
        setFName("");
        setFType("hardware");
        setFSerial("");
        setFAssignedTo("");
        setFStatus("ok");
        setFSensitivity("normal");
        setFWarranty("");
        setFPurchasedAt("");
        setFNotes("");
        setFormError(null);
    }
    async function handleCreate(e) {
        e.preventDefault();
        setFormPending(true);
        setFormError(null);
        const res = await fetch("/api/assets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                clientId: fClientId,
                name: fName,
                type: fType,
                serialNumber: fSerial || undefined,
                assignedTo: fAssignedTo || undefined,
                status: fStatus,
                sensitivity: fSensitivity,
                warrantyExpiresAt: fWarranty || undefined,
                purchasedAt: fPurchasedAt || undefined,
                notes: fNotes || undefined
            })
        });
        setFormPending(false);
        if (!res.ok) {
            const data = await res.json().catch(()=>({}));
            setFormError(data.error ?? t("common.error"));
            return;
        }
        resetForm();
        setShowForm(false);
        router.refresh();
    }
    const TYPE_LABEL_KEYS = {
        hardware: "assets.typeHardware",
        software: "assets.typeSoftware",
        license: "assets.typeLicense",
        camera: "assets.typeCamera",
        network: "assets.typeNetwork"
    };
    const STATUS_LABEL_KEYS = {
        ok: "assets.statusOk",
        warning: "assets.statusWarning",
        critical: "assets.statusCritical",
        retired: "assets.statusRetired"
    };
    const SENSITIVITY_LABEL_KEYS = {
        normal: "assets.sensitivityNormal",
        restricted: "assets.sensitivityRestricted",
        internal: "assets.sensitivityInternal"
    };
    // Client-side search filter
    const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AssetsView.useMemo[filtered]": ()=>{
            const q = search.toLowerCase();
            return assets.filter({
                "AssetsView.useMemo[filtered]": (a)=>{
                    if (isEmbedded && a.client.id !== embeddedClientId) return false;
                    if (!isEmbedded && clientId && a.client.id !== clientId) return false;
                    if (typeFilter && a.type !== typeFilter) return false;
                    if (statusFilter && a.status !== statusFilter) return false;
                    if (q && !a.name.toLowerCase().includes(q) && !(a.serialNumber ?? "").toLowerCase().includes(q)) return false;
                    return true;
                }
            }["AssetsView.useMemo[filtered]"]);
        }
    }["AssetsView.useMemo[filtered]"], [
        assets,
        search,
        clientId,
        typeFilter,
        statusFilter,
        isEmbedded,
        embeddedClientId
    ]);
    const formInputStyle = {
        width: "100%",
        background: "var(--con-bg)",
        border: "1px solid var(--con-border)",
        borderRadius: "4px",
        padding: "7px 10px",
        fontFamily: "var(--font-mono)",
        fontSize: "12px",
        color: "var(--con-text)",
        outline: "none"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "16px"
                },
                children: [
                    !isEmbedded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        style: {
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "var(--con-subtle)"
                        },
                        children: t("assets.title")
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                        lineNumber: 289,
                        columnNumber: 6
                    }, this),
                    isEmbedded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                        lineNumber: 293,
                        columnNumber: 20
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>{
                            setShowForm((v)=>!v);
                            if (showForm) resetForm();
                        },
                        style: {
                            fontFamily: "var(--font-mono)",
                            fontSize: "10px",
                            fontWeight: 600,
                            letterSpacing: "0.04em",
                            background: showForm ? "transparent" : "var(--accent)",
                            color: showForm ? "var(--con-muted)" : "#fff",
                            border: showForm ? "1px solid var(--con-border)" : "none",
                            borderRadius: "4px",
                            padding: "6px 12px",
                            cursor: "pointer"
                        },
                        children: showForm ? t("common.cancel") : `+ ${t("assets.newAsset")}`
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                        lineNumber: 294,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                lineNumber: 287,
                columnNumber: 4
            }, this),
            showForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleCreate,
                style: {
                    background: "var(--con-surface)",
                    border: "1px solid var(--con-border)",
                    borderRadius: "4px",
                    padding: "16px",
                    marginBottom: "12px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: isEmbedded ? "2fr 1fr" : "1fr 2fr 1fr",
                            gap: "12px",
                            marginBottom: "12px"
                        },
                        children: [
                            !isEmbedded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: t("assets.client")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                        lineNumber: 330,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: fClientId,
                                        onChange: (e)=>setFClientId(e.target.value),
                                        style: {
                                            ...formInputStyle,
                                            cursor: "pointer"
                                        },
                                        children: clients.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: c.id,
                                                children: c.name
                                            }, c.id, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                                lineNumber: 332,
                                                columnNumber: 30
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                        lineNumber: 331,
                                        columnNumber: 9
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                lineNumber: 329,
                                columnNumber: 8
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: t("assets.name")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                        lineNumber: 337,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        required: true,
                                        value: fName,
                                        onChange: (e)=>setFName(e.target.value),
                                        placeholder: "e.g. Dell Latitude 5540",
                                        style: formInputStyle
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                        lineNumber: 338,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                lineNumber: 336,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: t("assets.type")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                        lineNumber: 347,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: fType,
                                        onChange: (e)=>setFType(e.target.value),
                                        style: {
                                            ...formInputStyle,
                                            cursor: "pointer"
                                        },
                                        children: Object.entries(TYPE_LABEL_KEYS).map(([v, k])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: v,
                                                children: t(k)
                                            }, v, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                                lineNumber: 349,
                                                columnNumber: 58
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                        lineNumber: 348,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                lineNumber: 346,
                                columnNumber: 7
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                        lineNumber: 327,
                        columnNumber: 6
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr 1fr",
                            gap: "12px",
                            marginBottom: "12px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: t("assets.serialNumber")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                        lineNumber: 357,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: fSerial,
                                        onChange: (e)=>setFSerial(e.target.value),
                                        style: {
                                            ...formInputStyle,
                                            fontFamily: "var(--font-mono)"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                        lineNumber: 358,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                lineNumber: 356,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: t("assets.assignedTo")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                        lineNumber: 361,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: fAssignedTo,
                                        onChange: (e)=>setFAssignedTo(e.target.value),
                                        style: formInputStyle
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                        lineNumber: 362,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                lineNumber: 360,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: t("assets.status")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                        lineNumber: 365,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: fStatus,
                                        onChange: (e)=>setFStatus(e.target.value),
                                        style: {
                                            ...formInputStyle,
                                            cursor: "pointer"
                                        },
                                        children: Object.entries(STATUS_LABEL_KEYS).map(([v, k])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: v,
                                                children: t(k)
                                            }, v, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                                lineNumber: 367,
                                                columnNumber: 60
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                        lineNumber: 366,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                lineNumber: 364,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: t("assets.sensitivity")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                        lineNumber: 371,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: fSensitivity,
                                        onChange: (e)=>setFSensitivity(e.target.value),
                                        style: {
                                            ...formInputStyle,
                                            cursor: "pointer"
                                        },
                                        children: Object.entries(SENSITIVITY_LABEL_KEYS).map(([v, k])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: v,
                                                children: t(k)
                                            }, v, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                                lineNumber: 373,
                                                columnNumber: 65
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                        lineNumber: 372,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                lineNumber: 370,
                                columnNumber: 7
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                        lineNumber: 355,
                        columnNumber: 6
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr",
                            gap: "12px",
                            marginBottom: "12px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: t("assets.warrantyExpiry")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                        lineNumber: 381,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "date",
                                        value: fWarranty,
                                        onChange: (e)=>setFWarranty(e.target.value),
                                        style: {
                                            ...formInputStyle,
                                            cursor: "pointer"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                        lineNumber: 382,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                lineNumber: 380,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: t("assets.purchasedAt")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                        lineNumber: 385,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "date",
                                        value: fPurchasedAt,
                                        onChange: (e)=>setFPurchasedAt(e.target.value),
                                        style: {
                                            ...formInputStyle,
                                            cursor: "pointer"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                        lineNumber: 386,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                lineNumber: 384,
                                columnNumber: 7
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                        lineNumber: 379,
                        columnNumber: 6
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: "12px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: labelStyle,
                                children: [
                                    t("assets.notes"),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            marginLeft: "6px",
                                            color: "var(--con-muted)",
                                            fontSize: "9px",
                                            fontWeight: 400,
                                            textTransform: "none",
                                            letterSpacing: 0
                                        },
                                        children: t("assets.notesHint")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                        lineNumber: 394,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                lineNumber: 392,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: fNotes,
                                onChange: (e)=>setFNotes(e.target.value),
                                rows: 2,
                                style: {
                                    ...formInputStyle,
                                    resize: "vertical"
                                }
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                lineNumber: 398,
                                columnNumber: 7
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                        lineNumber: 391,
                        columnNumber: 6
                    }, this),
                    formError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                            color: "#dc2626",
                            marginBottom: "10px"
                        },
                        children: formError
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                        lineNumber: 407,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: "8px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: formPending,
                                style: {
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "10px",
                                    fontWeight: 600,
                                    letterSpacing: "0.04em",
                                    background: "var(--accent)",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "4px",
                                    padding: "6px 14px",
                                    cursor: "pointer",
                                    opacity: formPending ? 0.6 : 1
                                },
                                children: formPending ? t("assets.creating") : t("assets.create")
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                lineNumber: 411,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>{
                                    setShowForm(false);
                                    resetForm();
                                },
                                style: {
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "10px",
                                    color: "var(--con-muted)",
                                    background: "transparent",
                                    border: "1px solid var(--con-border)",
                                    borderRadius: "4px",
                                    padding: "6px 12px",
                                    cursor: "pointer"
                                },
                                children: t("common.cancel")
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                lineNumber: 422,
                                columnNumber: 7
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                        lineNumber: 410,
                        columnNumber: 6
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                lineNumber: 316,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    gap: "8px",
                    marginBottom: "12px",
                    flexWrap: "wrap"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: search,
                        onChange: (e)=>setSearch(e.target.value),
                        placeholder: t("assets.searchPlaceholder"),
                        style: {
                            ...inputStyle,
                            minWidth: "200px",
                            cursor: "text"
                        }
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                        lineNumber: 439,
                        columnNumber: 5
                    }, this),
                    !isEmbedded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: clientId,
                        onChange: (e)=>handleFilterChange("client", e.target.value),
                        style: inputStyle,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: t("assets.allClients")
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                lineNumber: 452,
                                columnNumber: 7
                            }, this),
                            clients.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: c.id,
                                    children: c.name
                                }, c.id, false, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                    lineNumber: 453,
                                    columnNumber: 27
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                        lineNumber: 447,
                        columnNumber: 6
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: typeFilter,
                        onChange: (e)=>handleFilterChange("type", e.target.value),
                        style: inputStyle,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: t("assets.allTypes")
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                lineNumber: 457,
                                columnNumber: 6
                            }, this),
                            Object.entries(TYPE_LABEL_KEYS).map(([v, k])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: v,
                                    children: t(k)
                                }, v, false, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                    lineNumber: 458,
                                    columnNumber: 55
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                        lineNumber: 456,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: statusFilter,
                        onChange: (e)=>handleFilterChange("status", e.target.value),
                        style: inputStyle,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: t("assets.allStatuses")
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                lineNumber: 461,
                                columnNumber: 6
                            }, this),
                            Object.entries(STATUS_LABEL_KEYS).map(([v, k])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: v,
                                    children: t(k)
                                }, v, false, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                    lineNumber: 462,
                                    columnNumber: 57
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                        lineNumber: 460,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                lineNumber: 438,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "var(--con-surface)",
                    border: "1px solid var(--con-border)",
                    borderRadius: "4px",
                    overflow: "hidden"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    style: {
                        width: "100%",
                        borderCollapse: "collapse"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    !isEmbedded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: TH,
                                        children: t("assets.client")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                        lineNumber: 471,
                                        columnNumber: 24
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: TH,
                                        children: t("assets.name")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                        lineNumber: 472,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: TH,
                                        children: t("assets.type")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                        lineNumber: 473,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: TH,
                                        children: t("assets.assignedTo")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                        lineNumber: 474,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: TH,
                                        children: t("assets.status")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                        lineNumber: 475,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: TH,
                                        children: t("assets.warrantyExpiry")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                        lineNumber: 476,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: TH,
                                        children: t("assets.sensitivity")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                        lineNumber: 477,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                lineNumber: 470,
                                columnNumber: 7
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                            lineNumber: 469,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: filtered.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    colSpan: isEmbedded ? 6 : 7,
                                    style: {
                                        ...TD,
                                        color: "var(--con-muted)",
                                        textAlign: "center",
                                        padding: "24px"
                                    },
                                    children: t("assets.emptyState")
                                }, void 0, false, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                    lineNumber: 483,
                                    columnNumber: 9
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                lineNumber: 482,
                                columnNumber: 8
                            }, this) : filtered.map((asset)=>{
                                const sensitivityColors = SENSITIVITY_COLORS[asset.sensitivity];
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    style: {
                                        cursor: "pointer"
                                    },
                                    onClick: ()=>router.push(`/assets/${asset.id}`),
                                    onMouseEnter: (e)=>e.currentTarget.style.background = "var(--con-hover, rgba(148,163,184,0.05))",
                                    onMouseLeave: (e)=>e.currentTarget.style.background = "",
                                    children: [
                                        !isEmbedded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: TD,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: `/clients/${asset.client.id}`,
                                                onClick: (e)=>e.stopPropagation(),
                                                style: {
                                                    color: "var(--con-text)",
                                                    textDecoration: "none"
                                                },
                                                children: asset.client.name
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                                lineNumber: 503,
                                                columnNumber: 13
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                            lineNumber: 502,
                                            columnNumber: 12
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                ...TD,
                                                fontWeight: 500
                                            },
                                            children: asset.name
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                            lineNumber: 512,
                                            columnNumber: 11
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: TD,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                                label: t(TYPE_LABEL_KEYS[asset.type] ?? "assets.typeHardware"),
                                                colors: TYPE_COLORS[asset.type] ?? TYPE_COLORS.hardware
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                                lineNumber: 514,
                                                columnNumber: 12
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                            lineNumber: 513,
                                            columnNumber: 11
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                ...TD,
                                                color: asset.assignedTo ? "var(--con-text)" : "var(--con-muted)"
                                            },
                                            children: asset.assignedTo ?? "—"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                            lineNumber: 519,
                                            columnNumber: 11
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: TD,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                                label: t(STATUS_LABEL_KEYS[asset.status] ?? "assets.statusOk"),
                                                colors: STATUS_COLORS[asset.status] ?? STATUS_COLORS.ok
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                                lineNumber: 523,
                                                columnNumber: 12
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                            lineNumber: 522,
                                            columnNumber: 11
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: TD,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WarrantyCell, {
                                                dateStr: asset.warrantyExpiresAt,
                                                t: t
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                                lineNumber: 529,
                                                columnNumber: 12
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                            lineNumber: 528,
                                            columnNumber: 11
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: TD,
                                            children: sensitivityColors ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                                label: t(SENSITIVITY_LABEL_KEYS[asset.sensitivity]),
                                                colors: sensitivityColors
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                                lineNumber: 533,
                                                columnNumber: 13
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: "var(--con-muted)"
                                                },
                                                children: "—"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                                lineNumber: 538,
                                                columnNumber: 13
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                            lineNumber: 531,
                                            columnNumber: 11
                                        }, this)
                                    ]
                                }, asset.id, true, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                                    lineNumber: 494,
                                    columnNumber: 10
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                            lineNumber: 480,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                    lineNumber: 468,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
                lineNumber: 467,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx",
        lineNumber: 285,
        columnNumber: 3
    }, this);
}
_s(AssetsView, "FOlYBu8BE1Qy2FlHyqLY6gkhGM0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$main$2f$components$2f$LangProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c2 = AssetsView;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Badge");
__turbopack_context__.k.register(_c1, "WarrantyCell");
__turbopack_context__.k.register(_c2, "AssetsView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ContractsView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$main$2f$components$2f$LangProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/main/components/LangProvider.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
// ─── Styles ───────────────────────────────────────────────────────────────────
const TH = {
    fontFamily: "var(--font-mono)",
    fontSize: "9px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--con-subtle)",
    padding: "8px 12px",
    textAlign: "left",
    fontWeight: 500,
    borderBottom: "1px solid var(--con-border)"
};
const TD = {
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    color: "var(--con-text)",
    padding: "10px 12px",
    borderBottom: "1px solid var(--con-border)",
    whiteSpace: "nowrap"
};
const inputStyle = {
    background: "var(--con-bg)",
    border: "1px solid var(--con-border)",
    borderRadius: "4px",
    padding: "6px 10px",
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    color: "var(--con-text)",
    outline: "none",
    cursor: "pointer"
};
const labelStyle = {
    display: "block",
    fontFamily: "var(--font-mono)",
    fontSize: "9px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--con-subtle)",
    marginBottom: "5px"
};
const TYPE_COLORS = {
    software: {
        bg: "rgba(139,92,246,0.12)",
        color: "#7c3aed"
    },
    hardware: {
        bg: "rgba(37,99,235,0.12)",
        color: "var(--accent)"
    },
    service: {
        bg: "rgba(20,184,166,0.12)",
        color: "#0f766e"
    },
    retainer: {
        bg: "rgba(15,23,42,0.15)",
        color: "var(--con-text)"
    }
};
function Badge({ label, colors }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
            display: "inline-block",
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            padding: "2px 6px",
            borderRadius: "3px",
            background: colors.bg,
            color: colors.color,
            fontWeight: 600
        },
        children: label
    }, void 0, false, {
        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
        lineNumber: 86,
        columnNumber: 3
    }, this);
}
_c = Badge;
// ─── Renewal urgency helpers ──────────────────────────────────────────────────
function getRenewalStyle(days) {
    if (days < 0) return {
        color: "#dc2626",
        fontWeight: 700
    };
    if (days <= 30) return {
        color: "#dc2626",
        fontWeight: 700
    };
    if (days <= 90) return {
        color: "#ca8a04",
        fontWeight: 600
    };
    return {
        color: "#16a34a"
    };
}
function getRenewalRowBg(days) {
    if (days < 0) return "rgba(220,38,38,0.06)";
    return "";
}
function DaysCell({ days, t }) {
    if (days < 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            style: {
                display: "flex",
                alignItems: "center",
                gap: "6px"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        fontFamily: "var(--font-mono)",
                        fontSize: "9px",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        padding: "2px 6px",
                        borderRadius: "3px",
                        background: "#dc2626",
                        color: "#fff",
                        fontWeight: 700
                    },
                    children: t("contracts.overdue")
                }, void 0, false, {
                    fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                    lineNumber: 121,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        color: "#dc2626",
                        fontWeight: 700
                    },
                    children: [
                        Math.abs(days),
                        "d"
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                    lineNumber: 128,
                    columnNumber: 5
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
            lineNumber: 120,
            columnNumber: 4
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
            ...getRenewalStyle(days),
            fontFamily: "var(--font-mono)",
            fontSize: "12px"
        },
        children: t("contracts.daysLeft", {
            n: days
        })
    }, void 0, false, {
        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
        lineNumber: 135,
        columnNumber: 3
    }, this);
}
_c1 = DaysCell;
// ─── Inline edit row ──────────────────────────────────────────────────────────
function EditRow({ contract, onSave, onCancel, onDelete, clients, isEmbedded, t }) {
    _s();
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(contract.name);
    const [vendor, setVendor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(contract.vendor ?? "");
    const [type, setType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(contract.type);
    const [renewalDate, setRenewalDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(contract.renewalDate);
    const [costPerYear, setCostPerYear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(contract.costPerYear != null ? String(contract.costPerYear) : "");
    const [autoRenews, setAutoRenews] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(contract.autoRenews);
    const [notes, setNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(contract.notes ?? "");
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [confirmDelete, setConfirmDelete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [deleting, setDeleting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const TYPE_LABELS = {
        software: t("contracts.typeSoftware"),
        hardware: t("contracts.typeHardware"),
        service: t("contracts.typeService"),
        retainer: t("contracts.typeRetainer")
    };
    const cellInput = {
        background: "var(--con-bg)",
        border: "1px solid var(--con-border)",
        borderRadius: "3px",
        padding: "4px 7px",
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        color: "var(--con-text)",
        outline: "none",
        width: "100%"
    };
    async function handleSave() {
        setSaving(true);
        await onSave({
            name,
            vendor: vendor || null,
            type,
            renewalDate,
            costPerYear: costPerYear ? Number(costPerYear) : null,
            autoRenews,
            notes: notes || null
        });
        setSaving(false);
    }
    async function handleDelete() {
        setDeleting(true);
        await onDelete();
    }
    const colSpan = isEmbedded ? 7 : 8;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
        style: {
            background: "var(--con-surface)"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
            colSpan: colSpan,
            style: {
                padding: "12px 16px",
                borderBottom: "1px solid var(--con-border)"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "grid",
                        gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr auto auto",
                        gap: "8px",
                        alignItems: "end",
                        marginBottom: "8px"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: labelStyle,
                                    children: t("contracts.name")
                                }, void 0, false, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                    lineNumber: 206,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: name,
                                    onChange: (e)=>setName(e.target.value),
                                    style: cellInput
                                }, void 0, false, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                    lineNumber: 207,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                            lineNumber: 205,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: labelStyle,
                                    children: t("contracts.vendor")
                                }, void 0, false, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                    lineNumber: 210,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: vendor,
                                    onChange: (e)=>setVendor(e.target.value),
                                    style: cellInput
                                }, void 0, false, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                    lineNumber: 211,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                            lineNumber: 209,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: labelStyle,
                                    children: t("contracts.type")
                                }, void 0, false, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                    lineNumber: 214,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: type,
                                    onChange: (e)=>setType(e.target.value),
                                    style: {
                                        ...cellInput,
                                        cursor: "pointer"
                                    },
                                    children: Object.entries(TYPE_LABELS).map(([v, l])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: v,
                                            children: l
                                        }, v, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                            lineNumber: 216,
                                            columnNumber: 53
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                    lineNumber: 215,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                            lineNumber: 213,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: labelStyle,
                                    children: t("contracts.renewalDate")
                                }, void 0, false, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                    lineNumber: 220,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "date",
                                    value: renewalDate,
                                    onChange: (e)=>setRenewalDate(e.target.value),
                                    style: {
                                        ...cellInput,
                                        cursor: "pointer"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                    lineNumber: 221,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                            lineNumber: 219,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: labelStyle,
                                    children: t("contracts.costPerYear")
                                }, void 0, false, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                    lineNumber: 224,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    min: "0",
                                    step: "0.01",
                                    value: costPerYear,
                                    onChange: (e)=>setCostPerYear(e.target.value),
                                    style: cellInput
                                }, void 0, false, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                    lineNumber: 225,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                            lineNumber: 223,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: labelStyle,
                                    children: t("contracts.autoRenews")
                                }, void 0, false, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                    lineNumber: 228,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "5px",
                                        marginTop: "6px",
                                        cursor: "pointer"
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: autoRenews,
                                        onChange: (e)=>setAutoRenews(e.target.checked)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                        lineNumber: 230,
                                        columnNumber: 8
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                    lineNumber: 229,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                            lineNumber: 227,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                    lineNumber: 204,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: "8px"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            style: labelStyle,
                            children: [
                                t("contracts.notes"),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        marginLeft: "6px",
                                        color: "var(--con-muted)",
                                        fontWeight: 400,
                                        textTransform: "none",
                                        letterSpacing: 0
                                    },
                                    children: t("contracts.notesHint")
                                }, void 0, false, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                    lineNumber: 237,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                            lineNumber: 235,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            value: notes,
                            onChange: (e)=>setNotes(e.target.value),
                            rows: 2,
                            style: {
                                ...cellInput,
                                resize: "vertical",
                                width: "100%"
                            }
                        }, void 0, false, {
                            fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                            lineNumber: 241,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                    lineNumber: 234,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        gap: "8px",
                        alignItems: "center"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleSave,
                            disabled: saving,
                            style: {
                                fontFamily: "var(--font-mono)",
                                fontSize: "10px",
                                fontWeight: 600,
                                background: "var(--accent)",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                padding: "5px 12px",
                                cursor: "pointer",
                                opacity: saving ? 0.6 : 1
                            },
                            children: saving ? t("contracts.saving") : t("contracts.save")
                        }, void 0, false, {
                            fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                            lineNumber: 249,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onCancel,
                            style: {
                                fontFamily: "var(--font-mono)",
                                fontSize: "10px",
                                color: "var(--con-muted)",
                                background: "transparent",
                                border: "1px solid var(--con-border)",
                                borderRadius: "4px",
                                padding: "5px 10px",
                                cursor: "pointer"
                            },
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                            lineNumber: 261,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginLeft: "auto"
                            },
                            children: !confirmDelete ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setConfirmDelete(true),
                                style: {
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "10px",
                                    color: "#dc2626",
                                    background: "transparent",
                                    border: "1px solid rgba(220,38,38,0.3)",
                                    borderRadius: "4px",
                                    padding: "5px 10px",
                                    cursor: "pointer"
                                },
                                children: t("contracts.delete")
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                lineNumber: 274,
                                columnNumber: 8
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "10px",
                                            color: "#dc2626"
                                        },
                                        children: t("contracts.confirmDelete")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                        lineNumber: 287,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: handleDelete,
                                        disabled: deleting,
                                        style: {
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "10px",
                                            fontWeight: 600,
                                            background: "#dc2626",
                                            color: "#fff",
                                            border: "none",
                                            borderRadius: "4px",
                                            padding: "4px 10px",
                                            cursor: "pointer"
                                        },
                                        children: t("contracts.delete")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                        lineNumber: 290,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setConfirmDelete(false),
                                        style: {
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "10px",
                                            color: "var(--con-muted)",
                                            background: "transparent",
                                            border: "1px solid var(--con-border)",
                                            borderRadius: "4px",
                                            padding: "4px 8px",
                                            cursor: "pointer"
                                        },
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                        lineNumber: 302,
                                        columnNumber: 9
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                lineNumber: 286,
                                columnNumber: 8
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                            lineNumber: 272,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                    lineNumber: 248,
                    columnNumber: 5
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
            lineNumber: 203,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
        lineNumber: 202,
        columnNumber: 3
    }, this);
}
_s(EditRow, "U//WzpURGihcziJa7+MfNCK4O7U=");
_c2 = EditRow;
function ContractsView({ contracts: initial, clients, filterClientId, filterType, embeddedClientId }) {
    _s1();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$main$2f$components$2f$LangProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const isEmbedded = Boolean(embeddedClientId);
    const [contracts, setContracts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initial);
    const [clientId, setClientId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(filterClientId ?? "");
    const [typeFilter, setTypeFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(filterType ?? "");
    const [editingId, setEditingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Add form state
    const [showForm, setShowForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [formPending, setFormPending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [formError, setFormError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [fClientId, setFClientId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(embeddedClientId ?? clients[0]?.id ?? "");
    const [fName, setFName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [fVendor, setFVendor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [fType, setFType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("software");
    const [fRenewalDate, setFRenewalDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [fCostPerYear, setFCostPerYear] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [fAutoRenews, setFAutoRenews] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [fNotes, setFNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const TYPE_LABELS = {
        software: t("contracts.typeSoftware"),
        hardware: t("contracts.typeHardware"),
        service: t("contracts.typeService"),
        retainer: t("contracts.typeRetainer")
    };
    function applyFilters(c, tp) {
        if (isEmbedded) return;
        const params = new URLSearchParams();
        if (c) params.set("clientId", c);
        if (tp) params.set("type", tp);
        const qs = params.toString();
        router.push(qs ? `/contracts?${qs}` : "/contracts");
    }
    function handleFilterChange(field, value) {
        const next = {
            c: clientId,
            tp: typeFilter
        };
        if (field === "client") {
            setClientId(value);
            next.c = value;
        }
        if (field === "type") {
            setTypeFilter(value);
            next.tp = value;
        }
        applyFilters(next.c, next.tp);
    }
    function resetForm() {
        setFClientId(embeddedClientId ?? clients[0]?.id ?? "");
        setFName("");
        setFVendor("");
        setFType("software");
        setFRenewalDate("");
        setFCostPerYear("");
        setFAutoRenews(false);
        setFNotes("");
        setFormError(null);
    }
    async function handleCreate(e) {
        e.preventDefault();
        setFormPending(true);
        setFormError(null);
        const res = await fetch("/api/contracts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                clientId: fClientId,
                name: fName,
                vendor: fVendor || undefined,
                type: fType,
                renewalDate: fRenewalDate,
                costPerYear: fCostPerYear ? Number(fCostPerYear) : undefined,
                autoRenews: fAutoRenews,
                notes: fNotes || undefined
            })
        });
        setFormPending(false);
        if (!res.ok) {
            const data = await res.json().catch(()=>({}));
            setFormError(data.error ?? t("common.error"));
            return;
        }
        const created = await res.json();
        setContracts((prev)=>[
                ...prev,
                created
            ].sort((a, b)=>a.renewalDate.localeCompare(b.renewalDate)));
        resetForm();
        setShowForm(false);
    }
    async function handleSave(id, data) {
        const res = await fetch(`/api/contracts/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (res.ok) {
            const updated = await res.json();
            setContracts((prev)=>prev.map((c)=>c.id === id ? updated : c).sort((a, b)=>a.renewalDate.localeCompare(b.renewalDate)));
        }
        setEditingId(null);
    }
    async function handleDelete(id) {
        const res = await fetch(`/api/contracts/${id}`, {
            method: "DELETE"
        });
        if (res.ok) {
            setContracts((prev)=>prev.filter((c)=>c.id !== id));
            setEditingId(null);
        }
    }
    const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ContractsView.useMemo[filtered]": ()=>{
            return contracts.filter({
                "ContractsView.useMemo[filtered]": (c)=>{
                    if (isEmbedded && c.client.id !== embeddedClientId) return false;
                    if (!isEmbedded && clientId && c.client.id !== clientId) return false;
                    if (typeFilter && c.type !== typeFilter) return false;
                    return true;
                }
            }["ContractsView.useMemo[filtered]"]);
        }
    }["ContractsView.useMemo[filtered]"], [
        contracts,
        clientId,
        typeFilter,
        isEmbedded,
        embeddedClientId
    ]);
    // Renewal summary for embedded mode
    const renewingSoon = filtered.filter((c)=>c.daysUntilRenewal >= 0 && c.daysUntilRenewal <= 60).length;
    const overdue = filtered.filter((c)=>c.daysUntilRenewal < 0).length;
    const formInputStyle = {
        width: "100%",
        background: "var(--con-bg)",
        border: "1px solid var(--con-border)",
        borderRadius: "4px",
        padding: "7px 10px",
        fontFamily: "var(--font-mono)",
        fontSize: "12px",
        color: "var(--con-text)",
        outline: "none"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "12px"
                },
                children: [
                    !isEmbedded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        style: {
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "var(--con-subtle)"
                        },
                        children: t("contracts.title")
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                        lineNumber: 462,
                        columnNumber: 6
                    }, this),
                    isEmbedded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                        lineNumber: 466,
                        columnNumber: 20
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>{
                            setShowForm((v)=>!v);
                            if (showForm) resetForm();
                        },
                        style: {
                            fontFamily: "var(--font-mono)",
                            fontSize: "10px",
                            fontWeight: 600,
                            letterSpacing: "0.04em",
                            background: showForm ? "transparent" : "var(--accent)",
                            color: showForm ? "var(--con-muted)" : "#fff",
                            border: showForm ? "1px solid var(--con-border)" : "none",
                            borderRadius: "4px",
                            padding: "6px 12px",
                            cursor: "pointer"
                        },
                        children: showForm ? t("common.cancel") : `+ ${t("contracts.newContract")}`
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                        lineNumber: 467,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                lineNumber: 460,
                columnNumber: 4
            }, this),
            (renewingSoon > 0 || overdue > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    gap: "12px",
                    marginBottom: "12px",
                    flexWrap: "wrap"
                },
                children: [
                    overdue > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: "rgba(220,38,38,0.08)",
                            border: "1px solid rgba(220,38,38,0.3)",
                            borderRadius: "4px",
                            padding: "8px 14px",
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                            color: "#dc2626",
                            fontWeight: 700,
                            letterSpacing: "0.02em"
                        },
                        children: [
                            "⚠ ",
                            overdue,
                            " ",
                            overdue === 1 ? "contract" : "contracts",
                            " overdue"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                        lineNumber: 491,
                        columnNumber: 7
                    }, this),
                    renewingSoon > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: "rgba(234,179,8,0.08)",
                            border: "1px solid rgba(234,179,8,0.3)",
                            borderRadius: "4px",
                            padding: "8px 14px",
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                            color: "#b45309",
                            fontWeight: 600,
                            letterSpacing: "0.02em"
                        },
                        children: t("contracts.renewalSummary", {
                            n: renewingSoon
                        })
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                        lineNumber: 506,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                lineNumber: 484,
                columnNumber: 5
            }, this),
            showForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleCreate,
                style: {
                    background: "var(--con-surface)",
                    border: "1px solid var(--con-border)",
                    borderRadius: "4px",
                    padding: "16px",
                    marginBottom: "12px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: isEmbedded ? "2fr 1fr 1fr 1fr" : "1fr 2fr 1fr 1fr 1fr",
                            gap: "12px",
                            marginBottom: "12px"
                        },
                        children: [
                            !isEmbedded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: t("contracts.client")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                        lineNumber: 538,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: fClientId,
                                        onChange: (e)=>setFClientId(e.target.value),
                                        style: {
                                            ...formInputStyle,
                                            cursor: "pointer"
                                        },
                                        children: clients.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: c.id,
                                                children: c.name
                                            }, c.id, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                                lineNumber: 540,
                                                columnNumber: 30
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                        lineNumber: 539,
                                        columnNumber: 9
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                lineNumber: 537,
                                columnNumber: 8
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: t("contracts.name")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                        lineNumber: 545,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        required: true,
                                        value: fName,
                                        onChange: (e)=>setFName(e.target.value),
                                        placeholder: "e.g. Sophos Endpoint",
                                        style: formInputStyle
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                        lineNumber: 546,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                lineNumber: 544,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: t("contracts.vendor")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                        lineNumber: 549,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: fVendor,
                                        onChange: (e)=>setFVendor(e.target.value),
                                        style: formInputStyle
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                        lineNumber: 550,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                lineNumber: 548,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: t("contracts.type")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                        lineNumber: 553,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: fType,
                                        onChange: (e)=>setFType(e.target.value),
                                        style: {
                                            ...formInputStyle,
                                            cursor: "pointer"
                                        },
                                        children: Object.entries(TYPE_LABELS).map(([v, l])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: v,
                                                children: l
                                            }, v, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                                lineNumber: 555,
                                                columnNumber: 54
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                        lineNumber: 554,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                lineNumber: 552,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: t("contracts.renewalDate")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                        lineNumber: 559,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        required: true,
                                        type: "date",
                                        value: fRenewalDate,
                                        onChange: (e)=>setFRenewalDate(e.target.value),
                                        style: {
                                            ...formInputStyle,
                                            cursor: "pointer"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                        lineNumber: 560,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                lineNumber: 558,
                                columnNumber: 7
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                        lineNumber: 535,
                        columnNumber: 6
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr",
                            gap: "12px",
                            marginBottom: "12px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: [
                                            t("contracts.costPerYear"),
                                            " (",
                                            t("contracts.costPerYearLabel"),
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                        lineNumber: 565,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        min: "0",
                                        step: "0.01",
                                        value: fCostPerYear,
                                        onChange: (e)=>setFCostPerYear(e.target.value),
                                        style: formInputStyle
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                        lineNumber: 566,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                lineNumber: 564,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: t("contracts.autoRenews")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                        lineNumber: 569,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            marginTop: "9px",
                                            cursor: "pointer"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: fAutoRenews,
                                                onChange: (e)=>setFAutoRenews(e.target.checked)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                                lineNumber: 571,
                                                columnNumber: 9
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "var(--font-mono)",
                                                    fontSize: "12px",
                                                    color: "var(--con-text)"
                                                },
                                                children: fAutoRenews ? t("contracts.autoRenewsYes") : t("contracts.autoRenewsNo")
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                                lineNumber: 572,
                                                columnNumber: 9
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                        lineNumber: 570,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                lineNumber: 568,
                                columnNumber: 7
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                        lineNumber: 563,
                        columnNumber: 6
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: "12px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: labelStyle,
                                children: [
                                    t("contracts.notes"),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            marginLeft: "6px",
                                            color: "var(--con-muted)",
                                            fontWeight: 400,
                                            textTransform: "none",
                                            letterSpacing: 0
                                        },
                                        children: [
                                            "— ",
                                            t("contracts.notesHint")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                        lineNumber: 581,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                lineNumber: 579,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: fNotes,
                                onChange: (e)=>setFNotes(e.target.value),
                                rows: 2,
                                style: {
                                    ...formInputStyle,
                                    resize: "vertical"
                                }
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                lineNumber: 585,
                                columnNumber: 7
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                        lineNumber: 578,
                        columnNumber: 6
                    }, this),
                    formError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                            color: "#dc2626",
                            marginBottom: "10px"
                        },
                        children: formError
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                        lineNumber: 588,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: "8px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: formPending,
                                style: {
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "10px",
                                    fontWeight: 600,
                                    background: "var(--accent)",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "4px",
                                    padding: "6px 14px",
                                    cursor: "pointer",
                                    opacity: formPending ? 0.6 : 1
                                },
                                children: formPending ? t("contracts.creating") : t("contracts.create")
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                lineNumber: 591,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>{
                                    setShowForm(false);
                                    resetForm();
                                },
                                style: {
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "10px",
                                    color: "var(--con-muted)",
                                    background: "transparent",
                                    border: "1px solid var(--con-border)",
                                    borderRadius: "4px",
                                    padding: "6px 12px",
                                    cursor: "pointer"
                                },
                                children: t("common.cancel")
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                lineNumber: 602,
                                columnNumber: 7
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                        lineNumber: 590,
                        columnNumber: 6
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                lineNumber: 525,
                columnNumber: 5
            }, this),
            !isEmbedded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    gap: "8px",
                    marginBottom: "12px",
                    flexWrap: "wrap"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: clientId,
                        onChange: (e)=>handleFilterChange("client", e.target.value),
                        style: inputStyle,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: t("contracts.allClients")
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                lineNumber: 621,
                                columnNumber: 7
                            }, this),
                            clients.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: c.id,
                                    children: c.name
                                }, c.id, false, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                    lineNumber: 622,
                                    columnNumber: 27
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                        lineNumber: 620,
                        columnNumber: 6
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: typeFilter,
                        onChange: (e)=>handleFilterChange("type", e.target.value),
                        style: inputStyle,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: t("contracts.allTypes")
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                lineNumber: 625,
                                columnNumber: 7
                            }, this),
                            Object.entries(TYPE_LABELS).map(([v, l])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: v,
                                    children: l
                                }, v, false, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                    lineNumber: 626,
                                    columnNumber: 52
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                        lineNumber: 624,
                        columnNumber: 6
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                lineNumber: 619,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "var(--con-surface)",
                    border: "1px solid var(--con-border)",
                    borderRadius: "4px",
                    overflow: "hidden"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    style: {
                        width: "100%",
                        borderCollapse: "collapse"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    !isEmbedded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: TH,
                                        children: t("contracts.client")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                        lineNumber: 636,
                                        columnNumber: 24
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: TH,
                                        children: t("contracts.name")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                        lineNumber: 637,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: TH,
                                        children: t("contracts.vendor")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                        lineNumber: 638,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: TH,
                                        children: t("contracts.type")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                        lineNumber: 639,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: TH,
                                        children: t("contracts.renewalDate")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                        lineNumber: 640,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: TH,
                                        children: t("contracts.daysUntilRenewal")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                        lineNumber: 641,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: TH,
                                        children: t("contracts.costPerYear")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                        lineNumber: 642,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: TH,
                                        children: t("contracts.autoRenews")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                        lineNumber: 643,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                lineNumber: 635,
                                columnNumber: 7
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                            lineNumber: 634,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: filtered.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    colSpan: isEmbedded ? 7 : 8,
                                    style: {
                                        ...TD,
                                        color: "var(--con-muted)",
                                        textAlign: "center",
                                        padding: "24px"
                                    },
                                    children: t("contracts.emptyState")
                                }, void 0, false, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                    lineNumber: 649,
                                    columnNumber: 9
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                lineNumber: 648,
                                columnNumber: 8
                            }, this) : filtered.map((contract)=>{
                                if (editingId === contract.id) {
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EditRow, {
                                        contract: contract,
                                        onSave: (data)=>handleSave(contract.id, data),
                                        onCancel: ()=>setEditingId(null),
                                        onDelete: ()=>handleDelete(contract.id),
                                        clients: clients,
                                        isEmbedded: isEmbedded,
                                        t: t
                                    }, contract.id, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                        lineNumber: 660,
                                        columnNumber: 11
                                    }, this);
                                }
                                const rowBg = getRenewalRowBg(contract.daysUntilRenewal);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    style: {
                                        cursor: "pointer",
                                        background: rowBg
                                    },
                                    onClick: ()=>setEditingId(contract.id),
                                    onMouseEnter: (e)=>{
                                        if (!rowBg) e.currentTarget.style.background = "var(--con-hover, rgba(148,163,184,0.05))";
                                    },
                                    onMouseLeave: (e)=>{
                                        e.currentTarget.style.background = rowBg;
                                    },
                                    children: [
                                        !isEmbedded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: TD,
                                            children: contract.client.name
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                            lineNumber: 688,
                                            columnNumber: 12
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                ...TD,
                                                fontWeight: 500
                                            },
                                            children: contract.name
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                            lineNumber: 690,
                                            columnNumber: 11
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                ...TD,
                                                color: contract.vendor ? "var(--con-text)" : "var(--con-muted)"
                                            },
                                            children: contract.vendor ?? "—"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                            lineNumber: 691,
                                            columnNumber: 11
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: TD,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                                label: TYPE_LABELS[contract.type] ?? contract.type,
                                                colors: TYPE_COLORS[contract.type] ?? TYPE_COLORS.software
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                                lineNumber: 695,
                                                columnNumber: 12
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                            lineNumber: 694,
                                            columnNumber: 11
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                ...TD,
                                                ...getRenewalStyle(contract.daysUntilRenewal)
                                            },
                                            children: contract.renewalDate
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                            lineNumber: 700,
                                            columnNumber: 11
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: TD,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DaysCell, {
                                                days: contract.daysUntilRenewal,
                                                t: t
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                                lineNumber: 704,
                                                columnNumber: 12
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                            lineNumber: 703,
                                            columnNumber: 11
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                ...TD,
                                                color: contract.costPerYear ? "var(--con-text)" : "var(--con-muted)"
                                            },
                                            children: contract.costPerYear != null ? `€${contract.costPerYear.toLocaleString("fr-BE", {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 2
                                            })}` : "—"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                            lineNumber: 706,
                                            columnNumber: 11
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                ...TD,
                                                color: contract.autoRenews ? "#16a34a" : "var(--con-muted)"
                                            },
                                            children: contract.autoRenews ? t("contracts.autoRenewsYes") : t("contracts.autoRenewsNo")
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                            lineNumber: 711,
                                            columnNumber: 11
                                        }, this)
                                    ]
                                }, contract.id, true, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                                    lineNumber: 676,
                                    columnNumber: 10
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                            lineNumber: 646,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                    lineNumber: 633,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
                lineNumber: 632,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx",
        lineNumber: 458,
        columnNumber: 3
    }, this);
}
_s1(ContractsView, "OQP+BlmZ/SbByPqwHgUwg1hmikM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$main$2f$components$2f$LangProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c3 = ContractsView;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Badge");
__turbopack_context__.k.register(_c1, "DaysCell");
__turbopack_context__.k.register(_c2, "EditRow");
__turbopack_context__.k.register(_c3, "ContractsView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ClientDetailView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$main$2f$components$2f$LangProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/main/components/LangProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$main$2f$app$2f5b$locale$5d2f28$console$292f$clients$2f5b$clientId$5d2f$PortalUsersView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/main/app/[locale]/(console)/clients/[clientId]/PortalUsersView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$main$2f$app$2f5b$locale$5d2f28$console$292f$assets$2f$AssetsView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/main/app/[locale]/(console)/assets/AssetsView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$main$2f$app$2f5b$locale$5d2f28$console$292f$contracts$2f$ContractsView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/main/app/[locale]/(console)/contracts/ContractsView.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
// ─── Style constants ──────────────────────────────────────────────────────────
const TH = {
    fontFamily: "var(--font-mono)",
    fontSize: "9px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--con-subtle)",
    padding: "8px 12px",
    textAlign: "left",
    fontWeight: 500,
    borderBottom: "1px solid var(--con-border)"
};
const TD = {
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    color: "var(--con-text)",
    padding: "9px 12px",
    borderBottom: "1px solid var(--con-border)",
    whiteSpace: "nowrap"
};
const labelStyle = {
    display: "block",
    fontFamily: "var(--font-mono)",
    fontSize: "9px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--con-subtle)",
    marginBottom: "5px"
};
const inputStyle = {
    width: "100%",
    background: "var(--con-bg)",
    border: "1px solid var(--con-border)",
    borderRadius: "4px",
    padding: "7px 10px",
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    color: "var(--con-text)",
    outline: "none"
};
// ─── Shared helpers ───────────────────────────────────────────────────────────
function toHours(minutes) {
    const h = minutes / 60;
    return `${h % 1 === 0 ? h.toFixed(0) : h.toFixed(2)}h`;
}
const STATUS_STYLES = {
    open: {
        bg: "rgba(37,99,235,0.12)",
        color: "var(--accent)"
    },
    in_progress: {
        bg: "rgba(234,179,8,0.15)",
        color: "#ca8a04"
    },
    done: {
        bg: "rgba(34,197,94,0.12)",
        color: "#16a34a"
    },
    closed: {
        bg: "rgba(148,163,184,0.15)",
        color: "var(--con-muted)"
    }
};
const STATUS_LABEL_KEYS = {
    open: "tickets.statusOpen",
    in_progress: "tickets.statusInProgress",
    done: "tickets.statusDone",
    closed: "tickets.statusClosed"
};
const PRIORITY_STYLES = {
    low: {
        bg: "rgba(148,163,184,0.15)",
        color: "var(--con-muted)"
    },
    normal: {
        bg: "rgba(148,163,184,0.15)",
        color: "var(--con-text)"
    },
    high: {
        bg: "rgba(234,179,8,0.15)",
        color: "#ca8a04"
    },
    urgent: {
        bg: "rgba(239,68,68,0.12)",
        color: "#dc2626"
    }
};
const PRIORITY_LABEL_KEYS = {
    low: "tickets.priorityLow",
    normal: "tickets.priorityNormal",
    high: "tickets.priorityHigh",
    urgent: "tickets.priorityUrgent"
};
function Badge({ value, label, map }) {
    const s = map[value] ?? {
        bg: "rgba(148,163,184,0.15)",
        color: "var(--con-muted)"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
            display: "inline-block",
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            padding: "2px 6px",
            borderRadius: "3px",
            background: s.bg,
            color: s.color,
            fontWeight: 600
        },
        children: label
    }, void 0, false, {
        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
        lineNumber: 141,
        columnNumber: 3
    }, this);
}
_c = Badge;
function ClientDetailView({ client: initial, tickets: initialTickets, timeEntries, portalUsers, assets, contracts, initialTab = "overview" }) {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$main$2f$components$2f$LangProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [client, setClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initial);
    const [tickets, setTickets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialTickets);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialTab);
    // ── Overview edit ─────────────────────────────────────────────────────────
    const [editing, setEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editError, setEditError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [eName, setEName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initial.name);
    const [eContractType, setEContractType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initial.contractType);
    const [eHourlyRate, setEHourlyRate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(String(initial.hourlyRate));
    const [eLanguage, setELanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initial.language);
    const [eVat, setEVat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initial.vatNumber ?? "");
    const [eAddress, setEAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initial.address ?? "");
    const [eCity, setECity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initial.city ?? "");
    const [eRetainerHours, setERetainerHours] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(String(initial.retainerHours ?? ""));
    const [eRetainerFee, setERetainerFee] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(String(initial.retainerFee ?? ""));
    // Deactivate inline confirm
    const [confirmingDeactivate, setConfirmingDeactivate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // ── Time entries local state ───────────────────────────────────────────────
    const [entries, setEntries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(timeEntries);
    // Generate invoice modal
    function defaultPeriodStart() {
        const d = new Date();
        d.setDate(1);
        d.setMonth(d.getMonth() - 1);
        return d.toISOString().slice(0, 10);
    }
    function defaultPeriodEnd() {
        const d = new Date();
        d.setDate(0); // last day of previous month
        return d.toISOString().slice(0, 10);
    }
    function defaultDueDate() {
        const d = new Date();
        d.setDate(d.getDate() + 30);
        return d.toISOString().slice(0, 10);
    }
    const [showInvoiceModal, setShowInvoiceModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [invPeriodStart, setInvPeriodStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultPeriodStart);
    const [invPeriodEnd, setInvPeriodEnd] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultPeriodEnd);
    const [invDueDate, setInvDueDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultDueDate);
    const [invGenerating, setInvGenerating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [invError, setInvError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    async function handleGenerateInvoice() {
        setInvGenerating(true);
        setInvError(null);
        const res = await fetch("/api/invoices", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                clientId: client.id,
                periodStart: new Date(invPeriodStart).toISOString(),
                periodEnd: new Date(invPeriodEnd).toISOString(),
                dueDate: new Date(invDueDate).toISOString()
            })
        });
        setInvGenerating(false);
        if (!res.ok) {
            const d = await res.json().catch(()=>({}));
            setInvError(d.error ?? t("common.error"));
            return;
        }
        const invoice = await res.json();
        setShowInvoiceModal(false);
        router.push(`/billing/invoices/${invoice.id}`);
    }
    // Time entry edit
    const [editingEntryId, setEditingEntryId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editDesc, setEditDesc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [editDuration, setEditDuration] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [editRate, setEditRate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [editSaving, setEditSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    function startEditEntry(e) {
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
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                description: editDesc,
                durationMinutes: Number(editDuration),
                hourlyRate: Number(editRate)
            })
        });
        setEditSaving(false);
        if (res.ok) {
            const updated = await res.json();
            setEntries((prev)=>prev.map((e)=>e.id === editingEntryId ? {
                        ...e,
                        description: updated.description,
                        durationMinutes: updated.durationMinutes,
                        hourlyRate: Number(updated.hourlyRate)
                    } : e));
            setEditingEntryId(null);
        }
    }
    // Time entry delete
    const [deletingEntryId, setDeletingEntryId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    async function handleDeleteEntry(entryId) {
        const res = await fetch(`/api/time-entries/${entryId}`, {
            method: "DELETE"
        });
        if (res.ok) {
            setEntries((prev)=>prev.filter((e)=>e.id !== entryId));
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
    async function handleSaveClient(e) {
        e.preventDefault();
        setSaving(true);
        setEditError(null);
        const res = await fetch(`/api/clients/${client.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: eName,
                contractType: eContractType,
                hourlyRate: Number(eHourlyRate),
                language: eLanguage,
                vatNumber: eVat || null,
                address: eAddress || null,
                city: eCity || null,
                retainerHours: eRetainerHours ? Number(eRetainerHours) : null,
                retainerFee: eRetainerFee ? Number(eRetainerFee) : null
            })
        });
        setSaving(false);
        if (!res.ok) {
            const data = await res.json().catch(()=>({}));
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
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                isActive: false
            })
        });
        if (res.ok) {
            setClient((c)=>({
                    ...c,
                    isActive: false
                }));
            setConfirmingDeactivate(false);
        }
    }
    async function handleReactivate() {
        const res = await fetch(`/api/clients/${client.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                isActive: true
            })
        });
        if (res.ok) {
            setClient((c)=>({
                    ...c,
                    isActive: true
                }));
        }
    }
    // ── New ticket form ───────────────────────────────────────────────────────
    const [showTicketForm, setShowTicketForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [tPending, setTPending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [tError, setTError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [tTitle, setTTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [tDesc, setTDesc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [tPriority, setTPriority] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("normal");
    const [tSource, setTSource] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("manual");
    const [tBillable, setTBillable] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    function resetTicketForm() {
        setTTitle("");
        setTDesc("");
        setTPriority("normal");
        setTSource("manual");
        setTBillable(true);
        setTError(null);
    }
    async function handleCreateTicket(e) {
        e.preventDefault();
        setTPending(true);
        setTError(null);
        const res = await fetch("/api/tickets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                clientId: client.id,
                title: tTitle,
                description: tDesc || undefined,
                priority: tPriority,
                source: tSource,
                isBillable: tBillable
            })
        });
        setTPending(false);
        if (!res.ok) {
            const data = await res.json().catch(()=>({}));
            setTError(data.error ?? t("common.error"));
            return;
        }
        const newTicket = await res.json();
        setTickets((prev)=>[
                newTicket,
                ...prev
            ]);
        resetTicketForm();
        setShowTicketForm(false);
    }
    // ── Derived values ────────────────────────────────────────────────────────
    const openCount = tickets.filter((tk)=>tk.status === "open" || tk.status === "in_progress").length;
    const unbilledEntries = entries.filter((e)=>e.isBillable); // ALL billable entries including ticket-linked
    const totalUnbilledMinutes = entries.filter((e)=>e.isBillable).reduce((s, e)=>s + e.durationMinutes, 0);
    const totalUnbilledAmount = entries.filter((e)=>e.isBillable).reduce((s, e)=>s + e.durationMinutes / 60 * e.hourlyRate, 0);
    const activePortalUsers = portalUsers.filter((u)=>u.isActive).length;
    const langLabel = {
        fr: t("clients.langFr"),
        nl: t("clients.langNl"),
        en: t("clients.langEn")
    };
    // ── Tab bar ───────────────────────────────────────────────────────────────
    const TABS = [
        {
            key: "overview",
            label: t("clients.tabOverview")
        },
        {
            key: "tickets",
            label: `${t("clients.tabTickets")}${openCount > 0 ? ` · ${openCount}` : ""}`
        },
        {
            key: "time",
            label: totalUnbilledMinutes > 0 ? `${t("clients.tabTimeEntries")} · ${toHours(totalUnbilledMinutes)}` : t("clients.tabTimeEntries")
        },
        {
            key: "portal",
            label: `${t("clients.tabPortal")}${activePortalUsers > 0 ? ` · ${activePortalUsers}` : ""}`
        },
        {
            key: "assets",
            label: `${t("assets.tabAssets")}${assets.length > 0 ? ` · ${assets.length}` : ""}`
        },
        {
            key: "contracts",
            label: `${t("contracts.tabContracts")}${contracts.length > 0 ? ` · ${contracts.length}` : ""}`
        }
    ];
    function tabStyle(key) {
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
            whiteSpace: "nowrap"
        };
    }
    // ── Invoice modal preview values (period-filtered, entry-rate accurate) ───
    const periodStartTs = invPeriodStart ? new Date(invPeriodStart).getTime() : 0;
    const periodEndTs = invPeriodEnd ? new Date(invPeriodEnd).getTime() + 86400000 : Infinity; // inclusive end
    const previewEntries = unbilledEntries.filter((e)=>{
        const t = new Date(e.loggedAt).getTime();
        return t >= periodStartTs && t < periodEndTs;
    });
    const previewEntryCount = previewEntries.length;
    const previewHours = previewEntries.reduce((s, e)=>s + e.durationMinutes, 0) / 60;
    const retainerFee = client.retainerFee ?? 0;
    const retainerHours = client.retainerHours ?? 0;
    // For retainer: flat fee + extra hours at client rate (mirrors API logic)
    // For ad hoc: sum each entry's own hourlyRate snapshot
    const extraHoursPreview = Math.max(previewHours - retainerHours, 0);
    const previewSubtotal = client.contractType === "retainer" ? retainerFee + extraHoursPreview * client.hourlyRate : previewEntries.reduce((s, e)=>s + e.durationMinutes / 60 * e.hourlyRate, 0);
    const previewTotal = previewSubtotal * 1.21;
    // Fall back to all unbilled if no period matches (so user sees something useful)
    const allBillableCount = unbilledEntries.length;
    const allBillableHours = unbilledEntries.reduce((s, e)=>s + e.durationMinutes, 0) / 60;
    const modalInputStyle = {
        background: "var(--con-bg)",
        border: "1px solid var(--con-border)",
        borderRadius: "4px",
        padding: "7px 10px",
        fontFamily: "var(--font-mono)",
        fontSize: "12px",
        color: "var(--con-text)",
        outline: "none",
        width: "100%",
        boxSizing: "border-box"
    };
    // ─────────────────────────────────────────────────────────────────────────
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            showInvoiceModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.55)",
                    zIndex: 100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "24px"
                },
                onClick: (e)=>{
                    if (e.target === e.currentTarget) setShowInvoiceModal(false);
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: "var(--con-surface)",
                        border: "1px solid var(--con-border)",
                        borderRadius: "8px",
                        width: "100%",
                        maxWidth: "460px",
                        overflow: "hidden"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                background: "#0F172A",
                                padding: "14px 20px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "11px",
                                        fontWeight: 700,
                                        letterSpacing: "0.06em",
                                        textTransform: "uppercase",
                                        color: "#fff"
                                    },
                                    children: t("clients.generateInvoice")
                                }, void 0, false, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                    lineNumber: 506,
                                    columnNumber: 8
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setShowInvoiceModal(false),
                                    style: {
                                        background: "none",
                                        border: "none",
                                        color: "#64748b",
                                        cursor: "pointer",
                                        fontSize: "18px",
                                        lineHeight: 1
                                    },
                                    children: "×"
                                }, void 0, false, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                    lineNumber: 509,
                                    columnNumber: 8
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                            lineNumber: 505,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: "20px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "14px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr",
                                        gap: "12px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontFamily: "var(--font-mono)",
                                                        fontSize: "9px",
                                                        letterSpacing: "0.1em",
                                                        textTransform: "uppercase",
                                                        color: "var(--con-subtle)",
                                                        display: "block",
                                                        marginBottom: "5px"
                                                    },
                                                    children: t("clients.periodStartLabel")
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                    lineNumber: 522,
                                                    columnNumber: 10
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "date",
                                                    value: invPeriodStart,
                                                    onChange: (e)=>setInvPeriodStart(e.target.value),
                                                    style: modalInputStyle
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                    lineNumber: 525,
                                                    columnNumber: 10
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                            lineNumber: 521,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontFamily: "var(--font-mono)",
                                                        fontSize: "9px",
                                                        letterSpacing: "0.1em",
                                                        textTransform: "uppercase",
                                                        color: "var(--con-subtle)",
                                                        display: "block",
                                                        marginBottom: "5px"
                                                    },
                                                    children: t("clients.periodEndLabel")
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                    lineNumber: 528,
                                                    columnNumber: 10
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "date",
                                                    value: invPeriodEnd,
                                                    onChange: (e)=>setInvPeriodEnd(e.target.value),
                                                    style: modalInputStyle
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                    lineNumber: 531,
                                                    columnNumber: 10
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                            lineNumber: 527,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                    lineNumber: 520,
                                    columnNumber: 8
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontFamily: "var(--font-mono)",
                                                fontSize: "9px",
                                                letterSpacing: "0.1em",
                                                textTransform: "uppercase",
                                                color: "var(--con-subtle)",
                                                display: "block",
                                                marginBottom: "5px"
                                            },
                                            children: t("clients.dueDateLabel")
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                            lineNumber: 535,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "date",
                                            value: invDueDate,
                                            onChange: (e)=>setInvDueDate(e.target.value),
                                            style: modalInputStyle
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                            lineNumber: 538,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                    lineNumber: 534,
                                    columnNumber: 8
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: "rgba(37,99,235,0.06)",
                                        border: "1px solid rgba(37,99,235,0.15)",
                                        borderRadius: "4px",
                                        padding: "12px 14px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                marginBottom: "10px"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontFamily: "var(--font-mono)",
                                                        fontSize: "9px",
                                                        letterSpacing: "0.1em",
                                                        textTransform: "uppercase",
                                                        color: "var(--con-subtle)"
                                                    },
                                                    children: t("clients.invoicePreview")
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                    lineNumber: 544,
                                                    columnNumber: 10
                                                }, this),
                                                previewEntryCount > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontFamily: "var(--font-mono)",
                                                        fontSize: "9px",
                                                        color: "var(--con-subtle)"
                                                    },
                                                    children: [
                                                        previewEntryCount,
                                                        " ",
                                                        t("clients.entriesLabel"),
                                                        " · ",
                                                        previewHours.toFixed(2),
                                                        "h"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                    lineNumber: 548,
                                                    columnNumber: 11
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontFamily: "var(--font-mono)",
                                                        fontSize: "9px",
                                                        color: "var(--con-subtle)"
                                                    },
                                                    children: [
                                                        allBillableCount,
                                                        " ",
                                                        t("clients.entriesLabel"),
                                                        " · ",
                                                        allBillableHours.toFixed(2),
                                                        "h ",
                                                        t("clients.allPeriods")
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                    lineNumber: 552,
                                                    columnNumber: 11
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                            lineNumber: 543,
                                            columnNumber: 9
                                        }, this),
                                        previewEntryCount === 0 && allBillableCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontFamily: "var(--font-mono)",
                                                fontSize: "10px",
                                                color: "var(--warn)",
                                                marginBottom: "8px"
                                            },
                                            children: t("clients.noEntriesInPeriod")
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                            lineNumber: 558,
                                            columnNumber: 10
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                justifyContent: "space-between",
                                                fontFamily: "var(--font-mono)",
                                                fontSize: "11px",
                                                color: "var(--con-muted)",
                                                marginBottom: "4px"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: t("clients.subtotalLabel")
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                    lineNumber: 563,
                                                    columnNumber: 10
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "\u20AC",
                                                        previewSubtotal.toFixed(2)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                    lineNumber: 564,
                                                    columnNumber: 10
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                            lineNumber: 562,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                justifyContent: "space-between",
                                                fontFamily: "var(--font-mono)",
                                                fontSize: "11px",
                                                color: "var(--con-muted)",
                                                marginBottom: "6px"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "VAT 21%"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                    lineNumber: 567,
                                                    columnNumber: 10
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "\u20AC",
                                                        (previewSubtotal * 0.21).toFixed(2)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                    lineNumber: 568,
                                                    columnNumber: 10
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                            lineNumber: 566,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                justifyContent: "space-between",
                                                fontFamily: "var(--font-mono)",
                                                fontSize: "14px",
                                                fontWeight: 700,
                                                color: "#2563EB"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: t("clients.totalInclVat")
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                    lineNumber: 571,
                                                    columnNumber: 10
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "\u20AC",
                                                        previewTotal.toFixed(2)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                    lineNumber: 572,
                                                    columnNumber: 10
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                            lineNumber: 570,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                    lineNumber: 542,
                                    columnNumber: 8
                                }, this),
                                invError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "11px",
                                        color: "var(--danger)",
                                        margin: 0
                                    },
                                    children: invError
                                }, void 0, false, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                    lineNumber: 577,
                                    columnNumber: 9
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        gap: "8px",
                                        justifyContent: "flex-end",
                                        marginTop: "4px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setShowInvoiceModal(false),
                                            style: {
                                                fontFamily: "var(--font-mono)",
                                                fontSize: "10px",
                                                background: "none",
                                                border: "1px solid var(--con-border)",
                                                borderRadius: "4px",
                                                padding: "7px 14px",
                                                color: "var(--con-muted)",
                                                cursor: "pointer"
                                            },
                                            children: t("common.cancel")
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                            lineNumber: 581,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: handleGenerateInvoice,
                                            disabled: invGenerating || entries.filter((e)=>e.isBillable).length === 0,
                                            style: {
                                                fontFamily: "var(--font-mono)",
                                                fontSize: "10px",
                                                fontWeight: 600,
                                                background: invGenerating || entries.filter((e)=>e.isBillable).length === 0 ? "var(--con-border)" : "#2563EB",
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: "4px",
                                                padding: "7px 14px",
                                                cursor: invGenerating || entries.filter((e)=>e.isBillable).length === 0 ? "not-allowed" : "pointer"
                                            },
                                            children: invGenerating ? t("clients.generating") : t("clients.generateInvoice")
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                            lineNumber: 588,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                    lineNumber: 580,
                                    columnNumber: 8
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                            lineNumber: 519,
                            columnNumber: 7
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                    lineNumber: 503,
                    columnNumber: 6
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                lineNumber: 499,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/clients",
                style: {
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    color: "var(--con-subtle)",
                    textDecoration: "none",
                    letterSpacing: "0.04em",
                    display: "inline-block",
                    marginBottom: "16px"
                },
                children: t("clients.backToClients")
            }, void 0, false, {
                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                lineNumber: 608,
                columnNumber: 4
            }, this),
            !client.isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "rgba(217,119,6,0.1)",
                    border: "1px solid rgba(217,119,6,0.3)",
                    borderRadius: "4px",
                    padding: "10px 16px",
                    marginBottom: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                            color: "#D97706",
                            fontWeight: 600
                        },
                        children: t("clients.deactivatedBanner")
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                        lineNumber: 636,
                        columnNumber: 6
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: handleReactivate,
                        style: {
                            fontFamily: "var(--font-mono)",
                            fontSize: "10px",
                            fontWeight: 600,
                            letterSpacing: "0.04em",
                            background: "#16A34A",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            padding: "5px 12px",
                            cursor: "pointer",
                            flexShrink: 0
                        },
                        children: t("clients.reactivateClient")
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                        lineNumber: 639,
                        columnNumber: 6
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                lineNumber: 625,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "var(--con-surface)",
                    border: "1px solid var(--con-border)",
                    borderRadius: "4px 4px 0 0",
                    borderBottom: "none",
                    padding: "14px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    flexWrap: "wrap"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            minWidth: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "16px",
                                    fontWeight: 700,
                                    color: "var(--con-text)",
                                    margin: 0
                                },
                                children: client.name
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                lineNumber: 664,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "10px",
                                    color: "var(--con-subtle)"
                                },
                                children: [
                                    "/portal/",
                                    client.slug
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                lineNumber: 667,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                        lineNumber: 663,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: "16px",
                            alignItems: "center",
                            flexWrap: "wrap"
                        },
                        children: [
                            {
                                label: t("clients.contractType"),
                                value: client.contractType === "retainer" ? t("clients.retainer") : t("clients.adhoc"),
                                accent: client.contractType === "retainer"
                            },
                            {
                                label: t("clients.hourlyRate"),
                                value: `€${client.hourlyRate.toFixed(2)}/h`
                            },
                            {
                                label: t("clients.language"),
                                value: langLabel[client.language] ?? client.language
                            },
                            ...client.city ? [
                                {
                                    label: t("clients.city"),
                                    value: client.city
                                }
                            ] : []
                        ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: "center"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "9px",
                                            letterSpacing: "0.08em",
                                            textTransform: "uppercase",
                                            color: "var(--con-subtle)",
                                            marginBottom: "2px"
                                        },
                                        children: item.label
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                        lineNumber: 679,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "12px",
                                            fontWeight: 600,
                                            color: item.accent ? "var(--accent)" : "var(--con-text)"
                                        },
                                        children: item.value
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                        lineNumber: 682,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, item.label, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                lineNumber: 678,
                                columnNumber: 7
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                        lineNumber: 671,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                lineNumber: 650,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "var(--con-surface)",
                    borderLeft: "1px solid var(--con-border)",
                    borderRight: "1px solid var(--con-border)",
                    borderBottom: "1px solid var(--con-border)",
                    display: "flex",
                    gap: "0",
                    overflowX: "auto"
                },
                children: TABS.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setActiveTab(tab.key),
                        style: tabStyle(tab.key),
                        children: tab.label
                    }, tab.key, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                        lineNumber: 703,
                        columnNumber: 6
                    }, this))
            }, void 0, false, {
                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                lineNumber: 691,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: "20px"
                },
                children: [
                    activeTab === "overview" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: "var(--con-surface)",
                            border: "1px solid var(--con-border)",
                            borderRadius: "4px",
                            padding: "20px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    gap: "8px",
                                    marginBottom: "16px"
                                },
                                children: !editing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: startEdit,
                                            style: {
                                                fontFamily: "var(--font-mono)",
                                                fontSize: "10px",
                                                fontWeight: 600,
                                                letterSpacing: "0.04em",
                                                background: "var(--accent)",
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: "4px",
                                                padding: "6px 12px",
                                                cursor: "pointer"
                                            },
                                            children: t("clients.editClient")
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                            lineNumber: 718,
                                            columnNumber: 10
                                        }, this),
                                        client.isActive && (confirmingDeactivate ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontFamily: "var(--font-mono)",
                                                        fontSize: "10px",
                                                        color: "var(--danger)"
                                                    },
                                                    children: t("clients.confirmDeactivate")
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                    lineNumber: 727,
                                                    columnNumber: 11
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: handleDeactivate,
                                                    style: {
                                                        fontFamily: "var(--font-mono)",
                                                        fontSize: "10px",
                                                        fontWeight: 600,
                                                        background: "var(--danger)",
                                                        color: "#fff",
                                                        border: "none",
                                                        borderRadius: "4px",
                                                        padding: "6px 12px",
                                                        cursor: "pointer"
                                                    },
                                                    children: t("clients.deactivateClient")
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                    lineNumber: 730,
                                                    columnNumber: 11
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setConfirmingDeactivate(false),
                                                    style: {
                                                        fontFamily: "var(--font-mono)",
                                                        fontSize: "10px",
                                                        background: "none",
                                                        border: "1px solid var(--con-border)",
                                                        borderRadius: "4px",
                                                        padding: "6px 10px",
                                                        color: "var(--con-muted)",
                                                        cursor: "pointer"
                                                    },
                                                    children: t("common.cancel")
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                    lineNumber: 737,
                                                    columnNumber: 11
                                                }, this)
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setConfirmingDeactivate(true),
                                            style: {
                                                fontFamily: "var(--font-mono)",
                                                fontSize: "10px",
                                                letterSpacing: "0.04em",
                                                background: "none",
                                                color: "var(--danger)",
                                                border: "1px solid var(--con-border)",
                                                borderRadius: "4px",
                                                padding: "6px 12px",
                                                cursor: "pointer"
                                            },
                                            children: t("clients.deactivateClient")
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                            lineNumber: 747,
                                            columnNumber: 10
                                        }, this))
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                lineNumber: 715,
                                columnNumber: 7
                            }, this),
                            editing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handleSaveClient,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "grid",
                                            gridTemplateColumns: "2fr 1fr 1fr 1fr",
                                            gap: "14px",
                                            marginBottom: "14px"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        style: labelStyle,
                                                        children: t("clients.name")
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 763,
                                                        columnNumber: 11
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        required: true,
                                                        value: eName,
                                                        onChange: (e)=>setEName(e.target.value),
                                                        style: inputStyle,
                                                        onFocus: (e)=>e.currentTarget.style.borderColor = "var(--accent)",
                                                        onBlur: (e)=>e.currentTarget.style.borderColor = "var(--con-border)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 764,
                                                        columnNumber: 11
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                lineNumber: 762,
                                                columnNumber: 10
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        style: labelStyle,
                                                        children: t("clients.contractType")
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 769,
                                                        columnNumber: 11
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: eContractType,
                                                        onChange: (e)=>setEContractType(e.target.value),
                                                        style: {
                                                            ...inputStyle,
                                                            cursor: "pointer"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "adhoc",
                                                                children: t("clients.adhoc")
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 771,
                                                                columnNumber: 12
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "retainer",
                                                                children: t("clients.retainer")
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 772,
                                                                columnNumber: 12
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 770,
                                                        columnNumber: 11
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                lineNumber: 768,
                                                columnNumber: 10
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        style: labelStyle,
                                                        children: [
                                                            t("clients.hourlyRate"),
                                                            " (€/h)"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 776,
                                                        columnNumber: 11
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        min: "0",
                                                        step: "0.01",
                                                        value: eHourlyRate,
                                                        onChange: (e)=>setEHourlyRate(e.target.value),
                                                        style: inputStyle,
                                                        onFocus: (e)=>e.currentTarget.style.borderColor = "var(--accent)",
                                                        onBlur: (e)=>e.currentTarget.style.borderColor = "var(--con-border)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 777,
                                                        columnNumber: 11
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                lineNumber: 775,
                                                columnNumber: 10
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        style: labelStyle,
                                                        children: t("clients.language")
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 782,
                                                        columnNumber: 11
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: eLanguage,
                                                        onChange: (e)=>setELanguage(e.target.value),
                                                        style: {
                                                            ...inputStyle,
                                                            cursor: "pointer"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "fr",
                                                                children: t("clients.langFr")
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 784,
                                                                columnNumber: 12
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "nl",
                                                                children: t("clients.langNl")
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 785,
                                                                columnNumber: 12
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "en",
                                                                children: t("clients.langEn")
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 786,
                                                                columnNumber: 12
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 783,
                                                        columnNumber: 11
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                lineNumber: 781,
                                                columnNumber: 10
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                        lineNumber: 761,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "grid",
                                            gridTemplateColumns: "2fr 1fr 1fr 1fr",
                                            gap: "14px",
                                            marginBottom: "14px"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        style: labelStyle,
                                                        children: t("clients.address")
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 792,
                                                        columnNumber: 11
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: eAddress,
                                                        onChange: (e)=>setEAddress(e.target.value),
                                                        style: inputStyle,
                                                        onFocus: (e)=>e.currentTarget.style.borderColor = "var(--accent)",
                                                        onBlur: (e)=>e.currentTarget.style.borderColor = "var(--con-border)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 793,
                                                        columnNumber: 11
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                lineNumber: 791,
                                                columnNumber: 10
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        style: labelStyle,
                                                        children: t("clients.city")
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 798,
                                                        columnNumber: 11
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: eCity,
                                                        onChange: (e)=>setECity(e.target.value),
                                                        style: inputStyle,
                                                        onFocus: (e)=>e.currentTarget.style.borderColor = "var(--accent)",
                                                        onBlur: (e)=>e.currentTarget.style.borderColor = "var(--con-border)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 799,
                                                        columnNumber: 11
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                lineNumber: 797,
                                                columnNumber: 10
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        style: labelStyle,
                                                        children: t("clients.vatNumber")
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 804,
                                                        columnNumber: 11
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: eVat,
                                                        onChange: (e)=>setEVat(e.target.value),
                                                        style: inputStyle,
                                                        placeholder: "BE0123456789",
                                                        onFocus: (e)=>e.currentTarget.style.borderColor = "var(--accent)",
                                                        onBlur: (e)=>e.currentTarget.style.borderColor = "var(--con-border)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 805,
                                                        columnNumber: 11
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                lineNumber: 803,
                                                columnNumber: 10
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                lineNumber: 809,
                                                columnNumber: 10
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                        lineNumber: 790,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "grid",
                                            gridTemplateColumns: "1fr 1fr 1fr 1fr",
                                            gap: "14px",
                                            marginBottom: "16px"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                lineNumber: 811,
                                                columnNumber: 10
                                            }, this),
                                            eContractType === "retainer" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                style: labelStyle,
                                                                children: t("clients.retainerHoursLabel")
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 815,
                                                                columnNumber: 13
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                min: "0",
                                                                value: eRetainerHours,
                                                                onChange: (e)=>setERetainerHours(e.target.value),
                                                                style: inputStyle,
                                                                onFocus: (e)=>e.currentTarget.style.borderColor = "var(--accent)",
                                                                onBlur: (e)=>e.currentTarget.style.borderColor = "var(--con-border)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 816,
                                                                columnNumber: 13
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 814,
                                                        columnNumber: 12
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                style: labelStyle,
                                                                children: t("clients.retainerFeeLabel")
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 821,
                                                                columnNumber: 13
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                min: "0",
                                                                step: "0.01",
                                                                value: eRetainerFee,
                                                                onChange: (e)=>setERetainerFee(e.target.value),
                                                                style: inputStyle,
                                                                onFocus: (e)=>e.currentTarget.style.borderColor = "var(--accent)",
                                                                onBlur: (e)=>e.currentTarget.style.borderColor = "var(--con-border)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 822,
                                                                columnNumber: 13
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 820,
                                                        columnNumber: 12
                                                    }, this)
                                                ]
                                            }, void 0, true)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                        lineNumber: 810,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            gap: "8px",
                                            alignItems: "center"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                disabled: saving,
                                                style: {
                                                    fontFamily: "var(--font-mono)",
                                                    fontSize: "10px",
                                                    fontWeight: 600,
                                                    letterSpacing: "0.04em",
                                                    background: saving ? "var(--con-border)" : "var(--accent)",
                                                    color: "#fff",
                                                    border: "none",
                                                    borderRadius: "4px",
                                                    padding: "7px 14px",
                                                    cursor: saving ? "not-allowed" : "pointer"
                                                },
                                                children: saving ? t("clients.saving") : t("common.save")
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                lineNumber: 830,
                                                columnNumber: 10
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setEditing(false),
                                                style: {
                                                    fontFamily: "var(--font-mono)",
                                                    fontSize: "10px",
                                                    background: "none",
                                                    border: "1px solid var(--con-border)",
                                                    borderRadius: "4px",
                                                    padding: "7px 12px",
                                                    color: "var(--con-muted)",
                                                    cursor: "pointer"
                                                },
                                                children: t("common.cancel")
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                lineNumber: 838,
                                                columnNumber: 10
                                            }, this),
                                            editError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "var(--font-mono)",
                                                    fontSize: "10px",
                                                    color: "var(--danger)"
                                                },
                                                children: editError
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                lineNumber: 845,
                                                columnNumber: 24
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                        lineNumber: 829,
                                        columnNumber: 9
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                lineNumber: 760,
                                columnNumber: 8
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                                    gap: "20px"
                                },
                                children: [
                                    {
                                        label: t("clients.name"),
                                        value: client.name
                                    },
                                    {
                                        label: t("clients.contractType"),
                                        value: client.contractType === "retainer" ? t("clients.retainer") : t("clients.adhoc")
                                    },
                                    {
                                        label: t("clients.hourlyRate"),
                                        value: `€${client.hourlyRate.toFixed(2)}/h`
                                    },
                                    {
                                        label: t("clients.language"),
                                        value: langLabel[client.language] ?? client.language
                                    },
                                    ...client.vatNumber ? [
                                        {
                                            label: t("clients.vatNumber"),
                                            value: client.vatNumber
                                        }
                                    ] : [],
                                    ...client.address ? [
                                        {
                                            label: t("clients.address"),
                                            value: client.address
                                        }
                                    ] : [],
                                    ...client.city ? [
                                        {
                                            label: t("clients.city"),
                                            value: client.city
                                        }
                                    ] : [],
                                    ...client.contractType === "retainer" && client.retainerHours ? [
                                        {
                                            label: t("clients.retainerHoursLabel"),
                                            value: `${client.retainerHours}h`
                                        }
                                    ] : [],
                                    ...client.contractType === "retainer" && client.retainerFee ? [
                                        {
                                            label: t("clients.retainerFeeLabel"),
                                            value: `€${client.retainerFee.toFixed(2)}`
                                        }
                                    ] : []
                                ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontFamily: "var(--font-mono)",
                                                    fontSize: "9px",
                                                    letterSpacing: "0.08em",
                                                    textTransform: "uppercase",
                                                    color: "var(--con-subtle)",
                                                    marginBottom: "4px"
                                                },
                                                children: item.label
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                lineNumber: 862,
                                                columnNumber: 11
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontFamily: "var(--font-mono)",
                                                    fontSize: "13px",
                                                    fontWeight: 600,
                                                    color: "var(--con-text)"
                                                },
                                                children: item.value
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                lineNumber: 865,
                                                columnNumber: 11
                                            }, this)
                                        ]
                                    }, item.label, true, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                        lineNumber: 861,
                                        columnNumber: 10
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                lineNumber: 849,
                                columnNumber: 8
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                        lineNumber: 714,
                        columnNumber: 6
                    }, this),
                    activeTab === "tickets" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            !client.isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "11px",
                                    color: "#D97706",
                                    background: "rgba(217,119,6,0.08)",
                                    border: "1px solid rgba(217,119,6,0.2)",
                                    borderRadius: "4px",
                                    padding: "10px 14px",
                                    marginBottom: "12px"
                                },
                                children: t("clients.deactivatedTicketsNotice")
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                lineNumber: 879,
                                columnNumber: 8
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    marginBottom: "12px"
                                },
                                children: client.isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        setShowTicketForm((v)=>!v);
                                        if (showTicketForm) resetTicketForm();
                                    },
                                    style: {
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "10px",
                                        fontWeight: 600,
                                        letterSpacing: "0.04em",
                                        background: showTicketForm ? "transparent" : "var(--accent)",
                                        color: showTicketForm ? "var(--con-muted)" : "#fff",
                                        border: showTicketForm ? "1px solid var(--con-border)" : "none",
                                        borderRadius: "4px",
                                        padding: "6px 12px",
                                        cursor: "pointer"
                                    },
                                    children: showTicketForm ? t("common.cancel") : `+ ${t("tickets.newTicket")}`
                                }, void 0, false, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                    lineNumber: 884,
                                    columnNumber: 28
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                lineNumber: 883,
                                columnNumber: 7
                            }, this),
                            client.isActive && showTicketForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handleCreateTicket,
                                style: {
                                    background: "var(--con-surface)",
                                    border: "1px solid var(--con-border)",
                                    borderRadius: "4px",
                                    padding: "14px 16px",
                                    marginBottom: "12px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "grid",
                                            gridTemplateColumns: "2fr 1fr 1fr 1fr",
                                            gap: "12px",
                                            marginBottom: "10px"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        style: labelStyle,
                                                        children: t("tickets.titleLabel")
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 906,
                                                        columnNumber: 11
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        required: true,
                                                        value: tTitle,
                                                        onChange: (e)=>setTTitle(e.target.value),
                                                        style: {
                                                            ...inputStyle
                                                        },
                                                        onFocus: (e)=>e.currentTarget.style.borderColor = "var(--accent)",
                                                        onBlur: (e)=>e.currentTarget.style.borderColor = "var(--con-border)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 907,
                                                        columnNumber: 11
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                lineNumber: 905,
                                                columnNumber: 10
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        style: labelStyle,
                                                        children: t("tickets.priority")
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 912,
                                                        columnNumber: 11
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: tPriority,
                                                        onChange: (e)=>setTPriority(e.target.value),
                                                        style: {
                                                            ...inputStyle,
                                                            cursor: "pointer"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "low",
                                                                children: t("tickets.priorityLow")
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 914,
                                                                columnNumber: 12
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "normal",
                                                                children: t("tickets.priorityNormal")
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 915,
                                                                columnNumber: 12
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "high",
                                                                children: t("tickets.priorityHigh")
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 916,
                                                                columnNumber: 12
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "urgent",
                                                                children: t("tickets.priorityUrgent")
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 917,
                                                                columnNumber: 12
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 913,
                                                        columnNumber: 11
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                lineNumber: 911,
                                                columnNumber: 10
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        style: labelStyle,
                                                        children: t("tickets.source")
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 921,
                                                        columnNumber: 11
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: tSource,
                                                        onChange: (e)=>setTSource(e.target.value),
                                                        style: {
                                                            ...inputStyle,
                                                            cursor: "pointer"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "manual",
                                                                children: t("tickets.sourceManual")
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 923,
                                                                columnNumber: 12
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "phone",
                                                                children: t("tickets.sourcePhone")
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 924,
                                                                columnNumber: 12
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "whatsapp",
                                                                children: t("tickets.sourceWhatsapp")
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 925,
                                                                columnNumber: 12
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "email",
                                                                children: t("tickets.sourceEmail")
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 926,
                                                                columnNumber: 12
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "portal",
                                                                children: t("tickets.sourcePortal")
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 927,
                                                                columnNumber: 12
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 922,
                                                        columnNumber: 11
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                lineNumber: 920,
                                                columnNumber: 10
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        style: labelStyle,
                                                        children: t("tickets.billable")
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 931,
                                                        columnNumber: 11
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: tBillable ? "yes" : "no",
                                                        onChange: (e)=>setTBillable(e.target.value === "yes"),
                                                        style: {
                                                            ...inputStyle,
                                                            cursor: "pointer"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "yes",
                                                                children: t("tickets.yes")
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 933,
                                                                columnNumber: 12
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "no",
                                                                children: t("tickets.no")
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 934,
                                                                columnNumber: 12
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 932,
                                                        columnNumber: 11
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                lineNumber: 930,
                                                columnNumber: 10
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                        lineNumber: 904,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: "10px"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                style: labelStyle,
                                                children: [
                                                    t("tickets.description"),
                                                    " ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            color: "var(--con-subtle)",
                                                            fontWeight: 400
                                                        },
                                                        children: [
                                                            "(",
                                                            t("tickets.optional"),
                                                            ")"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 939,
                                                        columnNumber: 63
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                lineNumber: 939,
                                                columnNumber: 10
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                value: tDesc,
                                                onChange: (e)=>setTDesc(e.target.value),
                                                rows: 2,
                                                style: {
                                                    ...inputStyle,
                                                    resize: "vertical"
                                                },
                                                onFocus: (e)=>e.currentTarget.style.borderColor = "var(--accent)",
                                                onBlur: (e)=>e.currentTarget.style.borderColor = "var(--con-border)"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                lineNumber: 940,
                                                columnNumber: 10
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                        lineNumber: 938,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            gap: "8px",
                                            alignItems: "center"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                disabled: tPending,
                                                style: {
                                                    fontFamily: "var(--font-mono)",
                                                    fontSize: "10px",
                                                    fontWeight: 600,
                                                    letterSpacing: "0.04em",
                                                    background: tPending ? "var(--con-border)" : "var(--accent)",
                                                    color: "#fff",
                                                    border: "none",
                                                    borderRadius: "4px",
                                                    padding: "7px 14px",
                                                    cursor: tPending ? "not-allowed" : "pointer"
                                                },
                                                children: tPending ? t("tickets.creating") : t("tickets.create")
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                lineNumber: 946,
                                                columnNumber: 10
                                            }, this),
                                            tError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "var(--font-mono)",
                                                    fontSize: "10px",
                                                    color: "var(--danger)"
                                                },
                                                children: tError
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                lineNumber: 954,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                        lineNumber: 945,
                                        columnNumber: 9
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                lineNumber: 900,
                                columnNumber: 8
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: "var(--con-surface)",
                                    border: "1px solid var(--con-border)",
                                    borderRadius: "4px",
                                    overflow: "hidden"
                                },
                                children: tickets.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "11px",
                                        color: "var(--con-subtle)",
                                        padding: "48px",
                                        textAlign: "center"
                                    },
                                    children: t("clients.noTickets")
                                }, void 0, false, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                    lineNumber: 961,
                                    columnNumber: 9
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    style: {
                                        width: "100%",
                                        borderCollapse: "collapse"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        style: TH,
                                                        children: t("tickets.reference")
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 968,
                                                        columnNumber: 12
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        style: TH,
                                                        children: t("tickets.titleLabel")
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 969,
                                                        columnNumber: 12
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        style: TH,
                                                        children: t("tickets.status")
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 970,
                                                        columnNumber: 12
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        style: TH,
                                                        children: t("tickets.priority")
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 971,
                                                        columnNumber: 12
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        style: {
                                                            ...TH,
                                                            textAlign: "right"
                                                        },
                                                        children: t("tickets.createdAt")
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 972,
                                                        columnNumber: 12
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        style: {
                                                            ...TH,
                                                            textAlign: "right"
                                                        },
                                                        children: t("common.actions")
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 973,
                                                        columnNumber: 12
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                lineNumber: 967,
                                                columnNumber: 11
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                            lineNumber: 966,
                                            columnNumber: 10
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            children: tickets.map((tk)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    onMouseEnter: (e)=>e.currentTarget.style.background = "var(--con-bg)",
                                                    onMouseLeave: (e)=>e.currentTarget.style.background = "transparent",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: TD,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    color: "var(--accent)",
                                                                    fontWeight: 700
                                                                },
                                                                children: tk.reference
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 982,
                                                                columnNumber: 28
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                            lineNumber: 982,
                                                            columnNumber: 13
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                ...TD,
                                                                maxWidth: "260px",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis"
                                                            },
                                                            children: tk.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                            lineNumber: 983,
                                                            columnNumber: 13
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: TD,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                                                value: tk.status,
                                                                label: t(STATUS_LABEL_KEYS[tk.status] ?? "tickets.statusOpen"),
                                                                map: STATUS_STYLES
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 984,
                                                                columnNumber: 28
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                            lineNumber: 984,
                                                            columnNumber: 13
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: TD,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                                                value: tk.priority,
                                                                label: t(PRIORITY_LABEL_KEYS[tk.priority] ?? "tickets.priorityNormal"),
                                                                map: PRIORITY_STYLES
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 985,
                                                                columnNumber: 28
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                            lineNumber: 985,
                                                            columnNumber: 13
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                ...TD,
                                                                textAlign: "right",
                                                                color: "var(--con-subtle)"
                                                            },
                                                            children: new Date(tk.createdAt).toLocaleDateString(undefined, {
                                                                day: "numeric",
                                                                month: "short"
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                            lineNumber: 986,
                                                            columnNumber: 13
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            style: {
                                                                ...TD,
                                                                textAlign: "right"
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                href: `/tickets/${tk.id}`,
                                                                style: {
                                                                    fontFamily: "var(--font-mono)",
                                                                    fontSize: "9px",
                                                                    letterSpacing: "0.06em",
                                                                    textTransform: "uppercase",
                                                                    color: "var(--con-muted)",
                                                                    border: "1px solid var(--con-border)",
                                                                    borderRadius: "3px",
                                                                    padding: "3px 8px",
                                                                    textDecoration: "none"
                                                                },
                                                                children: t("view")
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 990,
                                                                columnNumber: 14
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                            lineNumber: 989,
                                                            columnNumber: 13
                                                        }, this)
                                                    ]
                                                }, tk.id, true, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                    lineNumber: 978,
                                                    columnNumber: 12
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                            lineNumber: 976,
                                            columnNumber: 10
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                    lineNumber: 965,
                                    columnNumber: 9
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                lineNumber: 959,
                                columnNumber: 7
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                        lineNumber: 877,
                        columnNumber: 6
                    }, this),
                    activeTab === "time" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: "var(--con-surface)",
                                    border: "1px solid var(--con-border)",
                                    borderRadius: "4px",
                                    padding: "14px 20px",
                                    marginBottom: "12px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "32px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            flex: 1,
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "9px",
                                            letterSpacing: "0.1em",
                                            textTransform: "uppercase",
                                            color: "var(--con-subtle)"
                                        },
                                        children: t("clients.unbilledSection")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                        lineNumber: 1017,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            textAlign: "center"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontFamily: "var(--font-mono)",
                                                    fontSize: "9px",
                                                    letterSpacing: "0.08em",
                                                    textTransform: "uppercase",
                                                    color: "var(--con-subtle)",
                                                    marginBottom: "2px"
                                                },
                                                children: t("clients.totalUnbilledHours")
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                lineNumber: 1021,
                                                columnNumber: 9
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontFamily: "var(--font-mono)",
                                                    fontSize: "18px",
                                                    fontWeight: 700,
                                                    color: totalUnbilledMinutes > 0 ? "var(--con-text)" : "var(--con-subtle)"
                                                },
                                                children: toHours(totalUnbilledMinutes)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                lineNumber: 1024,
                                                columnNumber: 9
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                        lineNumber: 1020,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            textAlign: "center"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontFamily: "var(--font-mono)",
                                                    fontSize: "9px",
                                                    letterSpacing: "0.08em",
                                                    textTransform: "uppercase",
                                                    color: "var(--con-subtle)",
                                                    marginBottom: "2px"
                                                },
                                                children: t("clients.totalUnbilledAmount")
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                lineNumber: 1029,
                                                columnNumber: 9
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontFamily: "var(--font-mono)",
                                                    fontSize: "18px",
                                                    fontWeight: 700,
                                                    color: totalUnbilledAmount > 0 ? "var(--accent)" : "var(--con-subtle)"
                                                },
                                                children: [
                                                    "€",
                                                    totalUnbilledAmount.toFixed(2)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                lineNumber: 1032,
                                                columnNumber: 9
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                        lineNumber: 1028,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>{
                                            setInvPeriodStart(defaultPeriodStart());
                                            setInvPeriodEnd(defaultPeriodEnd());
                                            setInvDueDate(defaultDueDate());
                                            setInvError(null);
                                            setShowInvoiceModal(true);
                                        },
                                        disabled: entries.filter((e)=>e.isBillable).length === 0,
                                        style: {
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "10px",
                                            fontWeight: 600,
                                            letterSpacing: "0.04em",
                                            background: entries.filter((e)=>e.isBillable).length === 0 ? "var(--con-border)" : "#2563EB",
                                            color: entries.filter((e)=>e.isBillable).length === 0 ? "var(--con-muted)" : "#fff",
                                            border: "none",
                                            borderRadius: "4px",
                                            padding: "7px 14px",
                                            cursor: entries.filter((e)=>e.isBillable).length === 0 ? "not-allowed" : "pointer"
                                        },
                                        children: t("clients.generateInvoice")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                        lineNumber: 1036,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                lineNumber: 1012,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: "var(--con-surface)",
                                    border: "1px solid var(--con-border)",
                                    borderRadius: "4px",
                                    overflow: "hidden"
                                },
                                children: entries.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "11px",
                                        color: "var(--con-subtle)",
                                        padding: "48px",
                                        textAlign: "center"
                                    },
                                    children: t("clients.noUnbilledEntries")
                                }, void 0, false, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                    lineNumber: 1060,
                                    columnNumber: 9
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    style: {
                                        width: "100%",
                                        borderCollapse: "collapse"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        style: TH,
                                                        children: t("tickets.loggedAtLabel")
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 1067,
                                                        columnNumber: 12
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        style: TH,
                                                        children: t("clients.ticketRef")
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 1068,
                                                        columnNumber: 12
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        style: TH,
                                                        children: t("tickets.description")
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 1069,
                                                        columnNumber: 12
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        style: {
                                                            ...TH,
                                                            textAlign: "right"
                                                        },
                                                        children: t("tickets.durationLabel").replace(" (min)", "")
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 1070,
                                                        columnNumber: 12
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        style: {
                                                            ...TH,
                                                            textAlign: "right"
                                                        },
                                                        children: t("tickets.rateLabel").replace(" (€/h)", "")
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 1071,
                                                        columnNumber: 12
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        style: {
                                                            ...TH,
                                                            textAlign: "right"
                                                        },
                                                        children: t("tickets.amountLabel")
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 1072,
                                                        columnNumber: 12
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        style: {
                                                            ...TH,
                                                            textAlign: "right"
                                                        },
                                                        children: t("common.actions")
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                        lineNumber: 1073,
                                                        columnNumber: 12
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                lineNumber: 1066,
                                                columnNumber: 11
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                            lineNumber: 1065,
                                            columnNumber: 10
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            children: entries.map((e)=>{
                                                const isEditing = editingEntryId === e.id;
                                                const isDeleting = deletingEntryId === e.id;
                                                const canEdit = !e.ticket; // ticket-linked entries are read-only here
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                colSpan: 4,
                                                                style: {
                                                                    ...TD,
                                                                    padding: "8px 12px"
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        display: "flex",
                                                                        gap: "8px",
                                                                        alignItems: "center"
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            value: editDesc,
                                                                            onChange: (e)=>setEditDesc(e.target.value),
                                                                            placeholder: t("tickets.description"),
                                                                            style: {
                                                                                ...inputStyle,
                                                                                width: "260px",
                                                                                padding: "5px 8px",
                                                                                fontSize: "11px"
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                            lineNumber: 1087,
                                                                            columnNumber: 18
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "number",
                                                                            value: editDuration,
                                                                            onChange: (e)=>setEditDuration(e.target.value),
                                                                            placeholder: "min",
                                                                            style: {
                                                                                ...inputStyle,
                                                                                width: "70px",
                                                                                padding: "5px 8px",
                                                                                fontSize: "11px"
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                            lineNumber: 1093,
                                                                            columnNumber: 18
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "number",
                                                                            value: editRate,
                                                                            onChange: (e)=>setEditRate(e.target.value),
                                                                            placeholder: "€/h",
                                                                            style: {
                                                                                ...inputStyle,
                                                                                width: "70px",
                                                                                padding: "5px 8px",
                                                                                fontSize: "11px"
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                            lineNumber: 1100,
                                                                            columnNumber: 18
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                    lineNumber: 1086,
                                                                    columnNumber: 17
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 1085,
                                                                columnNumber: 16
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                style: {
                                                                    ...TD,
                                                                    textAlign: "right",
                                                                    color: "var(--con-muted)"
                                                                },
                                                                children: editDuration && editRate ? `\u20AC${(Number(editDuration) / 60 * Number(editRate)).toFixed(2)}` : "—"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 1109,
                                                                columnNumber: 16
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                style: {
                                                                    ...TD,
                                                                    textAlign: "right"
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        display: "flex",
                                                                        gap: "6px",
                                                                        justifyContent: "flex-end"
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            type: "button",
                                                                            onClick: handleSaveEntry,
                                                                            disabled: editSaving,
                                                                            style: {
                                                                                fontFamily: "var(--font-mono)",
                                                                                fontSize: "9px",
                                                                                fontWeight: 600,
                                                                                background: "#2563EB",
                                                                                color: "#fff",
                                                                                border: "none",
                                                                                borderRadius: "3px",
                                                                                padding: "4px 8px",
                                                                                cursor: editSaving ? "not-allowed" : "pointer"
                                                                            },
                                                                            children: editSaving ? "…" : t("common.save")
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                            lineNumber: 1116,
                                                                            columnNumber: 18
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            type: "button",
                                                                            onClick: ()=>setEditingEntryId(null),
                                                                            style: {
                                                                                fontFamily: "var(--font-mono)",
                                                                                fontSize: "9px",
                                                                                background: "none",
                                                                                border: "1px solid var(--con-border)",
                                                                                borderRadius: "3px",
                                                                                padding: "4px 6px",
                                                                                color: "var(--con-muted)",
                                                                                cursor: "pointer"
                                                                            },
                                                                            children: t("common.cancel")
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                            lineNumber: 1124,
                                                                            columnNumber: 18
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                    lineNumber: 1115,
                                                                    columnNumber: 17
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 1114,
                                                                columnNumber: 16
                                                            }, this)
                                                        ]
                                                    }, void 0, true) : isDeleting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                colSpan: 5,
                                                                style: {
                                                                    ...TD,
                                                                    color: "var(--danger)"
                                                                },
                                                                children: t("clients.confirmDeleteEntry")
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 1136,
                                                                columnNumber: 16
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                style: {
                                                                    ...TD,
                                                                    textAlign: "right"
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        display: "flex",
                                                                        gap: "6px",
                                                                        justifyContent: "flex-end"
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            type: "button",
                                                                            onClick: ()=>handleDeleteEntry(e.id),
                                                                            style: {
                                                                                fontFamily: "var(--font-mono)",
                                                                                fontSize: "9px",
                                                                                fontWeight: 600,
                                                                                background: "var(--danger)",
                                                                                color: "#fff",
                                                                                border: "none",
                                                                                borderRadius: "3px",
                                                                                padding: "4px 8px",
                                                                                cursor: "pointer"
                                                                            },
                                                                            children: t("common.delete")
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                            lineNumber: 1141,
                                                                            columnNumber: 18
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            type: "button",
                                                                            onClick: ()=>setDeletingEntryId(null),
                                                                            style: {
                                                                                fontFamily: "var(--font-mono)",
                                                                                fontSize: "9px",
                                                                                background: "none",
                                                                                border: "1px solid var(--con-border)",
                                                                                borderRadius: "3px",
                                                                                padding: "4px 6px",
                                                                                color: "var(--con-muted)",
                                                                                cursor: "pointer"
                                                                            },
                                                                            children: t("common.cancel")
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                            lineNumber: 1148,
                                                                            columnNumber: 18
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                    lineNumber: 1140,
                                                                    columnNumber: 17
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 1139,
                                                                columnNumber: 16
                                                            }, this)
                                                        ]
                                                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                style: {
                                                                    ...TD,
                                                                    color: "var(--con-subtle)"
                                                                },
                                                                children: new Date(e.loggedAt).toLocaleDateString(undefined, {
                                                                    day: "numeric",
                                                                    month: "short"
                                                                })
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 1160,
                                                                columnNumber: 16
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                style: TD,
                                                                children: e.ticket ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    href: `/tickets/${e.ticket.id}`,
                                                                    style: {
                                                                        color: "var(--accent)",
                                                                        fontWeight: 700,
                                                                        textDecoration: "none",
                                                                        fontFamily: "var(--font-mono)",
                                                                        fontSize: "12px"
                                                                    },
                                                                    children: e.ticket.reference
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                    lineNumber: 1165,
                                                                    columnNumber: 18
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        color: "var(--con-subtle)"
                                                                    },
                                                                    children: "—"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                    lineNumber: 1169,
                                                                    columnNumber: 18
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 1163,
                                                                columnNumber: 16
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                style: {
                                                                    ...TD,
                                                                    maxWidth: "240px",
                                                                    overflow: "hidden",
                                                                    textOverflow: "ellipsis"
                                                                },
                                                                children: e.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 1172,
                                                                columnNumber: 16
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                style: {
                                                                    ...TD,
                                                                    textAlign: "right"
                                                                },
                                                                children: toHours(e.durationMinutes)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 1173,
                                                                columnNumber: 16
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                style: {
                                                                    ...TD,
                                                                    textAlign: "right",
                                                                    color: "var(--con-muted)"
                                                                },
                                                                children: [
                                                                    "\u20AC",
                                                                    e.hourlyRate.toFixed(2)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 1174,
                                                                columnNumber: 16
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                style: {
                                                                    ...TD,
                                                                    textAlign: "right"
                                                                },
                                                                children: e.isBillable ? `\u20AC${(e.durationMinutes / 60 * e.hourlyRate).toFixed(2)}` : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        color: "var(--con-subtle)",
                                                                        fontSize: "10px"
                                                                    },
                                                                    children: t("tickets.notBillableLabel")
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                    lineNumber: 1178,
                                                                    columnNumber: 20
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 1175,
                                                                columnNumber: 16
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                style: {
                                                                    ...TD,
                                                                    textAlign: "right"
                                                                },
                                                                children: canEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        display: "flex",
                                                                        gap: "6px",
                                                                        justifyContent: "flex-end"
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            type: "button",
                                                                            onClick: ()=>startEditEntry(e),
                                                                            style: {
                                                                                fontFamily: "var(--font-mono)",
                                                                                fontSize: "9px",
                                                                                letterSpacing: "0.04em",
                                                                                textTransform: "uppercase",
                                                                                color: "var(--con-muted)",
                                                                                background: "none",
                                                                                border: "1px solid var(--con-border)",
                                                                                borderRadius: "3px",
                                                                                padding: "3px 7px",
                                                                                cursor: "pointer"
                                                                            },
                                                                            children: t("common.edit")
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                            lineNumber: 1183,
                                                                            columnNumber: 19
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            type: "button",
                                                                            onClick: ()=>setDeletingEntryId(e.id),
                                                                            style: {
                                                                                fontFamily: "var(--font-mono)",
                                                                                fontSize: "9px",
                                                                                letterSpacing: "0.04em",
                                                                                textTransform: "uppercase",
                                                                                color: "var(--danger)",
                                                                                background: "none",
                                                                                border: "1px solid rgba(239,68,68,0.3)",
                                                                                borderRadius: "3px",
                                                                                padding: "3px 7px",
                                                                                cursor: "pointer"
                                                                            },
                                                                            children: t("common.delete")
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                            lineNumber: 1190,
                                                                            columnNumber: 19
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                    lineNumber: 1182,
                                                                    columnNumber: 18
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        color: "var(--con-subtle)",
                                                                        fontSize: "10px"
                                                                    },
                                                                    children: "—"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                    lineNumber: 1199,
                                                                    columnNumber: 18
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                                lineNumber: 1180,
                                                                columnNumber: 16
                                                            }, this)
                                                        ]
                                                    }, void 0, true)
                                                }, e.id, false, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                                    lineNumber: 1082,
                                                    columnNumber: 13
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                            lineNumber: 1076,
                                            columnNumber: 10
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                    lineNumber: 1064,
                                    columnNumber: 9
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                                lineNumber: 1058,
                                columnNumber: 7
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                        lineNumber: 1010,
                        columnNumber: 6
                    }, this),
                    activeTab === "portal" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$main$2f$app$2f5b$locale$5d2f28$console$292f$clients$2f5b$clientId$5d2f$PortalUsersView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        clientId: client.id,
                        clientSlug: client.slug,
                        initialUsers: portalUsers,
                        clientIsActive: client.isActive
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                        lineNumber: 1216,
                        columnNumber: 6
                    }, this),
                    activeTab === "assets" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$main$2f$app$2f5b$locale$5d2f28$console$292f$assets$2f$AssetsView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        assets: assets,
                        clients: [
                            {
                                id: client.id,
                                name: client.name
                            }
                        ],
                        embeddedClientId: client.id
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                        lineNumber: 1226,
                        columnNumber: 6
                    }, this),
                    activeTab === "contracts" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$main$2f$app$2f5b$locale$5d2f28$console$292f$contracts$2f$ContractsView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        contracts: contracts,
                        clients: [
                            {
                                id: client.id,
                                name: client.name
                            }
                        ],
                        embeddedClientId: client.id
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                        lineNumber: 1235,
                        columnNumber: 6
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
                lineNumber: 710,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/main/app/[locale]/(console)/clients/[clientId]/ClientDetailView.tsx",
        lineNumber: 496,
        columnNumber: 3
    }, this);
}
_s(ClientDetailView, "dRTyvVOVvmYFWvZgHjm6Bk95lEQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$main$2f$components$2f$LangProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c1 = ClientDetailView;
var _c, _c1;
__turbopack_context__.k.register(_c, "Badge");
__turbopack_context__.k.register(_c1, "ClientDetailView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_main_app_%5Blocale%5D_%28console%29_06c054ea._.js.map