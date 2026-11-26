import {
  formatEgp,
  getCurrentPrice,
  getDiscountPercent,
} from "@/lib/price";

const priceStyles = {
  card: {
    current: "text-lg font-bold text-gray-800",
    discounted: "text-lg font-bold text-primary-600",
    original: "text-sm text-gray-500 line-through ml-2",
  },
  detail: {
    current: "text-3xl font-bold text-gray-900",
    discounted: "text-3xl font-bold text-primary-600",
    original: "text-lg text-gray-500 line-through ml-2",
  },
  compact: {
    current: "text-base font-semibold text-gray-900",
    discounted: "text-base font-semibold text-primary-600",
    original: "text-sm text-gray-500 line-through ml-2",
  },
  wishlist: {
    current: "font-semibold text-gray-900",
    discounted: "font-semibold text-gray-900",
    original: "text-sm text-gray-400 line-through",
  },
} as const;

export function Price({
  price,
  priceAfterDiscount,
  size = "card",
  className = "",
}: {
  price: number;
  priceAfterDiscount?: number;
  size?: keyof typeof priceStyles;
  className?: string;
}) {
  const currentPrice = getCurrentPrice(price, priceAfterDiscount);
  const hasDiscount = currentPrice < price;
  const styles = priceStyles[size];

  if (size === "wishlist") {
    return (
      <>
        <div className={hasDiscount ? styles.discounted : styles.current}>
          {formatEgp(currentPrice)}
        </div>
        {hasDiscount ? (
          <div className={styles.original}>{formatEgp(price)}</div>
        ) : null}
      </>
    );
  }

  if (size === "card") {
    return (
      <div className={className}>
        <span className={hasDiscount ? styles.discounted : styles.current}>
          {formatEgp(currentPrice)}
        </span>
        {hasDiscount ? (
          <span className={styles.original}>{formatEgp(price)}</span>
        ) : null}
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-baseline ${className}`}>
      <span className={hasDiscount ? styles.discounted : styles.current}>
        {formatEgp(currentPrice)}
      </span>
      {hasDiscount ? (
        <span className={styles.original}>{formatEgp(price)}</span>
      ) : null}
    </div>
  );
}

export function DiscountBadge({
  price,
  priceAfterDiscount,
  className = "",
}: {
  price: number;
  priceAfterDiscount?: number;
  className?: string;
}) {
  const percent = getDiscountPercent(price, priceAfterDiscount);

  if (!percent) return null;

  return (
    <span
      className={`bg-red-500 text-white text-xs px-2 py-1 rounded ${className}`}
    >
      -{percent}%
    </span>
  );
}

