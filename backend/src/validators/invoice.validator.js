"use strict";
const { body } = require("express-validator");

const invoiceRules = [
  body("customerName")
    .trim()
    .notEmpty()
    .withMessage("Customer name is required")
    .isLength({ max: 150 }),
  body("customerPhone")
    .trim()
    .notEmpty()
    .withMessage("Customer phone is required"),
  body("items")
    .isArray({ min: 1 })
    .withMessage("Items must be a non-empty array"),
  body("items.*.description")
    .trim()
    .notEmpty()
    .withMessage("Item description is required"),
  body("items.*.qty")
    .isInt({ min: 1 })
    .withMessage("Item quantity must be a positive integer"),
  body("items.*.rate")
    .isNumeric()
    .withMessage("Item rate must be a number")
    .custom((val) => val >= 0)
    .withMessage("Item rate cannot be negative"),
  body("includeGst")
    .optional()
    .isBoolean()
    .withMessage("includeGst must be a boolean"),
];

module.exports = {
  invoiceRules,
};
