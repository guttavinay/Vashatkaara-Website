import React, { useState, useEffect, useRef } from 'react';
import { SERVICES } from '../constants';

const ServiceList: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
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
          Move your cursor over a card to pause the stream and interact with our stack.
        </p>
      </div>

      <div className="relative" style={{ perspective: '1000px' }}>
        {/* Gradient overlays for smooth fading at edges */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
        
        <div className="animate-scroll flex gap-8 px-4 py-8">
          {duplicatedServices.map((service, index) => (
            <div 
              key={`${service.id}-${index}`} 
              className={`glass-card p-8 rounded-2xl group hover:border-sky-400/60 hover:bg-slate-800/90 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex flex-col h-full w-[350px] flex-shrink-0 cursor-default hover:-translate-y-4 hover:shadow-[0_20px_60px_-15px_rgba(56,189,248,0.2)] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ 
                transitionDelay: isVisible ? `${(index % SERVICES.length) * 150}ms` : '0ms',
                // We reset the transition duration for the entry animation, 
                // but hover effects should remain snappy
              }}
            >
              {/* Background Light Streak Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

              {/* Animated Icon Wrapper with Glow */}
              <div className="relative w-16 h-16 mb-6">
                <div className="absolute inset-0 bg-sky-500/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700 opacity-0 group-hover:opacity-100" />
                <div className="relative w-16 h-16 bg-sky-600/10 rounded-2xl flex items-center justify-center text-sky-400 border border-sky-500/20 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-sky-500/20 group-hover:border-sky-400/50 transition-all duration-500">
                  <div className="group-hover:animate-float">
                    {service.icon}
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors duration-300 relative">
                {service.title}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 group-hover:w-12 transition-all duration-500" />
              </h3>
              
              <p className="text-slate-400 mb-8 flex-grow leading-relaxed text-sm group-hover:text-slate-200 transition-colors duration-500">
                {service.description}
              </p>

              <ul className="space-y-3 border-t border-slate-800/50 pt-6">
                {service.features.slice(0, 3).map((feature, idx) => (
                  <li 
                    key={idx} 
                    className="flex items-center gap-3 text-xs text-slate-300 group-hover:text-white transition-all duration-300 group-hover:translate-x-2"
                    style={{ transitionDelay: `${idx * 50}ms` }}
                  >
                    <div className="relative">
                      <svg className="w-3.5 h-3.5 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <div className="absolute inset-0 bg-sky-400 blur-[2px] opacity-0 group-hover:opacity-40" />
                    </div>
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Decorative corner accent visible on hover */}
              <div className="absolute -bottom-1 -right-1 w-16 h-16 bg-gradient-to-br from-transparent to-sky-500/10 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-sm" />
            </div>
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
    </section>
  );
};

export default ServiceList;