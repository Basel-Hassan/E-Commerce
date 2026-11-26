"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

import { updateUserProfile } from "@/actions/user.actions";
import { FaIcon } from "@/components/shared/fa-icon";
import { redirectIfUnauthorized } from "@/lib/client-auth";
import { zodResolver } from "@/lib/zod-resolver";
import { profileSchema, type ProfileInput } from "@/schemas/user.schema";
import type { ProfileMessage, User } from "@/types/user";

type ProfileInformationFormProps = {
  user: User;
};

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all";

export function ProfileInformationForm({ user }: ProfileInformationFormProps) {
  const router = useRouter();
  const { update } = useSession();
  const [message, setMessage] = useState<ProfileMessage | null>(null);
  const [values, setValues] = useState({
    name: user.name,
    email: "",
    phone: "",
  });
  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  function updateField(field: keyof ProfileInput, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setValue(field, value);
  }

  async function onSubmit(submitted: ProfileInput) {
    const result = await updateUserProfile(submitted);

    if (result.success) {
      const name = result.data?.user?.name || submitted.name;
      const email = result.data?.user?.email || submitted.email;

      setValues((current) => ({ ...current, name }));
      await update({ name, email });
      router.refresh();
      setMessage({
        message:
          result.data?.message === "success"
            ? "Profile updated successfully"
            : result.data?.message || "Profile updated successfully",
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
        <input
          placeholder="Enter your name"
          className={inputClass}
          required
          type="text"
          value={values.name}
          onChange={(event) => updateField("name", event.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
        <input
          placeholder="Enter your email"
          className={inputClass}
          required
          type="email"
          value={values.email}
          onChange={(event) => updateField("email", event.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
        <input
          placeholder="01xxxxxxxxx"
          className={inputClass}
          required
          type="tel"
          value={values.phone}
          onChange={(event) => updateField("phone", event.target.value)}
        />
      </div>
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 shadow-lg shadow-primary-600/25"
        >
          <FaIcon name="floppy-disk" />Save Changes
        </button>
      </div>
      </form>
    </>
  );
}
