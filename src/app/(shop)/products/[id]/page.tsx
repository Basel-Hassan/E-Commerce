import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaArrowRotateLeft,
  FaChevronRight,
  FaShieldHalved,
  FaTruckFast,
} from "react-icons/fa6";

import { getProduct, getRelatedProducts } from "@/actions/shop.actions";
import { Container } from "@/components/layout/container";
import { DiscountBadge, Price } from "@/components/shared/price";
import { ProductDetailsTab } from "@/components/shop/product-details-tab";
import { ProductGallery } from "@/components/shop/product-gallery";
import { ProductPurchase } from "@/components/shop/product-purchase";
import { ProductReviewsTab } from "@/components/shop/product-reviews-tab";
import { ProductShippingTab } from "@/components/shop/product-shipping-tab";
import { ProductTabs } from "@/components/shop/product-tabs";
import { RatingStars } from "@/components/shop/rating-stars";
import { RelatedProducts } from "@/components/shop/related-products";
import type { ProductDetail } from "@/types/shop";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const product = await getProduct(id);
    return {
      title: `${product.title} | FreshCart`,
      description: product.description.split("\n").join(" ").slice(0, 160),
    };
  } catch {
    return { title: "Product | FreshCart" };
  }
}

const perks = [
  {
    icon: FaTruckFast,
    title: "Free Delivery",
    description: "Orders over $50",
  },
  {
    icon: FaArrowRotateLeft,
    title: "30 Days Return",
    description: "Money back",
  },
  {
    icon: FaShieldHalved,
    title: "Secure Payment",
    description: "100% Protected",
  },
];

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;

  let product: ProductDetail;
  try {
    product = await getProduct(id);
  } catch {
    notFound();
  }

  const related = await getRelatedProducts(product.category._id, product._id);
  const ratingLabel = Number.isInteger(product.ratingsAverage)
    ? String(product.ratingsAverage)
    : product.ratingsAverage.toFixed(1);

  return (
    <>
      <nav aria-label="Breadcrumb" className="py-4">
        <Container>
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-primary-600">
              Home
            </Link>
            <FaChevronRight
              className="mx-2 text-xs text-gray-400"
              aria-hidden="true"
            />
            <Link
              href={`/categories/${product.category._id}`}
              className="hover:text-primary-600"
            >
              {product.category.name}
            </Link>
            <FaChevronRight
              className="mx-2 text-xs text-gray-400"
              aria-hidden="true"
            />
            <Link
              href={
                product.subcategory[0]
                  ? `/products?subcategory=${product.subcategory[0]._id}`
                  : "/products"
              }
              className="hover:text-primary-600"
            >
              {product.subcategory[0]?.name}
            </Link>
            <FaChevronRight
              className="mx-2 text-xs text-gray-400"
              aria-hidden="true"
            />
            <span className="max-w-xs truncate font-medium text-gray-900">
              {product.title}
            </span>
          </div>
        </Container>
      </nav>

      <section id="product-detail" className="py-6">
        <Container>
          <div className="flex flex-col lg:flex-row gap-8">
            <div id="product-images" className="min-w-0 lg:w-1/4">
              <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4">
                <ProductGallery
                  images={product.images}
                  title={product.title}
                />
              </div>
            </div>

            <div id="product-info" className="min-w-0 lg:w-3/4">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Link
                    href={`/categories/${product.category._id}`}
                    className="bg-primary-50 text-primary-700 text-xs px-3 py-1.5 rounded-full hover:bg-primary-100 transition"
                  >
                    {product.category.name}
                  </Link>
                  <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">
                    {product.brand.name}
                  </span>
                </div>

                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                  {product.title}
                </h1>

                <div className="flex items-center gap-3 mb-4">
                  <RatingStars value={product.ratingsAverage} />
                  <span className="text-sm text-gray-600">
                    {ratingLabel} ({product.ratingsQuantity} reviews)
                  </span>
                </div>

                <div className="flex items-center flex-wrap gap-3 mb-6">
                  <Price
                    price={product.price}
                    priceAfterDiscount={product.priceAfterDiscount}
                    size="detail"
                  />
                  <DiscountBadge
                    price={product.price}
                    priceAfterDiscount={product.priceAfterDiscount}
                  />
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-green-50 text-green-700">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                <div className="border-t border-gray-100 pt-5 mb-6">
                  <p className="w-full text-gray-600 leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>

                <ProductPurchase product={product} />

                <div className="border-t border-gray-100 pt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {perks.map((perk) => {
                      const Icon = perk.icon;

                      return (
                        <div key={perk.title} className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center shrink-0">
                            <Icon />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 text-sm">
                              {perk.title}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {perk.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="product-details-tabs" className="py-8">
        <Container>
          <ProductTabs
            ratingsQuantity={product.ratingsQuantity}
            details={<ProductDetailsTab product={product} />}
            reviews={
              <ProductReviewsTab
                rating={product.ratingsAverage}
                ratingsQuantity={product.ratingsQuantity}
              />
            }
            shipping={<ProductShippingTab />}
          />
        </Container>
      </section>

      <RelatedProducts products={related} />
    </>
  );
}
