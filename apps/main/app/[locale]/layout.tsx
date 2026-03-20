import { notFound } from "next/navigation";
import { LangProvider } from "@/components/LangProvider";
import { isValidLang, type Lang } from "@/lib/i18n";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLang(locale)) {
    notFound();
  }

  return <LangProvider lang={locale as Lang}>{children}</LangProvider>;
}
