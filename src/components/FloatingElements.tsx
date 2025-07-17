import React from 'react';

const FloatingElements: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* DNA Helix */}
      <div className="absolute top-1/4 right-8 md:right-16 floating-animation opacity-20">
        <svg width="60" height="120" viewBox="0 0 60 120" className="text-neon-pink">
          <path
            d="M10 10 Q30 30 50 50 Q30 70 10 90 Q30 110 50 130"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            className="rotate-animation"
          />
          <path
            d="M50 10 Q30 30 10 50 Q30 70 50 90 Q30 110 10 130"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            className="rotate-animation"
          />
        </svg>
      </div>

      {/* Floating Molecules */}
      <div className="absolute top-1/3 left-8 md:left-20 floating-animation-delayed opacity-30">
        <div className="relative">
          <div className="w-4 h-4 bg-electric-purple rounded-full"></div>
          <div className="w-3 h-3 bg-cosmic-blue rounded-full absolute -top-2 -right-2"></div>
          <div className="w-2 h-2 bg-neon-pink rounded-full absolute -bottom-1 -left-1"></div>
        </div>
      </div>

      {/* Geometric Pattern */}
      <div className="absolute bottom-1/4 left-8 md:left-16 floating-animation-slow opacity-20">
        <svg width="80" height="80" viewBox="0 0 80 80" className="text-cosmic-blue">
          <polygon
            points="40,10 70,60 10,60"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="pulse-glow"
          />
          <circle cx="40" cy="40" r="15" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* Atom Structure */}
      <div className="absolute top-3/4 right-1/4 floating-animation opacity-25">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-2 border-electric-purple rounded-full rotate-animation"></div>
          <div className="absolute inset-2 border-2 border-neon-pink rounded-full rotate-animation" style={{ animationDirection: 'reverse' }}></div>
          <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-cosmic-blue rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>

      {/* Test Tube */}
      <div className="absolute bottom-10 right-8 md:right-20 floating-animation-delayed opacity-30">
        <svg width="20" height="60" viewBox="0 0 20 60" className="text-neon-pink">
          <rect x="6" y="10" width="8" height="40" rx="4" stroke="currentColor" strokeWidth="2" fill="none" />
          <rect x="8" y="30" width="4" height="15" fill="currentColor" opacity="0.6" />
          <circle cx="10" cy="8" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* Microscope Silhouette */}
      <div className="absolute top-10 left-1/4 md:left-1/3 floating-animation-slow opacity-20">
        <svg width="40" height="50" viewBox="0 0 40 50" className="text-electric-purple">
          <path
            d="M15 10 L25 10 L25 30 L30 40 L10 40 Z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="20" cy="15" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </div>
    </div>
  );
};

export default FloatingElements;