"use strict";
const mongoose = require("mongoose");
const logger = require("./logger");

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  logger.error("MONGO_URI is not defined in environment variables");
  process.exit(1);
}

const options = {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
  minPoolSize: 2,
};

async function connectDB() {
  try {

    await mongoose.connect(MONGO_URI, options);
    logger.info("MongoDB Atlas connected successfully");
  } catch (err) {
    logger.error("MongoDB connection failed", { error: err.message });
    process.exit(1);
  }
}

mongoose.connection.on("disconnected", () => {
  logger.warn("MongoDB disconnected – attempting reconnect...");
});

mongoose.connection.on("reconnected", () => {
  logger.info("MongoDB reconnected");
});

mongoose.connection.on("error", (err) => {
  logger.error("MongoDB error", { error: err.message });
});

module.exports = { connectDB };
