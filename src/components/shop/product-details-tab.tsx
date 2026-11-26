import { FaCheck } from "react-icons/fa6";

import type { ProductDetail } from "@/types/shop";

export function ProductDetailsTab({ product }: { product: ProductDetail }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          About this Product
        </h3>
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">
            Product Information
          </h4>
          <ul className="space-y-2">
            <li className="flex justify-between text-sm">
              <span className="text-gray-500">Category</span>
              <span className="text-gray-900 font-medium">
                {product.category.name}
              </span>
            </li>
            {product.subcategory.length > 0 && (
              <li className="flex justify-between text-sm">
                <span className="text-gray-500">Subcategory</span>
                <span className="text-gray-900 font-medium">
                  {product.subcategory.map((item) => item.name).join(", ")}
                </span>
              </li>
            )}
            <li className="flex justify-between text-sm">
              <span className="text-gray-500">Brand</span>
              <span className="text-gray-900 font-medium">
                {product.brand.name}
              </span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-gray-500">Items Sold</span>
              <span className="text-gray-900 font-medium">
                {product.sold}+ sold
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Key Features</h4>
          <ul className="space-y-2">
            {[
              "Premium Quality Product",
              "100% Authentic Guarantee",
              "Fast & Secure Packaging",
              "Quality Tested",
            ].map((feature) => (
              <li
                key={feature}
                className="flex items-center text-sm text-gray-600"
              >
                <FaCheck className="text-primary-600 mr-2 w-4" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
