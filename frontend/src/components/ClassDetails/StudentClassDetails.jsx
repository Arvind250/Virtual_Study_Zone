import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import './StudentClassDetails.css';

const StudentClassDetails = () => {
  const { className } = useParams();
  const [classInfo, setClassInfo] = useState(null);
  const [username, setUsername] = useState('Student');

  useEffect(() => {
    const userUsername = localStorage.getItem('username');
    setUsername(userUsername || 'Student');

    const fetchStudentClassDetails = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/v1/dashboard/student', {
          withCredentials: true,
        });

        console.log("Fetched student classes:", res.data.data.classes);
        const classes = res.data.data?.classes || [];
        const classData = classes.find(cls => cls.className === className);

        if (classData) {
          setClassInfo(classData);
        } else {
          console.error("Class not found");
        }
      } catch (err) {
        console.error("Failed to fetch class details:", err);
      }
    };

    fetchStudentClassDetails();
  }, [className]);

  if (!classInfo) {
    return (
      <div className="class-details-page">
        <Navbar username={username} />
        <div className="class-details-container">
          <p>Loading class details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="class-details-page">
      <Navbar username={username} />
      <div className="class-details-container">
        <div className="class-info-card">
          <div className="class-info-left">Class ID: {classInfo._id}</div>
          <div className="class-info-center">
            <h2>Class: {className}</h2>
          </div>
          <div className="class-info-right">
           No of Students: {classInfo.students?.length || 0}
          </div>
        </div>
        <hr className="divider" />
        <div className="enrollment-message">
          ✅ You are enrolled in this class
        </div>
      </div>
    </div>
  );
};

export default StudentClassDetails;