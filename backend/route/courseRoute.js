import express from "express";
import isAuth from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";   // ✅ IMPORTANT

import {
  createCourse,
  createLecture,
  editCourse,
  editLecture,
  getCourseById,
  getCourseLecture,
  getCreatorById,
  getCreatorCourses,
  getPublishedCourses,
  removeCourse,
  removeLecture
} from "../controller/courseController.js";   // ✅ added .js
import { searchWithAi } from "../controller/aiController.js";

const courseRouter = express.Router();

//courses routes

courseRouter.post("/create", isAuth, createCourse);
courseRouter.get("/getpublished", getPublishedCourses);
courseRouter.get("/getcreatorcourses", isAuth, getCreatorCourses);
courseRouter.post("/editcourse/:courseId", isAuth, upload.single("thumbnail"), editCourse);
courseRouter.get("/getcourse/:courseId", isAuth, getCourseById);
courseRouter.delete("/removecourse/:courseId", isAuth, removeCourse);

//lectures routes

courseRouter.post("/createlecture/:courseId", isAuth, createLecture);
courseRouter.get("/getcourselecture/:courseId", isAuth, getCourseLecture);
courseRouter.post("/editlecture/:lectureId", isAuth, upload.single("videoUrl"), editLecture);
courseRouter.delete("/removelecture/:lectureId", isAuth, removeLecture);
courseRouter.post("/getcreator", isAuth, getCreatorById);


// for ai search

courseRouter.post("/searchwithai", searchWithAi);

export default courseRouter;
