// src/components/StarAddComment.js
import React from 'react';
import '../css/StarAddComment.css'; // Assurez-vous que ce chemin est correct

const StarAddComment = ({ rating, setRating }) => {
  const handleChange = (value) => {
    setRating(value === rating ? 0 : value);
  };

  return (
    <div className="star-rating-add-comment">
      <input 
        type="radio" 
        id="star5" 
        name="rating" 
        value="5" 
        checked={rating === 5} 
        onChange={() => handleChange(5)} 
      />
      <label htmlFor="star5" title="5 stars"></label>
      <input 
        type="radio" 
        id="star4" 
        name="rating" 
        value="4" 
        checked={rating === 4} 
        onChange={() => handleChange(4)} 
      />
      <label htmlFor="star4" title="4 stars"></label>
      <input 
        type="radio" 
        id="star3" 
        name="rating" 
        value="3" 
        checked={rating === 3} 
        onChange={() => handleChange(3)} 
      />
      <label htmlFor="star3" title="3 stars"></label>
      <input 
        type="radio" 
        id="star2" 
        name="rating" 
        value="2" 
        checked={rating === 2} 
        onChange={() => handleChange(2)} 
      />
      <label htmlFor="star2" title="2 stars"></label>
      <input 
        type="radio" 
        id="star1" 
        name="rating" 
        value="1" 
        checked={rating === 1} 
        onChange={() => handleChange(1)} 
      />
      <label htmlFor="star1" title="1 star"></label>
    </div>
  );
};

export default StarAddComment;
