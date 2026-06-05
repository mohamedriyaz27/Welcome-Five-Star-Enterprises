"use strict";
const express = require("express");
const paymentController = require("../controllers/payment.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const { paymentRules } = require("../validators/payment.validator");

const router = express.Router();

router.use(verifyToken); // All payment endpoints require authentication

router.get("/", paymentController.getAll);
router.get("/:id", paymentController.getById);
router.post("/", paymentRules, validate, paymentController.create);
router.put("/:id", paymentController.update);
router.delete("/:id", paymentController.delete);

module.exports = router;
