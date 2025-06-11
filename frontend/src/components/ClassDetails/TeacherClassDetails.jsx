import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';

const TeacherClassDetails = () => {
  const { className } = useParams();
  const [classInfo, setClassInfo] = useState(null);
  const [username, setUsername] = useState('Guest');
  const [expandedStudents, setExpandedStudents] = useState({});

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
          const classId = classData._id;
          const assignmentRes = await axios.get(
            `http://localhost:8000/api/v1/assignments/${classId}/submissions`,
            { withCredentials: true }
          );

          const submissions = assignmentRes.data.data;

          const mergedStudents = classData.students.map(student => {
            const submission = submissions.find(sub => sub.studentId._id === student._id);
            return {
              ...student,
              assignment: submission ? 'Submitted' : null,
              grade: submission?.gradingResponse?.grade?.letter || null,
              fullResponse: submission?.gradingResponse || null
            };
          });

          setClassInfo({ ...classData, students: mergedStudents });
        } else {
          console.error("Class not found");
        }
      } catch (err) {
        console.error("Failed to fetch class details:", err);
      }
    };

    fetchTeacherClassDetails();
  }, [className]);

  const toggleExpanded = (studentId) => {
    setExpandedStudents(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar username={username} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Class Header */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">{className}</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-white">
            <div className="flex items-center">
              <div className="rounded-full bg-purple-100 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Class ID</p>
                <p className="font-medium truncate">{classInfo?._id || 'Loading...'}</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Class Name</p>
                <p className="font-medium">{className}</p>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Students</p>
                <p className="font-medium">{classInfo?.students?.length || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Students List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-blue-600 px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-medium text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Students Enrolled
            </h2>
            <span className="bg-white text-indigo-600 text-sm font-medium px-2.5 py-0.5 rounded-full">
              {classInfo?.students?.length || 0} Total
            </span>
          </div>

          <div className="divide-y divide-gray-200">
            {classInfo?.students?.length > 0 ? (
              classInfo.students.map((student, index) => (
                <div key={student._id || index} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg mr-3">
                        {student.username ? student.username.charAt(0).toUpperCase() : '?'}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{student.username || 'Unknown'}</h3>
                        <p className="text-sm text-gray-500">Student ID: {student._id}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="flex flex-col items-center px-4 py-2 bg-gray-50 rounded-lg">
                        <span className="text-xs text-gray-500">Assignment</span>
                        {student.assignment ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {student.assignment}
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Not submitted
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col items-center px-4 py-2 bg-gray-50 rounded-lg">
                        <span className="text-xs text-gray-500">Grade</span>
                        {student.grade ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {student.grade}
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Not graded
                          </span>
                        )}
                      </div>

                      {student.fullResponse && (
                        <button
                          onClick={() => toggleExpanded(student._id)}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          {expandedStudents[student._id] ? "Hide Details" : "View Submission"}
                        </button>
                      )}
                    </div>
                  </div>

                  {expandedStudents[student._id] && student.fullResponse && (
                    <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Submission Details
                      </h4>

                      <div className="space-y-6">
                        {student.fullResponse.analysis.map((q, i) => (
                          <div key={i} className="bg-white rounded-lg shadow-sm p-4">
                            <div className="mb-3">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                Question {q.question_num}
                              </span>
                            </div>
                            <h5 className="font-medium text-gray-900 mb-2">{q.question}</h5>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div className="bg-gray-50 p-3 rounded-md">
                                <p className="text-sm text-gray-500 mb-1">Student Answer</p>
                                <p className="text-gray-700">{q.answer}</p>
                              </div>
                              <div className="bg-gray-50 p-3 rounded-md">
                                <p className="text-sm text-gray-500 mb-1">Correct Answer</p>
                                <p className="text-gray-700">{q.correct_answer}</p>
                              </div>
                            </div>
                            
                            <div className="mb-3">
                              <p className="text-sm text-gray-500 mb-1">Explanation</p>
                              <p className="text-gray-700">{q.explanation}</p>
                            </div>
                            
                            {q.suggestion && (
                              <div className="mb-3 bg-yellow-50 border-l-4 border-yellow-400 p-3">
                                <p className="text-sm text-yellow-700">
                                  <span className="font-medium">Suggestion:</span> {q.suggestion}
                                </p>
                              </div>
                            )}
                            
                            <div className="flex justify-end">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${q.is_correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {q.is_correct ? (
                                  <>
                                    <svg className="mr-1.5 h-2 w-2 text-green-500" fill="currentColor" viewBox="0 0 8 8">
                                      <circle cx="4" cy="4" r="3" />
                                    </svg>
                                    Correct
                                  </>
                                ) : (
                                  <>
                                    <svg className="mr-1.5 h-2 w-2 text-red-500" fill="currentColor" viewBox="0 0 8 8">
                                      <circle cx="4" cy="4" r="3" />
                                    </svg>
                                    Incorrect
                                  </>
                                )}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 bg-indigo-50 rounded-lg p-4">
                        <h5 className="font-medium text-indigo-900 mb-3 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                          Grade Summary
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="bg-white rounded-md p-3 shadow-sm">
                            <p className="text-xs text-gray-500 mb-1">Total Questions</p>
                            <p className="text-lg font-semibold text-indigo-600">{student.fullResponse.grade.total}</p>
                          </div>
                          <div className="bg-white rounded-md p-3 shadow-sm">
                            <p className="text-xs text-gray-500 mb-1">Correct Answers</p>
                            <p className="text-lg font-semibold text-green-600">{student.fullResponse.grade.correct}</p>
                          </div>
                          <div className="bg-white rounded-md p-3 shadow-sm">
                            <p className="text-xs text-gray-500 mb-1">Percentage</p>
                            <p className="text-lg font-semibold text-blue-600">{student.fullResponse.grade.percentage}%</p>
                          </div>
                          <div className="bg-white rounded-md p-3 shadow-sm">
                            <p className="text-xs text-gray-500 mb-1">Feedback</p>
                            <p className="text-sm text-gray-700">{student.fullResponse.grade.feedback}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-6 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No students</h3>
                <p className="mt-1 text-sm text-gray-500">No students are currently enrolled in this class.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherClassDetails;