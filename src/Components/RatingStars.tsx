import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

interface RatingStarsProps {
  value: number;
}

export default function RatingStars({ value }: RatingStarsProps) {
  const roundedValue = Math.round(value);
  return (
    <span className="inline-flex items-center text-amber-400" aria-label={`Rated ${value.toFixed(1)} out of 5`}>
      {Array.from({ length: 5 }, (_, index) => index < roundedValue
        ? <AiFillStar key={index} aria-hidden="true" />
        : <AiOutlineStar key={index} aria-hidden="true" />)}
    </span>
  );
}
