# Vercel Deployment Guide - Verdant Digital

Complete guide to deploy your website with Stripe payments to Vercel in under 10 minutes.

## Why Vercel?

✅ **One deployment** - Frontend + Backend in one place
✅ **Zero Docker config** needed
✅ **Automatic SSL/HTTPS**
✅ **Auto-deploy on git push**
✅ **Serverless functions** handle payments
✅ **Free tier** for most small businesses
✅ **Global CDN** included

---

## Prerequisites

1. GitHub account (you already have this ✅)
2. Stripe account with live keys
3. Vercel account (free) - Sign up at [vercel.com](https://vercel.com)

---

## Part 1: Get Your Stripe Keys

### 1. Stripe Publishable Key (already have this ✅)

`pk_live_51SVBDYIXN4PzuK3wlL9JEZua57lfB3jkeVwUMtPhI4NtGIsA7qpujVQbQXOI183iFjX2LdZ4h7sRjRE0tIzEb73V00FDOvz5Ub`

### 2. Stripe Secret Key (NEW - need to get this)

1. Log in to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Go to **Developers** → **API Keys**
3. Find **Secret key** (starts with `sk_live_...`)
4. Click **Reveal test key** or **Reveal live key**
5. Copy it - you'll add this to Vercel shortly

**IMPORTANT:** Keep this secret safe! Never commit it to git.

---

## Part 2: Deploy to Vercel

### Step 1: Sign Up / Log In to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up**
3. Choose **Continue with GitHub**
4. Authorize Vercel to access your repositories

### Step 2: Import Your Project

1. Click **Add New...** → **Project**
2. Find `verdant-digital` in your repository list
3. Click **Import**

### Step 3: Configure Build Settings

Vercel should auto-detect everything, but verify:

- **Framework Preset:** Vite ✅
- **Root Directory:** `./` (leave as root)
- **Build Command:** `npm run build` ✅
- **Output Directory:** `dist` ✅
- **Install Command:** `npm install` ✅

### Step 4: Add Environment Variables

This is the most important step! Click **Environment Variables** and add these:

#### Build-time Variables (for frontend):

```
Name: VITE_WEB3FORMS_ACCESS_KEY
Value: 1525a1a8-0064-48eb-b64f-a7a584c64253
```

```
Name: VITE_STRIPE_PUBLISHABLE_KEY
Value: pk_live_51SVBDYIXN4PzuK3wlL9JEZua57lfB3jkeVwUMtPhI4NtGIsA7qpujVQbQXOI183iFjX2LdZ4h7sRjRE0tIzEb73V00FDOvz5Ub
```

#### Runtime Variables (for API functions):

```
Name: STRIPE_SECRET_KEY
Value: sk_live_YOUR_SECRET_KEY_FROM_STRIPE
```
**⚠️ Use your actual secret key here!**

```
Name: STRIPE_WEBHOOK_SECRET
Value: whsec_placeholder_for_now
```
**We'll update this after setting up webhooks**

### Step 5: Deploy!

1. Click **Deploy**
2. Wait 2-3 minutes for build to complete ⏱️
3. You'll get a URL like `verdant-digital.vercel.app`

**That's it! Your site is live!** 🎉

---

## Part 3: Add Your Custom Domain

### Step 1: Add Domain in Vercel

1. Go to your project in Vercel
2. Click **Settings** → **Domains**
3. Enter `verdantdigital.com.au`
4. Click **Add**

### Step 2: Configure DNS

Vercel will show you DNS records to add. In your domain registrar (like Cloudflare, GoDaddy, etc.):

**For apex domain (verdantdigital.com.au):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 3: Wait for DNS Propagation

- Usually takes 5-60 minutes
- Vercel will auto-generate SSL certificate
- Check back in Vercel - you'll see a green checkmark when ready

---

## Part 4: Configure Stripe Webhooks

Webhooks let Stripe notify you when payments succeed or fail.

### Step 1: Create Webhook in Stripe

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/) → **Developers** → **Webhooks**
2. Click **Add endpoint**
3. **Endpoint URL:** `https://verdantdigital.com.au/api/webhook`
   - (Use your actual domain once DNS is configured)
4. Click **Select events** and add:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Click **Add endpoint**

### Step 2: Get Webhook Secret

1. Click on your newly created webhook
2. Click **Reveal** under **Signing secret**
3. Copy the secret (starts with `whsec_...`)

### Step 3: Update Vercel Environment Variable

1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Find `STRIPE_WEBHOOK_SECRET`
3. Click **Edit**
4. Replace `whsec_placeholder_for_now` with your actual webhook secret
5. Click **Save**
6. **Redeploy:** Go to **Deployments** → Click **...** → **Redeploy**

---

## Part 5: Test Everything!

### Test 1: Check API Health

Open: `https://verdantdigital.com.au/api/health`

Should see:
```json
{
  "status": "healthy",
  "timestamp": "2025-11-20T..."
}
```

### Test 2: Full Payment Flow

1. Visit `https://verdantdigital.com.au`
2. Click **Get Started**
3. Fill out the business info form
4. Enter test card details:
   - **Card:** `4242 4242 4242 4242`
   - **Expiry:** Any future date (e.g., `12/26`)
   - **CVC:** Any 3 digits (e.g., `123`)
   - **ZIP:** Any 5 digits (e.g., `12345`)
5. Click **Complete Payment**

**Expected Result:**
- Payment processes
- Success confirmation appears
- Check [Stripe Dashboard](https://dashboard.stripe.com/payments) - you'll see the payment!

### Test 3: Check Webhook

After successful payment:

1. Go to Stripe Dashboard → **Developers** → **Webhooks**
2. Click on your webhook
3. Check **Recent deliveries** - should see successful webhook events

---

## Auto-Deploy on Git Push

Already enabled! ✅

Every time you run `git push`, Vercel will automatically:
1. Detect the change
2. Build your project
3. Deploy to production
4. Update `verdantdigital.com.au`

---

## Managing Environment Variables

### To Update a Variable:

1. Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Find the variable
3. Click **Edit**
4. Update value
5. **Important:** You must redeploy for changes to take effect!
   - Go to **Deployments** → Click **...** on latest → **Redeploy**

### Production vs Development

You can set different values for:
- **Production** - Your live site
- **Preview** - PR previews
- **Development** - Local `vercel dev`

---

## Local Development

Want to test locally with the API functions?

```bash
# Install Vercel CLI
npm i -g vercel

# Link to your project
vercel link

# Pull environment variables
vercel env pull

# Run dev server with API functions
vercel dev
```

Now your app runs at `http://localhost:3000` with API functions working!

---

## Troubleshooting

### "Payment failed" error

**Check:**
- Stripe secret key is set correctly
- Go to Vercel → Settings → Environment Variables
- Make sure `STRIPE_SECRET_KEY` starts with `sk_live_`

**Fix:**
- Update the secret key
- Redeploy the project

### Webhooks not firing

**Check:**
- Webhook URL is correct: `https://yourdomain.com/api/webhook`
- Webhook secret is set in Vercel
- Test webhook in Stripe Dashboard (send test event)

**Fix:**
- Update `STRIPE_WEBHOOK_SECRET` in Vercel
- Redeploy

### CORS errors

**Should not happen on Vercel** - API routes are same-origin

If you see CORS errors:
- Check browser console for exact error
- Make sure you're calling `/api/endpoint` not a full URL

### Build failing

**Check build logs in Vercel:**
1. Go to **Deployments**
2. Click on failed deployment
3. Check **Build Logs**

**Common issues:**
- Missing environment variables
- npm install failing (check package.json)

---

## Cost Estimate

### Vercel Free Tier Includes:
- 100 GB bandwidth/month
- Unlimited API requests
- Automatic SSL
- 100 deployments/day

**For a small business website:** You'll likely stay on free tier!

**If you exceed free tier:**
- Pro plan: $20/month per team member
- But you'd need **serious traffic** to exceed free tier

### Stripe Fees:
- 1.75% + 30¢ per successful card charge (Australia)
- No monthly fee
- Only pay when you get paid

---

## What Happens After a Successful Payment?

Currently, when payment succeeds:

1. ✅ Customer charged $299
2. ✅ Stripe sends receipt email automatically
3. ✅ Webhook logs payment details to Vercel logs
4. ✅ Business info stored in payment metadata

**View payment details:**
- Vercel Dashboard → Your Project → **Functions** → Click `webhook` → **Logs**
- Stripe Dashboard → **Payments** → Click payment → See metadata

**Next steps you can add:**
- Send yourself an email notification
- Add to a database (Vercel supports Postgres, MongoDB, etc.)
- Trigger Slack notification
- Add to CRM

---

## Vercel vs Coolify Summary

| Feature | Vercel | Coolify |
|---------|--------|---------|
| Setup Time | 5 minutes | 30+ minutes |
| Deployments | One app | Two separate apps |
| Docker | Not needed | Required |
| API Functions | Built-in | Manual setup |
| SSL | Automatic | Manual setup |
| Environment Vars | Simple UI | Build args + runtime |
| Logs | Beautiful UI | Basic logs |
| Cost | Free tier | Self-host costs |

**Winner for your use case:** Vercel 🏆

---

## Support

**Vercel Docs:** https://vercel.com/docs
**Stripe Docs:** https://stripe.com/docs
**Need help?** Check Vercel's excellent error messages in build logs

---

## Security Checklist

✅ Stripe secret key only in Vercel environment (never in code)
✅ Webhook signatures verified
✅ SSL/HTTPS enabled automatically
✅ Environment variables encrypted by Vercel
✅ `.env.local` files gitignored

---

You're all set! Your website is now live with secure Stripe payments powered by Vercel. 🚀
