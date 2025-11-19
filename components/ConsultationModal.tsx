import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Calendar, ArrowLeft, Clock, Phone } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
}

const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose, onBack }) => {
  const [step, setStep] = useState<'form' | 'calendar'>('form');
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    trade: '',
    requirements: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Prepare form data for Web3Forms
    const web3FormData = new FormData();
    web3FormData.append('access_key', import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '');
    web3FormData.append('subject', `Consultation Request - ${formData.businessName}`);
    web3FormData.append('to', 'hello@verdantdigital.com.au');
    web3FormData.append('name', formData.name);
    web3FormData.append('businessName', formData.businessName);
    web3FormData.append('email', formData.email);
    web3FormData.append('phone', formData.phone);
    web3FormData.append('trade', formData.trade);
    web3FormData.append('requirements', formData.requirements);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: web3FormData
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setStep('calendar');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-zinc-950 border-b border-white/10 p-6 flex justify-between items-center z-10">
                <div>
                  <h2 className="text-2xl font-display font-bold text-white">Book Your Free Consultation</h2>
                  <p className="text-gray-400 text-sm mt-1">15 minutes to discuss your website needs</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {step === 'form' && (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <button
                        onClick={onBack}
                        className="text-gray-400 hover:text-white transition-colors mb-4 flex items-center gap-2 text-sm"
                      >
                        <ArrowLeft size={16} />
                        Back to options
                      </button>

                      {/* Benefits Reminder */}
                      <div className="bg-verdant-900/20 border border-verdant-accent/20 rounded-lg p-4 mb-6">
                        <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                          <CheckCircle className="text-verdant-accent" size={18} />
                          What We'll Cover in 15 Minutes:
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-verdant-accent"></div>
                            Your business goals and target customers
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-verdant-accent"></div>
                            Custom features you might need
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-verdant-accent"></div>
                            Timeline and pricing options
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-verdant-accent"></div>
                            Portfolio examples relevant to your trade
                          </li>
                        </ul>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-gray-400 uppercase tracking-wider mb-2 block">
                              Your Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="John Smith"
                              className="w-full bg-black border border-zinc-700 text-white p-3 rounded-lg focus:border-verdant-accent focus:outline-none transition-colors"
                            />
                          </div>

                          <div>
                            <label className="text-sm text-gray-400 uppercase tracking-wider mb-2 block">
                              Business Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.businessName}
                              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                              placeholder="Smith Plumbing"
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
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              placeholder="0400 000 000"
                              className="w-full bg-black border border-zinc-700 text-white p-3 rounded-lg focus:border-verdant-accent focus:outline-none transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-sm text-gray-400 uppercase tracking-wider mb-2 block">
                            Trade / Industry *
                          </label>
                          <select
                            required
                            value={formData.trade}
                            onChange={(e) => setFormData({ ...formData, trade: e.target.value })}
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
                            What do you need help with?
                          </label>
                          <textarea
                            value={formData.requirements}
                            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                            placeholder="E.g., Need booking system, e-commerce, custom quote calculator..."
                            rows={4}
                            className="w-full bg-black border border-zinc-700 text-white p-3 rounded-lg focus:border-verdant-accent focus:outline-none transition-colors resize-none"
                          />
                        </div>

                        {submitStatus === 'error' && (
                          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm">
                            Sorry, there was an error. Please try again or call us directly.
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-verdant-accent text-black font-bold py-4 rounded-lg hover:bg-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>Processing...</>
                          ) : (
                            <>
                              <Calendar size={20} />
                              Continue to Calendar
                            </>
                          )}
                        </button>

                        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                          <Clock size={12} />
                          <span>Next available slots show on next screen</span>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {step === 'calendar' && (
                    <motion.div
                      key="calendar"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-center py-8">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: 'spring' }}
                          className="w-16 h-16 bg-verdant-accent rounded-full flex items-center justify-center mx-auto mb-4"
                        >
                          <CheckCircle size={32} className="text-black" />
                        </motion.div>

                        <h3 className="text-2xl font-bold text-white mb-2">Details Received!</h3>
                        <p className="text-gray-400 mb-6">
                          We've sent you a confirmation email with booking details.
                        </p>

                        {/* Calendly Embed Placeholder */}
                        <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-8 mb-6">
                          <Calendar size={48} className="text-verdant-accent mx-auto mb-4" />
                          <p className="text-white font-medium mb-2">Book Your Time Slot</p>
                          <p className="text-gray-400 text-sm mb-4">
                            Click below to choose a time that works for you
                          </p>

                          {/* Replace this with actual Calendly embed */}
                          <a
                            href="https://calendly.com/your-calendar-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-verdant-accent text-black font-bold px-6 py-3 rounded-lg hover:bg-white transition-all"
                          >
                            <Calendar size={18} />
                            Open Calendar
                          </a>

                          <p className="text-xs text-gray-500 mt-4">
                            Or we'll call you within 24 hours to arrange a time
                          </p>
                        </div>

                        {/* Alternative Contact */}
                        <div className="bg-black/30 border border-white/5 rounded-lg p-4">
                          <p className="text-gray-400 text-sm mb-2">Prefer to call us?</p>
                          <a href="tel:1300XXXXXX" className="flex items-center justify-center gap-2 text-white font-medium hover:text-verdant-accent transition-colors">
                            <Phone size={18} />
                            1300 XXX XXX
                          </a>
                        </div>
                      </div>
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

export default ConsultationModal;
