const rateLimit = require("../config/upstash");

const rateLimiter = async (req, res, next) => {
  try {
    const success = await rateLimit.limit(req.ip); // Limit based on the client's IP address
    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests, please try again later." });
    }
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Rate limiting error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = rateLimiter;
