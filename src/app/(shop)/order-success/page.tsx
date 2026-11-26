import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  FaArrowRight,
  FaBoxOpen,
  FaCircleCheck,
  FaReceipt,
} from "react-icons/fa6";

import { getOrderById } from "@/actions/orders.actions";
import { Container } from "@/components/layout/container";
import { isUnauthorizedError } from "@/lib/api";
import { authAttempt, invalidSessionPath } from "@/lib/auth-guard";
import { formatEgp } from "@/lib/price";
import type { Order } from "@/types/order";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Your FreshCart order has been confirmed.",
};

type OrderSuccessPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstValue(
  params: Record<string, string | string[] | undefined>,
  key: string,
) {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
}

function paymentLabel(method: string) {
  return method === "cash" ? "Cash on Delivery" : "Online Payment";
}

function orderItemCount(order: Order) {
  return order.cartItems.reduce((total, item) => total + item.count, 0);
}

export default async function OrderSuccessPage({
  searchParams,
}: OrderSuccessPageProps) {
  const params = await searchParams;
  const orderId = firstValue(params, "orderId");
  const sessionId = firstValue(params, "session_id");

  let order: Order | null = null;

  if (orderId) {
    const id = orderId;
    const attempt = await authAttempt(() => getOrderById(id));

    if (attempt.ok) {
      order = attempt.value;
    } else if (isUnauthorizedError(attempt.error)) {
      redirect(invalidSessionPath("/order-success"));
    }
  }

  const isOnline = Boolean(sessionId);
  const heading = order
    ? order.paymentMethodType === "cash"
      ? "Order Confirmed!"
      : "Payment Successful!"
    : isOnline
      ? "Payment Successful!"
      : "Thank You!";

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Container className="py-12">
        <div className="mx-auto max-w-2xl">
          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
            <div className="bg-gradient-to-br from-primary-50 via-white to-primary-50/60 px-6 py-10 text-center sm:px-12">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-100 text-primary-600 shadow-inner">
                <FaCircleCheck className="text-5xl" aria-hidden="true" />
              </div>
              <h1 className="mt-6 text-3xl font-bold text-gray-900 sm:text-4xl">
                {heading}
              </h1>
              <p className="mx-auto mt-3 max-w-md text-gray-500">
                Thank you for shopping with FreshCart. We have received your
                order and will start preparing it right away.
              </p>
            </div>

            <div className="p-6 sm:p-8">
              {order ? (
                <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <FaReceipt
                      className="text-primary-600"
                      aria-hidden="true"
                    />
                    Order Summary
                  </div>

                  <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-gray-500">Order Number</dt>
                      <dd className="mt-0.5 font-semibold text-gray-900">
                        #{order._id.slice(-8).toUpperCase()}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Payment Method</dt>
                      <dd className="mt-0.5 font-semibold text-gray-900">
                        {paymentLabel(order.paymentMethodType)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Items</dt>
                      <dd className="mt-0.5 font-semibold text-gray-900">
                        {orderItemCount(order)}{" "}
                        {orderItemCount(order) === 1 ? "item" : "items"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Total</dt>
                      <dd className="mt-0.5 text-lg font-bold text-primary-600">
                        {formatEgp(order.totalOrderPrice)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Deliver To</dt>
                      <dd className="mt-0.5 font-semibold text-gray-900">
                        {order.shippingAddress.city}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Placed On</dt>
                      <dd className="mt-0.5 font-semibold text-gray-900">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </dd>
                    </div>
                  </dl>
                </div>
              ) : (
                <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-5 text-center text-sm text-gray-600">
                  <FaBoxOpen
                    className="mx-auto mb-2 text-2xl text-primary-600"
                    aria-hidden="true"
                  />
                  Your order is being prepared. You can view its status any time
                  from your order history.
                </div>
              )}

              <p className="mt-5 text-center text-sm text-gray-500">
                A confirmation will be available in your account. Need help? Our
                support team is here 24/7.
              </p>

              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/orders"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-3 font-semibold text-white shadow-lg shadow-primary-600/20 transition-all hover:from-primary-700 hover:to-primary-800"
                >
                  <FaBoxOpen aria-hidden="true" />
                  View My Orders
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700"
                >
                  Continue Shopping
                  <FaArrowRight aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
