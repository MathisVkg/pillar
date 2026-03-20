import en from "./en";
import fr from "./fr";
import nl from "./nl";

export type Lang = "fr" | "en" | "nl";
export const SUPPORTED_LANGS: Lang[] = ["fr", "en", "nl"];
export const DEFAULT_LANG: Lang = "fr";

export type TFunction = (key: string, vars?: Record<string, string | number>) => string;

const messages: Record<Lang, Record<string, Record<string, string>>> = { fr, en, nl };

export function getT(lang: Lang): TFunction {
  const dict = messages[lang] ?? messages[DEFAULT_LANG];
  return function t(key, vars) {
    const dot = key.indexOf(".");
    if (dot === -1) return key;
    const ns = key.slice(0, dot);
    const k = key.slice(dot + 1);
    const val: string = (dict[ns] as Record<string, string>)?.[k] ?? key;
    if (!vars) return val;
    return val.replace(/\{(\w+)\}/g, (_, v) => String(vars[v] ?? ""));
  };
}

export function isValidLang(v: unknown): v is Lang {
  return SUPPORTED_LANGS.includes(v as Lang);
}
