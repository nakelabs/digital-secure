
import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Shield, Search, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

const ServicesOverview = () => {
  const services = [
    {
      icon: TrendingUp,
      title: "Digital Real Estate",
      description: "Income-producing online assets including monetized websites, digital brands, and platforms designed for sustainable growth.",
      features: ["Website Portfolios", "Digital Brands", "Online Businesses", "Lead Generation Assets"],
      link: "/services"
    },
    {
      icon: Shield,
      title: "Ownership Pathways",
      description: "Structured routes to real property ownership through disciplined investment and strategic financing options.",
      features: ["Property Targeting", "Ownership Milestones", "Financing Access", "Equity Participation"],
      link: "/services"
    },
    {
      icon: Search,
      title: "Investment Advisory",
      description: "Expert guidance in building diversified portfolios combining digital assets with traditional market exposure.",
      features: ["Portfolio Strategy", "Risk Assessment", "Market Analysis", "Performance Tracking"],
      link: "/services"
    },
    {
      icon: Heart,
      title: "Private Member Services",
      description: "Exclusive access to zero-interest financing, accelerated ownership structures, and personalized wealth building strategies.",
      features: ["Zero-Interest Financing*", "Accelerated Ownership", "Private Access", "Personalized Strategy"],
      link: "/auth"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            RAXOPAYCO Investment Framework
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A disciplined approach to wealth building through digital real estate and structured ownership pathways. Private access for qualified members only.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <CardHeader className="text-center">
                  <motion.div 
                    className="p-3 bg-blue-100 rounded-xl inline-flex mx-auto mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <service.icon className="w-8 h-8 text-blue-600" />
                  </motion.div>
                  <CardTitle className="text-xl text-slate-900">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <motion.li 
                        key={idx} 
                        className="flex items-center text-sm text-slate-600"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: (index * 0.1) + (idx * 0.05) }}
                        viewport={{ once: true }}
                      >
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                  <Link to={service.link}>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button variant="outline" className="w-full hover:bg-blue-50">
                        {service.title === "Private Member Services" ? "Apply Now" : "Learn More"} <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link to="/services">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4">
                View All Services
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Collaboration Section */}
        <motion.div 
          className="mt-20 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="md:flex items-center">
            <div className="md:w-1/2 p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                Collaborative Wealth Building Approach
              </h3>
              <p className="text-lg text-slate-600 mb-6">
                Our team works closely with qualified members to develop personalized investment strategies. Through disciplined planning and expert guidance, we help you navigate digital real estate and structured ownership pathways.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-slate-700">Personalized Ownership Strategy</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-slate-700">Expert Team Collaboration</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-slate-700">Continuous Progress Monitoring</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/images/collabration.png" 
                alt="Team Collaboration" 
                className="w-full h-80 md:h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesOverview;
