"use client";

import { useState } from "react";
import type { ComponentProps } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

import { cn } from "@/lib/utils";

import { authPasswordInputClass } from "@/components/features/auth/auth-styles";

export function PasswordInput({
  className,
  ...props
}: Omit<ComponentProps<"input">, "type">) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Lock
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        aria-hidden="true"
      />
      <input
        {...props}
        type={visible ? "text" : "password"}
        className={cn(authPasswordInputClass, className)}
      />
      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? (
          <EyeOff aria-hidden="true" />
        ) : (
          <Eye aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
