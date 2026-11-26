import { Check, KeyRound, Lock, Mail } from "lucide-react";

import { cn } from "@/lib/utils";

const steps = [
  { icon: Mail, label: "Email" },
  { icon: KeyRound, label: "Verify code" },
  { icon: Lock, label: "New password" },
];

export function ResetSteps({ step }: { step: 1 | 2 | 3 }) {
  return (
    <div className="mb-8 flex items-center justify-center">
      {steps.map(({ icon: Icon, label }, index) => {
        const current = index === step - 1;
        const completed = index < step - 1;

        return (
          <div key={label} className="flex items-center">
            <div
              className={cn(
                "flex size-10 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300",
                current
                  ? "bg-primary-600 text-white ring-4 ring-primary-100"
                  : completed
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-400",
              )}
              aria-current={current ? "step" : undefined}
            >
              {completed ? (
                <Check className="size-3.5" aria-hidden="true" />
              ) : (
                <Icon className="size-3" aria-hidden="true" />
              )}
              <span className="sr-only">{label}</span>
            </div>
            {index < steps.length - 1 ? (
              <div
                className={cn(
                  "mx-2 h-0.5 w-16 transition-all duration-300",
                  completed ? "bg-primary-600" : "bg-gray-200",
                )}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
