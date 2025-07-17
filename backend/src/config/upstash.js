const { Ratelimit } = require("@upstash/ratelimit");
const { Redis } = require("@upstash/redis");

const dotenv = require("dotenv");
dotenv.config();

// const redis = new Redis({
//   url: process.env.UPSTASH_REDIS_REST_URL,
//   token: process.env.UPSTASH_REDIS_REST_TOKEN,
// });

const ratelimit = new Ratelimit({
  redis: new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  }),
  limiter: Ratelimit.slidingWindow(3, "10 s"), // 10 requests every 10 seconds
});

module.exports = ratelimit;
