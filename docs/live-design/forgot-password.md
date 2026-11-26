# Forgot Password (`/forget-password` live, `/forgot-password` local)

Source: live site `/forget-password`, saved HTML + 1920 / 390 computed styles.

## Page shell

- Wrapper `container py-16 mx-auto px-4`; grid `grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto`.
- 1920: outer `1536px` at `x=192`, padding `64px 16px`; grid `1280px` at `x=320`; columns `616px + 48px + 616px`.
- 390: outer `390px`, content `358px`; card `358px`.
- Two columns start at `lg` (1024px).

## Aside (`hidden lg:block`)

- Outer `text-center space-y-6`.
- Illustration card `w-full h-96 bg-gradient-to-br from-primary-50 via-green-50 to-emerald-50 rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden`.
- Decorative circles:
  - `absolute top-8 left-8 w-24 h-24 rounded-full bg-primary-100/50`
  - `absolute bottom-12 right-10 w-32 h-32 rounded-full bg-green-100/50`
  - `absolute top-20 right-20 w-16 h-16 rounded-full bg-emerald-100/50`
- Center lock card `w-28 h-28 rounded-3xl bg-white shadow-xl flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-300`; inner `w-20 h-20 rounded-2xl bg-primary-100`; lock icon `text-primary-600 text-4xl`.
- Floating mail card `absolute -left-16 top-4 w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center -rotate-12`; icon `text-primary-500 text-xl`.
- Floating shield card `absolute -right-16 top-8` with `rotate-12`; icon `text-green-500 text-xl`.
- Pulse dots row `flex gap-3`; three `w-3 h-3 rounded-full` in `bg-primary-400/500/600`, `animate-pulse`, delays `150ms` and `300ms`.
- Text block `space-y-4`.
- Heading `text-3xl font-bold text-gray-800`: `Reset Your Password`.
- Description `text-lg text-gray-600`.
- Trust row `flex items-center justify-center space-x-8 text-sm text-gray-500`; icons `text-primary-600 mr-2`; labels `Email Verification`, `Secure Reset`, `Encrypted`.

## Card

- `bg-white rounded-2xl shadow-xl p-8 lg:p-12`.
- Header `text-center mb-8`.
- Logo text `text-3xl font-bold text-primary-600` + `Cart` in `text-gray-800`, wrapper `mb-4`.
- Title `text-2xl font-bold text-gray-800 mb-2`: `Forgot Password?`.
- Description `text-gray-600`: `No worries, we'll send you a reset code`.

## Stepper (step 1)

- Wrapper `flex items-center justify-center mb-8`.
- Circles `w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300`.
- Active: `bg-primary-600 text-white ring-4 ring-primary-100`; icons `text-xs`.
- Inactive: `bg-gray-100 text-gray-400`.
- Connector `w-16 h-0.5 mx-2 transition-all duration-300`; active `bg-primary-600`, inactive `bg-gray-200`.
- Icons: envelope, key, lock.

## Form

- Form `space-y-6`; label `block text-sm font-semibold text-gray-700 mb-2`: `Email Address`.
- Input: `w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all`; placeholder `Enter your email address`; envelope icon absolute left.
- Submit: `w-full bg-primary-600 text-white py-3 px-4 rounded-xl hover:bg-primary-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`.
- Default label `Send Reset Code`; loading label `Sending Code...` with spinner inside `flex items-center justify-center gap-2`.
- Back link row `text-center`; link `inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors`; arrow icon `text-xs`; label `Back to Sign In`.

## Footer

- `text-center mt-8 pt-6 border-t border-gray-100`.
- `p.text-gray-600`: `Remember your password?` + link `text-primary-600 hover:text-primary-700 font-semibold`: `Sign In`.
