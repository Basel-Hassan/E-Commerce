import {
  FaArrowRotateLeft,
  FaHeadset,
  FaShieldHalved,
  FaTruck,
} from "react-icons/fa6";

import { Container } from "@/components/layout/container";

const highlights = [
  {
    icon: FaTruck,
    iconClass: "bg-blue-50 text-blue-500",
    title: "Free Shipping",
    description: "On orders over 500 EGP",
  },
  {
    icon: FaShieldHalved,
    iconClass: "bg-emerald-50 text-emerald-500",
    title: "Secure Payment",
    description: "100% secure transactions",
  },
  {
    icon: FaArrowRotateLeft,
    iconClass: "bg-orange-50 text-orange-500",
    title: "Easy Returns",
    description: "14-day return policy",
  },
  {
    icon: FaHeadset,
    iconClass: "bg-purple-50 text-purple-500",
    title: "24/7 Support",
    description: "Dedicated support team",
  },
];

export function HomeServiceHighlights() {
  return (
    <section className="py-8 bg-gray-50">
      <Container>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map(({ icon: Icon, iconClass, title, description }) => (
            <div
              key={title}
              className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div
                className={`${iconClass} w-12 h-12 rounded-full flex items-center justify-center shrink-0`}
              >
                <Icon className="text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
                <p className="text-xs text-gray-500">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
