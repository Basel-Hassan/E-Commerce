import type { Metadata } from "next";
import Link from "next/link";

import { AuthCard } from "@/components/features/auth/auth-card";
import { AuthPageShell } from "@/components/features/auth/auth-page-shell";
import { RegisterForm } from "@/components/features/auth/register-form";
import { SignupAside } from "@/components/features/auth/signup-aside";

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "Create a FreshCart account for faster checkout, order history and fresh grocery delivery.",
};

export default function RegisterPage() {
  return (
    <AuthPageShell variant="register" aside={<SignupAside />}>
      <AuthCard
        variant="register"
        title="Create Your Account"
        description="Start your fresh journey with us today"
        footer={
          <p>
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary-600 hover:underline"
            >
              Sign In
            </Link>
          </p>
        }
      >
        <RegisterForm />
      </AuthCard>
    </AuthPageShell>
  );
}
