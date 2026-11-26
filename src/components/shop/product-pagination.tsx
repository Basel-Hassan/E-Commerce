import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import { cn } from "@/lib/utils";

type ProductPaginationProps = {
  currentPage: number;
  totalPages: number;
  searchParams: Record<string, string | string[] | undefined>;
};

function buildHref(
  page: number,
  searchParams: ProductPaginationProps["searchParams"],
) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    if (key === "page" || value === undefined) continue;

    if (Array.isArray(value)) {
      for (const item of value) params.append(key, item);
    } else {
      params.set(key, value);
    }
  }

  if (page > 1) params.set("page", String(page));

  const query = params.toString();
  return query ? `/products?${query}` : "/products";
}

export function ProductPagination({
  currentPage,
  totalPages,
  searchParams,
}: ProductPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const baseClass =
    "inline-flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-medium transition-colors";

  return (
    <nav
      aria-label="Product pagination"
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      {currentPage > 1 ? (
        <Link
          href={buildHref(currentPage - 1, searchParams)}
          aria-label="Go to previous page"
          className={cn(
            baseClass,
            "border-gray-200 bg-white text-gray-700 hover:border-primary-600 hover:text-primary-600",
          )}
        >
          <FaChevronLeft className="text-xs" />
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className={cn(
            baseClass,
            "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400",
          )}
        >
          <FaChevronLeft className="text-xs" />
        </span>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={buildHref(page, searchParams)}
          aria-current={page === currentPage ? "page" : undefined}
          className={cn(
            baseClass,
            page === currentPage
              ? "border-primary-600 bg-primary-600 text-white"
              : "border-gray-200 bg-white text-gray-700 hover:border-primary-600 hover:text-primary-600",
          )}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages ? (
        <Link
          href={buildHref(currentPage + 1, searchParams)}
          aria-label="Go to next page"
          className={cn(
            baseClass,
            "border-gray-200 bg-white text-gray-700 hover:border-primary-600 hover:text-primary-600",
          )}
        >
          <FaChevronRight className="text-xs" />
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className={cn(
            baseClass,
            "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400",
          )}
        >
          <FaChevronRight className="text-xs" />
        </span>
      )}
    </nav>
  );
}
