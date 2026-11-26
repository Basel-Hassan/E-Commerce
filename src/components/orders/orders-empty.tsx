import Link from "next/link";

import { FaIcon } from "@/components/shared/fa-icon";

export function OrdersEmpty() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="w-24 h-24 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-6">
          <FaIcon name="box" className="text-4xl text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          No orders yet
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          You haven&apos;t placed any orders yet. Start shopping and your orders
          will show up here.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-3.5 px-8 rounded-xl font-semibold transition-all shadow-lg shadow-primary-600/20 w-full sm:w-auto"
        >
          Start Shopping
          <FaIcon name="arrow-right" className="text-sm" />
        </Link>
      </div>
    </div>
  );
}
