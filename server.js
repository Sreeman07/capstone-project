import exp from "express";
import { config } from "dotenv";
import { connect } from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import { userApp } from "./API/userAPI.js";
import { authorApp } from "./API/authorAPI.js";
import { adminApp } from "./API/adminAPI.js";
import { commonApp } from "./API/commonApi.js";

config();

const app = exp();

// ✅ SIMPLE & WORKING CORS
app.use(cors({
  origin: true,          // allows all origins dynamically (Vercel safe)
  credentials: true      // required for cookies/auth
}));

app.use(cookieParser());
app.use(exp.json());

// ROUTES
app.use("/user-api", userApp);
app.use("/author-api", authorApp);
app.use("/admin-api", adminApp);
app.use("/auth-api", commonApp);

// PORT
const port = process.env.PORT || 5000;

// DB + SERVER START
connect(process.env.DB_URL)
  .then(() => {
    console.log("✅ DB connected");

    app.listen(port, () => {
      console.log(`🚀 server listening on ${port}`);
    });
  })
  .catch((err) => {
    console.log("❌ DB connection error:", err);
  });

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: `Path ${req.url} not found` });
});

// Error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "Server error",
    error: err.message,
  });
});