"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="1" y="1" width="5" height="5" rx="1" />
        <rect x="8" y="1" width="5" height="5" rx="1" />
        <rect x="1" y="8" width="5" height="5" rx="1" />
        <rect x="8" y="8" width="5" height="5" rx="1" />
      </svg>
    ),
  },
  {
    href: "/clients",
    label: "Clients",
    icon: (
      <svg viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="7" cy="5" r="3" />
        <path d="M2 12c0-2.8 2.2-4 5-4s5 1.2 5 4" />
      </svg>
    ),
  },
  {
    href: "/tickets",
    label: "Tickets",
    icon: (
      <svg viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <polyline points="2,4 12,4" />
        <polyline points="2,7 12,7" />
        <polyline points="2,10 12,10" />
      </svg>
    ),
  },
  {
    href: "/assets",
    label: "Assets",
    icon: (
      <svg viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="1" y="3" width="12" height="8" rx="1" />
        <line x1="4" y1="7" x2="10" y2="7" />
        <line x1="4" y1="9" x2="7" y2="9" />
      </svg>
    ),
  },
  {
    href: "/billing",
    label: "Billing",
    exact: true,
    icon: (
      <svg viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="2" y="3" width="10" height="8" rx="1" />
        <polyline points="5,3 5,2 9,2 9,3" />
      </svg>
    ),
  },
  {
    href: "/billing/invoices",
    label: "Invoices",
    icon: (
      <svg viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="2" y="1" width="10" height="12" rx="1" />
        <line x1="4" y1="5" x2="10" y2="5" />
        <line x1="4" y1="8" x2="10" y2="8" />
        <line x1="4" y1="11" x2="7" y2="11" />
      </svg>
    ),
  },
  {
    href: "/visits",
    label: "Visits",
    icon: (
      <svg viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7" cy="7" r="5" />
        <polyline points="7,4 7,7 9,9" />
      </svg>
    ),
  },
];

export default function ConsoleSidebar() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "fr";

  return (
    <nav
      style={{
        width: "200px",
        background: "var(--brand)",
        borderRight: "1px solid #1e2a44",
        display: "flex",
        flexDirection: "column",
        padding: "8px 0",
        gap: "2px",
        flexShrink: 0,
        overflowY: "auto",
      }}
    >
      {NAV.map(({ href, label, icon, exact }) => {
        const fullHref = `/${locale}${href}`;
        const active = exact
          ? pathname === fullHref || (pathname.startsWith(fullHref) && !pathname.startsWith(`/${locale}/billing/invoices`))
          : pathname === fullHref || (!exact && href !== "/dashboard" && pathname.startsWith(fullHref));
        return (
          <Link
            key={href}
            href={fullHref}
            title={label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "9px 16px",
              borderLeft: active ? "3px solid #2563EB" : "3px solid transparent",
              background: active ? "rgba(37,99,235,0.18)" : "transparent",
              color: active ? "#fff" : "rgba(255,255,255,0.70)",
              textDecoration: "none",
              transition: "background 0.12s, color 0.12s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              if (!active) (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              if (!active) (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.70)";
            }}
          >
            <span style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>{icon}</span>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.01em",
              whiteSpace: "nowrap",
            }}>
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
