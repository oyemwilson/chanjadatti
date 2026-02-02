import express from "express";
import {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "../controllers/teamMemberController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

/* PUBLIC */
router.get("/", getTeamMembers);

/* ADMIN */
router.post(
  "/",
  protect,
  admin,
  upload.single("image"),
  createTeamMember
);

router.put(
  "/:id",
  protect,
  admin,
  upload.single("image"),
  updateTeamMember
);

router.delete("/:id", protect, admin, deleteTeamMember);

export default router;
