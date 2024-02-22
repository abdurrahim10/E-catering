const jwt = require("jsonwebtoken");
const { secret } = require("../config/Token"); // Import your secret key

// middleware/authMiddleware.js

module.exports.verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  console.log(token, "token is there........");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Missing token" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), secret);
    req.user = decoded.userId;
    console.log(decoded.userId, "token is thereeee........");
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};
