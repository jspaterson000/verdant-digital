import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const items = [
  "Trusted by Aussie Tradies",
  "Live in 7 Days",
  "Google Partner",
  "No Lock-in Contracts after 24m",
  "100% Tax Deductible",
  "Local Aussie Support",
  "Lead Generation Focused",
  "Mobile Optimized"
];

const TrustBar: React.FC = () => {
  return (
    <div className="w-full bg-verdant-accent text-black py-3 overflow-hidden border-y border-verdant-600 relative z-20">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20,
          }}
          className="flex items-center gap-8 px-4 font-bold uppercase tracking-wider text-sm"
        >
          {[...items, ...items, ...items].map((item, i) => (
            <React.Fragment key={i}>
              <span className="flex items-center gap-2">
                <Star size={14} className="fill-black" />
                {item}
              </span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TrustBar;