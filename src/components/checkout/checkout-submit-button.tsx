"use client";

import { FaBox, FaShieldHalved } from "react-icons/fa6";

import { useCheckoutFormState } from "@/components/checkout/checkout-form-context";

export function CheckoutSubmitButton() {
  const { paymentMethod, isSubmitting } = useCheckoutFormState();
  const isOnline = paymentMethod === "online";

  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full mt-6 bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 rounded-xl font-bold hover:from-primary-700 hover:to-primary-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary-600/20 active:scale-[0.98]"
    >
      {isOnline ? (
        <FaShieldHalved aria-hidden="true" />
      ) : (
        <FaBox aria-hidden="true" />
      )}
      {isOnline ? "Proceed to Payment" : "Place Order"}
    </button>
  );
}
