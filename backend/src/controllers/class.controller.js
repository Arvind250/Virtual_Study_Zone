import { ClassModel } from "../models/class.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create a new class (Teacher only)
export const createClass = asyncHandler(async (req, res) => {
  const { className } = req.body;

  // Check if name is provided
  if (!className) throw new ApiError(400, "Class name is required");

  // Create a new class with current user's ID as teacher
  const newClass = await ClassModel.create({
    className,
    teacher: req.user._id
  });

  res.status(201).json({
    success: true,
    message: "Class created successfully",
    data: newClass
  });
});

// Get all classes created by logged-in teacher
export const getTeacherClasses = asyncHandler(async (req, res) => {
  const classes = await ClassModel.find({ teacher: req.user._id })
    .populate("students", "email"); // Populate student info

  res.status(200).json({
    success: true,
    message: "Fetched all classes created by teacher",
    data: classes
  });
});


export const joinClass = asyncHandler(async (req, res) => {
    const { classId } = req.body; // Get classId from request body
    const studentId = req.user._id; // Get student ID from the logged-in user

    // Check if class exists in DB
    const foundClass = await ClassModel.findById(classId);

    if (!foundClass) {
        throw new ApiError(404, "Class not found");
    }

    // Prevent duplicate joins
    if (foundClass.students.includes(studentId)) {
        return res.status(400).json({
            success: false,
            message: "Student already joined the class"
        });
    }

    // Add student to the class
    foundClass.students.push(studentId);
    await foundClass.save();

    // Send success response
    res.status(200).json({
        success: true,
        message: "Joined class successfully",
        data: { class: foundClass }
    });
});


export const getClassDetails = asyncHandler(async (req, res) => {
  const classId = req.params.classId;

  const foundClass = await ClassModel.findById(classId)
      .populate({
          path: "students",
          select: "username email" // Only include these fields
      });

  if (!foundClass) {
      throw new ApiError(404, "Class not found");
  }

  res.status(200).json({
      success: true,
      message: "Class details fetched successfully",
      data: foundClass,
  });
});


export const deleteClass = asyncHandler(async (req, res) => {
  const classId = req.params.id;
  const teacherId = req.user._id; // Authenticated teacher's ID from token

  // Find the class first
  const classToDelete = await ClassModel.findById(classId);

  if (!classToDelete) {
      throw new ApiError(404, "Class not found");
  }

  // Check if the logged-in teacher is the owner
  if (classToDelete.teacher.toString() !== teacherId.toString()) {
      throw new ApiError(403, "You are not authorized to delete this class");
  }

  // Delete the class
  await ClassModel.findByIdAndDelete(classId);

  res.status(200).json({
      success: true,
      message: "Class deleted successfully"
  });
});


export const leaveClass = asyncHandler(async (req, res) => {
  const { classId } = req.body; // Get class ID from request body
  const studentId = req.user._id; // Get logged-in student ID

  if (!classId) {
      throw new ApiError(400, "Class ID is required");
  }

  // Check if class exists
  const classToUpdate = await ClassModel.findById(classId);
  if (!classToUpdate) {
      throw new ApiError(404, "Class not found");
  }

  // Check if student is part of the class
  if (!classToUpdate.students.includes(studentId)) {
      throw new ApiError(400, "You are not part of this class");
  }

  // Remove student from class
  classToUpdate.students = classToUpdate.students.filter(
      (id) => id.toString() !== studentId.toString()
  );

  await classToUpdate.save();

  res.status(200).json({
      success: true,
      message: "You have successfully left the class",
  });
});