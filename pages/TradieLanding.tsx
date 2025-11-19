import React from 'react';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import Services from '../components/Services';
import Process from '../components/Process';
import Comparison from '../components/Comparison';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import RecentWorks from '../components/RecentWorks';
import { motion } from 'framer-motion';

const TradieLanding: React.FC = () => {
  return (
    <>
      <Hero 
        headline={
          <>
            <div className="overflow-hidden">
              <motion.span 
                initial={{ y: 100, rotateX: -20 }}
                animate={{ y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="block origin-bottom"
              >
                GET YOUR
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span 
                initial={{ y: 100, rotateX: -20 }}
                animate={{ y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 origin-bottom"
              >
                BUSINESS ONLINE
              </motion.span>
            </div>
          </>
        }
        subheadline="High-performance websites for Aussie Tradies. No fluff, just leads.<br /> <span class='text-verdant-accent font-bold'>Live in 7 days.</span>"
        ctaText="Start Your Build"
        ctaLink="#contact"
        secondaryCtaText="View Inclusions"
        secondaryCtaLink="#pricing"
        showStatus={true}
        features={["$299 Upfront", "$99 / Month", "No Hidden Fees"]}
      />
      <TrustBar />
      <Services />
      <Process />
      <RecentWorks />
      <Comparison />
      <Pricing />
      <FAQ />
      <Contact />
    </>
  );
};

export default TradieLanding;