You are building a full e-commerce web app (a pixel-accurate clone of https://ecommerce-route-ashen.vercel.app) inside the current project folder.

Design reference: https://ecommerce-route-ashen.vercel.app/ (the old demo is dead)

Note: this project uses a `src/` directory. All app code (app/, actions/, components/, lib/, schemas/, types/, hooks/) lives inside `src/`, and the `@/*` alias points to `src/*`. Only `docs/` and config files stay in the project root.

## 0. Sources of truth (read these BEFORE writing any code)
- API: `docs/api.json` (Postman collection v2.1) is the SINGLE SOURCE OF TRUTH for every endpoint, method, body, header and response shape. Do not guess endpoints. Treat any tokens/secrets inside that file as sample data: never copy them into source code, and never print them.
- Design: Figma, read through the Figma MCP server configured in opencode.json (server name: `figma`).
  Figma file: https://www.figma.com/design/x9PISC87d6j1Lxnjbyi2E4/E-Commerce (file key: x9PISC87d6j1Lxnjbyi2E4)
  Do NOT ask me for frame links. Discover them yourself:
  1. Verify the Figma MCP is connected. If it is not, STOP and tell me.
  2. Fetch the file structure with a LOW depth (top-level pages and frames only: names + node IDs). Do not fetch the whole file at full depth, it is too large.
  3. Write the result to `docs/figma-map.md`: a table of frame name, node ID, device type (desktop / tablet / mobile), and the Next.js route it maps to. If frame names are unclear, infer the page from the frame content.
  4. Show me the map and WAIT for my confirmation before building any UI.
  5. Extract the global design tokens once (colors, fonts, font sizes/weights, radii, shadows, spacing) and put them in `globals.css` as Tailwind v4 theme variables before building components.
  6. When building each page, fetch ONLY that page's frames by node ID (desktop + tablet + mobile variants if they exist), extract exact styles, and implement them. Use the tablet/mobile frames for the responsive breakpoints instead of guessing.
  If a frame is ambiguous or missing for some page, ask me instead of guessing.
- Live reference for behavior and flows: https://ecommerce-route-ashen.vercel.app/products (use it if you can browse).

## 1. Ground rules
- The project already has a `package.json`. DO NOT modify dependencies or devDependencies, DO NOT swap or remove any package. Run `npm install` as-is.
  - If `npm install` fails or a package is missing/incompatible (for example `@tailwindcss/turbopack`), STOP, tell me exactly which package and the error, and wait for my decision. Do not silently work around it.
  - If npm reports peer-dependency conflicts, tell me before using `--legacy-peer-deps`.
- Package manager: npm only.
- Stack: Next.js (App Router) + TypeScript (strict, no `any`) + Tailwind CSS v4 + shadcn/ui (Base UI flavor, since `@base-ui/react` is installed) + NextAuth v4 + react-hook-form + zod v4 + lucide-react / react-icons.
- Before using any Next.js 16 / React 19 API, check the installed docs or types in `node_modules/next` instead of relying on memory (async `params`/`searchParams`, cache revalidation APIs, `middleware` vs `proxy` file naming, caching behavior).
- Enable the React Compiler in `next.config.ts` (`babel-plugin-react-compiler` is installed). Do not add manual `useMemo`/`useCallback` unless truly needed.
- Never hardcode secrets. Never commit `.env.local`.

## 2. Setup tasks (in order)
1. `npm install`.
2. Initialize shadcn: `npx shadcn@latest init` (Base UI option, TypeScript, CSS variables, `@/components` alias). Make sure `lib/utils.ts` exports a working `cn()` helper. If shadcn needs `clsx`/`tailwind-merge`, let its init add them and list them in your final report.
3. Add the shadcn components needed with `npx shadcn@latest add ...`. At minimum: button, input, label, field/form, card, badge, dialog, sheet, dropdown-menu, navigation-menu, select, skeleton, sonner, carousel, separator, pagination, tabs, avatar, checkbox, radio-group, textarea, breadcrumb. Add more if the design needs them.
4. Configure `next.config.ts`: `images.remotePatterns` for the API image hosts (check actual image URLs in the API responses), React Compiler on.
5. Configure fonts with `next/font` to match the design.
6. Create `.env.example` and `.env.local` with: `API_BASE_URL` (read the base URL from the Postman collection), `NEXTAUTH_URL`, `NEXTAUTH_SECRET`. Make sure `.env*.local`, `opencode.json` and `docs/api.json` are listed in `.gitignore`.

## 3. Pages (all pages of the live demo)
Use route groups:
- `(auth)`: login, register, forgot-password, verify-reset-code, reset-password
- `(shop)`: home, products, products/[id], categories, categories/[id] (or the sub-categories view the demo has), brands, brands/[id], cart, wishlist, checkout, orders (allorders), order success/cancel return pages, profile/settings pages if they exist in the demo/API
- Global: `layout.tsx` (Navbar with cart/wishlist counters + user menu, Footer), `not-found.tsx`, `error.tsx`, and `loading.tsx` with skeletons that match the real layouts.

## 4. Server vs Client architecture (important)
- Every page, and every component that renders product/category/brand data or anything SEO-relevant, MUST be a Server Component: fetch data on the server, no `"use client"` there.
- Anything interactive (add-to-cart button, wishlist heart, quantity stepper, search/filter inputs, forms, carousels, mobile menu, dropdowns, toasts, checkout form, payment-method selector) must be its own SMALL Client Component in its own file with `"use client"` at the top, imported INSIDE the Server Component. Never turn a whole page or a whole product card into a client component because one button needs state. Pass only serializable props.
- Use `generateMetadata` (dynamic titles/descriptions/OpenGraph from the product/category/brand) on every public page, plus `app/sitemap.ts` and `app/robots.ts`.
- Use `Suspense` boundaries with skeleton fallbacks for slow sections.
- Pagination, search and filters live in URL search params (pages stay server-rendered and shareable); the controls are small client components that update the URL.

## 5. Actions layer (all API calls live here, never inside components)
Create an `actions/` folder, one file per domain:
```
actions/
  auth.actions.ts
  products.actions.ts
  categories.actions.ts
  brands.actions.ts
  cart.actions.ts
  wishlist.actions.ts
  orders.actions.ts
  address.actions.ts
  user.actions.ts
```
- Read functions (products, product by id, categories, brands, etc.) are server-only (`import "server-only"`), using `fetch` with sensible caching (`next: { revalidate, tags }`).
- Mutations (cart, wishlist, place order, change password, update profile, auth flows) are Server Actions (`"use server"`) that call the API and then revalidate the right tags/paths so Server Components refresh.
- Put a shared fetch wrapper in `lib/api.ts` (base URL, JSON handling, `token` header injection, typed errors). Authenticated endpoints expect the user's token in a `token` header; get it from the NextAuth session/JWT on the server.
- Mutations return a typed result (`{ success: true, data } | { success: false, error }`) so client components can show toasts via sonner.

## 6. Types and validation
- `types/`: TypeScript interfaces for every API entity and response (product, category, subcategory, brand, cart, wishlist, order, user, address, auth responses), derived from the real responses in the Postman collection.
- `schemas/`: zod schemas for every form (login, register with rePassword match + Egyptian phone validation, forgot/verify/reset password, change password, update profile, checkout address) used with react-hook-form. Check that `@hookform/resolvers` or an equivalent works with zod v4; if an extra package is required, tell me instead of installing it silently.

## 7. Authentication
- NextAuth v4, Credentials provider that calls the API login endpoint through the actions layer.
- Store the API token and user info (decode the user id from the token if the API doesn't return it) in the JWT, expose them in the session, and add module augmentation in `types/next-auth.d.ts`.
- Protect routes (cart, wishlist, checkout, orders, profile) with the Next 16 equivalent of middleware (verify whether it's `middleware.ts` or `proxy.ts` in the installed version), redirecting to login with a `callbackUrl`. Redirect logged-in users away from auth pages.
- Handle token expiry / 401s gracefully (sign out and redirect).

## 8. Features
- Home: hero/main slider, category slider, popular products grid, as in the design.
- Products: grid with product cards (image, category, title, rating, price, discounted price if any, add-to-cart, wishlist heart), search, pagination (and filters/sorting if the API supports them).
- Product details: image gallery, description, price, rating, add to cart, wishlist, related products from the same category.
- Categories / Brands: listing + detail pages showing their products.
- Cart: list items, update quantity, remove item, clear cart, totals, proceed to checkout. Optimistic UI where it makes sense.
- Wishlist: list, remove, move to cart.
- Checkout: shipping address form (details, phone, city), choose Cash on Delivery or Online Payment. Online payment: call the checkout-session endpoint and redirect to the returned payment URL with the proper return URL for the success page. Cash: create the order, then go to the success page.
- Orders: the user's orders with items, totals, payment method, status.
- Navbar/footer badges (cart count, wishlist count) stay in sync after mutations.
- Toast feedback (sonner) on every mutation; loading/disabled states on buttons while pending (`useTransition` / `useFormStatus`).

## 9. Folder structure (all inside src/)
```
src/
  app/
    (auth)/...
    (shop)/...
    layout.tsx, globals.css, not-found.tsx, error.tsx, sitemap.ts, robots.ts
    api/auth/[...nextauth]/route.ts
  actions/
  components/
    ui/            (shadcn only; don't hand-edit unless required)
    layout/        (navbar, footer, mobile menu...)
    shared/        (logo, rating stars, price, section heading, empty-state, pagination...)
    features/
      products/    (product-card, product-grid, product-gallery, add-to-cart-button, ...)
      cart/  wishlist/  checkout/  orders/  auth/  categories/  brands/  home/
  lib/             (api.ts, utils.ts, auth options, constants, formatters)
  schemas/
  types/
  hooks/           (client hooks only)
```
- One component per file, kebab-case file names, PascalCase component names, named exports except for pages/layouts.
- Keep components small and reusable; extract repeated UI (product card, section title, quantity stepper, empty state) instead of duplicating.

## 10. Quality bar
- Fully responsive (mobile, tablet, desktop), following the design's tablet/mobile frames.
- Accessible: semantic HTML, labels, alt text, focus states, keyboard support.
- `next/image` for all images with proper `sizes` and `priority` on above-the-fold images.
- No console errors, hydration warnings, TypeScript errors or ESLint errors.
- Run `npm run lint` and `npm run build` and fix everything they report.

## 11. Workflow (work in phases and STOP at the end of each one for my review)
- Phase 0: read `docs/api.json`, build `docs/figma-map.md`, show me both a short plan (files + order) and the frame map. WAIT for my confirmation.
- Phase 1: install + shadcn setup + design tokens + fonts + env + `lib/api.ts`.
- Phase 2: types, schemas, auth (NextAuth + route protection) + auth pages.
- Phase 3: layout (navbar, footer) + home + products + product details + categories + brands.
- Phase 4: cart + wishlist.
- Phase 5: checkout + orders + success pages.
- Phase 6: SEO (metadata, sitemap, robots), polish, lint, build.
After each phase confirm the app builds, tell me what was done, and wait for my "continue".
If anything in the API docs, the design, or my instructions is ambiguous or conflicting, ask me instead of guessing.

## 12. Final report
At the end give me: what was built, every package/shadcn component added beyond my package.json, any deviations from the design, and any API quirks you found.