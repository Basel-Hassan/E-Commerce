"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { redirectIfUnauthorized } from "@/lib/client-auth";
import { notify } from "@/lib/notify";

import {
  moveToCart,
  removeFromWishlist,
} from "@/actions/wishlist.actions";
import { Price } from "@/components/shared/price";
import type { Product } from "@/types/shop";

const cartPath =
  "M24-16C10.7-16 0-5.3 0 8S10.7 32 24 32l45.3 0c3.9 0 7.2 2.8 7.9 6.6l52.1 286.3c6.2 34.2 36 59.1 70.8 59.1L456 384c13.3 0 24-10.7 24-24s-10.7-24-24-24l-255.9 0c-11.6 0-21.5-8.3-23.6-19.7l-5.1-28.3 303.6 0c30.8 0 57.2-21.9 62.9-52.2L568.9 69.9C572.6 50.2 557.5 32 537.4 32l-412.7 0-.4-2c-4.8-26.6-28-46-55.1-46L24-16zM208 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm224 0a48 48 0 1 0 0-96 48 48 0 1 0 0 96z";
const trashPath =
  "M136.7 5.9L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-8.7-26.1C306.9-7.2 294.7-16 280.9-16L167.1-16c-13.8 0-26 8.8-30.4 21.9zM416 144L32 144 53.1 467.1C54.7 492.4 75.7 512 101 512L347 512c25.3 0 46.3-19.6 47.9-44.9L416 144z";
const checkPath =
  "M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z";

function InlineIcon({
  icon,
  viewBox,
  path,
  className,
}: {
  icon: string;
  viewBox: string;
  path: string;
  className: string;
}) {
  return (
    <svg
      data-prefix="fas"
      data-icon={icon}
      className={`svg-inline--fa fa-${icon} ${className}`}
      role="img"
      viewBox={viewBox}
      aria-hidden="true"
    >
      <path fill="currentColor" d={path} />
    </svg>
  );
}

export function WishlistRow({
  product,
  inCart,
}: {
  product: Product;
  inCart: boolean;
}) {
  const router = useRouter();
  const [hidden, setHidden] = useState(false);
  const [pending, setPending] = useState<"move" | "remove" | null>(null);
  const inStock = product.quantity > 0;

  if (hidden) return null;

  async function handleMove() {
    if (pending || !inStock) return;

    setPending("move");
    const result = await moveToCart(product._id);

    if (result.success) {
      setHidden(true);
      router.refresh();
    } else if (!redirectIfUnauthorized(result)) {
      notify.error(result.error);
    }

    setPending(null);
  }

  async function handleRemove() {
    if (pending) return;

    setPending("remove");
    setHidden(true);
    const result = await removeFromWishlist(product._id);

    if (result.success) {
      router.refresh();
    } else {
      if (!redirectIfUnauthorized(result)) {
        setHidden(false);
        notify.error(result.error);
      }
    }

    setPending(null);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:px-6 md:py-5 items-center hover:bg-gray-50/50 transition-colors">
      <div className="md:col-span-6 flex items-center gap-4">
        <Link
          href={`/products/${product._id}`}
          className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0"
        >
          <img
            alt={product.title}
            className="w-full h-full object-contain p-2"
            src={product.imageCover}
          />
        </Link>
        <div className="min-w-0">
          <Link
            href={`/products/${product._id}`}
            className="font-medium text-gray-900 hover:text-primary-600 transition-colors line-clamp-2"
          >
            {product.title}
          </Link>
          <p className="text-sm text-gray-400 mt-1">{product.category.name}</p>
        </div>
      </div>

      <div className="md:col-span-2 flex md:justify-center items-center gap-2">
        <span className="md:hidden text-sm text-gray-500">Price:</span>
        <div className="text-right md:text-center">
          <Price
            price={product.price}
            priceAfterDiscount={product.priceAfterDiscount}
            size="wishlist"
          />
        </div>
      </div>

      <div className="md:col-span-2 flex md:justify-center">
        <span className="md:hidden text-sm text-gray-500 mr-2">Status:</span>
        {inCart ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
            <InlineIcon
              icon="cart-shopping"
              viewBox="0 0 640 512"
              path={cartPath}
              className="text-[10px]"
            />
            In Cart
          </span>
        ) : inStock ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            In Stock
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
            Out of Stock
          </span>
        )}
      </div>

      <div className="md:col-span-2 flex items-center gap-2 md:justify-center">
        {inCart ? (
          <Link
            href="/cart"
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
          >
            <InlineIcon
              icon="check"
              viewBox="0 0 448 512"
              path={checkPath}
              className="text-xs text-green-600"
            />
            <span className="md:hidden lg:inline">View Cart</span>
          </Link>
        ) : (
          <button
            onClick={handleMove}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all bg-primary-600 text-white hover:bg-primary-700"
          >
            <InlineIcon
              icon="cart-shopping"
              viewBox="0 0 640 512"
              path={cartPath}
              className="text-xs"
            />
            <span className="md:hidden lg:inline">
              {pending === "move" ? "Moving..." : "Add to Cart"}
            </span>
          </button>
        )}
        <button
          onClick={handleRemove}
          className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all disabled:opacity-50"
          title="Remove"
        >
          <InlineIcon
            icon="trash"
            viewBox="0 0 448 512"
            path={trashPath}
            className="text-sm"
          />
        </button>
      </div>
    </div>
  );
}
