import type { Metadata } from "next";
import Link from "next/link";
import { FaFilter, FaMagnifyingGlass, FaXmark } from "react-icons/fa6";

import { getBrands, getCategories, getProducts } from "@/actions/shop.actions";
import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/shop/product-card";
import { ProductGrid } from "@/components/shop/product-grid";
import { SearchFilters } from "@/components/shop/search-filters";
import { SearchForm } from "@/components/shop/search-form";
import { SearchToolbar } from "@/components/shop/search-toolbar";

type SearchPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstValue(
  params: Record<string, string | string[] | undefined>,
  key: string,
) {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const query = firstValue(params, "q")?.trim();

  return {
    title: query ? `${query} - Search | FreshCart` : "Search | FreshCart",
    description: query
      ? `Search results for ${query} on FreshCart.`
      : "Search the FreshCart catalog for products, brands and more.",
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;

  const query = firstValue(params, "q")?.trim() ?? "";
  const category = firstValue(params, "category");
  const brand = firstValue(params, "brand");
  const sort = firstValue(params, "sort");
  const view = firstValue(params, "view") === "list" ? "list" : "grid";
  const rawMin = firstValue(params, "minPrice");
  const rawMax = firstValue(params, "maxPrice");
  const minPrice = rawMin && Number.isFinite(Number(rawMin)) ? Number(rawMin) : undefined;
  const maxPrice = rawMax && Number.isFinite(Number(rawMax)) ? Number(rawMax) : undefined;

  const [{ products }, categories, brands] = await Promise.all([
    getProducts({
      limit: 40,
      keyword: query || undefined,
      category,
      brand,
      sort,
      minPrice,
      maxPrice,
    }),
    getCategories(),
    getBrands(),
  ]);

  const selectedCategory = categories.find((item) => item._id === category);
  const selectedBrand = brands.find((item) => item._id === brand);

  const current = new URLSearchParams();
  for (const key of ["q", "category", "brand", "minPrice", "maxPrice", "sort", "view"]) {
    const value = firstValue(params, key);
    if (value) current.set(key, value);
  }

  function removeParam(key: string) {
    const next = new URLSearchParams(current);
    next.delete(key);
    return `/search${next.size ? `?${next.toString()}` : ""}`;
  }

  function removePrice() {
    const next = new URLSearchParams(current);
    next.delete("minPrice");
    next.delete("maxPrice");
    return `/search${next.size ? `?${next.toString()}` : ""}`;
  }

  const hasActiveFilters =
    Boolean(query || category || brand || rawMin || rawMax);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="bg-white border-b border-gray-100">
        <Container className="py-6">
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex items-center gap-2 text-sm text-gray-500"
          >
            <Link href="/" className="hover:text-primary-600">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span>Search Results</span>
          </nav>
          <SearchForm initialQuery={query} />
          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            {query ? `Search Results for "${query}"` : "Search Results"}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            We found {products.length} products for you
          </p>
        </Container>
      </div>

      <Container className="py-8">
        <div className="flex gap-8">
          <SearchFilters
            categories={categories}
            brands={brands}
            selectedCategory={category}
            selectedBrand={brand}
            minPrice={rawMin}
            maxPrice={rawMax}
          />

          <main className="flex-1 min-w-0">
            <SearchToolbar sort={sort} view={view} />

            {hasActiveFilters && (
              <div className="mb-6 flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <FaFilter className="text-xs" />
                  Active:
                </span>
                {query && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                    &quot;{query}&quot;
                    <Link
                      href={removeParam("q")}
                      aria-label="Remove search query"
                      className="hover:text-red-500"
                    >
                      <FaXmark />
                    </Link>
                  </span>
                )}
                {category && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                    {selectedCategory?.name ?? "Category"}
                    <Link
                      href={removeParam("category")}
                      aria-label="Remove category filter"
                      className="hover:text-red-500"
                    >
                      <FaXmark />
                    </Link>
                  </span>
                )}
                {brand && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                    {selectedBrand?.name ?? "Brand"}
                    <Link
                      href={removeParam("brand")}
                      aria-label="Remove brand filter"
                      className="hover:text-red-500"
                    >
                      <FaXmark />
                    </Link>
                  </span>
                )}
                {(rawMin || rawMax) && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                    {rawMin ? `Min ${rawMin} EGP` : ""}
                    {rawMin && rawMax ? " - " : ""}
                    {rawMax ? `Max ${rawMax} EGP` : ""}
                    <Link
                      href={removePrice()}
                      aria-label="Remove price filter"
                      className="hover:text-red-500"
                    >
                      <FaXmark />
                    </Link>
                  </span>
                )}
                <Link
                  href="/search"
                  className="text-xs text-gray-500 hover:text-gray-700 underline ml-2"
                >
                  Clear all
                </Link>
              </div>
            )}

            {products.length > 0 ? (
              view === "list" ? (
                <div className="space-y-4">
                  {products.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      layout="list"
                    />
                  ))}
                </div>
              ) : (
                <ProductGrid products={products} />
              )
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
                  <FaMagnifyingGlass className="text-3xl text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  No Products Found
                </h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search or filters to find what you&apos;re
                  looking for.
                </p>
                <Link
                  href="/search"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
                >
                  Clear Filters
                </Link>
              </div>
            )}
          </main>
        </div>
      </Container>
    </div>
  );
}
