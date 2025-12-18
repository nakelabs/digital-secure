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
  Filter
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { useNavigate, useLocation } from 'react-router-dom'
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Pie } from 'recharts'

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
    { name: 'Cryptocurrency', value: 45, amount: 56053, color: '#3b82f6' },
    { name: 'Stocks', value: 30, amount: 37369, color: '#10b981' },
    { name: 'Alternative Assets', value: 25, amount: 31141, color: '#8b5cf6' },
  ]

  // Detailed holdings
  const holdings = [
    { 
      name: 'Bitcoin', 
      symbol: 'BTC', 
      category: 'Cryptocurrency',
      price: '$43,250.00', 
      change: '+5.67%', 
      holdings: '2.45 BTC',
      value: '$105,962.50',
      allocation: 42.5,
      isPositive: true 
    },
    { 
      name: 'Ethereum', 
      symbol: 'ETH', 
      category: 'Cryptocurrency',
      price: '$2,680.00', 
      change: '+3.21%', 
      holdings: '15.8 ETH',
      value: '$42,344.00',
      allocation: 17.0,
      isPositive: true 
    },
    { 
      name: 'Apple Inc.', 
      symbol: 'AAPL', 
      category: 'Stocks',
      price: '$185.20', 
      change: '-1.15%', 
      holdings: '50 shares',
      value: '$9,260.00',
      allocation: 3.7,
      isPositive: false 
    },
    { 
      name: 'Tesla Inc.', 
      symbol: 'TSLA', 
      category: 'Stocks',
      price: '$248.50', 
      change: '+2.89%', 
      holdings: '25 shares',
      value: '$6,212.50',
      allocation: 2.5,
      isPositive: true 
    },
    { 
      name: 'Google', 
      symbol: 'GOOGL', 
      category: 'Stocks',
      price: '$142.30', 
      change: '+0.95%', 
      holdings: '12 shares',
      value: '$1,707.60',
      allocation: 0.7,
      isPositive: true 
    },
    { 
      name: 'Real Estate Fund', 
      symbol: 'REIT', 
      category: 'Alternative Assets',
      price: '$85.40', 
      change: '+1.23%', 
      holdings: '150 units',
      value: '$12,810.00',
      allocation: 5.2,
      isPositive: true 
    }
  ]

  // Performance data for the past months
  const performanceData = [
    { month: 'Jul', crypto: 45000, stocks: 32000, alternatives: 25000 },
    { month: 'Aug', crypto: 48000, stocks: 33500, alternatives: 27000 },
    { month: 'Sep', crypto: 52000, stocks: 35000, alternatives: 28500 },
    { month: 'Oct', crypto: 55000, stocks: 36500, alternatives: 30000 },
    { month: 'Nov', crypto: 54000, stocks: 37000, alternatives: 31000 },
    { month: 'Dec', crypto: 56053, stocks: 37369, alternatives: 31141 },
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
              <Button className="bg-blue-600 hover:bg-blue-700">
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
                    <h3 className="text-2xl font-bold text-white">$124,563.00</h3>
                    <div className="flex items-center space-x-1 mt-1">
                      <ArrowUpRight className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 text-sm font-medium">+8.23%</span>
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
                    <h3 className="text-2xl font-bold text-white">6</h3>
                    <div className="flex items-center space-x-1 mt-1">
                      <span className="text-slate-400 text-sm">Across 3 categories</span>
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
                    <h3 className="text-2xl font-bold text-green-400">+$4,287.50</h3>
                    <div className="flex items-center space-x-1 mt-1">
                      <ArrowUpRight className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 text-sm font-medium">+3.56%</span>
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
                      <BarChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                        <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                        <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(value) => `$${(value / 1000)}k`} />
                        <Tooltip 
                          formatter={(value) => [`$${value.toLocaleString()}`, '']}
                          labelStyle={{ color: '#1e293b' }}
                          contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                        />
                        <Legend />
                        <Bar dataKey="crypto" fill="#3b82f6" name="Cryptocurrency" />
                        <Bar dataKey="stocks" fill="#10b981" name="Stocks" />
                        <Bar dataKey="alternatives" fill="#8b5cf6" name="Alternatives" />
                      </BarChart>
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
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold">{asset.symbol[0]}</span>
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