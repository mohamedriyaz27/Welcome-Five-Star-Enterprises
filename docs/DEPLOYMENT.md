# Welcome Enterprises – Taj Real Estate Deployment Guide

This document describes how to deploy the Node.js backend and connect it to MongoDB Atlas.

---

## 1. Database Setup (MongoDB Atlas)
1. Sign up/Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new shared cluster (free tier is sufficient).
3. Under **Database Access**, create a user with read/write privileges (choose a secure password).
4. Under **Network Access**, add an IP entry (add `0.0.0.0/32` for anywhere, or your server's static IP).
5. Click **Connect** → **Connect your application** → Copy the Connection String.
   It looks like:
   `mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/welcome_enterprises?retryWrites=true&w=majority`

---

## 2. Environment Configurations
Create a `.env` file in the `backend/` directory of the application:
```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/welcome_enterprises?retryWrites=true&w=majority
JWT_SECRET=use_a_long_random_string_here
JWT_REFRESH_SECRET=use_another_long_random_string_here
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d
CLIENT_ORIGIN=https://your-frontend-domain.com
```

---

## 3. Seed Initial Admin Account
Before starting the backend for the first time, run the seeding script to populate the database with your first administrator account:
```bash
cd backend
npm run seed
```
This script reads the credentials from `.env` (or defaults to `admin@welcomeenterprises.com` / `welcome@2026`) and saves the hashed admin user record into MongoDB.

---

## 4. Run Locally
To run the Node.js backend locally:
```bash
cd backend
npm install
npm run dev
```
The server will boot up and log:
`MongoDB Atlas connected successfully`
`Welcome Enterprises API running on port 5000`

---

## 5. Deployment Options

### Option A: Railway (Recommended)
1. Link your GitHub repository.
2. In Railway, click **New Project** → **Deploy from GitHub**.
3. Select your repository.
4. Add all Variables from `.env` under the **Variables** tab.
5. Railway reads the `backend/package.json` and start scripts automatically.

### Option B: Render
1. Go to Render.com and create a **Web Service**.
2. Connect your GitHub repository.
3. Set the **Root Directory** to `backend`.
4. Set **Build Command** to `npm install`.
5. Set **Start Command** to `node server.js`.
6. Add environment variables under **Environment**.
