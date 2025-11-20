import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// CORS configuration - adjust origins for production
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

// Webhook route needs raw body
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Payment succeeded:', paymentIntent.id);
      console.log('Customer email:', paymentIntent.receipt_email);
      console.log('Amount:', paymentIntent.amount / 100);

      // TODO: Send confirmation email, update database, etc.
      // You can access metadata: paymentIntent.metadata

      break;
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('Payment failed:', failedPayment.id);
      // TODO: Handle failed payment
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

// All other routes use JSON parser
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Create payment intent
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, businessInfo, wantsGoogleAds } = req.body;

    // Validate required fields
    if (!amount || !businessInfo) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate amount (should be 29900 cents = $299)
    if (amount !== 29900) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'aud',
      automatic_payment_methods: {
        enabled: true,
      },
      receipt_email: businessInfo.email,
      metadata: {
        businessName: businessInfo.businessName,
        contactName: businessInfo.contactName,
        email: businessInfo.email,
        phone: businessInfo.phone,
        trade: businessInfo.trade,
        address: businessInfo.address,
        wantsGoogleAds: wantsGoogleAds ? 'yes' : 'no',
        monthlyPlan: wantsGoogleAds ? '499' : '99',
      },
      description: `Verdant Digital - Express Build for ${businessInfo.businessName}`,
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get payment status
app.get('/payment-status/:paymentIntentId', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(
      req.params.paymentIntentId
    );

    res.json({
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      metadata: paymentIntent.metadata,
    });
  } catch (error) {
    console.error('Error retrieving payment intent:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'Not set'}`);
  console.log(`Stripe mode: ${process.env.STRIPE_SECRET_KEY?.startsWith('sk_live') ? 'LIVE' : 'TEST'}`);
});
