import multer from "multer";

// Use memory storage since we'll upload to Cloudinary manually
const uploadImpactReport = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files allowed"), false);
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
}).single("pdf");

export default uploadImpactReport;