"use strict";
const { body, param } = require("express-validator");

const propertyRules = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 200 })
    .withMessage("Title cannot exceed 200 characters"),
  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required")
    .isLength({ max: 300 })
    .withMessage("Location cannot exceed 300 characters"),
  body("price")
    .isNumeric()
    .withMessage("Price must be a number")
    .custom((val) => val >= 0)
    .withMessage("Price cannot be negative"),
  body("type")
    .isIn(["house", "land", "commercial", "apartment", "villa"])
    .withMessage("Invalid property type"),
  body("status")
    .optional()
    .isIn(["active", "sold", "pending"])
    .withMessage("Invalid status"),
  body("featured")
    .optional()
    .isBoolean()
    .withMessage("Featured must be a boolean"),
];

module.exports = {
  propertyRules,
};
