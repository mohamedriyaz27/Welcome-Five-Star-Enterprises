"use strict";
const Service = require("../models/Service.model");

const serviceRepository = {
  async findAll({ category, active } = {}) {
    const filter = {};
    if (category) filter.category = category;
    if (active !== undefined) filter.active = active;
    return Service.find(filter).sort({ sortOrder: 1, createdAt: 1 });
  },

  async findById(id) {
    return Service.findById(id);
  },

  async create(data) {
    const service = new Service(data);
    return service.save();
  },

  async update(id, data) {
    return Service.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  },

  async delete(id) {
    return Service.findByIdAndDelete(id);
  },
};

module.exports = serviceRepository;
