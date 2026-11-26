# Login (`/login`)

Source: live site `/login`, 1920 / 1024 / 390 computed styles.

## Page shell

- `<main>` sits below the live header; content wrapper: `container py-16 mx-auto px-4`
  - Desktop 1920: wrapper `1536px` wide at `x=320`, padding `64px 16px`.
  - Tablet 1024: wrapper `1024px`, content `992px` at `x=16`.
  - Mobile 390: wrapper `390px`, content `358px` at `x=16`.
- Grid: `grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto`
  - Two columns from `lg` (1024px), not `xl`.
  - Desktop columns: `616px + 48px gap + 616px`; right column wrapper `w-full`.
- Live page includes navbar/footer; auth scope currently excludes them.

## Aside (`hidden lg:block`)

- Outer `text-center space-y-6`.
- Hero image: `w-full h-96 object-cover rounded-2xl shadow-lg`; asset 1024x1024.
- Text block `space-y-4`.
- Heading: `text-3xl font-bold text-gray-800`.
- Description: `text-lg text-gray-600`.
- Trust row: `flex items-center justify-center space-x-8 text-sm text-gray-500`; icons `text-primary-600 mr-2`.

## Card

- `bg-white rounded-2xl shadow-xl p-8 lg:p-12`.
- 1920: `616x601`, padding `48px`; 390: `358x845`, padding `32px`.
- Header: `text-center mb-8`.
- Logo text: `text-3xl font-bold text-primary-600` with `Cart` in `text-gray-800`.
- Logo wrapper `flex items-center justify-center mb-4`.
- Title `text-2xl font-bold text-gray-800 mb-2`: `Welcome Back!`.
- Description `text-gray-600`: `Sign in to continue your fresh shopping experience`.

## Social + divider

- Social wrapper `space-y-3 mb-6`.
- Buttons: `w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200`.
- Icons: Google `text-red-500 text-lg`, Facebook `text-blue-600 text-lg`; labels `font-medium text-gray-700`.
- Divider `relative my-6`; line `border-t border-gray-200`; label `px-4 bg-white text-gray-500 font-medium`: `OR CONTINUE WITH EMAIL`.

## Form

- Form `space-y-6`.
- Labels `block text-sm font-semibold text-gray-700 mb-2`.
- Inputs: `w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all`; computed `52px` high, `rounded-xl`, `2px` border.
- Email placeholder `Enter your email`; envelope icon absolute `left-4`, `text-gray-400`.
- Password row: labels and `Forgot Password?` in `flex items-center justify-between mb-2`; link `text-sm text-primary-600 hover:text-primary-700 font-medium`.
- Password input adds `pr-12`; eye button `absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600`.
- Remember row: checkbox `h-4 w-4 text-primary-600 accent-primary-600 border-2 border-gray-300 rounded`; text `ml-3 text-sm text-gray-700`: `Keep me signed in`.
- Submit: `w-full bg-primary-600 text-white py-3 px-4 rounded-xl hover:bg-primary-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`; computed `52px` high, `rounded-xl`.
- No submit icon in default state.

## Footer + trust

- Card footer `text-center mt-8 pt-6 border-t border-gray-100`; `p.text-gray-600`.
- `New to FreshCart?` + link `text-primary-600 hover:text-primary-700 ms-2 font-semibold`.
- Trust row after footer: `flex items-center justify-center space-x-6 mt-6 text-xs text-gray-500`; icons `mr-1`; labels `SSL Secured`, `50K+ Users`, `4.9 Rating`.

## Assets

- Hero: `public/images/auth/login-hero.png` (downloaded from live source, 1024x1024).
