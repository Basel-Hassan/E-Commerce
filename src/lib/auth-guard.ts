import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { UnauthorizedError, apiFetch, isUnauthorizedError } from "@/lib/api";
import { getServerAuthSession } from "@/lib/auth";
import { safeInternalPath } from "@/lib/search-params";

type AuthAttempt<T> =
  | { ok: true; value: T }
  | { ok: false; error: unknown };

export async function requireSession() {
  const session = await getServerAuthSession();
  const token = session?.apiToken;

  if (!token || !session.user?.id) {
    throw new UnauthorizedError("Please sign in to continue.");
  }

  await apiFetch("api/v1/users/getMe", { token, cache: "no-store" });
  return session;
}

export async function requireApiToken(): Promise<string> {
  const session = await requireSession();
  return session.apiToken as string;
}

export async function authAttempt<T>(
  loader: () => Promise<T>,
): Promise<AuthAttempt<T>> {
  try {
    return { ok: true, value: await loader() };
  } catch (error) {
    return { ok: false, error };
  }
}

export function invalidSessionPath(callbackUrl: string): string {
  const params = new URLSearchParams({
    notice: "expired",
    callbackUrl: safeInternalPath(callbackUrl),
  });

  return `/api/auth/invalid-session?${params.toString()}`;
}

async function resolveCallbackUrl(callbackUrl?: string): Promise<string> {
  if (callbackUrl) return safeInternalPath(callbackUrl);

  const requestHeaders = await headers();
  const candidate =
    requestHeaders.get("x-invoke-path") ??
    requestHeaders.get("x-matched-path") ??
    "/";

  return safeInternalPath(candidate.split("?")[0]);
}

export async function withAuth<T>(
  loader: () => Promise<T>,
  callbackUrl?: string,
): Promise<T> {
  const attempt = await authAttempt(loader);

  if (!attempt.ok) {
    if (isUnauthorizedError(attempt.error)) {
      redirect(invalidSessionPath(await resolveCallbackUrl(callbackUrl)));
    }

    throw attempt.error;
  }

  return attempt.value;
}

export async function withOptionalAuth<T>(
  loader: () => Promise<T>,
  fallback: T,
): Promise<T> {
  const attempt = await authAttempt(loader);

  if (!attempt.ok) {
    if (isUnauthorizedError(attempt.error)) return fallback;
    throw attempt.error;
  }

  return attempt.value;
}
