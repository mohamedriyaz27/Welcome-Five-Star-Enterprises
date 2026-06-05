"use strict";
const User = require("../models/User.model");

const userRepository = {
  async findByEmail(email) {
    return User.findOne({ email }).select("+password +refreshToken");
  },

  async findById(id) {
    return User.findById(id);
  },

  async findByIdWithRefreshToken(id) {
    return User.findById(id).select("+refreshToken");
  },

  async create(data) {
    const user = new User(data);
    return user.save();
  },

  async updateRefreshToken(id, token) {
    return User.findByIdAndUpdate(id, { refreshToken: token }, { new: true });
  },

  async updateLastLogin(id) {
    return User.findByIdAndUpdate(id, { lastLogin: new Date() });
  },

  async findAll(filter = {}) {
    return User.find(filter).sort({ createdAt: -1 });
  },
};

module.exports = userRepository;
