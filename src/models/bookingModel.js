const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


module.exports.createBooking = async (data) => {
    try {
        return await prisma.booking.create({
            data: {
              
                fullName: data.fullname,
                phone: data.phone,
                email: data.email,
                date: data.date,
                time: data.time,
                pickup: data.pickup,
                destination: data.destination,
                preferences: data.preferences,
            },
        });
    } catch (error) {
        console.error('Error creating progress tracker:', error);
        throw error;
    }
};