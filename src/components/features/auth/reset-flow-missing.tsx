import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function ResetFlowMissing() {
  return (
    <div className="space-y-6 text-center">
      <p className="text-gray-600">
        We couldn&apos;t find an email for this reset request. Start the reset
        flow again so we can send you a fresh code.
      </p>
      <Link
        href="/forgot-password"
        className="inline-flex h-auto w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:bg-primary-700 hover:shadow-xl"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Start over
      </Link>
    </div>
  );
}
