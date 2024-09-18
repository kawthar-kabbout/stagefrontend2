// src/components/Profile.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';
import '../css/Profile.css';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="profile">
      <p>{user.prenom} {user.nom}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
