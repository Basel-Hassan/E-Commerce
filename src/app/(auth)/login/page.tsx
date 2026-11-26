import type { Metadata } from "next";
import Link from "next/link";
import { Lock, Star, Users } from "lucide-react";

import { AuthCard } from "@/components/features/auth/auth-card";
import { AuthPageShell } from "@/components/features/auth/auth-page-shell";
import { LoginAside } from "@/components/features/auth/login-aside";
import { LoginForm } from "@/components/features/auth/login-form";
import { firstParam, safeInternalPath } from "@/lib/search-params";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to your FreshCart account to shop fresh groceries and track your orders.",
};

const notices = {
  reset: "Your password has been reset. Sign in with your new password.",
  registered: "Your account is ready. Sign in to continue.",
  expired: "Your session expired. Please sign in again.",
} as const;

type NoticeKey = keyof typeof notices;

type AuthSearchParams = Promise<
  Record<string, string | string[] | undefined>
>;

function resolveNotice(
  params: Record<string, string | string[] | undefined>,
): string | undefined {
  const key = firstParam(params.notice);

  if (key && key in notices) return notices[key as NoticeKey];
  if (params.reset) return notices.reset;
  if (params.registered) return notices.registered;
  if (params.expired) return notices.expired;

  return undefined;
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: AuthSearchParams;
}) {
  const params = await searchParams;
  const callbackUrl = safeInternalPath(firstParam(params.callbackUrl));
  const notice = resolveNotice(params);

  return (
    <AuthPageShell aside={<LoginAside />}>
      <AuthCard
        title="Welcome Back!"
        description="Sign in to continue your fresh shopping experience"
        footer={
          <p>
            New to FreshCart?
            <Link
              href="/register"
              className="ms-2 font-semibold text-primary-600 transition-colors hover:text-primary-700"
            >
              Create an account
            </Link>
          </p>
        }
        afterFooter={
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-500">
            <span className="flex items-center">
              <Lock className="mr-1 size-3" aria-hidden="true" />
              SSL Secured
            </span>
            <span className="flex items-center">
              <Users className="mr-1 size-3" aria-hidden="true" />
              50K+ Users
            </span>
            <span className="flex items-center">
              <Star className="mr-1 size-3" aria-hidden="true" />
              4.9 Rating
            </span>
          </div>
        }
      >
        <LoginForm callbackUrl={callbackUrl} notice={notice} />
      </AuthCard>
    </AuthPageShell>
  );
}
