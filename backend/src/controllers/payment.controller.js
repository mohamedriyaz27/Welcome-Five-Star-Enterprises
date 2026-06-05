"use strict";
const paymentService = require("../services/payment.service");
const apiResponse = require("../utils/apiResponse.utils");

const paymentController = {
  async getAll(req, res, next) {
    try {
      const filters = {
        page: req.query.page ? parseInt(req.query.page, 10) : 1,
        limit: req.query.limit ? parseInt(req.query.limit, 10) : 30,
      };
      const result = await paymentService.listPayments(filters);
      return apiResponse.success(res, "Payments retrieved successfully", result);
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const payment = await paymentService.getPayment(req.params.id);
      return apiResponse.success(res, "Payment retrieved successfully", payment);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const payment = await paymentService.createPayment(req.body, req.user._id);
      return apiResponse.success(res, "Payment recorded successfully", payment, 201);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const payment = await paymentService.updatePayment(req.params.id, req.body);
      return apiResponse.success(res, "Payment updated successfully", payment);
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      await paymentService.deletePayment(req.params.id);
      return apiResponse.success(res, "Payment deleted successfully");
    } catch (err) {
      next(err);
    }
  },
};

module.exports = paymentController;
