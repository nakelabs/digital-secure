import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  PieChart, 
  Settings, 
  LogOut,
  Bell,
  Search,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Menu,
  Plus,
  Eye,
  MoreVertical,
  Filter,
  Bitcoin,
  Landmark,
  Globe,
  Fuel,
  BarChart2
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { useNavigate, useLocation } from 'react-router-dom'
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Pie, LineChart, Line, AreaChart, Area } from 'recharts'

const Portfolio = () => {
  const { user, signOut } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive"
      })
    } else {
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account."
      })
    }
  }

  const sidebarItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/dashboard' },
    { icon: PieChart, label: 'Portfolio', path: '/portfolio' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ]

  // Portfolio allocation data
  const portfolioData = [
    { name: 'Forex', value: 35, amount: 68250, color: '#3b82f6' },
    { name: 'Cryptocurrencies', value: 25, amount: 48750, color: '#f59e0b' },
    { name: 'Stocks (CFDs)', value: 20, amount: 39000, color: '#10b981' },
    { name: 'Indices', value: 12, amount: 23400, color: '#8b5cf6' },
    { name: 'Commodities', value: 8, amount: 15600, color: '#ef4444' },
  ]

  // Detailed holdings
  const holdings = [
    // Forex (Foreign Exchange)
    { 
      name: 'EUR/USD', 
      symbol: 'EURUSD', 
      category: 'Forex',
      price: '1.0845', 
      change: '+0.12%', 
      holdings: '5.5 lots',
      value: '$28,450.00',
      allocation: 14.6,
      isPositive: true,
      icon: Globe
    },
    { 
      name: 'GBP/USD', 
      symbol: 'GBPUSD', 
      category: 'Forex',
      price: '1.2684', 
      change: '+0.08%', 
      holdings: '3.2 lots',
      value: '$21,800.00',
      allocation: 11.2,
      isPositive: true,
      icon: Globe
    },
    { 
      name: 'USD/JPY', 
      symbol: 'USDJPY', 
      category: 'Forex',
      price: '149.25', 
      change: '-0.15%', 
      holdings: '2.1 lots',
      value: '$18,000.00',
      allocation: 9.2,
      isPositive: false,
      icon: Globe
    },
    
    // Cryptocurrencies (CFDs)
    { 
      name: 'Bitcoin CFD', 
      symbol: 'BTCUSD', 
      category: 'Cryptocurrency',
      price: '$43,250.00', 
      change: '+2.45%', 
      holdings: '0.65 BTC',
      value: '$28,112.50',
      allocation: 14.4,
      isPositive: true,
      icon: Bitcoin
    },
    { 
      name: 'Ethereum CFD', 
      symbol: 'ETHUSD', 
      category: 'Cryptocurrency',
      price: '$2,680.00', 
      change: '+1.89%', 
      holdings: '7.8 ETH',
      value: '$20,904.00',
      allocation: 10.7,
      isPositive: true,
      icon: Bitcoin
    },
    
    // Stocks (CFDs) - You don't own the shares
    { 
      name: 'Apple Inc. CFD', 
      symbol: 'AAPL', 
      category: 'Stock CFD',
      price: '$185.20', 
      change: '-0.85%', 
      holdings: '75 CFDs',
      value: '$13,890.00',
      allocation: 7.1,
      isPositive: false,
      icon: Landmark
    },
    { 
      name: 'Tesla Inc. CFD', 
      symbol: 'TSLA', 
      category: 'Stock CFD',
      price: '$248.50', 
      change: '+1.23%', 
      holdings: '35 CFDs',
      value: '$8,697.50',
      allocation: 4.5,
      isPositive: true,
      icon: Landmark
    },
    { 
      name: 'Google CFD', 
      symbol: 'GOOGL', 
      category: 'Stock CFD',
      price: '$142.30', 
      change: '+2.14%', 
      holdings: '120 CFDs',
      value: '$17,076.00',
      allocation: 8.7,
      isPositive: true,
      icon: Landmark
    },
    
    // Indices
    { 
      name: 'S&P 500 Index', 
      symbol: 'SPX500', 
      category: 'Index',
      price: '4,785.60', 
      change: '+0.65%', 
      holdings: '2.8 CFDs',
      value: '$13,399.68',
      allocation: 6.9,
      isPositive: true,
      icon: BarChart2
    },
    { 
      name: 'NASDAQ 100', 
      symbol: 'NAS100', 
      category: 'Index',
      price: '16,845.30', 
      change: '+1.12%', 
      holdings: '0.6 CFDs',
      value: '$10,107.18',
      allocation: 5.2,
      isPositive: true,
      icon: BarChart2
    },
    
    // Commodities - Often used as inflation or risk hedges
    { 
      name: 'Gold', 
      symbol: 'XAUUSD', 
      category: 'Commodity',
      price: '$2,045.80', 
      change: '+0.35%', 
      holdings: '4.2 oz',
      value: '$8,592.36',
      allocation: 4.4,
      isPositive: true,
      icon: Fuel
    },
    { 
      name: 'Crude Oil WTI', 
      symbol: 'WTIUSD', 
      category: 'Commodity',
      price: '$78.45', 
      change: '-1.25%', 
      holdings: '89 barrels',
      value: '$6,982.05',
      allocation: 3.6,
      isPositive: false,
      icon: Fuel
    }
  ]

  // Performance data for the past months
  const performanceData = [
    { month: 'Jul', forex: 62000, crypto: 41000, stocks: 35000, indices: 21000, commodities: 13500 },
    { month: 'Aug', forex: 64500, crypto: 43500, stocks: 36200, indices: 21800, commodities: 14200 },
    { month: 'Sep', forex: 66200, crypto: 46000, stocks: 37800, indices: 22500, commodities: 14800 },
    { month: 'Oct', forex: 67800, crypto: 47500, stocks: 38500, indices: 23100, commodities: 15200 },
    { month: 'Nov', forex: 67200, crypto: 48200, stocks: 38800, indices: 23300, commodities: 15400 },
    { month: 'Dec', forex: 68250, crypto: 48750, stocks: 39000, indices: 23400, commodities: 15600 },
  ]

  const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444']

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold text-white">InvestPro</h1>
        </div>
        
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item, index) => {
            const isActive = location.pathname === item.path
            return (
              <motion.button
                key={index}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  navigate(item.path)
                  setSidebarOpen(false)
                }}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            )
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button 
            variant="ghost" 
            className="w-full text-slate-300 hover:text-white hover:bg-slate-700"
            onClick={handleSignOut}
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-slate-800 border-b border-slate-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-slate-300"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search portfolio..."
                  className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                <Bell className="w-5 h-5" />
              </Button>
              
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback className="bg-blue-600 text-white text-sm">
                    {user?.user_metadata?.first_name?.[0]}{user?.user_metadata?.last_name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-sm">
                  <p className="font-medium">{user?.user_metadata?.first_name || 'Investor'}</p>
                  <p className="text-slate-400 text-xs">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Portfolio Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-center"
          >
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Portfolio Overview</h1>
              <p className="text-slate-400">Comprehensive view of your investment holdings</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => navigate('/portfolio/add-asset')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Asset
              </Button>
            </div>
          </motion.div>

          {/* Portfolio Summary Cards */}
          <motion.div 
            className="grid md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Total Portfolio Value</p>
                    <h3 className="text-2xl font-bold text-white">$195,000.00</h3>
                    <div className="flex items-center space-x-1 mt-1">
                      <ArrowUpRight className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 text-sm font-medium">+6.45%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-600 rounded-xl">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Total Assets</p>
                    <h3 className="text-2xl font-bold text-white">13</h3>
                    <div className="flex items-center space-x-1 mt-1">
                      <span className="text-slate-400 text-sm">Across 5 categories</span>
                    </div>
                  </div>
                  <div className="p-3 bg-green-600 rounded-xl">
                    <PieChart className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Today's P&L</p>
                    <h3 className="text-2xl font-bold text-green-400">+$2,845.30</h3>
                    <div className="flex items-center space-x-1 mt-1">
                      <ArrowUpRight className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 text-sm font-medium">+1.48%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-600 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Portfolio Allocation */}
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-slate-200">Portfolio Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={portfolioData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {portfolioData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-3 mt-4">
                    {portfolioData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-slate-300 text-sm">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-medium">{item.value}%</p>
                          <p className="text-slate-400 text-xs">${item.amount.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Performance Chart */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-slate-200">Performance by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={performanceData}>
                        <defs>
                          <linearGradient id="forexGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="cryptoGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="stocksGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                        <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                        <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(value) => `$${(value / 1000)}k`} />
                        <Tooltip 
                          formatter={(value) => [`$${value.toLocaleString()}`, '']}
                          labelStyle={{ color: '#1e293b' }}
                          contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                        />
                        <Legend />
                        <Area type="monotone" dataKey="forex" stroke="#3b82f6" fillOpacity={1} fill="url(#forexGradient)" strokeWidth={2} name="Forex" />
                        <Area type="monotone" dataKey="crypto" stroke="#f59e0b" fillOpacity={1} fill="url(#cryptoGradient)" strokeWidth={2} name="Cryptocurrencies" />
                        <Area type="monotone" dataKey="stocks" stroke="#10b981" fillOpacity={1} fill="url(#stocksGradient)" strokeWidth={2} name="Stock CFDs" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Detailed Holdings Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-200 flex items-center justify-between">
                  Holdings Details
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-3 text-slate-400 font-medium">Asset</th>
                        <th className="text-left py-3 text-slate-400 font-medium">Category</th>
                        <th className="text-left py-3 text-slate-400 font-medium">Price</th>
                        <th className="text-left py-3 text-slate-400 font-medium">24h Change</th>
                        <th className="text-left py-3 text-slate-400 font-medium">Holdings</th>
                        <th className="text-right py-3 text-slate-400 font-medium">Value</th>
                        <th className="text-right py-3 text-slate-400 font-medium">Allocation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {holdings.map((asset, index) => (
                        <motion.tr 
                          key={index}
                          className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.9 + (index * 0.05) }}
                        >
                          <td className="py-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-800 rounded-xl flex items-center justify-center border border-slate-600">
                                {asset.icon ? (
                                  <asset.icon className="w-5 h-5 text-white" />
                                ) : (
                                  <span className="text-xs font-bold text-white">{asset.symbol.slice(0, 2)}</span>
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-white">{asset.name}</p>
                                <p className="text-slate-400 text-sm">{asset.symbol}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4">
                            <Badge variant="outline" className="text-slate-300 border-slate-600">
                              {asset.category}
                            </Badge>
                          </td>
                          <td className="py-4 text-white font-medium">{asset.price}</td>
                          <td className="py-4">
                            <div className={`flex items-center space-x-1 ${
                              asset.isPositive ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {asset.isPositive ? (
                                <ArrowUpRight className="w-4 h-4" />
                              ) : (
                                <ArrowDownRight className="w-4 h-4" />
                              )}
                              <span className="font-medium">{asset.change}</span>
                            </div>
                          </td>
                          <td className="py-4 text-slate-300">{asset.holdings}</td>
                          <td className="py-4 text-right font-semibold text-white">{asset.value}</td>
                          <td className="py-4 text-right text-slate-300">{asset.allocation}%</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default Portfolio