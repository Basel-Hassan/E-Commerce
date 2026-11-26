# Brands (`/brands`)

Source: live `/brands`. Saved markup: `sections/brands-main.html`.

## Page shell

- Page background `min-h-screen bg-gray-50/50`.
- Hero: `bg-gradient-to-br from-violet-600 via-violet-500 to-purple-400 text-white`; container `py-12 sm:py-16`.
- Breadcrumb Home / Brands (`text-white/70`).
- Icon tile `w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm shadow-xl ring-1 ring-white/30` containing `FaTags`.
- Heading “Top Brands” `text-3xl sm:text-4xl font-bold tracking-tight`; subtitle “Shop from your favorite brands”.

## Brand grid

- Content container `px-4 py-10`.
- Grid `grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5`.
- Card links to `/products?brand={brandId}` (no `/brands/[id]` route).
- Card: `group bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-xl hover:border-violet-200 transition-all duration-300 hover:-translate-y-1`.
- Image tile `aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3 p-4 flex items-center justify-center`; image `object-contain`, hover `scale-110`.
- Name `font-semibold text-gray-900 text-center text-sm`, hover `text-violet-600`, truncate.
- Hover reveals “View Products” in `text-violet-600 text-xs`.
