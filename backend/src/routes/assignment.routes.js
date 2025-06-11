// src/routes/assignmentRoutes.js

import express from 'express';


import { isStudent, isTeacher } from '../middlewares/role.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import { getStudentGradesForClass, getClassSubmissions} from '../controllers/assignment.controller.js';



import {Assignment} from '../models/assignment.model.js';


const router = express.Router();


// Student: upload file + grade
router.post(
  "/:classId/upload",
  verifyJWT,
  isStudent,
  upload.single("file") // ⬅️ field name MUST be 'file'
  
);


// Teacher: get class-wise assignment uploads

router.get('/:classId', verifyJWT, isTeacher);


router.get('/:classId/grades', getStudentGradesForClass);





router.post('/grade', async (req, res) => {
  const { studentId, classId, gradingResponse } = req.body;

  try {
    const newAssignment = new Assignment({
      studentId,
      classId,
      gradingResponse,
    });

    await newAssignment.save();

    res.status(200).json({
      message: 'Grading response saved successfully',
      data: newAssignment,
    });
  } catch (err) {
    console.error('❌ Error saving grading response:', err);
    res.status(500).json({
      message: 'Failed to save grading data',
      error: err.message,
    });
  }
});


// routes/assignment.route.js
router.get("/:classId/submissions", getClassSubmissions);

router.get('/:classId/grade', async (req, res) => {
  try {
    const { classId } = req.params;

    const assignments = await Assignment.find({ classId }).populate('student', 'username');

    const students = assignments.map(a => ({
      _id: a.student._id,
      username: a.student.username,
      grade: a.grade,
    }));

    res.status(200).json({ success: true, students });
  } catch (error) {
    console.error("Error fetching grades:", error);
    res.status(500).json({ success: false, message: 'Failed to fetch grades' });
  }
});




















// // Route to save grade data
// router.post('/upload-grade', saveGrade);

// // Route to fetch assignments for a class
// router.get('/grades/:classId', getAssignmentsByClass);





export default router;
