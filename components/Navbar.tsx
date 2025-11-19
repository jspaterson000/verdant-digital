import React, { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';

interface NavbarProps {
  currentPage: 'agency' | 'tradie';
  onNavigate: (page: 'agency' | 'tradie') => void;
  onStartProject?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onStartProject }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const agencyLinks = [
    { name: 'Expertise', href: '#services' },
    { name: 'Work', href: '#works' },
    { name: 'For Tradies', action: () => onNavigate('tradie') },
  ];

  const tradieLinks = [
    { name: 'Agency Home', action: () => onNavigate('agency') },
    { name: 'Inclusions', href: '#services' },
    { name: 'Pricing', href: '#pricing' },
  ];

  const currentLinks = currentPage === 'agency' ? agencyLinks : tradieLinks;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-md border-white/10 py-4'
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div 
          className="flex items-center space-x-2 group cursor-pointer select-none"
          onClick={() => onNavigate('agency')}
        >
          <div className="w-8 h-8 bg-white text-black flex items-center justify-center rounded-sm group-hover:bg-verdant-accent transition-colors duration-300">
            <Zap size={18} fill="currentColor" />
          </div>
          <span className="text-xl font-display font-bold tracking-tight text-white">
            Verdant Digital
          </span>
          {currentPage === 'tradie' && (
            <span className="hidden sm:block ml-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-verdant-accent text-black rounded-sm">
              Tradie Division
            </span>
          )}
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {currentLinks.map((link, i) => (
            <button
              key={i}
              onClick={(e) => {
                if (link.action) link.action();
                if (link.href) scrollToSection(e, link.href);
              }}
              className="text-sm font-medium text-gray-300 hover:text-verdant-accent transition-colors duration-200 uppercase tracking-widest"
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={(e) => {
              if (currentPage === 'tradie' && onStartProject) {
                onStartProject();
              } else {
                scrollToSection(e, '#contact');
              }
            }}
            className="px-5 py-2 bg-white text-black text-sm font-bold uppercase tracking-wider hover:bg-verdant-accent transition-all duration-300"
          >
            {currentPage === 'agency' ? 'Enquire' : 'Start Project'}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2 hover:text-verdant-accent transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black border-b border-white/10 py-8 px-4 flex flex-col space-y-4 shadow-2xl animate-fade-in-up">
          {currentLinks.map((link, i) => (
            <button
              key={i}
              onClick={(e) => {
                if (link.action) link.action();
                if (link.href) scrollToSection(e, link.href);
              }}
              className="text-left text-lg font-display font-medium text-white hover:text-verdant-accent border-l-2 border-transparent hover:border-verdant-accent pl-4 transition-all"
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={(e) => {
              if (currentPage === 'tradie' && onStartProject) {
                onStartProject();
              } else {
                scrollToSection(e, '#contact');
              }
              setMobileMenuOpen(false);
            }}
            className="text-left text-lg font-display font-medium text-verdant-accent pl-4"
          >
             {currentPage === 'agency' ? 'Enquire Now' : 'Start Project'}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;