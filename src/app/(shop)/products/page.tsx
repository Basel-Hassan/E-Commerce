import type { Metadata } from "next";
import Link from "next/link";
import { FaBoxOpen } from "react-icons/fa6";

import { getProducts } from "@/actions/shop.actions";
import { Container } from "@/components/layout/container";
import { ProductGrid } from "@/components/shop/product-grid";
import { ProductPagination } from "@/components/shop/product-pagination";

export const metadata: Metadata = {
  title: "All Products | FreshCart",
  description:
    "Explore the complete FreshCart product collection across fashion, electronics, beauty, home and more.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const first = (key: string) => {
    const value = params[key];
    return Array.isArray(value) ? value[0] : value;
  };

  const requestedPage = Number.parseInt(first("page") ?? "1", 10);
  const page =
    Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const limit = 40;
  const { products, total, pagination } = await getProducts({
    page,
    limit,
    keyword: first("keyword") ?? first("q"),
    category: first("category"),
    brand: first("brand"),
    subcategory: first("subcategory"),
    sort: first("sort"),
  });

  const currentPage = pagination.currentPage ?? page;
  const pageSize = pagination.limit ?? limit;
  const totalPages =
    pagination.numberOfPages ?? Math.max(1, Math.ceil(total / pageSize));
  const firstItem = products.length > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const lastItem = (currentPage - 1) * pageSize + products.length;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 text-white">
        <Container className="py-10 sm:py-14">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">All Products</span>
          </nav>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
              <FaBoxOpen className="text-3xl" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                All Products
              </h1>
              <p className="text-white/80 mt-1">
                Explore our complete product collection
              </p>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-8">
        <div className="mb-6 text-sm text-gray-500">
          Showing {firstItem}-{lastItem} of {total} products
        </div>
        {products.length > 0 ? (
          <>
            <ProductGrid products={products} />
            <ProductPagination
              currentPage={currentPage}
              totalPages={totalPages}
              searchParams={params}
            />
          </>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <FaBoxOpen className="text-2xl text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No Products Found
            </h2>
            <p className="text-gray-500 mb-5">
              Try adjusting your filters or search terms.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
            >
              Clear Filters
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
}
