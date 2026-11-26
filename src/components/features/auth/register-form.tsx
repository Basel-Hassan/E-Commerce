"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { CircleAlert, Loader2, UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { notify } from "@/lib/notify";

import { signUpAction } from "@/actions/auth.actions";
import {
  authErrorClass,
  registerButtonClass,
  registerInputClass,
} from "@/components/features/auth/auth-styles";
import { SocialButtons } from "@/components/features/auth/social-buttons";
import { measurePasswordStrength } from "@/lib/password";
import { zodResolver } from "@/lib/zod-resolver";
import { registerSchema, type RegisterInput } from "@/schemas/auth.schema";

export function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms: false,
    },
  });

  const [password, setPassword] = useState("");
  const passwordField = register("password");
  const strength = measurePasswordStrength(password);

  async function onSubmit(values: RegisterInput) {
    const result = await signUpAction({
      name: values.name,
      email: values.email,
      password: values.password,
      rePassword: values.rePassword,
      phone: values.phone,
    });

    if (!result.success) {
      notify.error("Validation errors");
      setError("root", { message: result.error });
      return;
    }

    const login = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (!login?.ok) {
      notify.success("Account created. Please sign in.");
      router.push("/login?registered=1");
      return;
    }

    notify.success("Your FreshCart account is ready.");
    router.push("/");
    router.refresh();
  }

  return (
    <>
      <SocialButtons compact />

      <div
        className="divider relative w-full h-0.5 bg-gray-300/30 my-4 flex items-center before:content-['or'] before:absolute before:top-1/2 before:left-1/2 before:-translate-1/2 before:bg-white before:px-4"
        aria-hidden="true"
      >
        <span className="sr-only">or</span>
      </div>

      <form
        className="space-y-7"
        method="post"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name*</label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Ali"
            className={registerInputClass}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          {errors.name ? (
            <p id="name-error" className={authErrorClass} role="alert">
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email*</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="ali@example.com"
            className={registerInputClass}
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

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password*</label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="create a strong password"
              className={registerInputClass}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password ? "password-error" : undefined
              }
              {...passwordField}
              onChange={(event) => {
                passwordField.onChange(event);
                setPassword(event.target.value);
              }}
            />
            <div className="password-requirements">
              <div className="flex items-center gap-2">
                <div
                  className="bar grow h-1 bg-gray-200 rounded-md overflow-hidden"
                  role="progressbar"
                  aria-valuenow={Number.parseInt(strength.width, 10)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Password strength: ${strength.label}`}
                >
                  <div
                    className={`h-full transition-all duration-300 ease-out ${strength.color}`}
                    style={{ width: strength.width }}
                  />
                </div>
                <span className="min-w-[50px] text-sm font-medium">
                  {strength.label}
                </span>
              </div>
            </div>
            <p className="text-gray-500 -mt-2 text-xs">
              Must be at least 8 characters with numbers and symbols
            </p>
          </div>
          {errors.password ? (
            <p id="password-error" className={authErrorClass} role="alert">
              {errors.password.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="rePassword">Confirm Password*</label>
          <input
            id="rePassword"
            type="password"
            autoComplete="new-password"
            placeholder="confirm your password"
            className={registerInputClass}
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

        <div className="flex flex-col gap-2">
          <label htmlFor="phone">Phone Number*</label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 234 567 8900"
            className={registerInputClass}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...register("phone")}
          />
          {errors.phone ? (
            <p id="phone-error" className={authErrorClass} role="alert">
              {errors.phone.message}
            </p>
          ) : null}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="terms"
              className="size-4 shrink-0 accent-primary-600"
              aria-invalid={Boolean(errors.terms)}
              aria-describedby={errors.terms ? "terms-error" : undefined}
              {...register("terms")}
            />
            <label htmlFor="terms" className="ms-2">
              I agree to the{" "}
              <Link
                href="/terms"
                className="text-primary-600 hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="text-primary-600 hover:underline"
              >
                Privacy Policy
              </Link>{" "}
              *
            </label>
          </div>
          {errors.terms ? (
            <p id="terms-error" className={authErrorClass} role="alert">
              {errors.terms.message}
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

        <button
          type="submit"
          disabled={isSubmitting}
          className={registerButtonClass}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="size-5 animate-spin" aria-hidden="true" />
              Creating Account...
            </span>
          ) : (
            <>
              <UserPlus className="me-2" aria-hidden="true" />
              <span>Create My Account</span>
            </>
          )}
        </button>
      </form>
    </>
  );
}
