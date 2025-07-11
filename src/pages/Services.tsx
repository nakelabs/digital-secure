
import React from 'react';
import { TrendingUp, Shield, Search, Heart, ArrowRight, CheckCircle, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      icon: TrendingUp,
      title: "Digital Asset & Cryptocurrency Investment Advisory",
      description: "Expert guidance for optimizing your cryptocurrency portfolio and investment strategy.",
      features: [
        "Portfolio optimization and risk assessment",
        "Market analysis and trend forecasting", 
        "Regulatory compliance guidance",
        "DeFi and traditional crypto investment strategies",
        "Custom investment plans for individuals and institutions"
      ],
      process: [
        "Initial consultation and risk assessment",
        "Portfolio analysis and strategy development",
        "Implementation and monitoring",
        "Regular reviews and adjustments"
      ],
      pricing: "Starting from $500/consultation"
    },
    {
      icon: Shield,
      title: "Crypto Merchant Services",
      description: "Comprehensive cryptocurrency merchant solutions for businesses and individuals.",
      features: [
        "Bulk cryptocurrency buying/selling with competitive rates",
        "Secure wallet setup and management",
        "Multi-signature wallet implementation", 
        "Payment gateway integration for businesses",
        "Cryptocurrency exchange consulting"
      ],
      process: [
        "Business needs assessment",
        "Custom solution design",
        "Integration and setup",
        "Training and ongoing support"
      ],
      pricing: "Custom pricing based on volume"
    },
    {
      icon: Search,
      title: "Cyber Recovery & Security Services",
      description: "Professional recovery services for hacked accounts and scammed funds.",
      features: [
        "Hacked account recovery and security hardening",
        "Scammed fund recovery and blockchain forensics",
        "Digital asset tracing and investigation",
        "Cybersecurity audits and penetration testing",
        "Identity theft protection and recovery"
      ],
      process: [
        "Incident assessment and documentation",
        "Investigation and tracing",
        "Recovery strategy implementation",
        "Security hardening and prevention"
      ],
      pricing: "Emergency consultations from $1,000"
    },
    {
      icon: Heart,
      title: "Relationship Loyalty Verification",
      description: "Discreet and professional relationship verification services.",
      features: [
        "Discreet partner fidelity investigations",
        "Digital footprint analysis and social media monitoring",
        "Evidence collection and documentation",
        "Confidential reporting and consultation",
        "Legal support coordination"
      ],
      process: [
        "Confidential consultation",
        "Investigation planning",
        "Discrete evidence gathering",
        "Comprehensive reporting"
      ],
      pricing: "Consultations from $750"
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
              Professional Digital Solutions
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Comprehensive services to protect, recover, and optimize your digital assets and relationships
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
                      <Link to="/contact">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          Get Consultation <ArrowRight className="w-4 h-4 ml-2" />
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

      {/* Bundle Package Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Need Multiple Services?
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Save up to 25% with our comprehensive digital security packages
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4">
              Discuss Custom Package
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Services;
