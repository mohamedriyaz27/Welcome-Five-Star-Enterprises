"use strict";
const reportService = require("../services/report.service");
const apiResponse = require("../utils/apiResponse.utils");

const reportController = {
  async getMonthlySales(req, res, next) {
    try {
      const data = await reportService.getMonthlySales();
      return apiResponse.success(res, "Monthly sales report aggregated successfully", data);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = reportController;
