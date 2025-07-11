
import React from 'react';
import { Shield, Users, Award, Globe, CheckCircle, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const About = () => {
  const teamMembers = [
    {
      name: "Alex Rodriguez",
      role: "Founder & CEO",
      specialization: "Blockchain Forensics & Cybersecurity",
      experience: "15+ years in digital security",
      image: "/api/placeholder/300/300"
    },
    {
      name: "Sarah Chen",
      role: "Head of Investigations",
      specialization: "Digital Asset Recovery",
      experience: "12+ years in financial investigations",
      image: "/api/placeholder/300/300"
    },
    {
      name: "Marcus Thompson",
      role: "Senior Advisor",
      specialization: "Cryptocurrency Investment Strategy",
      experience: "20+ years in financial markets",
      image: "/api/placeholder/300/300"
    }
  ];

  const milestones = [
    { year: "2018", event: "Company Founded", description: "Started with a mission to make digital assets safer" },
    { year: "2020", event: "1000+ Cases Resolved", description: "Reached major milestone in successful recoveries" },
    { year: "2022", event: "Global Expansion", description: "Extended services to serve clients worldwide" },
    { year: "2024", event: "Industry Recognition", description: "Awarded Top Digital Security Firm" }
  ];

  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "Your data and assets are protected with military-grade security protocols"
    },
    {
      icon: Users,
      title: "Client-Centric",
      description: "Every solution is tailored to meet your specific needs and circumstances"
    },
    {
      icon: CheckCircle,
      title: "Proven Results",
      description: "Track record of successful recoveries and satisfied clients worldwide"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "24/7 support and services available across multiple time zones"
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
              About Our Company
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Leading experts in digital security, asset recovery, and cryptocurrency solutions
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none text-slate-600">
              <p className="text-lg leading-relaxed mb-6">
                Founded in 2018, our company emerged from a critical need in the rapidly evolving digital landscape. 
                As cryptocurrency adoption soared and digital threats multiplied, individuals and businesses found 
                themselves vulnerable to sophisticated cyber attacks, scams, and complex regulatory challenges.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Our founders, with combined decades of experience in cybersecurity, financial investigations, and 
                blockchain technology, recognized the gap between traditional security services and the unique 
                challenges of the digital asset ecosystem. We set out to build a company that could bridge this gap 
                with expertise, integrity, and results.
              </p>
              <p className="text-lg leading-relaxed">
                Today, we serve clients globally, from individual cryptocurrency investors to major financial 
                institutions, providing comprehensive digital security solutions that protect, recover, and optimize 
                digital assets and relationships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">Our Journey</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-24 text-right mr-8">
                    <span className="text-2xl font-bold text-blue-600">{milestone.year}</span>
                  </div>
                  <div className="flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full mt-2 mr-8"></div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{milestone.event}</h3>
                    <p className="text-slate-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">Our Expert Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-32 h-32 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-16 h-16 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                  <p className="text-slate-600 mb-3">{member.specialization}</p>
                  <p className="text-sm text-slate-500">{member.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="p-3 bg-blue-100 rounded-xl inline-flex mb-4">
                    <value.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{value.title}</h3>
                  <p className="text-slate-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Trust & Security
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">ISO 27001 Certified</h3>
              <p className="text-slate-600">Information security management compliance</p>
            </div>
            <div className="p-6">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">SOC 2 Type II</h3>
              <p className="text-slate-600">Security and availability standards verified</p>
            </div>
            <div className="p-6">
              <Star className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Industry Awards</h3>
              <p className="text-slate-600">Recognized leader in digital security</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
