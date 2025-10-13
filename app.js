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
app.use(cors());
app.use(express.json());

// ====================
// Serve Frontend Static Files
// ====================
app.use(express.static(path.join(__dirname, "public")));

// Optional: serve profile folder separately if needed
app.use("/profile", express.static(path.join(__dirname, "public/profile")));

// Serve HTML pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/booking.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public/booking.html"));
});

app.get("/admin-dashboard.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public/admin-dashboard.html"));
});

app.get("/view-booking.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public/view-booking.html"));
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
