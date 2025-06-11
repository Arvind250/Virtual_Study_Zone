import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ username = "Guest" }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:8000/api/v1/users/logout',
        {},
        { withCredentials: true }
      );
      console.log("Logged out successfully");
      navigate('/login');
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 to-slate-700 shadow-md py-3 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo and Title */}
        <div className="flex items-center space-x-3">
          <div className="bg-white rounded-full h-10 w-10 flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white text-sm tracking-wider">VIRTUAL</span>
            <span className="font-bold text-white text-sm tracking-wider">CLASSROOM</span>
          </div>
        </div>

        {/* Center: Welcome Message */}
        <div className="hidden md:block">
          <h2 className="text-white font-semibold">
            Welcome <span className="text-green-300">{username.toUpperCase()}</span> <span role="img" aria-label="wave">👋</span>
          </h2>
        </div>

        {/* Right: Logout Button */}
        <div>
          <button
            onClick={handleLogout}
            className="bg-white text-slate-700 px-4 py-2 rounded-md font-medium hover:bg-red-600 hover:text-white transition-colors duration-200 shadow-sm flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;