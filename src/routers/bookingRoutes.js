const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const authMiddleware = require("../middleware/authMiddleware");

// router.get("/", authMiddleware, bookingController.getAllBookings);
// router.get("/:id", authMiddleware, bookingController.getBookingById);


router.post("/", bookingController.createBooking);

module.exports = router;
