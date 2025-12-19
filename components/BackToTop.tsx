
import React, { useState, useEffect } from 'react';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when user has scrolled down past the Hero section (roughly 500px)
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div 
      className={`fixed bottom-8 right-8 z-[60] transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'
      }`}
    >
      <button
        onClick={scrollToTop}
        className="glass-card w-14 h-14 rounded-full flex items-center justify-center text-indigo-400 hover:text-white border-indigo-500/30 hover:border-indigo-500 shadow-2xl shadow-indigo-500/40 group transition-all duration-300 backdrop-blur-xl bg-slate-900/60"
        aria-label="Back to top"
      >
        <div className="relative">
          <svg 
            className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          {/* Subtle pulse effect on the arrow when visible */}
          <div className="absolute inset-0 bg-indigo-500/20 blur-lg rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
        </div>
      </button>
    </div>
  );
};

export default BackToTop;
