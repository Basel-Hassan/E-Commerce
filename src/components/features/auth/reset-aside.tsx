import { KeyRound, Lock, Mail, ShieldCheck } from "lucide-react";

export function ResetAside() {
  return (
    <div className="hidden lg:block">
      <div className="relative flex h-96 w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary-50 via-green-50 to-emerald-50 shadow-lg">
        <div className="absolute left-8 top-8 size-24 rounded-full bg-primary-100/50" />
        <div className="absolute bottom-12 right-10 size-32 rounded-full bg-green-100/50" />
        <div className="absolute right-20 top-20 size-16 rounded-full bg-emerald-100/50" />

        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="flex size-28 rotate-3 items-center justify-center rounded-3xl bg-white shadow-xl transition-transform duration-300 hover:rotate-0">
            <div className="flex size-20 items-center justify-center rounded-2xl bg-primary-100">
              <Lock className="size-10 text-primary-600" aria-hidden="true" />
            </div>
          </div>
          <div className="absolute -left-16 top-4 flex size-14 -rotate-12 items-center justify-center rounded-xl bg-white shadow-lg">
            <Mail className="size-5 text-primary-500" aria-hidden="true" />
          </div>
          <div className="absolute -right-16 top-8 flex size-14 rotate-12 items-center justify-center rounded-xl bg-white shadow-lg">
            <ShieldCheck
              className="size-5 text-green-500"
              aria-hidden="true"
            />
          </div>
          <div className="flex gap-3">
            <span className="size-3 animate-pulse rounded-full bg-primary-400" />
            <span className="size-3 animate-pulse rounded-full bg-primary-500 [animation-delay:150ms]" />
            <span className="size-3 animate-pulse rounded-full bg-primary-600 [animation-delay:300ms]" />
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Reset Your Password</h2>
        <p className="text-lg text-gray-600">
          Don&apos;t worry, it happens to the best of us. We&apos;ll help you
          get back into your account in no time.
        </p>
        <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
          <span className="flex items-center">
            <Mail className="mr-2 size-4 text-primary-600" aria-hidden="true" />
            Email Verification
          </span>
          <span className="flex items-center">
            <KeyRound
              className="mr-2 size-4 text-primary-600"
              aria-hidden="true"
            />
            Secure Reset
          </span>
          <span className="flex items-center">
            <Lock className="mr-2 size-4 text-primary-600" aria-hidden="true" />
            Encrypted
          </span>
        </div>
      </div>
    </div>
  );
}
