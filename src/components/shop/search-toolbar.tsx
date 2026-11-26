"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FaGripVertical, FaList, FaSliders } from "react-icons/fa6";

type SearchToolbarProps = {
  sort?: string;
  view: "grid" | "list";
};

const sortOptions = [
  { value: "", label: "Relevance" },
  { value: "price", label: "Price: Low to High" },
  { value: "-price", label: "Price: High to Low" },
  { value: "-ratingsAverage", label: "Rating: High to Low" },
  { value: "title", label: "Name: A to Z" },
  { value: "-title", label: "Name: Z to A" },
];

export function SearchToolbar({ sort, view }: SearchToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function update(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set(key, value);
    else params.delete(key);

    router.push(`/search${params.size ? `?${params.toString()}` : ""}`);
  }

  return (
    <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event("open-search-filters"))}
          className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          <FaSliders />
          Filters
        </button>
        <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-1">
          <button
            type="button"
            aria-label="Grid view"
            onClick={() => update("view", null)}
            className={`p-2 rounded-md transition-colors ${
              view === "grid"
                ? "bg-primary-600 text-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <FaGripVertical />
          </button>
          <button
            type="button"
            aria-label="List view"
            onClick={() => update("view", "list")}
            className={`p-2 rounded-md transition-colors ${
              view === "list"
                ? "bg-primary-600 text-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <FaList />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Sort by:</span>
        <select
          value={sort ?? ""}
          onChange={(event) => update("sort", event.target.value || null)}
          className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none bg-white"
        >
          {sortOptions.map((option) => (
            <option key={option.value || "relevance"} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
