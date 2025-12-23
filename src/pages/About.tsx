
import React from 'react';
import { Shield, Users, Award, Globe, CheckCircle, Star, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const About = () => {
  const teamMembers = [
    {
      name: "Alex Rodriguez",
      role: "Founder & CEO",
      specialization: "Trading Platform Development & Market Liquidity",
      experience: "15+ years in fintech and trading systems",
      image: "/api/placeholder/300/300"
    },
    {
      name: "George Hilton Humphrey",
      role: "Head of Technology",
      specialization: "Trading Infrastructure & System Architecture",
      experience: "12+ years in high-frequency trading systems",
      image: "/api/placeholder/300/300"
    },
    {
      name: "Patrick Mark",
      role: "Chief Trading Officer",
      specialization: "Market Making & Liquidity Provision",
      experience: "20+ years in financial markets and forex trading",
      image: "/api/placeholder/300/300"
    }
  ];

  const milestones = [
    { year: "2018", event: "Platform Launched", description: "Started with focus on cryptocurrency and forex trading tools" },
    { year: "2020", event: "500K+ Traders", description: "Reached major milestone with half a million active traders" },
    { year: "2022", event: "Advanced Features", description: "Launched leverage tools and institutional-grade liquidity access" },
    { year: "2024", event: "$2B+ Monthly Volume", description: "Achieved exceptional growth in trading volume and platform adoption" }
  ];

  const values = [
    {
      icon: Shield,
      title: "Secure Trading",
      description: "Your funds and trading data are protected with bank-grade security and encryption"
    },
    {
      icon: Users,
      title: "Trader-Focused",
      description: "Platform designed by traders, for traders - intuitive tools that enhance your trading experience"
    },
    {
      icon: CheckCircle,
      title: "Reliable Platform",
      description: "99.9% uptime with lightning-fast execution and real-time market data"
    },
    {
      icon: Globe,
      title: "Global Markets",
      description: "Access to cryptocurrency and forex markets worldwide with competitive spreads"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-blue-600/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <TrendingUp className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Leading Crypto Trading Platform</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              About raxopaco
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Empowering traders with advanced cryptocurrency and forex trading tools since 2018
            </p>
          </div>
        </div>
      </section>

      {/* Important Disclaimer Section */}
      <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50 border-t-4 border-red-500">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center bg-red-100 text-red-800 px-4 py-2 rounded-full mb-4">
                <AlertTriangle className="w-5 h-5 mr-2" />
                <span className="font-semibold">Important Trading Disclaimer</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-red-200">
                <h3 className="text-xl font-bold text-red-600 mb-4">⚠️ What raxopaco Does NOT Do</h3>
                <div className="space-y-3 text-slate-700">
                  <p className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">•</span>
                    <span><strong>raxopaco does NOT invest for you</strong></span>
                  </p>
                  <p className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">•</span>
                    <span><strong>Your profit or loss depends entirely on your trades</strong></span>
                  </p>
                </div>
                
                <h4 className="text-lg font-semibold text-slate-800 mt-6 mb-3">What We Provide:</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-slate-600">Trading platform</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-slate-600">Liquidity access</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-slate-600">Leverage tools</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-200">
                <h3 className="text-xl font-bold text-blue-600 mb-4">Who Uses raxopaco?</h3>
                <div className="space-y-3">
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
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Trading Platform Story</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="prose prose-lg max-w-none text-slate-600">
                  <p className="text-lg leading-relaxed">
                    Founded in 2018, raxopaco emerged as cryptocurrency and forex markets were experiencing unprecedented growth. 
                    We recognized that individual traders needed access to professional-grade tools and liquidity that were 
                    previously only available to institutional investors.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Our platform combines cutting-edge technology with user-friendly interfaces, giving retail traders 
                    the same advantages as professional trading firms. We provide the tools - you make the decisions.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Platform Statistics</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">500K+</div>
                    <div className="text-slate-600">Active Traders</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">$2B+</div>
                    <div className="text-slate-600">Monthly Volume</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">150+</div>
                    <div className="text-slate-600">Trading Pairs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">24/7</div>
                    <div className="text-slate-600">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">Our Platform Journey</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-24 text-right mr-8">
                    <span className="text-2xl font-bold text-blue-600">{milestone.year}</span>
                  </div>
                  <div className="flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full mt-2 mr-8"></div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{milestone.event}</h3>
                    <p className="text-slate-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">Our Leadership Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-32 h-32 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-16 h-16 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                  <p className="text-slate-600 mb-3">{member.specialization}</p>
                  <p className="text-sm text-slate-500">{member.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="p-3 bg-blue-100 rounded-xl inline-flex mb-4">
                    <value.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{value.title}</h3>
                  <p className="text-slate-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Trust & Compliance
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">SEC Registered</h3>
              <p className="text-slate-600">Fully compliant investment advisory services</p>
            </div>
            <div className="p-6">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Crypto Secure</h3>
              <p className="text-slate-600">Multi-signature wallets and cold storage protocols</p>
            </div>
            <div className="p-6">
              <Star className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Industry Leader</h3>
              <p className="text-slate-600">Top-rated cryptocurrency investment platform</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
