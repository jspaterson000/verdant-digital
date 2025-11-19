import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  headline: React.ReactNode;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  showStatus?: boolean;
  features?: string[];
}

const Hero: React.FC<HeroProps> = ({
  headline,
  subheadline,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  showStatus = false,
  features
}) => {
  const containerRef = useRef<HTMLElement>(null);
  
  // Mouse interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const centerX = innerWidth / 2;
      const centerY = innerHeight / 2;
      
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
          style={{ x, y }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-verdant-900/20 rounded-full blur-[120px] mix-blend-screen"
        />
        
        <motion.div 
          animate={{ 
            x: [0, 100, -100, 0],
            y: [0, -100, 100, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-verdant-accent/5 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -50, 50, 0],
            y: [0, 50, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px]"
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-10 hover:bg-white/10 transition-colors"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-verdant-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-verdant-accent"></span>
            </span>
            <span className="text-xs font-medium text-gray-300 tracking-widest uppercase">
              Accepting New Clients: November Slots Open
            </span>
          </motion.div>
        )}

        <h1 className="text-5xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter text-white leading-[0.9] mb-8">
          {headline}
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="flex flex-col items-center mb-10"
        >
             <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed font-light" dangerouslySetInnerHTML={{__html: subheadline}}>
            </p>
            
            {features && (
              <div className="mt-6 flex flex-wrap justify-center items-center gap-6 text-sm md:text-base font-medium">
                {features.map((feat, i) => (
                   <div key={i} className="flex items-center gap-2 text-white"><CheckCircle2 size={16} className="text-verdant-accent"/> {feat}</div>
                ))}
              </div>
            )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={ctaLink}
            onClick={(e) => handleScrollTo(e, ctaLink)}
            className="group relative w-full sm:w-auto px-8 py-4 bg-verdant-accent text-black font-bold uppercase tracking-wider overflow-hidden rounded-sm transition-all hover:scale-105"
          >
            <div className="absolute inset-0 bg-white/40 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <div className="relative flex items-center justify-center gap-2">
              {ctaText}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </a>
          
          <a
            href={secondaryCtaLink}
            onClick={(e) => handleScrollTo(e, secondaryCtaLink)}
            className="group w-full sm:w-auto px-8 py-4 border border-white/10 bg-white/5 backdrop-blur-sm text-white font-bold uppercase tracking-wider hover:bg-white/10 hover:border-verdant-accent/50 transition-all rounded-sm"
          >
             {secondaryCtaText}
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-600">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-verdant-accent/50 to-transparent"></div>
      </motion.div>

    </section>
  );
};

export default Hero;