import type { Metadata } from "next";
import Link from "next/link";
import {
  FaArrowLeft,
  FaCartShopping,
  FaCircleXmark,
  FaShieldHalved,
} from "react-icons/fa6";

import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Payment Cancelled",
  description: "Your FreshCart online payment was cancelled.",
};

export default function OrderCancelPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <Container className="py-12">
        <div className="mx-auto max-w-2xl">
          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
            <div className="bg-gradient-to-br from-orange-50 via-white to-amber-50/60 px-6 py-10 text-center sm:px-12">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-orange-500 shadow-inner">
                <FaCircleXmark className="text-5xl" aria-hidden="true" />
              </div>
              <h1 className="mt-6 text-3xl font-bold text-gray-900 sm:text-4xl">
                Payment Cancelled
              </h1>
              <p className="mx-auto mt-3 max-w-md text-gray-500">
                Your online payment was cancelled and you have not been charged.
                Your cart is still saved, so you can pick up right where you
                left off.
              </p>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50/70 p-5 text-sm text-gray-600">
                <FaShieldHalved
                  className="mt-0.5 shrink-0 text-green-500"
                  aria-hidden="true"
                />
                <p>
                  No payment was taken. If you were trying to pay online, you
                  can return to checkout and try again with a different payment
                  method.
                </p>
              </div>

              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/checkout"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-3 font-semibold text-white shadow-lg shadow-primary-600/20 transition-all hover:from-primary-700 hover:to-primary-800"
                >
                  <FaArrowLeft aria-hidden="true" />
                  Try Checkout Again
                </Link>
                <Link
                  href="/cart"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700"
                >
                  <FaCartShopping aria-hidden="true" />
                  Return to Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
