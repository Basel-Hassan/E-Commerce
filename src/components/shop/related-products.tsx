import { ProductCard } from "@/components/shop/product-card";
import { RelatedProductsCarousel } from "@/components/shop/related-products-carousel";
import type { Product } from "@/types/shop";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (!products.length) return null;

  return (
    <RelatedProductsCarousel>
      {products.map((product) => (
        <div
          key={product._id}
          className="w-[280px] sm:w-[320px] lg:w-[358px] shrink-0 snap-start"
        >
          <ProductCard product={product} />
        </div>
      ))}
    </RelatedProductsCarousel>
  );
}
