import mongoose from "mongoose";

const impactReportSchema = new mongoose.Schema(
  {
    year: {
      type: String,
      required: true,
    },
    pdfUrl: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ImpactReport", impactReportSchema);
