import express from "express";
import {
  getHeroVideo,
  updateHeroVideo,
} from "../controllers/videoController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

/* PUBLIC */
router.get("/hero", getHeroVideo);

/* ADMIN */
router.put("/hero", protect, admin, updateHeroVideo);

export default router;
