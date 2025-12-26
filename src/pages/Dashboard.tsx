import React, { useState, useEffect } from 'react'
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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts'
import { dbService } from '@/services/database'

const Dashboard = () => {
  const { user, signOut } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [portfolioData, setPortfolioData] = useState(null)
  const [assets, setAssets] = useState([])
  const [isLoading, setIsLoading] = useState(true)

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

  // Load real portfolio data from database
  const loadDashboardData = async () => {
    try {
      setIsLoading(true)
      const stats = await dbService.getPortfolioStats()
      const userAssets = await dbService.getUserAssets()
      
      setPortfolioData(stats)
      setAssets(userAssets)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
      toast({
        title: "Error loading dashboard",
        description: "Failed to load your dashboard data. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      loadDashboardData()
    }
  }, [user])

  // Generate chart data based on user's actual portfolio over time
  // For now, we'll show a simple growth chart. In production, you'd store historical data
  const generateChartData = () => {
    if (!portfolioData || portfolioData.assetCount === 0) {
      return []
    }
    
    const today = new Date()
    const data = []
    
    // Generate sample historical data based on current portfolio value
    for (let i = 11; i >= 0; i--) {
      const date = new Date(today)
      date.setMonth(date.getMonth() - i)
      
      // Simulate historical growth with some randomness
      const baseValue = portfolioData.currentValue
      const growthFactor = 1 - (i * 0.08) + (Math.random() * 0.1 - 0.05)
      
      data.push({
        year: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
        value: Math.max(0, Math.round(baseValue * growthFactor))
      })
    }
    
    return data
  }

  const chartData = generateChartData()

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
                    <h2 className="text-4xl font-bold text-white mb-2">
                      ${portfolioData ? portfolioData.currentValue.toLocaleString() : '0.00'}
                    </h2>
                    <div className="flex items-center space-x-2">
                      {portfolioData && portfolioData.profitLoss !== 0 && (
                        <Badge className={portfolioData.profitLoss >= 0 ? "bg-green-600 hover:bg-green-700 text-white" : "bg-red-600 hover:bg-red-700 text-white"}>
                          {portfolioData.profitLoss >= 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                          {portfolioData.profitLoss >= 0 ? '+' : ''}{portfolioData.profitLossPercentage.toFixed(2)}%
                        </Badge>
                      )}
                      {portfolioData && portfolioData.profitLoss !== 0 && (
                        <span className={`text-sm ${portfolioData.profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {portfolioData.profitLoss >= 0 ? '+' : ''}${Math.abs(portfolioData.profitLoss).toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 text-sm text-slate-400">
                      {portfolioData && portfolioData.assetCount > 0 ? 'Your portfolio' : 'Start investing today'}
                    </div>
                  </div>
                  <div className="hidden md:flex space-x-6">
                    <div className="text-center">
                      <p className="text-2xl font-semibold text-blue-400">
                        ${portfolioData ? portfolioData.totalInvested.toLocaleString() : '0'}
                      </p>
                      <p className="text-slate-400 text-sm">Total Invested</p>
                    </div>
                    <div className="text-center">
                      <p className={`text-2xl font-semibold ${portfolioData && portfolioData.profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {portfolioData && portfolioData.profitLoss !== 0 ? 
                          `${portfolioData.profitLoss >= 0 ? '+' : ''}$${Math.abs(portfolioData.profitLoss).toLocaleString()}` : 
                          '$0'
                        }
                      </p>
                      <p className="text-slate-400 text-sm">Total Gains/Loss</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-semibold text-purple-400">{portfolioData ? portfolioData.assetCount : 0}</p>
                      <p className="text-slate-400 text-sm">Assets</p>
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
                    <Button variant="ghost" size="sm" className="text-xs text-slate-400 hover:text-white">1Y</Button>
                    <Button variant="ghost" size="sm" className="text-xs text-slate-400 hover:text-white">5Y</Button>
                    <Button variant="ghost" size="sm" className="text-xs text-slate-400 hover:text-white">10Y</Button>
                    <Button variant="ghost" size="sm" className="text-xs bg-blue-600 text-white hover:bg-blue-700">All</Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#475569" opacity={0.3} />
                      <XAxis 
                        dataKey="year" 
                        stroke="#94a3b8"
                        fontSize={11}
                        interval="preserveStartEnd"
                        tick={{ fill: '#94a3b8' }}
                      />
                      <YAxis 
                        stroke="#94a3b8"
                        fontSize={11}
                        tickFormatter={(value) => `$${(value / 1000)}k`}
                        domain={['dataMin - 5000', 'dataMax + 5000']}
                        tick={{ fill: '#94a3b8' }}
                      />
                      <Tooltip 
                        formatter={(value) => [`$${parseInt(value).toLocaleString()}`, 'Portfolio Value']}
                        labelFormatter={(label) => `Year: ${label}`}
                        contentStyle={{ 
                          backgroundColor: '#1e293b', 
                          border: '1px solid #475569',
                          borderRadius: '8px',
                          color: '#f1f5f9'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 5, stroke: '#3b82f6', strokeWidth: 2, fill: '#3b82f6' }}
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
                {isLoading ? (
                  <div className="text-center py-8 text-slate-400">
                    <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                    Loading your portfolio...
                  </div>
                ) : assets.length === 0 ? (
                  <div className="text-center py-8 text-slate-400">
                    <p className="mb-4">No assets in your portfolio yet.</p>
                    <Button 
                      onClick={() => navigate('/portfolio')} 
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Add Your First Asset
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-700">
                          <th className="text-left py-3 text-slate-400 font-medium">Asset</th>
                          <th className="text-left py-3 text-slate-400 font-medium">Category</th>
                          <th className="text-left py-3 text-slate-400 font-medium">Investment</th>
                          <th className="text-left py-3 text-slate-400 font-medium">Current Value</th>
                          <th className="text-right py-3 text-slate-400 font-medium">P&L</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assets.map((asset, index) => {
                          const profitLoss = asset.current_value - asset.investment_amount
                          const profitLossPercent = asset.investment_amount > 0 ? (profitLoss / asset.investment_amount) * 100 : 0
                          const isPositive = profitLoss >= 0

                          return (
                            <motion.tr 
                              key={asset.id}
                              className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors cursor-pointer"
                              onClick={() => navigate('/portfolio')}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: 0.5 + (index * 0.1) }}
                            >
                              <td className="py-4">
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <span className="text-xs font-bold">{asset.symbol?.[0] || asset.asset_name?.[0] || '?'}</span>
                                  </div>
                                  <div>
                                    <p className="font-medium text-white">{asset.asset_name}</p>
                                    <p className="text-slate-400 text-sm">{asset.symbol}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4">
                                <Badge variant="secondary" className="bg-slate-700 text-slate-300 capitalize">
                                  {asset.category}
                                </Badge>
                              </td>
                              <td className="py-4 text-white font-medium">${asset.investment_amount.toLocaleString()}</td>
                              <td className="py-4 text-white font-medium">${asset.current_value.toLocaleString()}</td>
                              <td className="py-4 text-right">
                                <div className={`flex items-center justify-end space-x-1 ${
                                  isPositive ? 'text-green-400' : 'text-red-400'
                                }`}>
                                  {isPositive ? (
                                    <ArrowUpRight className="w-4 h-4" />
                                  ) : (
                                    <ArrowDownRight className="w-4 h-4" />
                                  )}
                                  <div className="text-right">
                                    <p className="font-semibold">${Math.abs(profitLoss).toLocaleString()}</p>
                                    <p className="text-xs">({profitLossPercent.toFixed(1)}%)</p>
                                  </div>
                                </div>
                              </td>
                            </motion.tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard