# 🚀 Deployment Guide - Cloudflare Workers Setup

This guide will help you deploy your portfolio with a secure Cloudflare Worker to hide your Gemini API key.

## ✅ What You Need

1. A Cloudflare account (free) - [Sign up here](   )
2. Node.js installed on your computer
3. Your Gemini API key: `AIzaSyBq8toKoQjJldg1PDaVhKWxIBHswzVcZ3w`

---

## 📋 Step-by-Step Instructions

### Step 1: Install Wrangler (Cloudflare CLI)

Open your terminal and run:

```bash
npm install -g wrangler
```

### Step 2: Login to Cloudflare

```bash
wrangler login
```

This will open your browser - login with your Cloudflare account.

### Step 3: Deploy Your Worker

Navigate to your portfolio folder and deploy:

```bash
cd d:\portfolio\test-port-main
wrangler deploy
```

After deployment, you'll see a URL like:
```
https://portfolio-gemini-proxy.YOUR_SUBDOMAIN.workers.dev
```

**Copy this URL!** You'll need it in the next step.

### Step 4: Add Your API Key as a Secret

Run this command to securely store your Gemini API key:

```bash
wrangler secret put GEMINI_API_KEY
```

When prompted, paste your API key: `AIzaSyBq8toKoQjJldg1PDaVhKWxIBHswzVcZ3w`

✅ **Your API key is now stored securely in Cloudflare and won't be visible in your code!**

### Step 5: Update Your Frontend

Open `assets/js/app.js` and find line 595:

```javascript
const WORKER_API_URL = 'https://portfolio-gemini-proxy.YOUR_SUBDOMAIN.workers.dev';
```

Replace `YOUR_SUBDOMAIN` with the actual URL from Step 3.

For example:
```javascript
const WORKER_API_URL = 'https://portfolio-gemini-proxy.samikhalfi.workers.dev';
```

### Step 6: Deploy Your Static Site to Namecheap

1. Build your CSS (if not already done):
   ```bash
   sass assets/scss/styles.scss assets/css/styles.css
   ```

2. Upload all files to your Namecheap hosting via:
   - cPanel File Manager, or
   - FTP client (like FileZilla)

3. Make sure to upload:
   - index.html
   - assets/ folder (with updated app.js)
   - All other files

---

## 🎉 That's It!

Your portfolio is now live with a secure API setup:

- ✅ API key hidden on Cloudflare Workers (not in your frontend code)
- ✅ Fast global CDN with Cloudflare
- ✅ Free tier: 100,000 requests per day
- ✅ Anyone can view your code - but they can't see or steal your API key!

---

## 🔄 To Update Your Worker Later

If you need to change the worker code:

```bash
wrangler deploy
```

If you need to update your API key:

```bash
wrangler secret put GEMINI_API_KEY
```

---

## 🆘 Troubleshooting

**Problem:** Worker URL doesn't work
- Make sure you ran `wrangler deploy` successfully
- Check the URL matches exactly what was shown after deployment

**Problem:** "API key invalid" errors
- Re-run: `wrangler secret put GEMINI_API_KEY`
- Make sure you pasted the correct API key

**Problem:** CORS errors
- The worker.js already has CORS headers configured
- Make sure you're using the correct Worker URL in app.js

---

## 💰 Cloudflare Workers Free Tier

- 100,000 requests per day
- 10ms CPU time per request
- More than enough for a portfolio site!

If you exceed limits, Cloudflare will email you. The paid plan is only $5/month for 10 million requests.
