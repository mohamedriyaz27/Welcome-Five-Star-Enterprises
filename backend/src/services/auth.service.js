"use strict";
const userRepository = require("../repositories/user.repository");
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("../utils/jwt.utils");

const authService = {
  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user || !user.isActive) {
      throw { status: 401, message: "Invalid email or password" };
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw { status: 401, message: "Invalid email or password" };
    }

    const payload = { userId: user._id, role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await userRepository.updateRefreshToken(user._id, refreshToken);
    await userRepository.updateLastLogin(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  },

  async register(data) {
    const existing = await userRepository.findByEmail(data.email);
    if (existing) {
      throw { status: 400, message: "Email is already registered" };
    }
    return userRepository.create(data);
  },

  async refresh(token) {
    const decoded = verifyRefreshToken(token);
    if (!decoded) {
      throw { status: 401, message: "Invalid or expired refresh token" };
    }

    const user = await userRepository.findByIdWithRefreshToken(decoded.userId);
    if (!user || !user.isActive || user.refreshToken !== token) {
      throw { status: 401, message: "Invalid refresh token session" };
    }

    const payload = { userId: user._id, role: user.role };
    const accessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);

    await userRepository.updateRefreshToken(user._id, newRefreshToken);

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  },

  async logout(userId) {
    return userRepository.updateRefreshToken(userId, null);
  },
};

module.exports = authService;
