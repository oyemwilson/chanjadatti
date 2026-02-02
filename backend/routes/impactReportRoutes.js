import express from "express";
import uploadImpactReport from "../middleware/pdfUpload.js";
import {
  getAllReports,
  uploadReport,
  deleteReport,
  viewPdf,
} from "../controllers/impactReportController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllReports);
router.post("/", protect, admin, uploadImpactReport, uploadReport);
router.delete("/:id", protect, admin, deleteReport);
router.get("/:id/view", viewPdf); 

export default router;