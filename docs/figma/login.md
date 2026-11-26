# Login page styles

**Figma frames**

| Device | Node ID | Status |
| --- | --- | --- |
| Desktop | `1001:18731` | Previously fetched. Do not fetch again. |
| Tablet | `1001:19048` | Not fetched — Figma API returned 429. |
| Mobile | `1001:19355` | Not fetched — Figma API returned 429. |

The Figma API is currently rate-limited on this seat (`429`, retry window
reported in days). Do not retry the same frame. The implementation below uses
the previously fetched desktop structure plus the live reference at
`https://ecommerce-route-ashen.vercel.app/login`.

## Layout

- Desktop (`xl`, >=1280px): two columns, `max-w-7xl`, `gap-12`, vertically
  centered. Left column is a marketing/illustration panel; right column is the
  auth card.
- Tablet/mobile: single column, aside hidden, card centered at `max-w-2xl`.
- Page wrapper: `.container-page`, vertical padding `py-10`, desktop `py-16`.
- Card: white, `rounded-2xl`, `shadow-xl`, padding `p-6` mobile, `p-8` tablet,
  `p-12` desktop.

## Left illustration panel

- Image: full width, `h-96`, `object-cover`, `rounded-2xl`, `shadow-lg`.
- Heading: `text-3xl`, bold, `#1e2939` (`gray-800`).
- Body: `text-lg`, `#4a5565` (`gray-600`).
- Feature row: three items, `text-sm`, `gray-500`, primary icons
  `#16a34a`; 32px gaps.

## Auth card

- Brand: `Fresh` in primary `#16a34a`, `Cart` in `gray-800`; `text-3xl`,
  bold.
- Heading: `text-2xl`, bold, `gray-800`, 8px below.
- Subtitle: `gray-600`.
- Social buttons: full-width, `rounded-xl`, `border-2` `#e5e7eb`, `py-3`,
  `font-medium gray-700`; hover border `primary-300` and background
  `primary-50`.
- Divider label: `text-sm`, `gray-500`, uppercase,
  “OR CONTINUE WITH EMAIL”.
- Field label: `text-sm`, semibold, `gray-700`, 8px below.
- Input: full width, `rounded-xl`, `border-2` `#e5e7eb`, `py-3`, left icon at
  16px, `pl-12`; focus border `primary-500`, 2px `primary-100` ring.
- Forgot link: `text-sm`, medium, `primary-600`, right-aligned with label.
- Submit: full width, `primary-600`, white, `rounded-xl`, `py-3`,
  `text-lg`, semibold, `shadow-lg`; hover `primary-700` + `shadow-xl`;
  disabled opacity 50.
- Footer: top border `gray-100`, 24px top padding, `gray-600`; link
  `primary-600`, semibold.
- Trust row: `text-xs`, `gray-500`, 24px gap: SSL Secured, 50K+ Users,
  4.9 Rating.

## Responsive rules

- Mobile: card `p-6`, no aside, trust row may wrap.
- Tablet (`md` 768–1279): card `p-8`, centered, max width 672px.
- Desktop (`xl` >=1280): two columns, card `p-12`, right column fills its
  grid cell.

## Tokens used

- Primary: `#16a34a`; hover `#15803d`.
- Primary tints: `#f0fdf4`, `#dcfce7`.
- Gray: `#1e2939`, `#4a5565`, `#6a7282`, `#e5e7eb`, `#f9fafb`.
- Radius: `rounded-xl` (12px), `rounded-2xl` (16px).
- Shadows: card `shadow-xl`; submit `shadow-lg` -> `shadow-xl` on hover.
