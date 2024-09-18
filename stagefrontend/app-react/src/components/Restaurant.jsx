import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/Restaurant.css'; // Assurez-vous que le chemin est correct
import StarRating from './StarRating';

function Restaurant() {
  const [restaurants, setRestaurants] = useState([]);
  const [visible, setVisible] = useState([]);
  const observer = useRef();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/restaurants');
        setRestaurants(response.data);
        setVisible(new Array(response.data.length).fill(false));
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = entry.target.getAttribute('data-index');
          setVisible(prev => {
            const updated = [...prev];
            updated[index] = true;
            return updated;
          });
          observer.current.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.restaurant-card');
    elements.forEach((el, index) => {
      el.setAttribute('data-index', index);
      observer.current.observe(el);
    });
  }, [restaurants]);

  return (
    <div className="restaurants-list">
      <h2 className="text-center" style={{ paddingTop: "50px", paddingBottom: "40px" }}>
        Explorez notre sélection de restaurants
      </h2>
      <div className="restaurants-container" style={{marginLeft:'50px', marginRight:'50px'}}>
        {restaurants.map((restaurant, index) => (
          <div
            key={restaurant._id}
            className={`restaurant-card ${visible[index] ? 'fade-in' : ''}`}
          >
            <Link to={`/restaurants-information/${restaurant._id}`} className="restaurant-link">
              <img
                src={`/src/assets/${restaurant.img1}`} // Ajustez le chemin de l'image selon votre projet
                alt={restaurant.nom}
                className="restaurant-image1"
              />
              <div className="restaurant-details">
                <h3>{restaurant.nom}</h3>
                <StarRating rating={restaurant.note} /> {/* Affichez le composant StarRating avec la note du restaurant */}
                <p className="restaurant-description">{restaurant.description}</p>
                <p className="restaurant-localisation">Localisation : {restaurant.localisation}</p>
                <p className="author">— {restaurant.nom}</p> {/* Exemple d'affichage de l'auteur */}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Restaurant;
