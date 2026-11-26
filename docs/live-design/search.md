# Search (`/search`)

Source: live `/search?q=shawl`. Query returned 0 products, so the no-results state is the audited state. Saved markup: `sections/search-main.html`.

## Page shell

- Background `min-h-screen bg-gray-50/50`.
- Header block `bg-white border-b border-gray-100`; container `px-4 py-6`.
- Breadcrumb Home / Search Results (`gap-2 text-sm text-gray-500 mb-4`).
- Search form `max-w-2xl`; input `w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 text-lg`; icon absolute `left-4`.
- Heading `text-2xl font-bold text-gray-900`: `Search Results for "shawl"`.
- Result count `text-gray-500 text-sm mt-1`: `We found 0 products for you`.
- Actual query param: `q`; API keyword filter also `keyword`.

## Layout

- Container `px-4 py-8`; `flex gap-8`.
- Sidebar `hidden lg:block w-64 shrink-0`; card `bg-white rounded-2xl border border-gray-100 p-6 sticky top-24`.
- Main `flex-1 min-w-0`.

## Sidebar filters

- Categories checkbox list, max height `max-h-52 overflow-y-auto`; checkbox `w-4 h-4 rounded border-gray-300 text-primary-600`.
- Price Range two inputs Min (EGP) / Max (EGP), placeholder `0` / `No limit`; quick pills “Under 500”, “Under 1K”, “Under 5K”, “Under 10K”.
- Brands checkbox list, same max-height/scroll.
- “Clear All Filters” outlined full-width button.
- API supports `price[gte]` and `price[lte]`.

## Toolbar

- Left: mobile “Filters” button (`lg:hidden`, sliders icon) and grid/list toggle in white bordered group.
- Active view button `bg-primary-600 text-white`; inactive `text-gray-500`.
- Right: “Sort by:” + select. Options: Relevance (`""`), Price: Low to High (`price`), Price: High to Low (`-price`), Rating: High to Low (`-ratingsAverage`), Name: A to Z (`title`), Name: Z to A (`-title`).

## Active filters

- Row: filter icon + “Active:”; pills `bg-gray-100 text-gray-700 text-xs` with remove `x`; “Clear all” underlined link.
- Audited state shows pill `"shawl"` and “Clear all”.

## Empty state

- Centered `py-20`; gray circle `w-20 h-20` with magnifying glass; heading “No Products Found”; helper “Try adjusting your search or filters to find what you're looking for.”; primary “Clear Filters” button.
- Populated state should reuse the 5-column products grid/card layout.

## Live behavior note

- `/search?q=shawl` returned 0 products; API `keyword=shawl` also returns 0, so the empty state is expected.
