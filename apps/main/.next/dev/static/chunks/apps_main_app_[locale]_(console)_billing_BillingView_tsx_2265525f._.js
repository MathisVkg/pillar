(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BillingView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$main$2f$components$2f$LangProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/main/components/LangProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
// ─── Helpers ──────────────────────────────────────────────────────────────────
function toHours(minutes) {
    const h = minutes / 60;
    return `${h % 1 === 0 ? h.toFixed(0) : h.toFixed(2)}h`;
}
function fmtAmount(n) {
    return `€${n.toFixed(2)}`;
}
// ─── Style tokens ─────────────────────────────────────────────────────────────
const MONO = {
    fontFamily: "var(--font-mono)"
};
const TH = {
    ...MONO,
    fontSize: "9px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--con-subtle)",
    padding: "7px 12px",
    textAlign: "left",
    fontWeight: 500,
    borderBottom: "1px solid var(--con-border)",
    whiteSpace: "nowrap"
};
const TD = {
    ...MONO,
    fontSize: "11px",
    color: "var(--con-text)",
    padding: "8px 12px",
    borderBottom: "1px solid var(--con-border)",
    whiteSpace: "nowrap"
};
// ─── Retainer progress bar ────────────────────────────────────────────────────
function RetainerBar({ usedMinutes, includedHours, t }) {
    const usedH = usedMinutes / 60;
    const pct = Math.min(usedH / includedHours * 100, 100);
    const over = usedH > includedHours;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            marginBottom: "12px"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "5px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            ...MONO,
                            fontSize: "9px",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "var(--con-subtle)"
                        },
                        children: t("billing.retainerUsage")
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                        lineNumber: 86,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            ...MONO,
                            fontSize: "11px",
                            fontWeight: 600,
                            color: over ? "#dc2626" : "#2563EB"
                        },
                        children: t("billing.retainerUsed", {
                            used: usedH.toFixed(1),
                            total: includedHours
                        })
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                        lineNumber: 89,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                lineNumber: 85,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    height: "6px",
                    borderRadius: "3px",
                    background: "#DBEAFE",
                    overflow: "hidden"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        height: "100%",
                        width: `${pct}%`,
                        borderRadius: "3px",
                        background: over ? "#dc2626" : "#2563EB",
                        transition: "width 0.3s ease"
                    }
                }, void 0, false, {
                    fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                    lineNumber: 94,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                lineNumber: 93,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
        lineNumber: 84,
        columnNumber: 3
    }, this);
}
_c = RetainerBar;
// ─── Client billing card ──────────────────────────────────────────────────────
function ClientCard({ billing, onInvoiced }) {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$main$2f$components$2f$LangProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const [generating, setGenerating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [flash, setFlash] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const isRetainer = billing.contractType === "retainer";
    const includedMinutes = (billing.retainerHours ?? 0) * 60;
    const extraMinutes = Math.max(billing.totalMinutes - includedMinutes, 0);
    const includedUsedMinutes = Math.min(billing.totalMinutes, includedMinutes);
    // For retainer: amount = retainerFee + (extra hours × rate)
    const retainerDisplay = isRetainer && billing.retainerFee != null ? billing.retainerFee + extraMinutes / 60 * billing.hourlyRate : null;
    const displayAmount = retainerDisplay ?? billing.totalAmount;
    async function handleGenerate() {
        setGenerating(true);
        setFlash(null);
        const res = await fetch("/api/invoices", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                clientId: billing.clientId
            })
        });
        setGenerating(false);
        if (!res.ok) {
            setFlash("error");
            setTimeout(()=>setFlash(null), 3000);
            return;
        }
        setFlash("success");
        setTimeout(()=>{
            setFlash(null);
            onInvoiced(billing.clientId);
        }, 1500);
    }
    const contractBadge = {
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
        verticalAlign: "middle"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: "var(--con-surface)",
            border: "1px solid var(--con-border)",
            borderRadius: "6px",
            overflow: "hidden"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "14px 18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: expanded ? "1px solid var(--con-border)" : "none",
                    gap: "12px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            flex: 1,
                            minWidth: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setExpanded((v)=>!v),
                                style: {
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    ...MONO,
                                    fontSize: "10px",
                                    color: "var(--con-subtle)",
                                    padding: "0 2px",
                                    flexShrink: 0
                                },
                                children: expanded ? "▾" : "▸"
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                lineNumber: 190,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    minWidth: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            ...MONO,
                                            fontSize: "14px",
                                            fontWeight: 700,
                                            color: "var(--con-text)"
                                        },
                                        children: billing.clientName
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                        lineNumber: 202,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: contractBadge,
                                        children: billing.contractType === "retainer" ? "Retainer" : "Ad hoc"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                        lineNumber: 205,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            ...MONO,
                                            fontSize: "9px",
                                            color: "var(--con-subtle)",
                                            marginTop: "2px"
                                        },
                                        children: [
                                            billing.entries.length,
                                            " ",
                                            t("billing.unbilledEntries")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                        lineNumber: 206,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                lineNumber: 201,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                        lineNumber: 189,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            flexShrink: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: "right"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            ...MONO,
                                            fontSize: "9px",
                                            letterSpacing: "0.08em",
                                            textTransform: "uppercase",
                                            color: "var(--con-subtle)",
                                            marginBottom: "2px"
                                        },
                                        children: t("billing.total")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                        lineNumber: 215,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            ...MONO,
                                            fontSize: "20px",
                                            fontWeight: 700,
                                            color: "#2563EB",
                                            lineHeight: 1
                                        },
                                        children: fmtAmount(displayAmount)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                        lineNumber: 218,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            ...MONO,
                                            fontSize: "9px",
                                            color: "var(--con-subtle)",
                                            marginTop: "2px"
                                        },
                                        children: t("billing.exclVat")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                        lineNumber: 221,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                lineNumber: 214,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-end",
                                    gap: "4px"
                                },
                                children: flash === "success" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        ...MONO,
                                        fontSize: "10px",
                                        color: "#16a34a",
                                        fontWeight: 600
                                    },
                                    children: t("billing.invoiceCreated")
                                }, void 0, false, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                    lineNumber: 228,
                                    columnNumber: 8
                                }, this) : flash === "error" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        ...MONO,
                                        fontSize: "10px",
                                        color: "var(--danger)"
                                    },
                                    children: t("billing.invoiceError")
                                }, void 0, false, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                    lineNumber: 232,
                                    columnNumber: 8
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: handleGenerate,
                                    disabled: generating,
                                    style: {
                                        ...MONO,
                                        fontSize: "10px",
                                        fontWeight: 600,
                                        letterSpacing: "0.04em",
                                        background: generating ? "var(--con-border)" : "#2563EB",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "4px",
                                        padding: "7px 14px",
                                        cursor: generating ? "not-allowed" : "pointer",
                                        whiteSpace: "nowrap"
                                    },
                                    children: generating ? t("billing.generating") : t("billing.generateInvoice")
                                }, void 0, false, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                    lineNumber: 236,
                                    columnNumber: 8
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                lineNumber: 226,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                        lineNumber: 213,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                lineNumber: 181,
                columnNumber: 4
            }, this),
            expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "14px 18px"
                },
                children: [
                    isRetainer && billing.retainerHours != null && billing.retainerHours > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RetainerBar, {
                        usedMinutes: includedUsedMinutes,
                        includedHours: billing.retainerHours,
                        t: t
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                        lineNumber: 260,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            border: "1px solid var(--con-border)",
                            borderRadius: "4px",
                            overflow: "hidden",
                            marginBottom: isRetainer ? "12px" : "0"
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: TH,
                                                children: t("billing.date")
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                                lineNumber: 272,
                                                columnNumber: 10
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: TH,
                                                children: t("billing.description")
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                                lineNumber: 273,
                                                columnNumber: 10
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: TH,
                                                children: t("billing.ticket")
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                                lineNumber: 274,
                                                columnNumber: 10
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    ...TH,
                                                    textAlign: "right"
                                                },
                                                children: t("billing.duration")
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                                lineNumber: 275,
                                                columnNumber: 10
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    ...TH,
                                                    textAlign: "right"
                                                },
                                                children: "€/h"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                                lineNumber: 276,
                                                columnNumber: 10
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                style: {
                                                    ...TH,
                                                    textAlign: "right"
                                                },
                                                children: t("billing.amount")
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                                lineNumber: 277,
                                                columnNumber: 10
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                        lineNumber: 271,
                                        columnNumber: 9
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                    lineNumber: 270,
                                    columnNumber: 8
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: billing.entries.map((e)=>{
                                        const amt = e.durationMinutes / 60 * e.hourlyRate;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            onMouseEnter: (ev)=>ev.currentTarget.style.background = "var(--con-bg)",
                                            onMouseLeave: (ev)=>ev.currentTarget.style.background = "transparent",
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
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                                    lineNumber: 288,
                                                    columnNumber: 12
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        ...TD,
                                                        maxWidth: "320px",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis"
                                                    },
                                                    children: e.description
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                                    lineNumber: 291,
                                                    columnNumber: 12
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: TD,
                                                    children: e.ticket ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: `/tickets/${e.ticket.id}`,
                                                        style: {
                                                            color: "#2563EB",
                                                            fontWeight: 700,
                                                            textDecoration: "none",
                                                            ...MONO,
                                                            fontSize: "11px"
                                                        },
                                                        children: e.ticket.reference
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                                        lineNumber: 296,
                                                        columnNumber: 14
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            color: "var(--con-subtle)"
                                                        },
                                                        children: "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                                        lineNumber: 303,
                                                        columnNumber: 14
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                                    lineNumber: 294,
                                                    columnNumber: 12
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        ...TD,
                                                        textAlign: "right"
                                                    },
                                                    children: toHours(e.durationMinutes)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                                    lineNumber: 306,
                                                    columnNumber: 12
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        ...TD,
                                                        textAlign: "right",
                                                        color: "var(--con-muted)"
                                                    },
                                                    children: [
                                                        "€",
                                                        e.hourlyRate.toFixed(2)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                                    lineNumber: 307,
                                                    columnNumber: 12
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    style: {
                                                        ...TD,
                                                        textAlign: "right",
                                                        fontWeight: 600
                                                    },
                                                    children: fmtAmount(amt)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                                    lineNumber: 310,
                                                    columnNumber: 12
                                                }, this)
                                            ]
                                        }, e.id, true, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                            lineNumber: 284,
                                            columnNumber: 11
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                    lineNumber: 280,
                                    columnNumber: 8
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                            lineNumber: 269,
                            columnNumber: 7
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                        lineNumber: 268,
                        columnNumber: 6
                    }, this),
                    isRetainer && billing.retainerFee != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: "12px",
                            background: "rgba(37,99,235,0.04)",
                            border: "1px solid rgba(37,99,235,0.15)",
                            borderRadius: "4px",
                            padding: "10px 14px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "6px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            ...MONO,
                                            fontSize: "10px",
                                            color: "var(--con-muted)"
                                        },
                                        children: t("billing.retainerFlat")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                        lineNumber: 333,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            ...MONO,
                                            fontSize: "12px",
                                            fontWeight: 600,
                                            color: "var(--con-text)"
                                        },
                                        children: fmtAmount(billing.retainerFee)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                        lineNumber: 336,
                                        columnNumber: 9
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                lineNumber: 332,
                                columnNumber: 8
                            }, this),
                            extraMinutes > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            ...MONO,
                                            fontSize: "10px",
                                            color: "var(--con-muted)"
                                        },
                                        children: [
                                            t("billing.extraHours"),
                                            " (",
                                            toHours(extraMinutes),
                                            " × €",
                                            billing.hourlyRate.toFixed(2),
                                            "/h)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                        lineNumber: 342,
                                        columnNumber: 10
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            ...MONO,
                                            fontSize: "12px",
                                            fontWeight: 600,
                                            color: "#dc2626"
                                        },
                                        children: [
                                            "+",
                                            fmtAmount(extraMinutes / 60 * billing.hourlyRate)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                        lineNumber: 345,
                                        columnNumber: 10
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                lineNumber: 341,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    borderTop: "1px solid rgba(37,99,235,0.2)",
                                    paddingTop: "6px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            ...MONO,
                                            fontSize: "10px",
                                            letterSpacing: "0.06em",
                                            textTransform: "uppercase",
                                            color: "var(--con-subtle)"
                                        },
                                        children: [
                                            t("billing.total"),
                                            " (",
                                            t("billing.exclVat"),
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                        lineNumber: 351,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            ...MONO,
                                            fontSize: "16px",
                                            fontWeight: 700,
                                            color: "#2563EB"
                                        },
                                        children: fmtAmount(displayAmount)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                        lineNumber: 354,
                                        columnNumber: 9
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                lineNumber: 350,
                                columnNumber: 8
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                        lineNumber: 322,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                lineNumber: 257,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
        lineNumber: 174,
        columnNumber: 3
    }, this);
}
_s(ClientCard, "w3M/cCG8BqL5izPukzlsNFzjdzg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$main$2f$components$2f$LangProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c1 = ClientCard;
function BillingView({ initialData }) {
    _s1();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$main$2f$components$2f$LangProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialData);
    const grandTotal = data.reduce((s, c)=>{
        if (c.contractType === "retainer" && c.retainerFee != null) {
            const extraMin = Math.max(c.totalMinutes - (c.retainerHours ?? 0) * 60, 0);
            return s + c.retainerFee + extraMin / 60 * c.hourlyRate;
        }
        return s + c.totalAmount;
    }, 0);
    function handleInvoiced(clientId) {
        setData((prev)=>prev.filter((c)=>c.clientId !== clientId));
        router.refresh();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "20px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        style: {
                            ...MONO,
                            fontSize: "11px",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "var(--con-subtle)"
                        },
                        children: t("billing.title")
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                        lineNumber: 391,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/billing/invoices",
                        style: {
                            ...MONO,
                            fontSize: "9px",
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            color: "var(--con-muted)",
                            border: "1px solid var(--con-border)",
                            borderRadius: "4px",
                            padding: "5px 10px",
                            textDecoration: "none"
                        },
                        children: [
                            t("billing.viewInvoices"),
                            " →"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                        lineNumber: 394,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                lineNumber: 390,
                columnNumber: 4
            }, this),
            data.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "var(--con-surface)",
                    border: "1px solid var(--con-border)",
                    borderRadius: "6px",
                    padding: "64px 48px",
                    textAlign: "center"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: "28px",
                            marginBottom: "12px"
                        },
                        children: "✓"
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                        lineNumber: 414,
                        columnNumber: 6
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            ...MONO,
                            fontSize: "12px",
                            color: "var(--con-subtle)",
                            margin: 0
                        },
                        children: t("billing.emptyState")
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                        lineNumber: 415,
                        columnNumber: 6
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                lineNumber: 407,
                columnNumber: 5
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: "#0F172A",
                            borderRadius: "6px",
                            padding: "16px 20px",
                            marginBottom: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "16px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            ...MONO,
                                            fontSize: "9px",
                                            letterSpacing: "0.12em",
                                            textTransform: "uppercase",
                                            color: "#64748b",
                                            marginBottom: "4px"
                                        },
                                        children: t("billing.totalUnbilled")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                        lineNumber: 433,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            ...MONO,
                                            fontSize: "28px",
                                            fontWeight: 700,
                                            color: "#fff",
                                            lineHeight: 1
                                        },
                                        children: fmtAmount(grandTotal)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                        lineNumber: 436,
                                        columnNumber: 8
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            ...MONO,
                                            fontSize: "9px",
                                            color: "#64748b",
                                            marginTop: "3px"
                                        },
                                        children: [
                                            t("billing.exclVat"),
                                            " · ",
                                            t("billing.acrossClients", {
                                                n: data.length
                                            })
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                        lineNumber: 439,
                                        columnNumber: 8
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                lineNumber: 432,
                                columnNumber: 7
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: "20px"
                                },
                                children: data.map((c)=>{
                                    const amt = c.contractType === "retainer" && c.retainerFee != null ? c.retainerFee + Math.max(c.totalMinutes - (c.retainerHours ?? 0) * 60, 0) / 60 * c.hourlyRate : c.totalAmount;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            textAlign: "right"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    ...MONO,
                                                    fontSize: "9px",
                                                    color: "#64748b",
                                                    marginBottom: "2px"
                                                },
                                                children: c.clientName
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                                lineNumber: 452,
                                                columnNumber: 11
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    ...MONO,
                                                    fontSize: "13px",
                                                    fontWeight: 600,
                                                    color: "#2563EB"
                                                },
                                                children: fmtAmount(amt)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                                lineNumber: 455,
                                                columnNumber: 11
                                            }, this)
                                        ]
                                    }, c.clientId, true, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                        lineNumber: 451,
                                        columnNumber: 10
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                lineNumber: 445,
                                columnNumber: 7
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                        lineNumber: 422,
                        columnNumber: 6
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px"
                        },
                        children: data.map((billing)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ClientCard, {
                                billing: billing,
                                onInvoiced: handleInvoiced
                            }, billing.clientId, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                                lineNumber: 467,
                                columnNumber: 8
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
                        lineNumber: 465,
                        columnNumber: 6
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/main/app/[locale]/(console)/billing/BillingView.tsx",
        lineNumber: 388,
        columnNumber: 3
    }, this);
}
_s1(BillingView, "ksDACm3t97uNeInTxrppyxJSRPY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$main$2f$components$2f$LangProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c2 = BillingView;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "RetainerBar");
__turbopack_context__.k.register(_c1, "ClientCard");
__turbopack_context__.k.register(_c2, "BillingView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_main_app_%5Blocale%5D_%28console%29_billing_BillingView_tsx_2265525f._.js.map