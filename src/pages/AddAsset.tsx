import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { 
  ArrowLeft,
  Save,
  Settings, 
  LogOut,
  Bell,
  Menu,
  PieChart,
  BarChart3,
  Bitcoin,
  Globe,
  Landmark,
  BarChart2,
  Fuel,
  DollarSign,
  TrendingUp,
  AlertCircle
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { useNavigate, useLocation } from 'react-router-dom'

const AddAsset = () => {
  const { user, signOut } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const [formData, setFormData] = useState({
    assetName: '',
    symbol: '',
    category: '',
    quantity: '',
    price: '',
    notes: ''
  })

  const [errors, setErrors] = useState({})

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

  const assetCategories = [
    { value: 'forex', label: 'Forex', icon: Globe },
    { value: 'cryptocurrency', label: 'Cryptocurrency', icon: Bitcoin },
    { value: 'stock', label: 'Stock CFD', icon: Landmark },
    { value: 'index', label: 'Index', icon: BarChart2 },
    { value: 'commodity', label: 'Commodity', icon: Fuel },
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.assetName.trim()) {
      newErrors.assetName = 'Asset name is required'
    }
    
    if (!formData.symbol.trim()) {
      newErrors.symbol = 'Symbol is required'
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required'
    }
    
    if (!formData.quantity.trim()) {
      newErrors.quantity = 'Quantity is required'
    } else if (isNaN(parseFloat(formData.quantity)) || parseFloat(formData.quantity) <= 0) {
      newErrors.quantity = 'Quantity must be a positive number'
    }
    
    if (!formData.price.trim()) {
      newErrors.price = 'Price is required'
    } else if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Here you would typically save the asset to your database
      toast({
        title: "Asset Added Successfully!",
        description: `${formData.assetName} has been added to your portfolio.`
      })
      
      // Navigate back to portfolio
      navigate('/portfolio')
    }
  }

  const selectedCategory = assetCategories.find(cat => cat.value === formData.category)

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
              
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-300 hover:text-white"
                onClick={() => navigate('/portfolio')}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Portfolio
              </Button>
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
        <main className="flex-1 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Add New Asset</h1>
              <p className="text-slate-400">Add a new asset to your investment portfolio</p>
            </div>

            {/* Add Asset Form */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-200">Asset Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Asset Name */}
                  <div className="space-y-2">
                    <Label htmlFor="assetName" className="text-slate-300">Asset Name</Label>
                    <Input
                      id="assetName"
                      type="text"
                      placeholder="e.g., Bitcoin, Apple Inc., EUR/USD"
                      value={formData.assetName}
                      onChange={(e) => handleInputChange('assetName', e.target.value)}
                      className={`bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 ${
                        errors.assetName ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.assetName && (
                      <div className="flex items-center space-x-1 text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.assetName}</span>
                      </div>
                    )}
                  </div>

                  {/* Symbol */}
                  <div className="space-y-2">
                    <Label htmlFor="symbol" className="text-slate-300">Symbol</Label>
                    <Input
                      id="symbol"
                      type="text"
                      placeholder="e.g., BTC, AAPL, EURUSD"
                      value={formData.symbol}
                      onChange={(e) => handleInputChange('symbol', e.target.value.toUpperCase())}
                      className={`bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 ${
                        errors.symbol ? 'border-red-500' : ''
                      }`}
                    />
                    {errors.symbol && (
                      <div className="flex items-center space-x-1 text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.symbol}</span>
                      </div>
                    )}
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-slate-300">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger className={`bg-slate-700 border-slate-600 text-white focus:border-blue-500 ${
                        errors.category ? 'border-red-500' : ''
                      }`}>
                        <SelectValue placeholder="Select asset category" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        {assetCategories.map((category) => (
                          <SelectItem 
                            key={category.value} 
                            value={category.value}
                            className="text-white hover:bg-slate-600 focus:bg-slate-600"
                          >
                            <div className="flex items-center space-x-2">
                              <category.icon className="w-4 h-4" />
                              <span>{category.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <div className="flex items-center space-x-1 text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.category}</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Quantity */}
                    <div className="space-y-2">
                      <Label htmlFor="quantity" className="text-slate-300">
                        Quantity {selectedCategory && (
                          <span className="text-slate-400 text-sm">
                            ({selectedCategory.value === 'forex' ? 'lots' : 
                              selectedCategory.value === 'cryptocurrency' ? 'coins' :
                              selectedCategory.value === 'commodity' ? 'units' : 'shares'})
                          </span>
                        )}
                      </Label>
                      <Input
                        id="quantity"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={formData.quantity}
                        onChange={(e) => handleInputChange('quantity', e.target.value)}
                        className={`bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 ${
                          errors.quantity ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.quantity && (
                        <div className="flex items-center space-x-1 text-red-400 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          <span>{errors.quantity}</span>
                        </div>
                      )}
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-slate-300">Price per Unit ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        className={`bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 ${
                          errors.price ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.price && (
                        <div className="flex items-center space-x-1 text-red-400 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          <span>{errors.price}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Total Value Display */}
                  {formData.quantity && formData.price && !isNaN(parseFloat(formData.quantity)) && !isNaN(parseFloat(formData.price)) && (
                    <div className="p-4 bg-slate-700 rounded-lg border border-slate-600">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Total Value:</span>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-5 h-5 text-green-400" />
                          <span className="text-xl font-bold text-white">
                            {(parseFloat(formData.quantity) * parseFloat(formData.price)).toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-slate-300">Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Add any additional notes about this asset..."
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 min-h-[100px]"
                    />
                  </div>

                  {/* Form Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                      onClick={() => navigate('/portfolio')}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Add Asset
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default AddAsset