import type { Metadata } from "next";

import { AuthCard } from "@/components/features/auth/auth-card";
import { AuthPageShell } from "@/components/features/auth/auth-page-shell";
import { ResetAside } from "@/components/features/auth/reset-aside";
import { ResetFlowMissing } from "@/components/features/auth/reset-flow-missing";
import { VerifyResetCodeForm } from "@/components/features/auth/verify-reset-code-form";
import { firstParam } from "@/lib/search-params";

export const metadata: Metadata = {
  title: "Verify Reset Code",
  description:
    "Enter the 6-digit verification code sent to your email to reset your FreshCart password.",
};

type AuthSearchParams = Promise<
  Record<string, string | string[] | undefined>
>;

export default async function VerifyResetCodePage({
  searchParams,
}: {
  searchParams: AuthSearchParams;
}) {
  const params = await searchParams;
  const email = firstParam(params.email);

  return (
    <AuthPageShell aside={<ResetAside />}>
      <AuthCard
        title="Check Your Email"
        description={
          email
            ? `Enter the 6-digit code sent to ${email}`
            : "Enter the reset code from your email"
        }
      >
        {email ? <VerifyResetCodeForm email={email} /> : <ResetFlowMissing />}
      </AuthCard>
    </AuthPageShell>
  );
}
