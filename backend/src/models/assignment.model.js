// import mongoose from "mongoose";

// const assignmentSchema = new mongoose.Schema({
//   student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
//   fileUrl: { type: String, required: true },
//   grade: {
//     letter: String,
//     percentage: Number,
//     correct: Number,
//     total: Number,
//     feedback: String
//   },
//   uploadedAt: { type: Date, default: Date.now }
// });

// export default mongoose.model("Assignment", assignmentSchema);

// backend/models/Assignment.js

import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  gradingResponse: { type: Object, required: true }, // Store the entire grading response
  uploadedAt: { type: Date, default: Date.now },
});

export const Assignment = mongoose.model('Assignment', assignmentSchema);
