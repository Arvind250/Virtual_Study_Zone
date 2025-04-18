import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import './TeacherClassDetails.css';

const ClassDetails = () => {
  const { className } = useParams();
  const [classInfo, setClassInfo] = useState(null);

  useEffect(() => {
    const fetchClassDetails = async () => {
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

    fetchClassDetails();
  }, [className]);

  return (
    <div className="class-details-page">
      <Navbar />
      <div className="class-details-content">
        <h2>Class: {className}</h2>
        {classInfo ? (
          <>
            <p><strong>Class ID:</strong> {classInfo._id}</p>
            <p><strong>Number of Students:</strong> {classInfo.students.length}</p>
          </>
        ) : (
          <p>Loading class info...</p>
        )}
      </div>
    </div>
  );
};

export default ClassDetails;
