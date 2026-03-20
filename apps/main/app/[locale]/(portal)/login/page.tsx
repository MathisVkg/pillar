import PortalLoginForm from "./PortalLoginForm";
import PortalLanguageSwitcher from "@/components/portal/LanguageSwitcher";
import type { Metadata } from "next";
import { getT, type Lang } from "@/lib/i18n";

export const metadata: Metadata = { title: "Pillar \u00B7 Sign in" };

type Props = { params: Promise<{ locale: string }> };

export default async function PortalLoginPage({ params }: Props) {
  const { locale } = await params;
  const t = getT(locale as Lang);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--cli-bg)",
        padding: "24px",
        position: "relative",
      }}
    >
      {/* Language switcher — top right */}
      <div style={{ position: "absolute", top: "16px", right: "20px" }}>
        <PortalLanguageSwitcher />
      </div>
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "var(--cli-surface)",
          border: "1px solid var(--cli-border)",
          borderRadius: "16px",
          padding: "40px 36px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
        }}
      >
        {/* Wordmark */}
        <div style={{ marginBottom: "32px", textAlign: "center" }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "22px",
              fontWeight: 700,
              color: "var(--brand)",
              letterSpacing: "-0.5px",
            }}
          >
            pillar<span style={{ color: "var(--accent)" }}>.</span>
          </div>
          <p style={{ fontSize: "13px", color: "var(--cli-muted)", marginTop: "6px" }}>
            {t("portal.signInSubtitle")}
          </p>
        </div>

        <PortalLoginForm locale={locale} />
      </div>

      <p style={{ fontSize: "12px", color: "var(--cli-subtle)", marginTop: "24px" }}>
        {t("portal.needAccess")}
      </p>
    </div>
  );
}
