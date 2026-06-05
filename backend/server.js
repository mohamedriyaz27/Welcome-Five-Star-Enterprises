"use strict";
require("dotenv").config();

const http = require("http");
const app = require("./src/app");
const { connectDB } = require("./src/config/db");
const logger = require("./src/config/logger");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();
    const server = http.createServer(app);

    server.listen(PORT, () => {
      logger.info(`Welcome Enterprises API running on port ${PORT} [${process.env.NODE_ENV}]`);
    });

    // Graceful shutdown
    const shutdown = (signal) => {
      logger.info(`${signal} received – shutting down gracefully`);
      server.close(() => {
        logger.info("HTTP server closed");
        process.exit(0);
      });
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));

    process.on("unhandledRejection", (reason, promise) => {
      logger.error("Unhandled Rejection", { reason, promise });
    });

    process.on("uncaughtException", (err) => {
      logger.error("Uncaught Exception", { error: err.message, stack: err.stack });
      process.exit(1);
    });
  } catch (err) {
    logger.error("Failed to start server", { error: err.message });
    process.exit(1);
  }
}

startServer();
