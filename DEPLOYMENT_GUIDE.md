# Coolify Deployment Guide - Verdant Digital

This guide will help you deploy both the frontend and backend to Coolify.

## Overview

Your application now has **TWO** separate services:

1. **Frontend** (React/Vite) - Serves the website
2. **Backend** (Node/Express) - Handles Stripe payments

Both need to be deployed separately to Coolify.

---

## Part 1: Get Your Stripe Secret Key

Before deploying, you need to get your Stripe **secret key**:

1. Log in to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Go to **Developers** → **API Keys**
3. Copy your **Secret key** (starts with `sk_live_...`)
4. **Keep this safe!** You'll add it to Coolify shortly

---

## Part 2: Deploy Backend (API)

### Create Backend Application in Coolify

1. **Click "New Application"**
2. **Fill in these details:**
   - **Application Name:** `verdant-digital-backend`
   - **Source Type:** Git Repository
   - **Repository URL:** `https://github.com/jspaterson000/verdant-digital.git`
   - **Branch:** `master`
   - **Base Directory:** `backend` ⚠️ **IMPORTANT**
   - **Build Pack:** Docker
   - **Dockerfile Location:** `Dockerfile`
   - **Port:** `3001`

3. **Set Domain:**
   - Domain: `api.verdantdigital.com.au`
   - Enable SSL: ✅

4. **Add Environment Variables** (Runtime, NOT build args):

```env
STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_temporary_placeholder
FRONTEND_URL=https://verdantdigital.com.au
PORT=3001
```

**Note:** Use your actual secret key from Part 1. We'll update the webhook secret in Part 4.

5. **Deploy!**

Wait for deployment to complete. Your API will be at `https://api.verdantdigital.com.au`

---

## Part 3: Deploy Frontend (Website)

### Create Frontend Application in Coolify

1. **Click "New Application"**
2. **Fill in these details:**
   - **Application Name:** `verdant-digital-frontend`
   - **Source Type:** Git Repository
   - **Repository URL:** `https://github.com/jspaterson000/verdant-digital.git`
   - **Branch:** `master`
   - **Base Directory:** Leave empty (root) ⚠️ **IMPORTANT**
   - **Build Pack:** Docker
   - **Dockerfile Location:** `Dockerfile`
   - **Port:** `80`

3. **Set Domain:**
   - Domain: `verdantdigital.com.au`
   - Enable SSL: ✅

4. **Add Build Arguments** (NOT environment variables):

```env
VITE_WEB3FORMS_ACCESS_KEY=1525a1a8-0064-48eb-b64f-a7a584c64253
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_51SVBDYIXN4PzuK3wlL9JEZua57lfB3jkeVwUMtPhI4NtGIsA7qpujVQbQXOI183iFjX2LdZ4h7sRjRE0tIzEb73V00FDOvz5Ub
VITE_BACKEND_URL=https://api.verdantdigital.com.au
GEMINI_API_KEY=PLACEHOLDER_API_KEY
```

5. **Deploy!**

---

## Part 4: Configure Stripe Webhooks

Stripe needs to send payment confirmations to your backend.

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/) → **Developers** → **Webhooks**
2. Click **Add endpoint**
3. **Endpoint URL:** `https://api.verdantdigital.com.au/webhook`
4. **Events to send:**
   - Select `payment_intent.succeeded`
   - Select `payment_intent.payment_failed`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_...`)
7. **Update Backend Environment Variables in Coolify:**
   - Go to your backend application settings
   - Update `STRIPE_WEBHOOK_SECRET` with the signing secret
   - Redeploy the backend

---

## Part 5: Test Your Deployment

### Test the Backend API

```bash
curl https://api.verdantdigital.com.au/health
```

Should return: `{"status":"healthy","timestamp":"..."}`

### Test the Frontend

1. Visit `https://verdantdigital.com.au`
2. Click "Get Started" or "Start Your Build"
3. Fill in the checkout form
4. Use Stripe test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC
   - Any ZIP code
5. Submit payment

If everything works, you'll see:
- Payment processing
- Success confirmation
- Check Stripe Dashboard to see the payment

---

## Summary - What You Deployed

### Frontend (verdantdigital.com.au)
- Static React website served by nginx
- Collects payment information
- Calls backend API to process payments

### Backend (api.verdantdigital.com.au)
- Node.js Express API
- Securely stores Stripe secret key
- Creates payment intents
- Receives webhook notifications

---

## Troubleshooting

### "Payment failed" error
- Check that `VITE_BACKEND_URL` is set correctly in frontend build args
- Check that backend is running: `curl https://api.verdantdigital.com.au/health`
- Check backend logs in Coolify

### "CORS error"
- Make sure `FRONTEND_URL` in backend matches your actual frontend domain
- Check browser console for specific CORS error

### Webhooks not working
- Verify webhook secret is correct
- Check backend logs for webhook errors
- Test webhook in Stripe Dashboard (send test event)

### Need to update environment variables?
- **Frontend:** Update build args and trigger a new build
- **Backend:** Update runtime env vars and restart the container

---

## Auto-Deploy on Git Push

Enable auto-deploy in Coolify settings to automatically deploy when you push to GitHub:

1. Go to application settings
2. Enable "Auto Deploy on Push"
3. Now every `git push` will trigger a deployment

---

## Security Checklist

✅ Stripe secret key is only in backend environment (never in frontend)
✅ `.env.local` files are gitignored
✅ Webhook signatures are verified
✅ CORS is configured to only allow your frontend domain
✅ SSL/HTTPS is enabled on both domains

---

## Next Steps

- Monitor payments in Stripe Dashboard
- Set up email notifications for successful payments
- Add database to store customer information
- Configure backup and monitoring in Coolify
