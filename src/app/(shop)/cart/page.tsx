import type { Metadata } from "next";
import Link from "next/link";
import {
  FaBagShopping,
  FaCartShopping,
  FaLock,
  FaShieldHalved,
  FaTruck,
} from "react-icons/fa6";

import { getCart } from "@/actions/cart.actions";
import { CartClearButton } from "@/components/cart/cart-clear-button";
import { CartEmpty } from "@/components/cart/cart-empty";
import { CartItemRow } from "@/components/cart/cart-item-row";
import { CartPromoButton } from "@/components/cart/cart-promo-button";
import { Container } from "@/components/layout/container";
import { withAuth } from "@/lib/auth-guard";
import { formatEgp } from "@/lib/price";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Review and update the products in your FreshCart cart.",
};

const FREE_SHIPPING_THRESHOLD = 500;
const SHIPPING_FEE = 50;

export default async function CartPage() {
  const cart = await withAuth(() => getCart(), "/cart");

  if (cart.items.length === 0) {
    return <CartEmpty />;
  }

  const shipping =
    cart.totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = cart.totalPrice + shipping;
  const remaining = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - cart.totalPrice,
  );
  const progress = Math.min(
    100,
    (cart.totalPrice / FREE_SHIPPING_THRESHOLD) * 100,
  );

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <Container>
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-primary-600 transition">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Shopping Cart</span>
          </nav>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="bg-linear-to-r from-primary-600 to-primary-700 text-white w-12 h-12 rounded-xl flex items-center justify-center">
                  <FaCartShopping aria-hidden="true" />
                </span>
                Shopping Cart
              </h1>
              <p className="text-gray-500 mt-2">
                You have{" "}
                <span className="font-semibold text-primary-600">
                  {`${cart.itemCount} ${cart.itemCount === 1 ? "item" : "items"}`}
                </span>{" "}
                in your cart
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.items.map((item) => (
                <CartItemRow key={item._id} item={item} />
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
              <Link
                href="/"
                className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-2"
              >
                <span>←</span> Continue Shopping
              </Link>
              <CartClearButton />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden sticky top-24 shadow-sm">
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <FaBagShopping aria-hidden="true" />
                  Order Summary
                </h2>
                <p className="text-primary-100 text-sm mt-1">
                  {`${cart.itemCount} ${cart.itemCount === 1 ? "item" : "items"} in your cart`}
                </p>
              </div>

              <div className="p-6 space-y-5">
                {shipping === 0 ? (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <FaTruck className="text-green-600" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-green-700">
                        Free Shipping!
                      </p>
                      <p className="text-sm text-green-600">
                        You qualify for free delivery
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FaTruck className="text-orange-500" aria-hidden="true" />
                      <span className="text-sm font-medium text-gray-700">
                        {`Add ${formatEgp(remaining)} for free shipping`}
                      </span>
                    </div>
                    <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-400 to-amber-400 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">
                      {formatEgp(cart.totalPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium text-green-600">
                      {shipping === 0 ? "FREE" : formatEgp(shipping)}
                    </span>
                  </div>
                  <div className="border-t border-dashed border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-gray-900 font-semibold">Total</span>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-gray-900">
                          {total.toLocaleString("en-US", {
                            maximumFractionDigits: 2,
                          })}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">EGP</span>
                      </div>
                    </div>
                  </div>
                </div>

                <CartPromoButton />

                <Link
                  href="/checkout"
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary-600/20 active:scale-[0.98]"
                >
                  <FaLock aria-hidden="true" />
                  <span>Secure Checkout</span>
                </Link>

                <div className="flex items-center justify-center gap-4 py-2">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <FaShieldHalved
                      className="text-green-500"
                      aria-hidden="true"
                    />
                    <span>Secure Payment</span>
                  </div>
                  <div className="w-px h-4 bg-gray-200" />
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <FaTruck className="text-blue-500" aria-hidden="true" />
                    <span>Fast Delivery</span>
                  </div>
                </div>
                <Link
                  href="/"
                  className="block text-center text-primary-600 hover:text-primary-700 text-sm font-medium py-2"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
