"use strict";
const { verifyAccessToken } = require("../utils/jwt.utils");
const userRepository = require("../repositories/user.repository");
const apiResponse = require("../utils/apiResponse.utils");

async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return apiResponse.error(res, "Access denied. No token provided.", {}, 401);
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyAccessToken(token);
  if (!decoded) {
    return apiResponse.error(res, "Invalid or expired token.", {}, 401);
  }

  try {
    const user = await userRepository.findById(decoded.userId);
    if (!user || !user.isActive) {
      return apiResponse.error(res, "User is inactive or no longer exists.", {}, 403);
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return apiResponse.error(res, "Access denied. Insufficient permissions.", {}, 403);
    }
    next();
  };
}

module.exports = {
  verifyToken,
  requireRole,
};
