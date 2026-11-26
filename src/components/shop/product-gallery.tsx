"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const gallery = images.length ? images : [];
  const [active, setActive] = useState(0);

  if (!gallery.length) return null;

  return (
    <div aria-live="polite">
      <div className="overflow-hidden rounded-lg bg-gray-50">
        <Image
          src={gallery[active]}
          alt={title}
          width={800}
          height={1000}
          priority
          className="w-full h-auto object-contain"
        />
      </div>
      <nav
        aria-label="Thumbnail Navigation"
        className="grid grid-cols-4 gap-2 mt-3"
      >
        {gallery.map((image, index) => (
          <button
            key={image}
            type="button"
            aria-label={`Go to Slide ${index + 1}`}
            aria-pressed={active === index}
            onClick={() => setActive(index)}
            className={`overflow-hidden rounded-md border-2 bg-white transition ${
              active === index
                ? "border-primary-600"
                : "border-gray-100 hover:border-primary-300"
            }`}
          >
            <Image
              src={image}
              alt={`${title} thumbnail ${index + 1}`}
              width={160}
              height={160}
              className="w-full aspect-square object-contain"
            />
          </button>
        ))}
      </nav>
    </div>
  );
}
