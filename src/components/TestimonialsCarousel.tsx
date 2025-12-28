
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const TestimonialsCarousel = () => {
  const testimonials = [
    {
      name: "Michael Chen",
      role: "Senior Executive",
      text: "RAXOPAYCO's disciplined approach to digital real estate investment has transformed my wealth building strategy. The structured pathways and zero-interest financing made homeownership possible sooner than expected.",
      rating: 5,
      result: "Homeowner in 2 years"
    },
    {
      name: "Sarah Martinez",
      role: "Business Owner",
      text: "The private member platform provided exclusive access to investment opportunities I never knew existed. Their digital real estate portfolio generates consistent passive income.",
      rating: 5,
      result: "Consistent passive income"
    },
    {
      name: "David Kim",
      role: "International Professional",
      text: "As a diaspora investor, RAXOPAYCO's structured approach helped me build real asset ownership while living abroad. The transparency and progress tracking are exceptional.",
      rating: 5,
      result: "Real asset ownership"
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            What Our Members Say
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Real results from qualified members who've achieved ownership through our structured investment platform
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="shadow-lg hover:shadow-xl transition-shadow h-full">
                <CardContent className="p-6">
                  <motion.div 
                    className="flex items-center mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    viewport={{ once: true }}
                  >
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.3 + (i * 0.1) }}
                        viewport={{ once: true }}
                      >
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, rotate: -10 }}
                    whileInView={{ opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    <Quote className="w-8 h-8 text-blue-600 mb-4" />
                  </motion.div>
                  
                  <motion.p 
                    className="text-slate-600 mb-6 italic"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                    viewport={{ once: true }}
                  >
                    "{testimonial.text}"
                  </motion.p>
                  
                  <motion.div 
                    className="border-t pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
                        <p className="text-sm text-slate-500">{testimonial.role}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">{testimonial.result}</p>
                      </div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
