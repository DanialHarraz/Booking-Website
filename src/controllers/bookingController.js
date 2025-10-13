const Booking = require("../models/bookingModel");

module.exports.createBooking = async (req, res) => {
  try {
    // req.file comes from Multer
    const newBooking = await Booking.createBooking(req.body, req.file);

    res.status(201).json({
      message: "Booking created successfully",
      data: newBooking,
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({
      message: "Failed to create booking",
      error: error.message,
    });
  }
};


module.exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.getAllBookings();
    res.status(200).json({
      message: "✅ Bookings retrieved successfully",
      data: bookings,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({
      message: "Failed to retrieve bookings",
      error: error.message,
    });
  }
};