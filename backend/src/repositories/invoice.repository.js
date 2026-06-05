"use strict";
const Invoice = require("../models/Invoice.model");

const invoiceRepository = {
  async findAll({ page = 1, limit = 20, status } = {}) {
    const filter = {};
    if (status) filter.paymentStatus = status;

    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Invoice.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Invoice.countDocuments(filter),
    ]);
    return { items, total, page, limit, pages: Math.ceil(total / limit) };
  },

  async findById(id) {
    return Invoice.findById(id);
  },

  async findByInvoiceNumber(invoiceNumber) {
    return Invoice.findOne({ invoiceNumber });
  },

  async create(data) {
    const invoice = new Invoice(data);
    return invoice.save();
  },

  async update(id, data) {
    return Invoice.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  },

  async delete(id) {
    return Invoice.findByIdAndDelete(id);
  },

  async countTotal() {
    return Invoice.countDocuments();
  }
};

module.exports = invoiceRepository;
