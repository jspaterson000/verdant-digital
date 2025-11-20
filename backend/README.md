# Verdant Digital - Backend API

Express.js backend for processing Stripe payments securely.

## Getting Your Stripe Keys

### 1. Stripe Secret Key

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com/)
2. Go to **Developers** → **API Keys**
3. Copy your **Secret key** (starts with `sk_live_...`)
   - **IMPORTANT:** Keep this secret! Never commit it to git or expose it in frontend code

### 2. Stripe Webhook Secret

Webhooks allow Stripe to notify your backend when payments succeed or fail.

1. Go to **Developers** → **Webhooks** in Stripe Dashboard
2. Click **Add endpoint**
3. Set the endpoint URL to: `https://api.verdantdigital.com.au/webhook`
   - (Use your actual backend domain)
4. Select events to listen for:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_...`)

## Local Development

```bash
cd backend
npm install
```

Create a `.env` file:

```env
STRIPE_SECRET_KEY=sk_live_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
FRONTEND_URL=http://localhost:3000
PORT=3001
```

Run the server:

```bash
npm run dev
```

The API will be available at `http://localhost:3001`

## Testing Webhooks Locally

Use the [Stripe CLI](https://stripe.com/docs/stripe-cli) to forward webhooks to localhost:

```bash
stripe listen --forward-to localhost:3001/webhook
```

This will give you a temporary webhook secret for testing.

## Deploying to Coolify

### Create Backend Application

1. In Coolify, create a **New Application**
2. **Repository:** Same as frontend (`https://github.com/jspaterson000/verdant-digital.git`)
3. **Branch:** `master`
4. **Base Directory:** `backend`
5. **Dockerfile Location:** `backend/Dockerfile`
6. **Port:** `3001`

### Environment Variables

Add these as **Runtime Environment Variables** (NOT build args):

```
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_from_stripe
FRONTEND_URL=https://verdantdigital.com.au
PORT=3001
```

**Note:** You'll need to get the webhook secret after creating the webhook endpoint in Stripe (see above).

### Domain Setup

Set up a subdomain for your backend:
- **Domain:** `api.verdantdigital.com.au`
- Enable SSL

## API Endpoints

### POST `/create-payment-intent`

Creates a payment intent for $299 setup fee.

**Request:**
```json
{
  "amount": 29900,
  "businessInfo": {
    "businessName": "Smith Plumbing",
    "contactName": "John Smith",
    "email": "john@example.com",
    "phone": "0400000000",
    "trade": "Plumbing",
    "address": "Sydney, NSW"
  },
  "wantsGoogleAds": true
}
```

**Response:**
```json
{
  "clientSecret": "pi_xxx_secret_xxx",
  "paymentIntentId": "pi_xxx"
}
```

### POST `/webhook`

Handles Stripe webhook events (payment confirmations, etc.)

### GET `/health`

Health check endpoint for monitoring.

## Security Notes

- Secret key is only stored on the backend server
- Webhook signatures are verified to prevent tampering
- CORS is configured to only allow requests from your frontend domain
- All payment processing happens server-side

## What Happens After Payment?

When a payment succeeds, the webhook handler receives the event and logs:
- Payment Intent ID
- Customer email
- Amount paid
- Business info from metadata

You can extend this to:
- Send confirmation emails
- Create database records
- Trigger website build process
- Notify your team via Slack/email
