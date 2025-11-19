import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Phone, CheckCircle, ArrowRight, Clock, Calendar, MessageCircle } from 'lucide-react';

interface PathChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectExpress: () => void;
  onSelectConsultation: () => void;
}

const PathChoiceModal: React.FC<PathChoiceModalProps> = ({
  isOpen,
  onClose,
  onSelectExpress,
  onSelectConsultation,
}) => {
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
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="border-b border-white/10 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                      How Would You Like to Proceed?
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base">
                      Choose the option that works best for your business
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg flex-shrink-0"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Two Path Options */}
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                  {/* EXPRESS BUILD PATH */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="group relative bg-gradient-to-br from-verdant-900/20 to-verdant-800/10 border-2 border-verdant-accent/40 rounded-xl p-6 hover:border-verdant-accent hover:shadow-[0_0_30px_rgba(74,222,128,0.3)] transition-all cursor-pointer"
                    onClick={onSelectExpress}
                  >
                    {/* Popular Badge */}
                    <div className="absolute -top-3 left-6 bg-verdant-accent text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Most Popular
                    </div>

                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-verdant-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-verdant-accent/30 transition-colors">
                        <Zap size={24} className="text-verdant-accent" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">Express Build</h3>
                        <p className="text-gray-400 text-sm">Pay now, start immediately</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-4xl font-bold text-white">$299</span>
                        <span className="text-gray-400">+ $99/mo</span>
                      </div>

                      <ul className="space-y-3">
                        <li className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle size={16} className="text-verdant-accent flex-shrink-0 mt-0.5" />
                          <span>Standard 5-page website</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle size={16} className="text-verdant-accent flex-shrink-0 mt-0.5" />
                          <span>Mobile responsive design</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle size={16} className="text-verdant-accent flex-shrink-0 mt-0.5" />
                          <span>Contact form + quote system</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle size={16} className="text-verdant-accent flex-shrink-0 mt-0.5" />
                          <span>Google Business setup</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle size={16} className="text-verdant-accent flex-shrink-0 mt-0.5" />
                          <span>Live in 7 days guaranteed</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-black/30 border border-white/5 rounded-lg p-3 mb-4">
                      <p className="text-xs text-gray-400 font-medium mb-1">✓ Perfect for:</p>
                      <p className="text-xs text-gray-500">
                        Tradies who need a simple, professional website fast. No complex features needed.
                      </p>
                    </div>

                    <button className="w-full bg-verdant-accent text-black font-bold py-3 px-4 rounded-lg hover:bg-white transition-all flex items-center justify-center gap-2 group-hover:shadow-lg">
                      Start Now
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
                      <Clock size={12} />
                      <span>No waiting, instant setup</span>
                    </div>
                  </motion.div>

                  {/* CONSULTATION PATH */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="group relative bg-zinc-900/50 border-2 border-white/10 rounded-xl p-6 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all cursor-pointer"
                    onClick={onSelectConsultation}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                        <Phone size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">Consultation First</h3>
                        <p className="text-gray-400 text-sm">Free 15-min call, then pay</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-4xl font-bold text-white">Free</span>
                        <span className="text-gray-400">no obligation</span>
                      </div>

                      <ul className="space-y-3">
                        <li className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle size={16} className="text-white flex-shrink-0 mt-0.5" />
                          <span>Discuss your specific needs</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle size={16} className="text-white flex-shrink-0 mt-0.5" />
                          <span>Get custom recommendations</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle size={16} className="text-white flex-shrink-0 mt-0.5" />
                          <span>Review portfolio examples</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle size={16} className="text-white flex-shrink-0 mt-0.5" />
                          <span>Quote for custom features</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle size={16} className="text-white flex-shrink-0 mt-0.5" />
                          <span>Ask all your questions</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-black/30 border border-white/5 rounded-lg p-3 mb-4">
                      <p className="text-xs text-gray-400 font-medium mb-1">✓ Perfect for:</p>
                      <p className="text-xs text-gray-500">
                        Businesses with custom requirements, e-commerce needs, or booking systems.
                      </p>
                    </div>

                    <button className="w-full bg-white text-black font-bold py-3 px-4 rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group-hover:shadow-lg">
                      <Calendar size={18} />
                      Book Free Call
                    </button>

                    <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
                      <MessageCircle size={12} />
                      <span>Next available: Today</span>
                    </div>
                  </motion.div>

                </div>

                {/* Bottom Trust Elements */}
                <div className="mt-8 pt-6 border-t border-white/5">
                  <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-verdant-accent" />
                      <span>30-Day Money-Back Guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-verdant-accent" />
                      <span>120+ Happy Tradies</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-verdant-accent" />
                      <span>Australian Based Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PathChoiceModal;
