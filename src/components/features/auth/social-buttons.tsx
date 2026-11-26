"use client";

import type { ReactNode } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";

function SocialButton({
  icon,
  label,
  compact = false,
}: {
  icon: ReactNode;
  label: string;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={compact ? `Sign up with ${label}` : undefined}
      className={
        compact
          ? "btn bg-transparent border border-gray-300 hover:bg-gray-100 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
          : "w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
      }
    >
      {icon}
      <span className={compact ? undefined : "font-medium text-gray-700"}>
        {compact ? label : `Continue with ${label}`}
      </span>
    </button>
  );
}

export function SocialButtons({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="register-options flex gap-2 *:grow my-10">
        <SocialButton
          compact
          icon={<FaGoogle className="me-2 text-red-600" />}
          label="Google"
        />
        <SocialButton
          compact
          icon={<FaFacebookF className="me-2 text-blue-600" />}
          label="Facebook"
        />
      </div>
    );
  }

  return (
    <div className="space-y-3 mb-6">
      <SocialButton
        icon={<FaGoogle className="text-red-500 text-lg" />}
        label="Google"
      />
      <SocialButton
        icon={<FaFacebookF className="text-blue-600 text-lg" />}
        label="Facebook"
      />
    </div>
  );
}
