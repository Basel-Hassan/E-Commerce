import type { ReactNode } from "react";
import {
  FaBagShopping,
  FaBox,
  FaShieldHalved,
  FaTruck,
} from "react-icons/fa6";

import { formatEgp } from "@/lib/price";
import type { CartSnapshot } from "@/types/shop";

export function CheckoutSummary({
  cart,
  children,
}: {
  cart: CartSnapshot;
  children?: ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm sticky top-4">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <FaBagShopping aria-hidden="true" />
          Order Summary
        </h2>
        <p className="text-primary-100 text-sm mt-1">
          {`${cart.itemCount} ${cart.itemCount === 1 ? "item" : "items"}`}
        </p>
      </div>
      <div className="p-5">
        <div className="space-y-3 max-h-56 overflow-y-auto mb-5 pr-1">
          {cart.items.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="w-14 h-14 rounded-lg bg-white p-1 border border-gray-100 shrink-0">
                <img
                  alt={item.product.title}
                  className="w-full h-full object-contain"
                  src={item.product.imageCover}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {item.product.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {`${item.count} × ${item.price} EGP`}
                </p>
              </div>
              <p className="text-sm font-bold text-gray-900 shrink-0">
                {(item.price * item.count).toLocaleString("en-US")}
              </p>
            </div>
          ))}
        </div>
        <hr className="border-gray-100 my-4" />
        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="font-medium">{formatEgp(cart.totalPrice)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span className="flex items-center gap-2">
              <FaTruck className="text-gray-400" aria-hidden="true" />
              Shipping
            </span>
            <span className="text-green-600 font-semibold">FREE</span>
          </div>
          <hr className="border-gray-100" />
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <div className="text-right">
              <span className="text-2xl font-bold text-primary-600">
                {cart.totalPrice.toLocaleString("en-US")}
              </span>
              <span className="text-sm text-gray-500 ml-1">EGP</span>
            </div>
          </div>
        </div>
        {children}
        <div className="flex items-center justify-center gap-4 mt-4 py-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <FaShieldHalved
              className="text-green-500"
              aria-hidden="true"
            />
            <span>Secure</span>
          </div>
          <div className="w-px h-4 bg-gray-200" />
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <FaTruck className="text-blue-500" aria-hidden="true" />
            <span>Fast Delivery</span>
          </div>
          <div className="w-px h-4 bg-gray-200" />
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <FaBox className="text-orange-500" aria-hidden="true" />
            <span>Easy Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
}
