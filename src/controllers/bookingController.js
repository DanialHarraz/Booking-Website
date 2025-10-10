const Booking = require("../models/bookingModel");

module.exports.createBooking = async (req, res) => {
  try {
    const newBooking = await Booking.createBooking(req.body);
    res.status(201).json({
      message: "Booking successful",
      data: newBooking,
    });
  } catch (error) {
    console.error("Booking error:", error.message);
    res.status(500).json({
      message: "Failed to create booking",
      error: error.message,
    });
  }
};
