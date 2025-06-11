import express from "express";
import { createClass, getTeacherClasses, joinClass, getClassDetails, deleteClass, leaveClass} from "../controllers/class.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isTeacher } from "../middlewares/role.middleware.js";
import { isStudent } from "../middlewares/role.middleware.js";

const router = express.Router();

// Route to create a class - only for logged-in teachers
router.post("/create", verifyJWT, isTeacher, createClass);

// Route to get all classes created by the teacher
router.get("/my-classes", verifyJWT, isTeacher, getTeacherClasses);

router.post("/join", verifyJWT, isStudent, joinClass);

router.get("/:classId", verifyJWT, isTeacher, getClassDetails);

router.delete("/delete/:id", verifyJWT, isTeacher, deleteClass);

router.put("/leave", verifyJWT, isStudent, leaveClass);

export default router;