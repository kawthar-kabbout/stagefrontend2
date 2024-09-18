// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Restaurant from './components/Restaurant';
import AddRestaurant from './components/AddRestaurant';
import './css/App.css';
import { AuthProvider } from './context/AuthContext';
import './bootstrap/js/bootstrap.bundle.min.js';
import './bootstrap/css/bootstrap.css';
import Search from './components/Search';
import Home from './components/Home';
import Login from './components/Login';
import RestaurantInformation from './components/RestaurantInformation';
import ShCategorie from './components/ShCategorie';
import Register from './components/Register';
import AllMenu from './components/AllMenu';
import Addcomment from './components/Addcomment';
import Profile from './components/Profile';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate(); // Utilisation de useNavigate pour la redirection

  const showNav = location.pathname === '/' || location.pathname.startsWith('/allmenu') || location.pathname === '/add-restaurant' || location.pathname === '/shcategorie' || location.pathname.startsWith('/restaurants-information');

  const handleLogout = () => {
    logout(); // Appelle la fonction de déconnexion du contexte
    window.location.href = '/'; // Redirige l'utilisateur vers la page de connexion après la déconnexion
  };

  const handleLoginClick = () => {
    navigate('/login'); // Redirige vers la route /login
  };
  
  return  (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Mon App
        </Link>
  
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>



    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Accueil
          </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-restaurant">
                Ajouter Restaurant
              </Link>
            </li>
          </ul>
  
          <div className="d-flex align-items-center mx-3">
        <Search />
      </div>

        </div>
  
        <div className="d-flex align-items-center ms-auto">
          {user ? (
            <>
              <span
                className="navbar-text me-3"
                style={{ fontSize: '0.875rem' }}
              >
                {user.prenom} {user.nom}
              </span>
              <button id="logout-button" onClick={handleLogout} className="Btn">
                <div className="sign">
                  <svg viewBox="0 0 512 512">
                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                  </svg>
                </div>
                <div className="text">Logout</div>
              </button>
            </>
          ) : (
            <button id="sign-button" onClick={handleLoginClick}>
              <div className="sign">
                <svg viewBox="0 0 512 512">
                  <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"></path>
                </svg>
              </div>
              <div className="text">Login</div>
            </button>
          )}
        </div>
      </div>
    </nav>
  )
  
  
}
function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-restaurant" element={<AddRestaurant />} />
            <Route path="/restaurants-information/:id" element={<RestaurantInformation />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/Addcomment" element={<Addcomment />} />
            <Route path="/shcategorie" element={<ShCategorie />} />
            <Route path="/allmenu/:restaurantId" element={<AllMenu />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;











