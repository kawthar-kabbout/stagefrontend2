import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import StarAddComment from './StarAddComment';
import '../css/AddComment.css';

const Addcomment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;
  const restaurantId = location.state?.restaurantId;

  const [formData, setFormData] = useState({
    nom: user?.nom || '',
    prenom: user?.prenom || '',
    commentaire: '',
    etoiles: 0
  });

  const { nom, prenom, commentaire, etoiles } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:3000/api/add-review/${restaurantId}`, formData);
      console.log(res.data);
      alert('Review added successfully');
      navigate(`/restaurants-information/${restaurantId}`, { state: { nom, prenom } });
    } catch (err) {
      console.error(err);
      alert('Failed to add review');
    }
  };

  return (
    <div className="add-comment-container">
      {user ? (
        <div className="comment-form-wrapper">
          <h2 className="form-title">Add a Comment</h2>
          <form onSubmit={onSubmit} className="comment-form">
            <div className="form-group star-group">
              <StarAddComment rating={etoiles} setRating={(rating) => setFormData({ ...formData, etoiles: rating })} />
            </div>
            <div className="form-group text-group">
              <label htmlFor="commentaire" className="form-label">Comment:</label>
              <textarea
                id="commentaire"
                name="commentaire"
                value={commentaire}
                onChange={onChange}
                required
                className="form-textarea"
              />
            </div>
            <button type="submit" className="submit-button">Submit Review</button>
          </form>
        </div>
      ) : (
        <p className="no-user-message">No user data available</p>
      )}
    </div>
  );
};

export default Addcomment;
