"use strict";
const serviceRepository = require("../repositories/service.repository");

const serviceService = {
  async listServices(filters) {
    return serviceRepository.findAll(filters);
  },

  async getService(id) {
    const service = await serviceRepository.findById(id);
    if (!service) {
      throw { status: 404, message: "Service not found" };
    }
    return service;
  },

  async createService(data) {
    return serviceRepository.create(data);
  },

  async updateService(id, data) {
    const updated = await serviceRepository.update(id, data);
    if (!updated) {
      throw { status: 404, message: "Service not found" };
    }
    return updated;
  },

  async deleteService(id) {
    const deleted = await serviceRepository.delete(id);
    if (!deleted) {
      throw { status: 404, message: "Service not found" };
    }
    return deleted;
  },
};

module.exports = serviceService;
