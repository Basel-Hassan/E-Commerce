import type { Metadata } from "next";

import { FeaturedProducts } from "@/components/home/featured-products";
import { HomeCategories } from "@/components/home/home-categories";
import { HomeHero } from "@/components/home/home-hero";
import { HomeServiceHighlights } from "@/components/home/home-service-highlights";
import { Newsletter } from "@/components/home/newsletter";
import { PromoBanners } from "@/components/home/promo-banners";
import { getCategories, getProducts } from "@/actions/shop.actions";

export const metadata: Metadata = {
  title: "FreshCart | Fresh Products Delivered to Your Door",
  description:
    "Shop quality products across fashion, electronics, beauty and more. Fast delivery, secure payment and the best brands at competitive prices.",
};

export default async function HomePage() {
  const [{ products }, categories] = await Promise.all([
    getProducts({ limit: 40 }),
    getCategories(),
  ]);

  return (
    <>
      <HomeHero />
      <HomeServiceHighlights />
      <HomeCategories categories={categories} />
      <PromoBanners />
      <FeaturedProducts products={products} />
      <Newsletter />
    </>
  );
}
