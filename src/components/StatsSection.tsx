
import React from 'react';
import { TrendingUp, Users, Shield, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      number: "500+",
      label: "Active Investors",
      description: "Growing community of crypto and real estate investors"
    },
    {
      icon: TrendingUp,
      number: "$50M+",
      label: "Assets Under Management",
      description: "Bitcoin, Ethereum, and tokenized real estate portfolios"
    },
    {
      icon: Shield,
      number: "95%",
      label: "Avg. Annual ROI",
      description: "Exceptional returns through strategic crypto investments"
    },
    {
      icon: Clock,
      number: "24/7",
      label: "Market Access",
      description: "Round-the-clock cryptocurrency trading and monitoring"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="p-4 bg-blue-100 rounded-xl inline-flex mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <stat.icon className="w-8 h-8 text-blue-600" />
              </motion.div>
              <motion.div 
                className="text-3xl md:text-4xl font-bold text-slate-900 mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                viewport={{ once: true }}
              >
                {stat.number}
              </motion.div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {stat.label}
              </h3>
              <p className="text-slate-600 text-sm">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
