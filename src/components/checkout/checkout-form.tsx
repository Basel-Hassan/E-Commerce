"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  FaBookmark,
  FaCheck,
  FaCircleInfo,
  FaCity,
  FaCreditCard,
  FaHouse,
  FaLocationDot,
  FaMoneyBill,
  FaPhone,
  FaShieldHalved,
  FaWallet,
} from "react-icons/fa6";
import { useForm, useWatch } from "react-hook-form";
import { redirectIfUnauthorized } from "@/lib/client-auth";
import { notify } from "@/lib/notify";

import {
  createCashOrder,
  createCheckoutSession,
} from "@/actions/orders.actions";
import {
  CheckoutFormProvider,
  type PaymentMethod,
} from "@/components/checkout/checkout-form-context";
import { cn } from "@/lib/utils";
import { zodResolver } from "@/lib/zod-resolver";
import { checkoutSchema, type CheckoutInput } from "@/schemas/checkout.schema";

const fieldClass =
  "w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all";
const validFieldClass =
  "border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100";
const invalidFieldClass =
  "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100";

function FieldError({ message }: { message: string }) {
  return (
    <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
      <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
      {message}
    </p>
  );
}

export function CheckoutForm({ summary }: { summary: ReactNode }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      details: "",
      phone: "",
      city: "",
      paymentMethod: "cash",
    },
  });

  const paymentMethod = useWatch({
    control,
    name: "paymentMethod",
    defaultValue: "cash",
  });

  const selectPaymentMethod = (method: PaymentMethod) => {
    setValue("paymentMethod", method, { shouldValidate: true });
  };

  async function onSubmit(values: CheckoutInput) {
    const shippingAddress = {
      details: values.details,
      phone: values.phone,
      city: values.city,
    };

    if (values.paymentMethod === "cash") {
      const result = await createCashOrder(shippingAddress);

      if (!result.success) {
        if (!redirectIfUnauthorized(result)) notify.error(result.error);
        return;
      }

      notify.success("Order placed successfully!");
      router.push(
        `/order-success?orderId=${encodeURIComponent(result.data.orderId)}`,
      );
      router.refresh();
      return;
    }

    const result = await createCheckoutSession(shippingAddress);

    if (!result.success) {
      if (!redirectIfUnauthorized(result)) notify.error(result.error);
      return;
    }

    notify.success("Redirecting to secure payment...");
    window.location.assign(result.data.url);
  }

  const isCash = paymentMethod === "cash";

  return (
    <CheckoutFormProvider value={{ paymentMethod, isSubmitting }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <FaHouse aria-hidden="true" />
                  Shipping Address
                </h2>
                <p className="text-primary-100 text-sm mt-1">
                  Where should we deliver your order?
                </p>
              </div>
              <div className="p-6 space-y-5">
                <div className="pb-5 border-b border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <FaBookmark
                      className="text-primary-500 text-sm"
                      aria-hidden="true"
                    />
                    <span className="font-semibold text-gray-800">
                      Saved Addresses
                    </span>
                  </div>
                  <div className="space-y-3">
                    {[1, 2].map((item) => (
                      <div
                        key={item}
                        className="p-4 rounded-xl border-2 border-gray-100 animate-pulse"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-200" />
                          <div className="flex-1">
                            <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                            <div className="h-3 w-full bg-gray-100 rounded mb-1" />
                            <div className="h-3 w-32 bg-gray-100 rounded" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <FaCircleInfo
                      className="text-blue-600 text-sm"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-blue-800 font-medium">
                      Delivery Information
                    </p>
                    <p className="text-xs text-blue-600 mt-0.5">
                      Please ensure your address is accurate for smooth delivery
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    City <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <FaCity
                        className="text-gray-500 text-sm"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="city"
                      type="text"
                      placeholder="e.g. Cairo, Alexandria, Giza"
                      className={cn(
                        fieldClass,
                        errors.city ? invalidFieldClass : validFieldClass,
                      )}
                      {...register("city")}
                    />
                  </div>
                  {errors.city ? (
                    <FieldError message={errors.city.message ?? ""} />
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor="details"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-4 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <FaLocationDot
                        className="text-gray-500 text-sm"
                        aria-hidden="true"
                      />
                    </div>
                    <textarea
                      id="details"
                      rows={3}
                      placeholder="Street name, building number, floor, apartment..."
                      className={cn(
                        fieldClass,
                        "resize-none",
                        errors.details ? invalidFieldClass : validFieldClass,
                      )}
                      {...register("details")}
                    />
                  </div>
                  {errors.details ? (
                    <FieldError message={errors.details.message ?? ""} />
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <FaPhone
                        className="text-gray-500 text-sm"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="01xxxxxxxxx"
                      className={cn(
                        fieldClass,
                        errors.phone ? invalidFieldClass : validFieldClass,
                      )}
                      {...register("phone")}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                      Egyptian numbers only
                    </span>
                  </div>
                  {errors.phone ? (
                    <FieldError message={errors.phone.message ?? ""} />
                  ) : null}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <FaWallet aria-hidden="true" />
                  Payment Method
                </h2>
                <p className="text-primary-100 text-sm mt-1">
                  Choose how you&apos;d like to pay
                </p>
              </div>
              <div className="p-6 space-y-4">
                <button
                  type="button"
                  onClick={() => selectPaymentMethod("cash")}
                  className={cn(
                    "w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group",
                    isCash
                      ? "border-primary-500 bg-gradient-to-r from-primary-50 to-emerald-50 shadow-sm"
                      : "border-gray-200 hover:border-primary-200 hover:bg-gray-50",
                  )}
                >
                  <div
                    className={cn(
                      "w-14 h-14 rounded-xl flex items-center justify-center transition-all",
                      isCash
                        ? "bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30"
                        : "bg-gray-100 text-gray-400 group-hover:bg-gray-200",
                    )}
                  >
                    <FaMoneyBill className="text-xl" aria-hidden="true" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3
                      className={cn(
                        "font-bold",
                        isCash ? "text-primary-700" : "text-gray-900",
                      )}
                    >
                      Cash on Delivery
                    </h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Pay when your order arrives at your doorstep
                    </p>
                  </div>
                  <div
                    className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center transition-all",
                      isCash
                        ? "bg-primary-600 text-white"
                        : "border-2 border-gray-200",
                    )}
                  >
                    {isCash ? (
                      <FaCheck className="text-xs" aria-hidden="true" />
                    ) : null}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => selectPaymentMethod("online")}
                  className={cn(
                    "w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group",
                    !isCash
                      ? "border-primary-500 bg-gradient-to-r from-primary-50 to-blue-50 shadow-sm"
                      : "border-gray-200 hover:border-primary-200 hover:bg-gray-50",
                  )}
                >
                  <div
                    className={cn(
                      "w-14 h-14 rounded-xl flex items-center justify-center transition-all",
                      !isCash
                        ? "bg-gradient-to-br from-primary-500 to-blue-600 text-white shadow-lg shadow-primary-500/30"
                        : "bg-gray-100 text-gray-400 group-hover:bg-gray-200",
                    )}
                  >
                    <FaCreditCard className="text-xl" aria-hidden="true" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3
                      className={cn(
                        "font-bold",
                        !isCash ? "text-primary-700" : "text-gray-900",
                      )}
                    >
                      Pay Online
                    </h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Secure payment with Credit/Debit Card via Stripe
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <img
                        alt="Visa"
                        className="h-5"
                        src="https://img.icons8.com/color/48/visa.png"
                      />
                      <img
                        alt="Mastercard"
                        className="h-5"
                        src="https://img.icons8.com/color/48/mastercard.png"
                      />
                      <img
                        alt="Amex"
                        className="h-5"
                        src="https://img.icons8.com/color/48/amex.png"
                      />
                    </div>
                  </div>
                  <div
                    className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center transition-all",
                      !isCash
                        ? "bg-primary-600 text-white"
                        : "border-2 border-gray-200",
                    )}
                  >
                    {!isCash ? (
                      <FaCheck className="text-xs" aria-hidden="true" />
                    ) : null}
                  </div>
                </button>

                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 mt-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <FaShieldHalved
                      className="text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      Secure &amp; Encrypted
                    </p>
                    <p className="text-xs text-green-600 mt-0.5">
                      Your payment info is protected with 256-bit SSL encryption
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">{summary}</div>
        </div>
      </form>
    </CheckoutFormProvider>
  );
}
