import React, { useState, useEffect } from 'react';
import { Menu, X, Atom } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Home', href: '#home' },
    { name: 'Experiments', href: '#experiences' },
    { name: 'Services', href: '#packages' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-effect' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4" role="navigation" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 gradient-purple rounded-xl flex items-center justify-center">
              <Atom className="w-6 h-6 text-white rotate-animation" />
            </div>
            <h1 className="text-2xl font-bold font-outfit text-stardust-white">
              Mystery Lab
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 flex-1 justify-center ml-8">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-stardust-white hover:text-neon-pink transition-colors duration-200 font-medium"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block flex-shrink-0 ml-8">
            <button
              onClick={() => handleNavClick('#experiences')}
              className="btn-primary"
            >
              Start Exploring
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-stardust-white hover:text-neon-pink transition-colors flex-shrink-0"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 glass-effect rounded-2xl p-6">
            <div className="flex flex-col gap-4">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="text-left text-stardust-white hover:text-neon-pink transition-colors duration-200 font-medium py-2"
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('#experiences')}
                className="btn-primary mt-4"
              >
                Start Exploring
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;