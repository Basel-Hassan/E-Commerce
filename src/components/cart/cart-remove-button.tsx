"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { redirectIfUnauthorized } from "@/lib/client-auth";
import { notify } from "@/lib/notify";

import { removeFromCart } from "@/actions/cart.actions";

export function CartItemRemoveButton({
  productId,
  productTitle,
}: {
  productId: string;
  productTitle: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  async function removeItem() {
    if (pending) return;

    setPending(true);
    const result = await removeFromCart(productId);

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
        disabled={pending}
        onClick={() => setOpen(true)}
        className="h-10 w-10 rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center disabled:opacity-40 transition-all duration-200"
        title="Remove item"
        aria-label="Remove from cart"
      >
        <FaTrash className="text-sm" aria-hidden="true" />
      </button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Remove Item?"
        description={
          <>
            Remove{" "}
            <span className="font-semibold text-gray-700">{productTitle}</span>{" "}
            from your cart?
          </>
        }
        confirmLabel="Remove"
        cancelLabel="Cancel"
        onConfirm={removeItem}
        confirmPending={pending}
      />
    </>
  );
}
