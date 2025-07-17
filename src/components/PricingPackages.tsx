import React from 'react';
import { Check, Star, Zap, Crown } from 'lucide-react';

const PricingPackages: React.FC = () => {
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
    </section>
  );
};

export default PricingPackages;