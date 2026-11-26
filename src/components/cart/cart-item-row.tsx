import Link from "next/link";
import { FaCheck } from "react-icons/fa6";

import { CartItemControls } from "@/components/cart/cart-item-controls";
import { CartItemRemoveButton } from "@/components/cart/cart-remove-button";
import { formatEgp } from "@/lib/price";
import type { CartItem } from "@/types/shop";

export function CartItemRow({ item }: { item: CartItem }) {
  const { product } = item;
  const sku = product._id.slice(-6).toUpperCase();

  return (
    <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 ">
      <div className="p-4 sm:p-5">
        <div className="flex gap-4 sm:gap-6">
          <Link
            href={`/products/${product._id}`}
            className="relative shrink-0 group"
          >
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-gradient-to-br from-gray-50 via-white to-gray-100 p-3 border border-gray-100 overflow-hidden">
              <img
                alt={product.title}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                src={product.imageCover}
              />
            </div>
            <div
              className={`absolute -bottom-1 -right-1 ${
                product.quantity > 0 ? "bg-green-500" : "bg-gray-400"
              } text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1`}
            >
              <FaCheck className="text-[8px]" aria-hidden="true" />
              {product.quantity > 0 ? "In Stock" : "Out of Stock"}
            </div>
          </Link>

          <div className="flex-1 min-w-0 flex flex-col">
            <div className="mb-3">
              <Link
                href={`/products/${product._id}`}
                className="group/title inline-block"
              >
                <h3 className="font-semibold text-gray-900 group-hover/title:text-primary-600 transition-colors leading-relaxed text-base sm:text-lg">
                  {product.title}
                </h3>
              </Link>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-block px-2.5 py-1 bg-gradient-to-r from-primary-50 to-emerald-50 text-primary-700 text-xs font-medium rounded-full">
                  {product.category.name}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">SKU: {sku}</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-primary-600 font-bold text-lg">
                  {formatEgp(item.price)}
                </span>
                <span className="text-xs text-gray-400">per unit</span>
              </div>
            </div>

            <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
              <CartItemControls
                key={`${product._id}-${item.count}`}
                productId={product._id}
                initialCount={item.count}
                max={product.quantity}
              />
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-gray-400 mb-0.5">Total</p>
                  <p className="text-xl font-bold text-gray-900">
                    {item.price * item.count}{" "}
                    <span className="text-sm font-medium text-gray-400">
                      EGP
                    </span>
                  </p>
                </div>
                <CartItemRemoveButton
                  productId={product._id}
                  productTitle={product.title}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
