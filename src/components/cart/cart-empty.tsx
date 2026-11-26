import Link from "next/link";
import { FaArrowRight, FaBoxOpen } from "react-icons/fa6";

export function CartEmpty() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="relative mb-8">
          <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
            <FaBoxOpen className="text-5xl text-gray-300" aria-hidden="true" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Looks like you haven&apos;t added anything to your cart yet.
          <br />
          Start exploring our products!
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary-600 text-white py-3.5 px-8 rounded-xl font-semibold hover:bg-primary-700 transition-all shadow-lg active:scale-[0.98]"
        >
          Start Shopping
          <FaArrowRight className="text-sm" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
