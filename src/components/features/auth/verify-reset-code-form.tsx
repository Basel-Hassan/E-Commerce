"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CircleAlert,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { notify } from "@/lib/notify";

import {
  forgotPasswordAction,
  verifyResetCodeAction,
} from "@/actions/auth.actions";
import {
  authButtonClass,
  authErrorClass,
  authLabelClass,
} from "@/components/features/auth/auth-styles";
import { AuthInput } from "@/components/features/auth/auth-input";
import { ResetSteps } from "@/components/features/auth/reset-steps";
import { Button } from "@/components/ui/button";
import { markResetVerified, rememberResetEmail } from "@/lib/auth-storage";
import { zodResolver } from "@/lib/zod-resolver";
import {
  verifyResetCodeSchema,
  type VerifyResetCodeInput,
} from "@/schemas/auth.schema";

export function VerifyResetCodeForm({ email }: { email: string }) {
  const router = useRouter();
  const [isResending, setIsResending] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<VerifyResetCodeInput>({
    resolver: zodResolver(verifyResetCodeSchema),
    defaultValues: { resetCode: "" },
  });

  useEffect(() => {
    rememberResetEmail(email);
  }, [email]);

  async function onSubmit(values: VerifyResetCodeInput) {
    const result = await verifyResetCodeAction(values);

    if (!result.success) {
      notify.error(result.error);
      setError("root", { message: result.error });
      return;
    }

    markResetVerified();
    notify.success("Code verified. Choose a new password.");
    router.push(`/reset-password?email=${encodeURIComponent(email)}`);
  }

  async function handleResend() {
    setIsResending(true);

    try {
      const result = await forgotPasswordAction({ email });

      if (!result.success) {
      notify.error(result.error);

        return;
      }

      notify.success("New code sent!");
    } catch {
      notify.error("Unable to resend the code right now.");
    } finally {
      setIsResending(false);
    }
  }

  return (
    <>
      <ResetSteps step={2} />

      <form
        className="space-y-6"
        method="post"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor="resetCode" className={authLabelClass}>
            Verification Code
          </label>
          <AuthInput
            icon={ShieldCheck}
            id="resetCode"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            placeholder="••••••"
            className="text-center text-2xl font-mono tracking-[0.5em] md:text-2xl"
            aria-invalid={Boolean(errors.resetCode)}
            aria-describedby={
              errors.resetCode ? "reset-code-error" : undefined
            }
            {...register("resetCode")}
          />
          {errors.resetCode ? (
            <p id="reset-code-error" className={authErrorClass} role="alert">
              {errors.resetCode.message}
            </p>
          ) : null}
        </div>

        {errors.root?.message ? (
          <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            <CircleAlert
              className="mt-0.5 size-4 shrink-0"
              aria-hidden="true"
            />
            <p>{errors.root.message}</p>
          </div>
        ) : null}

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Didn&apos;t receive the code?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="font-semibold text-primary-600 transition-colors hover:text-primary-700 disabled:opacity-50"
            >
              Resend Code
            </button>
          </p>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className={authButtonClass}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="size-5 animate-spin" aria-hidden="true" />
              Verifying...
            </span>
          ) : (
            "Verify Code"
          )}
        </Button>

        <div className="text-center">
          <Link
            href="/forgot-password"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-primary-600"
          >
            <ArrowLeft className="size-3" aria-hidden="true" />
            Change email address
          </Link>
        </div>
      </form>
    </>
  );
}
