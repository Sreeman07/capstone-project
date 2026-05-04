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

// ✅ FIXED CORS (handles Vercel + preflight)
const corsOptions = {
  origin: (origin, callback) => {
    if (
      !origin || // allow Postman / server-to-server
      origin.includes("localhost") ||
      origin.includes("vercel.app")
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// ✅ IMPORTANT: handle preflight requests
app.options("*", cors(corsOptions));

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
      console.log(`🚀 server listening on ${port}..`);
    });
  })
  .catch((err) => console.log("❌ err in db connect", err));

// 404
app.use((req, res) => {
  res.status(404).json({ message: `path ${req.url} is invalid` });
});

// error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "error occurred",
    error: err.message,
  });
});