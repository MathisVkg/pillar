import { auth } from "@/lib/auth";
import { prisma } from "@pillar/database";
import { notFound, redirect } from "next/navigation";
import { getT, isValidLang, type Lang } from "@/lib/i18n";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string; clientSlug: string }>;
  searchParams: Promise<{ portal_token?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { clientSlug } = await params;
  const client = await prisma.client.findUnique({ where: { slug: clientSlug }, select: { name: true } });
  return { title: client ? `${client.name} \u00B7 Pillar` : "Pillar Portal" };
}

export default async function ClientPortalPage({ params, searchParams }: Props) {
  const { clientSlug, locale } = await params;
  const { portal_token } = await searchParams;

  const session = await auth();
  const t = getT(locale as Lang);

  // Load client data
  const client = await prisma.client.findUnique({
    where: { slug: clientSlug, isActive: true },
    select: {
      id: true,
      name: true,
      language: true,
    },
  });
  if (!client) notFound();

  // On magic-link access, redirect to the client's preferred language.
  // For session-based access the URL locale is the user's explicit choice — don't override it.
  if (portal_token && isValidLang(client.language) && client.language !== locale) {
    redirect(`/${client.language}/portal/${clientSlug}?portal_token=${portal_token}`);
  }

  // Verify access — three valid paths:
  // 1. Admin session
  // 2. Portal session scoped to this client
  // 3. Valid magic-link token for this client
  const isAdmin = session?.user?.isAdmin;
  const isClientSession = session?.user?.clientId === client.id;

  let isTokenAccess = false;
  if (!isAdmin && !isClientSession && portal_token) {
    const tokenUser = await prisma.clientUser.findUnique({
      where: { portalToken: portal_token },
      select: { clientId: true, isActive: true, tokenExpiresAt: true },
    });
    isTokenAccess =
      !!tokenUser &&
      tokenUser.isActive &&
      tokenUser.clientId === client.id &&
      (!tokenUser.tokenExpiresAt || tokenUser.tokenExpiresAt > new Date());
  }

  if (!isAdmin && !isClientSession && !isTokenAccess) {
    redirect(`/${locale}/login`);
  }

  // Greeting based on time
  const hour = new Date().getHours();
  const greetingKey = hour < 12 ? "portal.goodMorning" : hour < 18 ? "portal.goodAfternoon" : "portal.goodEvening";

  const formattedDate = new Date().toLocaleDateString(locale, { month: "long", year: "numeric" });

  const metrics = [
    { label: t("portal.openRequests"), value: "\u2014", color: undefined },
    { label: t("portal.uptimeThisMonth"), value: "\u2014", color: "var(--ok)" },
    { label: t("portal.hoursUsed"), value: "\u2014", color: undefined },
    { label: t("portal.currentInvoice"), value: "\u2014", color: "var(--accent)" },
  ];

  return (
    <div>
      {/* Topbar */}
      <header
        style={{
          background: "var(--cli-surface)",
          borderBottom: "1px solid var(--cli-border)",
          height: "52px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "17px",
            fontWeight: 700,
            color: "var(--brand)",
            letterSpacing: "-0.5px",
          }}
        >
          pillar<span style={{ color: "var(--accent)" }}>.</span>
        </span>
        <span style={{ fontSize: "13px", color: "var(--cli-muted)", fontWeight: 500 }}>
          {client.name}
        </span>
      </header>

      {/* Main */}
      <main style={{ padding: "32px 24px", maxWidth: "680px", margin: "0 auto" }}>
        {/* Greeting */}
        <div style={{ marginBottom: "24px" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "26px",
              fontWeight: 700,
              color: "var(--cli-text)",
              letterSpacing: "-0.5px",
            }}
          >
            {t(greetingKey)}.
          </h1>
          <p style={{ fontSize: "14px", color: "var(--cli-muted)", marginTop: "4px" }}>
            {t("portal.overviewIntro", { date: formattedDate })}
          </p>
        </div>

        {/* Metric cards — placeholder */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          {metrics.map((m) => (
            <div
              key={m.label}
              style={{
                background: "#fff",
                border: "1px solid var(--cli-border)",
                borderRadius: "14px",
                padding: "18px 20px",
              }}
            >
              <div style={{ fontSize: "12px", color: "var(--cli-muted)", marginBottom: "6px", fontWeight: 500 }}>
                {m.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "30px",
                  fontWeight: 700,
                  color: m.color ?? "var(--cli-text)",
                  lineHeight: 1,
                }}
              >
                {m.value}
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        <div
          style={{
            background: "#fff",
            border: "1px solid var(--cli-border)",
            borderRadius: "14px",
            padding: "40px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              background: "var(--ok-l)",
              padding: "7px 14px",
              borderRadius: "24px",
              fontSize: "13px",
              fontWeight: 600,
              color: "#15803d",
            }}
          >
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--ok)", display: "inline-block" }} />
            {t("portal.systemsNormal")}
          </div>
          <p style={{ fontSize: "13px", color: "var(--cli-muted)", marginTop: "16px" }}>
            {t("portal.overviewEmpty")}
          </p>
        </div>
      </main>
    </div>
  );
}
