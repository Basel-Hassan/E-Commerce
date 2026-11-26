"use client";

import { FaTag } from "react-icons/fa6";

export function CartPromoButton() {
  return (
    <button
      className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50/50 transition-all"
    >
      <FaTag />
      <span className="text-sm font-medium">Apply Promo Code</span>
    </button>
  );
}
