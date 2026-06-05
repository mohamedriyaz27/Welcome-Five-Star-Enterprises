"use strict";
const express = require("express");
const reportController = require("../controllers/report.controller");
const { verifyToken } = require("../middleware/auth.middleware");

const router = express.Router();

router.use(verifyToken);

router.get("/monthly-sales", reportController.getMonthlySales);

module.exports = router;
