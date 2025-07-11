
import React from 'react';
import { Shield, Users, Award, Clock, CheckCircle, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Shield,
      title: "Military-Grade Security",
      description: "Your data and assets protected with the highest security standards and encryption protocols."
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Certified professionals with decades of experience in cybersecurity, finance, and blockchain technology."
    },
    {
      icon: Award,
      title: "Proven Track Record",
      description: "500+ successful cases with 85% recovery rate and industry-leading client satisfaction."
    },
    {
      icon: Clock,
      title: "24/7 Global Support",
      description: "Round-the-clock assistance available worldwide with emergency response capabilities."
    },
    {
      icon: CheckCircle,
      title: "Results-Driven",
      description: "We only succeed when you succeed. Our fee structure aligns our success with yours."
    },
    {
      icon: Globe,
      title: "Worldwide Reach",
      description: "Licensed and operating globally with local expertise and international capabilities."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Why Choose Our Services?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            When your digital assets and security are at stake, you need proven experts who deliver results with integrity and professionalism.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <CardContent className="p-6 text-center">
                  <motion.div 
                    className="p-3 bg-blue-100 rounded-xl inline-flex mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <reason.icon className="w-8 h-8 text-blue-600" />
                  </motion.div>
                  <motion.h3 
                    className="text-xl font-semibold text-slate-900 mb-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    viewport={{ once: true }}
                  >
                    {reason.title}
                  </motion.h3>
                  <motion.p 
                    className="text-slate-600"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    {reason.description}
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Trust Elements */}
        <motion.div 
          className="mt-16 bg-slate-50 rounded-2xl p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { title: "ISO 27001", subtitle: "Security Certified" },
              { title: "Licensed", subtitle: "Fully Compliant Operations" },
              { title: "Insured", subtitle: "Professional Liability Coverage" }
            ].map((trust, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl font-bold text-slate-900 mb-2">{trust.title}</div>
                <p className="text-slate-600">{trust.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
