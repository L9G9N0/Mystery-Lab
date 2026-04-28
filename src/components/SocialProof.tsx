import React from 'react';
import { Star, Users, Award, Heart } from 'lucide-react';

const SocialProof: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Rahul',
      role: 'Parent of 8-year-old Emma',
      content: 'Mystery Lab transformed my daughter\'s curiosity into genuine scientific thinking. She now asks the most amazing questions!',
      rating: 5,
      image: 'https://images.pexels.com/photos/4114979/pexels-photo-4114979.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      id: 2,
      name: 'Arpit',
      role: 'Elementary School Principal',
      content: 'The school programs are exceptional. Students are more engaged in science than ever before. Highly recommend!',
      rating: 5,
      image: 'https://images.pexels.com/photos/6325959/pexels-photo-6325959.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      id: 3,
      name: 'Akash',
      role: 'Homeschool Educator',
      content: 'The curriculum is perfectly structured and the support is outstanding. My kids look forward to science time!',
      rating: 5,
      image: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
  ];

  const stats = [
    { number: '98%', label: 'Parent Satisfaction', icon: Heart },
    { number: '10,000+', label: 'Happy Students', icon: Users },
    { number: '4.9/5', label: 'Average Rating', icon: Star },
    { number: '50+', label: 'Awards Won', icon: Award },
  ];

  const partners = [
    { name: 'IIITD R&D' , logo: '🚀' },

  ];

  return (
    <section className="section-padding bg-gradient-to-b from-purple-900/20 to-deep-space">
      <div className="container">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 gradient-purple rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-neon-pink mb-2">{stat.number}</div>
                <div className="text-stardust-white/70">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold font-outfit text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-electric-purple to-neon-pink">
            What Families Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="glass-effect rounded-3xl p-8 hover-lift"
                role="article"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-neon-pink text-neon-pink" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-stardust-white/80 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-stardust-white">{testimonial.name}</div>
                    <div className="text-sm text-stardust-white/60">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div className="text-center">
          <h3 className="text-2xl font-bold font-outfit mb-8 text-stardust-white">
            Trusted by Leading Organizations
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="glass-effect rounded-2xl p-6 text-center hover-lift"
              >
                <div className="text-4xl mb-3">{partner.logo}</div>
                <div className="text-sm text-stardust-white/70">{partner.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-8 mt-12">
          <div className="flex items-center gap-3 glass-effect rounded-full px-6 py-3">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-stardust-white/80">Child Safe Certified</span>
          </div>
          <div className="flex items-center gap-3 glass-effect rounded-full px-6 py-3">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <span className="text-stardust-white/80">Educational Excellence</span>
          </div>
          <div className="flex items-center gap-3 glass-effect rounded-full px-6 py-3">
            <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
            <span className="text-stardust-white/80">100% Money Back</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;