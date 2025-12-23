
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden snap-start">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 mb-8 animate-fade-in">
          <span className="flex h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
          <span className="text-xs font-bold gradient-text uppercase tracking-[0.2em]">INTELLIGENCE • INNOVATION • EXCELLENCE</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
          Innovating with <span className="gradient-text">Vashatkaara</span> <br className="hidden md:block" /> Intelligence.
        </h1>
        
        <div className="max-w-3xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed space-y-6">
          <p>
            At Vashatkaara, we specialize in delivering innovative software solutions tailored to meet the unique needs of your business. Whether you're looking to enhance existing processes with custom-built software or need end-to-end product development, we offer a comprehensive suite of services that turn your ideas into reality.
          </p>
          <p>
            Our team combines cutting-edge technology with industry expertise to build products that are scalable, secure, and designed for success. From initial concept to final deployment, we are your trusted partner in navigating the complexities of the digital landscape. Let's build something extraordinary together!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#services" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-all hover:scale-105">
            View Our Services
          </a>
          <a href="#contact" className="w-full sm:w-auto px-8 py-4 bg-slate-800 text-white font-bold rounded-xl border border-slate-700 hover:bg-slate-700 transition-all flex items-center justify-center gap-2 group">
            Start a Project
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
