
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, MessageCircle, Phone, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold">DigitalSecure</span>
            </div>
            <p className="text-slate-300 mb-4">
              Professional digital security and cryptocurrency solutions. Protecting your digital future with expert services worldwide.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Mail, color: "text-blue-400" },
                { icon: MessageCircle, color: "text-green-400" },
                { icon: Phone, color: "text-red-400" }
              ].map((social, index) => (
                <motion.div
                  key={index}
                  className="p-2 bg-slate-800 rounded cursor-pointer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
                  viewport={{ once: true }}
                >
                  <social.icon className={`w-5 h-5 ${social.color}`} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-slate-300">
              <li><Link to="/services" className="hover:text-white transition-colors">Investment Advisory</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Merchant Services</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Cyber Recovery</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Relationship Verification</Link></li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-slate-300">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/testimonials" className="hover:text-white transition-colors">Testimonials</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Get Help</h3>
            <div className="space-y-3 text-slate-300">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-sm">support@digitalsolutions.expert</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-purple-400" />
                <span className="text-sm">24/7 Global Support</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2024 DigitalSecure. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-slate-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400 text-sm">
                Licensed & Insured
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400 text-sm">
                ISO 27001 Certified
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
