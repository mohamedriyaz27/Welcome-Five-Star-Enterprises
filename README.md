# WELCOME ENTERPRISES – TAJ REAL ESTATE

Premium business website for real estate, legal documentation, online government services, and Hajj & Umrah packages.

**Proprietor:** S.T. Syed Imran, M.A.  
**Contact:** 90030 88794 · 80562 56133 · 

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | HTML5, CSS3, JavaScript (Vanilla) |
| Icons | Lucide React (CDN) |
| Charts | Chart.js (Admin Sales Report) |
| QR | QRCode.js + Html5Qrcode |
| Data (Demo) | localStorage |
| Backend (Ready) | Django REST API structure |
| Database (Ready) | MySQL schema |

---

## Features

### Advocate Website (`/advocate/`)
- Premium **black + gold** law firm design for **Adv. Farook Ahamed, B.A., B.L.,**
- Practice areas, attestation, embassy, business registration
- FAQ, testimonials, contact form, WhatsApp & call buttons
- Open: `advocate/index.html`

### Public Website
- Responsive multi-page design (dark blue, gold, green theme)
- Home, About, Services, Properties, Legal, Online, Hajj & Umrah, Contact
- Property listings with filters (location, budget, type)
- Contact form with validation
- Google Maps integration
- WhatsApp floating button
- English + Tamil language toggle
- Dark/Light mode toggle
- SEO meta tags

### Admin Panel (`/admin/`)
- **Bill Print** – Create itemized bills, preview, print, save history
- **QR Payment** – Generate UPI QR for customers; scan QR to record payment
- **Monthly Sales Report** – Charts, breakdown, CSV export, print
- Dashboard with inquiries and stats

---

## Quick Start

### Run Locally
```bash
cd "Welcome Five Star Enterprises"
npx serve .
```
Open `http://localhost:3000`

### Admin Login
- URL: `http://localhost:3000/admin/login.html`
- Username: `admin`
- Password: `welcome@2026`

---

## Project Structure

```
├── index.html              # Home page
├── about.html
├── services.html
├── properties.html
├── legal-services.html
├── online-services.html
├── hajj-umrah.html
├── contact.html
├── admin/
│   ├── login.html
│   ├── dashboard.html
│   ├── bills.html          # Bill print
│   ├── payments.html       # QR scan & pay
│   └── sales-report.html   # Monthly sales
├── css/
│   ├── main.css
│   ├── admin.css
│   ├── print.css
│   └── variables.css
├── js/
│   ├── main.js
│   ├── components.js
│   ├── i18n.js
│   ├── properties.js
│   ├── admin.js
│   ├── bills.js
│   ├── payments.js
│   └── sales-report.js
├── data/
│   ├── properties.json
│   └── services.json
├── backend/
│   ├── schema.sql
│   └── api-structure.md
└── docs/
    └── DEPLOYMENT.md
```

---

## Deployment

See **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** for:
- Vercel (frontend)
- Render (Django backend)
- Custom domain setup

---

## Customization

1. Add your logo to `assets/logo.png`
2. Update UPI ID in `admin/payments.html`
3. Update map coordinates in `contact.html` and `index.html`
4. Change admin password in `js/admin.js`
5. Update `sitemap.xml` and `robots.txt` with your domain

---

## License

© WELCOME ENTERPRISES – TAJ REAL ESTATE. All rights reserved.
