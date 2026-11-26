import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { isJwtExpired } from "@/lib/jwt";

const protectedPrefixes = [
  "/cart",
  "/wishlist",
  "/checkout",
  "/orders",
  "/order-success",
  "/order-cancel",
  "/profile",
];

const authPages = [
  "/login",
  "/register",
  "/forgot-password",
  "/verify-reset-code",
  "/reset-password",
];

function matchesPrefix(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const apiTokenExpired = token?.apiToken
    ? isJwtExpired(token.apiToken)
    : false;

  if (token?.error === "TokenExpired" || apiTokenExpired) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("notice", "expired");
    loginUrl.searchParams.set("callbackUrl", `${pathname}${search}`);
    const response = NextResponse.redirect(loginUrl);

    response.cookies.delete("next-auth.session-token");
    response.cookies.delete("__Secure-next-auth.session-token");

    return response;
  }

  const isProtected = protectedPrefixes.some((prefix) =>
    matchesPrefix(pathname, prefix),
  );

  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  const isAuthPage = authPages.includes(pathname);

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
