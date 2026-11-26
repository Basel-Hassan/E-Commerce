# Home (`/`)

Source: live site `/`, 1920 / 1024 / 390. Original markup saved in `freshcart-phase3` and `sections/home-*.html`.

## Page shell

- Shop layout: sticky header, page content, layout-level service strip, footer.
- Hero wrapper is `relative`; slides are `h-[400px]`; desktop 1920 hero is `1920x400`.
- Navbar sits above hero; top bar is not sticky, only the main header.

## Hero

- Swiper with 3 slides, all using the same background image (`home-slider-1.png`), `background-size: cover`, `background-position: center`.
- Slide interior: `h-[400px] flex items-center justify-center`.
- Overlay: `py-20 text-white p-4 w-full h-full bg-linear-to-r from-green-500/90 to-green-400/50`.
- Content wrapper: `container h-full content-center`.
- Slide 1: “Fresh Products Delivered to your Door”, “Get 20% off your first order”; buttons “Shop Now” (`/products`, white/green) and “View Deals” (`/deals`, transparent/white).
- Slide 2: “Premium Quality Guaranteed”, “Fresh from farm to your table”; “Shop Now” (`text-blue-500`), “Learn More” (`/about`).
- Slide 3: “Fast & Free Delivery”, “Same day delivery available”; “Order Now” (`text-purple-500`), “Delivery Info” (`/delivery`).
- Heading `text-white text-3xl font-bold mb-4 max-w-96`; paragraph default.
- Buttons: `btn inline-block px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform`; secondary adds `ml-2`; both `border-2 border-white/50`.
- Arrows: `custom-prev` / `custom-next` absolute left/right 4, centered vertically, `bg-white/90 hover:bg-white text-green-500`, `rounded-full w-12 h-12 hidden md:flex`, shadow, hover scale.
- Pagination: `swiper-pagination` bullets at bottom center.

## Service highlights (home-specific)

- Section `py-8 bg-gray-50`, separate from layout `ServiceStrip`.
- 4 white cards: Free Shipping (blue truck), Secure Payment (emerald shield), Easy Returns (orange rotate-left), 24/7 Support (purple headset).

## Categories

- `section#categories.py-10`; heading “Shop By Category” with emerald gradient bar; “View All Categories” → `/categories`.
- Grid `grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4`.
- Card: `bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition group cursor-pointer`; image inside `h-20 w-20` circle with `bg-primary-100`; card link `/categories/{id}`.

## Promo banners

- 2 cards: emerald “Fresh Organic Fruits” / “40% OFF” / code `ORGANIC40` → `/products`; orange-rose “Exotic Vegetables” / “25% OFF” / `FRESH25` → `/products?sort=newest`.

## Featured products

- `section py-10`, emerald gradient bar + “Featured Products”.
- Grid `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6`; 5 cards; no “View All” link.

## Newsletter

- Starts `py-16 bg-linear-to-b from-white to-gray-50`.
- Emerald/teal gradient card, envelope icon, “Get the Freshest Updates Delivered Free”, “50,000+ subscribers”, email form, app-download card, perks.
- Footer and layout `ServiceStrip` follow.
