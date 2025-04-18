import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/bg.jpeg'; 
import '../assets/LandingPage.css';
const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div
      className="landing-page"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="vignette-overlay" />
      <div className="content">
        <h1>Welcome to Virtual Classroom</h1>
        <p>Organize, Teach, and Learn with Ease</p>
        <button onClick={handleGetStarted}>Get Started</button>
      </div>
    </div>
  );
};

export default LandingPage;
