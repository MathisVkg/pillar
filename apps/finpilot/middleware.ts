import { auth } from "@/lib/auth-edge";
import { NextResponse } from "next/server";
import { SUPPORTED_LANGS, DEFAULT_LANG, isValidLang, type Lang } from "@/lib/i18n";

const COOKIE = "finpilot_lang";

function normalizePathname(pathname: string): string {
  for (const lang of SUPPORTED_LANGS) {
    if (pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`) {
      return pathname.slice(lang.length + 1) || "/";
    }
  }
  return pathname;
}

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  // ── 1. Always public — no auth, no locale check ───────────────────────────
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // ── 2. Lang prefix routing — cookie-aware redirect if missing ─────────────
  const firstSeg = pathname.split("/")[1];
  if (!isValidLang(firstSeg)) {
    const cookieLang = req.cookies.get(COOKIE)?.value;
    const lang = isValidLang(cookieLang) ? cookieLang : DEFAULT_LANG;
    const url = req.nextUrl.clone();
    if (pathname === "/" || pathname === "") {
      url.pathname = `/${lang}/dashboard`;
    } else {
      url.pathname = `/${lang}${pathname}`;
    }
    return NextResponse.redirect(url);
  }

  const lang = firstSeg as Lang;
  const normalizedPath = normalizePathname(pathname);

  // ── 3. Root lang path — redirect to dashboard ─────────────────────────────
  if (normalizedPath === "/") {
    const url = req.nextUrl.clone();
    url.pathname = `/${lang}/dashboard`;
    return NextResponse.redirect(url);
  }

  // ── 4. Login page — public, set cookie ────────────────────────────────────
  if (normalizedPath.startsWith("/login")) {
    const res = NextResponse.next();
    res.cookies.set(COOKIE, lang, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
    return res;
  }

  // ── 5. All other routes — require valid admin session ─────────────────────
  if (!session?.user?.isAdmin) {
    return NextResponse.redirect(new URL(`/${lang}/login`, req.url));
  }

  const res = NextResponse.next();
  res.cookies.set(COOKIE, lang, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  return res;
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
