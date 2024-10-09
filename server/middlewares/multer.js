import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const storage = multer.memoryStorage();

export const uploadFiles = multer({ storage }).single("file");

export const uploadMany = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  fileFilter: (req, file, cb) => {
    const fileTypes = /pdf/; // Allowed file types
    const extname = fileTypes.test(
      file.originalname.split(".").pop().toLowerCase(),
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Error: File type not supported!")); // Reject unsupported file types
    }
  },
}).array("file", 10);
