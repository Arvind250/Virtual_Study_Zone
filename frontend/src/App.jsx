import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Dashboard from './components/Dashboard/Dashboard';
import LandingPage from './Pages/Landingpage';
import TeacherClassDetails from './components/ClassDetails/TeacherClassDetails';
import StudentClassDetails from './components/ClassDetails/StudentClassDetails';

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
      <Route path="/student/class/:className" element={<StudentClassDetails />} />
      <Route path="/teacher/class/:className" element={<TeacherClassDetails />} />
    </Routes>

    </Router>
  );
};

export default App;