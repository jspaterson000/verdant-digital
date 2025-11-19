import React from 'react';
import { ShoppingBag, BarChart2, Code, Monitor, Globe, Layers } from 'lucide-react';

const services = [
  {
    icon: ShoppingBag,
    title: "E-commerce & Shopify",
    desc: "High-converting storefronts. We specialize in Shopify builds that balance brand aesthetics with ruthless conversion optimization."
  },
  {
    icon: BarChart2,
    title: "Performance Marketing",
    desc: "Google Ads, Meta Ads, and TikTok. We manage ad spend with a focus on ROAS, not just vanity metrics like clicks."
  },
  {
    icon: Code,
    title: "Custom App Development",
    desc: "React, Node, Python. When off-the-shelf software doesn't fit, we build custom web applications to streamline your operations."
  },
  {
    icon: Monitor,
    title: "UX/UI Design",
    desc: "Interface design that feels intuitive. We map customer journeys to reduce friction and increase engagement."
  },
  {
    icon: Globe,
    title: "SEO Strategy",
    desc: "Long-term organic growth. Technical audits, content strategy, and authority building to own your niche."
  },
  {
    icon: Layers,
    title: "Conversion Optimization",
    desc: "Data-driven A/B testing. We analyze user behavior to turn more of your current traffic into paying customers."
  }
];

const AgencyServices: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-verdant-accent text-sm font-bold tracking-[0.2em] uppercase mb-2">Our Expertise</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-white">Digital Growth <br/><span className="text-gray-500">Engineered.</span></h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group relative p-8 glass-panel rounded-lg hover:bg-white/5 transition-colors duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-verdant-accent/5 rounded-bl-full -mr-4 -mt-4 transition-all duration-500 group-hover:bg-verdant-accent/10"></div>
              
              <service.icon className="w-10 h-10 text-verdant-accent mb-6" />
              
              <h4 className="text-xl font-bold text-white mb-3 group-hover:translate-x-2 transition-transform duration-300">
                {service.title}
              </h4>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgencyServices;