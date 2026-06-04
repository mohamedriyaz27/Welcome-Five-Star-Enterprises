-- WELCOME ENTERPRISES – TAJ REAL ESTATE
-- MySQL Database Schema

CREATE DATABASE IF NOT EXISTS welcome_enterprises
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE welcome_enterprises;

-- Admin users
CREATE TABLE admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  role ENUM('admin', 'staff') DEFAULT 'staff',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Properties
CREATE TABLE properties (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  location VARCHAR(100) NOT NULL,
  property_type ENUM('house', 'land', 'commercial') NOT NULL,
  price DECIMAL(15, 2) NOT NULL,
  area VARCHAR(50),
  image_url VARCHAR(500),
  gallery JSON,
  featured BOOLEAN DEFAULT FALSE,
  status ENUM('available', 'sold', 'reserved') DEFAULT 'available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_location (location),
  INDEX idx_type (property_type),
  INDEX idx_price (price)
);

-- Services
CREATE TABLE services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  category ENUM('documentation', 'online', 'legal', 'property', 'hajj') NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Customer inquiries
CREATE TABLE inquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(100),
  message TEXT,
  service_type VARCHAR(50),
  property_id INT NULL,
  status ENUM('new', 'contacted', 'closed') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE SET NULL
);

-- Bills
CREATE TABLE bills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bill_no VARCHAR(30) NOT NULL UNIQUE,
  customer_name VARCHAR(100) NOT NULL,
  customer_phone VARCHAR(20),
  items JSON NOT NULL,
  subtotal DECIMAL(12, 2) NOT NULL,
  gst_amount DECIMAL(12, 2) DEFAULT 0,
  total DECIMAL(12, 2) NOT NULL,
  status ENUM('draft', 'paid', 'cancelled') DEFAULT 'paid',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_bill_date (created_at)
);

-- Payments
CREATE TABLE payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bill_id INT NULL,
  customer_name VARCHAR(100),
  amount DECIMAL(12, 2) NOT NULL,
  payment_method ENUM('UPI', 'Cash', 'Card', 'Bank Transfer') DEFAULT 'UPI',
  note VARCHAR(255),
  upi_reference VARCHAR(100),
  status ENUM('pending', 'completed', 'failed') DEFAULT 'completed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (bill_id) REFERENCES bills(id) ON DELETE SET NULL
);

-- Monthly sales view
CREATE VIEW monthly_sales AS
SELECT
  DATE_FORMAT(created_at, '%Y-%m') AS month_key,
  COUNT(*) AS transaction_count,
  SUM(total) AS total_sales
FROM bills
WHERE status = 'paid'
GROUP BY DATE_FORMAT(created_at, '%Y-%m');

-- Sample admin (password: welcome@2026 - bcrypt hash to be set in Django)
INSERT INTO admin_users (username, password_hash, full_name, role)
VALUES ('admin', 'CHANGE_IN_DJANGO', 'S.T. Syed Imran', 'admin');
