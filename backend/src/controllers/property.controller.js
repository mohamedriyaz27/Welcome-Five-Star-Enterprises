"use strict";
const propertyService = require("../services/property.service");
const apiResponse = require("../utils/apiResponse.utils");

const propertyController = {
  async getAll(req, res, next) {
    try {
      const filters = {
        type: req.query.type,
        status: req.query.status,
        featured: req.query.featured === "true" ? true : req.query.featured === "false" ? false : undefined,
        location: req.query.location,
        minPrice: req.query.minPrice ? parseFloat(req.query.minPrice) : undefined,
        maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice) : undefined,
        search: req.query.search,
        page: req.query.page ? parseInt(req.query.page, 10) : 1,
        limit: req.query.limit ? parseInt(req.query.limit, 10) : 20,
      };

      const result = await propertyService.listProperties(filters);
      return apiResponse.success(res, "Properties retrieved successfully", result);
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const property = await propertyService.getProperty(req.params.id);
      return apiResponse.success(res, "Property retrieved successfully", property);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const property = await propertyService.createProperty(req.body);
      return apiResponse.success(res, "Property created successfully", property, 201);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const property = await propertyService.updateProperty(req.params.id, req.body);
      return apiResponse.success(res, "Property updated successfully", property);
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      await propertyService.deleteProperty(req.params.id);
      return apiResponse.success(res, "Property deleted successfully");
    } catch (err) {
      next(err);
    }
  },

  async getFeatured(req, res, next) {
    try {
      const properties = await propertyService.getFeatured();
      return apiResponse.success(res, "Featured properties retrieved successfully", properties);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = propertyController;
