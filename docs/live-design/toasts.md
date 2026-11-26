# Live Toasts (`docs/live-design/toasts.md`)

Source: live site `https://ecommerce-route-ashen.vercel.app`, captured at `1920` and `390`. Raw capture data is in `toasts.json`.

## Library and shared design

- Live uses `react-toastify`; local must use existing `sonner` with no new dependencies.
- Container: `<section class="Toastify" aria-live="polite" aria-atomic="false" aria-relevant="additions text" aria-label="Notifications Alt+T"></section>`.
- Toast wrapper: `Toastify__toast-container Toastify__toast-container--top-right`.
- Toast element: `role="alert"`, `tabindex="0"`, `data-in="true"`, `Toastify__toast Toastify__toast-theme--light Toastify__toast--<type> Toastify__toast--close-on-click`.
- Added-phase classes add `Toastify--animate Toastify__bounce-enter--top-right`; settled classes remove them.
- Icon wrapper: `Toastify__toast-icon Toastify--animate-icon Toastify__zoom-enter`, `22px x 22px`.
- Close button: `<button class="Toastify__close-button Toastify__close-button--light" type="button" aria-label="close">…</button>`, `14px x 16px`.
- Progress bar: `Toastify__progress-bar--wrp` with `animation-duration: 3000ms`; total observed visible time is about `4.4s` including enter/exit.
- No confirmation toast (`Confirm` / `Cancel`) was observed for any destructive action.

### CSS variables from live `:root`

- `--toastify-color-light: #fff`
- `--toastify-color-dark: #121212`
- `--toastify-color-info: #3498db`
- `--toastify-color-success: #07bc0c`
- `--toastify-color-warning: #f1c40f`
- `--toastify-color-error: hsl(6, 78%, 57%)`
- `--toastify-color-transparent: rgba(255, 255, 255, .7)`
- `--toastify-icon-color-success: #07bc0c`
- `--toastify-icon-color-error: hsl(6, 78%, 57%)`
- `--toastify-text-color-light: #757575`
- `--toastify-text-color-dark: #fff`
- `--toastify-font-family: sans-serif`
- `--toastify-z-index: 9999`
- `--toastify-toast-width: 320px`
- `--toastify-toast-background: #fff`
- `--toastify-toast-min-height: 64px`
- `--toastify-toast-max-height: 800px`
- `--toastify-toast-padding: 14px`
- `--toastify-toast-bd-radius: 6px`
- `--toastify-toast-shadow: 0px 4px 12px rgba(0, 0, 0, .1)`
- `--toastify-color-progress-success: #07bc0c`
- `--toastify-color-progress-error: hsl(6, 78%, 57%)`

### Position and computed styles

- `1920`: toast rect `x=1584 y=16 width=320 height=64`; container rect `x=1584 y=16 width=320 height=80`.
- `390`: toast rect `x=0 y=0 width=390 height=64`; container rect `x=0 y=0 width=390 height=64`.
- Toast computed: `position: relative`, `width: 320px` at 1920 / `390px` at 390, `padding: 14px`, `margin: 0px 0px 16px` at 1920 / `0px` at 390, `background: rgb(255,255,255)`, `color: rgb(117,117,117)`, `display: flex`, `opacity: 1`.
- Container computed: `position: fixed`, `top: 16px` / `0px`, `right: 16px`, `left: 1584px` / `0px`, `width: 320px` / `390px`, `display: flex`.
- Added rect at 1920 includes `transform: matrix(1,0,0,1,3000,0)`; use settled rect above.

### Enter animation

- `animationName: Toastify__bounceInRight`, `animationDuration: 0.5s`, `animationTimingFunction: ease`, `animationFillMode: both`.
- Keyframes:
  - `0%, 60%, 75%, 90%, 100%`: `animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1)`
  - `0%`: `opacity: 0; transform: translate3d(3000px, 0px, 0px)`
  - `60%`: `opacity: 1; transform: translate3d(-25px, 0px, 0px)`
  - `75%`: `transform: translate3d(10px, 0px, 0px)`
  - `90%`: `transform: translate3d(-5px, 0px, 0px)`
  - `100%`: `transform: none`

## Action: wrong-password login

- Route: `/login`.
- Text: `Incorrect email or password`.
- Type: `error`.
- Durations: `4392ms` at 1920, `4390ms` at 390.
- Role: `alert`.
- OuterHTML (settled, text substituted):
  ```html
  <div id="1" tabindex="0" data-in="true" class="Toastify__toast Toastify__toast-theme--light Toastify__toast--error Toastify__toast--close-on-click" role="alert" data-toast-capture-id="toast-1"><div class="Toastify__toast-icon Toastify--animate-icon Toastify__zoom-enter"><svg viewBox="0 0 24 24" width="100%" height="100%" fill="var(--toastify-icon-color-error)"><path d="M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"></path></svg></div>Incorrect email or password<button class="Toastify__close-button Toastify__close-button--light" type="button" aria-label="close"><svg aria-hidden="true" viewBox="0 0 14 16"><path fill-rule="evenodd" d="M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"></path></svg></button><div class="Toastify__progress-bar--wrp" data-hidden="false"><div class="Toastify__progress-bar--bg Toastify__progress-bar-theme--light Toastify__progress-bar--error"></div><div role="progressbar" aria-hidden="false" aria-label="notification timer" class="Toastify__progress-bar Toastify__progress-bar--animated Toastify__progress-bar-theme--light Toastify__progress-bar--error" style="animation-duration: 3000ms; animation-play-state: running;"></div></div></div>
  ```
- Computed styles: shared styles above; `background: rgb(255,255,255)`, `color: rgb(117,117,117)`, icon color `rgb(117,117,117)` with error SVG fill var.
- Position: top-right at 1920, full-width top at 390.
- Animation: shared `Toastify__bounceInRight` above.

## Action: login success

- Route: `/` after sign-in.
- Text: `Login successful`.
- Type: `success`.
- Duration: `4436ms` at 1920.
- 390 capture: no toast observed after trigger; use shared 390 position/styles from other toasts.
- Role: `alert`.
- OuterHTML (settled):
  ```html
  <div id="1" tabindex="0" data-in="true" class="Toastify__toast Toastify__toast-theme--light Toastify__toast--success Toastify__toast--close-on-click" role="alert" data-toast-capture-id="toast-1"><div class="Toastify__toast-icon Toastify--animate-icon Toastify__zoom-enter"><svg viewBox="0 0 24 24" width="100%" height="100%" fill="var(--toastify-icon-color-success)"><path d="M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"></path></svg></div>Login successful<button class="Toastify__close-button Toastify__close-button--light" type="button" aria-label="close"><svg aria-hidden="true" viewBox="0 0 14 16"><path fill-rule="evenodd" d="M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"></path></svg></button><div class="Toastify__progress-bar--wrp" data-hidden="false"><div class="Toastify__progress-bar--bg Toastify__progress-bar-theme--light Toastify__progress-bar--success"></div><div role="progressbar" aria-hidden="false" aria-label="notification timer" class="Toastify__progress-bar Toastify__progress-bar--animated Toastify__progress-bar-theme--light Toastify__progress-bar--success" style="animation-duration: 3000ms; animation-play-state: running;"></div></div></div>
  ```
- Computed styles: shared styles above; `background: rgb(255,255,255)`, `color: rgb(117,117,117)`, icon color `rgb(117,117,117)` with success SVG fill var.
- Position: top-right at 1920; inferred full-width top at 390 from other toasts.
- Animation: shared `Toastify__bounceInRight` above.

## Action: duplicate registration

- Route: `/signup`.
- Text: `Validation errors`.
- Type: `error`.
- Durations: `4401ms` at 1920, `4403ms` at 390.
- Role: `alert`.
- OuterHTML (settled): same error structure as wrong-password login with text `Validation errors` and `id="1"`.
- Computed styles: shared error styles above.
- Position: top-right at 1920, full-width top at 390.
- Animation: shared `Toastify__bounceInRight` above.

## Action: forgot password

- Route: `/forget-password` live (`/forgot-password` local).
- Text: `Reset code sent to your email!`.
- Type: `success`.
- Durations: `4434ms` at 1920, `4417ms` at 390.
- Role: `alert`.
- OuterHTML (settled): same success structure as login success with text `Reset code sent to your email!` and `id="1"`.
- Computed styles: shared success styles above.
- Position: top-right at 1920, full-width top at 390.
- Animation: shared `Toastify__bounceInRight` above.

## Actions with no live toast observed

Each row below was triggered with the toast observer installed; no `react-toastify` element was added. Local code should not show a success toast for these actions.

- Add from product card: no toast observed after trigger.
- Add from product details: no toast observed after trigger.
- Add to wishlist from card/details: no toast observed after trigger.
- Remove from wishlist on details page: no toast observed after trigger.
- Remove from wishlist row: no toast observed after trigger.
- Move wishlist item to cart: no `Add to Cart` action exists; live row shows `View Cart` link, so no toast.
- Cart quantity plus: no toast observed after trigger.
- Cart quantity minus: no toast observed after trigger.
- Remove cart item: no toast observed after trigger; no confirmation toast.
- Clear cart: no toast observed after trigger; no confirmation toast.
- Promo code apply: no toast observed after trigger.
- Profile update: no toast observed after trigger after a valid changed name was submitted.
- Address add: no toast observed after trigger.
- Address delete: no toast observed after trigger.
- Newsletter subscribe: no toast observed after trigger.
- Social login button: no toast observed after trigger.

## Local implementation notes

- Replace current `top-center` Toaster with `top-right`, `320px` width at desktop, full width at 390, white background, `--toast-text` token (`#757575`), and close button.
- Use one `notify` helper with `success` / `error` / `confirm` and route every action through it.
- Since live has no toasts for cart/wishlist/profile/address/promo/newsletter/social actions, remove or suppress current local success/error toasts for those paths unless an API error needs to be surfaced.
- Keep `sonner` dependency; do not install `react-toastify`.

## Local comparison

Captured local `login-wrong` toast from `http://localhost:3000/login` at both widths after the rebuild.

- `1920`: local rect `x=1584 y=16 width=320 height=64`; live rect `x=1584 y=16 width=320 height=64`.
- `390`: local rect `x=0 y=0 width=390 height=64`; live rect `x=0 y=0 width=390 height=64`.
- Local computed: `background: rgb(255,255,255)`, `color: rgb(117,117,117)`, `padding: 14px`, `border: 0px none`, `border-radius: 6px`, `box-shadow: rgba(0,0,0,0.1) 0px 4px 12px`, `font-family: sans-serif`; these match live computed values.
- Local enter animation uses the same `toastify-bounce-in-right` keyframes and `500ms` duration.
- Local text for wrong login is `Incorrect email or password`; login success is `Login successful`; forgot password is `Reset code sent to your email!`; duplicate registration error is `Validation errors`.

Remaining differences:

- Local uses `sonner` DOM (`li[data-sonner-toast]`) and Lucide icons; live uses `react-toastify` DOM (`div.Toastify__toast`) and its own SVG icons.
- Live close button is a `14x16` SVG; local close button is a Lucide X scaled to `14x16`.
- Live has `Toastify__progress-bar--wrp` with a `3000ms` progress animation; local has no equivalent progress bar.
- Live total visible durations vary `4390–4436ms`; local is fixed at `4400ms`.
- Live `login-success` at `390` was not captured; local uses the shared 390 position/styles verified by other toasts.
- No live confirmation toast was found, so `notify.confirm` is available but unused.
