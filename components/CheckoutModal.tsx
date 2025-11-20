import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ArrowRight, ArrowLeft, Loader2, CreditCard, Shield, Lock, Award, Users, Clock, Star, TrendingUp, Phone, Zap } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialize Stripe - Replace with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_YOUR_KEY');

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRedirectToConsultation?: () => void;
}

type Step = 'scope-check' | 'ads-upsell' | 'business-info' | 'payment' | 'confirmation';

interface BusinessInfo {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  trade: string;
  website: string;
  address: string;
  additionalInfo: string;
}

const CheckoutForm: React.FC<{ onSuccess: () => void; businessInfo: BusinessInfo; wantsGoogleAds: boolean }> = ({ onSuccess, businessInfo, wantsGoogleAds }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) return;

      // Call backend to create payment intent
      // On Vercel, API routes are at /api/* on the same domain
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 29900, // $299 in cents
          businessInfo,
          wantsGoogleAds,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();

      // Confirm the payment with the card details
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: businessInfo.contactName,
            email: businessInfo.email,
            phone: businessInfo.phone,
            address: {
              line1: businessInfo.address,
            },
          },
        },
      });

      if (stripeError) {
        setError(stripeError.message || 'Payment failed');
        setIsProcessing(false);
        return;
      }

      if (paymentIntent?.status === 'succeeded') {
        console.log('Payment succeeded:', paymentIntent.id);
        onSuccess();
      } else {
        setError('Payment was not successful');
      }

      setIsProcessing(false);

    } catch (err) {
      console.error('Payment error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Trust Badges */}
      <div className="flex flex-wrap items-center justify-center gap-4 pb-4 border-b border-white/5">
        <div className="flex items-center gap-2 text-gray-400 text-xs">
          <Shield size={16} className="text-verdant-accent" />
          <span>256-bit SSL Encrypted</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400 text-xs">
          <Lock size={16} className="text-verdant-accent" />
          <span>PCI Compliant</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400 text-xs">
          <Award size={16} className="text-verdant-accent" />
          <span>30-Day Guarantee</span>
        </div>
      </div>

      <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-6">
        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
          <CreditCard size={20} className="text-verdant-accent" />
          Payment Details
        </h4>

        <div className="bg-black/50 border border-zinc-700 rounded-lg p-4 focus-within:border-verdant-accent transition-colors">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#ffffff',
                  '::placeholder': {
                    color: '#6b7280',
                  },
                },
                invalid: {
                  color: '#ef4444',
                },
              },
            }}
          />
        </div>

        {error && (
          <div className="mt-4 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            {error}
          </div>
        )}

        {/* Trust Elements Below Card */}
        <div className="mt-4 flex items-start gap-3 text-xs text-gray-500">
          <Lock size={14} className="text-verdant-accent flex-shrink-0 mt-0.5" />
          <p>Your payment is secured by Stripe, trusted by millions of businesses worldwide. We never store your card details.</p>
        </div>
      </div>

      {/* Value Reinforcement Box */}
      <div className="bg-gradient-to-br from-verdant-900/20 to-verdant-800/10 border border-verdant-accent/20 rounded-lg p-4">
        <div className="flex items-start gap-3 mb-3">
          <TrendingUp size={20} className="text-verdant-accent flex-shrink-0 mt-1" />
          <div>
            <h5 className="text-white font-bold text-sm mb-1">This Website Will Pay For Itself</h5>
            <p className="text-gray-400 text-xs">Most tradies get 3-5 qualified leads per week. Just 3 jobs covers your entire year's cost.</p>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900/30 border border-white/5 rounded-lg p-4">
        {wantsGoogleAds && (
          <div className="bg-gradient-to-r from-blue-600/20 to-verdant-600/20 border border-verdant-accent/30 rounded-lg p-3 mb-3 text-center">
            <p className="text-verdant-accent font-bold text-sm flex items-center justify-center gap-2">
              <Zap size={16} />
              Complete Growth Package Selected
            </p>
          </div>
        )}
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-400">Setup Fee</span>
          <span className="text-white font-bold">$299</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-400">Monthly Subscription</span>
          <span className="text-white font-bold">${wantsGoogleAds ? '499' : '99'}/mo</span>
        </div>
        {wantsGoogleAds && (
          <div className="flex justify-between items-center mb-2 text-xs">
            <span className="text-gray-500 ml-4">↳ Website ($99/mo)</span>
            <span className="text-gray-500"></span>
          </div>
        )}
        {wantsGoogleAds && (
          <div className="flex justify-between items-center mb-2 text-xs">
            <span className="text-gray-500 ml-4">↳ Google Ads ($400/mo)</span>
            <span className="text-gray-500"></span>
          </div>
        )}
        <div className="border-t border-white/10 mt-3 pt-3 flex justify-between items-center">
          <span className="text-white font-bold">Total Due Today</span>
          <span className="text-verdant-accent text-2xl font-bold">$299</span>
        </div>

        {/* What You Get Summary */}
        <div className="mt-4 pt-4 border-t border-white/5">
          <p className="text-xs text-gray-500 font-medium mb-2">Included in your package:</p>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <CheckCircle size={12} className="text-verdant-accent" />
              <span>Custom Website</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle size={12} className="text-verdant-accent" />
              <span>Mobile Optimized</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle size={12} className="text-verdant-accent" />
              <span>Google Setup</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle size={12} className="text-verdant-accent" />
              <span>Live in 7 Days</span>
            </div>
            {wantsGoogleAds && (
              <>
                <div className="flex items-center gap-1">
                  <Zap size={12} className="text-blue-400" />
                  <span>Google Ads Setup</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap size={12} className="text-blue-400" />
                  <span>$300/mo Ad Spend</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-verdant-600 hover:bg-verdant-500 text-white font-bold py-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Processing...
          </>
        ) : (
          <>
            Complete Payment
            <ArrowRight size={20} />
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Shield size={12} className="text-verdant-accent" />
          <span>Secured by Stripe</span>
        </div>
        <span>•</span>
        <div className="flex items-center gap-1">
          <Award size={12} className="text-verdant-accent" />
          <span>30-Day Guarantee</span>
        </div>
      </div>

      {/* Support Notice */}
      <div className="bg-zinc-900/30 border border-white/5 rounded-lg p-3 text-center">
        <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
          <Phone size={14} className="text-verdant-accent" />
          <span>Questions? Call us at <span className="text-white font-medium">1300 XXX XXX</span></span>
        </div>
      </div>
    </form>
  );
};

// Recent Customer Notifications
const recentCustomers = [
  { name: "Dave M.", trade: "Plumber", location: "Western Sydney", timeAgo: "2 hours ago" },
  { name: "Sarah K.", trade: "Electrician", location: "Melbourne", timeAgo: "4 hours ago" },
  { name: "Mike T.", trade: "Builder", location: "Brisbane", timeAgo: "6 hours ago" },
  { name: "Lisa P.", trade: "Landscaper", location: "Perth", timeAgo: "8 hours ago" },
];

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onRedirectToConsultation }) => {
  const [step, setStep] = useState<Step>('scope-check');
  const [showNotification, setShowNotification] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(0);
  const [wantsGoogleAds, setWantsGoogleAds] = useState(false);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    trade: '',
    website: '',
    address: '',
    additionalInfo: '',
  });

  const handleBusinessInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSuccess = () => {
    setStep('confirmation');
  };

  const handleClose = () => {
    setStep('scope-check');
    setBusinessInfo({
      businessName: '',
      contactName: '',
      email: '',
      phone: '',
      trade: '',
      website: '',
      address: '',
      additionalInfo: '',
    });
    onClose();
  };

  const steps = [
    { id: 'scope-check', label: 'Scope Check', hideFromProgress: true },
    { id: 'ads-upsell', label: 'Add Google Ads?', hideFromProgress: true },
    { id: 'business-info', label: 'Business Info' },
    { id: 'payment', label: 'Payment' },
    { id: 'confirmation', label: 'Confirmation' },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === step);
  const visibleSteps = steps.filter(s => !s.hideFromProgress);
  const currentVisibleStepIndex = visibleSteps.findIndex(s => s.id === step);

  // Social proof notification effect
  useEffect(() => {
    if (!isOpen) return;

    const showNotif = () => {
      setShowNotification(true);
      setCurrentCustomer((prev) => (prev + 1) % recentCustomers.length);
      setTimeout(() => setShowNotification(false), 5000);
    };

    // Show first notification after 3 seconds
    const initialTimer = setTimeout(showNotif, 3000);

    // Show subsequent notifications every 15 seconds
    const interval = setInterval(showNotif, 15000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Social Proof Notification */}
          <AnimatePresence>
            {showNotification && (
              <motion.div
                initial={{ opacity: 0, y: 50, x: '-50%' }}
                animate={{ opacity: 1, y: 0, x: '-50%' }}
                exit={{ opacity: 0, y: 50, x: '-50%' }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-zinc-900 border border-verdant-accent/30 rounded-lg p-4 shadow-2xl z-[60] max-w-sm mx-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-verdant-accent/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="text-verdant-accent" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">
                      {recentCustomers[currentCustomer].name} from {recentCustomers[currentCustomer].location}
                    </p>
                    <p className="text-gray-400 text-xs">
                      Just signed up • {recentCustomers[currentCustomer].trade} • {recentCustomers[currentCustomer].timeAgo}
                    </p>
                  </div>
                  <Users size={16} className="text-verdant-accent/50 flex-shrink-0" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl max-w-2xl w-full my-auto max-h-[95vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-zinc-950 border-b border-white/10 p-4 sm:p-6 z-10">
                <div className="flex justify-between items-start mb-2 sm:mb-3">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-display font-bold text-white">Start Your Build</h2>
                    <p className="text-gray-400 text-xs sm:text-sm mt-1">Live in 7 days, guaranteed</p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="text-gray-400 hover:text-white transition-colors p-1 sm:p-2 hover:bg-white/5 rounded-lg"
                  >
                    <X size={20} className="sm:hidden" />
                    <X size={24} className="hidden sm:block" />
                  </button>
                </div>

                {/* Urgency & Social Proof Bar */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs">
                  <div className="flex items-center gap-1.5 text-orange-400">
                    <Clock size={14} />
                    <span className="font-medium">Only 2 November slots left</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <Users size={14} />
                    <span>47 tradies joined this month</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <span className="text-gray-400 ml-1">4.9/5 (120 reviews)</span>
                  </div>
                </div>
              </div>

              {/* Progress Steps - Only show for main checkout flow */}
              {step !== 'scope-check' && step !== 'ads-upsell' && (
                <div className="px-6 py-4 border-b border-white/5">
                  <div className="flex items-center justify-between">
                    {visibleSteps.map((s, index) => {
                      const actualStepIndex = steps.findIndex(st => st.id === s.id);
                      const isCompleted = actualStepIndex < currentStepIndex;
                      const isCurrent = s.id === step;

                      return (
                        <React.Fragment key={s.id}>
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                                isCompleted
                                  ? 'bg-verdant-accent text-black'
                                  : isCurrent
                                  ? 'bg-verdant-accent text-black'
                                  : 'bg-zinc-800 text-gray-500'
                              }`}
                            >
                              {isCompleted ? <CheckCircle size={16} /> : index + 1}
                            </div>
                            <span
                              className={`text-sm font-medium hidden sm:block ${
                                isCompleted || isCurrent ? 'text-white' : 'text-gray-500'
                              }`}
                            >
                              {s.label}
                            </span>
                          </div>
                          {index < visibleSteps.length - 1 && (
                            <div
                              className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                                isCompleted ? 'bg-verdant-accent' : 'bg-zinc-800'
                              }`}
                            />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-4 sm:p-6">
                <AnimatePresence mode="wait">
                  {/* Step 0: Scope Check */}
                  {step === 'scope-check' && (
                    <motion.div
                      key="scope-check"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Quick Check: Is Express Right for You?</h3>
                      <p className="text-gray-400 text-sm mb-4 sm:mb-6">Our Express Build includes a standard 5-page website. Let's make sure it fits your needs!</p>

                      <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                        {/* What's Included */}
                        <div className="bg-verdant-900/20 border border-verdant-accent/20 rounded-lg p-3 sm:p-4">
                          <h4 className="text-white font-bold mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                            <CheckCircle className="text-verdant-accent" size={16} />
                            Express Build Includes:
                          </h4>
                          <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-300">
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-verdant-accent"></div>
                              5 pages (Home, About, Services, Gallery, Contact)
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-verdant-accent"></div>
                              Contact form & quote request system
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-verdant-accent"></div>
                              Mobile responsive design
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-verdant-accent"></div>
                              Google Business integration
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-verdant-accent"></div>
                              Live in 7 days guaranteed
                            </li>
                          </ul>
                        </div>

                        {/* Warning for Complex Features */}
                        <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-3 sm:p-4">
                          <h4 className="text-orange-300 font-bold mb-2 text-xs sm:text-sm">Express Build is NOT for:</h4>
                          <ul className="space-y-1 sm:space-y-1.5 text-xs text-gray-400">
                            <li className="flex items-center gap-2">
                              <X size={12} className="text-orange-400" />
                              E-commerce or online stores
                            </li>
                            <li className="flex items-center gap-2">
                              <X size={12} className="text-orange-400" />
                              Booking/scheduling systems
                            </li>
                            <li className="flex items-center gap-2">
                              <X size={12} className="text-orange-400" />
                              Custom calculators or complex forms
                            </li>
                            <li className="flex items-center gap-2">
                              <X size={12} className="text-orange-400" />
                              More than 5 pages
                            </li>
                          </ul>
                          <p className="text-xs text-gray-500 mt-3">Need these? Book a free consultation instead.</p>
                        </div>
                      </div>

                      <div className="space-y-2 sm:space-y-3">
                        <button
                          onClick={() => setStep('ads-upsell')}
                          className="w-full bg-verdant-accent text-black font-bold py-3 sm:py-4 rounded-lg hover:bg-white transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                        >
                          <CheckCircle size={18} className="sm:hidden" />
                          <CheckCircle size={20} className="hidden sm:block" />
                          Perfect! Continue with Express Build
                        </button>

                        {onRedirectToConsultation && (
                          <button
                            onClick={() => {
                              handleClose();
                              onRedirectToConsultation();
                            }}
                            className="w-full bg-zinc-800 text-white font-bold py-3 sm:py-4 rounded-lg hover:bg-zinc-700 transition-all flex items-center justify-center gap-2 border border-white/10 text-sm sm:text-base"
                          >
                            <Phone size={18} className="sm:hidden" />
                            <Phone size={20} className="hidden sm:block" />
                            I need custom features - Book Free Call
                          </button>
                        )}
                      </div>

                      <p className="text-xs text-gray-500 text-center mt-3 sm:mt-4">
                        Not sure? Book a free call to discuss your needs - no obligation!
                      </p>
                    </motion.div>
                  )}

                  {/* Step 1: Google Ads Upsell */}
                  {step === 'ads-upsell' && (
                    <motion.div
                      key="ads-upsell"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="max-w-xl mx-auto"
                    >
                      {/* Clean, Centered Card */}
                      <div className="text-center mb-4 sm:mb-6">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">Your Website's Built to Convert — Now Let's Make Sure People Find It 🚀</h3>
                      </div>

                      {/* Setting Expectations - Natural Context */}
                      <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                        <p className="text-gray-300 text-xs sm:text-sm text-center leading-relaxed">
                          A quick reality check: even the best-designed website won't generate leads on its own. To get real traffic and real customers, you need Google Ads, SEO, or word-of-mouth. <strong className="text-white">We can handle this part for you.</strong>
                        </p>
                      </div>

                      {/* Single Focused Card */}
                      <div className="bg-gradient-to-br from-verdant-900/20 to-blue-900/10 border border-verdant-accent/30 rounded-xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
                        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-verdant-accent/20 flex items-center justify-center">
                            <Zap size={20} className="text-verdant-accent sm:hidden" />
                            <Zap size={24} className="text-verdant-accent hidden sm:block" />
                          </div>
                          <div className="text-left">
                            <div className="text-xs sm:text-sm text-gray-400">Add Google Ads</div>
                            <div className="text-xl sm:text-2xl font-bold text-white">+$400<span className="text-sm sm:text-lg text-gray-400">/mo</span></div>
                          </div>
                        </div>

                        <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                          <li className="flex items-start gap-2 sm:gap-3 text-gray-300 text-sm leading-snug">
                            <CheckCircle size={16} className="text-verdant-accent flex-shrink-0 mt-0.5 sm:hidden" />
                            <CheckCircle size={20} className="text-verdant-accent flex-shrink-0 mt-0.5 hidden sm:block" />
                            <span>We run ads targeting people actively searching for your services in your area</span>
                          </li>
                          <li className="flex items-start gap-2 sm:gap-3 text-gray-300 text-sm leading-snug">
                            <CheckCircle size={16} className="text-verdant-accent flex-shrink-0 mt-0.5 sm:hidden" />
                            <CheckCircle size={20} className="text-verdant-accent flex-shrink-0 mt-0.5 hidden sm:block" />
                            <span><strong className="text-white">$300/month ad budget included</strong> - that's 50+ clicks to your new website</span>
                          </li>
                          <li className="flex items-start gap-2 sm:gap-3 text-gray-300 text-sm leading-snug">
                            <CheckCircle size={16} className="text-verdant-accent flex-shrink-0 mt-0.5 sm:hidden" />
                            <CheckCircle size={20} className="text-verdant-accent flex-shrink-0 mt-0.5 hidden sm:block" />
                            <span>Most tradies see their first lead request within 48 hours</span>
                          </li>
                        </ul>

                        <div className="bg-verdant-accent/10 border border-verdant-accent/30 rounded-lg p-2 sm:p-3 text-center">
                          <p className="text-gray-300 text-xs sm:text-sm">
                            <strong className="text-verdant-accent">Average result:</strong> 10-15 qualified leads in month one
                          </p>
                        </div>
                      </div>

                      {/* Clear CTA Hierarchy */}
                      <button
                        onClick={() => {
                          setWantsGoogleAds(true);
                          setStep('business-info');
                        }}
                        className="w-full bg-verdant-accent text-black font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg hover:bg-white transition-all mb-3 text-base sm:text-lg"
                      >
                        Add Google Ads - Start Getting Leads
                      </button>

                      <button
                        onClick={() => {
                          setWantsGoogleAds(false);
                          setStep('business-info');
                        }}
                        className="w-full text-gray-400 hover:text-white transition-colors text-sm py-2"
                      >
                        No thanks, I'll handle marketing myself
                      </button>

                      <p className="text-xs text-gray-500 text-center mt-6">
                        You can add this anytime. But starting together means leads from launch day.
                      </p>
                    </motion.div>
                  )}

                  {/* Step 2: Business Info */}
                  {step === 'business-info' && (
                    <motion.div
                      key="business-info"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-bold text-white mb-2">Tell us about your business</h3>
                      <p className="text-gray-400 mb-6">We'll use this info to build your custom website</p>

                      {/* Testimonial Box */}
                      <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-4 mb-6">
                        <div className="flex gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className="text-yellow-400" fill="currentColor" />
                          ))}
                        </div>
                        <p className="text-gray-300 text-sm italic mb-2">
                          "Combined my new website with Google Ads - got 8 qualified enquiries in the first week! The website converts really well."
                        </p>
                        <p className="text-gray-500 text-xs">
                          — Mark S., Electrician, Melbourne
                        </p>
                      </div>

                      <form onSubmit={handleBusinessInfoSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-gray-400 uppercase tracking-wider mb-2 block">
                              Business Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={businessInfo.businessName}
                              onChange={(e) => setBusinessInfo({ ...businessInfo, businessName: e.target.value })}
                              placeholder="Smith Plumbing"
                              className="w-full bg-black border border-zinc-700 text-white p-3 rounded-lg focus:border-verdant-accent focus:outline-none transition-colors"
                            />
                          </div>

                          <div>
                            <label className="text-sm text-gray-400 uppercase tracking-wider mb-2 block">
                              Contact Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={businessInfo.contactName}
                              onChange={(e) => setBusinessInfo({ ...businessInfo, contactName: e.target.value })}
                              placeholder="John Smith"
                              className="w-full bg-black border border-zinc-700 text-white p-3 rounded-lg focus:border-verdant-accent focus:outline-none transition-colors"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-gray-400 uppercase tracking-wider mb-2 block">
                              Email *
                            </label>
                            <input
                              type="email"
                              required
                              value={businessInfo.email}
                              onChange={(e) => setBusinessInfo({ ...businessInfo, email: e.target.value })}
                              placeholder="john@smithplumbing.com.au"
                              className="w-full bg-black border border-zinc-700 text-white p-3 rounded-lg focus:border-verdant-accent focus:outline-none transition-colors"
                            />
                          </div>

                          <div>
                            <label className="text-sm text-gray-400 uppercase tracking-wider mb-2 block">
                              Phone *
                            </label>
                            <input
                              type="tel"
                              required
                              value={businessInfo.phone}
                              onChange={(e) => setBusinessInfo({ ...businessInfo, phone: e.target.value })}
                              placeholder="0400 000 000"
                              className="w-full bg-black border border-zinc-700 text-white p-3 rounded-lg focus:border-verdant-accent focus:outline-none transition-colors"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-gray-400 uppercase tracking-wider mb-2 block">
                              Trade / Industry *
                            </label>
                            <select
                              required
                              value={businessInfo.trade}
                              onChange={(e) => setBusinessInfo({ ...businessInfo, trade: e.target.value })}
                              className="w-full bg-black border border-zinc-700 text-white p-3 rounded-lg focus:border-verdant-accent focus:outline-none transition-colors"
                            >
                              <option value="">Select...</option>
                              <option>Plumbing</option>
                              <option>Electrical</option>
                              <option>Building / Carpentry</option>
                              <option>Landscaping</option>
                              <option>Painting</option>
                              <option>Roofing</option>
                              <option>HVAC</option>
                              <option>Other</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-sm text-gray-400 uppercase tracking-wider mb-2 block">
                              Current Website (if any)
                            </label>
                            <input
                              type="url"
                              value={businessInfo.website}
                              onChange={(e) => setBusinessInfo({ ...businessInfo, website: e.target.value })}
                              placeholder="https://..."
                              className="w-full bg-black border border-zinc-700 text-white p-3 rounded-lg focus:border-verdant-accent focus:outline-none transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-sm text-gray-400 uppercase tracking-wider mb-2 block">
                            Service Area / Address *
                          </label>
                          <input
                            type="text"
                            required
                            value={businessInfo.address}
                            onChange={(e) => setBusinessInfo({ ...businessInfo, address: e.target.value })}
                            placeholder="Western Sydney, NSW"
                            className="w-full bg-black border border-zinc-700 text-white p-3 rounded-lg focus:border-verdant-accent focus:outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-400 uppercase tracking-wider mb-2 block">
                            Additional Info
                          </label>
                          <textarea
                            value={businessInfo.additionalInfo}
                            onChange={(e) => setBusinessInfo({ ...businessInfo, additionalInfo: e.target.value })}
                            placeholder="Tell us anything special about your business, services you offer, or specific requirements..."
                            rows={4}
                            className="w-full bg-black border border-zinc-700 text-white p-3 rounded-lg focus:border-verdant-accent focus:outline-none transition-colors resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-verdant-600 hover:bg-verdant-500 text-white font-bold py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          Continue to Payment
                          <ArrowRight size={20} />
                        </button>
                      </form>
                    </motion.div>
                  )}

                  {/* Step 2: Payment */}
                  {step === 'payment' && (
                    <motion.div
                      key="payment"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <button
                        onClick={() => setStep('business-info')}
                        className="text-gray-400 hover:text-white transition-colors mb-4 flex items-center gap-2"
                      >
                        <ArrowLeft size={16} />
                        Back to Business Info
                      </button>

                      <h3 className="text-xl font-bold text-white mb-2">Complete Your Payment</h3>
                      <p className="text-gray-400 mb-6">Secure your spot and get started today</p>

                      <Elements stripe={stripePromise}>
                        <CheckoutForm onSuccess={handlePaymentSuccess} businessInfo={businessInfo} wantsGoogleAds={wantsGoogleAds} />
                      </Elements>
                    </motion.div>
                  )}

                  {/* Step 3: Confirmation */}
                  {step === 'confirmation' && (
                    <motion.div
                      key="confirmation"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      className="text-center py-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="w-20 h-20 bg-verdant-accent rounded-full flex items-center justify-center mx-auto mb-6"
                      >
                        <CheckCircle size={40} className="text-black" />
                      </motion.div>

                      <h3 className="text-3xl font-display font-bold text-white mb-3">Welcome Aboard!</h3>
                      <p className="text-gray-400 mb-8 max-w-md mx-auto">
                        Your payment has been processed successfully. We'll get started on your website right away!
                      </p>

                      <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-6 mb-6 text-left max-w-md mx-auto">
                        <h4 className="text-white font-bold mb-4">What happens next?</h4>
                        <div className="space-y-4">
                          <div className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-verdant-accent/20 text-verdant-accent flex items-center justify-center text-sm font-bold flex-shrink-0">
                              1
                            </div>
                            <div>
                              <p className="text-white font-medium">Confirmation Email</p>
                              <p className="text-gray-400 text-sm">Check your inbox in the next few minutes</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-verdant-accent/20 text-verdant-accent flex items-center justify-center text-sm font-bold flex-shrink-0">
                              2
                            </div>
                            <div>
                              <p className="text-white font-medium">Discovery Call</p>
                              <p className="text-gray-400 text-sm">We'll reach out within 24 hours to schedule</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-verdant-accent/20 text-verdant-accent flex items-center justify-center text-sm font-bold flex-shrink-0">
                              3
                            </div>
                            <div>
                              <p className="text-white font-medium">Website Launch</p>
                              <p className="text-gray-400 text-sm">Your site goes live in 7 days</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* After Launch - Traffic Generation */}
                      <div className="bg-gradient-to-br from-verdant-900/30 to-blue-900/20 border border-verdant-accent/30 rounded-lg p-6 mb-6 text-left max-w-md mx-auto">
                        <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                          <TrendingUp size={20} className="text-verdant-accent" />
                          Your Website is Just the Beginning 🚀
                        </h4>
                        <p className="text-gray-300 text-sm mb-4">
                          Your new website is your 24/7 digital storefront - but like a shopfront on a quiet street, it needs foot traffic to generate leads.
                        </p>

                        <div className="bg-black/30 rounded-lg p-4 mb-4">
                          <p className="text-white font-medium text-sm mb-2">Most successful tradies combine their website with:</p>
                          <ul className="space-y-2 text-xs text-gray-300">
                            <li className="flex items-start gap-2">
                              <CheckCircle size={12} className="text-verdant-accent flex-shrink-0 mt-0.5" />
                              <span><strong>Google Ads</strong> - Appear when locals search "plumber near me" (leads within 48hrs)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle size={12} className="text-verdant-accent flex-shrink-0 mt-0.5" />
                              <span><strong>Local SEO</strong> - Rank organically in Google (long-term traffic)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle size={12} className="text-verdant-accent flex-shrink-0 mt-0.5" />
                              <span><strong>Social Media</strong> - Build your local reputation and brand</span>
                            </li>
                          </ul>
                        </div>

                        <div className="bg-verdant-accent/10 border border-verdant-accent/30 rounded-lg p-3">
                          <p className="text-verdant-accent font-bold text-sm mb-1">💡 Want Help With This?</p>
                          <p className="text-gray-300 text-xs mb-2">
                            We offer Google Ads management - most tradies get their first qualified leads within 48 hours.
                          </p>
                          <p className="text-gray-400 text-[10px]">
                            We'll mention this on your discovery call. No pressure!
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={handleClose}
                        className="bg-verdant-600 hover:bg-verdant-500 text-white font-bold px-8 py-3 rounded-lg transition-all duration-300"
                      >
                        Done
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
