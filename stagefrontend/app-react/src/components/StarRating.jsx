import React from 'react';
import '../css/StarRating.css'; // Import your CSS file for styling

const StarRating = ({ rating }) => {
  // Round rating to nearest half
  const roundedRating = Math.round(rating * 2) / 2;

  return (
    <div className="rating1">
      {[1, 2, 3, 4, 5].map((star, index) => {
        const isFilled = roundedRating >= star;
        const isHalfFilled = roundedRating >= star - 0.5 && roundedRating < star;

        return (
          <label key={index} className={isFilled ? 'filled' : isHalfFilled ? 'half-filled' : ''}>
            <input type="radio" name="rating" value={star} />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <defs>
                <clipPath id={`half-clip-${index}`}>
                  <rect x="0" y="0" width="50%" height="100%" />
                </clipPath>
              </defs>
              <path
                d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                className={isHalfFilled ? 'half' : ''}
                style={isHalfFilled ? { clipPath: `url(#half-clip-${index})` } : {}}
              />
              {isHalfFilled && (
                <path
                  d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                  className="unfilled"
                />
              )}
            </svg>
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
