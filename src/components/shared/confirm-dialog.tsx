"use client";

import type { ReactNode } from "react";
import { cn } from "cn";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

type ConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: ReactNode;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void | Promise<void>;
  variant?: "remove-item" | "clear-cart";
  confirmPending?: boolean;
};

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  variant = "remove-item",
  confirmPending = false,
}: ConfirmDialogProps) {
  const isClearCart = variant === "clear-cart";

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!confirmPending) onOpenChange(nextOpen);
      }}
    >
      <DialogContent
        showCloseButton={false}
        showHiddenCloseButton
        animated={false}
        overlayClassName="z-[1060] overflow-x-hidden overflow-y-auto bg-[rgba(0,0,0,0.4)] p-[10px] supports-backdrop-filter:backdrop-blur-none"
        className="z-auto w-full max-w-full gap-[normal] rounded-[var(--radius-modal)] bg-white p-0 pb-5 text-base leading-6 text-[#545454] shadow-2xl ring-0 ring-[rgba(0,0,0,0)] sm:w-[512px] sm:max-w-full"
      >
        <div className="m-0 px-[28.8px] pt-[18px] pb-[5.4px]">
          <div className="py-2 text-center">
            <div
              className={cn(
                "mx-auto flex items-center justify-center rounded-full",
                isClearCart
                  ? "mb-4 h-20 w-20 bg-linear-to-br from-red-50 to-orange-50"
                  : "mb-4 h-16 w-16 bg-red-100"
              )}
            >
              {isClearCart ? (
                <svg
                  className="h-10 w-10 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-8 w-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              )}
            </div>
            <DialogTitle
              render={<h3 />}
              className={cn(
                "mb-2 font-bold text-gray-900",
                isClearCart ? "text-2xl" : "text-xl"
              )}
        >
          {title}
        </DialogTitle>{" "}
        <DialogDescription

              className={cn(
                "text-sm leading-relaxed text-gray-500",
                isClearCart && "mx-auto max-w-xs"
              )}
      >
        {" "}
        {description}
        {" "}
      </DialogDescription>

          </div>
        </div>
        <div className="mt-5 flex flex-row-reverse justify-center gap-3 px-[23px] pt-0 pb-0">
          <button
            type="button"
            onClick={() => void onConfirm()}
            disabled={confirmPending}
            className={cn(
              "rounded-xl bg-red-500 px-[23px] py-3 text-base leading-6 font-semibold text-white transition-all hover:bg-red-600 disabled:opacity-50",
              isClearCart && "shadow-lg shadow-red-500/20"
            )}
          >
            {confirmLabel}
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={confirmPending}
            className="rounded-xl bg-gray-100 px-[23px] py-3 text-base leading-6 font-semibold text-gray-700 transition-all hover:bg-gray-200 disabled:opacity-50"
          >
            {cancelLabel}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
