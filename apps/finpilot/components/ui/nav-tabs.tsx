"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLang, useTranslation } from "@/components/LangProvider";

export default function NavTabs() {
  const pathname = usePathname();
  const lang = useLang();
  const { t } = useTranslation();
  const [extraOpen, setExtraOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const extraRef = useRef<HTMLDivElement>(null);
  const extraButtonRef = useRef<HTMLButtonElement>(null);
  const extraMenuRef = useRef<HTMLDivElement>(null);

  const TABS = [
    { label: t("nav.overview"), href: `/${lang}/dashboard` },
    { label: t("nav.income"), href: `/${lang}/income` },
    { label: t("nav.expenses"), href: `/${lang}/expenses` },
    { label: t("nav.recurring"), href: `/${lang}/recurring` },
    { label: t("nav.vat"), href: `/${lang}/vat` },
    { label: t("nav.pl"), href: `/${lang}/pl` },
  ];
  const EXTRA_ITEMS = [
    { label: t("nav.roadBook"), href: `/${lang}/road-book` },
    { label: t("nav.companyAssets"), href: `/${lang}/company-assets` },
    { label: t("nav.export"), href: `/${lang}/export` },
  ];
  const isExtraActive = EXTRA_ITEMS.some(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (
        !extraRef.current?.contains(target) &&
        !extraMenuRef.current?.contains(target)
      ) {
        setExtraOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setExtraOpen(false);
    }

    function handleViewportChange() {
      setExtraOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("scroll", handleViewportChange, true);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("scroll", handleViewportChange, true);
    };
  }, []);

  function toggleExtra() {
    const rect = extraButtonRef.current?.getBoundingClientRect();
    if (rect) {
      const menuWidth = 190;
      const left = Math.min(rect.left, window.innerWidth - menuWidth - 12);
      setMenuPosition({
        top: rect.bottom + 6,
        left: Math.max(12, left),
      });
    }
    setExtraOpen((open) => !open);
  }

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
      <div
        ref={extraRef}
        className="fp-nav-tab"
        style={{ position: "relative", flex: "0 0 auto" }}
      >
        <button
          ref={extraButtonRef}
          type="button"
          aria-haspopup="menu"
          aria-expanded={extraOpen}
          onClick={toggleExtra}
          style={{
            padding: "12px 16px",
            minHeight: "44px",
            border: "none",
            borderBottom: isExtraActive
              ? "2px solid var(--income)"
              : "2px solid transparent",
            background: "transparent",
            color: isExtraActive ? "var(--income)" : "var(--muted)",
            fontSize: "13px",
            fontWeight: isExtraActive ? 600 : 500,
            fontFamily: "var(--font-sans)",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {t("nav.extra")}
        </button>

        {extraOpen && (
          <div
            ref={extraMenuRef}
            role="menu"
            style={{
              position: "fixed",
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
              minWidth: "190px",
              maxWidth: "calc(100vw - 24px)",
              padding: "6px",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              background: "var(--surface)",
              boxShadow: "0 12px 28px rgba(15, 23, 42, 0.12)",
              zIndex: 20,
            }}
          >
            {EXTRA_ITEMS.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  onClick={() => setExtraOpen(false)}
                  style={{
                    display: "block",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    color: isActive ? "var(--income)" : "var(--text)",
                    background: isActive ? "var(--income-ll)" : "transparent",
                    textDecoration: "none",
                    fontSize: "13px",
                    fontWeight: isActive ? 600 : 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
