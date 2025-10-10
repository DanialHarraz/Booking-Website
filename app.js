// app.js
const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv").config();
const prisma = require("./src/models/prismaClient");

const bookingRoutes = require("./src/routers/bookingRoutes");
const adminRoutes = require("./src/routers/adminRoutes");

const app = express();

// ====================
// Middleware
// ====================
app.use(cors());          // Enable CORS
app.use(express.json());  // Enable JSON parsing

// ====================
// Serve Frontend Static Files
// ====================
// Serve Frontend Static Files
app.use(express.static(path.join(__dirname, "src", "public")));

// Optional: serve profile folder if needed
app.use("/profile", express.static(path.join(__dirname, "src", "public", "profile")));

// Root route -> index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src/public/index.html"));
});



// ====================
// API Routes
// ====================
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);
// ====================
// 404 Handler
// ====================
app.use((req, res) => {
  res.status(404).json({ error: `Unknown resource ${req.method} ${req.originalUrl}` });
});

// ====================
// Error Handling Middleware
// ====================
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(err.status || 500).json({ error: err.message || "Server Error" });
});

module.exports = app;
