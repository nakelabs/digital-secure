
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="mb-6">
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Shield className="w-4 h-4 mr-2" />
                Trusted by 500+ Clients Worldwide
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Secure Your Digital Future with 
                <span className="text-blue-600"> Expert Solutions</span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Professional cryptocurrency services, cyber recovery, and digital security solutions. 
                Protect, recover, and optimize your digital assets with our trusted expertise.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-8 mb-8">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-slate-700 font-medium">4.9/5 Rating</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-slate-700 font-medium">500+ Cases</span>
              </div>
              <div className="text-slate-700 font-medium">$50M+ Recovered</div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                  Get Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-2 hover:bg-slate-50">
                  View Our Services
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-white">
                    <div className="text-2xl font-bold">85%</div>
                    <div className="text-sm opacity-80">Recovery Rate</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-white">
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-sm opacity-80">Support</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-white">
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-sm opacity-80">Clients</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-white">
                    <div className="text-2xl font-bold">$50M+</div>
                    <div className="text-sm opacity-80">Recovered</div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg">
                <Shield className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-yellow-500 text-white p-3 rounded-full shadow-lg">
                <Star className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
