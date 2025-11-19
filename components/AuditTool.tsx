import React, { useState } from 'react';
import { Sparkles, Loader2, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react';
import { generateAudit } from '../services/gemini';
import { AuditResult } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const AuditTool: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const data = await generateAudit(input);
      setResult(data);
    } catch (err) {
      setError("Failed to generate audit. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="audit" className="py-24 bg-zinc-900 relative overflow-hidden">
       {/* Background Accents */}
       <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-black via-transparent to-transparent opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center space-x-2 text-verdant-accent mb-4 px-3 py-1 border border-verdant-accent/20 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles size={12} />
              <span>AI Competitor Analysis</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Are You Missing <br />
              <span className="text-gray-500">Profitable Jobs?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-lg">
              Not sure if your current setup is working? Tell us what you do (e.g. "Plumber in Western Sydney"), and our AI will tell you what you need to do to rank higher.
            </p>
            
            <form onSubmit={handleAudit} className="relative max-w-md">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="e.g., Electrician in Melbourne doing residential..."
                  className="w-full bg-black/50 border border-white/10 text-white px-6 py-4 rounded-lg focus:outline-none focus:border-verdant-accent focus:ring-1 focus:ring-verdant-accent transition-all pr-12"
                  disabled={loading}
                />
                <button 
                    type="submit"
                    disabled={loading || !input}
                    className="absolute right-2 top-2 bottom-2 bg-white text-black p-2 rounded hover:bg-verdant-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <ArrowRight size={20} />}
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                * Instant analysis powered by Google Gemini.
              </p>
            </form>
            
            {error && (
                <div className="mt-4 text-red-400 flex items-center gap-2 text-sm">
                    <AlertCircle size={16} />
                    {error}
                </div>
            )}
          </div>

          <div className="relative">
             <AnimatePresence mode="wait">
                {!result ? (
                   <motion.div 
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                     className="aspect-square rounded-2xl border border-white/5 bg-black/40 backdrop-blur-sm flex items-center justify-center text-center p-8"
                   >
                       <div className="space-y-4 opacity-30">
                           <Sparkles className="w-16 h-16 mx-auto" />
                           <p className="text-xl font-display">Enter your trade for a free check...</p>
                       </div>
                   </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-zinc-800/50 border border-white/10 rounded-2xl p-8 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                             <Sparkles size={120} />
                        </div>

                        <div className="flex items-baseline justify-between mb-6 border-b border-white/10 pb-6">
                            <div>
                                <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Business Potential</p>
                                <div className="text-5xl font-display font-bold text-white">
                                    {result.score}<span className="text-2xl text-verdant-accent">/100</span>
                                </div>
                            </div>
                            <div className={`h-3 w-3 rounded-full ${result.score > 70 ? 'bg-verdant-500' : 'bg-yellow-500'} shadow-[0_0_10px_currentColor]`}></div>
                        </div>

                        <div className="mb-8">
                            <h4 className="text-white font-bold mb-2">The Verdict</h4>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                {result.summary}
                            </p>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-4">Next Steps</h4>
                            <ul className="space-y-3">
                                {result.recommendations.map((rec, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                        <CheckCircle className="w-5 h-5 text-verdant-accent shrink-0" />
                                        {rec}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="mt-8 pt-6 border-t border-white/10 text-center">
                             <a href="#contact" className="text-verdant-accent text-sm hover:underline inline-block">
                                 Book a slot to get this sorted &rarr;
                             </a>
                        </div>
                    </motion.div>
                )}
             </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuditTool;