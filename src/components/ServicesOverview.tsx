
import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Shield, Search, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ServicesOverview = () => {
  const services = [
    {
      icon: TrendingUp,
      title: "Investment Advisory",
      description: "Expert cryptocurrency investment guidance and portfolio optimization strategies for individuals and institutions.",
      features: ["Portfolio Analysis", "Risk Assessment", "Market Insights", "Regulatory Compliance"],
      link: "/services"
    },
    {
      icon: Shield,
      title: "Merchant Services",
      description: "Comprehensive cryptocurrency merchant solutions including secure wallets and payment integration.",
      features: ["Secure Wallets", "Payment Gateways", "Multi-sig Solutions", "Exchange Integration"],
      link: "/services"
    },
    {
      icon: Search,
      title: "Cyber Recovery",
      description: "Professional recovery services for hacked accounts, stolen funds, and compromised digital assets.",
      features: ["Asset Recovery", "Blockchain Forensics", "Security Hardening", "Incident Response"],
      link: "/services"
    },
    {
      icon: Heart,
      title: "Relationship Verification",
      description: "Discreet investigation services for relationship loyalty and partner verification needs.",
      features: ["Discrete Investigation", "Digital Analysis", "Evidence Collection", "Confidential Reports"],
      link: "/services"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Professional Digital Solutions
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive services to protect, recover, and optimize your digital assets and relationships with expert precision and confidentiality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="p-3 bg-blue-100 rounded-xl inline-flex mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-slate-900">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-slate-600">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to={service.link}>
                  <Button variant="outline" className="w-full hover:bg-blue-50">
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/services">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4">
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
