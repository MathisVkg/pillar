(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
]);

//# sourceMappingURL=apps_main_app_%5Blocale%5D_%28console%29_assets_AssetsView_tsx_ca170920._.js.map