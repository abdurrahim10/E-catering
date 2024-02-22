const User = require("../model/loginModel");
const fast2sms = require("fast-two-sms");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/Token"); // Replace 'secret' with your actual secret key

const OTP_EXPIRY_TIME = 5 * 60 * 1000; // OTP expires after 5 minutes
// const OTP_EXPIRY_TIME = 1000; // OTP expires after 1 second

exports.sendOTP = async (req, res) => {
  const { phoneNumber } = req.body;

  // Generate a random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // Check if the user exists
    let user = await User.findOne({ phoneNumber });

    if (!user) {
      // Create a new user if not exists
      user = new User({
        phoneNumber,
        otp,
        otpExpiration: new Date(Date.now() + OTP_EXPIRY_TIME),
      });
    } else {
      // Update the existing user with new OTP
      user.otp = otp;
      user.otpExpiration = new Date(Date.now() + OTP_EXPIRY_TIME);
    }

    await user.save();

    // Send OTP via Fast2SMS
    // Replace 'YOUR_API_KEY' with your actual Fast2SMS API key
    const response = await fast2sms.sendMessage({
      authorization:
        "a3iKFtBDu85q4QnXYrfkPE0LIZ7AecHR1OVmCTgpzv9Ujw6MJy0s2p9w6WeOtYRxvlGhqUZQd1NizDCT",
      message: `Your OTP is ${otp}`,
      numbers: [phoneNumber],
    });

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.verifyOTP = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  try {
    // Find user with the given phone number and valid OTP
    const user = await User.findOne({
      phoneNumber,
      otp,
      otpExpiration: { $gt: new Date() },
    });

    if (user) {
      // Generate token with user ID and phone number
      const token = jwt.sign({ userId: user._id, phoneNumber }, secret, {
        expiresIn: "1d",
      }); // Include phoneNumber in the payload

      res.status(200).json({
        success: true,
        message: "OTP verified successfully",
        token,
        userId: user._id,
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Invalid OTP or OTP expired" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
