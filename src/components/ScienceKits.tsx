import React from 'react';
import { ShoppingCart, Users, Building } from 'lucide-react';

const ScienceKits: React.FC = () => {
  const kits = [
    {
      id: 'starter',
      name: 'Starter Kit',
      price: 99,
      icon: ShoppingCart,
      image: 'https://images.pexels.com/photos/8471903/pexels-photo-8471903.jpeg?auto=compress&cs=tinysrgb&w=400',
      contents: [
        'Basic chemistry set',
        'Microscope (100x)',
        'Experiment guide (15 activities)',
        'Safety equipment',
        'Digital access code',
      ],
      ageRecommendation: '5-8 years',
      gradient: 'gradient-blue',
    },
    {
      id: 'family',
      name: 'Family Lab',
      price: 199,
      icon: Users,
      image: 'https://images.pexels.com/photos/8471916/pexels-photo-8471916.jpeg?auto=compress&cs=tinysrgb&w=400',
      contents: [
        'Advanced chemistry & physics set',
        'Digital microscope (400x)',
        'Comprehensive guide (35 activities)',
        'Lab equipment & tools',
        'Family project challenges',
        'Online community access',
      ],
      ageRecommendation: '6-12 years',
      gradient: 'gradient-purple',
    },
    {
      id: 'classroom',
      name: 'Classroom Bundle',
      price: 499,
      icon: Building,
      image: 'https://images.pexels.com/photos/8471908/pexels-photo-8471908.jpeg?auto=compress&cs=tinysrgb&w=400',
      contents: [
        'Complete lab setup (30 students)',
        'Professional equipment',
        'Curriculum-aligned activities (50+)',
        'Teacher training materials',
        'Assessment tools',
        'Ongoing curriculum support',
      ],
      ageRecommendation: 'Grades K-6',
      gradient: 'gradient-pink',
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-deep-space to-purple-900/20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold font-outfit mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cosmic-blue to-electric-purple">
            Science Kit Showcase
          </h2>
          <p className="text-xl text-stardust-white/80 max-w-3xl mx-auto">
            Complete science kits designed for different learning environments and group sizes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {kits.map((kit) => {
            const IconComponent = kit.icon;
            
            return (
              <div
                key={kit.id}
                className="glass-effect rounded-3xl overflow-hidden hover-lift group"
                role="article"
                aria-labelledby={`kit-${kit.id}-title`}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={kit.image}
                    alt={`${kit.name} science kit contents`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Icon Badge */}
                  <div className={`absolute top-4 right-4 w-12 h-12 ${kit.gradient} rounded-xl flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 id={`kit-${kit.id}-title`} className="text-2xl font-bold font-outfit mb-2 text-stardust-white">
                    {kit.name}
                  </h3>
                  
                  {/* Age Recommendation */}
                  <div className="bg-neon-pink/20 rounded-lg p-2 mb-4 inline-block">
                    <span className="text-neon-pink font-semibold text-sm">{kit.ageRecommendation}</span>
                  </div>

                  {/* Contents */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-stardust-white mb-3">What's Included:</h4>
                    <ul className="space-y-2">
                      {kit.contents.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-stardust-white/80">
                          <div className="w-2 h-2 bg-electric-purple rounded-full flex-shrink-0 mt-2"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-neon-pink">${kit.price}</span>
                    <button
                      className="btn-primary group/btn"
                      aria-label={`Add ${kit.name} to cart`}
                    >
                      Add to Cart
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12 p-8 glass-effect rounded-2xl">
          <h3 className="text-2xl font-bold font-outfit mb-4 text-stardust-white">
            Free Shipping & Setup Support
          </h3>
          <p className="text-stardust-white/70 max-w-2xl mx-auto">
            All kits include free shipping nationwide and complimentary setup assistance via video call. 
            Need help choosing the right kit? Our science education specialists are here to help!
          </p>
        </div>
      </div>
    </section>
  );
};

export default ScienceKits;