const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const adminModel = require("../models/adminModel");

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// helper functions
function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

async function comparePassword(plain, hashed) {
  return bcrypt.compare(plain, hashed);
}

// middleware 1: check if user exists
module.exports.checkUser = async (req, res, next) => {
  const { username } = req.body;

  try {
    const data = await adminModel.checkUser(username);

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const user = data[0];

    // ✅ Check if role is admin
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied — not an admin account" });
    }

    req.userData = user; // pass the found user to the next middleware
    next();
  } catch (err) {
    console.error("checkUser error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// middleware 2: verify password and generate token
module.exports.verifyUser = async (req, res) => {
  const { password } = req.body;
  const user = req.userData;

  try {
    const valid = await comparePassword(password, user.password);

    if (!valid) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = generateToken({ id: user.id, username: user.username, role: user.role });

    res.status(200).json({ data: user, token });
  } catch (err) {
    console.error("verifyUser error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
