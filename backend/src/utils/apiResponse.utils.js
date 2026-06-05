"use strict";

const apiResponse = {
  success(res, message, data = {}, statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  },

  error(res, message, errors = {}, statusCode = 500) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors: typeof errors === "string" ? { message: errors } : errors,
    });
  },
};

module.exports = apiResponse;
