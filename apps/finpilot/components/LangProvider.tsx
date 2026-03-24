"use client";

import { createContext, useContext } from "react";
import { getT, DEFAULT_LANG, type Lang, type TFunction } from "@/lib/i18n";

const LangContext = createContext<{ lang: Lang; t: TFunction }>({
  lang: DEFAULT_LANG,
  t: getT(DEFAULT_LANG),
});

export function LangProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  const t = getT(lang);
  return <LangContext.Provider value={{ lang, t }}>{children}</LangContext.Provider>;
}

export function useLang(): Lang {
  return useContext(LangContext).lang;
}

export function useTranslation(): { t: TFunction; lang: Lang } {
  return useContext(LangContext);
}
