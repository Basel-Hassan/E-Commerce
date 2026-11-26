"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CircleAlert, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { notify } from "@/lib/notify";

import { resetPasswordAction } from "@/actions/auth.actions";
import {
  authButtonClass,
  authErrorClass,
  authLabelClass,
} from "@/components/features/auth/auth-styles";
import { PasswordInput } from "@/components/features/auth/password-input";
import { ResetSteps } from "@/components/features/auth/reset-steps";
import { Button } from "@/components/ui/button";
import { clearResetFlow, isResetVerified } from "@/lib/auth-storage";
import { zodResolver } from "@/lib/zod-resolver";
import {
  resetPasswordSchema,
  type ResetPasswordInput,
} from "@/schemas/auth.schema";

export function ResetPasswordForm({ email }: { email: string }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email,
      newPassword: "",
      rePassword: "",
    },
  });

  useEffect(() => {
    if (!isResetVerified()) {
      router.replace("/forgot-password");
    }
  }, [router]);

  async function onSubmit(values: ResetPasswordInput) {
    const result = await resetPasswordAction({
      email: values.email,
      newPassword: values.newPassword,
    });

    if (!result.success) {
      notify.error(result.error);
      setError("root", { message: result.error });
      return;
    }

    clearResetFlow();
    notify.success("Password updated. Sign in with your new password.");
    router.push("/login?reset=1");
  }

  return (
    <>
      <ResetSteps step={3} />

      <form
        className="space-y-6"
        method="post"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <input type="hidden" {...register("email")} />

        <div>
          <label htmlFor="newPassword" className={authLabelClass}>
            New Password
          </label>
          <PasswordInput
            id="newPassword"
            autoComplete="new-password"
            placeholder="Enter new password"
            aria-invalid={Boolean(errors.newPassword)}
            aria-describedby={
              errors.newPassword ? "new-password-error" : undefined
            }
            {...register("newPassword")}
          />
          {errors.newPassword ? (
            <p id="new-password-error" className={authErrorClass} role="alert">
              {errors.newPassword.message}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="rePassword" className={authLabelClass}>
            Confirm Password
          </label>
          <PasswordInput
            id="rePassword"
            autoComplete="new-password"
            placeholder="Confirm new password"
            aria-invalid={Boolean(errors.rePassword)}
            aria-describedby={
              errors.rePassword ? "re-password-error" : undefined
            }
            {...register("rePassword")}
          />
          {errors.rePassword ? (
            <p id="re-password-error" className={authErrorClass} role="alert">
              {errors.rePassword.message}
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
              Resetting Password...
            </span>
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>
    </>
  );
}
