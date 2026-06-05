"use strict";
const authService = require("../services/auth.service");
const apiResponse = require("../utils/apiResponse.utils");

const authController = {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);

      // Set HTTP-only cookie for refresh token in production
      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return apiResponse.success(res, "Login successful", {
        user: result.user,
        accessToken: result.accessToken,
      });
    } catch (err) {
      next(err);
    }
  },

  async register(req, res, next) {
    try {
      const user = await authService.register(req.body);
      return apiResponse.success(res, "Registration successful", { user }, 201);
    } catch (err) {
      next(err);
    }
  },

  async refreshToken(req, res, next) {
    try {
      const token = req.cookies.refreshToken || req.body.refreshToken;
      if (!token) {
        return apiResponse.error(res, "Refresh token required", {}, 400);
      }

      const result = await authService.refresh(token);

      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return apiResponse.success(res, "Token refreshed successfully", {
        accessToken: result.accessToken,
      });
    } catch (err) {
      next(err);
    }
  },

  async logout(req, res, next) {
    try {
      if (req.user) {
        await authService.logout(req.user._id);
      }
      res.clearCookie("refreshToken");
      return apiResponse.success(res, "Logout successful");
    } catch (err) {
      next(err);
    }
  },

  async getMe(req, res, next) {
    try {
      return apiResponse.success(res, "Profile retrieved successfully", {
        user: {
          id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          role: req.user.role,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = authController;
