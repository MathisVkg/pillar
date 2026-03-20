module.exports = [
"[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TicketsView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$main$2f$components$2f$LangProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/main/components/LangProvider.tsx [app-ssr] (ecmascript)");
"use client";
;
;
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
const STATUS_COLORS = {
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
const PRIORITY_COLORS = {
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
function Badge({ value, label, map }) {
    const s = map[value] ?? {
        bg: "rgba(148,163,184,0.15)",
        color: "var(--con-muted)"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
        lineNumber: 90,
        columnNumber: 3
    }, this);
}
const STATUS_LABEL_KEYS = {
    open: "tickets.statusOpen",
    in_progress: "tickets.statusInProgress",
    done: "tickets.statusDone",
    closed: "tickets.statusClosed"
};
const PRIORITY_LABEL_KEYS = {
    low: "tickets.priorityLow",
    normal: "tickets.priorityNormal",
    high: "tickets.priorityHigh",
    urgent: "tickets.priorityUrgent"
};
const SOURCE_LABEL_KEYS = {
    manual: "tickets.sourceManual",
    phone: "tickets.sourcePhone",
    whatsapp: "tickets.sourceWhatsapp",
    email: "tickets.sourceEmail",
    portal: "tickets.sourcePortal"
};
function TicketsView({ tickets, clients, filterClientId, filterStatus, filterPriority, showDeactivated }) {
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$main$2f$components$2f$LangProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslation"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    // Filter state (mirrors URL params)
    const [clientId, setClientId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(filterClientId ?? "");
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(filterStatus ?? "");
    const [priority, setPriority] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(filterPriority ?? "");
    // New ticket form
    const [showForm, setShowForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [formPending, setFormPending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [formError, setFormError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [fClientId, setFClientId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(clients.find((c)=>c.isActive)?.id ?? clients[0]?.id ?? "");
    const [fTitle, setFTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [fDescription, setFDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [fPriority, setFPriority] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("normal");
    const [fSource, setFSource] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("manual");
    const [fBillable, setFBillable] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    function applyFilters(c, s, p, deact) {
        const params = new URLSearchParams();
        if (c) params.set("clientId", c);
        if (s) params.set("status", s);
        if (p) params.set("priority", p);
        if (deact) params.set("showDeactivated", "1");
        const qs = params.toString();
        router.push(qs ? `/tickets?${qs}` : "/tickets");
    }
    function handleFilterChange(field, value) {
        const next = {
            c: clientId,
            s: status,
            p: priority
        };
        if (field === "client") {
            setClientId(value);
            next.c = value;
        }
        if (field === "status") {
            setStatus(value);
            next.s = value;
        }
        if (field === "priority") {
            setPriority(value);
            next.p = value;
        }
        applyFilters(next.c, next.s, next.p, showDeactivated);
    }
    function toggleDeactivated() {
        applyFilters(clientId, status, priority, !showDeactivated);
    }
    function resetForm() {
        setFClientId(clients.find((c)=>c.isActive)?.id ?? clients[0]?.id ?? "");
        setFTitle("");
        setFDescription("");
        setFPriority("normal");
        setFSource("manual");
        setFBillable(true);
        setFormError(null);
    }
    async function handleCreate(e) {
        e.preventDefault();
        setFormPending(true);
        setFormError(null);
        const res = await fetch("/api/tickets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                clientId: fClientId,
                title: fTitle,
                description: fDescription || undefined,
                priority: fPriority,
                source: fSource,
                isBillable: fBillable
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
    const activeClients = clients.filter((c)=>c.isActive);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "16px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        style: {
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "var(--con-subtle)"
                        },
                        children: t("tickets.title")
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                        lineNumber: 230,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                        children: showForm ? t("common.cancel") : `+ ${t("tickets.newTicket")}`
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                        lineNumber: 233,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                lineNumber: 229,
                columnNumber: 4
            }, this),
            showForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleCreate,
                style: {
                    background: "var(--con-surface)",
                    border: "1px solid var(--con-border)",
                    borderRadius: "4px",
                    padding: "16px",
                    marginBottom: "12px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: "2fr 1fr 1fr 1fr",
                            gap: "12px",
                            marginBottom: "12px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: t("tickets.client")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                        lineNumber: 267,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: fClientId,
                                        onChange: (e)=>setFClientId(e.target.value),
                                        style: {
                                            ...formInputStyle,
                                            cursor: "pointer"
                                        },
                                        children: activeClients.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: c.id,
                                                children: c.name
                                            }, c.id, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                                lineNumber: 270,
                                                columnNumber: 10
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                        lineNumber: 268,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                lineNumber: 266,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: t("tickets.priority")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                        lineNumber: 275,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: fPriority,
                                        onChange: (e)=>setFPriority(e.target.value),
                                        style: {
                                            ...formInputStyle,
                                            cursor: "pointer"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "low",
                                                children: t("tickets.priorityLow")
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                                lineNumber: 277,
                                                columnNumber: 9
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "normal",
                                                children: t("tickets.priorityNormal")
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                                lineNumber: 278,
                                                columnNumber: 9
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "high",
                                                children: t("tickets.priorityHigh")
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                                lineNumber: 279,
                                                columnNumber: 9
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "urgent",
                                                children: t("tickets.priorityUrgent")
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                                lineNumber: 280,
                                                columnNumber: 9
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                        lineNumber: 276,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                lineNumber: 274,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: t("tickets.source")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                        lineNumber: 284,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: fSource,
                                        onChange: (e)=>setFSource(e.target.value),
                                        style: {
                                            ...formInputStyle,
                                            cursor: "pointer"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "manual",
                                                children: t("tickets.sourceManual")
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                                lineNumber: 286,
                                                columnNumber: 9
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "phone",
                                                children: t("tickets.sourcePhone")
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                                lineNumber: 287,
                                                columnNumber: 9
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "whatsapp",
                                                children: t("tickets.sourceWhatsapp")
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                                lineNumber: 288,
                                                columnNumber: 9
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "email",
                                                children: t("tickets.sourceEmail")
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                                lineNumber: 289,
                                                columnNumber: 9
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "portal",
                                                children: t("tickets.sourcePortal")
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                                lineNumber: 290,
                                                columnNumber: 9
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                        lineNumber: 285,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                lineNumber: 283,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: t("tickets.billable")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                        lineNumber: 294,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: fBillable ? "yes" : "no",
                                        onChange: (e)=>setFBillable(e.target.value === "yes"),
                                        style: {
                                            ...formInputStyle,
                                            cursor: "pointer"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "yes",
                                                children: t("tickets.yes")
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                                lineNumber: 296,
                                                columnNumber: 9
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "no",
                                                children: t("tickets.no")
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                                lineNumber: 297,
                                                columnNumber: 9
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                        lineNumber: 295,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                lineNumber: 293,
                                columnNumber: 7
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                        lineNumber: 265,
                        columnNumber: 6
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: "12px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: labelStyle,
                                children: t("tickets.titleLabel")
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                lineNumber: 303,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                required: true,
                                value: fTitle,
                                onChange: (e)=>setFTitle(e.target.value),
                                style: formInputStyle,
                                onFocus: (e)=>e.currentTarget.style.borderColor = "var(--accent)",
                                onBlur: (e)=>e.currentTarget.style.borderColor = "var(--con-border)"
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                lineNumber: 304,
                                columnNumber: 7
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                        lineNumber: 302,
                        columnNumber: 6
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: "12px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: labelStyle,
                                children: [
                                    t("tickets.description"),
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                        lineNumber: 315,
                                        columnNumber: 60
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                lineNumber: 315,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: fDescription,
                                onChange: (e)=>setFDescription(e.target.value),
                                rows: 3,
                                style: {
                                    ...formInputStyle,
                                    resize: "vertical"
                                },
                                onFocus: (e)=>e.currentTarget.style.borderColor = "var(--accent)",
                                onBlur: (e)=>e.currentTarget.style.borderColor = "var(--con-border)"
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                lineNumber: 316,
                                columnNumber: 7
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                        lineNumber: 314,
                        columnNumber: 6
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: "8px",
                            alignItems: "center"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                children: formPending ? t("tickets.creating") : t("tickets.create")
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                lineNumber: 327,
                                columnNumber: 7
                            }, this),
                            formError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "10px",
                                    color: "var(--danger)"
                                },
                                children: formError
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                lineNumber: 346,
                                columnNumber: 8
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                        lineNumber: 326,
                        columnNumber: 6
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                lineNumber: 255,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    gap: "10px",
                    marginBottom: "12px",
                    alignItems: "flex-end",
                    flexWrap: "wrap"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: labelStyle,
                                children: t("tickets.filterClient")
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                lineNumber: 357,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: clientId,
                                onChange: (e)=>handleFilterChange("client", e.target.value),
                                style: inputStyle,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: t("tickets.allClients")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                        lineNumber: 359,
                                        columnNumber: 7
                                    }, this),
                                    clients.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: c.id,
                                            children: [
                                                c.name,
                                                !c.isActive ? " ·" : ""
                                            ]
                                        }, c.id, true, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                            lineNumber: 361,
                                            columnNumber: 8
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                lineNumber: 358,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                        lineNumber: 356,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: labelStyle,
                                children: t("tickets.filterStatus")
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                lineNumber: 366,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: status,
                                onChange: (e)=>handleFilterChange("status", e.target.value),
                                style: inputStyle,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: t("tickets.allStatuses")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                        lineNumber: 368,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "open",
                                        children: t("tickets.statusOpen")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                        lineNumber: 369,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "in_progress",
                                        children: t("tickets.statusInProgress")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                        lineNumber: 370,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "done",
                                        children: t("tickets.statusDone")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                        lineNumber: 371,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "closed",
                                        children: t("tickets.statusClosed")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                        lineNumber: 372,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                lineNumber: 367,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                        lineNumber: 365,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: labelStyle,
                                children: t("tickets.filterPriority")
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                lineNumber: 376,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: priority,
                                onChange: (e)=>handleFilterChange("priority", e.target.value),
                                style: inputStyle,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: t("tickets.allPriorities")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                        lineNumber: 378,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "low",
                                        children: t("tickets.priorityLow")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                        lineNumber: 379,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "normal",
                                        children: t("tickets.priorityNormal")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                        lineNumber: 380,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "high",
                                        children: t("tickets.priorityHigh")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                        lineNumber: 381,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "urgent",
                                        children: t("tickets.priorityUrgent")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                        lineNumber: 382,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                lineNumber: 377,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                        lineNumber: 375,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginLeft: "auto"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: {
                                    ...labelStyle,
                                    opacity: 0
                                },
                                children: "·"
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                lineNumber: 388,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: toggleDeactivated,
                                style: {
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "9px",
                                    letterSpacing: "0.06em",
                                    textTransform: "uppercase",
                                    background: showDeactivated ? "rgba(217,119,6,0.1)" : "none",
                                    color: showDeactivated ? "#D97706" : "var(--con-subtle)",
                                    border: showDeactivated ? "1px solid rgba(217,119,6,0.3)" : "1px solid var(--con-border)",
                                    borderRadius: "4px",
                                    padding: "6px 10px",
                                    cursor: "pointer"
                                },
                                children: t("tickets.includeDeactivated")
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                lineNumber: 389,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                        lineNumber: 387,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                lineNumber: 355,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "var(--con-surface)",
                    border: "1px solid var(--con-border)",
                    borderRadius: "4px",
                    overflow: "hidden"
                },
                children: tickets.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        color: "var(--con-subtle)",
                        padding: "48px",
                        textAlign: "center"
                    },
                    children: t("tickets.emptyState")
                }, void 0, false, {
                    fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                    lineNumber: 413,
                    columnNumber: 6
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    style: {
                        width: "100%",
                        borderCollapse: "collapse"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: TH,
                                        children: t("tickets.reference")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                        lineNumber: 420,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: TH,
                                        children: t("tickets.client")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                        lineNumber: 421,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: TH,
                                        children: t("tickets.titleLabel")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                        lineNumber: 422,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: TH,
                                        children: t("tickets.status")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                        lineNumber: 423,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: TH,
                                        children: t("tickets.priority")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                        lineNumber: 424,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: TH,
                                        children: t("tickets.source")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                        lineNumber: 425,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            ...TH,
                                            textAlign: "right"
                                        },
                                        children: t("tickets.billable")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                        lineNumber: 426,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            ...TH,
                                            textAlign: "right"
                                        },
                                        children: t("tickets.createdAt")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                        lineNumber: 427,
                                        columnNumber: 9
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                lineNumber: 419,
                                columnNumber: 8
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                            lineNumber: 418,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: tickets.map((tk)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    style: {
                                        cursor: "pointer",
                                        opacity: tk.client.isActive ? 1 : 0.6
                                    },
                                    onClick: ()=>router.push(`/tickets/${tk.id}`),
                                    onMouseEnter: (e)=>e.currentTarget.style.background = "var(--con-bg)",
                                    onMouseLeave: (e)=>e.currentTarget.style.background = "transparent",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: TD,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: "var(--accent)",
                                                    fontWeight: 700
                                                },
                                                children: tk.reference
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                                lineNumber: 440,
                                                columnNumber: 11
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                            lineNumber: 439,
                                            columnNumber: 10
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                ...TD,
                                                color: tk.client.isActive ? "var(--con-muted)" : "#D97706"
                                            },
                                            children: tk.client.name
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                            lineNumber: 442,
                                            columnNumber: 10
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                ...TD,
                                                maxWidth: "280px",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis"
                                            },
                                            children: tk.title
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                            lineNumber: 443,
                                            columnNumber: 10
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: TD,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                                value: tk.status,
                                                label: t(STATUS_LABEL_KEYS[tk.status] ?? "tickets.statusOpen"),
                                                map: STATUS_COLORS
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                                lineNumber: 445,
                                                columnNumber: 11
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                            lineNumber: 444,
                                            columnNumber: 10
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: TD,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                                value: tk.priority,
                                                label: t(PRIORITY_LABEL_KEYS[tk.priority] ?? "tickets.priorityNormal"),
                                                map: PRIORITY_COLORS
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                                lineNumber: 448,
                                                columnNumber: 11
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                            lineNumber: 447,
                                            columnNumber: 10
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                ...TD,
                                                color: "var(--con-muted)",
                                                fontSize: "11px"
                                            },
                                            children: t(SOURCE_LABEL_KEYS[tk.source] ?? "tickets.sourceManual")
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                            lineNumber: 450,
                                            columnNumber: 10
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                ...TD,
                                                textAlign: "right",
                                                color: tk.isBillable ? "var(--con-text)" : "var(--con-subtle)"
                                            },
                                            children: tk.isBillable ? t("tickets.yes") : t("tickets.no")
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                            lineNumber: 451,
                                            columnNumber: 10
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                ...TD,
                                                textAlign: "right",
                                                color: "var(--con-subtle)"
                                            },
                                            children: new Date(tk.createdAt).toLocaleDateString()
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                            lineNumber: 454,
                                            columnNumber: 10
                                        }, this)
                                    ]
                                }, tk.id, true, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                                    lineNumber: 432,
                                    columnNumber: 9
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                            lineNumber: 430,
                            columnNumber: 7
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                    lineNumber: 417,
                    columnNumber: 6
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
                lineNumber: 411,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/main/app/[locale]/(console)/tickets/TicketsView.tsx",
        lineNumber: 227,
        columnNumber: 3
    }, this);
}
}),
];

//# sourceMappingURL=apps_main_app_%5Blocale%5D_%28console%29_tickets_TicketsView_tsx_32aa04f2._.js.map