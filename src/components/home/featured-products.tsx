import { Container } from "@/components/layout/container";
import type { Product } from "@/types/shop";

import { ProductGrid } from "../shop/product-grid";

export function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="py-10">
      <Container>
        <div className="flex items-center gap-3 my-8">
          <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full" />
          <h2 className="text-3xl font-bold text-gray-800">
            Featured <span className="text-emerald-600">Products</span>
          </h2>
        </div>
        <ProductGrid
          products={products}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        />
      </Container>
    </section>
  );
}
