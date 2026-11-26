# Figma Frame Map

**Figma file:** [E-Commerce](https://www.figma.com/design/x9PISC87d6j1Lxnjbyi2E4/E-Commerce) — key `x9PISC87d6j1Lxnjbyi2E4`
**Pages:** 1 — `Page 1` (`#0:1`)
**Device widths:** Desktop 1920px, Tablet 1024px, Mobile 390px

Frames named `Label - …` are canvas annotations (same 141px-tall label template), not app UI, and have no route.

## Breakpoints and container

| Design | Frame width | Tailwind breakpoint | Layout |
| --- | --- | --- | --- |
| Mobile | 390px | default (`< md`, under 768px) | Mobile frame |
| Tablet | 1024px | `md` (768px – 1279px) | Tablet frame |
| Desktop | 1920px | `xl` (`>= 1280px`) | Desktop frame |

`lg` (1024px) is intentionally not used as the desktop breakpoint because the tablet frame itself is 1024px wide. Desktop layout starts at `xl`.

**Content container:** max width **1536px** (`max-w-page` / `.container-page`). At 1920px the container spans `x=192` to `x=1728`, and with the frame's 16px inner padding the content starts at `x=208` and is **1504px** wide, matching the desktop header and footer frames. Grid sections that use 32px inner padding produce the **1472px** grid width seen in the frames. Padding steps: 16px mobile, 24px tablet, 32px desktop.

## Frame → Route map

| Frame name | Node ID | Device | Next.js route |
| --- | --- | --- | --- |
| Home Page - Desktop | `1001:10689` | Desktop | `/` |
| Home Page - Tablet | `1001:12538` | Tablet | `/` |
| Home Page - Mobile | `1001:14380` | Mobile | `/` |
| Label - Home Car Rent | `1001:16169` | — | — (annotation) |
| Product Details Page - Desktop | `1001:16177` | Desktop | `/products/[id]` |
| Product Details Page - Tablet | `1001:16781` | Tablet | `/products/[id]` |
| Product Details Page - Mobile | `1001:17336` | Mobile | `/products/[id]` |
| Label - Product Details Page | `1001:17803` | — | — (annotation) |
| Sign up Page - Desktop | `1001:17811` | Desktop | `/register` `(auth)` |
| Sign up Page - Tablet | `1001:18138` | Tablet | `/register` `(auth)` |
| Sign up Page - Mobile | `1001:18455` | Mobile | `/register` `(auth)` |
| Label - Sign up Page | `1001:18723` | — | — (annotation) |
| Login Page - Desktop | `1001:18731` | Desktop | `/login` `(auth)` |
| Login Page - Tablet | `1001:19048` | Tablet | `/login` `(auth)` |
| Login Page - Mobile | `1001:19355` | Mobile | `/login` `(auth)` |
| Label - Login Page | `1001:19587` | — | — (annotation) |
| Cart Page - Desktop | `1001:19595` | Desktop | `/cart` `(shop)` |
| Cart Page - Tablet | `1001:20069` | Tablet | `/cart` `(shop)` |
| Cart Page - Mobile | `1001:20533` | Mobile | `/cart` `(shop)` |
| Label - Cart Page | `1001:20949` | — | — (annotation) |
| Checkout Page - Desktop | `1001:20957` | Desktop | `/checkout` `(shop)` |
| Checkout Page - Tablet | `1001:21412` | Tablet | `/checkout` `(shop)` |
| Checkout Page - Mobile | `1001:21857` | Mobile | `/checkout` `(shop)` |
| Label - Checkout Page | `1001:22315` | — | — (annotation) |
| Orders Page - Desktop | `1001:22323` | Desktop | `/orders` `(shop)` (alias `/profile/orders`) |
| Orders Page - Tablet | `1001:22929` | Tablet | `/orders` `(shop)` (alias `/profile/orders`) |
| Orders Page - Mobile | `1001:23525` | Mobile | `/orders` `(shop)` (alias `/profile/orders`) |
| Label - Orders | `1001:24136` | — | — (annotation) |
| Products Search page - Desktop | `1001:24144` | Desktop | `/search` `(shop)` |
| Products Search page - Tablet | `1001:25002` | Tablet | `/search` `(shop)` |
| Products Search page - Mobile | `1001:25850` | Mobile | `/search` `(shop)` |
| Label - Product seach page | `1001:26568` | — | — (annotation) |
| Wishlist page - Desktop | `1001:26576` | Desktop | `/wishlist` `(shop)` |
| Wishlist page - Tablet | `1001:26950` | Tablet | `/wishlist` `(shop)` |
| Wishlist page - Mobile | `1001:27314` | Mobile | `/wishlist` `(shop)` |
| Label - Wishlist Page | `1001:27646` | — | — (annotation) |
| Profile page - settings \| Desktop | `1001:27654` | Desktop | `/profile/settings` `(shop)` |
| Profile page - settings \| Tablet | `1001:28004` | Tablet | `/profile/settings` `(shop)` |
| Profile page - settings \| Mobile | `1001:28344` | Mobile | `/profile/settings` `(shop)` |
| Label - Profile Page - settings | `1001:28692` | — | — (annotation) |
| Profile Page - Addresses \| Desktop | `1001:28700` | Desktop | `/profile/addresses` `(shop)` |
| Profile Page - Addresses \| Tablet | `1001:28985` | Tablet | `/profile/addresses` `(shop)` |
| Profile Page - Addresses \| Mobile | `1001:29260` | Mobile | `/profile/addresses` `(shop)` |
| Label - Profile Page - settings | `1001:29543` | — | — (annotation, belongs to Addresses) |
| Brands Page \| Desktop | `1001:29551` | Desktop | `/brands` `(shop)` |
| Brands Page \| Tablet | `1001:30186` | Tablet | `/brands` `(shop)` |
| Brands Page \| Mobile | `1001:30811` | Mobile | `/brands` `(shop)` |
| Label - Brands Page | `1001:31437` | — | — (annotation) |
| Categories Page \| Desktop | `1001:31445` | Desktop | `/categories` `(shop)` |
| Categories Page \| Tablet | `1001:31780` | Tablet | `/categories` `(shop)` |
| Categories Page \| Mobile | `1001:32105` | Mobile | `/categories` `(shop)` |
| Label - Categories Page | `1001:32431` | — | — (annotation) |
| Products Page \| Desktop | `1001:32439` | Desktop | `/products` `(shop)` |
| Products Page \| Tablet | `1001:34183` | Tablet | `/products` `(shop)` |
| Products Page \| Mobile | `1001:35917` | Mobile | `/products` `(shop)` |
| Label - Products Page | `1001:37652` | — | — (annotation) |
| Forgot Password Page \| Desktop | `1001:37660` | Desktop | `/forgot-password` `(auth)` |
| Forgot Password Page \| Tablet | `1001:37963` | Tablet | `/forgot-password` `(auth)` |
| Forgot Password Page \| Mobile | `1001:38256` | Mobile | `/forgot-password` `(auth)` |
| Label - Forgot Password Page | `1001:38506` | — | — (annotation) |
| Reset Verify Code \| Desktop | `1001:38514` | Desktop | `/verify-reset-code` `(auth)` |
| Reset Verify Code \| Tablet | `1001:38818` | Tablet | `/verify-reset-code` `(auth)` |
| Reset Verify Code \| Mobile | `1001:39112` | Mobile | `/verify-reset-code` `(auth)` |
| Label - Verify Reset Code | `1001:39363` | — | — (annotation) |
| Reset Password \| Desktop | `1001:39371` | Desktop | `/reset-password` `(auth)` |
| Reset Password \| Tablet | `1001:39679` | Tablet | `/reset-password` `(auth)` |
| Reset Password \| Mobile | `1001:39977` | Mobile | `/reset-password` `(auth)` |
| Label - Reset Password | `1001:40232` | — | — (annotation) |

## Routes without a dedicated Figma frame

These still exist in the live demo/API and will be composed from shared components in the closest designed frame:

| Route | Derivation |
| --- | --- |
| `/brands/[id]` | Brand hero from `/brands` + product grid from `/products` frames |
| `/categories/[id]` | Category hero from `/categories` + product grid from `/products` frames |
| `/profile` | Redirect to `/profile/settings` (live footer uses `/profile` as My Account) |
| `/order-success` | API return URL target for online payment; reuse checkout/orders styling |
| `/order-cancel` | API return URL target for cancelled online payment |

## Notes / ambiguities

- Live demo uses `/forget-password` (misspelled); prompt + Figma use "Forgot Password", so route will be `/forgot-password`.
- Live demo exposes both `/orders` (protected) and `/profile/orders` (protected, footer "Order History"). Map uses `/orders` as canonical; `/profile/orders` will redirect to it unless you prefer the reverse.
- `/products` = "All Products" listing; `/search` = "Search Results" listing with filters. Figma has separate frames for both.
- No Figma frame exists for `/search` navigation entry; the navbar search input will submit to `/search`.
