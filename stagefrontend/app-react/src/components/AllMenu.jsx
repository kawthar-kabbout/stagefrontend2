import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/Menu.css'; 

function AllMenu() {
  const { restaurantId } = useParams();
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState(null);

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

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
    <h2 style={{ marginTop:'20px' ,fontSize: '2.5rem', textAlign: 'center' }}>Menu du Restaurant</h2>
      <div className="menu-container" style={{margin:'50px',padding:'50px'}}>
        <div className="row row-cols-1 row-cols-md-5 g-4" >
          {menu.map((item) => (
            <div key={item._id} className="col">
              <div className="card h-100">
                <img 
                  src={`/src/assets/${item.imgM}`} 
                  className="card-img-top" 
                  alt={item.nom} 
                />
                <div className="card-body">
                  <h5 className="card-title">{item.nom}</h5>
                  <p className="card-text">
                    <i className="bi bi-list-ul"></i> Ingrédients: {item.ingrediants}
                  </p>
                  <p className="card-text">
  <i className="bi bi-currency-dollar "   style={{ color: '#ac7b70' }} ></i> Prix: {item.prix} DT
</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}


export default AllMenu;
