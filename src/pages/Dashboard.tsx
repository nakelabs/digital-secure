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
  Activity, 
  Settings, 
  LogOut,
  Bell,
  Search,
  BarChart3,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Menu,
  X
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { useNavigate, useLocation } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'

const Dashboard = () => {
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

  // Sample chart data
  const chartData = [
    { name: 'Jan', value: 85000 },
    { name: 'Feb', value: 92000 },
    { name: 'Mar', value: 88000 },
    { name: 'Apr', value: 95000 },
    { name: 'May', value: 108000 },
    { name: 'Jun', value: 124500 },
  ]

  // Sample assets data
  const assets = [
    { 
      name: 'Bitcoin', 
      symbol: 'BTC', 
      price: '$43,250.00', 
      change: '+5.67%', 
      holdings: '2.45 BTC',
      value: '$105,962.50',
      isPositive: true 
    },
    { 
      name: 'Ethereum', 
      symbol: 'ETH', 
      price: '$2,680.00', 
      change: '+3.21%', 
      holdings: '15.8 ETH',
      value: '$42,344.00',
      isPositive: true 
    },
    { 
      name: 'Apple Inc.', 
      symbol: 'AAPL', 
      price: '$185.20', 
      change: '-1.15%', 
      holdings: '50 shares',
      value: '$9,260.00',
      isPositive: false 
    },
    { 
      name: 'Tesla Inc.', 
      symbol: 'TSLA', 
      price: '$248.50', 
      change: '+2.89%', 
      holdings: '25 shares',
      value: '$6,212.50',
      isPositive: true 
    },
    { 
      name: 'Google', 
      symbol: 'GOOGL', 
      price: '$142.30', 
      change: '+0.95%', 
      holdings: '12 shares',
      value: '$1,707.60',
      isPositive: true 
    }
  ]

  const sidebarItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/dashboard' },
    { icon: PieChart, label: 'Portfolio', path: '/portfolio' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ]

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
                  placeholder="Search assets, transactions..."
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
          {/* Portfolio Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-200">Portfolio Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-4xl font-bold text-white mb-2">$124,500.00</h2>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-600 hover:bg-green-700 text-white">
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                        +5.4% today
                      </Badge>
                      <span className="text-slate-400 text-sm">+$6,378.50</span>
                    </div>
                  </div>
                  <div className="hidden md:flex space-x-4">
                    <div className="text-center">
                      <p className="text-2xl font-semibold text-green-400">+$12,450</p>
                      <p className="text-slate-400 text-sm">This Month</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-semibold text-blue-400">+$45,200</p>
                      <p className="text-slate-400 text-sm">Total Gains</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-200 flex items-center justify-between">
                  Portfolio Growth
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="text-xs text-slate-400 hover:text-white">1D</Button>
                    <Button variant="ghost" size="sm" className="text-xs text-slate-400 hover:text-white">1W</Button>
                    <Button variant="ghost" size="sm" className="text-xs bg-blue-600 text-white hover:bg-blue-700">6M</Button>
                    <Button variant="ghost" size="sm" className="text-xs text-slate-400 hover:text-white">1Y</Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                      <XAxis 
                        dataKey="name" 
                        stroke="#94a3b8"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="#94a3b8"
                        fontSize={12}
                        tickFormatter={(value) => `$${(value / 1000)}k`}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Asset Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-200">Your Holdings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-3 text-slate-400 font-medium">Asset</th>
                        <th className="text-left py-3 text-slate-400 font-medium">Price</th>
                        <th className="text-left py-3 text-slate-400 font-medium">24h Change</th>
                        <th className="text-left py-3 text-slate-400 font-medium">Holdings</th>
                        <th className="text-right py-3 text-slate-400 font-medium">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assets.map((asset, index) => (
                        <motion.tr 
                          key={index}
                          className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.5 + (index * 0.1) }}
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

export default Dashboard