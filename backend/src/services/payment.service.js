"use strict";
const paymentRepository = require("../repositories/payment.repository");

const paymentService = {
  async listPayments(filters) {
    return paymentRepository.findAll(filters);
  },

  async getPayment(id) {
    const payment = await paymentRepository.findById(id);
    if (!payment) {
      throw { status: 404, message: "Payment not found" };
    }
    return payment;
  },

  async createPayment(data, userId) {
    const payload = {
      ...data,
      recordedBy: userId,
      status: "completed",
    };
    return paymentRepository.create(payload);
  },

  async updatePayment(id, data) {
    const updated = await paymentRepository.update(id, data);
    if (!updated) {
      throw { status: 404, message: "Payment not found" };
    }
    return updated;
  },

  async deletePayment(id) {
    const deleted = await paymentRepository.delete(id);
    if (!deleted) {
      throw { status: 404, message: "Payment not found" };
    }
    return deleted;
  },
};

module.exports = paymentService;
