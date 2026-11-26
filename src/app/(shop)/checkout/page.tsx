import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaArrowLeft, FaReceipt } from "react-icons/fa6";

import { getCart } from "@/actions/cart.actions";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { CheckoutSubmitButton } from "@/components/checkout/checkout-submit-button";
import { CheckoutSummary } from "@/components/checkout/checkout-summary";
import { Container } from "@/components/layout/container";
import { withAuth } from "@/lib/auth-guard";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Complete your shipping address and choose a payment method to place your FreshCart order.",
};

export default async function CheckoutPage() {
  const cart = await withAuth(() => getCart(), "/checkout");

  if (cart.items.length === 0) {
    redirect("/cart");
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-8">
      <Container>
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-primary-600 transition">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/cart" className="hover:text-primary-600 transition">
              Cart
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">Checkout</span>
          </nav>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="bg-gradient-to-br from-primary-600 to-primary-700 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-primary-600/20">
                  <FaReceipt aria-hidden="true" />
                </span>
                Complete Your Order
              </h1>
              <p className="text-gray-500 mt-2">
                Review your items and complete your purchase
              </p>
            </div>
            <Link
              href="/cart"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary-50 transition-all"
            >
              <FaArrowLeft aria-hidden="true" />
              Back to Cart
            </Link>
          </div>
        </div>
        <CheckoutForm
          summary={
            <CheckoutSummary cart={cart}>
              <CheckoutSubmitButton />
            </CheckoutSummary>
          }
        />
      </Container>
    </div>
  );
}
