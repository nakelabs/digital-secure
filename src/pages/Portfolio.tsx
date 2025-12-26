import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  ArrowLeft,
  Plus,
  Settings, 
  LogOut,
  Bell,
  Menu,
  PieChart,
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  AlertCircle,
  Bitcoin,
  Globe,
  Landmark,
  BarChart2,
  Fuel,
  RefreshCw
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { useNavigate, useLocation } from 'react-router-dom'
import { dbService } from '@/services/database'
import { supabase } from '@/lib/supabase'

const Portfolio = () => {
  const { user, signOut } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [portfolioData, setPortfolioData] = useState(null)
  const [assets, setAssets] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

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

  const categoryIcons = {
    forex: Globe,
    cryptocurrency: Bitcoin,
    stock: Landmark,
    index: BarChart2,
    commodity: Fuel,
  }

  const loadPortfolioData = async () => {
    try {
      setIsLoading(true)
      console.log('Loading portfolio data...')
      
      // Test basic user access first
      const { data: { user } } = await supabase.auth.getUser()
      console.log('Current user:', user?.id, user?.email)
      
      const userAssets = await dbService.getUserAssets()
      console.log('User assets loaded:', userAssets.length, 'assets')
      
      const stats = await dbService.getPortfolioStats()
      console.log('Portfolio stats calculated:', stats)
      
      setPortfolioData(stats)
      setAssets(userAssets)
    } catch (error) {
      console.error('Detailed error loading portfolio:', error)
      console.error('Error message:', error.message)
      console.error('Error details:', error.details)
      console.error('Error code:', error.code)
      
      toast({
        title: "Error loading portfolio",
        description: `Failed to load portfolio: ${error.message || 'Unknown error'}`,
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const refreshPortfolio = async () => {
    try {
      setRefreshing(true)
      await loadPortfolioData()
      toast({
        title: "Portfolio refreshed",
        description: "Your portfolio data has been updated."
      })
    } catch (error) {
      toast({
        title: "Error refreshing",
        description: "Failed to refresh portfolio data.",
        variant: "destructive"
      })
    } finally {
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadPortfolioData()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-slate-300">Loading your portfolio...</p>
        </div>
      </div>
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-600'
      case 'active': return 'bg-green-600'
      case 'sold': return 'bg-gray-600'
      default: return 'bg-blue-600'
    }
  }

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
              
              <h1 className="text-xl font-semibold text-white">Portfolio</h1>
            </div>

            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-slate-300 hover:text-white"
                onClick={refreshPortfolio}
                disabled={refreshing}
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              </Button>
              
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
        <main className="flex-1 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Portfolio Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Total Invested</p>
                      <p className="text-2xl font-bold text-white">
                        {portfolioData?.totalInvested?.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD'
                        }) || '$0.00'}
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Current Value</p>
                      <p className="text-2xl font-bold text-white">
                        {portfolioData?.currentValue?.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD'
                        }) || '$0.00'}
                      </p>
                    </div>
                    <Activity className="w-8 h-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Profit/Loss</p>
                      <p className={`text-2xl font-bold ${
                        (portfolioData?.profitLoss || 0) >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {portfolioData?.profitLoss?.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD'
                        }) || '$0.00'}
                      </p>
                    </div>
                    {(portfolioData?.profitLoss || 0) >= 0 ? (
                      <TrendingUp className="w-8 h-8 text-green-400" />
                    ) : (
                      <TrendingDown className="w-8 h-8 text-red-400" />
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Total Assets</p>
                      <p className="text-2xl font-bold text-white">
                        {portfolioData?.assetCount || 0}
                      </p>
                    </div>
                    <PieChart className="w-8 h-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Assets Table */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-slate-200">Your Assets</CardTitle>
                <Button 
                  onClick={() => navigate('/portfolio/add-asset')} 
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Asset
                </Button>
              </CardHeader>
              <CardContent>
                {assets.length === 0 ? (
                  <div className="text-center py-12">
                    <PieChart className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-300 mb-2">No Assets Yet</h3>
                    <p className="text-slate-500 mb-4">Start building your portfolio by adding your first asset</p>
                    <Button onClick={() => navigate('/portfolio/add-asset')} className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Asset
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-700">
                          <th className="text-left text-slate-300 font-medium p-3">Asset</th>
                          <th className="text-left text-slate-300 font-medium p-3">Category</th>
                          <th className="text-right text-slate-300 font-medium p-3">Investment</th>
                          <th className="text-right text-slate-300 font-medium p-3">Current Value</th>
                          <th className="text-right text-slate-300 font-medium p-3">P&L</th>
                          <th className="text-center text-slate-300 font-medium p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assets.map((asset, index) => {
                          const IconComponent = categoryIcons[asset.category] || AlertCircle
                          const profitLoss = asset.current_value - asset.investment_amount
                          const profitLossPercentage = asset.investment_amount > 0 ? (profitLoss / asset.investment_amount) * 100 : 0
                          
                          return (
                            <motion.tr
                              key={asset.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className="border-b border-slate-700/50 hover:bg-slate-700/20"
                            >
                              <td className="p-3">
                                <div className="flex items-center space-x-3">
                                  <div className="p-2 bg-slate-700 rounded-lg">
                                    <IconComponent className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-white">{asset.asset_name}</p>
                                    <p className="text-sm text-slate-400">{asset.symbol}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-3">
                                <span className="text-slate-300 capitalize">{asset.category}</span>
                              </td>
                              <td className="p-3 text-right">
                                <span className="text-white font-medium">
                                  {asset.investment_amount.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                  })}
                                </span>
                              </td>
                              <td className="p-3 text-right">
                                <span className="text-white font-medium">
                                  {asset.current_value.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                  })}
                                </span>
                              </td>
                              <td className="p-3 text-right">
                                <div className="text-right">
                                  <span className={`font-medium ${
                                    profitLoss >= 0 ? 'text-green-400' : 'text-red-400'
                                  }`}>
                                    {profitLoss.toLocaleString('en-US', {
                                      style: 'currency',
                                      currency: 'USD'
                                    })}
                                  </span>
                                  <p className={`text-sm ${
                                    profitLossPercentage >= 0 ? 'text-green-400' : 'text-red-400'
                                  }`}>
                                    ({profitLossPercentage >= 0 ? '+' : ''}{profitLossPercentage.toFixed(2)}%)
                                  </p>
                                </div>
                              </td>
                              <td className="p-3 text-center">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(asset.status)}`}>
                                  {asset.status}
                                </span>
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

export default Portfolio