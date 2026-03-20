module.exports = [
"[project]/apps/main/app/favicon.ico.mjs { IMAGE => \"[project]/apps/main/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/apps/main/app/favicon.ico.mjs { IMAGE => \"[project]/apps/main/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/apps/main/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/apps/main/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/apps/main/app/[locale]/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/apps/main/app/[locale]/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/apps/main/app/[locale]/(console)/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/apps/main/app/[locale]/(console)/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$main$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/main/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$database$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/database/index.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$main$2f$lib$2f$i18n$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/main/lib/i18n/index.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
;
;
;
;
;
const metadata = {
    title: "Pillar · Dashboard"
};
function daysFromNow(date) {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}
function urgencyColor(days) {
    if (days < 0) return "#dc2626";
    if (days <= 30) return "#dc2626";
    if (days <= 60) return "#ca8a04";
    return "#16a34a";
}
async function DashboardPage({ params }) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$main$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    const { locale } = await params;
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$main$2f$lib$2f$i18n$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getT"])(locale);
    const now = new Date();
    const in60Days = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);
    // ── Fetch all dashboard data in parallel ───────────────────────────────────
    const [openTicketCount, activeClientCount, rawUnbilledEntries, rawWarranties, rawRenewals, rawAssetCounts] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$database$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].ticket.count({
            where: {
                status: {
                    in: [
                        "open",
                        "in_progress"
                    ]
                },
                client: {
                    isActive: true
                }
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$database$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].client.count({
            where: {
                isActive: true
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$database$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].timeEntry.findMany({
            where: {
                isInvoiced: false,
                isBillable: true,
                client: {
                    isActive: true
                }
            },
            select: {
                durationMinutes: true,
                hourlyRate: true,
                clientId: true,
                client: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$database$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].asset.findMany({
            where: {
                warrantyExpiresAt: {
                    lte: in60Days
                },
                status: {
                    not: "retired"
                },
                client: {
                    isActive: true
                }
            },
            orderBy: {
                warrantyExpiresAt: "asc"
            },
            select: {
                id: true,
                name: true,
                warrantyExpiresAt: true,
                client: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$database$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].contract.findMany({
            where: {
                renewalDate: {
                    lte: in60Days
                },
                client: {
                    isActive: true
                }
            },
            orderBy: {
                renewalDate: "asc"
            },
            select: {
                id: true,
                name: true,
                vendor: true,
                renewalDate: true,
                costPerYear: true,
                client: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$database$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prisma"].asset.groupBy({
            by: [
                "status"
            ],
            where: {
                client: {
                    isActive: true
                },
                status: {
                    in: [
                        "ok",
                        "warning",
                        "critical"
                    ]
                }
            },
            _count: {
                _all: true
            }
        })
    ]);
    // ── Process unbilled by client ─────────────────────────────────────────────
    const clientMap = new Map();
    for (const e of rawUnbilledEntries){
        const cur = clientMap.get(e.clientId) ?? {
            id: e.clientId,
            name: e.client.name,
            minutes: 0,
            amount: 0
        };
        cur.minutes += e.durationMinutes;
        cur.amount += e.durationMinutes / 60 * Number(e.hourlyRate);
        clientMap.set(e.clientId, cur);
    }
    const unbilledByClient = Array.from(clientMap.values()).sort((a, b)=>b.amount - a.amount).map((c)=>({
            ...c,
            amount: Math.round(c.amount * 100) / 100
        }));
    const totalUnbilledMinutes = unbilledByClient.reduce((s, c)=>s + c.minutes, 0);
    const totalUnbilledAmount = unbilledByClient.reduce((s, c)=>s + c.amount, 0);
    // ── Process warranties ─────────────────────────────────────────────────────
    const expiringWarranties = rawWarranties.map((a)=>({
            ...a,
            warrantyExpiresAt: a.warrantyExpiresAt.toISOString().slice(0, 10),
            daysLeft: daysFromNow(a.warrantyExpiresAt)
        }));
    // ── Process contract renewals ──────────────────────────────────────────────
    const upcomingRenewals = rawRenewals.map((c)=>({
            ...c,
            renewalDate: c.renewalDate.toISOString().slice(0, 10),
            daysUntilRenewal: daysFromNow(c.renewalDate),
            costPerYear: c.costPerYear ? Number(c.costPerYear) : null
        }));
    // ── Asset health summary ───────────────────────────────────────────────────
    const healthMap = {
        ok: 0,
        warning: 0,
        critical: 0
    };
    for (const row of rawAssetCounts)healthMap[row.status] = row._count._all;
    // ── Metrics ────────────────────────────────────────────────────────────────
    const totalUnbilledHours = Math.round(totalUnbilledMinutes / 60 * 10) / 10;
    const metrics = [
        {
            label: t("dashboard.hoursThisMonth"),
            value: totalUnbilledHours > 0 ? String(totalUnbilledHours) : "—",
            sub: totalUnbilledAmount > 0 ? `€${Math.round(totalUnbilledAmount).toLocaleString("fr-BE")} unbilled` : t("dashboard.noEntriesYet"),
            color: totalUnbilledHours > 0 ? "var(--accent)" : "var(--con-text)"
        },
        {
            label: t("dashboard.openTickets"),
            value: String(openTicketCount),
            sub: t("dashboard.acrossAllClients"),
            color: openTicketCount > 0 ? "#ca8a04" : "var(--con-text)"
        },
        {
            label: t("dashboard.clientsActive"),
            value: String(activeClientCount),
            sub: t("dashboard.goToClients")
        },
        {
            label: t("dashboard.expiringWarranties"),
            value: String(expiringWarranties.length + upcomingRenewals.length),
            sub: expiringWarranties.length + upcomingRenewals.length > 0 ? "alerts" : "all clear",
            color: expiringWarranties.length + upcomingRenewals.length > 0 ? "#dc2626" : "#16a34a"
        }
    ];
    // ── Shared styles ──────────────────────────────────────────────────────────
    const card = {
        background: "var(--con-surface)",
        border: "1px solid var(--con-border)",
        borderRadius: "4px",
        padding: "14px 16px"
    };
    const cardTitle = {
        fontFamily: "var(--font-mono)",
        fontSize: "9px",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "var(--con-subtle)",
        marginBottom: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    };
    const rowStyle = {
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        padding: "6px 0",
        borderBottom: "1px solid var(--con-border)"
    };
    const mono = {
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        color: "var(--con-text)"
    };
    const muted = {
        fontFamily: "var(--font-mono)",
        fontSize: "10px",
        color: "var(--con-muted)"
    };
    const OVERDUE_BADGE = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        style: {
            fontFamily: "var(--font-mono)",
            fontSize: "8px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            padding: "1px 5px",
            borderRadius: "2px",
            background: "#dc2626",
            color: "#fff",
            fontWeight: 700,
            marginRight: "6px"
        },
        children: t("dashboard.overdueBadge")
    }, void 0, false, {
        fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
        lineNumber: 190,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: "20px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        style: {
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "var(--con-subtle)",
                            marginBottom: "4px"
                        },
                        children: t("dashboard.morningBriefing")
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                        lineNumber: 203,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontFamily: "var(--font-mono)",
                            fontSize: "10px",
                            color: "var(--con-subtle)"
                        },
                        children: now.toLocaleDateString(locale, {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        })
                    }, void 0, false, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                        lineNumber: 206,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                lineNumber: 202,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "6px",
                    marginBottom: "12px"
                },
                children: metrics.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: card,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "9px",
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                    color: "var(--con-subtle)",
                                    marginBottom: "4px"
                                },
                                children: m.label
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                lineNumber: 215,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "22px",
                                    fontWeight: 600,
                                    color: m.color ?? "var(--con-text)",
                                    lineHeight: 1
                                },
                                children: m.value
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                lineNumber: 218,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "9px",
                                    color: "var(--con-subtle)",
                                    marginTop: "3px"
                                },
                                children: m.sub
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                lineNumber: 221,
                                columnNumber: 13
                            }, this)
                        ]
                    }, m.label, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                        lineNumber: 214,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                lineNumber: 212,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "6px",
                    marginBottom: "6px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: card,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: cardTitle,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: t("dashboard.expiringWarranties")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                        lineNumber: 234,
                                        columnNumber: 13
                                    }, this),
                                    expiringWarranties.length > 5 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/${locale}/assets`,
                                        style: {
                                            ...muted,
                                            textDecoration: "none"
                                        },
                                        children: t("dashboard.viewAll", {
                                            n: expiringWarranties.length
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                        lineNumber: 236,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                lineNumber: 233,
                                columnNumber: 11
                            }, this),
                            expiringWarranties.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    ...muted,
                                    padding: "8px 0"
                                },
                                children: t("dashboard.noExpiring")
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                lineNumber: 242,
                                columnNumber: 13
                            }, this) : expiringWarranties.slice(0, 5).map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: rowStyle,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        ...mono,
                                                        fontWeight: 500
                                                    },
                                                    children: a.name
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                                    lineNumber: 247,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        ...muted,
                                                        marginLeft: "8px"
                                                    },
                                                    children: a.client.name
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                                    lineNumber: 248,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                            lineNumber: 246,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "10px"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        ...mono,
                                                        color: "var(--con-muted)"
                                                    },
                                                    children: a.warrantyExpiresAt
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                                    lineNumber: 251,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontFamily: "var(--font-mono)",
                                                        fontSize: "11px",
                                                        fontWeight: 700,
                                                        color: urgencyColor(a.daysLeft),
                                                        minWidth: "36px",
                                                        textAlign: "right"
                                                    },
                                                    children: a.daysLeft < 0 ? `${Math.abs(a.daysLeft)}d ago` : t("dashboard.daysLeft", {
                                                        n: a.daysLeft
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                                    lineNumber: 252,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                            lineNumber: 250,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, a.id, true, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                    lineNumber: 245,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                        lineNumber: 232,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: card,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: cardTitle,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: t("dashboard.contractRenewals")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                        lineNumber: 264,
                                        columnNumber: 13
                                    }, this),
                                    upcomingRenewals.length > 5 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/${locale}/contracts`,
                                        style: {
                                            ...muted,
                                            textDecoration: "none"
                                        },
                                        children: t("dashboard.viewAll", {
                                            n: upcomingRenewals.length
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                        lineNumber: 266,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                lineNumber: 263,
                                columnNumber: 11
                            }, this),
                            upcomingRenewals.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    ...muted,
                                    padding: "8px 0"
                                },
                                children: t("dashboard.noRenewals")
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                lineNumber: 272,
                                columnNumber: 13
                            }, this) : upcomingRenewals.slice(0, 5).map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: rowStyle,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                minWidth: 0,
                                                flex: 1
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        display: "flex",
                                                        alignItems: "center",
                                                        flexWrap: "wrap",
                                                        gap: "4px"
                                                    },
                                                    children: [
                                                        c.daysUntilRenewal < 0 && OVERDUE_BADGE,
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                ...mono,
                                                                fontWeight: 500
                                                            },
                                                            children: c.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                                            lineNumber: 279,
                                                            columnNumber: 21
                                                        }, this),
                                                        c.vendor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                ...muted,
                                                                marginLeft: "4px"
                                                            },
                                                            children: [
                                                                "· ",
                                                                c.vendor
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                                            lineNumber: 280,
                                                            columnNumber: 34
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                                    lineNumber: 277,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        ...muted
                                                    },
                                                    children: c.client.name
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                                    lineNumber: 282,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                            lineNumber: 276,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "10px",
                                                flexShrink: 0,
                                                paddingLeft: "12px"
                                            },
                                            children: [
                                                c.costPerYear != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        ...muted
                                                    },
                                                    children: [
                                                        "€",
                                                        c.costPerYear.toLocaleString("fr-BE", {
                                                            maximumFractionDigits: 0
                                                        })
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                                    lineNumber: 286,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontFamily: "var(--font-mono)",
                                                        fontSize: "11px",
                                                        fontWeight: 700,
                                                        color: urgencyColor(c.daysUntilRenewal),
                                                        minWidth: "36px",
                                                        textAlign: "right"
                                                    },
                                                    children: c.daysUntilRenewal < 0 ? `${Math.abs(c.daysUntilRenewal)}d` : t("dashboard.daysLeft", {
                                                        n: c.daysUntilRenewal
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                                    lineNumber: 288,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                            lineNumber: 284,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, c.id, true, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                    lineNumber: 275,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                        lineNumber: 262,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                lineNumber: 229,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr",
                    gap: "6px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: card,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: cardTitle,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: t("dashboard.assetHealth")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                        lineNumber: 304,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/${locale}/assets`,
                                        style: {
                                            ...muted,
                                            textDecoration: "none"
                                        },
                                        children: t("dashboard.viewAll", {
                                            n: healthMap.ok + healthMap.warning + healthMap.critical
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                        lineNumber: 305,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                lineNumber: 303,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "8px"
                                },
                                children: [
                                    {
                                        key: "ok",
                                        label: t("dashboard.statusOk"),
                                        color: "#16a34a",
                                        count: healthMap.ok
                                    },
                                    {
                                        key: "warning",
                                        label: t("dashboard.statusWarning"),
                                        color: "#ca8a04",
                                        count: healthMap.warning
                                    },
                                    {
                                        key: "critical",
                                        label: t("dashboard.statusCritical"),
                                        color: "#dc2626",
                                        count: healthMap.critical
                                    }
                                ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/${locale}/assets?status=${s.key}`,
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            textDecoration: "none"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "8px"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            width: "7px",
                                                            height: "7px",
                                                            borderRadius: "50%",
                                                            background: s.color,
                                                            display: "inline-block",
                                                            flexShrink: 0
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                                        lineNumber: 319,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            ...mono,
                                                            color: s.count > 0 ? "var(--con-text)" : "var(--con-muted)"
                                                        },
                                                        children: s.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                                        lineNumber: 320,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                                lineNumber: 318,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: "var(--font-mono)",
                                                    fontSize: "13px",
                                                    fontWeight: 600,
                                                    color: s.count > 0 ? s.color : "var(--con-muted)"
                                                },
                                                children: s.count
                                            }, void 0, false, {
                                                fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                                lineNumber: 322,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, s.key, true, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                        lineNumber: 313,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                lineNumber: 307,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                        lineNumber: 302,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: card,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: cardTitle,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: t("dashboard.unbilledSection")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                        lineNumber: 333,
                                        columnNumber: 13
                                    }, this),
                                    totalUnbilledMinutes > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "10px",
                                            color: "var(--accent)"
                                        },
                                        children: t("dashboard.totalUnbilledValue", {
                                            h: Math.round(totalUnbilledMinutes / 60 * 10) / 10,
                                            amount: Math.round(totalUnbilledAmount).toLocaleString("fr-BE")
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                        lineNumber: 335,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                lineNumber: 332,
                                columnNumber: 11
                            }, this),
                            unbilledByClient.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    ...muted,
                                    padding: "8px 0"
                                },
                                children: t("dashboard.noUnbilled")
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                lineNumber: 344,
                                columnNumber: 13
                            }, this) : unbilledByClient.slice(0, 5).map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: rowStyle,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                ...mono,
                                                fontWeight: 500
                                            },
                                            children: c.name
                                        }, void 0, false, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                            lineNumber: 348,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "16px"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        ...muted
                                                    },
                                                    children: [
                                                        Math.round(c.minutes / 60 * 10) / 10,
                                                        "h · €",
                                                        Math.round(c.amount).toLocaleString("fr-BE")
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                                    lineNumber: 350,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                    href: `/${locale}/billing?clientId=${c.id}`,
                                                    style: {
                                                        fontFamily: "var(--font-mono)",
                                                        fontSize: "10px",
                                                        fontWeight: 600,
                                                        color: "var(--accent)",
                                                        textDecoration: "none",
                                                        letterSpacing: "0.02em"
                                                    },
                                                    children: t("dashboard.invoiceNow")
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                                    lineNumber: 353,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                            lineNumber: 349,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, c.id, true, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                    lineNumber: 347,
                                    columnNumber: 15
                                }, this)),
                            unbilledByClient.length > 5 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    paddingTop: "8px"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/${locale}/billing`,
                                    style: {
                                        ...muted,
                                        textDecoration: "none"
                                    },
                                    children: t("dashboard.viewAll", {
                                        n: unbilledByClient.length
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                    lineNumber: 365,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                                lineNumber: 364,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                        lineNumber: 331,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
                lineNumber: 299,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx",
        lineNumber: 200,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/apps/main/app/[locale]/(console)/dashboard/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b9d68a88._.js.map