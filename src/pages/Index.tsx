
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
      
      {/* Important Information Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50 border-l-4 border-red-500">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                ⚠️ Important to Understand
              </h2>
              <div className="bg-white p-8 rounded-xl shadow-lg text-left">
                <h3 className="text-xl font-semibold text-red-600 mb-4">raxopaco Trading Platform Disclaimer</h3>
                <div className="space-y-3 text-slate-700">
                  <p className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span><strong>raxopaco itself does NOT invest for you</strong></span>
                  </p>
                  <p className="ml-4 text-slate-600">They provide:</p>
                  <div className="ml-8 space-y-2">
                    <p className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Trading platform</span>
                    </p>
                    <p className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Liquidity access</span>
                    </p>
                    <p className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Leverage tools</span>
                    </p>
                  </div>
                  <p className="flex items-start font-semibold text-red-600">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Your profit or loss depends entirely on your trades</span>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Who Uses raxopaco?</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-slate-700">Beginner traders</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-slate-700">Retail forex traders</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-slate-700">Short-term & swing traders</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-slate-700">People seeking high-risk, high-reward trading</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Risk Warning</h3>
                <div className="space-y-4">
                  <p className="text-blue-100">
                    Trading involves substantial risk of loss and may not be suitable for all investors.
                  </p>
                  <p className="text-blue-100">
                    Past performance is not indicative of future results.
                  </p>
                  <p className="text-blue-100">
                    Only trade with funds you can afford to lose.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Ready to Build Wealth with Cryptocurrency?
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Start your investment journey with Bitcoin, Ethereum, and digital real estate. Our expert team specializes in cryptocurrency portfolio management and tokenized assets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                Start Investing Now
              </Button>
            </Link>
            <Link to="/investment-options">
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                View Investment Options
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
