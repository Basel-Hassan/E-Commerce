"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { redirectIfUnauthorized } from "@/lib/client-auth";
import { notify } from "@/lib/notify";

import { clearCart } from "@/actions/cart.actions";

export function CartClearButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleClear() {
    if (pending) return;

    setPending(true);
    const result = await clearCart();

    setPending(false);
    setOpen(false);

    if (result.success) {
      router.refresh();
    } else if (!redirectIfUnauthorized(result)) {
      notify.error(result.error);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        disabled={pending}
        className="group flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
      >
        <FaTrash className="text-xs group-hover:scale-110 transition-transform" />
        <span>Clear all items</span>
      </button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Clear Your Cart?"
        description="All items will be removed from your cart. This action cannot be undone."
        confirmLabel="Yes, Clear All"
        cancelLabel="Keep Shopping"
        onConfirm={handleClear}
        variant="clear-cart"
        confirmPending={pending}
      />
    </>
  );
}
