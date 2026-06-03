const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "vidya_mitra_secret_key";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({ message: "No authentication token, authorization denied" });
    }

    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Token format invalid, authorization denied" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Contains userId and username
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    res.status(401).json({ message: "Token is not valid or has expired, authorization denied" });
  }
};

module.exports = authMiddleware;
