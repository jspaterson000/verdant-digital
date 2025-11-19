import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TradieLanding from './pages/TradieLanding';
import AgencyHome from './pages/AgencyHome';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'agency' | 'tradie'>('agency');

  useEffect(() => {
    // Simple hash routing
    const handleHashChange = () => {
      if (window.location.hash === '#tradies') {
        setCurrentPage('tradie');
      } else {
        // If hash is empty or something else (unless it matches a section ID we want to keep on agency page)
        // We default to agency, but we need to be careful not to override section scrolling.
        // Strategy: Use specific hash for page switching, keep sections for scrolling.
        if (window.location.hash === '#tradies') {
             setCurrentPage('tradie');
        } else if (!window.location.hash || window.location.hash === '#agency') {
             setCurrentPage('agency');
        }
      }
    };

    // Initial check
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: 'agency' | 'tradie') => {
    setCurrentPage(page);
    if (page === 'tradie') {
      window.history.pushState(null, '', '#tradies');
    } else {
      window.history.pushState(null, '', '/');
    }
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-verdant-accent selection:text-black">
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />
      <main>
        {currentPage === 'agency' ? <AgencyHome /> : <TradieLanding />}
      </main>
      <Footer />
    </div>
  );
};

export default App;