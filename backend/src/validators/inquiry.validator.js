"use strict";
const { body } = require("express-validator");

const inquiryRules = [
  body("customerName")
    .trim()
    .notEmpty()
    .withMessage("Customer name is required")
    .isLength({ max: 150 })
    .withMessage("Name cannot exceed 150 characters"),
  body("mobile")
    .trim()
    .notEmpty()
    .withMessage("Mobile number is required")
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Mobile number must be a valid 10-digit Indian number starting with 6-9"),
  body("email")
    .optional({ nullable: true, checkFalsy: true })
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail(),
  body("serviceType")
    .optional()
    .trim()
    .isLength({ max: 50 }),
  body("message")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Message cannot exceed 1000 characters"),
];

module.exports = {
  inquiryRules,
};
