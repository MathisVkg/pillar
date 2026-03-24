"use client";

import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

export default function Topbar() {
  // TODO: replace hardcoded period with current month from Date
  // TODO: replace hardcoded initials with session user initials
  const period = "APR 2026";
  const initials = "YO";

  return (
    <div
      style={{
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        height: "56px",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
      }}
    >
      {/* Wordmark */}
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "18px",
          fontWeight: 700,
          color: "var(--brand)",
          letterSpacing: "-0.5px",
        }}
      >
        pillar{" "}
        <span style={{ color: "var(--income-mid)" }}>finpilot</span>
      </div>

      {/* Right: period + lang switcher + avatar */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--subtle)",
            letterSpacing: "0.06em",
          }}
        >
          {period}
        </span>
        <LanguageSwitcher />
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "var(--income-l)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-sans)",
            fontSize: "11px",
            fontWeight: 700,
            color: "var(--income)",
          }}
        >
          {initials}
        </div>
      </div>
    </div>
  );
}
