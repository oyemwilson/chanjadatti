import express from "express";
import {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

/* PUBLIC */
router.get("/", getBlogs);
router.get("/:id", getBlogById);

/* ADMIN */
router.post("/", protect, admin, upload.single("image"), createBlog);
router.put("/:id", protect, admin, upload.single("image"), updateBlog);
router.delete("/:id", protect, admin, deleteBlog);

export default router;
