"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLang } from "@/components/LangProvider";
import { SUPPORTED_LANGS, type Lang } from "@/lib/i18n";

const LANG_LABELS: Record<Lang, string> = { fr: "FR", en: "EN", nl: "NL" };

export default function PortalLanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const current = useLang();

  function handleChange(lang: Lang) {
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
          fontFamily: "var(--font-sans)",
          fontSize: "12px",
          fontWeight: 500,
          color: "var(--cli-muted)",
          background: "transparent",
          border: "1px solid var(--cli-border)",
          borderRadius: "4px",
          padding: "3px 22px 3px 8px",
          cursor: "pointer",
          outline: "none",
          appearance: "none",
          WebkitAppearance: "none",
        }}
      >
        {SUPPORTED_LANGS.map((l) => (
          <option key={l} value={l}>
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
          color: "var(--cli-subtle)",
          fontSize: "8px",
        }}
      >
        ▾
      </span>
    </div>
  );
}
