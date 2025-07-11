
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
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Ready to Secure Your Digital Future?
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Get expert consultation on your digital security and cryptocurrency needs. Our team is ready to help 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                Get Free Consultation
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
