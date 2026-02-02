import express from "express";
import {
  loginAdmin,
  registerAdmin,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/register", registerAdmin); // remove after first admin

export default router;
