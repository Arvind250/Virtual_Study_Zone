import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import ClassCard from '../Classcard/Classcard';
import './Dashboard.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const [classes, setClasses] = useState([]);
  const [newClassName, setNewClassName] = useState('');
  const [showJoinInput, setShowJoinInput] = useState(false);
  const [joinClassId, setJoinClassId] = useState('');
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('Guest');
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const userRole = localStorage.getItem('role'); // Retrieve role from localStorage
    const userUsername = localStorage.getItem('username'); // Retrieve username from localStorage
    setRole(userRole);
    setUsername(userUsername);

    // If user is a teacher, fetch teacher's data
    if (userRole === 'teacher') {
      fetchTeacherData();
    } 
    // If user is a student, fetch student's data
    else if (userRole === 'student') {
      fetchStudentData();
    }
  }, []);

  const fetchTeacherData = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/dashboard/teacher', {
        withCredentials: true,
      });
      console.log("Fetched teacher data:", res.data);
      setClasses(res.data.data.classes);
    } catch (err) {
      console.error("Error fetching teacher data:", err);
    }
  };

  const fetchStudentData = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/dashboard/student', {
        withCredentials: true,
      });
      console.log("Fetched student data:", res.data);
      setClasses(res.data.data.classes);
    } catch (err) {
      console.error("Error fetching student data:", err);
    }
  };

  const handleCreateClass = async () => {
    if (!newClassName.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post(
        'http://localhost:8000/api/v1/classes/create',
        { className: newClassName.trim() },
        { withCredentials: true }
      );

      setClasses(prev => [...prev, res.data.data]);
      setNewClassName('');
    } catch (error) {
      console.error('Error creating class:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinClass = async () => {
    if (!joinClassId.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post(
        'http://localhost:8000/api/v1/classes/join',
        { classId: joinClassId.trim() },
        { withCredentials: true }
      );

      setClasses(prev => [...prev, res.data.data.class]);
      setJoinClassId('');
      setShowJoinInput(false);
    } catch (error) {
      console.error('Error joining class:', error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClassClick = (className) => {
    if (role === 'teacher') {
      navigate(`/teacher/class/${className}`);
    } else {
      navigate(`/student/class/${className}`);
    }
  };
  

  return (
    <div className="dashboard">
      <Navbar username={username} />
      <div className="dashboard-content">
        
        {role === 'teacher' && (
          <div className="create-class-section">
            <input
              type="text"
              placeholder="Enter new class name"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
            />
            <button
              className="create-class-btn"
              onClick={handleCreateClass}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Class'}
            </button>
          </div>
        )}

        {role === 'student' && (
          <div className="create-class-section">
            {!showJoinInput ? (
              <button
                className="create-class-btn"
                onClick={() => setShowJoinInput(true)}
              >
                Join a Class
              </button>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Enter class ID"
                  value={joinClassId}
                  onChange={(e) => setJoinClassId(e.target.value)}
                />
                <button
                  className="create-class-btn"
                  onClick={handleJoinClass}
                  disabled={loading}
                >
                  {loading ? 'Joining...' : 'Join'}
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => {
                    setShowJoinInput(false);
                    setJoinClassId('');
                  }}
                  style={{ marginLeft: '8px', backgroundColor: '#ccc' }}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        )}

        <div className="my-classes-section">
          <h2>{role === 'teacher' ? 'My Created Classes' : 'My Joined Classes'}</h2>
          <div className="classes-grid">
            {classes.map((cls) => (
              <ClassCard
                key={cls._id}
                classTitle={cls.className}
                onClick={() => handleClassClick(cls.className)}

              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
