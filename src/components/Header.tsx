import React, { useState, useEffect } from 'react';
import { Menu, X, Atom, LogIn, LogOut, User as UserIcon, Shield } from 'lucide-react';
import { useAuth } from '@/store/AuthContext';
import { AuthModal } from './AuthModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  onOpenAdmin?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  const { user, profile, loading, signOut } = useAuth();

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
    <>
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

            {/* CTA & Auth buttons */}
            <div className="hidden lg:flex items-center gap-4 flex-shrink-0 ml-8">
              <button
                onClick={() => handleNavClick('#experiences')}
                className="btn-primary"
              >
                Start Exploring
              </button>

              {loading ? (
                <div className="w-10 h-10 rounded-full bg-white/5 animate-pulse" />
              ) : user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-neon-pink to-purple-600 flex items-center justify-center text-xs font-bold text-white uppercase">
                        {profile?.name?.[0] || user.email?.[0] || 'U'}
                      </div>
                      <span className="text-sm font-medium text-stardust-white max-w-[100px] truncate">
                        {profile?.name || user.email?.split('@')[0]}
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-[#0A0D1A]/95 border-white/10 text-white backdrop-blur-md">
                    <DropdownMenuLabel className="font-outfit">
                      <div className="font-semibold">{profile?.name || 'Explorer'}</div>
                      <div className="text-xs text-gray-400 truncate">{user.email}</div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />
                    
                    <DropdownMenuItem onClick={() => handleNavClick('#contact')} className="hover:bg-white/5 cursor-pointer">
                      <UserIcon className="w-4 h-4 mr-2" />
                      <span>My Profile</span>
                    </DropdownMenuItem>

                    {profile?.is_admin && (
                      <DropdownMenuItem 
                        onClick={() => onOpenAdmin?.()} 
                        className="hover:bg-white/5 text-neon-blue cursor-pointer font-medium"
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        <span>Admin Panel</span>
                      </DropdownMenuItem>
                    )}
                    
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem onClick={signOut} className="hover:bg-red-500/10 text-red-400 cursor-pointer">
                      <LogOut className="w-4 h-4 mr-2" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-neon-pink/30 hover:border-neon-pink text-stardust-white hover:text-neon-pink font-medium transition-colors duration-200"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </button>
              )}
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
                  className="btn-primary w-full mt-2"
                >
                  Start Exploring
                </button>

                {loading ? (
                  <div className="h-10 w-full bg-white/5 animate-pulse rounded-xl" />
                ) : user ? (
                  <div className="border-t border-white/10 pt-4 flex flex-col gap-2">
                    <div className="px-2 py-1 font-outfit">
                      <div className="font-semibold text-sm">{profile?.name || 'Explorer'}</div>
                      <div className="text-xs text-gray-400 truncate">{user.email}</div>
                    </div>
                    {profile?.is_admin && (
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          onOpenAdmin?.();
                        }}
                        className="flex items-center gap-2 py-2 px-3 text-neon-blue font-medium hover:bg-white/5 rounded-xl text-left"
                      >
                        <Shield size={18} />
                        Admin Panel
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        signOut();
                      }}
                      className="flex items-center gap-2 py-2 px-3 text-red-400 hover:bg-red-500/10 rounded-xl text-left"
                    >
                      <LogOut size={18} />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setAuthMode('login');
                      setIsAuthModalOpen(true);
                    }}
                    className="flex items-center gap-2 justify-center py-2 px-4 border border-neon-pink/30 hover:border-neon-pink rounded-xl text-stardust-white hover:text-neon-pink font-medium transition-colors"
                  >
                    <LogIn size={18} />
                    Sign In
                  </button>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode={authMode}
      />
    </>
  );
};

export default Header;