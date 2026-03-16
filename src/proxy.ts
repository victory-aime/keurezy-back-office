import { NextResponse, NextRequest } from "next/server";
import { getCookieCache, getSessionCookie } from "better-auth/cookies";
import { BO_ROUTES } from "./app/routes";

const ROOT = BO_ROUTES.ROOT;
const TOTP_ROUTE = BO_ROUTES._2FA;

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionCookie = getSessionCookie(request);
  const session = sessionCookie ? await getCookieCache(request) : null;

  const totpCookie =
    request.cookies.get("__Secure-better-auth.two_factor") ??
    request.cookies.get("better-auth.two_factor");

  // 1️⃣ User en flow 2FA
  if (totpCookie) {
    if (pathname !== TOTP_ROUTE) {
      const url = request.nextUrl.clone();
      url.pathname = TOTP_ROUTE;
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // 2️⃣ accès direct à /2fa sans cookie
  if (pathname === TOTP_ROUTE) {
    const url = request.nextUrl.clone();
    url.pathname = ROOT;
    return NextResponse.redirect(url);
  }

  // 3️⃣ user non connecté
  if (!sessionCookie || !session) {
    if (pathname !== ROOT) {
      const url = request.nextUrl.clone();
      url.pathname = ROOT;
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/totp"],
};
