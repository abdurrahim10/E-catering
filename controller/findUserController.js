const User = require("../model/findUserModel");

exports.createUser = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const imageUrl = req.file ? req.file.path : null; // Check if req.file exists and get the file path
    const newUser = new User({ name, email, phone, address, imageUrl });
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
};
// Get user profile by ID
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user); // Using req.user from the middleware
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update user profile by ID
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user, // Using req.user from the middleware
      { name, email, phone, address },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete user profile by ID
exports.deleteUserProfile = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user); // Using req.user from the middleware
    if (!deletedUser) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
