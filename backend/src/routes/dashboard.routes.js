import express from "express";
import { getTeacherDashboard, getStudentDashboard } from "../controllers/dashboard.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isStudent, isTeacher } from "../middlewares/role.middleware.js";

const router = express.Router();

router.get("/teacher", verifyJWT, isTeacher, getTeacherDashboard);
router.get("/student", verifyJWT, isStudent, getStudentDashboard);

export default router;
