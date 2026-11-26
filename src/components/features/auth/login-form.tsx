"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { CircleAlert, Loader2, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { notify } from "@/lib/notify";

import {
  authButtonClass,
  authErrorClass,
  authLabelClass,
  authLabelInlineClass,
} from "@/components/features/auth/auth-styles";
import { AuthInput } from "@/components/features/auth/auth-input";
import { PasswordInput } from "@/components/features/auth/password-input";
import { SocialButtons } from "@/components/features/auth/social-buttons";
import { safeInternalPath } from "@/lib/search-params";
import { zodResolver } from "@/lib/zod-resolver";
import { loginSchema, type LoginInput } from "@/schemas/auth.schema";

export function LoginForm({
  callbackUrl,
  notice,
}: {
  callbackUrl?: string;
  notice?: string;
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  async function onSubmit(values: LoginInput) {
    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (!result?.ok) {
        notify.error("Incorrect email or password");
        return;
      }

      notify.success("Login successful");
      router.push(safeInternalPath(callbackUrl));
      router.refresh();
    } catch {
      notify.error("Unable to sign in right now. Please try again.");
    }
  }

  return (
    <>
      {notice ? (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-primary-100 bg-primary-50 px-4 py-3 text-sm text-primary-700">
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <p>{notice}</p>
        </div>
      ) : null}

      <SocialButtons />

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500 font-medium">
            OR CONTINUE WITH EMAIL
          </span>
        </div>
      </div>

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
            placeholder="Enter your email"
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

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="password" className={authLabelInlineClass}>
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-primary-600 hover:text-primary-700 cursor-pointer font-medium"
            >
              Forgot Password?
            </Link>
          </div>
          <PasswordInput
            id="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "password-error" : undefined}
            {...register("password")}
          />
          {errors.password ? (
            <p id="password-error" className={authErrorClass} role="alert">
              {errors.password.message}
            </p>
          ) : null}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-primary-600 accent-primary-600 border-2 border-gray-300 rounded focus:ring-primary-500"
              {...register("rememberMe")}
            />
            <span className="ml-3 text-sm text-gray-700">
              Keep me signed in
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={authButtonClass}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="size-5 animate-spin" aria-hidden="true" />
              Signing in...
            </span>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </>
  );
}
