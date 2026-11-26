"use client";

import { useState, type ReactNode } from "react";
import { FaBox, FaStar, FaTruck } from "react-icons/fa6";

type Tab = "details" | "reviews" | "shipping";

export function ProductTabs({
  ratingsQuantity,
  details,
  reviews,
  shipping,
}: {
  ratingsQuantity: number;
  details: ReactNode;
  reviews: ReactNode;
  shipping: ReactNode;
}) {
  const [active, setActive] = useState<Tab>("details");

  const tabs: { id: Tab; label: string; icon: typeof FaBox }[] = [
    { id: "details", label: "Product Details", icon: FaBox },
    { id: "reviews", label: `Reviews (${ratingsQuantity})`, icon: FaStar },
    { id: "shipping", label: "Shipping & Returns", icon: FaTruck },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = active === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "text-primary-600 border-b-2 border-primary-600 bg-primary-50/50"
                    : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                }`}
              >
                <Icon className="text-sm" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-6">
        {active === "details" && details}
        {active === "reviews" && reviews}
        {active === "shipping" && shipping}
      </div>
    </div>
  );
}
