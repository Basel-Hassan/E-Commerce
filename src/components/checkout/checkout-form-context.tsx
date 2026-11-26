"use client";

import { createContext, useContext } from "react";

export type PaymentMethod = "cash" | "online";

type CheckoutFormState = {
  paymentMethod: PaymentMethod;
  isSubmitting: boolean;
};

const CheckoutFormContext = createContext<CheckoutFormState>({
  paymentMethod: "cash",
  isSubmitting: false,
});

export const CheckoutFormProvider = CheckoutFormContext.Provider;

export function useCheckoutFormState() {
  return useContext(CheckoutFormContext);
}
