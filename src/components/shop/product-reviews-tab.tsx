import { FaStar } from "react-icons/fa6";

import { RatingStars } from "./rating-stars";

function getRatingPercentage(star: number, rating: number) {
  const rounded = Math.round(rating);

  if (star === rounded) return 60;
  if (star === rounded - 1 || star === rounded + 1) return 25;
  return 5;
}

export function ProductReviewsTab({
  rating,
  ratingsQuantity,
}: {
  rating: number;
  ratingsQuantity: number;
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
        <div className="text-center">
          <div className="text-5xl font-bold text-gray-900 mb-2">{rating}</div>
          <RatingStars
            value={rating}
            className="justify-center"
            iconClassName="h-4 w-4 shrink-0"
          />
          <p className="text-sm text-gray-500 mt-2">
            Based on {ratingsQuantity} reviews
          </p>
        </div>

        <div className="flex-1 w-full">
          {[5, 4, 3, 2, 1].map((star) => {
            const percentage = getRatingPercentage(star, rating);

            return (
              <div key={star} className="flex items-center gap-3 mb-2">
                <span className="text-sm text-gray-600 w-8">
                  {star} star
                </span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-10">
                  {percentage}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="text-center py-8">
          <FaStar className="mx-auto mb-3 text-4xl text-gray-300" />
          <p className="text-gray-500">
            Customer reviews will be displayed here.
          </p>
          <button
            type="button"
            className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
          >
            Write a Review
          </button>
        </div>
      </div>
    </div>
  );
}
