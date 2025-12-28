
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <motion.div 
                className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Shield className="w-4 h-4 mr-2" />
                Private Investment Platform - Invitation Only
              </motion.div>
              <motion.h1 
                className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Build Wealth Through 
                <span className="text-blue-600"> Digital Real Estate</span>
              </motion.h1>
              <motion.p 
                className="text-xl text-slate-600 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                RAXOPAYCO's structured investment platform specializes in digital real estate and ownership pathways. 
                Transform your capital into real assets through our disciplined approach to wealth building and accelerated homeownership.
              </motion.p>
            </div>

            {/* Trust Indicators */}
            <motion.div 
              className="flex items-center space-x-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-slate-700 font-medium">Selective Access</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-slate-700 font-medium">Private Members</span>
              </div>
              <div className="text-slate-700 font-medium">Real Asset Focus</div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Link to="/dashboard">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                    Apply for Access
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              </Link>
              <Link to="/investment-options">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-2 hover:bg-slate-50">
                    View Ownership Pathways
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Main Investment Image */}
              <motion.div 
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <img 
                  src="/images/invest.jpeg" 
                  alt="Investment Portfolio" 
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-purple-700/80">
                  <div className="p-8 h-full flex flex-col justify-end">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { value: "Private", label: "Access Only", delay: 0.5 },
                        { value: "Digital", label: "Real Estate", delay: 0.6 },
                        { value: "Zero", label: "Interest*", delay: 0.7 },
                        { value: "Real", label: "Ownership", delay: 0.8 }
                      ].map((stat, index) => (
                        <motion.div 
                          key={index}
                          className="bg-white/10 backdrop-blur rounded-lg p-4 text-white"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: stat.delay }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="text-2xl font-bold">{stat.value}</div>
                          <div className="text-sm opacity-80">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Disclaimer */}
              <motion.div 
                className="absolute bottom-2 left-2 text-xs text-white/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                *Subject to approval and terms
              </motion.div>
              
              {/* Floating elements */}
              <motion.div 
                className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, -10, 0]
                }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.9 },
                  scale: { duration: 0.5, delay: 0.9 },
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <Shield className="w-6 h-6" />
              </motion.div>
              <motion.div 
                className="absolute -bottom-4 -left-4 bg-yellow-500 text-white p-3 rounded-full shadow-lg"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, 10, 0]
                }}
                transition={{
                  opacity: { duration: 0.5, delay: 1.0 },
                  scale: { duration: 0.5, delay: 1.0 },
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <Star className="w-6 h-6" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
