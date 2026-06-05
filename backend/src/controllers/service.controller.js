"use strict";
const serviceService = require("../services/service.service");
const apiResponse = require("../utils/apiResponse.utils");

const serviceController = {
  async getAll(req, res, next) {
    try {
      const filters = {
        category: req.query.category,
        active: req.query.active === "true" ? true : req.query.active === "false" ? false : undefined,
      };
      const services = await serviceService.listServices(filters);
      return apiResponse.success(res, "Services retrieved successfully", services);
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const service = await serviceService.getService(req.params.id);
      return apiResponse.success(res, "Service retrieved successfully", service);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const service = await serviceService.createService(req.body);
      return apiResponse.success(res, "Service created successfully", service, 201);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const service = await serviceService.updateService(req.params.id, req.body);
      return apiResponse.success(res, "Service updated successfully", service);
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      await serviceService.deleteService(req.params.id);
      return apiResponse.success(res, "Service deleted successfully");
    } catch (err) {
      next(err);
    }
  },
};

module.exports = serviceController;
