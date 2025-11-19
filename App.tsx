import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TradieLanding from './pages/TradieLanding';
import AgencyHome from './pages/AgencyHome';
import Footer from './components/Footer';
import PathChoiceModal from './components/PathChoiceModal';
import CheckoutModal from './components/CheckoutModal';
import ConsultationModal from './components/ConsultationModal';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'agency' | 'tradie'>('agency');
  const [modalState, setModalState] = useState<'closed' | 'path-choice' | 'express' | 'consultation'>('closed');

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
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onStartProject={() => setModalState('path-choice')}
      />
      <main>
        {currentPage === 'agency' ? <AgencyHome /> : <TradieLanding onStartCheckout={() => setModalState('path-choice')} />}
      </main>
      <Footer />

      {/* Path Choice Modal - First step */}
      <PathChoiceModal
        isOpen={modalState === 'path-choice'}
        onClose={() => setModalState('closed')}
        onSelectExpress={() => setModalState('express')}
        onSelectConsultation={() => setModalState('consultation')}
      />

      {/* Express Checkout Modal */}
      <CheckoutModal
        isOpen={modalState === 'express'}
        onClose={() => setModalState('closed')}
        onRedirectToConsultation={() => setModalState('consultation')}
      />

      {/* Consultation Booking Modal */}
      <ConsultationModal
        isOpen={modalState === 'consultation'}
        onClose={() => setModalState('closed')}
        onBack={() => setModalState('path-choice')}
      />
    </div>
  );
};

export default App;