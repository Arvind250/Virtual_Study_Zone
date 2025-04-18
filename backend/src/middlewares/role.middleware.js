import { ApiError } from "../utils/apiError.js";

export const isStudent = (req, res, next) => {
    if (req.user?.role !== "student") {
        throw new ApiError(403, "Access denied: Students only");
    }
    next();
};

export const isTeacher = (req, res, next) => {
    if (req.user?.role !== "teacher") {
        throw new ApiError(403, "Access denied: Teachers only");
    }
    next();
};
