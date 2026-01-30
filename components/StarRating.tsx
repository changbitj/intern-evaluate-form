import React from 'react';
import { Star } from 'lucide-react';
import { MAX_STARS, STAR_SIZE } from '../constants';

/**
 * Props for the StarRating component
 */
interface StarRatingProps {
  score: number;
  onChange: (score: number) => void;
  disabled?: boolean;
}

/**
 * StarRating component for displaying and selecting ratings
 * @param props - Component props
 * @returns StarRating component
 */
export const StarRating: React.FC<StarRatingProps> = ({ score, onChange, disabled = false }) => {
  const stars = Array.from({ length: MAX_STARS }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          disabled={disabled}
          onClick={() => onChange(star)}
          className={`focus:outline-none transition-colors duration-200 ${disabled ? 'cursor-default' : 'cursor-pointer hover:scale-110'
            }`}
        >
          <Star
            size={STAR_SIZE}
            className={`${star <= score
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-100 text-gray-300'
              }`}
          />
        </button>
      ))}
      <span className="ml-2 text-sm font-medium text-gray-500 w-6">
        {score > 0 ? score : '-'}
      </span>
    </div>
  );
};