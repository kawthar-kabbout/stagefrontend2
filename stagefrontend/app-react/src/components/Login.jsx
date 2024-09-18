// src/components/Login.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../css/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/auth/login', formData);
      alert('Login successful');
      login(res.data.user); // Mise à jour du contexte d'authentification
  
      if (location.state?.restaurantId) {
        navigate('/Addcomment', { state: { user: res.data.user, restaurantId: location.state.restaurantId } });
      } else {
        navigate('/'); // Redirect to home page if restaurantId is not available
      }
    } catch (err) {
      console.error(err);
      alert('Invalid email or password');
    }
  };
  
  const handleRegisterClick = () => {
    navigate('/register', { state: { restaurantId: location.state?.restaurantId } });
  };

  return (
    <div className="form" style={{ marginTop: "150px", paddingTop: "50px" }}>
      <form onSubmit={onSubmit}>
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
        
        <button type="submit" className="button-submit">Sign In</button>
        <p className="p" onClick={handleRegisterClick}>
          Don't have an account? <span className="span">Sign Up</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
