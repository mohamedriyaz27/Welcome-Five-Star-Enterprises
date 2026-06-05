"use strict";
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    invoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
      default: null,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0.01, "Amount must be greater than 0"],
    },
    paymentMethod: {
      type: String,
      enum: ["UPI", "Cash", "Card", "Bank Transfer", "Cheque", "Other"],
      required: [true, "Payment method is required"],
    },
    transactionId: {
      type: String,
      trim: true,
      default: null,
    },
    customer: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
      maxlength: [150, "Customer name cannot exceed 150 characters"],
    },
    note: {
      type: String,
      trim: true,
      maxlength: [300, "Note cannot exceed 300 characters"],
    },
    upiId: {
      type: String,
      trim: true,
      default: null,
    },
    status: {
      type: String,
      enum: ["completed", "pending", "failed", "refunded"],
      default: "completed",
    },
    recordedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

paymentSchema.index({ status: 1, createdAt: -1 });
paymentSchema.index({ invoiceId: 1 });

module.exports = mongoose.model("Payment", paymentSchema);
