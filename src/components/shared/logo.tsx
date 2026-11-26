import Link from "next/link";

import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-baseline text-2xl font-bold tracking-tight text-primary-600",
        className,
      )}
    >
      Fresh<span className="text-gray-800">Cart</span>
    </Link>
  );
}
