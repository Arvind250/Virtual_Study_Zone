// src/middleware/multer.middleware.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "assignments", // Folder in your Cloudinary dashboard
    allowed_formats: ["pdf", "doc", "docx"],
  },
});

export const upload = multer({ storage });
