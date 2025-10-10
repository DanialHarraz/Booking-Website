const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");



router.post('/login',adminController.checkUser,adminController.verifyUser)


module.exports = router;