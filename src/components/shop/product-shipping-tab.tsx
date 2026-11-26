import {
  FaCheck,
  FaRotateLeft,
  FaShieldHalved,
  FaTruck,
} from "react-icons/fa6";

const shippingItems = [
  "Free shipping on orders over $50",
  "Standard delivery: 3-5 business days",
  "Express delivery available (1-2 business days)",
  "Track your order in real-time",
];

const returnItems = [
  "30-day hassle-free returns",
  "Full refund or exchange available",
  "Free return shipping on defective items",
  "Easy online return process",
];

export function ProductShippingTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-linear-to-br from-primary-50 to-primary-100 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 bg-primary-600 text-white rounded-full flex items-center justify-center">
              <FaTruck className="text-xl" />
            </div>
            <h4 className="font-semibold text-gray-900">
              Shipping Information
            </h4>
          </div>
          <ul className="space-y-3">
            {shippingItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <FaCheck className="text-primary-600 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-linear-to-br from-green-50 to-green-100 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 bg-green-600 text-white rounded-full flex items-center justify-center">
              <FaRotateLeft className="text-xl" />
            </div>
            <h4 className="font-semibold text-gray-900">Returns & Refunds</h4>
          </div>
          <ul className="space-y-3">
            {returnItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <FaCheck className="text-green-600 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 flex items-center gap-4">
        <div className="h-14 w-14 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center shrink-0">
          <FaShieldHalved className="text-2xl" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-1">
            Buyer Protection Guarantee
          </h4>
          <p className="text-sm text-gray-600">
            Get a full refund if your order doesn&apos;t arrive or isn&apos;t as
            described. We ensure your shopping experience is safe and secure.
          </p>
        </div>
      </div>
    </div>
  );
}
