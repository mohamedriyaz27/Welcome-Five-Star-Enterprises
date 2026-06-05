"use strict";
const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      maxlength: [300, "Location cannot exceed 300 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    priceLabel: {
      type: String,
      trim: true,
      // e.g. "₹45L", "₹1.2Cr"
    },
    area: {
      type: String,
      trim: true,
      // e.g. "1200 sqft", "5 cents"
    },
    type: {
      type: String,
      enum: ["house", "land", "commercial", "apartment", "villa"],
      required: [true, "Property type is required"],
    },
    status: {
      type: String,
      enum: ["active", "sold", "pending"],
      default: "active",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    images: [
      {
        url: String,
        alt: String,
      },
    ],
    bedrooms: Number,
    bathrooms: Number,
    parking: Boolean,
    amenities: [String],
    contactPhone: {
      type: String,
      default: "90030 88794",
    },
  },
  { timestamps: true }
);

propertySchema.index({ location: "text", title: "text" });
propertySchema.index({ type: 1, status: 1, featured: -1 });

module.exports = mongoose.model("Property", propertySchema);
