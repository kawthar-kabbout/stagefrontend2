import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Menu.css'; 
function Menu({ restaurantId }) {
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Récupération des Données
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/menu/${restaurantId}`);
        setMenu(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du menu:', error);
        setError('Une erreur est survenue lors du chargement du menu.');
      }
    };

    fetchMenu();
  }, [restaurantId]);
  // Fin de Récupération des Données

  if (error) {
    return <div>{error}</div>;
  }

  if (!menu || !Array.isArray(menu) || menu.length === 0) {
    return <div>Aucun menu disponible pour ce restaurant</div>;
  }

  return (
    <>
    <h2>Menu du Restaurant</h2>
    {menu.slice(0, 2).map((item) => (
        <div key={item._id} className="card mb-3">
          <div className="row g-0">
            <div className="col-md-3">
              <img
                src={`/src/assets/${item.imgM}`}
                alt={item.nom}
                className="menu-image"
              />
            </div>
            <div className="col-md-9">
              <div className="card-body">
                <h5 className="card-title">{item.nom}</h5>
                <p className="card-text">
                  <i className="bi bi-list-ul"></i> Ingrédients: {item.ingrediants}
                </p>
                <p className="card-text">
                  <i className="bi bi-currency-dollar"></i> Prix: {item.prix} DT
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
     {menu.length > 2 && (
        <p
          className="text-primary text-decoration-underline"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate(`/allmenu/${restaurantId}`)}
        >
          Voir plus 
        </p>
      )}
      
    </>
  );
}

export default Menu;
