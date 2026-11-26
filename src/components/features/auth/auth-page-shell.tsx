import type { ReactNode } from "react";

import { authGlobalCss } from "@/components/features/auth/auth-styles";

export function AuthPageShell({
  aside,
  children,
  variant = "auth",
}: {
  aside?: ReactNode;
  children: ReactNode;
  variant?: "auth" | "register";
}) {
  if (variant === "register") {
    return (
      <main className="py-10">
        <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 p-4">
          <style>{authGlobalCss}</style>
          {aside}
          {children}
        </div>
      </main>
    );
  }

  return (
    <div className="container py-16 mx-auto px-4" id="login-section">
      <style>{authGlobalCss}</style>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        {aside}
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
