"use strict";
const propertyRepository = require("../repositories/property.repository");

const propertyService = {
  async listProperties(filters) {
    return propertyRepository.findAll(filters);
  },

  async getProperty(id) {
    const property = await propertyRepository.findById(id);
    if (!property) {
      throw { status: 404, message: "Property not found" };
    }
    return property;
  },

  async createProperty(data) {
    return propertyRepository.create(data);
  },

  async updateProperty(id, data) {
    const updated = await propertyRepository.update(id, data);
    if (!updated) {
      throw { status: 404, message: "Property not found" };
    }
    return updated;
  },

  async deleteProperty(id) {
    const deleted = await propertyRepository.delete(id);
    if (!deleted) {
      throw { status: 404, message: "Property not found" };
    }
    return deleted;
  },

  async getFeatured() {
    return propertyRepository.findFeatured();
  },
};

module.exports = propertyService;
