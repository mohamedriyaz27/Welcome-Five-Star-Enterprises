"use strict";
const { validationResult } = require("express-validator");
const apiResponse = require("../utils/apiResponse.utils");

function validate(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  
  const extractedErrors = {};
  errors.array().forEach((err) => {
    extractedErrors[err.path || err.param] = err.msg;
  });

  return apiResponse.error(res, "Validation failed", extractedErrors, 400);
}

module.exports = validate;
