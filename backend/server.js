import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import https from "https";
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
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:4000",
      "https://chanjadatti-1.onrender.com",
      "http://chanjadatti-1.onrender.com",
      "https://chanjadatti.onrender.com",
      "https://chanjadatti.com"
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

// ⭐ KEEP-ALIVE ENDPOINT
app.get('/api/keep-alive', (req, res) => {
  res.json({ 
    status: 'alive', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server started on port ${port}`));

// ⭐ SELF-PING FUNCTION (only on production/Render)
if (process.env.NODE_ENV === 'production' && process.env.RENDER_EXTERNAL_URL) {
  const RENDER_URL = process.env.RENDER_EXTERNAL_URL;
  const PING_INTERVAL = 14 * 60 * 1000; // 14 minutes

  function selfPing() {
    const url = new URL(`${RENDER_URL}/api/keep-alive`);
    
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname,
      method: 'GET',
      timeout: 10000
    };

    const req = https.request(options, (res) => {
      console.log(`✅ Self-ping successful! Status: ${res.statusCode}`);
    });

    req.on('error', (error) => {
      console.error(`❌ Self-ping failed: ${error.message}`);
    });

    req.on('timeout', () => {
      console.error(`⏱️ Self-ping timeout`);
      req.destroy();
    });

    req.end();
  }

  // Start self-pinging after 5 minutes (let server fully initialize)
  setTimeout(() => {
    console.log(`🤖 Starting self-ping every ${PING_INTERVAL / 60000} minutes`);
    selfPing();
    setInterval(selfPing, PING_INTERVAL);
  }, 5 * 60 * 1000);
}

console.log("ENV TEST:", {
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
});