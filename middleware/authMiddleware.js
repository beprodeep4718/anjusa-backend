const jwt = require("jsonwebtoken");

//^ Middleware to authenticate incoming requests
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("Access denied. Invalid token");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { auth };
