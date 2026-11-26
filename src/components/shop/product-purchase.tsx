"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { redirectIfUnauthorized } from "@/lib/client-auth";
import { notify } from "@/lib/notify";
import {
  FaBolt,
  FaCartShopping,
  FaHeart,
  FaMinus,
  FaPlus,
  FaRegHeart,
  FaShareNodes,
} from "react-icons/fa6";

import { addToCart } from "@/actions/cart.actions";
import { addToWishlist } from "@/actions/wishlist.actions";
import { formatEgp, getCurrentPrice } from "@/lib/price";
import type { Product } from "@/types/shop";

export function ProductPurchase({ product }: { product: Product }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [cartPending, setCartPending] = useState(false);
  const [wishlistPending, setWishlistPending] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

  const max = Math.max(product.quantity, 1);
  const currentPrice = getCurrentPrice(
    product.price,
    product.priceAfterDiscount,
  );

  function updateQuantity(next: number) {
    setQuantity(Math.min(max, Math.max(1, next)));
  }

  async function handleAddToCart(redirect = false) {
    setCartPending(true);
    const result = await addToCart({ productId: product._id, quantity });
    setCartPending(false);

    if (result.success) {
      router.refresh();
      if (redirect) router.push("/cart");
    } else if (!redirectIfUnauthorized(result)) {
      notify.error(result.error);
    }
  }

  async function handleAddToWishlist() {
    setWishlistPending(true);
    const result = await addToWishlist(product._id);
    setWishlistPending(false);

    if (result.success) {
      setInWishlist(true);
      router.refresh();
    } else if (!redirectIfUnauthorized(result)) {
      notify.error(result.error);
    }
  }

  async function handleShare() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: product.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        notify.success("Product link copied.");
      }
    } catch {
      notify.error("Unable to share this product.");
    }
  }

  return (
    <>
      <div className="mb-6">
        <label
          htmlFor="quantity"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Quantity
        </label>
        <div className="flex items-center gap-4">
          <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => updateQuantity(quantity - 1)}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition disabled:opacity-50"
            >
              <FaMinus />
            </button>
            <input
              id="quantity"
              min="1"
              max={max}
              value={quantity}
              onChange={(event) => {
                const next = Number.parseInt(event.target.value, 10);
                updateQuantity(Number.isNaN(next) ? 1 : next);
              }}
              className="w-16 text-center border-0 focus:ring-0 focus:outline-none text-lg font-medium"
              type="number"
            />
            <button
              type="button"
              onClick={() => updateQuantity(quantity + 1)}
              disabled={quantity >= max}
              aria-label="Increase quantity"
              className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition disabled:opacity-50"
            >
              <FaPlus />
            </button>
          </div>
          <span className="text-sm text-gray-500">{max} available</span>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Price:</span>
          <span className="text-2xl font-bold text-primary-600">
            {formatEgp(currentPrice * quantity, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <button
          type="button"
          onClick={() => handleAddToCart()}
          disabled={cartPending}
          className="flex-1 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-primary-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-600/25 bg-primary-600 disabled:opacity-70"
        >
          <FaCartShopping />
          Add to Cart
        </button>
        <button
          type="button"
          onClick={() => handleAddToCart(true)}
          disabled={cartPending}
          className="flex-1 bg-gray-900 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
        >
          <FaBolt />
          Buy Now
        </button>
      </div>

      <div className="flex gap-3 mb-6">
        <button
          type="button"
          onClick={handleAddToWishlist}
          disabled={wishlistPending}
          className={`flex-1 border-2 py-3 px-4 rounded-xl font-medium transition flex items-center justify-center gap-2 disabled:opacity-70 ${
            inWishlist
              ? "border-red-200 text-red-500"
              : "border-gray-200 text-gray-700 hover:border-primary-300 hover:text-primary-600"
          }`}
        >
          {inWishlist ? <FaHeart /> : <FaRegHeart />}
          {inWishlist ? "In Wishlist" : "Add to Wishlist"}
        </button>
        <button
          type="button"
          onClick={handleShare}
          aria-label="Share product"
          className="border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl hover:border-primary-300 hover:text-primary-600 transition"
        >
          <FaShareNodes />
        </button>
      </div>
    </>
  );
}
