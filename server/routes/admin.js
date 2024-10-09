import express from "express";
import { isAdminOrInstructor, isAuth } from "../middlewares/isAuth.js";
import {
  addDpp,
  addLectures,
  addMaterials,
  createCourse,
  deleteCourse,
  deleteLecture, deleteUser,
  getAllStats,
  getAllUsers,
  getSingleUser,
} from "../controllers/admin.js";
import { uploadFiles, uploadMany } from "../middlewares/multer.js";

const router = express.Router();

router.post(
  "/courses/add",
  isAuth,
  isAdminOrInstructor,
  uploadFiles,
  createCourse,
);
router.post("/course/:id", isAuth, isAdminOrInstructor, addLectures);
router.delete("/lecture/:id", isAuth, isAdminOrInstructor, deleteLecture);
router.delete("/course/:id", isAuth, isAdminOrInstructor, deleteCourse);
router.get("/stats/", isAuth, isAdminOrInstructor, getAllStats);
router.post(
  "/daily-practice-problems/add",
  isAuth,
  isAdminOrInstructor,
  uploadMany,
  addDpp,
);
router.post(
  "/materials/add",
  isAuth,
  isAdminOrInstructor,
  uploadMany,
  addMaterials,
);
//usermangement
router.get("/users/all", isAuth, isAdminOrInstructor, getAllUsers);
router.get("/users/:id", isAuth, isAdminOrInstructor, getSingleUser);
router.delete("/users/:id",isAuth,isAdminOrInstructor,deleteUser)
export default router;
