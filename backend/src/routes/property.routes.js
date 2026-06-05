"use strict";
const express = require("express");
const propertyController = require("../controllers/property.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const { propertyRules } = require("../validators/property.validator");

const router = express.Router();

router.get("/", propertyController.getAll);
router.get("/featured", propertyController.getFeatured);
router.get("/:id", propertyController.getById);

// Protected routes (admin/staff only)
router.post("/", verifyToken, propertyRules, validate, propertyController.create);
router.put("/:id", verifyToken, propertyRules, validate, propertyController.update);
router.delete("/:id", verifyToken, propertyController.delete);

module.exports = router;
