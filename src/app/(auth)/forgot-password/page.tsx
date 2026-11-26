import type { Metadata } from "next";
import Link from "next/link";

import { AuthCard } from "@/components/features/auth/auth-card";
import { AuthPageShell } from "@/components/features/auth/auth-page-shell";
import { ForgotPasswordForm } from "@/components/features/auth/forgot-password-form";
import { ResetAside } from "@/components/features/auth/reset-aside";

export const metadata: Metadata = {
  title: "Forgot Password",
  description:
    "Reset your FreshCart password. We will send a secure verification code to your email.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthPageShell aside={<ResetAside />}>
      <AuthCard
        title="Forgot Password?"
        description="No worries, we'll send you a reset code"
        footer={
          <p>
            Remember your password?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary-600 transition-colors hover:text-primary-700"
            >
              Sign In
            </Link>
          </p>
        }
      >
        <ForgotPasswordForm />
      </AuthCard>
    </AuthPageShell>
  );
}
