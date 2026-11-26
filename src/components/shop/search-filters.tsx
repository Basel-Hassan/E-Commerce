"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";

import type { Brand, Category } from "@/types/shop";

type SearchFiltersProps = {
  categories: Category[];
  brands: Brand[];
  selectedCategory?: string;
  selectedBrand?: string;
  minPrice?: string;
  maxPrice?: string;
};

export function SearchFilters({
  categories,
  brands,
  selectedCategory,
  selectedBrand,
  minPrice,
  maxPrice,
}: SearchFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [min, setMin] = useState(minPrice ?? "");
  const [max, setMax] = useState(maxPrice ?? "");

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener("open-search-filters", handleOpen);
    return () => window.removeEventListener("open-search-filters", handleOpen);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function navigate(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(updates)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }

    router.push(`/search${params.size ? `?${params.toString()}` : ""}`);
  }

  function applyPrice(nextMin = min, nextMax = max) {
    navigate({
      minPrice: nextMin.trim() || null,
      maxPrice: nextMax.trim() || null,
    });
  }

  function setQuickMax(value: string) {
    setMax(value);
    applyPrice(min, value);
  }

  function clearFilters() {
    setMin("");
    setMax("");
    navigate({ category: null, brand: null, minPrice: null, maxPrice: null });
  }

  function toggleCategory(id: string, checked: boolean) {
    navigate({ category: checked ? id : null });
  }

  function toggleBrand(id: string, checked: boolean) {
    navigate({ brand: checked ? id : null });
  }

  function renderFilters() {
    return (
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Categories</h3>
          </div>
          <div className="space-y-2 max-h-52 overflow-y-auto">
            {categories.map((category) => (
              <label
                key={category._id}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedCategory === category._id}
                  onChange={(event) =>
                    toggleCategory(category._id, event.target.checked)
                  }
                  className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                  {category.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        <hr className="border-gray-100" />

        <div>
          <h3 className="font-bold text-gray-900 mb-4">Price Range</h3>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Min (EGP)
              </label>
              <input
                type="number"
                min={0}
                placeholder="0"
                value={min}
                onChange={(event) => setMin(event.target.value)}
                onBlur={() => applyPrice()}
                onKeyDown={(event) => {
                  if (event.key === "Enter") applyPrice();
                }}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Max (EGP)
              </label>
              <input
                type="number"
                min={0}
                placeholder="No limit"
                value={max}
                onChange={(event) => setMax(event.target.value)}
                onBlur={() => applyPrice()}
                onKeyDown={(event) => {
                  if (event.key === "Enter") applyPrice();
                }}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {["500", "1000", "5000", "10000"].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setQuickMax(value)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                Under {value === "1000" ? "1K" : value === "5000" ? "5K" : value === "10000" ? "10K" : value}
              </button>
            ))}
          </div>
        </div>

        <hr className="border-gray-100" />

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Brands</h3>
          </div>
          <div className="space-y-2 max-h-52 overflow-y-auto">
            {brands.map((brand) => (
              <label
                key={brand._id}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedBrand === brand._id}
                  onChange={(event) =>
                    toggleBrand(brand._id, event.target.checked)
                  }
                  className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                  {brand.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        <hr className="border-gray-100" />

        <button
          type="button"
          onClick={clearFilters}
          className="w-full py-2.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    );
  }

  return (
    <>
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
          {renderFilters()}
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-white p-6 overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Filters</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close filters"
                className="h-9 w-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition"
              >
                <FaXmark />
              </button>
            </div>
            {renderFilters()}
          </div>
        </div>
      )}
    </>
  );
}
