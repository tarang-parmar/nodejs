import multer from "multer";
import path from "path";
import { getFilePaths } from "./Utils.js";

// Set up storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(getFilePaths(import.meta.url), "../images"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to only accept images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

// Initialize multer with the storage and file filter configurations
const upload = multer({ storage, fileFilter });

export default upload;
