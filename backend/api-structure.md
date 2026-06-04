# Django REST API Structure

## Base URL
`https://api.yourdomain.com/api/v1/`

## Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login/` | Admin login (JWT) |
| POST | `/auth/refresh/` | Refresh token |
| POST | `/auth/logout/` | Logout |

### Properties
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/properties/` | List (filters: location, type, max_price) |
| GET | `/properties/{id}/` | Detail |
| POST | `/properties/` | Create (admin) |
| PUT | `/properties/{id}/` | Update (admin) |
| DELETE | `/properties/{id}/` | Delete (admin) |

### Services
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/services/` | List by category |
| POST | `/services/` | Create (admin) |

### Inquiries
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/inquiries/` | Public contact form |
| GET | `/inquiries/` | List (admin) |
| PATCH | `/inquiries/{id}/` | Update status |

### Bills
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/bills/` | List bills |
| POST | `/bills/` | Create bill |
| GET | `/bills/{id}/` | Bill detail |
| GET | `/bills/{id}/print/` | PDF print view |

### Payments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/payments/` | Record payment |
| POST | `/payments/generate-qr/` | Generate UPI QR payload |
| GET | `/payments/` | Payment history |

### Reports
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/reports/monthly-sales/` | Monthly sales report |
| GET | `/reports/monthly-sales/?month=2026-05` | Filter by month |
| GET | `/reports/export-csv/` | CSV export |

## Request Examples

### Create Inquiry
```json
POST /api/v1/inquiries/
{
  "name": "John Doe",
  "phone": "9876543210",
  "email": "john@email.com",
  "message": "Need Sale Deed",
  "service_type": "legal"
}
```

### Create Bill
```json
POST /api/v1/bills/
{
  "customer_name": "Customer",
  "customer_phone": "9003088794",
  "items": [
    {"desc": "Documentation", "qty": 1, "rate": 500}
  ],
  "include_gst": true
}
```

### Monthly Sales Response
```json
GET /api/v1/reports/monthly-sales/
[
  {
    "month": "2026-05",
    "transactions": 45,
    "bills": 30,
    "payments": 15,
    "total_sales": 125000.00
  }
]
```

## Django Apps Structure
```
backend/
├── welcome_api/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── accounts/      # Admin auth
├── properties/    # Property CRUD
├── services/      # Service management
├── billing/       # Bills & payments
├── inquiries/     # Contact inquiries
└── reports/       # Sales reports
```
