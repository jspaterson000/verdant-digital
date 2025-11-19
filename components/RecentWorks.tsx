import React from 'react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';

const projects = [
  {
    name: "Structa Claims",
    category: "Corporate Web Design",
    url: "https://structa.claims",
    desc: "Professional claims management platform.",
    color: "from-blue-900 to-slate-900"
  },
  {
    name: "Bread Bloom",
    category: "E-commerce / Brand",
    url: "https://breadbloom.com.au",
    desc: "Artisan bakery digital presence.",
    color: "from-orange-900 to-amber-900"
  },
  {
    name: "Newstead Plant Co",
    category: "Shopify E-commerce",
    url: "https://newsteadplantco.com.au",
    desc: "Modern plant retailer shopfront.",
    color: "from-green-900 to-emerald-900"
  }
];

const RecentWorks: React.FC = () => {
  return (
    <section id="works" className="py-24 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 text-center md:text-left">
          <div>
             <h2 className="text-verdant-accent text-sm font-bold tracking-[0.2em] uppercase mb-2">Portfolio</h2>
             <h3 className="text-4xl md:text-5xl font-display font-bold text-white">Recent Works</h3>
          </div>
          <p className="text-gray-500 mt-4 md:mt-0 max-w-md md:text-right">
            Selected projects showcasing our range across custom dev, e-commerce, and corporate identity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <a 
              key={i}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block h-80 rounded-2xl overflow-hidden border border-white/10 hover:border-verdant-accent/50 transition-all duration-500"
            >
              {/* Background Gradient Placeholder (simulating image) */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-40 group-hover:opacity-60 transition-opacity duration-500`}></div>
              
              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div className="flex justify-end">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-verdant-accent group-hover:text-black transition-all duration-300">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
                
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs text-gray-300 mb-3">
                    {project.category}
                  </span>
                  <h4 className="text-2xl font-bold text-white mb-1">{project.name}</h4>
                  <p className="text-gray-400 text-sm opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {project.desc}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentWorks;