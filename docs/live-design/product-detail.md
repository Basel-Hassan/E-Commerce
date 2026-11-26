# Product Detail (`/products/[id]`)

Source: live site `/products/6428ebc6dc1175abc65ca0b9`. Saved markup: `sections/product-detail-*.html`.

## Page shell

- Breadcrumb directly on page background: `py-4`; `container mx-auto px-4`.
- Items: Home / category / subcategory / product; links `text-gray-500 hover:text-primary-600`; current `text-gray-900 font-medium truncate max-w-xs`; separators `FaChevronRight text-gray-400 text-xs mx-2`.
- No outer page wrapper/background observed; content starts immediately with breadcrumb.

## Gallery + info

- Section `#product-detail py-6`, container.
- Layout `flex flex-col lg:flex-row gap-8`.
- Gallery column `lg:w-1/4`; card `bg-white rounded-xl shadow-sm p-4 sticky top-4`.
- Gallery uses only `product.images` (4 images for the sample product), not `imageCover`.
- Live gallery is `react-image-gallery`; main image `object-contain`, thumbnails below with active thumbnail.
- Info column `lg:w-3/4`; card `bg-white rounded-xl shadow-sm p-6`.
- Category tag `bg-primary-50 text-primary-700 text-xs px-3 py-1.5 rounded-full` → `/categories/{categoryId}`.
- Brand tag `bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full`.
- Title `text-2xl lg:text-3xl font-bold text-gray-900 mb-3`.
- Rating row: yellow stars, then `text-sm text-gray-600` “4.1 (54 reviews)”.
- Price `text-3xl font-bold text-gray-900`: `149 EGP`.
- Stock pill: `bg-green-50 text-green-700`, green dot, “In Stock” / “Out of Stock”.
- Description block `border-t border-gray-100 pt-5 mb-6`; paragraph `text-gray-600 leading-relaxed`.

## Purchase controls

- Quantity label `block text-sm font-medium text-gray-700 mb-2`.
- Stepper `border-2 border-gray-200 rounded-lg overflow-hidden`; minus/plus buttons `px-4 py-3`, disabled at bounds; input `w-16 text-center`; max `product.quantity` (220); “220 available”.
- Total panel `bg-gray-50 rounded-lg p-4 mb-6`; label “Total Price:”, amount `text-2xl font-bold text-primary-600`; default `149.00 EGP`.
- Add to Cart: primary, `py-3.5 px-6 rounded-xl`, shadow primary.
- Buy Now: gray-900, same sizing.
- Wishlist: outlined `border-2 border-gray-200`, primary hover.
- Share: outlined square-ish button with share icon.

## Perks row

- `border-t border-gray-100 pt-6`; grid `grid-cols-1 sm:grid-cols-3 gap-4`.
- Each: `h-10 w-10 bg-primary-100 text-primary-600 rounded-full`; title `font-medium text-gray-900 text-sm`.
- Free Delivery “Orders over $50”; 30 Days Return “Money back”; Secure Payment “100% Protected”.

## Tabs

- Section `#product-details-tabs py-8`; container.
- Card `bg-white rounded-lg shadow-sm overflow-hidden`.
- Tab bar `border-b border-gray-200`; `flex overflow-x-auto`.
- Buttons `flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap`.
- Active: `text-primary-600 border-b-2 border-primary-600 bg-primary-50/50`.
- Tabs: “Product Details” (box icon), “Reviews (54)” (star), “Shipping & Returns” (truck).
- Details panel `p-6 space-y-6`; heading “About this Product” `text-lg font-semibold`; description `text-gray-600 leading-relaxed`.
- Info grid `grid-cols-1 md:grid-cols-2 gap-6`; two `bg-gray-50 rounded-lg p-4` cards.
- Product Information rows: Category, Subcategory, Brand, Items Sold.
- Key Features: “Premium Quality Product”, “100% Authentic Guarantee”, “Fast & Secure Packaging”, “Quality Tested”.

## Related products

- Section `#similar-products py-10`; heading “You May Also Like” with emerald gradient bar and carousel arrows.
- Horizontal flex strip with snap; live card width ~358px at 1920.
