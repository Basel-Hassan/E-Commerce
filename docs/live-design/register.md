# Register (`/signup` live, `/register` local)

Source: live site `/signup`, 1920 computed styles.

## Page shell

- `<main>` wrapper `py-10`.
- Container itself is the grid: `container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 p-4`.
  - Two columns from `lg` (1024px).
  - 1920: container `1280px` at `x=320`, padding `16px`; columns `600px + 48px + 600px`.
  - 1024: content `992px`, columns `472px`.
  - 390: single column, content `358px`.
- Live page includes navbar/footer; auth scope currently excludes them.

## Aside (`hidden lg:block`)

- Heading `text-4xl font-bold`: `Welcome to ` + `FreshCart` in `text-primary-600`; no explicit text color on wrapper.
- Description `text-xl mt-2 mb-4`: `Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.`
- Benefits list `my-8 space-y-6`; item `flex items-start gap-4`.
- Benefit icon `size-12` circle `bg-primary-200 text-lg`; text container; title `text-lg font-semibold`; description `text-gray-600`.
- Review card `bg-white shadow-sm p-4 rounded-md` (6px radius), not `rounded-xl`.
- Review header: `flex items-center gap-4 mb-4`.
- Avatar 48x48 circle image; asset 512x512.
- Name `Sarah Johnson`; live `<h3>` inherits body weight `500`, no extra class.
- Stars `flex gap-0.5 text-yellow-300`, 5 filled stars.
- Quote `italic text-gray-600`.

## Card

- `bg-white rounded-2xl shadow-lg px-6 py-10`.
- No FreshCart logo at top.
- Heading `text-center text-3xl font-semibold mb-2`: `Create Your Account` (30px/36px).
- Description `text-center` inherits `16px/24px`, color gray-700: `Start your fresh journey with us today`.
- 1920: card `600px` wide, content `552px`; card height `1031px`.

## Social + divider

- Social options wrapper `register-options` with `my-10` and `flex gap-2`.
- Buttons use `.btn` base plus: `bg-transparent border border-gray-300 hover:bg-gray-100 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed`.
- Computed: height `42px`, radius `8px`, padding `8px 16px`, font `16px/24px` weight `600`.
- Labels `Google`, `Facebook`; each button takes equal width (`flex-1` via `.btn`).
- Icons: Google `text-red-500`, Facebook `text-blue-600`.
- Divider is custom: `h-0.5 bg-gray-300/30 my-4` with `or` pill centered, uppercase (`or`).

## Form

- Form `space-y-7` (28px gaps).
- Each field group `flex flex-col gap-2` (8px gap).
- Labels inherit body: `16px/24px`, weight `500`; asterisk appended as `*` with no special color.
- Inputs `.form-control`: `width 100%`, height `42px`, padding `8px 12px`, border `1px` gray-300/40, radius `6px`, background transparent, font `16px/24px`, weight `500`.
- No input icons.
- Password requirements directly below password input:
  - `password-requirements` wrapper.
  - Row `flex items-center gap-2`; bar `grow h-1 bg-gray-200 rounded-md overflow-hidden` (4px high); label `Weak` in `text-sm font-medium`.
  - Helper `text-gray-500 -mt-2 text-xs`: `Must be at least 8 characters with numbers and symbols`.
  - Empty password shows `Weak` label; do not hide the row.
- Terms row `flex items-center gap-2`; checkbox `size-4 accent-primary-600`; label `ms-2` inherits body size.
- Terms copy: `I agree to the Terms of Service and Privacy Policy *`; links `text-primary-600 hover:underline` to `/terms` and `/privacy-policy`.
- Submit `.btn bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed w-full transition-colors`.
  - Computed height `40px`, radius `8px`, padding `8px 16px`, font `16px/24px` weight `600`.
  - Label `Create My Account`; no icon.

## Footer

- `border-t pt-10 border-gray-300/30 my-4 text-center`.
- `Already have an account? Sign In`; link `text-primary-600 hover:underline` to `/login`.
- No SSL trust note below the form (the local extra note is not live).

## Assets

- Review author: `public/images/auth/review-author.png` (512x512).
