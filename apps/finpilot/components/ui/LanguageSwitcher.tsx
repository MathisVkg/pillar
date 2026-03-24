"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLang } from "@/components/LangProvider";
import { SUPPORTED_LANGS, type Lang } from "@/lib/i18n";

const LANG_LABELS: Record<Lang, string> = { en: "EN", fr: "FR", nl: "NL" };

// Default export — for use inside the topbar (white background)
export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const current = useLang();

  function handleChange(lang: Lang) {
    const segments = pathname.split("/");
    segments[1] = lang;
    const newPath = segments.join("/") || "/";
    document.cookie = `finpilot_lang=${lang};path=/;max-age=31536000;SameSite=Lax`;
    router.push(newPath);
  }

  return (
    <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
      <select
        value={current}
        onChange={(e) => handleChange(e.target.value as Lang)}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          fontWeight: 600,
          color: "rgba(15,23,42,0.80)",
          background: "transparent",
          border: "1px solid rgba(15,23,42,0.18)",
          borderRadius: "4px",
          padding: "3px 22px 3px 8px",
          cursor: "pointer",
          outline: "none",
          appearance: "none",
          WebkitAppearance: "none",
        }}
      >
        {SUPPORTED_LANGS.map((l) => (
          <option key={l} value={l} style={{ background: "#ffffff", color: "#0F172A" }}>
            {LANG_LABELS[l]}
          </option>
        ))}
      </select>
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "6px",
          pointerEvents: "none",
          color: "rgba(15,23,42,0.40)",
          fontSize: "8px",
        }}
      >
        ▾
      </span>
    </div>
  );
}

// Named export — floating variant for the login page
export function FloatingLangSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const current = useLang();

  function handleChange(lang: Lang) {
    const segments = pathname.split("/");
    segments[1] = lang;
    const newPath = segments.join("/") || "/";
    document.cookie = `finpilot_lang=${lang};path=/;max-age=31536000;SameSite=Lax`;
    router.push(newPath);
  }

  return (
    <div
      style={{
        position: "fixed",
        top: "16px",
        right: "16px",
        zIndex: 50,
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      <select
        value={current}
        onChange={(e) => handleChange(e.target.value as Lang)}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          fontWeight: 600,
          color: "#0F172A",
          background: "#F8FAFC",
          border: "1px solid #E2E5EB",
          borderRadius: "6px",
          padding: "3px 22px 3px 8px",
          cursor: "pointer",
          outline: "none",
          appearance: "none",
          WebkitAppearance: "none",
        }}
      >
        {SUPPORTED_LANGS.map((l) => (
          <option key={l} value={l} style={{ background: "#ffffff", color: "#0F172A" }}>
            {LANG_LABELS[l]}
          </option>
        ))}
      </select>
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "6px",
          pointerEvents: "none",
          color: "rgba(15,23,42,0.40)",
          fontSize: "8px",
        }}
      >
        ▾
      </span>
    </div>
  );
}
