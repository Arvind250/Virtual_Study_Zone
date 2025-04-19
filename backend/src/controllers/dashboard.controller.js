import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import {ClassModel} from "../models/class.model.js"; // you'll create this model

export const getTeacherDashboard = asyncHandler(async (req, res) => {
    const teacherId = req.user._id;

    const classes = await ClassModel.find({ teacher: teacherId }).populate("students","username email");

    res.status(200).json({
        success: true,
        message: "Teacher dashboard data fetched",
        data: {
            teacher: req.user,
            classes
        }
    });
});

export const getStudentDashboard = asyncHandler(async (req, res) => {
    const studentId = req.user._id;

    const classes = await ClassModel.find({ students: studentId }).populate("teacher");

    res.status(200).json({
        success: true,
        message: "Student dashboard data fetched",
        data: {
            student: req.user,
            classes
        }
    });
});
