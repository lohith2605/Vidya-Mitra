const jwt = require("jsonwebtoken");

const protect = (
  req,
  res,
  next
) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "No token",
    });
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7).trim();
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};

module.exports = protect;
