import React from 'react';
import Logo from './Logo.tsx';

const SOCIAL_LINKS = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/vashatkaara',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/vashatkaara',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    )
  },
  {
    name: 'GitHub',
    href: 'https://github.com/vashatkaara',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@vashatkaara',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    )
  }
];

const Footer: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const offset = 80; // Align with header height
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
    <footer className="bg-slate-950 pt-20 pb-10 border-t border-slate-900 relative snap-start">
      {/* Top subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div onClick={(e: any) => scrollToSection(e, '#home')}>
              <Logo size="md" showTagline={true} className="mb-6" />
            </div>
            <p className="text-slate-500 max-w-sm mb-8 mt-4 leading-relaxed">
              Empowering the world's most innovative companies with elite software engineering, AI intelligence, and scalable infrastructure. 
              Our DNA is code; our mission is your success.
            </p>
            <div className="flex gap-5">
              {SOCIAL_LINKS.map((social) => (
                <a 
                  key={social.name} 
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 hover:text-white hover:border-indigo-400 hover:bg-indigo-600 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-500 group"
                >
                  <div className="group-hover:scale-125 transition-all duration-500">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-slate-300 uppercase tracking-widest text-xs">Services</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="hover:text-indigo-400 transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-800" /> Content Management
              </a></li>
              <li><a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="hover:text-indigo-400 transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-800" /> Staff Augmentation
              </a></li>
              <li><a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="hover:text-indigo-400 transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-800" /> OCR Solutions
              </a></li>
              <li><a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="hover:text-indigo-400 transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-800" /> AI & ML Pipelines
              </a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-slate-300 uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><a href="#about" onClick={(e) => scrollToSection(e, '#about')} className="hover:text-indigo-400 transition-colors">About Us</a></li>
              <li><a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="hover:text-indigo-400 transition-colors">Engineering Careers</a></li>
              <li><a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="hover:text-indigo-400 transition-colors">Brand Assets</a></li>
              <li><a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="hover:text-indigo-400 transition-colors">Legal & Privacy</a></li>
              <li><a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="hover:text-indigo-400 transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-slate-600">
            &copy; {new Date().getFullYear()} Vashatkaara Solutions Inc. <span className="mx-2">|</span> Engineered with Precision
          </p>
          <div className="flex gap-8 text-[10px] tracking-[0.2em] text-slate-600 font-bold uppercase">
            <span className="hover:text-slate-400 cursor-default transition-colors">Integrity</span>
            <span className="hover:text-slate-400 cursor-default transition-colors">Innovation</span>
            <span className="bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent">Nexus of Excellence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;