import { LangProvider } from "@/components/LangProvider";
import { isValidLang, DEFAULT_LANG, type Lang } from "@/lib/i18n";

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Lang = isValidLang(lang) ? lang : DEFAULT_LANG;
  return <LangProvider lang={locale}>{children}</LangProvider>;
}
