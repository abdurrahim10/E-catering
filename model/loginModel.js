// userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  otp: { type: String, required: true },
  otpExpiration: { type: Date, required: true },
});

const Login = mongoose.model("Login", userSchema);

module.exports = Login;
