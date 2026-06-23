import { useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import Header from './components/Header';
import Hero from './components/Hero';
import ExperienceCards from './components/ExperienceCards';
import PricingPackages from './components/PricingPackages';
import ScienceKits from './components/ScienceKits';
import SocialProof from './components/SocialProof';
import FAQ from './components/FAQ';
import About from './components/About';
import Contact from './components/Contact';
import FloatingElements from './components/FloatingElements';
import { AdminDashboard } from './components/AdminDashboard';
import './App.css';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="min-h-screen bg-deep-space text-stardust-white overflow-x-hidden w-full max-w-full">
      <FloatingElements />
      <Header onOpenAdmin={() => setShowAdmin(true)} />
      
      {showAdmin ? (
        <AdminDashboard onClose={() => setShowAdmin(false)} />
      ) : (
        <main>
          <Hero />
          <ExperienceCards />
          <PricingPackages />
          <ScienceKits />
          <SocialProof />
          <FAQ />
          <About />
          <Contact />
        </main>
      )}
      
      <Toaster />
    </div>
  );
}

export default App;