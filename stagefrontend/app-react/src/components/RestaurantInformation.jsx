// src/components/RestaurantInformation.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReviewList from './ReviewList';
import Img from './Img';
import Information from './Information';
import Menu from './Menu';
import '../css/RestaurantInformation.css';
import { AuthContext } from '../context/AuthContext';
import StarRating from './StarRating';
function RestaurantInformation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/RestaurantInformation/${id}`);
        setRestaurant(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du restaurant:', error);
      }
    };

    fetchRestaurant();
  }, [id]);

  const handleAddCommentClick = () => {
    if (user) {
      navigate('/Addcomment', { state: { restaurantId: id, user: user } });
    } else {
      navigate('/login', { state: { restaurantId: id } });
    }
  };

  if (!restaurant) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      <div className="restaurant-information text-center">
        <h1 style={{ marginTop: '20px', fontSize: '2.5rem' }}>{restaurant.nom}</h1>
      </div>
  
      <div id="note" className="d-flex align-items-center justify-content-center" style={{ margin: '20px 0' }}>
        <StarRating rating={restaurant.note} />
        <div className="ms-2">
          <p className="mb-0" style={{ marginLeft: '5px' }}>
            Note: {restaurant.note.toFixed(2)} ({restaurant.nbReviews} Avis)
          </p>
        </div>
      </div>
  
      <div>
        <Img restaurant={restaurant} />
      </div>
  
      <div className="d-flex flex-column flex-md-row align-items-start" style={{ marginTop: '30px', marginLeft: '50px' }}>
        <button id="add-comment-btn" type="button" className="btn btn-primary mb-2 mb-md-0 me-md-2" onClick={handleAddCommentClick}>
          Add Comment
        </button>
  
        {restaurant.instagramUrl && (
          <button
            id="instagram-btn"
            className="social-btn btn btn-outline-secondary mb-2 mb-md-0 me-md-2"
            onClick={() => window.open(restaurant.instagramUrl, '_blank')}
          >
            <svg viewBox="0 0 16 16" className="bi bi-instagram" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.510.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
            </svg>
            <span>Instagram</span>
          </button>
        )}
  
        {restaurant.facebookUrl && (
          <button
            id="facebook-btn"
            className="social-btn btn btn-outline-secondary mb-2 mb-md-0"
            onClick={() => window.open(restaurant.facebookUrl, '_blank')}
          >
            <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
              <path d="M12 2.03998C6.5 2.03998 2 6.52998 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.84998C10.44 7.33998 11.93 5.95998 14.22 5.95998C15.31 5.95998 16.45 6.14998 16.45 6.14998V8.61998H15.19C13.95 8.61998 13.56 9.38998 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9164 21.5878 18.0622 20.3855 19.6099 18.57C21.1576 16.7546 22.0054 14.4456 22 12.06C22 6.52998 17.5 2.03998 12 2.03998Z"></path>
            </svg>
            <span>Facebook</span>
          </button>
        )}
      </div>
  
      <div className="restaurant-information-container d-flex flex-column flex-md-row">
        <div className="menu-column" style={{ flex: 2, padding: '16px', textAlign: 'left' }}>
          <Menu restaurantId={id} />
        </div>
        <div className="information-column" style={{ flex: 1, marginTop: '20px' }}>
          <Information
            className="information-text"
            categorie={restaurant.categorie}
            localisation={restaurant.localisation}
            telephone={restaurant.telephone}
            livraison={restaurant.livraison}
          />
        </div>
      </div>
  
      <div className="review-list-wrapper page-bottom-margin" style={{ marginLeft: '60px', paddingBottom: '80px' }}>
        <button className="like-btn" style={{ marginTop: '20px', marginBottom: '20px' }}>
          <span className="like-btn-left-container">
            <svg fill="white" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path>
            </svg>
            <span className="like-btn-text">Like</span>
          </span>
          <span className="like-btn-count">
            {restaurant.nbReviews}
          </span>
        </button>
  
        <ReviewList reviews={restaurant.reviews} />
      </div>
  
      {/* Footer Section */}
      <footer className="restaurant-footer mt-4">
        <div className="container text-center">
          {/* Footer content can go here */}
        </div>
      </footer>
    </>
  );
}

export default RestaurantInformation;
