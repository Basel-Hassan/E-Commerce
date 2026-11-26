"use client";

import { useRef, type ReactNode } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import { Container } from "@/components/layout/container";

export function RelatedProductsCarousel({
  children,
}: {
  children: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(direction: -1 | 1) {
    trackRef.current?.scrollBy({
      left: direction * 368,
      behavior: "smooth",
    });
  }

  return (
    <section id="similar-products" className="py-10">
      <Container>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full" />
            <h2 className="text-2xl font-bold text-gray-800">
              You May Also <span className="text-emerald-600">Like</span>
            </h2>
          </div>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => scroll(-1)}
              className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-100 hover:text-primary-600 transition"
            >
              <FaChevronLeft />
              <span className="sr-only">Previous</span>
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-100 hover:text-primary-600 transition"
            >
              <FaChevronRight />
              <span className="sr-only">Next</span>
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide snap-x"
        >
          {children}
        </div>
      </Container>
    </section>
  );
}
