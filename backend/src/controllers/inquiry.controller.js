"use strict";
const inquiryService = require("../services/inquiry.service");
const apiResponse = require("../utils/apiResponse.utils");

const inquiryController = {
  async getAll(req, res, next) {
    try {
      const filters = {
        status: req.query.status,
        page: req.query.page ? parseInt(req.query.page, 10) : 1,
        limit: req.query.limit ? parseInt(req.query.limit, 10) : 30,
      };
      const result = await inquiryService.listInquiries(filters);
      return apiResponse.success(res, "Inquiries retrieved successfully", result);
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const inquiry = await inquiryService.getInquiry(req.params.id);
      return apiResponse.success(res, "Inquiry retrieved successfully", inquiry);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const inquiry = await inquiryService.createInquiry(req.body);
      return apiResponse.success(res, "Inquiry submitted successfully", inquiry, 201);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const inquiry = await inquiryService.updateInquiry(req.params.id, req.body);
      return apiResponse.success(res, "Inquiry updated successfully", inquiry);
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      await inquiryService.deleteInquiry(req.params.id);
      return apiResponse.success(res, "Inquiry deleted successfully");
    } catch (err) {
      next(err);
    }
  },

  async getStats(req, res, next) {
    try {
      const stats = await inquiryService.getDashboardStats();
      return apiResponse.success(res, "Inquiry stats retrieved successfully", stats);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = inquiryController;
