
import React from 'react';
import { Shield, Users, Award, Globe, CheckCircle, Star, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const About = () => {
  const teamMembers = [
    {
      name: "Alex Rodriguez",
      role: "Founder & CEO",
      specialization: "Digital Real Estate Investment & Ownership Strategies",
      experience: "15+ years in private investment and wealth management",
      image: "/api/placeholder/300/300"
    },
    {
      name: "George Hilton Humphrey",
      role: "Head of Technology",
      specialization: "Platform Architecture & Member Experience",
      experience: "12+ years in fintech and investment platforms",
      image: "/api/placeholder/300/300"
    },
    {
      name: "Patrick Mark",
      role: "Chief Investment Officer",
      specialization: "Asset Management & Ownership Pathway Development",
      experience: "20+ years in private wealth management and real estate",
      image: "/api/placeholder/300/300"
    }
  ];

  const milestones = [
    { year: "2018", event: "Platform Launched", description: "Started with focus on digital real estate and structured investment pathways" },
    { year: "2020", event: "Private Access", description: "Transitioned to invitation-only platform for qualified members" },
    { year: "2022", event: "Zero-Interest Financing", description: "Launched structured financing programs for accelerated ownership" },
    { year: "2024", event: "Ownership Success", description: "Achieved significant member milestones in real asset ownership" }
  ];

  const values = [
    {
      icon: Shield,
      title: "Private & Secure",
      description: "Your investment data and personal information protected with the highest security standards"
    },
    {
      icon: Users,
      title: "Member-Focused",
      description: "Platform designed for qualified professionals seeking disciplined wealth building and ownership"
    },
    {
      icon: CheckCircle,
      title: "Transparent Progress",
      description: "Clear tracking of investment milestones and ownership pathway advancement"
    },
    {
      icon: Globe,
      title: "Global Opportunities",
      description: "Access to digital real estate and ownership opportunities worldwide for qualified members"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-blue-600/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <TrendingUp className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Private Investment Platform - Invitation Only</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              About RAXOPAYCO
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Bridging disciplined investing and real ownership through digital real estate since 2018
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Investment Platform Story</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="prose prose-lg max-w-none text-slate-600">
                  <p className="text-lg leading-relaxed">
                    Founded in 2018, RAXOPAYCO emerged as digital assets and structured investment opportunities were gaining recognition. 
                    We recognized that qualified professionals needed access to disciplined wealth building strategies that were 
                    previously only available through complex financial structures.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Our platform combines proven investment principles with innovative digital real estate opportunities, giving qualified members 
                    a structured pathway to real asset ownership. We provide the framework - you build the wealth.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-200">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Platform Highlights</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">Private</div>
                    <div className="text-slate-600">Access Only</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">Digital</div>
                    <div className="text-slate-600">Real Estate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">Zero</div>
                    <div className="text-slate-600">Interest*</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">Real</div>
                    <div className="text-slate-600">Ownership</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">Our Investment Journey</h2>
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
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">Our Leadership Team</h2>
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
            Trust & Compliance
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Private Platform</h3>
              <p className="text-slate-600">Invitation-only access with strict member qualification</p>
            </div>
            <div className="p-6">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Secure Investment</h3>
              <p className="text-slate-600">Advanced security protocols and transparent progress tracking</p>
            </div>
            <div className="p-6">
              <Star className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Industry Innovation</h3>
              <p className="text-slate-600">Leading digital real estate investment platform</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
