# Deployment Guide

## WELCOME ENTERPRISES – TAJ REAL ESTATE

---

## Option 1: Vercel (Frontend – Static Site)

### Prerequisites
- [Vercel account](https://vercel.com)
- [Git](https://git-scm.com) repository

### Steps

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial website for Welcome Enterprises"
   git remote add origin https://github.com/YOUR_USERNAME/welcome-enterprises.git
   git push -u origin main
   ```

2. **Import on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Framework Preset: **Other**
   - Root Directory: `.` (project root)
   - Build Command: leave empty
   - Output Directory: `.`

3. **Deploy**
   - Click **Deploy**
   - Your site will be live at `https://your-project.vercel.app`

4. **Custom Domain**
   - Vercel Dashboard → Project → Settings → Domains
   - Add your domain (e.g. `welcomeenterprises.in`)

### Local Preview
```bash
npx serve .
# Open http://localhost:3000
```

---

## Option 2: Render (Django Backend)

### Prerequisites
- [Render account](https://render.com)
- MySQL database (Render PostgreSQL or external MySQL)

### Steps

1. **Create `render.yaml`** in project root (see `backend/render.yaml`)

2. **Create Web Service on Render**
   - New → Web Service
   - Connect GitHub repo
   - Environment: **Python 3**
   - Build Command: `pip install -r backend/requirements.txt && python backend/manage.py collectstatic --noinput`
   - Start Command: `gunicorn welcome_api.wsgi:application`

3. **Environment Variables**
   ```
   DATABASE_URL=mysql://user:pass@host/db
   SECRET_KEY=your-secret-key
   ALLOWED_HOSTS=your-app.onrender.com
   CORS_ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
   ```

4. **Create MySQL Database on Render**
   - New → PostgreSQL or use external MySQL
   - Run `backend/schema.sql` to create tables

---

## Option 3: Netlify / GitHub Pages

### GitHub Pages
```bash
# Enable in repo Settings → Pages → Source: main branch
```

### Netlify
- Drag & drop project folder to [app.netlify.com/drop](https://app.netlify.com/drop)
- Or connect Git repo

---

## Connect Frontend to Backend

Update API base URL in `js/api.js` (create when backend is live):

```javascript
const API_BASE = "https://your-api.onrender.com/api/v1";
```

Replace `localStorage` calls in admin scripts with `fetch()` to Django API.

---

## Admin Access (Current Static Version)

| Field | Value |
|-------|-------|
| URL | `/admin/login.html` |
| Username | `admin` |
| Password | `welcome@2026` |

**Change credentials before production!**

---

## SEO Checklist

- [x] Meta descriptions on all pages
- [x] Semantic HTML structure
- [x] `robots.txt` and `sitemap.xml`
- [ ] Submit sitemap to Google Search Console
- [ ] Add Google Analytics
- [ ] Replace placeholder map with exact office coordinates

---

## Performance Tips

1. Compress images in `/assets/`
2. Enable CDN caching on Vercel
3. Add your logo to `assets/logo.png` and update navbar
4. Use lazy loading (already on property images)

---

## Post-Deployment

1. Update phone numbers and UPI ID in `js/main.js` and `admin/payments.html`
2. Update Google Maps embed with exact office location
3. Change admin password
4. Set up email for inquiries (Django + SendGrid/SMTP)
