import React from 'react';
import './Navbar.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ username = "Guest" }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:8000/api/v1/users/logout',
        {}, // no body needed
        { withCredentials: true }
      );
      console.log("Logged out successfully");
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="avatar"></div>
        <div className="navbar-title">
          <span>VIRTUAL</span>
          <span>CLASSROOM</span>
        </div>
      </div>
      <div className="navbar-center">
        <h2>Welcome {username} <span role="img" aria-label="wave">👋</span></h2>
      </div>
      <div className="navbar-right">
        <button className="logout-btn" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
