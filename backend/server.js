import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import campaignRoutes from "./routes/campaignRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import teamMemberRoutes from "./routes/teamMemberRoutes.js"
import blogRoutes from "./routes/blogRoutes.js"
import impactReportRoutes from "./routes/impactReportRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173", // Vite
      "http://localhost:3000", // CRA
      "http://localhost:4000", // your custom frontend
      "https://chanjadatti-1.onrender.com",
      "https://chanjadatti.onrender.com"
    ],
    credentials: true,
  })
);
// DB Config
const db = process.env.MONGO_URI || 'mongodb://localhost:27017/chanjadatti';

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/campaigns', campaignRoutes);
app.use('/api/videos', videoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/team", teamMemberRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/impact-reports", impactReportRoutes);



app.get('/', (req, res) => {
  res.send('Server is running');
});

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server started on port ${port}`));
console.log("ENV TEST:", {
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
});