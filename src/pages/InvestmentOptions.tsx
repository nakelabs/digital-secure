import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  Bitcoin, 
  Landmark, 
  BarChart2, 
  Fuel, 
  TrendingUp,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Activity
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const InvestmentOptions = () => {
  const tradingInstruments = [
    {
      category: 'Forex (Foreign Exchange)',
      icon: Globe,
      description: 'Trade major, minor & exotic currency pairs with tight spreads',
      color: 'from-blue-500 to-blue-600',
      instruments: [
        { name: 'EUR/USD', description: 'Euro vs US Dollar - Most traded pair' },
        { name: 'GBP/USD', description: 'British Pound vs US Dollar' },
        { name: 'USD/JPY', description: 'US Dollar vs Japanese Yen' },
        { name: 'USD/CHF', description: 'US Dollar vs Swiss Franc' },
        { name: 'AUD/USD', description: 'Australian Dollar vs US Dollar' },
        { name: 'NZD/USD', description: 'New Zealand Dollar vs US Dollar' }
      ],
      features: [
        'Major currency pairs: EUR/USD, GBP/USD, USD/JPY',
        'Minor & exotic pairs available',
        'This is raxopaco\'s core focus',
        'Leverage up to 1:500',
        '24/5 trading availability'
      ],
      leverage: 'Up to 1:500',
      spread: 'From 0.1 pips'
    },
    {
      category: 'Stocks (CFDs)',
      icon: Landmark,
      description: 'Trade price movements of companies like Apple, Tesla, Google',
      color: 'from-green-500 to-green-600',
      instruments: [
        { name: 'AAPL', description: 'Apple Inc. - Technology giant' },
        { name: 'TSLA', description: 'Tesla Inc. - Electric vehicles' },
        { name: 'GOOGL', description: 'Alphabet Inc. - Search & cloud' },
        { name: 'MSFT', description: 'Microsoft Corp. - Software & cloud' },
        { name: 'AMZN', description: 'Amazon Inc. - E-commerce & cloud' },
        { name: 'NVDA', description: 'NVIDIA Corp. - Graphics & AI' }
      ],
      features: [
        'Trade price movements of major companies',
        'You don\'t own the shares (CFD trading)',
        'Long and short positions available',
        'No stamp duty or commission',
        'Real-time market data'
      ],
      leverage: 'Up to 1:10',
      spread: 'From 0.05%'
    },
    {
      category: 'Indices',
      icon: BarChart2,
      description: 'Trade major market indices like S&P 500, NASDAQ, Dow Jones',
      color: 'from-purple-500 to-purple-600',
      instruments: [
        { name: 'S&P 500', description: 'Top 500 US companies index' },
        { name: 'NASDAQ', description: 'Technology-focused US index' },
        { name: 'Dow Jones', description: 'Blue-chip US companies' },
        { name: 'FTSE 100', description: 'Top 100 UK companies' },
        { name: 'DAX 40', description: 'Top 40 German companies' },
        { name: 'Nikkei 225', description: 'Japanese stock index' }
      ],
      features: [
        'S&P 500, NASDAQ, Dow Jones access',
        'Global market exposure',
        'Diversified market tracking',
        'Extended trading hours',
        'Low margin requirements'
      ],
      leverage: 'Up to 1:20',
      spread: 'From 0.4 points'
    },
    {
      category: 'Commodities',
      icon: Fuel,
      description: 'Gold, Silver, Crude Oil - Often used as inflation or risk hedges',
      color: 'from-amber-500 to-amber-600',
      instruments: [
        { name: 'Gold (XAU/USD)', description: 'Precious metal - Safe haven asset' },
        { name: 'Silver (XAG/USD)', description: 'Industrial & precious metal' },
        { name: 'Crude Oil WTI', description: 'West Texas Intermediate oil' },
        { name: 'Brent Oil', description: 'European crude oil benchmark' },
        { name: 'Natural Gas', description: 'Energy commodity' },
        { name: 'Copper', description: 'Industrial metal' }
      ],
      features: [
        'Gold, Silver, Crude Oil available',
        'Often used as inflation or risk hedges',
        'Safe haven assets during volatility',
        'Physical commodity exposure',
        'Global market pricing'
      ],
      leverage: 'Up to 1:100',
      spread: 'From $0.30'
    },
    {
      category: 'Cryptocurrencies (CFDs)',
      icon: Bitcoin,
      description: 'Bitcoin, Ethereum and others depending on regulation',
      color: 'from-orange-500 to-orange-600',
      instruments: [
        { name: 'Bitcoin (BTC)', description: 'Leading cryptocurrency' },
        { name: 'Ethereum (ETH)', description: 'Smart contract platform' },
        { name: 'Litecoin (LTC)', description: 'Fast transaction crypto' },
        { name: 'Ripple (XRP)', description: 'Cross-border payments' },
        { name: 'Bitcoin Cash (BCH)', description: 'Bitcoin fork' },
        { name: 'Cardano (ADA)', description: 'Proof-of-stake blockchain' }
      ],
      features: [
        'Bitcoin (BTC), Ethereum (ETH)',
        'Others depending on regulation',
        'CFD trading - no wallet needed',
        '24/7 trading availability',
        'High volatility opportunities'
      ],
      leverage: 'Up to 1:30',
      spread: 'From 1%'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center bg-blue-600/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
              <Activity className="w-5 h-5 mr-3" />
              <span className="font-medium">Professional Trading Instruments</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Investment Options
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Comprehensive range of trading instruments across global markets
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold text-blue-300 mb-2">5</div>
                <div className="text-blue-100">Asset Categories</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold text-green-300 mb-2">150+</div>
                <div className="text-blue-100">Trading Instruments</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold text-purple-300 mb-2">24/7</div>
                <div className="text-blue-100">Market Access</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trading Instruments */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What Can You Trade on raxopaco?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Access global markets with professional trading tools and competitive spreads
            </p>
          </motion.div>

          <div className="space-y-12">
            {tradingInstruments.map((instrument, index) => (
              <motion.div
                key={index}
                className="grid lg:grid-cols-5 gap-8 items-start"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
              >
                {/* Category Overview */}
                <div className="lg:col-span-2 space-y-6">
                  <Card className="border-l-4 border-blue-500 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className={`p-4 rounded-xl bg-gradient-to-r ${instrument.color} shadow-lg`}>
                          <instrument.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900">{instrument.category}</h3>
                          <Badge variant="outline" className="mt-1">
                            {instrument.instruments.length} Instruments
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-slate-600">{instrument.description}</p>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-slate-900">Key Features:</h4>
                        {instrument.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-slate-600 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                        <div>
                          <div className="text-sm text-slate-500">Max Leverage</div>
                          <div className="font-semibold text-slate-900">{instrument.leverage}</div>
                        </div>
                        <div>
                          <div className="text-sm text-slate-500">Spread From</div>
                          <div className="font-semibold text-slate-900">{instrument.spread}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Available Instruments */}
                <div className="lg:col-span-3">
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">Available Instruments:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {instrument.instruments.map((item, idx) => (
                      <Card key={idx} className="border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-semibold text-slate-900">{item.name}</h5>
                              <p className="text-sm text-slate-600">{item.description}</p>
                            </div>
                            <TrendingUp className="w-5 h-5 text-green-500" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Disclaimer */}
      <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50 border-t-4 border-red-500">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-red-600 mb-6">⚠️ Important Trading Risk Disclaimer</h3>
            <div className="bg-white p-8 rounded-xl shadow-lg text-left">
              <div className="space-y-4 text-slate-700">
                <p className="text-lg font-semibold text-red-600">
                  • raxopaco does NOT invest for you - You make all trading decisions
                </p>
                <p className="text-lg font-semibold text-red-600">
                  • Your profit or loss depends entirely on your trades
                </p>
                <div className="border-t pt-4 mt-4">
                  <h4 className="font-semibold text-slate-800 mb-3">We Provide:</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      <span>Trading platform</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      <span>Liquidity access</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      <span>Leverage tools</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Trading?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Access professional trading tools and global markets with competitive spreads
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Open Trading Account
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button variant="outline" size="lg" className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-4 text-lg">
                  View Platform Demo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default InvestmentOptions;