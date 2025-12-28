
import React from 'react';
import { Star, Quote, Shield, TrendingUp, Heart, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Michael Chen",
      role: "Senior Executive",
      company: "Technology Sector",
      rating: 5,
      text: "RAXOPAYCO's structured approach to digital real estate investment transformed my wealth building strategy. The disciplined pathway and zero-interest financing made homeownership possible sooner than I ever expected.",
      service: "Ownership Pathways",
      result: "Homeowner in 18 months",
      timeframe: "2 years"
    },
    {
      name: "Sarah Martinez",
      role: "Entrepreneur",
      company: "Business Owner",
      rating: 5,
      text: "The private member platform provided access to digital real estate opportunities I never knew existed. My portfolio of online assets generates consistent passive income that supports my ownership goals.",
      service: "Digital Real Estate",
      result: "Consistent passive income",
      timeframe: "8 months"
    },
    {
      name: "David Kim",
      role: "International Professional",
      company: "Diaspora Investor",
      rating: 5,
      text: "As someone living abroad, RAXOPAYCO's structured investment platform helped me build real asset ownership back home. The transparency and progress tracking are exceptional.",
      service: "Private Member Advisory",
      result: "Real asset ownership",
      timeframe: "3 years"
    },
    {
      name: "Jennifer Wu",
      role: "High-Earning Specialist",
      company: "Medical Professional",
      rating: 5,
      text: "The disciplined approach to wealth building through digital assets was exactly what I needed. The team guided me through property targeting and milestone planning perfectly.",
      service: "Investment Framework",
      result: "Property acquisition ready",
      timeframe: "14 months"
    },
    {
      name: "Robert Thompson",
      role: "Business Owner",
      company: "Private Individual",
      rating: 5,
      text: "RAXOPAYCO's zero-interest financing program was a game changer. The structured repayment terms and ownership acceleration support exceeded all my expectations.",
      service: "Zero-Interest Financing",
      result: "Accelerated ownership",
      timeframe: "6 months"
    },
    {
      name: "Anonymous Member",
      role: "Private Investor",
      company: "Confidential",
      rating: 5,
      text: "The private access and exclusive opportunities available to qualified members are remarkable. My digital real estate portfolio now generates enough passive income to support my lifestyle.",
      service: "Private Member Services",
      result: "Financial independence",
      timeframe: "2.5 years"
    }
  ];

  const caseStudies = [
    {
      title: "Accelerated Homeownership",
      challenge: "Executive needed structured pathway to property ownership while maintaining investment growth",
      solution: "Digital real estate portfolio development, milestone tracking, and zero-interest financing access",
      result: "Property ownership achieved 2 years ahead of traditional timeline",
      icon: Shield
    },
    {
      title: "Digital Real Estate Portfolio",
      challenge: "Entrepreneur seeking passive income streams to support ownership goals",
      solution: "Monetized website acquisition, digital brand development, and income optimization",
      result: "Monthly passive income exceeding traditional property rental yields",
      icon: TrendingUp
    },
    {
      title: "International Investment Strategy",
      challenge: "Diaspora investor needed structured approach to build wealth from abroad",
      solution: "Private member advisory, compliance review, and ownership progress tracking",
      result: "Successful real asset accumulation with transparent milestone progress",
      icon: Search
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Member Success Stories
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Real results from qualified members who achieved ownership through our private investment platform
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-slate-500">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-2" />
                <span>Private Access Only</span>
              </div>
              <div>Invitation-Based Platform</div>
              <div>Real Asset Focus</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <Quote className="w-8 h-8 text-blue-600 mb-4" />
                  
                  <p className="text-slate-600 mb-6 italic">"{testimonial.text}"</p>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
                        <p className="text-sm text-slate-500">{testimonial.role}</p>
                        <p className="text-sm text-slate-500">{testimonial.company}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Service:</span>
                        <span className="text-slate-900 font-medium">{testimonial.service}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Result:</span>
                        <span className="text-green-600 font-medium">{testimonial.result}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Timeline:</span>
                        <span className="text-slate-900 font-medium">{testimonial.timeframe}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
            Member Success Case Studies
          </h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {caseStudies.map((study, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="p-3 bg-blue-100 rounded-xl inline-flex mb-6">
                    <study.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{study.title}</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Challenge:</h4>
                      <p className="text-slate-600 text-sm">{study.challenge}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Solution:</h4>
                      <p className="text-slate-600 text-sm">{study.solution}</p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Result:</h4>
                      <p className="text-green-700 text-sm font-medium">{study.result}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">
            Trusted by Qualified Members
          </h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">Private</div>
              <p className="text-slate-600">Access Only</p>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">Digital</div>
              <p className="text-slate-600">Real Estate Focus</p>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">Zero</div>
              <p className="text-slate-600">Interest Financing*</p>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">Real</div>
              <p className="text-slate-600">Asset Ownership</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Testimonials;
