
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, TrendingUp, Search, Heart, Star, Users, Clock, Award, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ServicesOverview from '@/components/ServicesOverview';
import StatsSection from '@/components/StatsSection';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import WhyChooseUs from '@/components/WhyChooseUs';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <StatsSection />
      <ServicesOverview />
      <TestimonialsCarousel />
      <WhyChooseUs />
      
      {/* CTA Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Ready to Build Real Wealth Through Digital Assets?
              </h2>
              <p className="text-xl text-slate-600 mb-8">
                Start your ownership journey with digital real estate and structured investment pathways. Our expert team specializes in wealth building through disciplined asset accumulation and zero-interest financing options.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/dashboard">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                    Apply for Access
                  </Button>
                </Link>
                <Link to="/investment-options">
                  <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                    View Ownership Pathways
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:order-last">
              <div className="relative">
                <img 
                  src="/images/image.png" 
                  alt="Digital Investment Platform" 
                  className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-700/20 rounded-2xl"></div>
                <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Private Access
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
