"use strict";
const invoiceService = require("../services/invoice.service");
const apiResponse = require("../utils/apiResponse.utils");

const invoiceController = {
  async getAll(req, res, next) {
    try {
      const filters = {
        status: req.query.status,
        page: req.query.page ? parseInt(req.query.page, 10) : 1,
        limit: req.query.limit ? parseInt(req.query.limit, 10) : 20,
      };
      const result = await invoiceService.listInvoices(filters);
      return apiResponse.success(res, "Invoices retrieved successfully", result);
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const invoice = await invoiceService.getInvoice(req.params.id);
      return apiResponse.success(res, "Invoice retrieved successfully", invoice);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const invoice = await invoiceService.createInvoice(req.body, req.user._id);
      return apiResponse.success(res, "Invoice created successfully", invoice, 201);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const invoice = await invoiceService.updateInvoice(req.params.id, req.body);
      return apiResponse.success(res, "Invoice updated successfully", invoice);
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      await invoiceService.deleteInvoice(req.params.id);
      return apiResponse.success(res, "Invoice deleted successfully");
    } catch (err) {
      next(err);
    }
  },
};

module.exports = invoiceController;
