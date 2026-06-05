# Welcome Enterprises – Taj Real Estate REST API Documentation

This API powers the Welcome Enterprises admin panel, property search, billing system, and lead collection.

## Base URL
`http://localhost:5000/api`

---

## Authentication Endpoints

All administrative and operational endpoints require an `Authorization` header containing a valid JSON Web Token (JWT).
Format: `Authorization: Bearer <token>`

### 1. Login
- **Method / Path:** `POST /auth/login`
- **Rate Limit:** 10 requests / 15 minutes per IP
- **Request Body:**
  ```json
  {
    "email": "admin@welcomeenterprises.com",
    "password": "welcome@2026"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "user": {
        "id": "60c72b2f9b1d8e23f0000001",
        "name": "Admin",
        "email": "admin@welcomeenterprises.com",
        "role": "admin"
      },
      "accessToken": "eyJhbGciOi..."
    }
  }
  ```

### 2. Refresh Token
- **Method / Path:** `POST /auth/refresh-token`
- **Request Body:** Token sent in `refreshToken` cookie automatically, or manually via body:
  ```json
  {
    "refreshToken": "eyJhbGciOi..."
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Token refreshed successfully",
    "data": {
      "accessToken": "eyJhbGciOi..."
    }
  }
  ```

### 3. Logout
- **Method / Path:** `POST /auth/logout`
- **Headers:** `Authorization: Bearer <token>`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Logout successful"
  }
  ```

### 4. Get Current User Profile
- **Method / Path:** `GET /auth/me`
- **Headers:** `Authorization: Bearer <token>`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Profile retrieved successfully",
    "data": {
      "user": {
        "id": "60c72b2f9b1d8e23f0000001",
        "name": "Admin",
        "email": "admin@welcomeenterprises.com",
        "role": "admin"
      }
    }
  }
  ```

---

## Properties Endpoints

### 1. List Properties (Public)
- **Method / Path:** `GET /properties`
- **Query Parameters (Optional):**
  - `type`: `house` | `land` | `commercial` | `apartment` | `villa`
  - `status`: `active` | `sold` | `pending`
  - `featured`: `true` | `false`
  - `location`: Case-insensitive text search (e.g. `Chennai`)
  - `minPrice`: Number
  - `maxPrice`: Number
  - `page`: Number (Default: 1)
  - `limit`: Number (Default: 20)
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Properties retrieved successfully",
    "data": {
      "items": [
        {
          "_id": "60c72b2f9b1d8e23f0000002",
          "title": "3 BHK Independent House",
          "location": "Chennai",
          "price": 8500000,
          "area": "1800 sq.ft",
          "type": "house",
          "status": "active",
          "featured": true,
          "images": [
            { "url": "https://images.unsplash.com/..." }
          ],
          "description": "Spacious house near main road."
        }
      ],
      "total": 1,
      "page": 1,
      "limit": 20,
      "pages": 1
    }
  }
  ```

### 2. Get Featured Properties (Public Quick View)
- **Method / Path:** `GET /properties/featured`
- **Response (200 OK):** Returns a list of the 3 most recently added featured properties.

---

## Inquiries Endpoints

### 1. Create Inquiry (Public)
- **Method / Path:** `POST /inquiries`
- **Request Body:**
  ```json
  {
    "customerName": "Ramesh Kumar",
    "mobile": "9876543210",
    "email": "ramesh@email.com",
    "message": "Interested in Sale Deed assistance",
    "serviceType": "legal"
  }
  ```

---

## Invoices & Billing Endpoints (Protected)

### 1. Create Invoice (Auto-numbered sequential by year)
- **Method / Path:** `POST /invoices`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "customerName": "Rajesh Gupta",
    "customerPhone": "9003088794",
    "items": [
      { "description": "Legal Sale Deed Drafting", "qty": 1, "rate": 5000 },
      { "description": "Stamp Paper Charges", "qty": 1, "rate": 1500 }
    ],
    "includeGst": true
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Invoice created successfully",
    "data": {
      "_id": "60c72b2f9b1d8e23f0000100",
      "invoiceNumber": "WE-2026-00001",
      "customerName": "Rajesh Gupta",
      "customerPhone": "9003088794",
      "items": [
        { "description": "Legal Sale Deed Drafting", "qty": 1, "rate": 5000, "amount": 5000 },
        { "description": "Stamp Paper Charges", "qty": 1, "rate": 1500, "amount": 1500 }
      ],
      "subtotal": 6500,
      "gstRate": 18,
      "gstAmount": 1170,
      "total": 7670,
      "paymentStatus": "paid",
      "createdAt": "2026-06-04T16:00:00.000Z"
    }
  }
  ```

---

## Reports & Analytics Endpoints (Protected)

### 1. Monthly Sales Reports
- **Method / Path:** `GET /reports/monthly-sales`
- **Headers:** `Authorization: Bearer <token>`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Monthly sales report aggregated successfully",
    "data": [
      {
        "month": "2026-05",
        "transactions": 45,
        "bills": 30,
        "payments": 15,
        "total_sales": 125000
      }
    ]
  }
  ```
