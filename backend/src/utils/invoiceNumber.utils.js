"use strict";
const Invoice = require("../models/Invoice.model");

async function generateNextInvoiceNumber() {
  const currentYear = new Date().getFullYear();
  
  // Find latest invoice for this year
  const regex = new RegExp(`^WE-${currentYear}-`);
  const latest = await Invoice.findOne({ invoiceNumber: regex })
    .sort({ invoiceNumber: -1 })
    .exec();

  let nextNum = 1;
  if (latest && latest.invoiceNumber) {
    const parts = latest.invoiceNumber.split("-");
    const lastSeq = parseInt(parts[2], 10);
    if (!isNaN(lastSeq)) {
      nextNum = lastSeq + 1;
    }
  }

  const paddedNum = String(nextNum).padStart(5, "0");
  return `WE-${currentYear}-${paddedNum}`;
}

module.exports = {
  generateNextInvoiceNumber,
};
