import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const storage = multer.memoryStorage();

export const uploadFiles = multer({ storage }).single("file");
