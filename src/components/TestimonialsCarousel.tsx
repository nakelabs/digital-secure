
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const TestimonialsCarousel = () => {
  const testimonials = [
    {
      name: "Michael Chen",
      role: "Crypto Investor",
      text: "After losing $50,000 to a phishing attack, I thought my crypto was gone forever. The team recovered 90% of my funds and secured my remaining assets. Incredible expertise!",
      rating: 5,
      result: "$45,000 recovered"
    },
    {
      name: "Sarah Martinez",
      role: "Business Owner",
      text: "Their merchant services transformed our crypto operations. We saw a 300% increase in transactions with their secure infrastructure and support.",
      rating: 5,
      result: "300% growth"
    },
    {
      name: "David Kim",
      role: "Investment Manager",
      text: "Professional investment advisory helped our portfolio outperform the market by 25% while maintaining lower risk exposure during volatility.",
      rating: 5,
      result: "25% outperformance"
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
            What Our Clients Say
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Real results from real clients who trusted us with their most critical digital challenges
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
