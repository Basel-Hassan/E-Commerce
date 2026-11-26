export const authInputClass =
  "w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all";

export const authPasswordInputClass =
  "w-full px-4 py-3 pl-12 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all";

export const authLabelClass =
  "block text-sm font-semibold text-gray-700 mb-2";

export const authLabelInlineClass =
  "block text-sm font-semibold text-gray-700";

export const authButtonClass =
  "w-full bg-primary-600 text-white py-3 px-4 rounded-xl hover:bg-primary-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed";

export const authErrorClass = "mt-1 text-sm text-red-500";

export const registerInputClass = "form-control";

export const registerButtonClass =
  "flex rounded-md px-4 py-2 font-semibold justify-center bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed w-full transition-colors";

export const authGlobalCss = `
:where(.btn) {
  border-radius: var(--radius-lg);
  background-color: var(--color-gray-200);
  padding-inline: calc(var(--spacing) * 4);
  padding-block: calc(var(--spacing) * 2);
  font-weight: 600;
  color: var(--color-gray-900);
  transition: color .2s, background-color .2s, border-color .2s, outline-color .2s, text-decoration-color .2s, fill .2s, stroke .2s;
}
@media (hover: hover) {
  :where(.btn):hover {
    background-color: var(--color-gray-300);
  }
}
:where(.form-control) {
  border-radius: var(--radius-md);
  border-style: solid;
  border-width: 1px;
  border-color: color-mix(in oklab, var(--color-gray-400) 40%, transparent);
  padding-inline: calc(var(--spacing) * 3);
  padding-block: calc(var(--spacing) * 2);
  background-color: transparent;
  width: 100%;
}
:where(.form-control):focus {
  border-color: var(--color-primary-600);
  outline: none;
}
`;
