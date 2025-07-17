import React from 'react';
import { ArrowRight, Play, Sparkles, FlaskConical } from 'lucide-react';

const Hero: React.FC = () => {
  const handleBookExperience = () => {
    document.querySelector('#packages')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewPrograms = () => {
    document.querySelector('#experiences')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-space via-purple-900/20 to-blue-900/20"></div>
      
      {/* Animated Science Elements */}
      <div className="absolute top-20 left-8 md:left-16 floating-animation">
        <FlaskConical className="w-16 h-16 text-neon-pink opacity-60" />
      </div>
      <div className="absolute top-40 right-8 md:right-20 floating-animation-delayed">
        <div className="w-12 h-12 rounded-full bg-cosmic-blue opacity-40 pulse-glow"></div>
      </div>
      <div className="absolute bottom-40 left-8 md:left-20 floating-animation-slow">
        <Sparkles className="w-20 h-20 text-electric-purple opacity-50" />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold font-outfit mb-8 text-transparent bg-clip-text bg-gradient-to-r from-electric-purple via-neon-pink to-cosmic-blue leading-tight">
            Where Science Becomes Magic
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl lg:text-3xl text-stardust-white/80 mb-12 font-medium max-w-4xl mx-auto leading-relaxed">
            Interactive STEM adventures for curious minds aged 5-12
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={handleBookExperience}
              className="btn-primary text-lg px-8 py-4 group"
              aria-label="Book a science experience"
            >
              Book an Experience
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={handleViewPrograms}
              className="btn-secondary text-lg px-8 py-4 group"
              aria-label="View our science programs"
            >
              <Play className="w-5 h-5" />
              View Programs
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-neon-pink mb-2">10,000+</div>
              <div className="text-stardust-white/70">Happy Scientists</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cosmic-blue mb-2">500+</div>
              <div className="text-stardust-white/70">Experiments Done</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-electric-purple mb-2">50+</div>
              <div className="text-stardust-white/70">Schools Partner</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-stardust-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-electric-purple rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;