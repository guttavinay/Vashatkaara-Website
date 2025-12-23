import React, { useState, useEffect, useRef } from 'react';

const STATS = [
  { label: 'Years of Engineering', value: '10+' },
  { label: 'AI Models Deployed', value: '50+' },
  { label: 'Global Clients', value: '120+' },
  { label: 'Uptime Reliability', value: '99.9%' },
];

const VALUES = [
  {
    title: 'Intelligence First',
    description: 'We don’t just build software; we architect cognitive systems that learn and adapt to your business needs.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    title: 'Scalable by Design',
    description: 'Our architectures are stress-tested for hyperscale, ensuring your growth is never hindered by technical debt.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 1.105 1.343 2 3 2s3-.895 3-2V7c0-1.105-1.343-2-3-2S4 5.895 4 7zm0 0c0 1.105 1.343 2 3 2s3-.895 3-2M9 5c0-1.105 1.343-2 3-2s3 .895 3 2m-6 2c0 1.105 1.343 2 3 2s3-.895 3-2M9 5v10c0 1.105 1.343 2 3 2s3-.895 3-2V5m6 2v10c0 1.105 1.343 2 3 2s3-.895 3-2V7c0-1.105-1.343-2-3-2s-3 .895-3 2zm0 0c0 1.105 1.343 2 3 2s3-.895 3-2" />
      </svg>
    )
  },
  {
    title: 'Absolute Precision',
    description: 'We maintain a "Zero Defect" philosophy, utilizing rigorous automated testing and peer audits for every line of code.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: 'Client-Centric Agility',
    description: 'We pivot rapidly to align with shifting market demands, ensuring your solution remains relevant and competitive.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: 'Ethical Innovation',
    description: 'Our AI and data practices are rooted in transparency and fairness, building trust alongside technological progress.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 20c4.083 0 7.66-2.428 9.297-6m-9.468-4.578A3 3 0 1112 4a3 3 0 013 3v2.5m-6 0C9 13.037 11.687 15 12 15s3-1.963 3-5.5" />
      </svg>
    )
  },
  {
    title: 'Global Engineering',
    description: 'We leverage world-class development standards to deliver robust, cross-border solutions for diverse industries.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )
  }
];

const About: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isPillarsVisible, setIsPillarsVisible] = useState(false);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPillarsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (pillarsRef.current) {
      observer.observe(pillarsRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (pillarsRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  const parallaxMain = scrollY * 0.05;
  const parallaxBg = scrollY * 0.1;

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-900/20 snap-start">
      <div 
        className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] -z-10 transition-transform duration-75 ease-out"
        style={{ transform: `translateY(${parallaxBg}px)` }}
      />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="relative group perspective-1000">
            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div 
              className="relative transition-transform duration-500 ease-out will-change-transform aspect-[5/4] overflow-hidden rounded-[2.5rem]"
              style={{ transform: `translateY(${parallaxMain}px)` }}
            >
              {/* Optimized Image with WebP and width params */}
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fm=webp&fit=crop&q=80&w=800" 
                alt="Vashatkaara Innovation Lab" 
                width="800"
                height="640"
                loading="lazy"
                decoding="async"
                className="rounded-[2.5rem] shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-1000 border border-slate-700/50 object-cover w-full h-full"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="animate-fade-in-up">
              <span className="font-bold tracking-widest uppercase text-sm mb-4 block gradient-text">TECHNOLOGY DRIVEN WITH PASSION</span>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                Engineering <span className="text-slate-400">Beyond the</span> <br />
                <span className="gradient-text">Possible.</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Vashatkaara was founded on a simple premise: the world's most complex problems require more than just code—they require vision and a deep-seated passion for technology. We are a collective of senior architects, data scientists, and creative thinkers dedicated to building the infrastructure of tomorrow.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <div key={i} className="glass-card p-6 rounded-2xl border-slate-800 hover:border-indigo-500/50 transition-all duration-300 group hover:-translate-y-1">
                  <div className="text-3xl font-extrabold text-white mb-1 group-hover:text-indigo-400 transition-colors">{stat.value}</div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</div>
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-indigo-500 group-hover:w-full transition-all duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;