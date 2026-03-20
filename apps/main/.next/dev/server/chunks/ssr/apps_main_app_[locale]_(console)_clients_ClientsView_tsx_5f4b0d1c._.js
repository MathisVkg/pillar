module.exports = [
"[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ClientsView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$main$2f$components$2f$LangProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/main/components/LangProvider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
"use client";
;
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
function ClientsView({ clients: initial }) {
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$main$2f$components$2f$LangProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslation"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [showDeactivated, setShowDeactivated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showForm, setShowForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pending, setPending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [contractType, setContractType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("adhoc");
    const [hourlyRate, setHourlyRate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("95");
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("fr");
    function resetForm() {
        setName("");
        setContractType("adhoc");
        setHourlyRate("95");
        setLanguage("fr");
        setError(null);
    }
    async function handleCreate(e) {
        e.preventDefault();
        setPending(true);
        setError(null);
        const res = await fetch("/api/clients", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                contractType,
                hourlyRate: Number(hourlyRate),
                language
            })
        });
        setPending(false);
        if (!res.ok) {
            const data = await res.json().catch(()=>({}));
            setError(data.error ?? t("common.error"));
            return;
        }
        resetForm();
        setShowForm(false);
        router.refresh();
    }
    const contractBadge = (type)=>({
            display: "inline-block",
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "2px 7px",
            borderRadius: "3px",
            background: type === "retainer" ? "rgba(37,99,235,0.12)" : "rgba(148,163,184,0.15)",
            color: type === "retainer" ? "var(--accent)" : "var(--con-muted)",
            fontWeight: 600
        });
    const langLabel = {
        fr: t("clients.langFr"),
        nl: t("clients.langNl"),
        en: t("clients.langEn")
    };
    const displayed = showDeactivated ? initial : initial.filter((c)=>c.isActive);
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
                        children: t("clients.title")
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                        lineNumber: 140,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: "8px",
                            alignItems: "center"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setShowDeactivated((v)=>!v),
                                style: {
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "9px",
                                    letterSpacing: "0.06em",
                                    textTransform: "uppercase",
                                    background: showDeactivated ? "rgba(217,119,6,0.1)" : "none",
                                    color: showDeactivated ? "#D97706" : "var(--con-subtle)",
                                    border: showDeactivated ? "1px solid rgba(217,119,6,0.3)" : "1px solid var(--con-border)",
                                    borderRadius: "4px",
                                    padding: "5px 10px",
                                    cursor: "pointer"
                                },
                                children: t("clients.showDeactivated")
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                lineNumber: 154,
                                columnNumber: 6
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
                                    cursor: "pointer",
                                    transition: "background 0.12s"
                                },
                                children: showForm ? t("common.cancel") : `+ ${t("clients.newClient")}`
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                lineNumber: 173,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                        lineNumber: 152,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                lineNumber: 132,
                columnNumber: 4
            }, this),
            showForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleCreate,
                style: {
                    background: "var(--con-surface)",
                    border: "1px solid var(--con-border)",
                    borderRadius: "4px",
                    padding: "16px",
                    marginBottom: "12px",
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr 1fr auto",
                    gap: "12px",
                    alignItems: "end"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: labelStyle,
                                children: t("clients.name")
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                lineNumber: 212,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                required: true,
                                value: name,
                                onChange: (e)=>setName(e.target.value),
                                style: inputStyle,
                                onFocus: (e)=>e.currentTarget.style.borderColor = "var(--accent)",
                                onBlur: (e)=>e.currentTarget.style.borderColor = "var(--con-border)"
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                lineNumber: 213,
                                columnNumber: 7
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                        lineNumber: 211,
                        columnNumber: 6
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: labelStyle,
                                children: t("clients.contractType")
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                lineNumber: 224,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: contractType,
                                onChange: (e)=>setContractType(e.target.value),
                                style: {
                                    ...inputStyle,
                                    cursor: "pointer"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "adhoc",
                                        children: t("clients.adhoc")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                        lineNumber: 230,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "retainer",
                                        children: t("clients.retainer")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                        lineNumber: 231,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                lineNumber: 225,
                                columnNumber: 7
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                        lineNumber: 223,
                        columnNumber: 6
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: labelStyle,
                                children: [
                                    t("clients.hourlyRate"),
                                    " (€/h)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                lineNumber: 236,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                min: "0",
                                step: "0.01",
                                value: hourlyRate,
                                onChange: (e)=>setHourlyRate(e.target.value),
                                style: inputStyle,
                                onFocus: (e)=>e.currentTarget.style.borderColor = "var(--accent)",
                                onBlur: (e)=>e.currentTarget.style.borderColor = "var(--con-border)"
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                lineNumber: 237,
                                columnNumber: 7
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                        lineNumber: 235,
                        columnNumber: 6
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: labelStyle,
                                children: t("clients.language")
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                lineNumber: 250,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: language,
                                onChange: (e)=>setLanguage(e.target.value),
                                style: {
                                    ...inputStyle,
                                    cursor: "pointer"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "fr",
                                        children: t("clients.langFr")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                        lineNumber: 256,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "nl",
                                        children: t("clients.langNl")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                        lineNumber: 257,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "en",
                                        children: t("clients.langEn")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                        lineNumber: 258,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                lineNumber: 251,
                                columnNumber: 7
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                        lineNumber: 249,
                        columnNumber: 6
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: pending,
                        style: {
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
                            whiteSpace: "nowrap"
                        },
                        children: pending ? t("clients.creating") : t("clients.create")
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                        lineNumber: 262,
                        columnNumber: 6
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            gridColumn: "1 / -1",
                            fontFamily: "var(--font-mono)",
                            fontSize: "10px",
                            color: "var(--danger)",
                            background: "var(--danger-l)",
                            padding: "6px 10px",
                            borderRadius: "3px"
                        },
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                        lineNumber: 283,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                lineNumber: 197,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "var(--con-surface)",
                    border: "1px solid var(--con-border)",
                    borderRadius: "4px",
                    overflow: "hidden"
                },
                children: displayed.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        color: "var(--con-subtle)",
                        padding: "48px",
                        textAlign: "center"
                    },
                    children: t("clients.emptyState")
                }, void 0, false, {
                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                    lineNumber: 310,
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
                                        children: t("clients.name")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                        lineNumber: 325,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: TH,
                                        children: t("clients.contractType")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                        lineNumber: 326,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            ...TH,
                                            textAlign: "right"
                                        },
                                        children: t("clients.hourlyRate")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                        lineNumber: 327,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            ...TH,
                                            textAlign: "right"
                                        },
                                        children: t("clients.openTickets")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                        lineNumber: 328,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: TH,
                                        children: t("clients.language")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                        lineNumber: 329,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        style: {
                                            ...TH,
                                            textAlign: "right"
                                        },
                                        children: t("common.actions")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                        lineNumber: 330,
                                        columnNumber: 9
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                lineNumber: 324,
                                columnNumber: 8
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                            lineNumber: 323,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: displayed.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    style: {
                                        cursor: "pointer",
                                        opacity: c.isActive ? 1 : 0.55
                                    },
                                    onMouseEnter: (e)=>e.currentTarget.style.background = "var(--con-bg)",
                                    onMouseLeave: (e)=>e.currentTarget.style.background = "transparent",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: TD,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: `/clients/${c.id}`,
                                                    style: {
                                                        color: c.isActive ? "var(--con-text)" : "var(--con-subtle)",
                                                        fontWeight: 600,
                                                        textDecoration: "none"
                                                    },
                                                    children: c.name
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                                    lineNumber: 342,
                                                    columnNumber: 11
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: "var(--con-subtle)",
                                                        marginLeft: "8px",
                                                        fontSize: "10px"
                                                    },
                                                    children: [
                                                        "/",
                                                        c.slug
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                                    lineNumber: 348,
                                                    columnNumber: 11
                                                }, this),
                                                !c.isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        marginLeft: "8px",
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
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                                    lineNumber: 352,
                                                    columnNumber: 12
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                            lineNumber: 341,
                                            columnNumber: 10
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: TD,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: contractBadge(c.contractType),
                                                children: c.contractType === "retainer" ? t("clients.retainer") : t("clients.adhoc")
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                                lineNumber: 369,
                                                columnNumber: 11
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                            lineNumber: 368,
                                            columnNumber: 10
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                ...TD,
                                                textAlign: "right"
                                            },
                                            children: [
                                                "€",
                                                Number(c.hourlyRate).toFixed(2),
                                                "/h"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                            lineNumber: 373,
                                            columnNumber: 10
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                ...TD,
                                                textAlign: "right",
                                                color: c._count.tickets > 0 ? "var(--warn)" : "var(--con-subtle)",
                                                fontWeight: c._count.tickets > 0 ? 700 : 400
                                            },
                                            children: c._count.tickets
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                            lineNumber: 376,
                                            columnNumber: 10
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                ...TD,
                                                color: "var(--con-muted)"
                                            },
                                            children: langLabel[c.language] ?? c.language
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                            lineNumber: 386,
                                            columnNumber: 10
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            style: {
                                                ...TD,
                                                textAlign: "right"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    gap: "6px",
                                                    justifyContent: "flex-end"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        href: `/clients/${c.id}`,
                                                        style: {
                                                            fontFamily: "var(--font-mono)",
                                                            fontSize: "9px",
                                                            letterSpacing: "0.06em",
                                                            textTransform: "uppercase",
                                                            color: "var(--con-muted)",
                                                            border: "1px solid var(--con-border)",
                                                            borderRadius: "3px",
                                                            padding: "3px 8px",
                                                            textDecoration: "none",
                                                            whiteSpace: "nowrap"
                                                        },
                                                        children: t("clients.view")
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                                        lineNumber: 391,
                                                        columnNumber: 12
                                                    }, this),
                                                    c.isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        href: `/clients/${c.id}?tab=portal`,
                                                        style: {
                                                            fontFamily: "var(--font-mono)",
                                                            fontSize: "9px",
                                                            letterSpacing: "0.06em",
                                                            textTransform: "uppercase",
                                                            color: "var(--accent)",
                                                            border: "1px solid rgba(37,99,235,0.3)",
                                                            borderRadius: "3px",
                                                            padding: "3px 8px",
                                                            textDecoration: "none",
                                                            whiteSpace: "nowrap"
                                                        },
                                                        children: t("clients.portalUsers")
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                                        lineNumber: 409,
                                                        columnNumber: 13
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                                lineNumber: 390,
                                                columnNumber: 11
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                            lineNumber: 389,
                                            columnNumber: 10
                                        }, this)
                                    ]
                                }, c.id, true, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                                    lineNumber: 335,
                                    columnNumber: 9
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                            lineNumber: 333,
                            columnNumber: 7
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                    lineNumber: 322,
                    columnNumber: 6
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
                lineNumber: 301,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/main/app/[locale]/(console)/clients/ClientsView.tsx",
        lineNumber: 130,
        columnNumber: 3
    }, this);
}
}),
];

//# sourceMappingURL=apps_main_app_%5Blocale%5D_%28console%29_clients_ClientsView_tsx_5f4b0d1c._.js.map