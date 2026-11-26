# Categories (`/categories` and `/categories/[id]`)

Source: live `/categories` and `/categories/6439d58a0049ad0b52b9003f`. Saved markup: `sections/categories-main.html`, `sections/category-detail-main.html`.

## Categories listing

- Page background `min-h-screen bg-gray-50/50`.
- Hero: `bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 text-white`, container `py-12 sm:py-16`.
- Breadcrumb Home / Categories (`text-white/70`).
- Icon tile `w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm shadow-xl ring-1 ring-white/30` containing `layer-group`.
- Heading “All Categories” `text-3xl sm:text-4xl font-bold tracking-tight`; subtitle “Browse our wide range of product categories”.
- Content container `px-4 py-10`.
- Grid `grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6`.
- Card link `/categories/{id}`: `group bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 hover:-translate-y-1`.
- Image tile `aspect-square rounded-xl overflow-hidden bg-gray-50 mb-4`; image `object-cover`, hover `scale-110`.
- Name `font-bold text-gray-900 text-center`; hover reveals “View Subcategories” with arrow.

## Category detail

- Hero same primary gradient; breadcrumb Home / Categories / {name}.
- Hero image: 16×16 rounded tile with white/20 backdrop; image `w-12 h-12 object-contain`.
- Heading = category name; subtitle “Choose a subcategory to browse products”.
- Back link above grid: “Back to Categories” → `/categories`, `inline-flex items-center gap-2 mb-6`.
- Heading “{count} Subcategories in {name}” `text-lg font-bold`.
- Grid `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6`.
- Subcategory card uses folder icon `FaFolderOpen` and links to `/products?subcategory={id}`.

## Live behavior note

- Live category detail displays **all 40 subcategories** rather than filtering by the selected category, even though the API filters correctly (`subcategories?category=...` returns 7). Clone intentionally uses the unfiltered list for parity.
