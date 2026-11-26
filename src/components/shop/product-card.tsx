import Image from "next/image";
import Link from "next/link";
import {
  FaEye,
  FaRegStar,
  FaStar,
  FaStarHalfStroke,
} from "react-icons/fa6";

import { DiscountBadge, Price } from "@/components/shared/price";
import {
  ProductCardAddButton,
  ProductCardCompareButton,
  ProductCardWishlistButton,
} from "@/components/shop/product-card-actions";
import type { Product } from "@/types/shop";

function Rating({ value }: { value: number }) {
  const rounded = Math.round(value * 2) / 2;

  return (
    <div className="flex shrink-0 text-amber-400 mr-2">
      <div className="text-yellow-400 whitespace-nowrap">
        {Array.from({ length: 5 }).map((_, index) => {
          const position = index + 1;
          if (rounded >= position)
            return <FaStar key={index} className="inline-block w-5 h-4" />;
          if (rounded >= position - 0.5)
            return <FaStarHalfStroke key={index} className="inline-block w-5 h-4" />;
          return <FaRegStar key={index} className="inline-block w-5 h-4" />;
        })}
      </div>
    </div>
  );
}

export function ProductCard({
  product,
  layout = "grid",
}: {
  product: Product;
  layout?: "grid" | "list";
}) {
  const isList = layout === "list";
  const ratingLabel = Number.isInteger(product.ratingsAverage)
    ? String(product.ratingsAverage)
    : product.ratingsAverage.toFixed(1);

  return (
    <div
      id="product-card"
      className={`bg-white border border-gray-200 rounded-lg overflow-hidden ${
        isList ? "flex flex-col sm:flex-row" : ""
      }`}
    >
      <div className={isList ? "relative sm:w-56 shrink-0" : "relative"}>
        <Link href={`/products/${product._id}`} className="block h-full">
          <Image
            src={product.imageCover}
            alt={product.title}
            width={600}
            height={600}
            className={
              isList
                ? "w-full h-60 sm:h-full object-contain bg-white"
                : "w-full h-60 object-contain bg-white"
            }
          />
        </Link>
        <DiscountBadge
          price={product.price}
          priceAfterDiscount={product.priceAfterDiscount}
          className="absolute top-3 left-3"
        />
        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          <ProductCardWishlistButton productId={product._id} />
          <ProductCardCompareButton />
          <Link
            href={`/products/${product._id}`}
            title="View product"
            className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600 shadow-sm"
          >
            <FaEye />
          </Link>
        </div>
      </div>

      <div className={isList ? "p-5 flex-1 min-w-0" : "p-4"}>
        <div className="text-xs text-gray-500 mb-1">{product.category.name}</div>
        <h3 className="font-medium mb-1 cursor-pointer " title={product.title}>
          <Link
            href={`/products/${product._id}`}
            className="line-clamp-2 hover:text-primary-600 transition-colors"
          >
            {product.title}
          </Link>
        </h3>
        <div className="flex items-center mb-2">
          <Rating value={product.ratingsAverage} />
          <span className="text-xs text-gray-500">
            {ratingLabel} ({product.ratingsQuantity})
          </span>
        </div>
        <div className="flex items-center justify-between">
          <Price
            price={product.price}
            priceAfterDiscount={product.priceAfterDiscount}
          />
          <ProductCardAddButton
            productId={product._id}
            title={product.title}
          />
        </div>
      </div>
    </div>
  );
}
