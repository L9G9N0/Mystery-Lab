import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Lab',
      details:['Okhla Industrial Estate, Phase III',"near Govind Puri Metro Station, Shyam Nagar, Okhla Industrial Estate",'New Delhi, Delhi 110020'],
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['Hariom Tiwari: 7701852724 ', 'Gautum : 8588923072'],
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['hariom22194@iiitd.ac.in','gautam22187@iiitd.ac.in','hackerdc8287@gmail.com '],
    },
    {
      icon: Clock,
      title: 'Operating Hours',
      details: ['Monday - Friday: 9AM - 6PM', 'Saturday: 10AM - 4PM', 'Sunday: Closed'],
    },
  ];

  return (
    <section id="contact" className="section-padding bg-gradient-to-b from-deep-space to-purple-900/20">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-6 text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-electric-purple">
            Connect With Us
          </h2>
          <p className="text-xl text-stardust-white/80 max-w-3xl mx-auto">
            Ready to start your science adventure? Get in touch with our team of science education specialists
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glass-effect rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle className="w-8 h-8 text-electric-purple" />
              <h3 className="text-2xl font-bold font-outfit text-stardust-white">
                Send us a Message
              </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-stardust-white font-semibold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-stardust-white placeholder-white/50 focus:border-electric-purple focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-stardust-white font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-stardust-white placeholder-white/50 focus:border-electric-purple focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-stardust-white font-semibold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-stardust-white placeholder-white/50 focus:border-electric-purple focus:outline-none transition-colors"
                    placeholder="(555) 123-4567"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-stardust-white font-semibold mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-stardust-white focus:border-electric-purple focus:outline-none transition-colors"
                  >
                    <option value="">Select a topic</option>
                    <option value="birthday-party">Birthday Party</option>
                    <option value="school-program">School Program</option>
                    <option value="workshop">Weekend Workshop</option>
                    <option value="kit-purchase">Science Kit Purchase</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-stardust-white font-semibold mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-stardust-white placeholder-white/50 focus:border-electric-purple focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your science adventure needs..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-primary w-full justify-center group"
              >
                Send Message
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div key={index} className="glass-effect rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 gradient-purple rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-stardust-white">{info.title}</h4>
                    </div>
                    <div className="space-y-1">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-stardust-white/70 text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Map Placeholder */}
            <div className="glass-effect rounded-2xl p-8 text-center">
              <div className="w-full h-64 bg-gradient-to-br from-electric-purple/20 to-cosmic-blue/20 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-12 h-12 text-electric-purple" />
              </div>
              <h4 className="text-xl font-bold text-stardust-white mb-2">Visit Our Innovation Lab</h4>
              <p className="text-stardust-white/70 mb-4">
                Come see where the magic happens! Tours available by appointment.
              </p>
              <button className="btn-secondary">
                Schedule a Tour
              </button>
            </div>

            {/* Newsletter Signup */}
            <div className="glass-effect rounded-2xl p-8">
              <h4 className="text-xl font-bold text-stardust-white mb-4">
                Stay Updated with Science News!
              </h4>
              <p className="text-stardust-white/70 mb-6">
                Get weekly experiment ideas, science news, and exclusive offers delivered to your inbox.
              </p>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-stardust-white placeholder-white/50 focus:border-electric-purple focus:outline-none transition-colors"
                />
                <button className="btn-primary px-6">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex justify-center gap-6">
              {['Facebook', 'Instagram', 'YouTube'].map((platform) => (
                <button
                  key={platform}
                  className="w-12 h-12 glass-effect rounded-full flex items-center justify-center hover-lift"
                  aria-label={`Follow us on ${platform}`}
                >
                  <span className="text-xl">
                    {platform === 'Facebook' && '📘'}
                    {platform === 'Instagram' && '📸'}
                    {platform === 'YouTube' && '📺'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-12 text-center glass-effect rounded-2xl p-6">
          <p className="text-stardust-white/80">
            <span className="text-neon-pink font-semibold">Emergency Contact:</span> For urgent matters during events, call (555) 911-HELP
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;