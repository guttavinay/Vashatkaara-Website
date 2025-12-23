import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SERVICES } from '../constants.tsx';
import { Service } from '../types.ts';

const ServiceList: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  
  // Duplicate the services to create a seamless infinite scroll loop
  const duplicatedServices = [...SERVICES, ...SERVICES, ...SERVICES];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const closeService = useCallback(() => {
    setIsClosing(true);
    // Wait for the duration of the closing animation (defined in index.html as 0.4s)
    setTimeout(() => {
      setSelectedService(null);
      setIsClosing(false);
      // Restore focus to the element that opened the modal
      if (triggerRef.current) {
        triggerRef.current.focus();
      }
    }, 400);
  }, []);

  // Handle keyboard events (ESC and Focus Trap)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedService || isClosing) return;

      if (e.key === 'Escape') {
        closeService();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) { // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else { // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    if (selectedService) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      
      // Focus the close button when modal opens
      const timer = setTimeout(() => {
        const closeBtn = modalRef.current?.querySelector<HTMLElement>('button[aria-label="Close modal"]');
        closeBtn?.focus();
      }, 50);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
        clearTimeout(timer);
      };
    }
  }, [selectedService, isClosing, closeService]);

  const handleScrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('about');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const openService = (service: Service, e: React.MouseEvent | React.KeyboardEvent) => {
    triggerRef.current = e.currentTarget as HTMLElement;
    setSelectedService(service);
    setIsClosing(false);
  };

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="py-24 bg-slate-900/50 overflow-hidden relative snap-start"
    >
      <div className={`max-w-7xl mx-auto px-6 mb-16 text-center transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Expertise Driven by <span className="text-indigo-400">Innovation</span></h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Explore our suite of high-performance solutions designed for the modern enterprise. 
          Click on a card to view a comprehensive breakdown of features and capabilities.
        </p>
      </div>

      <div className="relative" style={{ perspective: '1000px' }}>
        {/* Gradient overlays for smooth fading at edges */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
        
        <div className="animate-scroll flex gap-8 px-4 py-8">
          {duplicatedServices.map((service, index) => (
            <button
              key={`${service.id}-${index}`}
              onClick={(e) => openService(service, e)}
              aria-haspopup="dialog"
              aria-expanded={selectedService?.id === service.id}
              className={`glass-card p-8 rounded-2xl group hover:border-sky-400 hover:ring-2 hover:ring-sky-400/20 hover:bg-slate-800/95 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex flex-col h-full w-[350px] flex-shrink-0 cursor-pointer text-left focus:outline-none focus:ring-4 focus:ring-sky-500/50 hover:-translate-y-6 hover:scale-[1.03] hover:shadow-[0_30px_70px_-15px_rgba(56,189,248,0.4)] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ 
                transitionDelay: isVisible ? `${(index % SERVICES.length) * 150}ms` : '0ms',
              }}
            >
              {/* Background Light Streak Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-sky-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

              {/* Animated Icon Wrapper with Glow */}
              <div className="relative w-16 h-16 mb-6">
                <div className="absolute inset-0 bg-sky-500/30 blur-2xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700 opacity-0 group-hover:opacity-100" />
                <div className="relative w-16 h-16 bg-sky-600/10 rounded-2xl flex items-center justify-center text-sky-400 border border-sky-500/20 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-sky-500/20 group-hover:border-sky-400/50 transition-all duration-500 shadow-inner">
                  <div className="group-hover:animate-float">
                    {service.icon}
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors duration-300 relative">
                {service.title}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-400 group-hover:w-16 transition-all duration-500" />
              </h3>
              
              <p className="text-slate-400 mb-8 flex-grow leading-relaxed text-sm group-hover:text-slate-200 transition-colors duration-500">
                {service.description}
              </p>

              <div className="space-y-3 border-t border-slate-800/50 pt-6">
                <span className="text-[10px] uppercase tracking-widest text-sky-500 font-bold">Key Capabilities</span>
                <ul className="space-y-3">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <li 
                      key={idx} 
                      className="flex items-center gap-3 text-xs text-slate-300 group-hover:text-white transition-all duration-300 group-hover:translate-x-3"
                      style={{ transitionDelay: `${idx * 50}ms` }}
                    >
                      <div className="relative">
                        <svg className="w-3.5 h-3.5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                        <div className="absolute inset-0 bg-sky-400 blur-[3px] opacity-0 group-hover:opacity-60" />
                      </div>
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Decorative corner accent visible on hover */}
              <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-transparent to-sky-500/15 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-md pointer-events-none" />
            </button>
          ))}
        </div>
      </div>
      
      <div className={`mt-16 text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <a 
          href="#about"
          onClick={handleScrollToAbout}
          className="inline-flex items-center gap-4 px-8 py-4 bg-slate-800/30 rounded-full border border-slate-700 hover:border-sky-500/50 hover:bg-slate-800/50 transition-all group cursor-pointer shadow-xl shadow-black/20"
        >
          <span className="text-sm font-semibold text-slate-300 group-hover:text-white">Learn more about our methodologies</span>
          <div className="w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center group-hover:bg-sky-500 transition-colors">
            <svg className="w-4 h-4 text-sky-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </a>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center px-6 py-12"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          {/* Backdrop */}
          <div 
            className={`absolute inset-0 bg-slate-950/80 backdrop-blur-sm ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}
            onClick={!isClosing ? closeService : undefined}
          />
          
          {/* Modal Content */}
          <div 
            ref={modalRef}
            className={`glass-card w-full max-w-2xl rounded-3xl overflow-hidden relative shadow-2xl border-indigo-500/20 ${isClosing ? 'animate-modal-zoom-out' : 'animate-modal-zoom-in'}`}
          >
            <div className="p-8 md:p-12">
              <button 
                onClick={closeService}
                disabled={isClosing}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-800 transition-colors group focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6 text-slate-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex flex-col md:flex-row gap-8 items-start mb-10">
                <div className="w-20 h-20 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-500/20 shadow-xl flex-shrink-0">
                  {selectedService.icon}
                </div>
                <div>
                  <h3 id="modal-title" className="text-3xl md:text-4xl font-bold mb-4 gradient-text">{selectedService.title}</h3>
                  <p id="modal-description" className="text-slate-300 leading-relaxed text-lg">
                    {selectedService.description}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 border-b border-slate-800 pb-3">Full Service Capabilities</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedService.features.map((feature, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:border-indigo-500/30 transition-all group"
                    >
                      <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-125 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-slate-300 font-medium group-hover:text-white transition-colors">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-800 flex justify-end gap-4">
                <button 
                  onClick={closeService}
                  disabled={isClosing}
                  className="px-6 py-3 rounded-xl text-slate-400 hover:text-white transition-colors font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Close
                </button>
                <a 
                  href="#contact" 
                  onClick={(e) => { e.preventDefault(); if (!isClosing) { closeService(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); } }}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Inquire Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServiceList;