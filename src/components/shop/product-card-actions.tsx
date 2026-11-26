"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { redirectIfUnauthorized } from "@/lib/client-auth";
import { notify } from "@/lib/notify";
import { FaArrowsRotate, FaHeart, FaPlus, FaRegHeart } from "react-icons/fa6";

import { addToCart } from "@/actions/cart.actions";
import { addToWishlist } from "@/actions/wishlist.actions";

export function ProductCardWishlistButton({
  productId,
}: {
  productId: string;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

  async function handleAddToWishlist() {
    setPending(true);
    const result = await addToWishlist(productId);
    setPending(false);

    if (result.success) {
      setInWishlist(true);
      router.refresh();
    } else if (!redirectIfUnauthorized(result)) {
      notify.error(result.error);
    }
  }

  return (
    <button
      type="button"
      title={inWishlist ? "In wishlist" : "Add to wishlist"}
      onClick={handleAddToWishlist}
      disabled={pending}
      className={`bg-white h-8 w-8 rounded-full flex items-center justify-center transition shadow-sm disabled:opacity-60 ${
        inWishlist ? "text-red-500" : "text-gray-600 hover:text-red-500"
      }`}
    >
      {inWishlist ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
}

export function ProductCardCompareButton() {
  return (
    <button
      type="button"
      title="Compare"
      className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600 shadow-sm"
    >
      <FaArrowsRotate />
    </button>
  );
}

export function ProductCardAddButton({
  productId,
  title,
}: {
  productId: string;
  title: string;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleAddToCart() {
    setPending(true);
    const result = await addToCart({ productId });
    setPending(false);

    if (result.success) {
      router.refresh();
    } else if (!redirectIfUnauthorized(result)) {
      notify.error(result.error);
    }
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={pending}
      aria-label={`Add ${title} to cart`}
      className="h-10 w-10 rounded-full flex items-center justify-center transition bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-70"
    >
      <FaPlus />
    </button>
  );
}
