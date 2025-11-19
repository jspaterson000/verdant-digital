# Stripe Checkout Setup Guide

## Overview
Your Verdant Digital website now has a complete checkout system with Stripe integration! Here's what's been built:

### Features
✅ **Multi-step checkout modal** with smooth animations
✅ **Business information collection** (name, contact, trade, etc.)
✅ **Stripe payment processing** with CardElement
✅ **Success confirmation** with next steps animation
✅ **Responsive design** matching your website's style
✅ **Form validation** and error handling
✅ **Loading states** and progress indicators

## How to Setup Stripe

### 1. Get Your Stripe API Keys

1. Go to https://dashboard.stripe.com/register
2. Create a Stripe account (or log in)
3. Navigate to **Developers → API Keys**
4. Copy your **Publishable key** (starts with `pk_test_`)

### 2. Add Your Stripe Key

Open `.env.local` and replace the placeholder:

```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_KEY_HERE
```

### 3. Restart the Dev Server

```bash
# Stop the current server (Ctrl+C)
npm run dev
```

## How to Test

1. **Navigate to the Pricing section:**
   - Visit http://localhost:3000/#pricing
   - Click "Secure This Price" button

2. **Fill out business information:**
   - Complete all required fields
   - Click "Continue to Payment"

3. **Test the payment:**
   Use Stripe's test card numbers:
   - **Success:** `4242 4242 4242 4242`
   - **Decline:** `4000 0000 0000 0002`
   - **Requires Auth:** `4000 0025 0000 3155`
   - Use any future expiry date (e.g., 12/34)
   - Use any 3-digit CVC (e.g., 123)
   - Use any ZIP code (e.g., 12345)

4. **See the success screen:**
   - Animated checkmark
   - Next steps breakdown
   - Professional confirmation message

## What Happens When Someone Checks Out?

### Current Implementation (Development)
The checkout form currently:
1. Collects business information
2. Creates a Stripe PaymentMethod
3. Logs the data to console
4. Shows success animation

### For Production
You'll need to create a backend endpoint to:
1. Receive the PaymentMethod ID
2. Create a PaymentIntent on your server
3. Charge the customer ($299)
4. Store the business information in your database
5. Send confirmation email
6. Set up the monthly subscription ($99/mo)

### Backend Example (Node.js)

```javascript
// /api/process-payment
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/api/process-payment', async (req, res) => {
  const { paymentMethodId, businessInfo } = req.body;

  try {
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 29900, // $299 in cents
      currency: 'aud',
      payment_method: paymentMethodId,
      confirm: true,
      description: `Tradie Starter Pack - ${businessInfo.businessName}`,
      receipt_email: businessInfo.email,
    });

    // Save business info to database
    // Send confirmation email
    // Set up subscription

    res.json({ success: true, paymentIntent });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

## Customization

### Pricing
Update prices in `/components/CheckoutModal.tsx`:

```typescript
// Line ~105
<span className="text-white font-bold">$299</span>  // Setup fee
<span className="text-white font-bold">$99/mo</span>  // Monthly
```

### Collected Information
Modify the form fields in `/components/CheckoutModal.tsx` (lines 450-550)

### Success Message
Customize the confirmation screen (lines 600-700)

## Security Notes

⚠️ **Never commit your secret keys!**
- Only use publishable keys (`pk_test_` or `pk_live_`) in frontend
- Secret keys (`sk_test_` or `sk_live_`) must stay on your backend
- `.env.local` is already in `.gitignore`

## Going Live

When ready for production:

1. **Switch to live keys:**
   - Get live keys from Stripe Dashboard
   - Update `.env.local` with `pk_live_` key

2. **Set up webhook:**
   - Go to Stripe Dashboard → Developers → Webhooks
   - Add endpoint for payment events
   - Handle subscription renewals

3. **Test thoroughly:**
   - Test with real (small) amounts first
   - Verify emails are sent
   - Check database entries
   - Test subscription billing

## Support

- **Stripe Docs:** https://stripe.com/docs
- **Test Cards:** https://stripe.com/docs/testing
- **Webhook Testing:** https://stripe.com/docs/webhooks/test

---

Your checkout is ready to test! Click the "Secure This Price" button and try it out.
