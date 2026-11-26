# Verify Reset Code (live step 2 on `/forget-password`)

Our route: `/verify-reset-code?email=...`. Live has no standalone route; markup comes from JS chunk `323f9412a2633997.js`.

## Shell / card / aside

- Same shell as forgot-password: `container py-16 mx-auto px-4`, two columns from `lg`, `max-w-7xl`.
- Same Reset Aside (lock illustration + `Reset Your Password`).
- Same card: `bg-white rounded-2xl shadow-xl p-8 lg:p-12`; logo; header `text-center mb-8`.
- Title `text-2xl font-bold text-gray-800 mb-2`: `Check Your Email`.
- Description `text-gray-600`: `Enter the 6-digit code sent to ${email}`.

## Stepper (step 2)

- Same stepper classes as forgot-password.
- Step 1 completed: `bg-primary-600 text-white` + check icon.
- Step 2 active: `bg-primary-600 text-white ring-4 ring-primary-100` + key icon.
- Step 3 inactive: `bg-gray-100 text-gray-400` + lock icon.
- Connector 1 `bg-primary-600`, connector 2 `bg-gray-200`; both `w-16 h-0.5 mx-2`.

## Form

- Form `space-y-6`.
- Label `block text-sm font-semibold text-gray-700 mb-2`: `Verification Code`.
- Input: `w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all text-center text-2xl tracking-[0.5em] font-mono`.
- Input icon: shield-halved (use `ShieldCheck`) absolute left, `text-gray-400`.
- No helper text below input.
- Resend row between field and submit: `text-center`; `p.text-sm.text-gray-500`:
  `Didn't receive the code?` + button `text-primary-600 hover:text-primary-700 font-semibold transition-colors` label `Resend Code`.
- Submit same primary auth button; default `Verify Code`, loading `Verifying...` with spinner.
- Change email row `text-center`; button `inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 font-medium transition-colors`; arrow-left `text-xs`; label `Change email address`.
- No card footer on verify step.

## Assets

- No new raster assets.
