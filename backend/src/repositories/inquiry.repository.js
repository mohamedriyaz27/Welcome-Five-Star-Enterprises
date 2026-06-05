"use strict";
const Inquiry = require("../models/Inquiry.model");

const inquiryRepository = {
  async findAll({ status, page = 1, limit = 30 } = {}) {
    const filter = {};
    if (status) filter.status = status;
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Inquiry.find(filter)
        .populate("propertyId", "title location")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Inquiry.countDocuments(filter),
    ]);
    return { items, total, page, limit, pages: Math.ceil(total / limit) };
  },

  async findById(id) {
    return Inquiry.findById(id).populate("propertyId", "title location");
  },

  async create(data) {
    const inquiry = new Inquiry(data);
    return inquiry.save();
  },

  async update(id, data) {
    return Inquiry.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  },

  async delete(id) {
    return Inquiry.findByIdAndDelete(id);
  },

  async countByStatus() {
    return Inquiry.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
  },
};

module.exports = inquiryRepository;
