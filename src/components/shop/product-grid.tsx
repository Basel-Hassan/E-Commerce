import type { Product } from "@/types/shop";

import { ProductCard } from "./product-card";

export function ProductGrid({
  products,
  className = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6",
}: {
  products: Product[];
  className?: string;
}) {
  return (
    <div className={className}>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
