'use client';

import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface StarRatingProps {
  onRatingChange?: (rating: number) => void;
}

export default function StarRating({ onRatingChange }: StarRatingProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    // Only call onRatingChange when rating actually changes
    // and when it's not the initial render (rating > 0)
    if (onRatingChange && rating > 0) {
      console.log('Rating changed, notifying parent:', rating);
      onRatingChange(rating);
    }
  }, [rating]); // Remove onRatingChange from dependencies

  const handleClick = (index: number) => {
    // Only update if there's a change or not fixed yet
    if (rating !== index || !isFixed) {
      console.log('Star clicked, setting rating to:', index);
      setRating(index);
      setIsFixed(true);
      
      // Call onRatingChange directly here instead of relying on the useEffect
      if (onRatingChange) {
        onRatingChange(index);
      }
    }
  };

  const starVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.2, rotate: [0, 15, -15, 0], transition: { duration: 0.3 } },
    selected: { scale: 1.1, y: -3 }
  };

  return (
    <div className="mb-4 flex flex-col items-center">
      <p className="mb-2 text-sm font-medium text-gray-700">Rate your experience:</p>
      <div className="flex space-x-2">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <motion.div
              key={index}
              variants={starVariants}
              initial="initial"
              animate={rating >= starValue ? "selected" : "initial"}
              whileHover={!isFixed ? "hover" : undefined}
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => !isFixed && setHover(starValue)}
              onMouseLeave={() => !isFixed && setHover(0)}
              className="cursor-pointer"
            >
              <FaStar
                size={30}
                color={
                  (hover || rating) >= starValue
                    ? '#F59E0B' // Amber color for filled stars
                    : '#D1D5DB' // Gray for empty stars
                }
                className="transition-colors duration-200"
              />
            </motion.div>
          );
        })}
      </div>
      {rating > 0 && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-gray-500"
        >
          You rated {rating} {rating === 1 ? 'star' : 'stars'}!
        </motion.p>
      )}
    </div>
  );
}
