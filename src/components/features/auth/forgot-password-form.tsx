"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CircleAlert, Loader2, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { notify } from "@/lib/notify";

import { forgotPasswordAction } from "@/actions/auth.actions";
import {
  authButtonClass,
  authErrorClass,
  authLabelClass,
} from "@/components/features/auth/auth-styles";
import { AuthInput } from "@/components/features/auth/auth-input";
import { ResetSteps } from "@/components/features/auth/reset-steps";
import { Button } from "@/components/ui/button";
import { rememberResetEmail } from "@/lib/auth-storage";
import { zodResolver } from "@/lib/zod-resolver";
import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "@/schemas/auth.schema";

export function ForgotPasswordForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: ForgotPasswordInput) {
    const result = await forgotPasswordAction(values);

    if (!result.success) {
      notify.error(result.error);
      setError("root", { message: result.error });
      return;
    }

    rememberResetEmail(values.email);
    notify.success("Reset code sent to your email!");
    router.push(
      `/verify-reset-code?email=${encodeURIComponent(values.email)}`,
    );
  }

  return (
    <>
      <ResetSteps step={1} />

      <form
        className="space-y-6"
        method="post"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor="email" className={authLabelClass}>
            Email Address
          </label>
          <AuthInput
            icon={Mail}
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email address"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email ? (
            <p id="email-error" className={authErrorClass} role="alert">
              {errors.email.message}
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

        <Button
          type="submit"
          disabled={isSubmitting}
          className={authButtonClass}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="size-5 animate-spin" aria-hidden="true" />
              Sending Code...
            </span>
          ) : (
            "Send Reset Code"
          )}
        </Button>

        <div className="text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 transition-colors hover:text-primary-700"
          >
            <ArrowLeft className="size-3" aria-hidden="true" />
            Back to Sign In
          </Link>
        </div>
      </form>
    </>
  );
}
