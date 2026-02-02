import express from "express";
import {
  getActiveCampaign,
  getAllCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  setActiveCampaign,
  getCampaignById
} from "../controllers/campaignController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";


const router = express.Router();

/* PUBLIC */
router.get("/active", getActiveCampaign);
router.get("/:id", getCampaignById);

/* ADMIN */
router.get("/", getAllCampaigns);
router.post(
  "/",
  protect,
  admin,
  upload.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  createCampaign
);
router.put(
  "/:id",
  protect,
  admin,
  upload.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  updateCampaign
);
router.put("/:id/activate", protect, admin, setActiveCampaign);
router.delete("/:id", protect, admin, deleteCampaign);

export default router;
