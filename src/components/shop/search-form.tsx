"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

export function SearchForm({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(initialQuery);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    const query = value.trim();

    if (query) params.set("q", query);
    else params.delete("q");

    router.push(`/search${params.size ? `?${params.toString()}` : ""}`);
  }

  return (
    <form className="max-w-2xl" onSubmit={handleSubmit}>
      <div className="relative">
        <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          name="q"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Search for products..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-lg"
        />
      </div>
    </form>
  );
}
