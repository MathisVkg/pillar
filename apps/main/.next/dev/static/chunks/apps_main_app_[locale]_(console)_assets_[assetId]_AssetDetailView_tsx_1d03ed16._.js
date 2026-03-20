(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AssetDetailView
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
const sectionStyle = {
    background: "var(--con-surface)",
    border: "1px solid var(--con-border)",
    borderRadius: "4px",
    padding: "20px",
    marginBottom: "16px"
};
const sectionTitle = {
    fontFamily: "var(--font-mono)",
    fontSize: "9px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--con-subtle)",
    marginBottom: "16px",
    paddingBottom: "8px",
    borderBottom: "1px solid var(--con-border)"
};
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
        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
        lineNumber: 84,
        columnNumber: 3
    }, this);
}
_c = Badge;
function AssetDetailView({ asset: initial }) {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$main$2f$components$2f$LangProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [asset, setAsset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initial);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saveError, setSaveError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [confirmDelete, setConfirmDelete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [deleting, setDeleting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Editable fields
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(asset.name);
    const [type, setType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(asset.type);
    const [serialNumber, setSerialNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(asset.serialNumber ?? "");
    const [assignedTo, setAssignedTo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(asset.assignedTo ?? "");
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(asset.status);
    const [sensitivity, setSensitivity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(asset.sensitivity);
    const [showSerial, setShowSerial] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(asset.showSerialInPortal);
    const [warrantyExpiresAt, setWarrantyExpiresAt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(asset.warrantyExpiresAt ?? "");
    const [purchasedAt, setPurchasedAt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(asset.purchasedAt ?? "");
    const [notes, setNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(asset.notes ?? "");
    const TYPE_LABELS = {
        hardware: t("assets.typeHardware"),
        software: t("assets.typeSoftware"),
        license: t("assets.typeLicense"),
        camera: t("assets.typeCamera"),
        network: t("assets.typeNetwork")
    };
    const STATUS_LABELS = {
        ok: t("assets.statusOk"),
        warning: t("assets.statusWarning"),
        critical: t("assets.statusCritical"),
        retired: t("assets.statusRetired")
    };
    const SENSITIVITY_LABELS = {
        normal: t("assets.sensitivityNormal"),
        restricted: t("assets.sensitivityRestricted"),
        internal: t("assets.sensitivityInternal")
    };
    const SENSITIVITY_HINTS = {
        normal: t("assets.sensitivityNormalHint"),
        restricted: t("assets.sensitivityRestrictedHint"),
        internal: t("assets.sensitivityInternalHint")
    };
    async function handleSave() {
        setSaving(true);
        setSaveError(null);
        const res = await fetch(`/api/assets/${asset.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name.trim() || asset.name,
                type,
                serialNumber: serialNumber || null,
                assignedTo: assignedTo || null,
                status,
                sensitivity,
                showSerialInPortal: showSerial,
                warrantyExpiresAt: warrantyExpiresAt || null,
                purchasedAt: purchasedAt || null,
                notes: notes || null
            })
        });
        setSaving(false);
        if (!res.ok) {
            const data = await res.json().catch(()=>({}));
            setSaveError(data.error ?? t("common.error"));
            return;
        }
        const updated = await res.json();
        setAsset(updated);
    }
    async function handleDelete() {
        setDeleting(true);
        const res = await fetch(`/api/assets/${asset.id}`, {
            method: "DELETE"
        });
        if (res.ok) {
            router.push("/assets");
        } else {
            setDeleting(false);
            setConfirmDelete(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            maxWidth: "760px"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: "20px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/assets",
                        style: {
                            fontFamily: "var(--font-mono)",
                            fontSize: "10px",
                            color: "var(--con-muted)",
                            textDecoration: "none",
                            letterSpacing: "0.04em"
                        },
                        children: t("assets.backToAssets")
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                        lineNumber: 196,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: "10px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        style: {
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "14px",
                                            fontWeight: 600,
                                            color: "var(--con-text)",
                                            margin: 0
                                        },
                                        children: asset.name
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                        lineNumber: 207,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                        label: TYPE_LABELS[asset.type] ?? asset.type,
                                        colors: TYPE_COLORS[asset.type] ?? TYPE_COLORS.hardware
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                        lineNumber: 210,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
                                        label: STATUS_LABELS[asset.status] ?? asset.status,
                                        colors: STATUS_COLORS[asset.status] ?? STATUS_COLORS.ok
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                        lineNumber: 211,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                lineNumber: 206,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: "8px"
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
                                            letterSpacing: "0.04em",
                                            background: "var(--accent)",
                                            color: "#fff",
                                            border: "none",
                                            borderRadius: "4px",
                                            padding: "6px 14px",
                                            cursor: "pointer",
                                            opacity: saving ? 0.6 : 1
                                        },
                                        children: saving ? t("assets.saving") : t("assets.save")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                        lineNumber: 214,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setConfirmDelete(true),
                                        style: {
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "10px",
                                            letterSpacing: "0.04em",
                                            background: "transparent",
                                            color: "#dc2626",
                                            border: "1px solid rgba(220,38,38,0.3)",
                                            borderRadius: "4px",
                                            padding: "6px 12px",
                                            cursor: "pointer"
                                        },
                                        children: t("assets.delete")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                        lineNumber: 226,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                lineNumber: 213,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                        lineNumber: 205,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: "6px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "10px",
                                    color: "var(--con-muted)"
                                },
                                children: [
                                    t("assets.client"),
                                    ":",
                                    " "
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                lineNumber: 241,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: `/clients/${asset.client.id}`,
                                style: {
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "10px",
                                    color: "var(--accent)",
                                    textDecoration: "none"
                                },
                                children: asset.client.name
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                lineNumber: 244,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                        lineNumber: 240,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                lineNumber: 195,
                columnNumber: 4
            }, this),
            saveError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "#dc2626",
                    marginBottom: "12px"
                },
                children: saveError
            }, void 0, false, {
                fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                lineNumber: 254,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: sectionStyle,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: sectionTitle,
                        children: t("assets.title")
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                        lineNumber: 259,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: "2fr 1fr 1fr",
                            gap: "16px",
                            marginBottom: "16px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: t("assets.name")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                        lineNumber: 262,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: name,
                                        onChange: (e)=>setName(e.target.value),
                                        style: inputStyle
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                        lineNumber: 263,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                lineNumber: 261,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: t("assets.type")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                        lineNumber: 266,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: type,
                                        onChange: (e)=>setType(e.target.value),
                                        style: {
                                            ...inputStyle,
                                            cursor: "pointer"
                                        },
                                        children: Object.entries(TYPE_LABELS).map(([v, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: v,
                                                children: label
                                            }, v, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                                lineNumber: 268,
                                                columnNumber: 57
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                        lineNumber: 267,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                lineNumber: 265,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: t("assets.status")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                        lineNumber: 272,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: status,
                                        onChange: (e)=>setStatus(e.target.value),
                                        style: {
                                            ...inputStyle,
                                            cursor: "pointer"
                                        },
                                        children: Object.entries(STATUS_LABELS).map(([v, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: v,
                                                children: label
                                            }, v, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                                lineNumber: 274,
                                                columnNumber: 59
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                        lineNumber: 273,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                lineNumber: 271,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                        lineNumber: 260,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "16px",
                            marginBottom: "16px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: t("assets.serialNumber")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                        lineNumber: 280,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: serialNumber,
                                        onChange: (e)=>setSerialNumber(e.target.value),
                                        style: {
                                            ...inputStyle,
                                            fontFamily: "var(--font-mono)",
                                            letterSpacing: "0.04em"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                        lineNumber: 281,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                lineNumber: 279,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: t("assets.assignedTo")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                        lineNumber: 288,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: assignedTo,
                                        onChange: (e)=>setAssignedTo(e.target.value),
                                        style: inputStyle
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                        lineNumber: 289,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                lineNumber: 287,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                        lineNumber: 278,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "16px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: t("assets.warrantyExpiry")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                        lineNumber: 294,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "date",
                                        value: warrantyExpiresAt,
                                        onChange: (e)=>setWarrantyExpiresAt(e.target.value),
                                        style: {
                                            ...inputStyle,
                                            cursor: "pointer"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                        lineNumber: 295,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                lineNumber: 293,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: t("assets.purchasedAt")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                        lineNumber: 298,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "date",
                                        value: purchasedAt,
                                        onChange: (e)=>setPurchasedAt(e.target.value),
                                        style: {
                                            ...inputStyle,
                                            cursor: "pointer"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                        lineNumber: 299,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                lineNumber: 297,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                        lineNumber: 292,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                lineNumber: 258,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: sectionStyle,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: sectionTitle,
                        children: t("assets.sensitivity")
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                        lineNumber: 306,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: "16px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: labelStyle,
                                children: t("assets.sensitivity")
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                lineNumber: 310,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "6px"
                                },
                                children: Object.entries(SENSITIVITY_LABELS).map(([v, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            cursor: "pointer"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "radio",
                                                name: "sensitivity",
                                                value: v,
                                                checked: sensitivity === v,
                                                onChange: ()=>setSensitivity(v)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                                lineNumber: 314,
                                                columnNumber: 9
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "var(--font-mono)",
                                                    fontSize: "12px",
                                                    color: "var(--con-text)"
                                                },
                                                children: label
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                                lineNumber: 321,
                                                columnNumber: 9
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "var(--font-mono)",
                                                    fontSize: "10px",
                                                    color: "var(--con-muted)"
                                                },
                                                children: [
                                                    "— ",
                                                    SENSITIVITY_HINTS[v]
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                                lineNumber: 322,
                                                columnNumber: 9
                                            }, this)
                                        ]
                                    }, v, true, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                        lineNumber: 313,
                                        columnNumber: 8
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                lineNumber: 311,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                        lineNumber: 309,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                cursor: "pointer"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "checkbox",
                                    checked: showSerial,
                                    onChange: (e)=>setShowSerial(e.target.checked)
                                }, void 0, false, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                    lineNumber: 333,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "12px",
                                        color: "var(--con-text)"
                                    },
                                    children: t("assets.showSerialLabel")
                                }, void 0, false, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                    lineNumber: 338,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "10px",
                                        color: "var(--con-muted)"
                                    },
                                    children: [
                                        "— ",
                                        t("assets.showSerialHint")
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                    lineNumber: 341,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                            lineNumber: 332,
                            columnNumber: 6
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                        lineNumber: 331,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                lineNumber: 305,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: sectionStyle,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        style: {
                            ...sectionTitle,
                            display: "flex",
                            alignItems: "center",
                            gap: "8px"
                        },
                        children: [
                            t("assets.notes"),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: "9px",
                                    color: "var(--con-muted)",
                                    fontWeight: 400,
                                    textTransform: "none",
                                    letterSpacing: 0
                                },
                                children: t("assets.notesHint")
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                lineNumber: 352,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                        lineNumber: 350,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        value: notes,
                        onChange: (e)=>setNotes(e.target.value),
                        rows: 4,
                        style: {
                            ...inputStyle,
                            resize: "vertical"
                        }
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                        lineNumber: 356,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                lineNumber: 349,
                columnNumber: 4
            }, this),
            confirmDelete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: "rgba(220,38,38,0.06)",
                    border: "1px solid rgba(220,38,38,0.25)",
                    borderRadius: "4px",
                    padding: "16px",
                    marginTop: "8px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                            color: "#dc2626",
                            margin: "0 0 12px"
                        },
                        children: t("assets.confirmDelete")
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                        lineNumber: 373,
                        columnNumber: 6
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: "8px"
                        },
                        children: [
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
                                    padding: "6px 14px",
                                    cursor: "pointer",
                                    opacity: deleting ? 0.6 : 1
                                },
                                children: t("assets.delete")
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                lineNumber: 377,
                                columnNumber: 7
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
                                    padding: "6px 12px",
                                    cursor: "pointer"
                                },
                                children: t("common.cancel")
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                                lineNumber: 389,
                                columnNumber: 7
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                        lineNumber: 376,
                        columnNumber: 6
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
                lineNumber: 366,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/main/app/[locale]/(console)/assets/[assetId]/AssetDetailView.tsx",
        lineNumber: 193,
        columnNumber: 3
    }, this);
}
_s(AssetDetailView, "76rmdA5FbkBIs0f2p8xgjwWqaoo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$main$2f$components$2f$LangProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c1 = AssetDetailView;
var _c, _c1;
__turbopack_context__.k.register(_c, "Badge");
__turbopack_context__.k.register(_c1, "AssetDetailView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_main_app_%5Blocale%5D_%28console%29_assets_%5BassetId%5D_AssetDetailView_tsx_1d03ed16._.js.map