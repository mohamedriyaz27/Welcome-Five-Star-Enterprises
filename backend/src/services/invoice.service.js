"use strict";
const invoiceRepository = require("../repositories/invoice.repository");
const { generateNextInvoiceNumber } = require("../utils/invoiceNumber.utils");

const invoiceService = {
  async listInvoices(filters) {
    return invoiceRepository.findAll(filters);
  },

  async getInvoice(id) {
    const invoice = await invoiceRepository.findById(id);
    if (!invoice) {
      throw { status: 404, message: "Invoice not found" };
    }
    return invoice;
  },

  async createInvoice(data, userId) {
    // Generate code-controlled unique invoice number sequential by year
    const invoiceNumber = await generateNextInvoiceNumber();
    
    // Compute total based on includeGst
    const subtotal = data.items.reduce((acc, item) => acc + (item.qty * item.rate), 0);
    const gstRate = data.includeGst ? 0.18 : 0;
    const gstAmount = subtotal * gstRate;
    const total = subtotal + gstAmount;

    const payload = {
      invoiceNumber,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      items: data.items,
      subtotal,
      gstRate: data.includeGst ? 18 : 0,
      gstAmount,
      total,
      createdBy: userId,
      paymentStatus: "paid", // By default client UI handles paid bills, can be extended
    };

    return invoiceRepository.create(payload);
  },

  async updateInvoice(id, data) {
    const updated = await invoiceRepository.update(id, data);
    if (!updated) {
      throw { status: 404, message: "Invoice not found" };
    }
    return updated;
  },

  async deleteInvoice(id) {
    const deleted = await invoiceRepository.delete(id);
    if (!deleted) {
      throw { status: 404, message: "Invoice not found" };
    }
    return deleted;
  },
};

module.exports = invoiceService;
