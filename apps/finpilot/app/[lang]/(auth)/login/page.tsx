"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslation, useLang } from "@/components/LangProvider";
import { FloatingLangSwitcher } from "@/components/ui/LanguageSwitcher";

export default function LoginPage() {
  const { t } = useTranslation();
  const lang = useLang();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const result = await signIn("admin", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (!result || result.error) {
      setError(t("auth.invalidCredentials"));
      return;
    }

    router.push(`/${lang}/dashboard`);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    border: "1px solid var(--border-md)",
    borderRadius: "10px",
    padding: "11px 14px",
    fontSize: "14px",
    fontFamily: "var(--font-sans)",
    color: "var(--text)",
    background: "var(--surface)",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "13px",
    fontWeight: 500,
    color: "var(--text)",
    marginBottom: "6px",
  };

  return (
    <>
      <FloatingLangSwitcher />
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--ground)",
          padding: "24px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            padding: "40px 36px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          }}
        >
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
              pillar{" "}
              <span style={{ color: "var(--income-mid)" }}>finpilot</span>
            </div>
            <p
              style={{
                fontSize: "13px",
                color: "var(--muted)",
                marginTop: "6px",
              }}
            >
              {t("auth.finpilotAccess")}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div>
              <label htmlFor="email" style={labelStyle}>
                {t("auth.email")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-md)")}
              />
            </div>

            <div>
              <label htmlFor="password" style={labelStyle}>
                {t("auth.password")}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-md)")}
              />
            </div>

            {error && (
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--danger)",
                  textAlign: "center",
                  margin: "0",
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: "4px",
                width: "100%",
                background: loading ? "var(--muted)" : "var(--brand)",
                color: "#fff",
                border: "none",
                borderRadius: "24px",
                padding: "12px",
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background 0.15s",
              }}
            >
              {loading ? t("auth.signingIn") : t("auth.signIn")}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
