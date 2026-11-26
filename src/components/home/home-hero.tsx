"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const slides = [
  {
    title: "Fresh Products Delivered to your Door",
    description: "Get 20% off your first order",
    primary: { label: "Shop Now", href: "/products", color: "text-green-500" },
    secondary: { label: "View Deals", href: "/deals" },
  },
  {
    title: "Premium Quality Guaranteed",
    description: "Fresh from farm to your table",
    primary: { label: "Shop Now", href: "/products", color: "text-blue-500" },
    secondary: { label: "Learn More", href: "/about" },
  },
  {
    title: "Fast & Free Delivery",
    description: "Same day delivery available",
    primary: { label: "Order Now", href: "/products", color: "text-purple-500" },
    secondary: { label: "Delivery Info", href: "/delivery" },
  },
];

export function HomeHero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  function showPrevious() {
    setActive((current) => (current - 1 + slides.length) % slides.length);
  }

  function showNext() {
    setActive((current) => (current + 1) % slides.length);
  }

  return (
    <section className="relative">
      <div className="swiper relative overflow-hidden">
        <div
          className="swiper-wrapper flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.title} className="swiper-slide w-full shrink-0">
              <div className="relative h-[400px] flex items-center justify-center">
                <Image
                  src="/images/home/home-slider-1.png"
                  alt=""
                  fill
                  priority
                  sizes="100vw"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 z-10 py-20 px-4 text-white bg-gradient-to-r from-green-500/90 to-green-400/50">
                  <div className="container h-full content-center">
                    <h2 className="text-white text-3xl font-bold mb-4 max-w-96">
                      {slide.title}
                    </h2>
                    <p>{slide.description}</p>
                    <div className="mt-4">
                      <Link
                        href={slide.primary.href}
                        className={`btn bg-white border-2 border-white/50 ${slide.primary.color} inline-block px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform`}
                      >
                        {slide.primary.label}
                      </Link>
                      <Link
                        href={slide.secondary.href}
                        className="btn bg-transparent border-2 border-white/50 text-white ml-2 inline-block px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
                      >
                        {slide.secondary.label}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="swiper-pagination absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === active}
              onClick={() => setActive(index)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                index === active ? "bg-white" : "bg-white/60 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={showPrevious}
        aria-label="Previous slide"
        className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/90 hover:bg-white text-green-500 hover:text-green-600 rounded-full w-12 h-12 hidden md:flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
      >
        <FaChevronLeft className="text-lg" />
      </button>
      <button
        type="button"
        onClick={showNext}
        aria-label="Next slide"
        className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/90 hover:bg-white text-green-500 hover:text-green-600 rounded-full w-12 h-12 hidden md:flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
      >
        <FaChevronRight className="text-lg" />
      </button>
    </section>
  );
}
