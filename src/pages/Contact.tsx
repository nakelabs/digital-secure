
import React, { useState } from 'react';
import { Mail, MessageCircle, Phone, Clock, Shield, Send, MapPin, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    urgency: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast({
      title: "Message Sent Successfully",
      description: "We'll respond within 24 hours. For urgent matters, please contact us via WhatsApp.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      urgency: '',
      message: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get detailed responses within 24 hours",
      contact: "support@raxopayco.com",
      action: "Send Email",
      primary: true
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Support",
      description: "Quick responses for urgent matters",
      contact: "+1 (256) 273‑2791‬‬ ",
      action: "Message on WhatsApp",
      primary: true
    },
    {
      icon: Phone,
      title: "Emergency Hotline",
      description: "24/7 support for critical incidents",
      contact: "++1 (256) 273‑2791",
      action: "Call Now",
      primary: false
    },
    {
      icon: Shield,
      title: "Secure Channel",
      description: "Encrypted communication via Facebook Messenger",
      contact: "George Hilton Humphrey",
      action: "Contact on Facebook",
      primary: false
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
              Get Expert Help Today
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Professional consultation available 24/7 for all your digital security and cryptocurrency needs
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-slate-500">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-green-500 mr-2" />
                <span>Response within 24 hours</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-blue-500 mr-2" />
                <span>Confidential & Secure</span>
              </div>
              <div className="flex items-center">
                <Globe className="w-5 h-5 text-purple-500 mr-2" />
                <span>Global Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
            Multiple Ways to Reach Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
            {contactMethods.map((method, index) => (
              <Card key={index} className={`shadow-lg hover:shadow-xl transition-shadow ${method.primary ? 'ring-2 ring-blue-500' : ''}`}>
                <CardContent className="p-6 text-center">
                  {method.primary && (
                    <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full inline-block mb-3">
                      RECOMMENDED
                    </div>
                  )}
                  <div className="p-3 bg-blue-100 rounded-xl inline-flex mb-4">
                    <method.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{method.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{method.description}</p>
                  <p className="font-mono text-sm text-slate-800 mb-4">{method.contact}</p>
                  <Button 
                    variant={method.primary ? "default" : "outline"} 
                    size="sm" 
                    className={method.primary ? "bg-blue-600 hover:bg-blue-700" : ""}
                  >
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Send Us a Message
              </h2>
              <p className="text-lg text-slate-600">
                Fill out the form below and we'll get back to you within 24 hours
              </p>
            </div>
            
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="w-5 h-5 mr-2 text-blue-600" />
                  Consultation Request Form
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Full Name *
                      </label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Optional - for WhatsApp contact"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Service Needed *
                      </label>
                      <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="forex-trading">Forex Trading</SelectItem>
                          <SelectItem value="crypto-trading">Crypto Trading</SelectItem>
                          <SelectItem value="commodities-trading">Commodities Trading</SelectItem>
                          <SelectItem value="indices-trading">Indices Trading</SelectItem>
                          <SelectItem value="trading-consultation">Trading Consultation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Urgency Level *
                    </label>
                    <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="How urgent is your request?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - General inquiry</SelectItem>
                        <SelectItem value="medium">Medium - Need help within a week</SelectItem>
                        <SelectItem value="high">High - Need help within 24 hours</SelectItem>
                        <SelectItem value="critical">Critical - Emergency situation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Message *
                    </label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Please describe your situation and what kind of help you need. The more details you provide, the better we can assist you."
                      rows={6}
                    />
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start">
                      <Shield className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                      <div className="text-sm text-blue-800">
                        <p className="font-medium mb-1">Privacy & Security Notice</p>
                        <p>All communications are encrypted and confidential. We comply with GDPR and other privacy regulations. Your information is never shared with third parties without your explicit consent.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      type="submit"
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 flex-1"
                    >
                      Send Message <Send className="w-4 h-4 ml-2" />
                    </Button>
                    <Button 
                      type="button"
                      variant="outline"
                      size="lg"
                      className="sm:w-auto"
                      onClick={() => window.open('https://wa.me/+12562732791', '_blank')}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp Instead
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <MapPin className="w-6 h-6 mr-3 text-blue-600" />
                  Global Operations
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-900">Service Coverage</h4>
                    <p className="text-slate-600">Remote-first operations serving clients worldwide</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Primary Time Zones</h4>
                    <p className="text-slate-600">EST, PST, GMT, CET - 24/7 emergency support</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Languages</h4>
                    <p className="text-slate-600">English, Spanish, Mandarin, German</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-blue-600" />
                  Response Times
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-slate-600">General Inquiries</span>
                    <span className="font-semibold text-slate-900">24 hours</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-slate-600">Urgent Matters</span>
                    <span className="font-semibold text-slate-900">4 hours</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-slate-600">Critical Emergencies</span>
                    <span className="font-semibold text-green-600">30 minutes</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-600">WhatsApp Messages</span>
                    <span className="font-semibold text-blue-600">15 minutes</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
