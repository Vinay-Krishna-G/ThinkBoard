const { Ratelimit } = require("@upstash/ratelimit");
const { Redis } = require("@upstash/redis");

const dotenv = require("dotenv");
dotenv.config();

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "10 s"), // 10 requests every 10 seconds
});

module.exports = ratelimit;
