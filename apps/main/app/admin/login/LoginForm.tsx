"use client";

import { useActionState } from "react";
import { useTranslation } from "@/components/LangProvider";
import { adminLogin } from "./actions";

export default function LoginForm({ locale }: { locale: string }) {
  const { t } = useTranslation();
  const [state, formAction, pending] = useActionState(adminLogin, undefined);

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#0d1526",
    border: "1px solid #1e2a44",
    borderRadius: "3px",
    padding: "9px 12px",
    fontFamily: "var(--font-mono)",
    fontSize: "12px",
    color: "#c8d8f0",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-mono)",
    fontSize: "9px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#3a4a6a",
    marginBottom: "6px",
  };

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="locale" value={locale} />

      <div>
        <label style={labelStyle}>{t("auth.email")}</label>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          style={inputStyle}
          onFocus={e => (e.currentTarget.style.borderColor = "var(--accent)")}
          onBlur={e => (e.currentTarget.style.borderColor = "#1e2a44")}
        />
      </div>

      <div>
        <label style={labelStyle}>{t("auth.password")}</label>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          style={inputStyle}
          onFocus={e => (e.currentTarget.style.borderColor = "var(--accent)")}
          onBlur={e => (e.currentTarget.style.borderColor = "#1e2a44")}
        />
      </div>

      {state?.error && (
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            color: "var(--danger)",
            background: "var(--danger-l)",
            padding: "7px 10px",
            borderRadius: "3px",
          }}
        >
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        style={{
          marginTop: "4px",
          width: "100%",
          background: pending ? "#1e2a44" : "var(--accent)",
          color: "#fff",
          border: "none",
          borderRadius: "3px",
          padding: "10px",
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.04em",
          cursor: pending ? "not-allowed" : "pointer",
          transition: "background 0.12s",
        }}
      >
        {pending ? t("auth.signingIn") : t("auth.signIn")}
      </button>
    </form>
  );
}
