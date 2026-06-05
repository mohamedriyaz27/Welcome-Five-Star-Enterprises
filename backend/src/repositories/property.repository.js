"use strict";
const Property = require("../models/Property.model");

const propertyRepository = {
  async findAll({ type, status, featured, location, minPrice, maxPrice, search, page = 1, limit = 20 } = {}) {
    const filter = {};
    if (type) filter.type = type;
    if (status) filter.status = status;
    if (featured !== undefined) filter.featured = featured;
    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};
      if (minPrice !== undefined) filter.price.$gte = minPrice;
      if (maxPrice !== undefined) filter.price.$lte = maxPrice;
    }
    if (location) filter.location = new RegExp(location, "i");
    if (search) filter.$text = { $search: search };

    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Property.find(filter).sort({ featured: -1, createdAt: -1 }).skip(skip).limit(limit),
      Property.countDocuments(filter),
    ]);
    return { items, total, page, limit, pages: Math.ceil(total / limit) };
  },

  async findById(id) {
    return Property.findById(id);
  },

  async create(data) {
    const property = new Property(data);
    return property.save();
  },

  async update(id, data) {
    return Property.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  },

  async delete(id) {
    return Property.findByIdAndDelete(id);
  },

  async findFeatured(limit = 3) {
    return Property.find({ featured: true, status: "active" }).sort({ createdAt: -1 }).limit(limit);
  },
};

module.exports = propertyRepository;
