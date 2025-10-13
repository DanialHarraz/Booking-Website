const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.createBooking = async (data, file) => {
  try {
    return await prisma.booking.create({
      data: {
        fullName: data.fullName,
        phone: data.phone,
        email: data.email || null,
        date: data.date,
        time: data.time,
        pickup: data.pickup,
        destination: data.destination || null,
        bookingType: data.bookingType,
        returnDate: data.returnDate || null,
        returnTime: data.returnTime || null,
        duration: data.duration ? parseInt(data.duration) : null,
        passengers: parseInt(data.passengers),
        depositAcknowledged: data.depositAcknowledged === "true",
        cancellationPolicy: data.cancellationPolicy === "true",
        additionalNotes: data.additionalNotes || null,
        paymentScreenshot: file ? "/uploads/" + file.filename : null,
      },
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};


module.exports.getAllBookings = async () => {
  try {
    return await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("❌ Error fetching bookings:", error);
    throw error;
  }
};