import React from 'react';
import { Smartphone, MapPin, MousePointerClick, ShieldCheck, Zap, Search } from 'lucide-react';

const services = [
  {
    icon: Zap,
    title: "Rapid 7-Day Build",
    desc: "We don't mess around. From sign-off to launch in one week. Get your business visible while your competitors are still getting quotes."
  },
  {
    icon: Search,
    title: "Google Local SEO",
    desc: "Dominate your suburb. We optimize your site so when locals search for 'Plumber near me', they find you, not the other guy."
  },
  {
    icon: Smartphone,
    title: "Mobile First Design",
    desc: "Your customers are searching on their phones. Your site will look perfect and load instantly on every device."
  },
  {
    icon: MousePointerClick,
    title: "Quote Request System",
    desc: "Stop playing phone tag. Automated forms collect job details 24/7 so you wake up to qualified leads in your inbox."
  },
  {
    icon: MapPin,
    title: "Service Area Targeting",
    desc: "We build pages specifically for the suburbs you want to work in, filtering out the tyre kickers from too far away."
  },
  {
    icon: ShieldCheck,
    title: "Fully Managed IT",
    desc: "We handle the hosting, the security, the domain, and the updates. You focus on the tools, we handle the tech."
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-verdant-accent text-sm font-bold tracking-[0.2em] uppercase mb-2">The Package</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-white">Everything You Need. <br/><span className="text-gray-500">Nothing You Don't.</span></h3>
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

export default Services;