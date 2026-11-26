"use client";

import type { ComponentProps } from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { authInputClass } from "@/components/features/auth/auth-styles";

type AuthInputProps = ComponentProps<"input"> & {
  icon: LucideIcon;
  containerClassName?: string;
};

export function AuthInput({
  icon: Icon,
  className,
  containerClassName,
  ...props
}: AuthInputProps) {
  return (
    <div className={cn("relative", containerClassName)}>
      <Icon
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        aria-hidden="true"
      />
      <input className={cn(authInputClass, className)} {...props} />
    </div>
  );
}
