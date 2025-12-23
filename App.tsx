
import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import About from './components/About.tsx';
import ServiceList from './components/ServiceList.tsx';
import ContactSection from './components/ContactSection.tsx';
import Footer from './components/Footer.tsx';
import BackToTop from './components/BackToTop.tsx';

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

function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Auto-cycle every 8 seconds
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen selection:bg-indigo-500 selection:text-white">
      <Header />
      <main>
        <Hero />
        
        <About />

        <ServiceList />

        {/* Brand Trust Section */}
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

        {/* Testimonials Section with Carousel */}
        <section className="py-24 relative overflow-hidden bg-slate-900/30 snap-start">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Trusted by <span className="gradient-text">Global Visionaries</span></h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Discover why industry leaders choose Vashatkaara for their most critical technical transformations.
              </p>
            </div>
            
            <div className="relative group">
              {/* Carousel Container */}
              <div className="overflow-hidden relative rounded-3xl">
                <div 
                  className="flex transition-transform duration-700 ease-in-out" 
                  style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                  {TESTIMONIALS.map((t, i) => (
                    <div key={i} className="w-full flex-shrink-0 px-2">
                      <div className="glass-card p-10 md:p-16 rounded-3xl relative h-full">
                        <div className="absolute top-10 left-10 text-indigo-500/20">
                          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017V14C19.017 11.7909 17.2261 10 15.017 10H14.017V8H15.017C18.3307 8 21.017 10.6863 21.017 14V19C21.017 20.1046 20.1216 21 19.017 21H14.017ZM3.01697 21L3.01697 18C3.01697 16.8954 3.91241 16 5.01697 16H8.01697V14C8.01697 11.7909 6.22607 10 4.01697 10H3.01697V8H4.01697C7.33068 8 10.017 10.6863 10.017 14V19C10.017 20.1046 9.12154 21 8.01697 21H3.01697Z" />
                          </svg>
                        </div>
                        <p className="text-xl md:text-2xl text-slate-200 italic mb-10 relative z-10 leading-relaxed font-light">
                          "{t.quote}"
                        </p>
                        <div className="flex items-center gap-6 mt-auto">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-purple-600 flex items-center justify-center font-bold text-2xl text-white shadow-lg shadow-sky-500/20">
                            {t.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-white">{t.name}</h4>
                            <p className="text-sm text-slate-500 uppercase tracking-widest font-semibold">{t.role} <span className="text-indigo-500">@</span> {t.company}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <button 
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 rounded-full glass-card border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500 transition-all opacity-0 group-hover:opacity-100 z-20"
                aria-label="Previous testimonial"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 rounded-full glass-card border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500 transition-all opacity-0 group-hover:opacity-100 z-20"
                aria-label="Next testimonial"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Pagination Indicators */}
            <div className="flex justify-center gap-3 mt-10">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === i ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-700 hover:bg-slate-600'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
