import type { Metadata } from "next";

import { AuthCard } from "@/components/features/auth/auth-card";
import { AuthPageShell } from "@/components/features/auth/auth-page-shell";
import { ResetAside } from "@/components/features/auth/reset-aside";
import { ResetFlowMissing } from "@/components/features/auth/reset-flow-missing";
import { ResetPasswordForm } from "@/components/features/auth/reset-password-form";
import { firstParam } from "@/lib/search-params";

export const metadata: Metadata = {
  title: "Reset Password",
  description:
    "Choose a new password for your FreshCart account and get back to shopping.",
};

type AuthSearchParams = Promise<
  Record<string, string | string[] | undefined>
>;

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: AuthSearchParams;
}) {
  const params = await searchParams;
  const email = firstParam(params.email);

  return (
    <AuthPageShell aside={<ResetAside />}>
      <AuthCard
        title="Create New Password"
        description="Your new password must be different from previous passwords"
      >
        {email ? <ResetPasswordForm email={email} /> : <ResetFlowMissing />}
      </AuthCard>
    </AuthPageShell>
  );
}
