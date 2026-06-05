"use strict";
const rateLimit = require("express-rate-limit");
const apiResponse = require("../utils/apiResponse.utils");

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  handler(req, res) {
    return apiResponse.error(res, "Too many requests from this IP, please try again later.", {}, 429);
  },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  handler(req, res) {
    return apiResponse.error(res, "Too many authentication attempts, please try again later.", {}, 429);
  },
});

module.exports = {
  globalLimiter,
  authLimiter,
};
