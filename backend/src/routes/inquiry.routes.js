"use strict";
const express = require("express");
const inquiryController = require("../controllers/inquiry.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const { inquiryRules } = require("../validators/inquiry.validator");

const router = express.Router();

// Public submissions (from website frontend forms)
router.post("/", inquiryRules, validate, inquiryController.create);

// Protected routes (admin/staff management)
router.get("/", verifyToken, inquiryController.getAll);
router.get("/stats", verifyToken, inquiryController.getStats);
router.get("/:id", verifyToken, inquiryController.getById);
router.put("/:id", verifyToken, inquiryController.update);
router.delete("/:id", verifyToken, inquiryController.delete);

module.exports = router;
