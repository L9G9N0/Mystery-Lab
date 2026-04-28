import React from 'react';
import { PartyPopper, GraduationCap, Calendar, ArrowRight } from 'lucide-react';

const ExperienceCards: React.FC = () => {
  const experiences = [
    {
      id: 1,
      icon: PartyPopper,
      title: 'Birthday Lab Adventures',
      description: 'Transform birthdays into unforgettable scientific celebrations with explosive experiments and magical discoveries.',
      priceRange: '₹4999',
      features: ['2-3 hours of fun', 'Up to 15 kids', 'Take-home experiments', 'Science party favors'],
      gradient: 'gradient-pink',
    },
    {
      id: 2,
      icon: GraduationCap,
      title: 'School Science Spectaculars',
      description: 'Captivating classroom experiences that make learning science exciting and memorable for students.',
      priceRange: '₹5999',
      features: ['Full class engagement', 'Curriculum aligned', 'Interactive demonstrations', 'Educational materials'],
      gradient: 'gradient-blue',
    },
    {
      id: 3,
      icon: Calendar,
      title: 'Weekend Wonder Workshops',
      description: 'Regular weekend sessions where kids dive deep into specific scientific concepts through hands-on exploration.',
      priceRange: '₹3999',
      features: ['2-hour sessions', 'Small groups', 'Project-based learning', 'Science journal included'],
      gradient: 'gradient-purple',
    },
  ];

  return (
    <section id="experiences" className="section-padding bg-gradient-to-b from-deep-space to-purple-900/20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold font-outfit mb-6 text-transparent bg-clip-text bg-gradient-to-r from-electric-purple to-neon-pink">
            Science Experiences
          </h2>
          <p className="text-xl text-stardust-white/80 max-w-3xl mx-auto">
            Choose from our carefully crafted science adventures designed to inspire wonder and learning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((experience) => {
            const IconComponent = experience.icon;
            
            return (
              <div
                key={experience.id}
                className="glass-effect rounded-3xl p-8 hover-lift group cursor-pointer"
                role="article"
                aria-labelledby={`experience-${experience.id}-title`}
              >
                {/* Icon */}
                <div className={`w-16 h-16 ${experience.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 id={`experience-${experience.id}-title`} className="text-2xl font-bold font-outfit mb-4 text-stardust-white">
                  {experience.title}
                </h3>
                
                <p className="text-stardust-white/70 mb-6 leading-relaxed">
                  {experience.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {experience.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-stardust-white/80">
                      <div className="w-2 h-2 bg-electric-purple rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-neon-pink">{experience.priceRange}</span>
                  <button className="btn-primary group/btn">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceCards;