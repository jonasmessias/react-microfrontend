import { StarIcon } from '../Icons';

interface RatingProps {
  rating: number;
  reviewCount: number;
}

export function Rating({ rating, reviewCount }: RatingProps) {
  const filledStars = Math.floor(rating);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1" role="img" aria-label={`Rating: ${rating} stars`}>
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 ${index < filledStars ? 'text-[#ffa541]' : 'text-gray-300'}`}
          >
            <StarIcon />
          </div>
        ))}
      </div>
      <span className="text-sm text-microshop-link hover:text-microshop-link-hover">
        {rating.toFixed(1)}
      </span>
      <span className="text-xs text-gray-600">({reviewCount.toLocaleString()})</span>
    </div>
  );
}
