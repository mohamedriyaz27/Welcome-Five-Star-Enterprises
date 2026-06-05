"use strict";
const logger = require("../config/logger");
const apiResponse = require("../utils/apiResponse.utils");

function errorHandler(err, req, res, next) {
  logger.error("API error", {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const errors = err.errors || {};

  return apiResponse.error(res, message, errors, statusCode);
}

module.exports = errorHandler;
