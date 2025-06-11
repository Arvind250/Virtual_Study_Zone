import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import ClassCard from '../Classcard/Classcard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CourseRecommendation from '../CourseRecommendation/CourseRecommendation'; // ✅ Import new component

const Dashboard = () => {
  const [classes, setClasses] = useState([]);
  const [newClassName, setNewClassName] = useState('');
  const [showJoinInput, setShowJoinInput] = useState(false);
  const [joinClassId, setJoinClassId] = useState('');
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('Guest');
  const [role, setRole] = useState('');
  const [showRecommendation, setShowRecommendation] = useState(false); // ✅ State for toggle

  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    const userUsername = localStorage.getItem('username');
    setRole(userRole);
    setUsername(userUsername);

    if (userRole === 'teacher') {
      fetchTeacherData();
    } else if (userRole === 'student') {
      fetchStudentData();
    }
  }, []);

  const fetchTeacherData = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/dashboard/teacher', {
        withCredentials: true,
      });
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-300 via-slate-500 to-slate-700">
      <Navbar username={username} />

      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Welcome, {username}</h1>
          <p className="text-slate-600 mt-2">
            {role === 'teacher' ? 'Manage your virtual classrooms' : 'Access your enrolled classes'}
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-xl p-6 mb-8 shadow-md border border-blue-200">
          {role === 'teacher' && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Create New Class</h2>
              <div className="flex flex-wrap gap-3">
                <input
                  type="text"
                  placeholder="Enter new class name"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  className="flex-grow bg-blue-50 border border-blue-200 text-slate-800 placeholder-slate-400 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 p-3 shadow-sm"
                />
                <button
                  onClick={handleCreateClass}
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-blue-400 to-teal-400 hover:from-blue-500 hover:to-teal-500 text-white font-medium rounded-lg shadow-md transition duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed min-w-[150px]"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Creating...
                    </div>
                  ) : (
                    <span className="flex items-center gap-2">
                      <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                      Create Class
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}

          {role === 'student' && (
            <div>
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Join a Class</h2>
              {!showJoinInput ? (
                <button
                  onClick={() => setShowJoinInput(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-400 to-teal-400 hover:from-blue-500 hover:to-teal-500 text-white font-medium rounded-lg shadow-md transition duration-300 transform hover:-translate-y-1 flex items-center gap-2"
                >
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Join a Class
                </button>
              ) : (
                <div className="flex flex-wrap gap-3">
                  <input
                    type="text"
                    placeholder="Enter class ID"
                    value={joinClassId}
                    onChange={(e) => setJoinClassId(e.target.value)}
                    className="flex-grow bg-blue-50 border border-blue-200 text-slate-800 placeholder-slate-400 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 p-3 shadow-sm"
                  />
                  <button
                    onClick={handleJoinClass}
                    disabled={loading}
                    className="px-6 py-3 bg-gradient-to-r from-blue-400 to-teal-400 hover:from-blue-500 hover:to-teal-500 text-white font-medium rounded-lg shadow-md transition duration-300 min-w-[100px]"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Joining...
                      </div>
                    ) : "Join"}
                  </button>
                  <button
                    onClick={() => {
                      setShowJoinInput(false);
                      setJoinClassId('');
                    }}
                    className="px-6 py-3 bg-blue-200 hover:bg-blue-300 text-slate-800 font-medium rounded-lg shadow-md transition duration-300"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-xl p-6 shadow-md border border-blue-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-slate-800">
              {role === 'teacher' ? 'My Created Classes' : 'My Joined Classes'}
            </h2>
            <div className="bg-blue-100 px-3 py-1 rounded-full text-blue-600 text-sm">
              {classes.length} {classes.length === 1 ? 'class' : 'classes'}
            </div>
          </div>

          {classes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <svg className="h-16 w-16 text-blue-300 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4m6-4a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-medium text-slate-500 mb-2">No classes yet</h3>
              <p className="text-slate-400 max-w-md">
                {role === 'teacher'
                  ? "Create your first class to get started with your virtual classroom."
                  : "Join a class using its class ID to get started with your learning journey."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {classes.map((cls) => (
                <ClassCard
                  key={cls._id}
                  classTitle={cls.className}
                  onClick={() => handleClassClick(cls.className)}
                />
              ))}
            </div>
          )}
        </div>

        {/* ✅ Student-only Course Recommendation toggle */}
        {role === 'student' && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowRecommendation(!showRecommendation)}
              className="px-6 py-3 bg-gradient-to-r from-blue-400 to-teal-400 hover:from-blue-500 hover:to-teal-500 text-white font-medium rounded-lg shadow-md transition duration-300 transform hover:-translate-y-1 "
            >
              {showRecommendation ? 'Hide' : 'Show'} Course Recommendations
            </button>
          </div>
        )}

        {showRecommendation && (
          <div className="mt-6">
            <CourseRecommendation />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;