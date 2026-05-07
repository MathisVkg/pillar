"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang, useTranslation } from "@/components/LangProvider";

export default function NavTabs() {
  const pathname = usePathname();
  const lang = useLang();
  const { t } = useTranslation();

  const TABS = [
    { label: t("nav.overview"), href: `/${lang}/dashboard` },
    { label: t("nav.income"), href: `/${lang}/income` },
    { label: t("nav.expenses"), href: `/${lang}/expenses` },
    { label: t("nav.recurring"), href: `/${lang}/recurring` },
    { label: t("nav.vat"), href: `/${lang}/vat` },
    { label: t("nav.pl"), href: `/${lang}/pl` },
    { label: t("nav.export"), href: `/${lang}/export` },
  ];

  return (
    <div className="fp-nav-tabs">
      {TABS.map((tab) => {
        const isActive =
          pathname === tab.href || pathname.startsWith(`${tab.href}/`);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="fp-nav-tab"
            style={{
              padding: "12px 16px",
              fontSize: "13px",
              fontWeight: isActive ? 600 : 500,
              color: isActive ? "var(--income)" : "var(--muted)",
              borderBottom: isActive
                ? "2px solid var(--income)"
                : "2px solid transparent",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "color 0.12s, border-color 0.12s",
            }}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
