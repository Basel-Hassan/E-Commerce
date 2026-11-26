import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { firstParam, safeInternalPath } from "@/lib/search-params";

const sessionCookieNames = [
  "next-auth.session-token",
  "__Secure-next-auth.session-token",
  "next-auth.csrf-token",
  "__Secure-next-auth.csrf-token",
  "next-auth.callback-url",
  "__Secure-next-auth.callback-url",
];

export async function GET(request: NextRequest) {
  const callbackUrl = safeInternalPath(
    firstParam(request.nextUrl.searchParams.get("callbackUrl") ?? undefined),
  );
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("notice", "expired");
  loginUrl.searchParams.set("callbackUrl", callbackUrl);

  const response = NextResponse.redirect(loginUrl);

  for (const name of sessionCookieNames) {
    response.cookies.delete(name);
  }

  return response;
}
