
import React from 'react';
import { TrendingUp, Shield, PieChart, Building, ArrowRight, CheckCircle, Clock, DollarSign, Home, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      icon: Building,
      title: "Digital Real Estate Investment",
      description: "Income-producing online assets including monetized websites, digital brands, and platforms designed for sustainable wealth building.",
      features: [
        "Monetized website portfolio development",
        "Digital brand acquisition and optimization", 
        "Lead-generation and online business assets",
        "Recurring income stream establishment",
        "Global digital property management"
      ],
      process: [
        "Digital asset assessment and valuation",
        "Investment opportunity analysis and due diligence",
        "Strategic acquisition and optimization",
        "Performance monitoring and income tracking"
      ],
      pricing: "Private member access required"
    },
    {
      icon: Home,
      title: "Structured Ownership Pathways",
      description: "Disciplined routes to real property ownership through strategic investment milestones and accelerated financing options.",
      features: [
        "Property targeting and milestone planning",
        "Ownership progress tracking and visualization",
        "Zero-interest financing eligibility building", 
        "Accelerated ownership structure access",
        "Strategic purchase support and guidance"
      ],
      process: [
        "Target property identification and analysis",
        "Investment milestone planning and tracking",
        "Financing eligibility assessment",
        "Ownership acceleration strategy implementation"
      ],
      pricing: "Qualification-based access"
    },
    {
      icon: Target,
      title: "Private Member Investment Advisory",
      description: "Comprehensive investment guidance for qualified members focused on real asset accumulation and wealth building.",
      features: [
        "Diversified portfolio strategy development",
        "Market-based asset allocation guidance",
        "Risk assessment and management protocols",
        "Regulatory compliance and reporting",
        "Performance tracking and optimization"
      ],
      process: [
        "Member eligibility and compliance review",
        "Personalized strategy development",
        "Implementation with ongoing monitoring",
        "Regular performance reviews and adjustments"
      ],
      pricing: "Elite member tier access"
    },
    {
      icon: Shield,
      title: "Zero-Interest Financing Access",
      description: "Structured financing programs designed to accelerate ownership opportunities for qualified private members.",
      features: [
        "No traditional interest charge structures",
        "Structured repayment terms and flexibility",
        "Administrative fee transparency",
        "Ownership acceleration support",
        "Personalized financing strategy development"
      ],
      process: [
        "Member history and progress assessment",
        "Financing eligibility determination",
        "Structured program application and approval",
        "Ongoing compliance and progress monitoring"
      ],
      pricing: "Subject to approval and terms"
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
              RAXOPAYCO Investment Framework
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Private investment platform specializing in digital real estate and structured ownership pathways
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
                          Apply for Access <ArrowRight className="w-4 h-4 ml-2" />
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
            Ready to Build Real Wealth?
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Apply for access to our private investment platform specializing in digital real estate and structured ownership pathways
          </p>
          <Link to="/auth">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4">
              Apply for Private Access
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Services;
