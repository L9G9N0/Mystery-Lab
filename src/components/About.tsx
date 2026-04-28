import React from 'react';
import { Lightbulb, Target, Users, Award } from 'lucide-react';

const About: React.FC = () => {
  const team = [
    {
      name: 'Hariom Tiwari',
      role: 'Founder & IIITD Student ',
      image: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'PhD in Chemistry Education, 15 years experience in STEM education',
    },
    {
      name: 'Gautum',
      role: 'Founder & IIITD Student',
      image: 'https://images.pexels.com/photos/6325959/pexels-photo-6325959.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Former elementary science teacher, curriculum development specialist',
    },
    {
      name: 'Hariom Kumar Bharti',
      role: 'Online Platform Lead & IIITD Student',
      image: 'https://images.pexels.com/photos/4114979/pexels-photo-4114979.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'PhD in Educational Psychology, expert in child learning development',
    },
  ];

  const values = [
    {
      icon: Lightbulb,
      title: 'Curiosity First',
      description: 'We believe every child is naturally curious about the world around them.',
    },
    {
      icon: Target,
      title: 'Hands-On Learning',
      description: 'Real understanding comes through direct experience and experimentation.',
    },
    {
      icon: Users,
      title: 'Inclusive Education',
      description: 'Science is for everyone, regardless of background or learning style.',
    },
    {
      icon: Award,
      title: 'Excellence Standards',
      description: 'We maintain the highest standards in safety, education, and fun.',
    },
  ];

  return (
    <section id="about" className="section-padding bg-gradient-to-b from-purple-900/20 to-deep-space">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-6 text-transparent bg-clip-text bg-gradient-to-r from-electric-purple to-cosmic-blue">
            About Mystery Lab
          </h2>
          <p className="text-xl text-stardust-white/80 max-w-3xl mx-auto">
            Pioneering the future of science education through wonder, discovery, and hands-on learning
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold font-outfit text-stardust-white">
              Our Origin Story
            </h3>
            <p className="text-stardust-white/80 leading-relaxed">
              Mystery Lab was born from a simple observation: children naturally ask "why?" and "how?" 
              about everything around them. Founded in 2018 by Dr. Sarah Peterson, a former university 
              chemistry professor, our mission began when she noticed her own daughter's excitement 
              about science experiments at home.
            </p>
            <p className="text-stardust-white/80 leading-relaxed">
              What started as backyard experiments with neighborhood kids has grown into a 
              comprehensive science education program serving thousands of families and schools 
              across the nation. We've maintained our core belief: science should be magical, 
              accessible, and incredibly fun.
            </p>
            <div className="glass-effect rounded-2xl p-6">
              <h4 className="text-xl font-bold text-neon-pink mb-3">Our Mission</h4>
              <p className="text-stardust-white/80">
                To ignite lifelong curiosity and scientific thinking in children through immersive, 
                hands-on experiences that make learning feel like magic.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/8471793/pexels-photo-8471793.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Children conducting science experiments in a laboratory setting"
              className="rounded-3xl shadow-2xl w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-electric-purple/20 to-transparent rounded-3xl"></div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold font-outfit text-center mb-12 text-stardust-white">
            Our Core Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 gradient-purple rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold font-outfit mb-3 text-stardust-white">
                    {value.title}
                  </h4>
                  <p className="text-stardust-white/70">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold font-outfit text-center mb-12 text-stardust-white">
            Meet Our Team
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="glass-effect rounded-3xl p-8 text-center hover-lift">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                />
                <h4 className="text-xl font-bold font-outfit mb-2 text-stardust-white">
                  {member.name}
                </h4>
                <p className="text-neon-pink font-semibold mb-4">{member.role}</p>
                <p className="text-stardust-white/70 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Awards & Certifications */}
        <div className="glass-effect rounded-3xl p-8 text-center">
          <h3 className="text-3xl font-bold font-outfit mb-6 text-stardust-white">
            Awards & Certifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl mb-3">🏆</div>
              <h4 className="font-bold text-stardust-white mb-2">Excellence in STEM Education</h4>
              <p className="text-stardust-white/70 text-sm">National Science Teachers Association</p>
            </div>
            <div>
              <div className="text-4xl mb-3">⭐</div>
              <h4 className="font-bold text-stardust-white mb-2">Innovation in Learning</h4>
              <p className="text-stardust-white/70 text-sm">Education Technology Awards</p>
            </div>
            <div>
              <div className="text-4xl mb-3">🛡️</div>
              <h4 className="font-bold text-stardust-white mb-2">Child Safety Certified</h4>
              <p className="text-stardust-white/70 text-sm">National Child Safety Council</p>
            </div>
          </div>
          
          <div className="mt-8">
            <button className="btn-primary">
              Join Our Mission
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;