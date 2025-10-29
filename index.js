import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import movieRouter from './routes/movie.routes.js';
import adminRouter from './routes/admin.routes.js';
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allow both localhost & production URLs
const allowedOrigins = [
  "http://localhost:5173", // admin frontend (local)
  "http://localhost:5174", // public frontend (local)
  "https://movie-admin.netlify.app", // example
  "https://movieapp.vercel.app",     // example
  "https://endearing-cajeta-1cbabb.netlify.app/admin/login", // ✅ your real Netlify frontend
];


// ✅ CORS setup (works for all Netlify subdomains + local + Render)
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without origin (like Postman / server-to-server)
      if (!origin) return callback(null, true);

      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://movieapp.vercel.app",
        "https://movie-admin.netlify.app",
      ];

      // ✅ Allow all Netlify subdomains dynamically
      const netlifyPattern = /^https:\/\/([a-z0-9-]+)\.netlify\.app$/i;

      if (allowedOrigins.includes(origin) || netlifyPattern.test(origin)) {
        console.log("✅ Allowed CORS for origin:", origin);
        callback(null, true);
      } else {
        console.warn("❌ Blocked CORS for origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// ✅ Routes
app.use("/api/movies", movieRouter);
app.use("/api/admin", adminRouter);

// ✅ Default route
app.get("/", (req, res) => {
  res.send("🎬 Movie Backend API Running Successfully!");
});

// ✅ Start Server
app.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server running on port ${PORT}`);
});
