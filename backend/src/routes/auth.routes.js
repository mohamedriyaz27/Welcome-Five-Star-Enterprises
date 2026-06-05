"use strict";
const express = require("express");
const authController = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const { authLimiter } = require("../middleware/rateLimiter.middleware");
const validate = require("../middleware/validate.middleware");
const { loginRules, registerRules } = require("../validators/auth.validator");

const router = express.Router();

router.post("/login", authLimiter, loginRules, validate, authController.login);
router.post("/register", verifyToken, registerRules, validate, authController.register); // only admins can add other users
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", verifyToken, authController.logout);
router.get("/me", verifyToken, authController.getMe);

module.exports = router;
