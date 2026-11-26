"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { redirectIfUnauthorized } from "@/lib/client-auth";
import { notify } from "@/lib/notify";

import { updateCartItem } from "@/actions/cart.actions";

export function CartItemControls({
  productId,
  initialCount,
  max,
}: {
  productId: string;
  initialCount: number;
  max: number;
}) {
  const router = useRouter();
  const [count, setCount] = useState(initialCount);
  const [pending, setPending] = useState(false);
  const stock = Math.max(max, 1);

  async function updateCount(next: number) {
    if (pending || next === count) return;

    const previous = count;
    setPending(true);
    setCount(next);

    const result = await updateCartItem(productId, next);

    if (result.success) {
      router.refresh();
    } else {
      if (!redirectIfUnauthorized(result)) {
        setCount(previous);
        notify.error(result.error);
      }
    }

    setPending(false);
  }

  return (
    <div className="flex items-center">
      <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
        <button
          disabled={pending || count <= 1}
          onClick={() => updateCount(count - 1)}
          className="h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all"
          aria-label="Decrease quantity"
        >
          <FaMinus className="text-xs" aria-hidden="true" />
        </button>
        <span className="w-12 text-center font-bold text-gray-900">{count}</span>
        <button
          disabled={pending || count >= stock}
          onClick={() => updateCount(count + 1)}
          className="h-8 w-8 rounded-lg bg-primary-600 shadow-sm shadow-primary-600/30 flex items-center justify-center text-white hover:bg-primary-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          aria-label="Increase quantity"
        >
          <FaPlus className="text-xs" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
