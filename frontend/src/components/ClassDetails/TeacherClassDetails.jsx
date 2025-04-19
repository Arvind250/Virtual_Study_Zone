import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import './TeacherClassDetails.css';

const TeacherClassDetails = () => {
  const { className } = useParams();
  const [classInfo, setClassInfo] = useState(null);
  const [username, setUsername] = useState('Guest');
  
  useEffect(() => {
    const userUsername = localStorage.getItem('username'); 
    setUsername(userUsername);
    const fetchTeacherClassDetails = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/v1/dashboard/teacher', {
          withCredentials: true,
        });
        
        const classData = res.data.data.classes.find(cls => cls.className === className);
        if (classData) {
          setClassInfo(classData);
        } else {
          console.error("Class not found");
        }
      } catch (err) {
        console.error("Failed to fetch class details:", err);
      }
    };
    
    fetchTeacherClassDetails();
  }, [className]);
  
  return (
    <div className="class-details-page">
      <Navbar username={username} />
      <div className="class-details-container">
        <div className="class-header">
          <div className="class-info">
            <span>Class ID: {classInfo?._id || 'Loading...'}</span>
            <h2 className="class-title">Class: {className}</h2>
            <span>Number of Students: {classInfo?.students?.length || 0}</span>
          </div>
        </div>
        <hr className="divider" />
        <div className="students-list">
          {classInfo?.students?.length > 0 ? (
            classInfo.students.map(student => (
              <div key={student._id} className="student-card">
                Student Name: {student.username} 
              </div>
            )) 
          ) : (
            <p className='student-card'>No students enrolled in this class</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherClassDetails;