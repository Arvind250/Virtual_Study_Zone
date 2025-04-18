import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Dashboard from './components/Dashboard/Dashboard'; // Adjust the path as needed
import LandingPage from './Pages/Landingpage';
import ClassDetails from './components/ClassDetails/TeacherClassDetails';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/teacher" element={<Dashboard />} />
      <Route path="/dashboard/student" element={<Dashboard />} />
      <Route path="/teacher/:className" element={<ClassDetails/>} />

    </Routes>

    </Router>
  );
};

export default App;