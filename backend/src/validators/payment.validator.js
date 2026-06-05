"use strict";
const { body } = require("express-validator");

const paymentRules = [
  body("amount")
    .isNumeric()
    .withMessage("Amount must be a number")
    .custom((val) => val > 0)
    .withMessage("Amount must be greater than 0"),
  body("paymentMethod")
    .isIn(["UPI", "Cash", "Card", "Bank Transfer", "Cheque", "Other"])
    .withMessage("Invalid payment method"),
  body("customer")
    .trim()
    .notEmpty()
    .withMessage("Customer name is required")
    .isLength({ max: 150 }),
  body("note")
    .optional()
    .trim()
    .isLength({ max: 300 }),
];

module.exports = {
  paymentRules,
};
