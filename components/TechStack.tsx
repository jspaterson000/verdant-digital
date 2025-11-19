import React from 'react';
import { motion } from 'framer-motion';

const stack = [
  "Shopify Experts", "Google Partner", "Meta Business", "React", "Next.js", "Node.js", "AWS Cloud", "Klaviyo", "Figma", "TypeScript", "Vercel"
];

const TechStack: React.FC = () => {
  return (
    <div className="py-12 border-y border-white/5 bg-zinc-950 overflow-hidden">
      <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-gray-600 mb-8">Powered By Best-in-Class Technology</p>
      <div className="flex relative z-10 mask-linear-fade">
        <motion.div
           animate={{ x: [0, -1000] }}
           transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
           className="flex gap-24 whitespace-nowrap px-12"
        >
           {[...stack, ...stack, ...stack, ...stack].map((tech, i) => (
             <span key={i} className="text-3xl font-display font-bold text-zinc-800 uppercase tracking-tight hover:text-zinc-600 transition-colors cursor-default select-none">
                {tech}
             </span>
           ))}
        </motion.div>
      </div>
    </div>
  );
}
export default TechStack;