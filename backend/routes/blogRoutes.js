import express from "express";
import {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  uploadEditorImage 
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
router.post("/upload-editor-image", protect, admin,upload.single("file"),uploadEditorImage
);

export default router;
