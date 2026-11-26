# Products (`/products`)

Source: live site `/products`. Saved markup: `freshcart-phase3`, `sections/products-*.html`, `sections/product-card.html`.

## Page shell

- Page background `min-h-screen bg-gray-50/50`.
- Gradient hero: `bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 text-white`.
- Breadcrumb: Home / All Products (`text-white/70`, `/` separators `text-white/40`).
- Hero icon tile: `w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm`, `shadow-xl ring-1 ring-white/30`.
- Heading “All Products” `text-3xl sm:text-4xl font-bold tracking-tight`; subtitle “Explore our complete product collection” `text-white/80 mt-1`.

## Results

- Container `container mx-auto px-4 py-8`.
- Results count: “Showing 40 products” (`text-sm text-gray-500`, `mb-6`).
- Grid: `grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6`.
- No filter/sort sidebar and no pagination controls observed; “Next” in HTML is Next.js payload.
- API query params supported: `page`, `limit`, `sort`, `keyword`, `category`, `brand`, `subcategory`, `price[gte]`, `price[lte]`.

## Product card

- Root: `id="product-card"`, `bg-white border border-gray-200 rounded-lg overflow-hidden`.
- Image link block `relative`; image `w-full h-60 object-contain bg-white`.
- Action stack absolute `top-3 right-3`, vertical `space-y-2`; round white `h-8 w-8` buttons for wishlist, compare, view.
- Content `p-4`.
- Category `text-xs text-gray-500 mb-1`.
- Title `font-medium mb-1`, `line-clamp-2`, hover `text-primary-600`.
- Rating row: yellow stars + `text-xs text-gray-500` “4.1 (54)”.
- Price `text-lg font-bold text-gray-800`; add-to-cart circular `h-10 w-10` primary button on the right.

## Empty state

- White bordered rounded panel, gray icon circle, “No Products Found”, helper copy, “Clear Filters” primary link.
