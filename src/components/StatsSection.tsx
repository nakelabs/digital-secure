
import React from 'react';
import { TrendingUp, Users, Shield, Clock } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      number: "500+",
      label: "Clients Served",
      description: "Trusted by individuals and institutions worldwide"
    },
    {
      icon: TrendingUp,
      number: "$50M+",
      label: "Assets Recovered",
      description: "Successfully recovered digital assets and funds"
    },
    {
      icon: Shield,
      number: "85%",
      label: "Success Rate",
      description: "Industry-leading recovery and resolution rate"
    },
    {
      icon: Clock,
      number: "24/7",
      label: "Global Support",
      description: "Round-the-clock assistance when you need it most"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="p-4 bg-blue-100 rounded-xl inline-flex mb-4">
                <stat.icon className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                {stat.number}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {stat.label}
              </h3>
              <p className="text-slate-600 text-sm">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
