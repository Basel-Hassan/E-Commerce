"use client";

import { safeInternalPath } from "@/lib/search-params";
import type { ActionResult } from "@/types/action";

export function redirectToInvalidSession(callbackUrl?: string): void {
  const current = `${window.location.pathname}${window.location.search}`;
  const url = new URL("/api/auth/invalid-session", window.location.origin);
  url.searchParams.set("callbackUrl", safeInternalPath(callbackUrl ?? current));
  window.location.assign(url.toString());
}

export function redirectIfUnauthorized<T>(result: ActionResult<T>): boolean {
  if (!result.success && result.unauthorized) {
    redirectToInvalidSession();
    return true;
  }

  return false;
}
