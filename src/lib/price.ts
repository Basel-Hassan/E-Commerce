export function formatEgp(
  value: number,
  options?: Intl.NumberFormatOptions,
) {
  return `${value.toLocaleString("en-US", {
    useGrouping: false,
    maximumFractionDigits: 2,
    ...options,
  })} EGP`;
}

export function getCurrentPrice(price: number, priceAfterDiscount?: number) {
  return priceAfterDiscount !== undefined && priceAfterDiscount < price
    ? priceAfterDiscount
    : price;
}

export function getDiscountPercent(price: number, priceAfterDiscount?: number) {
  if (
    price <= 0 ||
    priceAfterDiscount === undefined ||
    priceAfterDiscount >= price
  ) {
    return 0;
  }

  return Math.round(((price - priceAfterDiscount) / price) * 100);
}
