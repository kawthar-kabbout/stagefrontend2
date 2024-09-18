// src/components/Register.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  const { nom, prenom, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/auth/register', formData);
      alert('Registration successful');
      login(res.data.user); // Mise à jour du contexte d'authentification
      if (location.state?.restaurantId) {
        navigate('/Addcomment', { state: { user: res.data.user, restaurantId: location.state.restaurantId } });
      } else {
        navigate('/'); // Redirect to home page if restaurantId is not available
      }
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    }
  };

  return (
    <div className="form" style={{ marginTop: "150px", paddingTop: "50px" }}>
      <form onSubmit={onSubmit}>
        <div className="input-block">
          <input
            placeholder="Enter your First Name"
            name="prenom"
            className="input"
            type="text"
            value={prenom}
            onChange={onChange}
            required
          />
        </div>
        <div className="input-block">
          <input
            placeholder="Enter your Last Name"
            name="nom"
            className="input"
            type="text"
            value={nom}
            onChange={onChange}
            required
          />
        </div>
        <div className="input-block">
          <input
            placeholder="Enter your Email"
            name="email"
            className="input"
            type="text"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="input-block">
          <input
            placeholder="Enter your Password"
            name="password"
            className="input"
            type="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="button-submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
