
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Real results from real clients who trusted us with their most critical digital challenges
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <Quote className="w-8 h-8 text-blue-600 mb-4" />
                
                <p className="text-slate-600 mb-6 italic">
                  "{testimonial.text}"
                </p>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
                      <p className="text-sm text-slate-500">{testimonial.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">{testimonial.result}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
