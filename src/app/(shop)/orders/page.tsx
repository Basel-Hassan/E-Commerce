import type { Metadata } from "next";
import Link from "next/link";

import { getUserOrders } from "@/actions/orders.actions";
import { OrdersEmpty } from "@/components/orders/orders-empty";
import { OrdersList } from "@/components/orders/orders-list";
import { FaIcon } from "@/components/shared/fa-icon";
import { withAuth } from "@/lib/auth-guard";

export const metadata: Metadata = {
  title: { absolute: "FreshCart" },
  description: "Track and manage your FreshCart orders.",
};

export default async function OrdersPage() {
  const orders = await withAuth(() => getUserOrders(), "/orders");

  if (orders.length === 0) {
    return <OrdersEmpty />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-primary-600 transition">
            Home
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium">My Orders</span>
        </nav>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/25">
              <FaIcon name="box" className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                My Orders
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">
                {`Track and manage your ${orders.length} orders`}
              </p>
            </div>
          </div>
          <Link
            href="/"
            className="self-start sm:self-auto text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-primary-50 transition-all text-sm"
          >
            <FaIcon name="bag-shopping" className="text-xs" />Continue Shopping
          </Link>
        </div>
      </div>
      <OrdersList orders={orders} />
    </div>
  );
}
