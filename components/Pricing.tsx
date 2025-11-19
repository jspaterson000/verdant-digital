import React from 'react';
import { Check, ShieldCheck } from 'lucide-react';

interface PricingProps {
  onStartCheckout?: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onStartCheckout }) => {
  return (
    <section id="pricing" className="py-24 bg-black border-t border-white/10 relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-verdant-accent/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-verdant-accent text-sm font-bold tracking-[0.2em] uppercase mb-2">The Deal</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-white">Simple Pricing. <br/>Big Results.</h3>
        </div>

        <div className="max-w-lg mx-auto bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-verdant-accent/50 transition-all duration-300 shadow-2xl relative group">
           
           {/* Popular Badge */}
           <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-verdant-600 to-verdant-400 text-black text-center py-1 font-bold text-xs uppercase tracking-widest">
             Most Popular for Tradies
           </div>

           <div className="p-8 pt-12 border-b border-white/5">
              <h4 className="text-xl font-bold text-white text-center mb-2">Tradie Starter Pack</h4>
              <p className="text-gray-400 text-center text-sm">Everything you need to get online and get work.</p>
              
              <div className="mt-8 text-center">
                <div className="flex items-baseline justify-center gap-2">
                    <span className="text-2xl text-gray-500 line-through decoration-red-500/50">$1299</span>
                    <span className="text-6xl font-display font-bold text-white">$299</span>
                </div>
                <p className="text-verdant-accent font-bold uppercase tracking-wider mt-2">Initial Build Cost</p>
                
                <div className="mt-6 inline-block bg-white/5 rounded-lg px-4 py-3 border border-white/5">
                    <p className="text-white font-medium text-lg flex items-center justify-center gap-2">
                        + $99 <span className="text-sm font-normal text-gray-400">/ month</span>
                    </p>
                    <p className="text-gray-500 text-xs mt-1">24 Month Contract • Cancel Anytime after</p>
                </div>
              </div>
           </div>

           <div className="p-8 bg-black/40">
             <ul className="space-y-4 mb-8">
               {[
                 "Custom High-Convert Website",
                 "Mobile & Tablet Optimized",
                 "Google Business Setup",
                 "Basic Local SEO",
                 "Contact Form & Quote Integration",
                 "Hosting & Domain Included",
                 "Unlimited Content Updates",
                 "Live in 7 Days or Less"
               ].map((item, i) => (
                 <li key={i} className="flex items-center gap-3 text-gray-300">
                   <div className="w-5 h-5 rounded-full bg-verdant-accent/20 flex items-center justify-center shrink-0">
                     <Check size={12} className="text-verdant-accent" />
                   </div>
                   {item}
                 </li>
               ))}
             </ul>

             <button
               onClick={onStartCheckout}
               className="block w-full bg-verdant-accent text-black font-bold uppercase tracking-wider text-center py-4 rounded hover:bg-white transition-all duration-300 hover:scale-[1.02] shadow-[0_0_20px_rgba(74,222,128,0.2)]"
             >
               Secure This Price
             </button>
             
             <div className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-xs">
                <ShieldCheck size={14} className="text-verdant-accent" />
                <span>30-Day Satisfaction Guarantee</span>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;