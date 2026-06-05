"use strict";
const Payment = require("../models/Payment.model");

const paymentRepository = {
  async findAll({ page = 1, limit = 30 } = {}) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Payment.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Payment.countDocuments(),
    ]);
    return { items, total, page, limit, pages: Math.ceil(total / limit) };
  },

  async findById(id) {
    return Payment.findById(id);
  },

  async create(data) {
    const payment = new Payment(data);
    return payment.save();
  },

  async update(id, data) {
    return Payment.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  },

  async delete(id) {
    return Payment.findByIdAndDelete(id);
  },
};

module.exports = paymentRepository;
