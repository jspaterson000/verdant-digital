import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  headline: React.ReactNode;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  ctaOnClick?: () => void;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  showStatus?: boolean;
  statusText?: string;
  featuresHeading?: string;
  features?: string[];
  socialProof?: string;
  priceHighlight?: {
    setup: string;
    monthly: string;
    subtext?: string;
  };
}

const Hero: React.FC<HeroProps> = ({
  headline,
  subheadline,
  ctaText,
  ctaLink,
  ctaOnClick,
  secondaryCtaText,
  secondaryCtaLink,
  showStatus = false,
  statusText,
  featuresHeading,
  features,
  socialProof,
  priceHighlight
}) => {
  const containerRef = useRef<HTMLElement>(null);

  // Mouse interaction - throttled for performance
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.3 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    let rafId: number;
    let lastTime = 0;
    const throttleMs = 16; // ~60fps

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastTime < throttleMs) return;
      lastTime = now;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const { innerWidth, innerHeight } = window;
        const centerX = innerWidth / 2;
        const centerY = innerHeight / 2;

        mouseX.set((e.clientX - centerX) * 0.02);
        mouseY.set((e.clientY - centerY) * 0.02);
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [mouseX, mouseY]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20 selection:bg-verdant-accent selection:text-black">
      
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ x, y, willChange: 'transform' }}
          animate={{
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[700px] md:h-[700px] bg-verdant-900/50 md:bg-verdant-900/30 rounded-full blur-[50px] md:blur-[100px] mix-blend-screen"
        />

        <motion.div
          animate={{
            x: [0, 150, -100, 50, 0],
            y: [0, -120, 80, -50, 0],
            scale: [1, 1.3, 0.8, 1.1, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }}
          style={{ willChange: 'transform' }}
          className="absolute top-0 left-0 w-[280px] h-[280px] md:w-[550px] md:h-[550px] bg-verdant-accent/25 md:bg-verdant-accent/15 rounded-full blur-[40px] md:blur-[70px]"
        />

        <motion.div
          animate={{
            x: [0, -80, 60, -40, 0],
            y: [0, 70, -60, 40, 0],
            scale: [1, 0.9, 1.2, 0.95, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }}
          style={{ willChange: 'transform' }}
          className="absolute bottom-0 right-0 w-[280px] h-[280px] md:w-[450px] md:h-[450px] bg-blue-900/35 md:bg-blue-900/20 rounded-full blur-[40px] md:blur-[70px]"
        />

        <motion.div
          animate={{
            x: [0, -60, 80, -30, 0],
            y: [0, 90, -70, 50, 0],
            scale: [1, 1.1, 0.85, 1.05, 1],
            opacity: [0.3, 0.5, 0.2, 0.4, 0.3],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }}
          style={{ willChange: 'transform' }}
          className="absolute top-1/3 right-1/4 w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-green-500/20 md:bg-green-500/10 rounded-full blur-[45px] md:blur-[75px]"
        />
      </div>

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none"></div>

      {/* Content */}
      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {showStatus && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-verdant-accent/10 border border-verdant-accent/30 backdrop-blur-md mb-10 hover:bg-verdant-accent/20 transition-colors mx-4"
          >
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-verdant-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-verdant-accent"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-white tracking-wider whitespace-nowrap">
              {statusText || "Accepting New Clients: November Slots Open"}
            </span>
          </motion.div>
        )}

        <h1 className="text-[2.75rem] md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-white leading-[1.1] mb-8">
          {headline}
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="flex flex-col items-center mb-10"
        >
             <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed font-light mb-8" dangerouslySetInnerHTML={{__html: subheadline}}>
            </p>

            {priceHighlight && (
              <div className="mb-10 bg-gradient-to-br from-verdant-900/30 to-verdant-800/20 border-2 border-verdant-accent/40 rounded-2xl p-6 md:p-8 shadow-[0_0_40px_rgba(74,222,128,0.2)] max-w-md mx-auto">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="text-center">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-5xl md:text-6xl font-bold text-white">{priceHighlight.setup}</span>
                      <span className="text-gray-400 text-lg">setup</span>
                    </div>
                  </div>
                  <span className="text-3xl text-gray-500">+</span>
                  <div className="text-center">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-5xl md:text-6xl font-bold text-verdant-accent">{priceHighlight.monthly}</span>
                      <span className="text-gray-400 text-lg">/mo</span>
                    </div>
                  </div>
                </div>
                {priceHighlight.subtext && (
                  <p className="text-center text-sm text-gray-400 mt-3">
                    {priceHighlight.subtext}
                  </p>
                )}
              </div>
            )}

            {features && (
              <div className="flex flex-col items-center text-center">
                {featuresHeading && (
                  <h3 className="text-white font-bold text-lg mb-4">{featuresHeading}</h3>
                )}
                <div className="flex flex-col gap-3 text-base text-gray-300 items-center">
                  {features.map((feat, i) => (
                     <div key={i} className="flex items-center justify-center gap-3"><CheckCircle2 size={18} className="text-verdant-accent flex-shrink-0"/> <span>{feat}</span></div>
                  ))}
                </div>
              </div>
            )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col items-center justify-center gap-4"
        >
          {ctaOnClick ? (
            <button
              onClick={ctaOnClick}
              className="group relative w-full sm:w-auto px-10 py-5 bg-verdant-accent text-black font-bold uppercase tracking-wider overflow-hidden rounded-sm transition-all hover:scale-105 shadow-[0_0_30px_rgba(74,222,128,0.3)]"
            >
              <div className="absolute inset-0 bg-white/40 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <div className="relative flex items-center justify-center gap-2">
                {ctaText}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ) : (
            <a
              href={ctaLink}
              onClick={(e) => handleScrollTo(e, ctaLink)}
              className="group relative w-full sm:w-auto px-10 py-5 bg-verdant-accent text-black font-bold uppercase tracking-wider overflow-hidden rounded-sm transition-all hover:scale-105 shadow-[0_0_30px_rgba(74,222,128,0.3)]"
            >
              <div className="absolute inset-0 bg-white/40 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <div className="relative flex items-center justify-center gap-2">
                {ctaText}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          )}

          {/* Social Proof Bar */}
          {socialProof && (
            <div className="mt-2 text-sm text-gray-400">
              {socialProof}
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator - Hidden on mobile to avoid overlap with CTAs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="hidden md:flex absolute bottom-10 left-1/2 transform -translate-x-1/2 flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-600">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-verdant-accent/50 to-transparent"></div>
      </motion.div>

    </section>
  );
};

export default Hero;