import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What age groups are your programs designed for?',
      answer: 'Our programs are specifically designed for children aged 5-12 years. We have different experience levels: Basic Explorer (5-7 years), Junior Scientist (8-10 years), and Lab Master (10-12 years). Each program is carefully crafted to match the developmental stage and learning capabilities of each age group.',
    },
    {
      question: 'What safety measures do you have in place?',
      answer: 'Safety is our top priority. All experiments use child-safe materials and are supervised by certified science educators. We provide safety equipment including goggles and gloves, and all activities are designed with multiple safety protocols. Our instructors are trained in first aid and emergency procedures.',
    },
    {
      question: 'How do I book an experience or workshop?',
      answer: 'Booking is easy! You can select any of our packages above, choose your preferred date and time, and complete the booking online. For birthday parties and school events, we recommend booking at least 2 weeks in advance. Our team will contact you within 24 hours to confirm details.',
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'We offer flexible cancellation options. For individual workshops, you can cancel up to 48 hours before the event for a full refund. For birthday parties and school events, cancellations must be made 7 days in advance. Weather-related cancellations for outdoor events receive full refunds.',
    },
    {
      question: 'Do you provide all the equipment and materials?',
      answer: 'Yes! We provide all necessary equipment, materials, safety gear, and take-home experiment kits. Parents and schools don\'t need to purchase anything additional. Each child receives their own set of materials to ensure hygiene and maximize hands-on participation.',
    },
    {
      question: 'Can parents participate in the experiments?',
      answer: 'Absolutely! We encourage family participation. Parents can observe and even join in selected experiments. For birthday parties, we often include special experiments that parents and children can do together. Our family workshop packages are specifically designed for parent-child bonding through science.',
    },
    {
      question: 'Do you offer virtual science experiences?',
      answer: 'Yes! We offer virtual science sessions where we ship experiment kits to your home and conduct live online workshops. These sessions include interactive demonstrations, Q&A sessions, and guided experiments that families can do together from the comfort of their homes.',
    },
  ];

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <section className="section-padding bg-gradient-to-b from-deep-space to-purple-900/20">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="w-16 h-16 gradient-purple rounded-2xl flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-6 text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-cosmic-blue">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-stardust-white/80">
              Everything you need to know about our science programs
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="glass-effect rounded-2xl overflow-hidden"
                role="region"
                aria-labelledby={`faq-question-${index}`}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-200"
                  aria-expanded={openItem === index}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <span className="text-lg font-semibold text-stardust-white font-outfit pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-6 h-6 text-electric-purple transition-transform duration-200 flex-shrink-0 ${
                      openItem === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {openItem === index && (
                  <div
                    id={`faq-answer-${index}`}
                    className="px-6 pb-6"
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                  >
                    <div className="border-t border-stardust-white/10 pt-4">
                      <p className="text-stardust-white/80 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-12 p-8 glass-effect rounded-2xl">
            <h3 className="text-2xl font-bold font-outfit mb-4 text-stardust-white">
              Still have questions?
            </h3>
            <p className="text-stardust-white/70 mb-6">
              Our science education specialists are here to help you choose the perfect program
            </p>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;