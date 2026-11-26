import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function AuthCard({
  title,
  description,
  children,
  footer,
  afterFooter,
  variant = "auth",
  className,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  afterFooter?: ReactNode;
  variant?: "auth" | "register";
  className?: string;
}) {
  const isRegister = variant === "register";
  const Heading: "h1" | "h2" = isRegister ? "h2" : "h1";

  return (
    <div
      className={cn(
        isRegister
          ? "bg-white rounded-2xl shadow-lg px-6 py-10"
          : "bg-white rounded-2xl shadow-xl p-8 lg:p-12",
        className,
      )}
    >
      {isRegister ? (
        <>
          <Heading className="text-center text-3xl font-semibold mb-2">
            {title}
          </Heading>
          {description ? <p className="text-center">{description}</p> : null}
        </>
      ) : (
        <div className="text-center mb-8">
          <div className="mb-4 flex items-center justify-center">
            <span className="text-3xl font-bold text-primary-600">
              Fresh<span className="text-gray-800">Cart</span>
            </span>
          </div>
          <Heading className="text-2xl font-bold text-gray-800 mb-2">
            {title}
          </Heading>
          {description ? <p className="text-gray-600">{description}</p> : null}
        </div>
      )}
      {children}
      {footer ? (
        <div
          className={
            isRegister
              ? "border-t pt-10 border-gray-300/30 my-4 text-center"
              : "text-center mt-8 pt-6 border-t border-gray-100 text-gray-600"
          }
        >
          {footer}
        </div>
      ) : null}
      {afterFooter ? <div>{afterFooter}</div> : null}
    </div>
  );
}
