
import React from 'react';
import { TrendingUp, Shield, PieChart, Building, ArrowRight, CheckCircle, Clock, DollarSign, Bitcoin, Banknote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      icon: Bitcoin,
      title: "Cryptocurrency Portfolio Management",
      description: "Professional Bitcoin, Ethereum, and altcoin investment management with AI-powered strategies.",
      features: [
        "Automated portfolio rebalancing and optimization",
        "Real-time market analysis and trend forecasting", 
        "Risk management and stop-loss strategies",
        "DeFi yield farming and staking optimization",
        "Tax-efficient crypto investment planning"
      ],
      process: [
        "Portfolio assessment and risk profiling",
        "Custom strategy development and backtesting",
        "Implementation with automated trading",
        "Continuous monitoring and optimization"
      ],
      pricing: "Starting from $2,500/month"
    },
    {
      icon: Building,
      title: "Digital Real Estate Investment",
      description: "Tokenized real estate investments and blockchain-based property opportunities.",
      features: [
        "Tokenized property investment opportunities",
        "Virtual real estate in metaverse platforms",
        "Real estate NFT and fractional ownership", 
        "Property investment via blockchain protocols",
        "Commercial and residential tokenized assets"
      ],
      process: [
        "Investment opportunity analysis",
        "Due diligence and blockchain verification",
        "Token acquisition and wallet setup",
        "Portfolio tracking and yield monitoring"
      ],
      pricing: "Minimum investment: $10,000"
    },
    {
      icon: PieChart,
      title: "Institutional Crypto Fund Management",
      description: "Comprehensive cryptocurrency fund management for institutions and high-net-worth individuals.",
      features: [
        "Multi-million dollar crypto fund management",
        "Institutional-grade security and custody",
        "Quantitative trading and arbitrage strategies",
        "Regulatory compliance and reporting",
        "24/7 monitoring and risk management"
      ],
      process: [
        "Fund structure and compliance setup",
        "Strategy development and backtesting",
        "Implementation with institutional partners",
        "Regular reporting and performance reviews"
      ],
      pricing: "Custom pricing for $1M+ investments"
    },
    {
      icon: DollarSign,
      title: "Crypto Trading & Investment Education",
      description: "Comprehensive training programs for cryptocurrency trading and investment strategies.",
      features: [
        "Live trading sessions with expert traders",
        "Technical analysis and chart pattern recognition",
        "Fundamental analysis of crypto projects",
        "Risk management and portfolio theory",
        "One-on-one mentorship programs"
      ],
      process: [
        "Skill assessment and learning plan creation",
        "Interactive workshops and live sessions",
        "Practice trading with virtual portfolios",
        "Ongoing mentorship and performance tracking"
      ],
      pricing: "Courses from $1,500 - Mentorship from $5,000"
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
              Investment Services & Portfolio Management
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Professional cryptocurrency and digital real estate investment solutions for maximizing returns
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="space-y-20">
            {services.map((service, index) => (
              <div key={index} className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="lg:w-1/2">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-blue-100 rounded-xl mr-4">
                      <service.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">{service.title}</h2>
                  </div>
                  <p className="text-lg text-slate-600 mb-6">{service.description}</p>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-3">Key Features:</h3>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-slate-50 p-6 rounded-xl">
                      <p className="text-lg font-semibold text-slate-900 mb-2">{service.pricing}</p>
                      <Link to="/auth">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          Start Investing <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-1/2">
                  <Card className="p-6 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-blue-600" />
                        Our Process
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {service.process.map((step, idx) => (
                          <div key={idx} className="flex items-start">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 mt-1 text-sm font-semibold">
                              {idx + 1}
                            </div>
                            <p className="text-slate-600 pt-1">{step}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Package Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Ready to Start Investing?
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Get access to our comprehensive cryptocurrency and real estate investment platform
          </p>
          <Link to="/auth">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4">
              Open Investment Account
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Services;
