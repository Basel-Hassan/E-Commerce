import { FaRegStar, FaStar, FaStarHalfStroke } from "react-icons/fa6";

export function RatingStars({
  value,
  className = "",
  iconClassName = "h-5 w-5 shrink-0",
}: {
  value: number;
  className?: string;
  iconClassName?: string;
}) {
  const rounded = Math.round(value * 2) / 2;

  return (
    <div className={`flex items-center text-yellow-400 ${className}`}>
      {Array.from({ length: 5 }).map((_, index) => {
        const position = index + 1;
        if (rounded >= position) {
          return <FaStar key={index} className={iconClassName} />;
        }
        if (rounded >= position - 0.5) {
          return <FaStarHalfStroke key={index} className={iconClassName} />;
        }
        return <FaRegStar key={index} className={iconClassName} />;
      })}
    </div>
  );
}
