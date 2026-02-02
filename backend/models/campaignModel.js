import mongoose from "mongoose";

const campaignSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    heroImage: { type: String, required: true },
    heroOverlayText: { type: String, required: true },

    content: { type: String, required: true }, // HTML (TinyMCE)

    gallery: [{ type: String }], // beneficiary images

    ctaText: { type: String, default: "Donate Waste" },
    ctaLink: { type: String, default: "#" },

    isActive: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Campaign", campaignSchema);
