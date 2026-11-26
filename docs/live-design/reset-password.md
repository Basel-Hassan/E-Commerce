# Reset Password (live step 3 on `/forget-password`)

Our route: `/reset-password?email=...`. Live has no standalone route; markup comes from JS chunk `323f9412a2633997.js`.

## Shell / card / aside

- Same shell as forgot-password: `container py-16 mx-auto px-4`, two columns from `lg`, `max-w-7xl`.
- Same Reset Aside (lock illustration + `Reset Your Password`).
- Same card: `bg-white rounded-2xl shadow-xl p-8 lg:p-12`; logo; header `text-center mb-8`.
- Title `text-2xl font-bold text-gray-800 mb-2`: `Create New Password`.
- Description `text-gray-600`: `Your new password must be different from previous passwords` (note plural "passwords").

## Stepper (step 3)

- Same stepper classes.
- Steps 1 and 2 completed: `bg-primary-600 text-white` + check icons.
- Step 3 active: `bg-primary-600 text-white ring-4 ring-primary-100` + lock icon.
- Both connectors `bg-primary-600`; `w-16 h-0.5 mx-2`.

## Form

- Form `space-y-6`.
- Labels `block text-sm font-semibold text-gray-700 mb-2`.
- First label `New Password`; input `w-full px-4 py-3 pl-12 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all`; placeholder `Enter new password`.
- Left icon lock; right eye toggle `absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600`.
- No strength bar, no helper text, no extra requirements text.
- Second label `Confirm Password`; same input classes; placeholder `Confirm new password`; lock icon + eye toggle.
- Submit same primary auth button; label `Reset Password`; no default icon.
- No card footer on reset step.

## Assets

- No new raster assets.
