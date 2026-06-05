"use strict";
const express = require("express");
const invoiceController = require("../controllers/invoice.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const { invoiceRules } = require("../validators/invoice.validator");

const router = express.Router();

router.use(verifyToken); // All invoice endpoints require authentication

router.get("/", invoiceController.getAll);
router.get("/:id", invoiceController.getById);
router.post("/", invoiceRules, validate, invoiceController.create);
router.put("/:id", invoiceController.update);
router.delete("/:id", invoiceController.delete);

module.exports = router;
