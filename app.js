const express = require("express");
const path = require("path");
const cors = require("cors");

const bookingRoutes = require("./src/routers/bookingRoutes");
const adminRoutes = require("./src/routers/adminRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from src/public
app.use(express.static(path.join(__dirname, "src", "public")));

// Serve HTML pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "public/index.html"));
});

app.get("/booking.html", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "public/booking.html"));
});

app.get("/admin-dashboard.html", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "public/admin-dashboard.html"));
});

app.get("/view-booking.html", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "public/view-booking.html"));
});

// API Routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `Unknown resource ${req.method} ${req.originalUrl}` });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(err.status || 500).json({ error: err.message || "Server Error" });
});

module.exports = app;
