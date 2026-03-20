"use client";

import { useActionState } from "react";
import { useTranslation } from "@/components/LangProvider";
import { portalLogin } from "./actions";

export default function PortalLoginForm({ locale }: { locale: string }) {
  const { t } = useTranslation();
  const [state, formAction, pending] = useActionState(portalLogin, undefined);

  const inputStyle: React.CSSProperties = {
    width: "100%",
    border: "1px solid var(--cli-border)",
    borderRadius: "10px",
    padding: "11px 14px",
    fontSize: "14px",
    fontFamily: "var(--font-sans)",
    color: "var(--cli-text)",
    background: "#fff",
    outline: "none",
    transition: "border-color 0.15s",
  };

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <input type="hidden" name="locale" value={locale} />

      <div>
        <label
          htmlFor="portal-email"
          style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--cli-text)", marginBottom: "6px" }}
        >
          {t("auth.emailAddress")}
        </label>
        <input
          id="portal-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          style={inputStyle}
          onFocus={e => (e.currentTarget.style.borderColor = "var(--accent)")}
          onBlur={e => (e.currentTarget.style.borderColor = "var(--cli-border)")}
        />
      </div>

      <div>
        <label
          htmlFor="portal-password"
          style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--cli-text)", marginBottom: "6px" }}
        >
          {t("auth.password")}
        </label>
        <input
          id="portal-password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          style={inputStyle}
          onFocus={e => (e.currentTarget.style.borderColor = "var(--accent)")}
          onBlur={e => (e.currentTarget.style.borderColor = "var(--cli-border)")}
        />
      </div>

      {state?.error && (
        <div
          style={{
            background: "var(--danger-l)",
            border: "1px solid #fca5a5",
            borderRadius: "10px",
            padding: "10px 14px",
            fontSize: "13px",
            color: "var(--danger)",
          }}
        >
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        style={{
          marginTop: "4px",
          width: "100%",
          background: pending ? "var(--cli-muted)" : "var(--brand)",
          color: "#fff",
          border: "none",
          borderRadius: "24px",
          padding: "12px",
          fontFamily: "var(--font-sans)",
          fontSize: "14px",
          fontWeight: 600,
          cursor: pending ? "not-allowed" : "pointer",
          transition: "background 0.15s",
        }}
      >
        {pending ? t("auth.signingIn") : t("auth.signIn")}
      </button>
    </form>
  );
}
