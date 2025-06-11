import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";



export const protect = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new ApiError(401, "No token provided");
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = await User.findById(decoded._id).select("-password");
        next();
    } catch (err) {
        next(new ApiError(401, "Unauthorized"));
    }
};

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
