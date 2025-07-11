
import React from 'react';
import { Shield, Users, Award, Clock, CheckCircle, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Why Choose Our Services?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            When your digital assets and security are at stake, you need proven experts who deliver results with integrity and professionalism.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="p-3 bg-blue-100 rounded-xl inline-flex mb-4">
                  <reason.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {reason.title}
                </h3>
                <p className="text-slate-600">
                  {reason.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Trust Elements */}
        <div className="mt-16 bg-slate-50 rounded-2xl p-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-slate-900 mb-2">ISO 27001</div>
              <p className="text-slate-600">Security Certified</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 mb-2">Licensed</div>
              <p className="text-slate-600">Fully Compliant Operations</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 mb-2">Insured</div>
              <p className="text-slate-600">Professional Liability Coverage</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
