import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import StarRating from './StarRating'; // Importez le composant StarRating si nécessaire

const ShCategorie = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('query');
  
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/restaurants/${searchTerm}`);
        setRestaurants(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des restaurants:', error);
      }
    };

    if (searchTerm) {
      fetchRestaurants();
    }
  }, [searchTerm]);

  return (
    <div className="container">
      <h1>Search Results for: {searchTerm}</h1>
      <div className="restaurants-list">
        <h2 style={{ paddingTop: "50px", paddingBottom: "40px", textAlign: 'center' }}>Explorez notre sélection de restaurants</h2>
        <div className="restaurants-container" style={{ padding: "20px" }}>
        {restaurants.map((restaurant) => (
            <div
              key={restaurant._id}
              style={{
                border: '2px solid #ddd', // Bordure de 2px avec une couleur gris clair
                borderRadius: '8px', // Coins arrondis
                padding: '10px', // Espacement intérieur
                marginBottom: '20px', // Espacement entre les cartes
                transition: 'box-shadow 0.3s ease', // Effet de transition pour ombre
              }}
            >
              <Link to={`/restaurants-information/${restaurant._id}`} className="restaurant-link">
                <img
                  src={`/src/assets/${restaurant.img1}`} // Assurez-vous d'ajuster le chemin de l'image selon votre projet
                  alt={restaurant.nom}
                  className="restaurant-image1"
                  style={{ width: '250px', height: '200px', alignItems: 'center' }}
                />
                <div className="restaurant-details">
                  <h3>{restaurant.nom}</h3>
                  {/* Utilisez le composant StarRating pour afficher la note du restaurant */}
                  <StarRating rating={restaurant.note} />
                  <p className="restaurant-description">{restaurant.description}</p>
                  <p className="restaurant-localisation">Localisation : {restaurant.localisation}</p>
                  <p className="author">— {restaurant.nom}</p> {/* Exemple d'affichage de l'auteur */}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShCategorie;
