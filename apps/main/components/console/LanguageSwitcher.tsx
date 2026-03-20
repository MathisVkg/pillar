"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLang } from "@/components/LangProvider";
import { SUPPORTED_LANGS, type Lang } from "@/lib/i18n";

const LANG_LABELS: Record<Lang, string> = { fr: "FR", en: "EN", nl: "NL" };

export default function ConsoleLanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const current = useLang();

  function handleChange(lang: Lang) {
    // Replace the first path segment (/fr/... → /en/...)
    const segments = pathname.split("/");
    segments[1] = lang;
    const newPath = segments.join("/") || "/";
    document.cookie = `pillar_lang=${lang};path=/;max-age=31536000;SameSite=Lax`;
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
          color: "rgba(255,255,255,0.80)",
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.18)",
          borderRadius: "4px",
          padding: "3px 22px 3px 8px",
          cursor: "pointer",
          outline: "none",
          appearance: "none",
          WebkitAppearance: "none",
        }}
      >
        {SUPPORTED_LANGS.map((l) => (
          <option key={l} value={l} style={{ background: "#0F172A", color: "#fff" }}>
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
          color: "rgba(255,255,255,0.50)",
          fontSize: "8px",
        }}
      >
        ▾
      </span>
    </div>
  );
}
