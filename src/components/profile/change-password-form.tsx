"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

import { changeUserPassword } from "@/actions/user.actions";
import { FaIcon } from "@/components/shared/fa-icon";
import { redirectIfUnauthorized } from "@/lib/client-auth";
import { zodResolver } from "@/lib/zod-resolver";
import {
  changePasswordSchema,
  type ChangePasswordInput,
} from "@/schemas/user.schema";
import type { ProfileMessage } from "@/types/user";

type ChangePasswordFormProps = Record<string, never>;

const inputClass =
  "w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all";
const toggleClass =
  "absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600";

export function ChangePasswordForm({}: ChangePasswordFormProps) {
  const router = useRouter();
  const { update } = useSession();
  const [message, setMessage] = useState<ProfileMessage | null>(null);
  const [visible, setVisible] = useState({
    current: false,
    next: false,
    confirm: false,
  });
  const [values, setValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: values,
  });

  function updateField(field: keyof ChangePasswordInput, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setValue(field, value);
  }

  async function onSubmit(submitted: ChangePasswordInput) {
    const result = await changeUserPassword(submitted);

    if (result.success) {
      setValues({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setValue("currentPassword", "");
      setValue("newPassword", "");
      setValue("confirmPassword", "");

      if (result.data?.token) await update({ apiToken: result.data.token });
      router.refresh();
      setMessage({
        message: result.data?.message || "Password changed successfully",
        success: true,
      });
      return;
    }

    if (redirectIfUnauthorized(result)) return;

    setMessage({ message: result.error, success: false });
  }

  return (
    <>
      {message ? (
        <div
          className={`mb-6 p-4 rounded-xl text-sm font-medium ${message.success ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}
        >
          {message.message}
        </div>
      ) : null}
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
        <div className="relative">
          <input
            placeholder="Enter your current password"
            className={inputClass}
            required
            type={visible.current ? "text" : "password"}
            value={values.currentPassword}
            onChange={(event) => updateField("currentPassword", event.target.value)}
          />
          <button
            type="button"
            className={toggleClass}
            onClick={() => setVisible((state) => ({ ...state, current: !state.current }))}
          >
            <FaIcon name={visible.current ? "eye-slash" : "eye"} />
          </button>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
        <div className="relative">
          <input
            placeholder="Enter your new password"
            className={inputClass}
            required
            minLength={6}
            type={visible.next ? "text" : "password"}
            value={values.newPassword}
            onChange={(event) => updateField("newPassword", event.target.value)}
          />
          <button
            type="button"
            className={toggleClass}
            onClick={() => setVisible((state) => ({ ...state, next: !state.next }))}
          >
            <FaIcon name={visible.next ? "eye-slash" : "eye"} />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
        <div className="relative">
          <input
            placeholder="Confirm your new password"
            className={inputClass}
            required
            type={visible.confirm ? "text" : "password"}
            value={values.confirmPassword}
            onChange={(event) => updateField("confirmPassword", event.target.value)}
          />
          <button
            type="button"
            className={toggleClass}
            onClick={() => setVisible((state) => ({ ...state, confirm: !state.confirm }))}
          >
            <FaIcon name={visible.confirm ? "eye-slash" : "eye"} />
          </button>
        </div>
      </div>
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50 shadow-lg shadow-amber-600/25"
        >
          <FaIcon name="lock" />Change Password
        </button>
      </div>
      </form>
    </>
  );
}
