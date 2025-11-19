import React from 'react';
import { Check, X, AlertTriangle } from 'lucide-react';

const Comparison: React.FC = () => {
  return (
    <section className="py-24 bg-zinc-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-verdant-accent text-sm font-bold tracking-[0.2em] uppercase mb-2">Why Us?</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-white">Stop Overpaying <br/><span className="text-gray-500">For Web Design.</span></h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Traditional Agency */}
          <div className="p-8 rounded-2xl border border-white/5 bg-white/5 opacity-70 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-3 mb-8">
               <div className="p-3 rounded-lg bg-red-500/10 text-red-500">
                 <AlertTriangle size={24} />
               </div>
               <h4 className="text-2xl font-bold text-white">Standard Agency</h4>
            </div>
            
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <X className="text-red-500 shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-white text-lg">$5,000+ Upfront</p>
                  <p className="text-sm text-gray-400">Huge deposit before work even starts.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <X className="text-red-500 shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-white text-lg">6-12 Weeks Build Time</p>
                  <p className="text-sm text-gray-400">Endless meetings and delays.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <X className="text-red-500 shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-white text-lg">Hourly Fees</p>
                  <p className="text-sm text-gray-400">Every change costs you extra money.</p>
                </div>
              </li>
               <li className="flex items-start gap-4">
                <X className="text-red-500 shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-white text-lg">Confusing Jargon</p>
                  <p className="text-sm text-gray-400">They speak geek, not trade.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Verdant */}
          <div className="p-8 rounded-2xl border-2 border-verdant-accent/50 bg-verdant-900/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-verdant-accent text-black text-xs font-bold px-3 py-1 uppercase tracking-wider">
                Recommended
            </div>
            <div className="flex items-center gap-3 mb-8">
               <div className="p-3 rounded-lg bg-verdant-accent text-black">
                 <Check size={24} />
               </div>
               <h4 className="text-2xl font-bold text-white">Verdant Digital</h4>
            </div>
            
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <Check className="text-verdant-accent shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-white text-lg">$299 Upfront</p>
                  <p className="text-sm text-gray-400">Low risk. Keeps cash in your business.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Check className="text-verdant-accent shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-white text-lg">7 Day Launch</p>
                  <p className="text-sm text-gray-400">Get leads next week, not next year.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Check className="text-verdant-accent shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-white text-lg">Flat Monthly Rate</p>
                  <p className="text-sm text-gray-400">Includes hosting, domain, and unlimited changes.</p>
                </div>
              </li>
               <li className="flex items-start gap-4">
                <Check className="text-verdant-accent shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-white text-lg">Tradie Focused</p>
                  <p className="text-sm text-gray-400">We build sites that get quotes.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;