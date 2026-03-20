import { auth } from "@/lib/auth-edge";
import { NextResponse } from "next/server";
import { SUPPORTED_LANGS, DEFAULT_LANG, isValidLang, type Lang } from "@/lib/i18n";

// Strip the lang prefix so auth checks work identically regardless of locale.
function normalizePathname(pathname: string): string {
  for (const lang of SUPPORTED_LANGS) {
    if (pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`) {
      return pathname.slice(lang.length + 1) || "/";
    }
  }
  return pathname;
}

// Extract the client slug from a normalized portal path.
// /portal/acme-sa → "acme-sa"
function extractPortalSlug(normalizedPath: string): string | null {
  const match = normalizedPath.match(/^\/portal\/([^/]+)/);
  return match?.[1] ?? null;
}

// Validate a magic-link token against the database via an internal API route.
// Middleware runs on Edge runtime and cannot use Prisma directly.
async function validatePortalToken(token: string, slug: string, baseUrl: string): Promise<boolean> {
  try {
    const url = `${baseUrl}/api/portal/validate-token?token=${encodeURIComponent(token)}&slug=${encodeURIComponent(slug)}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return false;
    const data = await res.json();
    return data.valid === true;
  } catch {
    return false;
  }
}

export default auth(async (req) => {
  const { pathname, searchParams } = req.nextUrl;
  const session = req.auth;

  // ── 1. Always public — no auth check ──────────────────────────────────────
  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/webhooks") ||
    pathname.startsWith("/api/portal/validate-token") ||
    pathname.startsWith("/api/portal/validate-slug")
  ) {
    return NextResponse.next();
  }

  // ── 2. All other /api routes — require any valid session ──────────────────
  if (pathname.startsWith("/api")) {
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  // ── 3. Lang prefix routing — cookie-aware redirect if missing ────────────
  const firstSeg = pathname.split("/")[1];
  if (!isValidLang(firstSeg)) {
    const cookieLang = req.cookies.get("pillar_lang")?.value;
    const lang = isValidLang(cookieLang) ? cookieLang : DEFAULT_LANG;
    const url = req.nextUrl.clone();
    if (pathname === "/" || pathname === "") {
      // Root with no path — send to the right place based on session
      url.pathname = session?.user?.isAdmin
        ? `/${lang}/dashboard`
        : `/${lang}/admin/login`;
    } else {
      url.pathname = `/${lang}${pathname}`;
    }
    return NextResponse.redirect(url);
  }

  const lang = firstSeg as Lang;
  const normalizedPath = normalizePathname(pathname);

  // ── 4. Public pages ────────────────────────────────────────────────────────
  if (normalizedPath === "/") {
    // /[lang] with no further path — redirect to the right landing page
    const url = req.nextUrl.clone();
    url.pathname = session?.user?.isAdmin
      ? `/${lang}/dashboard`
      : `/${lang}/admin/login`;
    return NextResponse.redirect(url);
  }

  if (
    normalizedPath.startsWith("/login") ||
    normalizedPath.startsWith("/admin/login")
  ) {
    const res = NextResponse.next();
    res.cookies.set("pillar_lang", lang, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
    return res;
  }

  // ── 5. Console routes — admin session required ────────────────────────────
  const isConsoleRoute =
    normalizedPath.startsWith("/dashboard") ||
    normalizedPath.startsWith("/clients") ||
    normalizedPath.startsWith("/tickets") ||
    normalizedPath.startsWith("/billing") ||
    normalizedPath.startsWith("/assets") ||
    normalizedPath.startsWith("/visits") ||
    normalizedPath.startsWith("/admin");

  if (isConsoleRoute) {
    if (!session?.user?.isAdmin) {
      return NextResponse.redirect(new URL(`/${lang}/admin/login`, req.url));
    }
    const res = NextResponse.next();
    res.cookies.set("pillar_lang", lang, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
    return res;
  }

  // ── 6. Portal routes — three valid access methods ─────────────────────────
  if (normalizedPath.startsWith("/portal")) {
    // a) Admin session — can preview any client portal
    if (session?.user?.isAdmin) {
      const res = NextResponse.next();
      res.cookies.set("pillar_lang", lang, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
      return res;
    }

    // b) Portal client session — verify slug belongs to this client
    if (session?.user?.clientId) {
      const slug = extractPortalSlug(normalizedPath);
      if (slug) {
        const baseUrl = `${req.nextUrl.protocol}//${req.nextUrl.host}`;
        try {
          const res = await fetch(
            `${baseUrl}/api/portal/validate-slug?clientId=${encodeURIComponent(session.user.clientId)}&slug=${encodeURIComponent(slug)}`,
            { cache: "no-store" }
          );
          const data = await res.json();
          if (!data.allowed) {
            return NextResponse.redirect(new URL(`/${lang}/login`, req.url));
          }
        } catch {
          return NextResponse.redirect(new URL(`/${lang}/login`, req.url));
        }
      }
      const res = NextResponse.next();
      res.cookies.set("pillar_lang", lang, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
      return res;
    }

    // c) Magic-link token — must match slug in database
    const token = searchParams.get("portal_token");
    if (token) {
      const slug = extractPortalSlug(normalizedPath);
      if (slug) {
        const baseUrl = `${req.nextUrl.protocol}//${req.nextUrl.host}`;
        const valid = await validatePortalToken(token, slug, baseUrl);
        if (valid) {
          const res = NextResponse.next();
          res.cookies.set("pillar_lang", lang, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
          return res;
        }
      }
    }

    return NextResponse.redirect(new URL(`/${lang}/login`, req.url));
  }

  // ── 7. Everything else ────────────────────────────────────────────────────
  const res = NextResponse.next();
  res.cookies.set("pillar_lang", lang, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  return res;
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
