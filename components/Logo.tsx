
import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', showText = true, showTagline = false, size = 'md' }) => {
  const sizes = {
    sm: { icon: 'w-10 h-10', text: 'text-lg', tag: 'text-[7px]' },
    md: { icon: 'w-14 h-14', text: 'text-2xl', tag: 'text-[10px]' },
    lg: { icon: 'w-24 h-24', text: 'text-4xl', tag: 'text-[13px]' },
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center gap-4 group cursor-pointer transition-transform duration-500 hover:scale-105 ${className}`}>
      {/* The Animated Icon Container */}
      <div className={`${currentSize.icon} relative flex-shrink-0 flex items-center justify-center`}>
        {/* Orbital Glow Layer */}
        <div className="absolute inset-0 bg-sky-500/20 blur-xl rounded-full scale-75 group-hover:scale-125 group-hover:bg-purple-500/30 transition-all duration-700 animate-pulse" aria-hidden="true" />
        
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full relative z-10 drop-shadow-[0_0_8px_rgba(56,189,248,0.4)] group-hover:drop-shadow-[0_0_12px_rgba(168,85,247,0.6)] transition-all duration-500">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          {/* Outer group handles the overall translation to center */}
          <g transform="translate(50,50)">
            {/* Middle group handles the breathing animation scale around its local 0,0 (which is 50,50 global) */}
            <g className="animate-logo-breathe" style={{ transformOrigin: '0 0' }}>
              {[...Array(12)].map((_, i) => (
                <path
                  key={i}
                  d="M -35 0 A 35 35 0 0 1 0 -35"
                  stroke="url(#logoGradient)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  transform={`rotate(${i * 30}) scale(${1 - i * 0.03})`}
                  opacity={0.9 - i * 0.06}
                  className="transition-all duration-1000 group-hover:stroke-purple-400"
                  style={{
                    // Adding a slight individual delay per path for a wavy effect
                    transitionDelay: `${i * 20}ms`
                  }}
                />
              ))}
            </g>
          </g>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`${currentSize.text} font-black tracking-widest uppercase gradient-text animate-shimmer drop-shadow-sm`}>
            Vashatkaara
          </span>
          {showTagline && (
            <div className="overflow-visible mt-1.5">
              <span className={`${currentSize.tag} font-extrabold tracking-[0.3em] uppercase gradient-text whitespace-nowrap block group-hover:translate-x-1 transition-transform duration-700 opacity-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]`}>
                TECHNOLOGY DRIVEN WITH PASSION
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;