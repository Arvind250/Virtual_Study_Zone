import {Router} from 'express';
import {loginUser, registerUser, logoutUser, refreshAccessToken} from '../controllers/user.controller.js';
import {upload} from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { getTeacherDashboard, getStudentDashboard } from '../controllers/dashboard.controller.js';
import { isStudent, isTeacher } from '../middlewares/role.middleware.js';

const router = Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT, logoutUser)

router.get('/dashboard/student', verifyJWT, isStudent, getStudentDashboard);

router.get('/dashboard/teacher', verifyJWT, isTeacher, getTeacherDashboard);

router.post("/refresh-token", refreshAccessToken);




export default router 