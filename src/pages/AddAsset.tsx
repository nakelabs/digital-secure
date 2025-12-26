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
  AlertCircle,
  CreditCard,
  Building2,
  Banknote,
  ArrowRight,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { useNavigate, useLocation } from 'react-router-dom'
import { dbService } from '@/services/database'

const AddAsset = () => {
  const { user, signOut } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState('asset') // 'asset', 'payment', 'alternative'
  const [showCardError, setShowCardError] = useState(false)
  
  const [formData, setFormData] = useState({
    assetName: '',
    symbol: '',
    category: '',
    quantity: '',
    price: '',
    notes: ''
  })

  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  })

  const [errors, setErrors] = useState({})
  const [cardErrors, setCardErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

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
    
    // Quantity validation removed as we only need investment amount
    
    if (!formData.price.trim()) {
      newErrors.price = 'Investment amount is required'
    } else if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Investment amount must be a positive number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      setCurrentStep('payment')
    }
  }

  const validateCardForm = () => {
    const newErrors = {}
    
    if (!cardData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required'
    } else if (cardData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Card number must be 16 digits'
    }
    
    if (!cardData.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required'
    }
    
    if (!cardData.cvv.trim()) {
      newErrors.cvv = 'CVV is required'
    } else if (cardData.cvv.length < 3) {
      newErrors.cvv = 'CVV must be at least 3 digits'
    }
    
    if (!cardData.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required'
    }

    setCardErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCardPayment = (e) => {
    e.preventDefault()
    
    if (validateCardForm()) {
      // Simulate payment processing delay
      setTimeout(() => {
        setShowCardError(true)
        toast({
          title: "Payment Failed",
          description: "Unable to process card payment. Please try an alternative payment method.",
          variant: "destructive"
        })
        setCurrentStep('alternative')
      }, 2000)
    }
  }

  const handleCardInputChange = (field, value) => {
    // Format card number with spaces
    if (field === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
      if (value.length > 19) value = value.substr(0, 19)
    }
    // Format expiry date
    if (field === 'expiryDate') {
      value = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2')
      if (value.length > 5) value = value.substr(0, 5)
    }
    // CVV should be only numbers
    if (field === 'cvv') {
      value = value.replace(/\D/g, '')
      if (value.length > 4) value = value.substr(0, 4)
    }
    
    setCardData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (cardErrors[field]) {
      setCardErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleAssetPurchase = async () => {
    setIsLoading(true)
    try {
      // Create the asset in database
      await dbService.createUserAsset({
        asset_name: formData.assetName,
        symbol: formData.symbol,
        category: formData.category,
        investment_amount: parseFloat(formData.price),
        current_value: parseFloat(formData.price), // Initially same as investment
        quantity: 0, // To be updated by admin when asset is actually purchased
        notes: formData.notes,
        status: 'pending'
      })

      // Create transaction record
      await dbService.createTransaction({
        type: 'purchase',
        amount: parseFloat(formData.price),
        description: `Investment in ${formData.assetName} (${formData.symbol})`
      })

      // Update user balance
      const currentBalance = await dbService.getUserBalance()
      await dbService.updateUserBalance({
        total_invested: (currentBalance?.total_invested || 0) + parseFloat(formData.price),
        current_portfolio_value: (currentBalance?.current_portfolio_value || 0) + parseFloat(formData.price)
      })

      toast({
        title: "Investment Request Submitted",
        description: "Your investment request has been submitted successfully. Our team will purchase the asset for you.",
      })

      navigate('/portfolio')
    } catch (error) {
      console.error('Error submitting investment:', error)
      toast({
        title: "Error",
        description: "Failed to submit investment request. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Update the payment methods to navigate to payment pages
  const handlePaymentMethod = (method: string) => {
    const routes = {
      'Bank Transfer': '/payment/bank-transfer',
      'Wire Transfer': '/payment/wire-transfer',
      'PayPal': '/payment/paypal'
    }
    
    // Navigate to the respective payment page with the investment amount
    navigate(routes[method], { 
      state: { 
        amount: formData.investment_amount,
        asset: formData
      } 
    })
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
            {/* Asset Selection Step */}
            {currentStep === 'asset' && (
              <>
                {/* Page Header */}
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-white mb-2">Purchase Asset</h1>
                  <p className="text-slate-400">Choose the asset you want and pay - we'll acquire it for you</p>
                </div>

                {/* Add Asset Form */}
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-slate-200">Select Asset to Purchase</CardTitle>
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

                      {/* Investment Amount */}
                      <div className="space-y-2">
                        <Label htmlFor="price" className="text-slate-300">Investment Amount ($)</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          placeholder="Enter amount you want to invest"
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
                        <p className="text-slate-400 text-sm">We will use this amount to purchase the selected asset for your portfolio</p>
                      </div>

                      {/* Investment Summary */}
                      {formData.price && !isNaN(parseFloat(formData.price)) && parseFloat(formData.price) > 0 && (
                        <div className="p-4 bg-slate-700 rounded-lg border border-slate-600">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-slate-300">Investment Amount:</span>
                              <div className="flex items-center space-x-2">
                                <DollarSign className="w-5 h-5 text-green-400" />
                                <span className="text-xl font-bold text-white">
                                  {parseFloat(formData.price).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                  })}
                                </span>
                              </div>
                            </div>
                            <div className="text-sm text-blue-300 bg-blue-900/20 p-3 rounded">
                              <TrendingUp className="w-4 h-4 inline mr-2" />
                              Our team will purchase {formData.assetName || 'the selected asset'} with your funds and add it to your portfolio
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Notes */}
                      <div className="space-y-2">
                        <Label htmlFor="notes" className="text-slate-300">Notes (Optional)</Label>
                        <Textarea
                          id="notes"
                          placeholder="Any special instructions for the purchase..."
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
                          <ArrowRight className="w-4 h-4 mr-2" />
                          Proceed to Payment
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Card Payment Step */}
            {currentStep === 'payment' && (
              <>
                <div className="mb-8">
                  <Button
                    variant="ghost"
                    className="text-slate-300 hover:text-white mb-4"
                    onClick={() => setCurrentStep('asset')}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Asset Selection
                  </Button>
                  <h1 className="text-3xl font-bold text-white mb-2">Payment Details</h1>
                  <p className="text-slate-400">Enter your card details to complete the purchase</p>
                </div>

                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-slate-200 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Credit Card Payment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Purchase Summary */}
                    <div className="bg-slate-700 p-4 rounded-lg mb-6">
                      <h3 className="font-semibold text-white mb-2">Purchase Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-300">Asset:</span>
                          <span className="text-white">{formData.assetName} ({formData.symbol})</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Investment Amount:</span>
                          <span className="text-white font-semibold">
                            {parseFloat(formData.price).toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleCardPayment} className="space-y-6">
                      {/* Cardholder Name */}
                      <div className="space-y-2">
                        <Label htmlFor="cardholderName" className="text-slate-300">Cardholder Name</Label>
                        <Input
                          id="cardholderName"
                          type="text"
                          placeholder="Full name on card"
                          value={cardData.cardholderName}
                          onChange={(e) => handleCardInputChange('cardholderName', e.target.value)}
                          className={`bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 ${
                            cardErrors.cardholderName ? 'border-red-500' : ''
                          }`}
                        />
                        {cardErrors.cardholderName && (
                          <div className="flex items-center space-x-1 text-red-400 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            <span>{cardErrors.cardholderName}</span>
                          </div>
                        )}
                      </div>

                      {/* Card Number */}
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber" className="text-slate-300">Card Number</Label>
                        <Input
                          id="cardNumber"
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={cardData.cardNumber}
                          onChange={(e) => handleCardInputChange('cardNumber', e.target.value)}
                          className={`bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 ${
                            cardErrors.cardNumber ? 'border-red-500' : ''
                          }`}
                        />
                        {cardErrors.cardNumber && (
                          <div className="flex items-center space-x-1 text-red-400 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            <span>{cardErrors.cardNumber}</span>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {/* Expiry Date */}
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate" className="text-slate-300">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            type="text"
                            placeholder="MM/YY"
                            value={cardData.expiryDate}
                            onChange={(e) => handleCardInputChange('expiryDate', e.target.value)}
                            className={`bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 ${
                              cardErrors.expiryDate ? 'border-red-500' : ''
                            }`}
                          />
                          {cardErrors.expiryDate && (
                            <div className="flex items-center space-x-1 text-red-400 text-sm">
                              <AlertCircle className="w-4 h-4" />
                              <span>{cardErrors.expiryDate}</span>
                            </div>
                          )}
                        </div>

                        {/* CVV */}
                        <div className="space-y-2">
                          <Label htmlFor="cvv" className="text-slate-300">CVV</Label>
                          <Input
                            id="cvv"
                            type="text"
                            placeholder="123"
                            value={cardData.cvv}
                            onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                            className={`bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 ${
                              cardErrors.cvv ? 'border-red-500' : ''
                            }`}
                          />
                          {cardErrors.cvv && (
                            <div className="flex items-center space-x-1 text-red-400 text-sm">
                              <AlertCircle className="w-4 h-4" />
                              <span>{cardErrors.cvv}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 pt-6">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                          onClick={() => setCurrentStep('asset')}
                        >
                          Back
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                        >
                          <CreditCard className="w-4 h-4 mr-2" />
                          Pay {parseFloat(formData.price).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Alternative Payment Methods */}
            {currentStep === 'alternative' && (
              <>
                <div className="mb-8">
                  {showCardError && (
                    <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <XCircle className="w-5 h-5 text-red-400" />
                        <h3 className="font-semibold text-red-400">Card Payment Failed</h3>
                      </div>
                      <p className="text-red-200 text-sm mt-2">We're unable to process card payments at this time. Please choose an alternative payment method below.</p>
                    </div>
                  )}
                  <h1 className="text-3xl font-bold text-white mb-2">Alternative Payment Methods</h1>
                  <p className="text-slate-400">Choose a payment method to complete your purchase</p>
                </div>

                <div className="space-y-4">
                  {/* Bank Transfer */}
                  <Card className="bg-slate-800 border-slate-700 hover:border-blue-500 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-blue-100 rounded-lg">
                            <Building2 className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">Bank Transfer</h3>
                            <p className="text-slate-400 text-sm">Direct transfer from your bank account</p>
                            <p className="text-green-400 text-sm">• Secure & Reliable • 1-3 business days</p>
                          </div>
                        </div>
                        <Button 
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => handlePaymentMethod('Bank Transfer')}
                          disabled={isLoading}
                        >
                          <Building2 className="w-4 h-4 mr-2" />
                          {isLoading ? 'Processing...' : 'Choose Bank Transfer'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Wire Transfer */}
                  <Card className="bg-slate-800 border-slate-700 hover:border-blue-500 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-green-100 rounded-lg">
                            <Banknote className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">Wire Transfer</h3>
                            <p className="text-slate-400 text-sm">International wire transfer</p>
                            <p className="text-green-400 text-sm">• Global Support • Same day processing</p>
                          </div>
                        </div>
                        <Button 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handlePaymentMethod('Wire Transfer')}
                          disabled={isLoading}
                        >
                          <Banknote className="w-4 h-4 mr-2" />
                          {isLoading ? 'Processing...' : 'Choose Wire Transfer'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* PayPal */}
                  <Card className="bg-slate-800 border-slate-700 hover:border-blue-500 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-yellow-100 rounded-lg">
                            <DollarSign className="w-6 h-6 text-yellow-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">PayPal</h3>
                            <p className="text-slate-400 text-sm">Pay with your PayPal account</p>
                            <p className="text-green-400 text-sm">• Instant • Buyer Protection</p>
                          </div>
                        </div>
                        <Button 
                          className="bg-yellow-600 hover:bg-yellow-700"
                          onClick={() => handlePaymentMethod('PayPal')}
                          disabled={isLoading}
                        >
                          <DollarSign className="w-4 h-4 mr-2" />
                          {isLoading ? 'Processing...' : 'Pay with PayPal'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-8 text-center">
                  <Button
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    onClick={() => setCurrentStep('asset')}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Asset Selection
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default AddAsset