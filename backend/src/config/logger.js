"use strict";
const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const path = require("path");

const { combine, timestamp, printf, colorize, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
  let log = `[${timestamp}] ${level}: ${message}`;
  if (stack) log += `\n${stack}`;
  if (Object.keys(meta).length) log += ` ${JSON.stringify(meta)}`;
  return log;
});

const logsDir = path.join(__dirname, "../../logs");

const transports = [
  new winston.transports.Console({
    format: combine(colorize(), timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), errors({ stack: true }), logFormat),
  }),
];

// File transports in non-test environments
if (process.env.NODE_ENV !== "test") {
  transports.push(
    new DailyRotateFile({
      dirname: logsDir,
      filename: "error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      level: "error",
      maxFiles: "14d",
      format: combine(timestamp(), errors({ stack: true }), logFormat),
    }),
    new DailyRotateFile({
      dirname: logsDir,
      filename: "combined-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "7d",
      format: combine(timestamp(), logFormat),
    })
  );
}

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  transports,
  exitOnError: false,
});

module.exports = logger;
