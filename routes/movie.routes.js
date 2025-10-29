import { Router } from "express";
import {
  addMovie,
  deleteMovie,
  getMovieById,
  getMovies,
  updateMovie,
} from "../controllers/movie.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddlewares.js";

const router = Router();

// ✅ Correct field name everywhere: "imgSample"
router.post(
  "/",
  authMiddleware,
  upload.fields([
  { name: "mainPoster", maxCount: 1 },
  { name: "imgSample", maxCount: 10 },
])
,
  addMovie
);
router.get("/", getMovies);
router.get("/:id", getMovieById);

router.put("/:id", authMiddleware, upload.fields([
  { name: "mainPoster", maxCount: 1 },
  { name: "imgSample", maxCount: 10 },
]), updateMovie);

router.delete("/:id", authMiddleware, deleteMovie);

export default router;
