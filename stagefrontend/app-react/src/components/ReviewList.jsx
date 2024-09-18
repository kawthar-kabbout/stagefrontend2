import React, { useState } from 'react';
import '../css/ReviewList.css';
import Stars from './Stars';

function ReviewList({ reviews }) {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [expandedReview, setExpandedReview] = useState(null);

  const formatDate = (date) => {
    const currentDate = new Date();
    const reviewDate = new Date(date);
    const diffTime = Math.abs(currentDate - reviewDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return 'Il y a un jour';
    } else if (diffDays < 365) {
      return `Il y a ${diffDays} jours`;
    } else {
      const diffYears = Math.floor(diffDays / 365);
      return `Il y a ${diffYears} an${diffYears > 1 ? 's' : ''}`;
    }
  };

  const handleClick = (reviewId) => {
    setExpandedReview(expandedReview === reviewId ? null : reviewId);
  };

  const trieReviews = reviews.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="review-list left-align" style={{ marginBottom: '20px' }}> {/* Ajout de style pour la marge inférieure */}
    <h3>Avis</h3>
    {trieReviews.length === 0 ? (
      <p>Aucun avis pour ce restaurant</p>
    ) : (
      trieReviews
        .slice(0, showAllReviews ? trieReviews.length : 3)
        .map((review) => (
          <div
            key={review._id}
            className={`review ${expandedReview === review._id ? 'expanded' : ''}`}
            onClick={() => handleClick(review._id)}
          >
            <img
              className="review-image"
              src={review.image ? review.image : '/src/assets/def.png'}
              alt="User"
            />
            <div className="review-details">
              <Stars rating={review.etoiles} />
              <p className="review-name">{review.nom} {review.prenom}</p>
              <p className="review-date">
                {review.date ? formatDate(review.date) : 'Date non disponible'}
              </p>
              <p className="review-comment">
                {expandedReview === review._id
                  ? review.commentaire
                  : `${review.commentaire.substring(0, 800)}...`}
              </p>
            </div>
          </div>
        ))
    )}
    {trieReviews.length > 3 && !showAllReviews && (
      <p
        className="text-primary text-decoration-underline"
        style={{ cursor: 'pointer' }}
        onClick={() => setShowAllReviews(true)}
      >
        Voir plus d'avis
      </p>
    )}
    {trieReviews.length > 3 && showAllReviews && (
      <p
        className="text-primary text-decoration-underline"
        style={{ cursor: 'pointer' }}
        onClick={() => setShowAllReviews(false)}
      >
        Masquer les avis supplémentaires
      </p>
    )}
  </div>
);
}

export default ReviewList;
