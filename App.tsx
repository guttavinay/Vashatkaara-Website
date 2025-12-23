import React, { useState, useEffect, Suspense, lazy } from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import BackToTop from './components/BackToTop.tsx';

// Lazy load non-critical components
const About = lazy(() => import('./components/About.tsx'));
const ServiceList = lazy(() => import('./components/ServiceList.tsx'));
const AIStrategist = lazy(() => import('./components/AIStrategist.tsx'));
const InstallationGuide = lazy(() => import('./components/InstallationGuide.tsx'));
const ContactSection = lazy(() => import('./components/ContactSection.tsx'));
const Footer = lazy(() => import('./components/Footer.tsx'));

const TESTIMONIALS = [
  {
    quote: "Vashatkaara transformed our document workflows. Their AI-powered OCR tools reduced our manual entry time by 80% while increasing accuracy.",
    name: "Sarah Chen",
    role: "CTO",
    company: "FinStream"
  },
  {
    quote: "The engineering talent we sourced through Vashatkaara felt like a natural extension of our team. Scalability is no longer a bottleneck for our growth.",
    name: "Marcus Thorne",
    role: "VP of Engineering",
    company: "CloudNet"
  },
  {
    quote: "Their chatbot expertise is second to none. Our customer engagement rates have doubled since the rollout of our custom NLP assistant.",
    name: "Elena Rodriguez",
    role: "COO",
    company: "RetailFlow"
  }
];

const TRUSTED_BRANDS = ['Microsoft', 'Stripe', 'Airbnb', 'GitHub', 'Linear'];

// Loading Fallback
const SectionPlaceholder = () => <div className="py-24 bg-slate-900/10 min-h-[400px]" />;

function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen selection:bg-indigo-500 selection:text-white bg-[#0f172a]">
      <Header />
      <main>
        <Hero />
        
        <Suspense fallback={<SectionPlaceholder />}>
          <About />
        </Suspense>

        <Suspense fallback={<SectionPlaceholder />}>
          <ServiceList />
        </Suspense>

        <section className="py-12 bg-slate-900/10 border-y border-slate-800/30">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">Trusted by industry leaders</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 hover:opacity-60 transition-all duration-700">
              {TRUSTED_BRANDS.map(name => (
                <span key={name} className="text-2xl md:text-3xl font-bold italic text-slate-300 transition-colors hover:text-white cursor-default">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 relative overflow-hidden bg-slate-900/30 snap-start">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Trusted by <span className="gradient-text">Global Visionaries</span></h2>
            </div>
            
            <div className="relative group">
              <div className="overflow-hidden relative rounded-3xl min-h-[350px]">
                <div 
                  className="flex transition-transform duration-700 ease-in-out" 
                  style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                  {TESTIMONIALS.map((t, i) => (
                    <div key={i} className="w-full flex-shrink-0 px-2">
                      <div className="glass-card p-10 md:p-16 rounded-3xl relative h-full">
                        <p className="text-xl md:text-2xl text-slate-200 italic mb-10 leading-relaxed font-light">
                          "{t.quote}"
                        </p>
                        <div className="flex items-center gap-6 mt-auto">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-purple-600 flex items-center justify-center font-bold text-2xl text-white">
                            {t.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-white">{t.name}</h4>
                            <p className="text-sm text-slate-500 uppercase tracking-widest font-semibold">{t.role} @ {t.company}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={prevTestimonial} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-12 h-12 rounded-full glass-card flex items-center justify-center opacity-0 group-hover:opacity-100 z-20 transition-opacity">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={nextTestimonial} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-12 h-12 rounded-full glass-card flex items-center justify-center opacity-0 group-hover:opacity-100 z-20 transition-opacity">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </section>

        <Suspense fallback={<SectionPlaceholder />}>
          <AIStrategist />
        </Suspense>

        <Suspense fallback={<SectionPlaceholder />}>
          <InstallationGuide />
        </Suspense>

        <Suspense fallback={<SectionPlaceholder />}>
          <ContactSection />
        </Suspense>
      </main>
      <Suspense fallback={<div className="h-64 bg-slate-950" />}>
        <Footer />
      </Suspense>
      <BackToTop />
    </div>
  );
}

export default App;