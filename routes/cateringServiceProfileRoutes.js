const express = require("express");
const router = express.Router();
const userController = require("../controller/cateringServiceProfileController");
const authMiddleware = require("../middleware/authMiddleware");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save uploaded files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Add a timestamp to the file name to ensure uniqueness
  },
});
const upload = multer({ storage: storage });
// POST: /api/kids
router.post(
  "/cateringServiceProfile",
  authMiddleware.verifyToken,
  upload.single("image"),
  userController.createUser
);

// GET: /api/users/:id
router.get(
  "/cateringServiceProfile",
  authMiddleware.verifyToken,
  userController.getUserProfile
);

// Update user profile by ID
router.put(
  "/cateringServiceProfile",
  authMiddleware.verifyToken,
  userController.updateUserProfile
);

// Delete user profile by ID
router.delete(
  "/cateringServiceProfile",
  authMiddleware.verifyToken,
  userController.deleteUserProfile
);

module.exports = router;
