// userRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controller/loginController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/sendOTP", authController.sendOTP);
router.post("/verifyOTP", authController.verifyOTP);

module.exports = router;
