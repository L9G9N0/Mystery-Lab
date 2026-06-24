import React, { useState } from 'react';
import { Check, Star, Zap, Crown, Loader2 } from 'lucide-react';
import { useAuth } from '@/store/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { AuthModal } from './AuthModal';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

export const PricingPackages: React.FC = () => {
  const { user, session } = useAuth();
  const { toast } = useToast();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);

  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
    studentName: '',
    studentAge: '',
    phone: '',
    preferredDate: '',
  });
  const [submittingBooking, setSubmittingBooking] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? 'http://localhost:8000' : '/api');

  const packages = [
    {
      id: 'basic',
      name: 'Basic Explorer',
      price: 29,
      icon: Star,
      gradient: 'gradient-blue',
      description: 'Perfect for getting started with science exploration',
      features: [
        'Monthly science kit',
        'Basic experiments (3-4)',
        'Educational videos',
        'Parent guide included',
        'Email support',
      ],
      recommendedAge: '5-7 years',
      popular: false,
    },
    {
      id: 'junior',
      name: 'Junior Scientist',
      price: 49,
      icon: Zap,
      gradient: 'gradient-purple',
      description: 'Advanced experiments for curious young minds',
      features: [
        'Premium science kit',
        'Advanced experiments (6-8)',
        'Interactive online lessons',
        'Virtual lab sessions',
        'Project showcase platform',
        'Priority support',
      ],
      recommendedAge: '8-10 years',
      popular: true,
    },
    {
      id: 'master',
      name: 'Lab Master',
      price: 89,
      icon: Crown,
      gradient: 'gradient-pink',
      description: 'Complete scientific journey with exclusive content',
      features: [
        'Deluxe science kit',
        'Complex experiments (10-12)',
        '1-on-1 virtual mentoring',
        'Advanced equipment included',
        'Science journal & certification',
        'Family experiment sessions',
        '24/7 expert support',
      ],
      recommendedAge: '10-12 years',
      popular: false,
    },
  ];

  const handlePlanSelect = (pkg: any) => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    setSelectedPlan(pkg);
    setBookingForm({
      studentName: '',
      studentAge: '',
      phone: '',
      preferredDate: new Date().toISOString().split('T')[0],
    });
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan || !session?.access_token) return;
    setSubmittingBooking(true);

    try {
      const payload = {
        event_title: `${selectedPlan.name} Subscription`,
        student_name: bookingForm.studentName,
        student_age: parseInt(bookingForm.studentAge),
        contact_phone: bookingForm.phone,
        preferred_date: bookingForm.preferredDate || null,
      };

      const res = await fetch(`${apiUrl}/booking/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Failed to submit booking registration.');
      }

      toast({
        title: 'Booking Slot Requested!',
        description: `Successfully requested booking for "${selectedPlan.name}". A lab guide will reach out to confirm.`,
      });
      setSelectedPlan(null);
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Booking Error',
        description: err.message || 'An error occurred while booking. Please try again.',
      });
    } finally {
      setSubmittingBooking(false);
    }
  };

  return (
    <section id="packages" className="section-padding bg-gradient-to-b from-purple-900/20 to-deep-space">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold font-outfit mb-6 text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-cosmic-blue">
            Discovery Packages
          </h2>
          <p className="text-xl text-stardust-white/80 max-w-3xl mx-auto">
            Monthly subscription packages designed to grow with your young scientist
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg) => {
            const IconComponent = pkg.icon;
            
            return (
              <div
                key={pkg.id}
                className={`relative glass-effect rounded-3xl p-8 hover-lift ${
                  pkg.popular ? 'ring-2 ring-electric-purple' : ''
                }`}
                role="article"
                aria-labelledby={`package-${pkg.id}-title`}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-electric-purple text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-16 h-16 ${pkg.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Header */}
                <h3 id={`package-${pkg.id}-title`} className="text-2xl font-bold font-outfit mb-2 text-stardust-white">
                  {pkg.name}
                </h3>
                
                <p className="text-stardust-white/70 mb-4">
                  {pkg.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-neon-pink">${pkg.price}</span>
                  <span className="text-stardust-white/60">/month</span>
                </div>

                {/* Age Recommendation */}
                <div className="bg-cosmic-blue/20 rounded-lg p-3 mb-6">
                  <span className="text-cosmic-blue font-semibold">Recommended: {pkg.recommendedAge}</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-stardust-white/80">
                      <Check className="w-5 h-5 text-electric-purple flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handlePlanSelect(pkg)}
                  className={`w-full ${
                    pkg.popular ? 'btn-primary' : 'btn-secondary'
                  } justify-center`}
                  aria-label={`Select ${pkg.name} package`}
                >
                  Select Plan
                </button>
              </div>
            );
          })}
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center mt-12">
          <p className="text-stardust-white/70">
            <span className="text-neon-pink font-semibold">30-day money-back guarantee</span> • Cancel anytime • No hidden fees
          </p>
        </div>
      </div>

      {/* Plan Booking Dialog */}
      <Dialog open={selectedPlan !== null} onOpenChange={(open) => !open && setSelectedPlan(null)}>
        <DialogContent className="sm:max-w-[450px] bg-[#0A0D1A]/95 border-white/10 text-white backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold font-outfit text-white">
              Enroll in {selectedPlan?.name}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Submit the enrollment info to register your student explorer. A lab manager will call to confirm.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleBookingSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <label htmlFor="booking-student" className="text-sm font-medium text-gray-300">
                Student Full Name *
              </label>
              <input
                id="booking-student"
                type="text"
                required
                value={bookingForm.studentName}
                onChange={(e) => setBookingForm({ ...bookingForm, studentName: e.target.value })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:border-neon-pink focus:ring-1 focus:ring-neon-pink focus:outline-none text-white text-base"
                placeholder="Dr. Eleanor Vance Jr."
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="booking-age" className="text-sm font-medium text-gray-300">
                Student Age *
              </label>
              <input
                id="booking-age"
                type="number"
                required
                min={3}
                max={18}
                value={bookingForm.studentAge}
                onChange={(e) => setBookingForm({ ...bookingForm, studentAge: e.target.value })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:border-neon-pink focus:ring-1 focus:ring-neon-pink focus:outline-none text-white text-base"
                placeholder="9"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="booking-phone" className="text-sm font-medium text-gray-300">
                Parent/Contact Phone *
              </label>
              <input
                id="booking-phone"
                type="tel"
                required
                minLength={8}
                value={bookingForm.phone}
                onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:border-neon-pink focus:ring-1 focus:ring-neon-pink focus:outline-none text-white text-base"
                placeholder="(555) 123-4567"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="booking-date" className="text-sm font-medium text-gray-300">
                Preferred Program Start Date *
              </label>
              <input
                id="booking-date"
                type="date"
                required
                value={bookingForm.preferredDate}
                onChange={(e) => setBookingForm({ ...bookingForm, preferredDate: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#0A0D1A] border border-white/10 rounded-xl focus:border-neon-pink focus:ring-1 focus:ring-neon-pink focus:outline-none text-white text-base"
              />
            </div>

            <button
              type="submit"
              disabled={submittingBooking}
              className="w-full btn-primary flex justify-center items-center py-3 bg-gradient-to-r from-neon-pink to-purple-600 rounded-xl text-white font-medium hover:opacity-90 transition-opacity"
            >
              {submittingBooking && <Loader2 className="w-5 h-5 animate-spin mr-2" />}
              Enroll Student Explorer
            </button>
          </form>
        </DialogContent>
      </Dialog>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </section>
  );
};

export default PricingPackages;