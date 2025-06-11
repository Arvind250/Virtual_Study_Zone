import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';

const StudentClassDetails = () => {
  const { className } = useParams();
  const [classInfo, setClassInfo] = useState(null);
  const [username, setUsername] = useState('Student');
  const [file, setFile] = useState(null);
  const [gradingResult, setGradingResult] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    const userUsername = localStorage.getItem('username');
    setUsername(userUsername || 'Student');

    const fetchStudentClassDetails = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/v1/dashboard/student', {
          withCredentials: true,
        });

        const studentData = res.data.data;
        setStudentId(studentData.student._id);

        const classes = studentData.classes || [];
        const classData = classes.find(cls => cls.className === className);
        if (classData) {
          setClassInfo(classData);
        }
      } catch (err) {
        console.error("Failed to fetch class details:", err);
      }
    };

    fetchStudentClassDetails();
  }, [className]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);

      // Step 1: Grade via Smart Grading API
      const gradingRes = await fetch("https://smart-assignment-grading-api.onrender.com/api/grade-assignment", {
        method: "POST",
        body: formData
      });

      const gradingData = await gradingRes.json();
      setGradingResult(gradingData);

      // Step 2: Store full grading response in backend
      if (gradingData && studentId && classInfo?._id) {
        const response = await axios.post("http://localhost:8000/api/v1/assignments/grade", {
          studentId: studentId,
          classId: classInfo._id,
          gradingResponse: gradingData
        }, {
          withCredentials: true
        });

        console.log("Grading response stored:", response.data);
      }
    } catch (err) {
      console.error("Upload or grading failed:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  if (!classInfo) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar username={username} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-gray-200 h-12 w-12"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-300 via-slate-500 to-slate-700">
      <Navbar username={username} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">{className}</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-white">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Class ID</p>
                <p className="font-medium">{classInfo._id}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Enrollment Status</p>
                <p className="font-medium text-green-600">Enrolled</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="rounded-full bg-purple-100 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Students</p>
                <p className="font-medium">{classInfo.students?.length || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Assignment Section */}
        <div className="bg-white shadow rounded-lg mb-6 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Upload Assignment</h2>
            <p className="mt-1 text-sm text-gray-500">Submit your assignment for automated grading</p>
          </div>
          <div className="p-6">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-grow">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select File</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col rounded-lg border-2 border-dashed w-full h-32 p-2 group border-gray-300 hover:border-blue-500 cursor-pointer">
                    <div className="h-full w-full flex flex-col items-center justify-center space-y-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-sm text-gray-500 group-hover:text-blue-500">
                        {file ? file.name : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-xs text-gray-400">PDF, DOC, DOCX (Max 10MB)</p>
                    </div>
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx" 
                      onChange={handleFileChange} 
                      className="hidden" 
                    />
                  </label>
                </div>
              </div>
              <div className="flex items-end pb-2">
                <button
                  onClick={handleUpload}
                  disabled={isUploading || !file}
                  className={`px-6 py-3 rounded-md font-medium text-white ${
                    !file 
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : isUploading 
                        ? 'bg-indigo-300' 
                        : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  }`}
                >
                  {isUploading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    "Upload & Grade"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Grading Results Section */}
        {gradingResult?.grade && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
              <h2 className="text-lg font-medium text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Grading Results
              </h2>
            </div>

            <div className="p-6">
              {/* Grade Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">Grade</p>
                  <p className="text-3xl font-bold text-green-600">{gradingResult.grade.letter}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">Score</p>
                  <p className="text-3xl font-bold text-indigo-600">{gradingResult.grade.percentage}%</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">Correct</p>
                  <p className="text-3xl font-bold text-blue-600">{gradingResult.grade.correct}/{gradingResult.grade.total}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Feedback</p>
                  <p className="text-sm font-medium">{gradingResult.grade.feedback}</p>
                </div>
              </div>

              {/* Detailed Analysis */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Detailed Analysis
                </h3>
                
                <div className="space-y-4">
                  {gradingResult.analysis?.map((item, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-4">
                      <div className="mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Question {idx + 1}
                        </span>
                      </div>
                      <p className="text-gray-800 font-medium mb-2">{item.question}</p>
                      <div className="ml-4 mb-3">
                        <p className="text-sm text-gray-600"><span className="font-medium">Your Answer:</span> {item.user_answer}</p>
                      </div>
                      <div className="border-t border-gray-200 pt-3">
                        <p className="text-sm">
                          <span className="font-medium text-indigo-600">Suggestion:</span> {item.suggestion}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentClassDetails;