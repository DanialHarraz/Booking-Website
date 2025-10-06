const db = require("../db");

const createBooking = async (data) => {
  const {
    fullName,
    phone,
    email,
    date,
    time,
    pickup,
    destination,
    preferences,
  } = data;

  const query = `
    INSERT INTO bookings (full_name, phone, email, date, time, pickup, destination, preferences)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;

  const values = [fullName, phone, email, date, time, pickup, destination, preferences];
  const result = await db.query(query, values);
  return result.rows[0];
};

module.exports = {
  createBooking,
};
