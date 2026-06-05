"use strict";
const inquiryRepository = require("../repositories/inquiry.repository");

const inquiryService = {
  async listInquiries(filters) {
    return inquiryRepository.findAll(filters);
  },

  async getInquiry(id) {
    const inquiry = await inquiryRepository.findById(id);
    if (!inquiry) {
      throw { status: 404, message: "Inquiry not found" };
    }
    return inquiry;
  },

  async createInquiry(data) {
    return inquiryRepository.create(data);
  },

  async updateInquiry(id, data) {
    const updated = await inquiryRepository.update(id, data);
    if (!updated) {
      throw { status: 404, message: "Inquiry not found" };
    }
    return updated;
  },

  async deleteInquiry(id) {
    const deleted = await inquiryRepository.delete(id);
    if (!deleted) {
      throw { status: 404, message: "Inquiry not found" };
    }
    return deleted;
  },

  async getDashboardStats() {
    const agg = await inquiryRepository.countByStatus();
    const stats = { new: 0, contacted: 0, "in-progress": 0, closed: 0 };
    agg.forEach((item) => {
      if (stats[item._id] !== undefined) {
        stats[item._id] = item.count;
      }
    });
    return stats;
  },
};

module.exports = inquiryService;
