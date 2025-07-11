
import React from 'react';
import { Shield, Lock, Eye, FileText, Clock, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Your privacy and data security are our highest priorities
            </p>
            <div className="text-sm text-slate-500">
              Last updated: December 2024
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          
          {/* Overview */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-6 h-6 mr-3 text-blue-600" />
                Privacy Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <p className="text-slate-600 mb-4">
                This Privacy Policy describes how we collect, use, and protect your personal information when you use our digital security and cryptocurrency services. We are committed to maintaining the highest standards of data protection and privacy.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 font-medium">
                  We comply with GDPR, CCPA, and other applicable privacy regulations worldwide.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Information Collection */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="w-6 h-6 mr-3 text-blue-600" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Personal Information</h3>
                  <ul className="list-disc list-inside text-slate-600 space-y-1">
                    <li>Name, email address, and phone number</li>
                    <li>Professional information and company details</li>
                    <li>Communication preferences and contact history</li>
                    <li>Service-specific information relevant to your case</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Technical Information</h3>
                  <ul className="list-disc list-inside text-slate-600 space-y-1">
                    <li>IP address and browser information</li>
                    <li>Device information and operating system</li>
                    <li>Website usage data and analytics</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Service-Related Information</h3>
                  <ul className="list-disc list-inside text-slate-600 space-y-1">
                    <li>Cryptocurrency transaction details (when relevant)</li>
                    <li>Digital asset information for recovery services</li>
                    <li>Investigation details for security services</li>
                    <li>Financial information for advisory services</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-6 h-6 mr-3 text-blue-600" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Service Delivery</h3>
                  <p className="text-slate-600">We use your information to provide the services you request, including consultation, investigation, recovery, and advisory services.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Communication</h3>
                  <p className="text-slate-600">We contact you regarding your case, provide updates, and respond to inquiries through your preferred communication channels.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Legal Compliance</h3>
                  <p className="text-slate-600">We may use your information to comply with legal obligations, regulatory requirements, and law enforcement requests.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Service Improvement</h3>
                  <p className="text-slate-600">Anonymous and aggregated data helps us improve our services and develop new solutions.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="w-6 h-6 mr-3 text-blue-600" />
                Data Security Measures
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Encryption</h3>
                    <p className="text-slate-600">All data is encrypted in transit and at rest using industry-standard AES-256 encryption.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Access Controls</h3>
                    <p className="text-slate-600">Strict access controls ensure only authorized personnel can access your information.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Secure Infrastructure</h3>
                    <p className="text-slate-600">Our systems are hosted on secure, compliant cloud infrastructure with regular security audits.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Regular Monitoring</h3>
                    <p className="text-slate-600">24/7 security monitoring and incident response procedures protect against threats.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Retention */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-6 h-6 mr-3 text-blue-600" />
                Data Retention Policy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-slate-600">
                  We retain your personal information only as long as necessary to provide services and comply with legal obligations:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-slate-900">Active Cases</h3>
                    <p className="text-slate-600">Data retained throughout service delivery and for 1 year after case completion.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-slate-900">Legal Requirements</h3>
                    <p className="text-slate-600">Some data may be retained longer to comply with legal and regulatory requirements.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-slate-900">Marketing Data</h3>
                    <p className="text-slate-600">Marketing communications data retained until you opt out or for 3 years maximum.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-slate-900">Website Analytics</h3>
                    <p className="text-slate-600">Anonymous analytics data retained for 2 years to improve our services.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle>Your Privacy Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-slate-600 mb-4">
                  You have the following rights regarding your personal information:
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Access</h4>
                      <p className="text-slate-600 text-sm">Request a copy of your personal data</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Rectification</h4>
                      <p className="text-slate-600 text-sm">Correct inaccurate information</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Erasure</h4>
                      <p className="text-slate-600 text-sm">Request deletion of your data</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Portability</h4>
                      <p className="text-slate-600 text-sm">Transfer your data to another provider</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Restriction</h4>
                      <p className="text-slate-600 text-sm">Limit how we process your data</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Objection</h4>
                      <p className="text-slate-600 text-sm">Object to certain data processing</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimers */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3 text-amber-600" />
                Important Disclaimers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-amber-900 mb-2">Investment Advisory Disclaimer</h3>
                  <p className="text-amber-800 text-sm">
                    Our investment advisory services do not constitute financial advice. Cryptocurrency investments carry significant risk, and past performance does not guarantee future results. Always consult with qualified financial professionals before making investment decisions.
                  </p>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-900 mb-2">Recovery Services Disclaimer</h3>
                  <p className="text-red-800 text-sm">
                    While we use advanced techniques and have a high success rate, we cannot guarantee the recovery of lost or stolen digital assets. Success depends on various factors including the nature of the incident and cooperation from relevant parties.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">Investigation Services Disclaimer</h3>
                  <p className="text-purple-800 text-sm">
                    Our investigation services are for informational purposes only and should not be considered legal advice. Any evidence gathered should be reviewed by qualified legal professionals before use in legal proceedings.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Contact Us About Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-slate-600">
                  If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:
                </p>
                
                <div className="bg-slate-50 p-6 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-slate-900">Privacy Officer</h4>
                      <p className="text-slate-600">privacy@digitalsolutions.expert</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-slate-900">Response Time</h4>
                      <p className="text-slate-600">Within 30 days of request</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-slate-500">
                  This Privacy Policy may be updated periodically. We will notify you of any material changes via email or through our website.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Privacy;
