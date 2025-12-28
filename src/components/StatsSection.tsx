
import React from 'react';
import { TrendingUp, Users, Shield, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      number: "Private",
      label: "Member Access",
      description: "Invitation-only platform for qualified investors"
    },
    {
      icon: TrendingUp,
      number: "Digital",
      label: "Real Estate Focus",
      description: "Income-producing online assets and property portfolios"
    },
    {
      icon: Shield,
      number: "Zero",
      label: "Interest Financing*",
      description: "Structured financing programs for qualified members"
    },
    {
      icon: Clock,
      number: "Real",
      label: "Asset Ownership",
      description: "Pathway to tangible property and wealth building"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Success Stories Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            RAXOPAYCO Investment Success
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12">
            Our private investment platform delivers measurable progress through digital real estate and structured ownership pathways. See how qualified members achieve real asset ownership.
          </p>
          
          {/* Success Images Row */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div 
              className="relative rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <img 
                src="/images/sold.jpeg" 
                alt="Investment Success Story" 
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Ownership Achievement</h3>
                  <p className="text-sm opacity-90">Structured pathway to real property ownership</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <img 
                src="/images/name.jpeg" 
                alt="Client Portfolio" 
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Member Success</h3>
                  <p className="text-sm opacity-90">Private investment strategy results</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Grid */}
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
