import React from 'react';
import Hero from '../components/Hero';
import AgencyServices from '../components/AgencyServices';
import RecentWorks from '../components/RecentWorks';
import Contact from '../components/Contact';
import TechStack from '../components/TechStack';
import Philosophy from '../components/Philosophy';
import { motion } from 'framer-motion';

const AgencyHome: React.FC = () => {
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
                DIGITAL
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span 
                initial={{ y: 100, rotateX: -20 }}
                animate={{ y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 origin-bottom"
              >
                ACCELERATED
              </motion.span>
            </div>
          </>
        }
        subheadline="Full-service digital agency specializing in Shopify e-commerce, <br /> custom application development, and high-ROI advertising campaigns."
        ctaText="Our Expertise"
        ctaLink="#services"
        secondaryCtaText="View Work"
        secondaryCtaLink="#works"
        showStatus={false}
      />
      <TechStack />
      <AgencyServices />
      <Philosophy />
      <RecentWorks />
      <Contact />
    </>
  );
};

export default AgencyHome;