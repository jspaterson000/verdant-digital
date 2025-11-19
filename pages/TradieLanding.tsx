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

interface TradieLandingProps {
  onStartCheckout?: () => void;
}

const TradieLanding: React.FC<TradieLandingProps> = ({ onStartCheckout }) => {

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
                Get More Work with a
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: 100, rotateX: -20 }}
                animate={{ y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 origin-bottom"
              >
                Website Built to Convert
              </motion.span>
            </div>
          </>
        }
        subheadline="Professional, done-for-you tradie website.<br/>Ready in 7 days. Built to win more jobs."
        ctaText="Secure My Spot"
        ctaLink="#contact"
        ctaOnClick={onStartCheckout}
        showStatus={true}
        statusText="⚡ Only 3 Slots Left This Week"
        priceHighlight={{
          setup: "$299",
          monthly: "$99",
          subtext: "Everything included. No hidden fees. Cancel anytime."
        }}
        featuresHeading="What You Get"
        features={["A website built to get you more quote requests", "Completely done-for-you setup - we handle everything", "Updates included - no hidden costs", "30-day money-back guarantee"]}
        socialProof="⭐ 4.9/5 — Trusted by tradies nationwide"
      />
      <TrustBar />
      <Services />
      <Process />
      <RecentWorks />
      <Comparison />
      <Pricing onStartCheckout={onStartCheckout} />
      <FAQ />
      <Contact />
    </>
  );
};

export default TradieLanding;