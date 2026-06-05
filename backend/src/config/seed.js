"use strict";
require("dotenv").config({ path: require("path").join(__dirname, "../../.env") });

const { connectDB } = require("./db");
const User = require("../models/User.model");
const logger = require("./logger");

async function seed() {
  await connectDB();

  const email = process.env.SEED_ADMIN_EMAIL || "admin@welcomeenterprises.com";
  const password = process.env.SEED_ADMIN_PASSWORD || "welcome@2026";
  const name = process.env.SEED_ADMIN_NAME || "Admin";

  const existing = await User.findOne({ email });
  if (existing) {
    logger.info(`Admin user already exists: ${email}`);
    process.exit(0);
  }

  const admin = new User({ name, email, password, role: "admin" });
  await admin.save();

  logger.info("─────────────────────────────────────────");
  logger.info("Admin user seeded successfully");
  logger.info(`  Email    : ${email}`);
  logger.info(`  Password : ${password}`);
  logger.info("  ⚠ Change the password after first login!");
  logger.info("─────────────────────────────────────────");
  process.exit(0);
}

seed().catch((err) => {
  logger.error("Seed failed", { error: err.message });
  process.exit(1);
});
