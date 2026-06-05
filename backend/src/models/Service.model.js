"use strict";
const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
      maxlength: [150, "Name cannot exceed 150 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["legal", "real-estate", "hajj-umrah", "online", "documentation", "other"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    icon: {
      type: String,
      default: "briefcase",
      // Lucide icon name
    },
    price: {
      type: Number,
      default: 0,
      min: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

serviceSchema.index({ category: 1, active: 1, sortOrder: 1 });

module.exports = mongoose.model("Service", serviceSchema);
