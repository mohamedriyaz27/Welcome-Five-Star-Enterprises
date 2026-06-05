"use strict";
const Invoice = require("../models/Invoice.model");
const Payment = require("../models/Payment.model");

const reportService = {
  async getMonthlySales() {
    // We aggregate both Invoices (Bills) and Manual Payments to compile monthly sales
    // Matching client aggregation logic: combining both sets and group by month key YYYY-MM

    const [invoices, payments] = await Promise.all([
      Invoice.find({ paymentStatus: "paid" }),
      Payment.find({ status: "completed" }),
    ]);

    const combined = [
      ...invoices.map((inv) => ({
        date: inv.createdAt,
        amount: inv.total,
        type: "bill",
      })),
      ...payments.map((pmt) => ({
        date: pmt.createdAt,
        amount: pmt.amount,
        type: "payment",
      })),
    ];

    const monthlyMap = {};

    combined.forEach((item) => {
      const d = new Date(item.date);
      if (isNaN(d.getTime())) return;
      
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const key = `${year}-${month}`; // YYYY-MM

      if (!monthlyMap[key]) {
        monthlyMap[key] = {
          month: key,
          transactions: 0,
          bills: 0,
          payments: 0,
          total_sales: 0,
        };
      }

      monthlyMap[key].transactions += 1;
      if (item.type === "bill") {
        monthlyMap[key].bills += 1;
      } else {
        monthlyMap[key].payments += 1;
      }
      monthlyMap[key].total_sales += item.amount;
    });

    // Return sorted by month descending (or ascending, let's sort chronologically ascending for ease of chart plotting, client sorts or reverses as needed)
    return Object.values(monthlyMap).sort((a, b) => a.month.localeCompare(b.month));
  },
};

module.exports = reportService;
