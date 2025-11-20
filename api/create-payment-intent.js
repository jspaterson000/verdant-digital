import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
}
