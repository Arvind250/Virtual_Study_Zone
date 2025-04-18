import express from "express";
import { getTeacherDashboard, getStudentDashboard } from "../controllers/dashboard.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/teacher", verifyJWT, getTeacherDashboard);
router.get("/student", verifyJWT, getStudentDashboard);

export default router;
