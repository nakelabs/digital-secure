
import React from 'react';
import { Star, Quote, Shield, TrendingUp, Heart, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Michael Chen",
      role: "Crypto Investor",
      company: "Private Individual",
      rating: 5,
      text: "After losing $50,000 to a sophisticated phishing attack, I thought my crypto was gone forever. The team not only recovered 90% of my funds but also helped secure my remaining assets. Their expertise in blockchain forensics is unmatched.",
      service: "Cyber Recovery",
      result: "$45,000 recovered",
      timeframe: "3 weeks"
    },
    {
      name: "Sarah Martinez",
      role: "CEO",
      company: "TechStart Solutions",
      rating: 5,
      text: "We needed professional cryptocurrency merchant services for our business. They set up everything from multi-sig wallets to payment gateways. Our crypto transactions increased by 300% with their secure infrastructure.",
      service: "Merchant Services",
      result: "300% transaction increase",
      timeframe: "2 months"
    },
    {
      name: "David Kim",
      role: "Investment Manager",
      company: "Private Wealth Group",
      rating: 5,
      text: "Their investment advisory service helped us navigate the complex crypto market during the 2023 volatility. Our portfolio outperformed the market by 25% while maintaining lower risk exposure.",
      service: "Investment Advisory",
      result: "25% outperformance",
      timeframe: "6 months"
    },
    {
      name: "Anonymous Client",
      role: "Business Owner",
      company: "Confidential",
      rating: 5,
      text: "I suspected my business partner was being unfaithful to our agreement and possibly hiding assets. Their discrete investigation provided clear evidence and helped me make informed legal decisions. Professional and confidential throughout.",
      service: "Relationship Verification",
      result: "Clear evidence provided",
      timeframe: "4 weeks"
    },
    {
      name: "Jennifer Wu",
      role: "Small Business Owner",
      company: "E-commerce Store",
      rating: 5,
      text: "When our business accounts were hacked and $25,000 in Bitcoin was stolen, I was devastated. They traced the funds through multiple exchanges and recovered 85% of our losses. Incredible work!",
      service: "Asset Recovery",
      result: "$21,250 recovered",
      timeframe: "5 weeks"
    },
    {
      name: "Robert Thompson",
      role: "Private Investor",
      company: "Individual",
      rating: 5,
      text: "Their cryptocurrency investment strategy helped me diversify my portfolio and navigate regulatory compliance. My returns improved by 40% while reducing overall risk. Highly recommend their expertise.",
      service: "Investment Advisory",
      result: "40% return improvement",
      timeframe: "8 months"
    }
  ];

  const caseStudies = [
    {
      title: "Major Exchange Hack Recovery",
      challenge: "Client lost $100,000 when a cryptocurrency exchange was compromised",
      solution: "Blockchain forensics, legal coordination, and asset tracing across 5 exchanges",
      result: "$87,000 recovered (87% recovery rate)",
      icon: Shield
    },
    {
      title: "Corporate Investment Strategy",
      challenge: "Tech company needed crypto investment framework for $2M treasury",
      solution: "Risk assessment, regulatory compliance, and custom investment strategy",
      result: "15% annual returns with managed risk exposure",
      icon: TrendingUp
    },
    {
      title: "Business Partnership Investigation",
      challenge: "Suspected financial irregularities in a $5M partnership",
      solution: "Discrete digital investigation and financial analysis",
      result: "Evidence led to successful legal resolution",
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
              Client Success Stories
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Real results from real clients who trusted us with their most critical digital challenges
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-slate-500">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-2" />
                <span>4.9/5 Average Rating</span>
              </div>
              <div>500+ Successful Cases</div>
              <div>$50M+ Assets Recovered</div>
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
            Detailed Case Studies
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
            Trusted by Clients Worldwide
          </h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <p className="text-slate-600">Cases Resolved</p>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">$50M+</div>
              <p className="text-slate-600">Assets Recovered</p>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">97.9%</div>
              <p className="text-slate-600">Average Recovery Rate</p>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <p className="text-slate-600">Global Support</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Testimonials;
