"use strict";
const express = require("express");
const serviceController = require("../controllers/service.controller");
const { verifyToken } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", serviceController.getAll);
router.get("/:id", serviceController.getById);

// Protected routes (admin/staff only)
router.post("/", verifyToken, serviceController.create);
router.put("/:id", verifyToken, serviceController.update);
router.delete("/:id", verifyToken, serviceController.delete);

module.exports = router;
