import React from 'react';
import { Zap, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const preventDefault = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
             <div className="w-6 h-6 bg-zinc-800 text-white flex items-center justify-center rounded-sm">
                <Zap size={14} fill="currentColor" />
             </div>
             <span className="text-lg font-display font-bold text-white">VERDANT</span>
          </div>
          
          <div className="flex space-x-6 text-gray-400">
            <a href="#" onClick={preventDefault} aria-label="Instagram" className="hover:text-verdant-accent transition-colors"><Instagram size={20} /></a>
            <a href="#" onClick={preventDefault} aria-label="Twitter" className="hover:text-verdant-accent transition-colors"><Twitter size={20} /></a>
            <a href="#" onClick={preventDefault} aria-label="LinkedIn" className="hover:text-verdant-accent transition-colors"><Linkedin size={20} /></a>
          </div>

          <div className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Verdant Digital. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;