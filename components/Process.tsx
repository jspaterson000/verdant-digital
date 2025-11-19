import React from 'react';
import { Phone, PenTool, Rocket } from 'lucide-react';

const Process: React.FC = () => {
  return (
    <section className="py-24 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
           <h2 className="text-verdant-accent text-sm font-bold tracking-[0.2em] uppercase mb-2">How It Works</h2>
           <h3 className="text-4xl md:text-5xl font-display font-bold text-white">Live in 7 Days. <br/><span className="text-gray-500">No Headaches.</span></h3>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-[2px] bg-gradient-to-r from-zinc-800 via-verdant-accent/50 to-zinc-800 z-0"></div>

          {/* Step 1 */}
          <div className="relative z-10 flex flex-col items-center text-center group">
            <div className="w-24 h-24 bg-zinc-900 border-2 border-zinc-700 rounded-full flex items-center justify-center mb-6 group-hover:border-verdant-accent group-hover:bg-verdant-900/20 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <Phone className="w-10 h-10 text-white group-hover:text-verdant-accent transition-colors" />
            </div>
            <div className="bg-black px-4 pb-2">
               <h4 className="text-xl font-bold text-white mb-2">Day 1: Brief Chat</h4>
               <p className="text-gray-400 text-sm">A 15-minute call to get your details. We handle the writing, photos, and structure.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 flex flex-col items-center text-center group">
            <div className="w-24 h-24 bg-zinc-900 border-2 border-zinc-700 rounded-full flex items-center justify-center mb-6 group-hover:border-verdant-accent group-hover:bg-verdant-900/20 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <PenTool className="w-10 h-10 text-white group-hover:text-verdant-accent transition-colors" />
            </div>
            <div className="bg-black px-4 pb-2">
               <h4 className="text-xl font-bold text-white mb-2">Day 4: Review Draft</h4>
               <p className="text-gray-400 text-sm">We send you a full link. You tell us what to tweak. We don't stop until you're happy.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 flex flex-col items-center text-center group">
            <div className="w-24 h-24 bg-zinc-900 border-2 border-verdant-accent rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(74,222,128,0.3)]">
              <Rocket className="w-10 h-10 text-verdant-accent" />
            </div>
            <div className="bg-black px-4 pb-2">
               <h4 className="text-xl font-bold text-white mb-2">Day 7: Launch</h4>
               <p className="text-gray-400 text-sm">We flip the switch. Your business is live, indexed by Google, and ready for quotes.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;