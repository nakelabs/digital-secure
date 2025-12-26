import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Edit3,
  Plus,
  Trash2,
  RefreshCw,
  Search,
  ArrowLeft,
  Save,
  X,
  Activity,
  PieChart,
  BarChart3,
  Bitcoin,
  Globe,
  Landmark,
  BarChart2,
  Fuel,
  Shield,
  Lock
} from 'lucide-react'
import { UserAsset } from '@/services/database'
import { adminService, UserWithStats } from '@/services/adminService'

const Admin = () => {
  const { toast } = useToast()
  const { user } = useAuth()
  const [users, setUsers] = useState<UserWithStats[]>([])
  const [selectedUser, setSelectedUser] = useState<UserWithStats | null>(null)
  const [userAssets, setUserAssets] = useState<UserAsset[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingAsset, setEditingAsset] = useState<UserAsset | null>(null)
  const [showAddAsset, setShowAddAsset] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminPassword, setAdminPassword] = useState('')
  const [showAdminLogin, setShowAdminLogin] = useState(true)
  const [newAsset, setNewAsset] = useState({
    asset_name: '',
    symbol: '',
    category: 'cryptocurrency',
    investment_amount: 0,
    current_value: 0,
    quantity: 0,
    notes: '',
    status: 'active' as const
  })

  const categoryIcons = {
    forex: Globe,
    cryptocurrency: Bitcoin,
    stock: Landmark,
    index: BarChart2,
    commodity: Fuel,
  }

  const assetCategories = [
    { value: 'forex', label: 'Forex' },
    { value: 'cryptocurrency', label: 'Cryptocurrency' },
    { value: 'stock', label: 'Stock CFD' },
    { value: 'index', label: 'Index' },
    { value: 'commodity', label: 'Commodity' },
  ]

  useEffect(() => {
    if (user) {
      checkAdminAccess()
    } else {
      setIsLoading(false)
      setShowAdminLogin(true)
    }
  }, [user])

  const checkAdminAccess = async () => {
    try {
      setIsLoading(true)
      console.log('Checking admin access for:', user?.email)
      
      // Check if user is admin by email or user metadata
      const isAdminUser = await verifyAdminUser(user!.email!, user!.id)
      
      console.log('Admin verification result:', isAdminUser)
      
      if (isAdminUser) {
        setIsAdmin(true)
        setShowAdminLogin(false)
        await loadUsers()
      } else {
        setShowAdminLogin(true)
      }
    } catch (error) {
      console.error('Error checking admin access:', error)
      setShowAdminLogin(true)
    } finally {
      setIsLoading(false)
    }
  }

  const verifyAdminUser = async (email: string, userId: string): Promise<boolean> => {
    try {
      console.log('Verifying admin user:', email, userId)
      
      // Method 1: Check by email (most reliable)
      const adminEmails = [
        'nakelabss@gmail.com',    // Your actual admin email
        'admin@yourcompany.com'   // Add more admin emails if needed
      ]
      
      if (adminEmails.includes(email.toLowerCase())) {
        console.log('User verified as admin by email')
        return true
      }

      // Method 2: Check user metadata for admin role
      const { data: userData } = await supabase.auth.getUser()
      if (userData.user?.user_metadata?.role === 'admin') {
        console.log('User verified as admin by metadata')
        return true
      }

      // Method 3: Check profiles table for admin flag
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('is_admin, role')
        .eq('id', userId)
        .single()

      if (error) {
        console.log('Profile check error (this is normal if profile doesn\'t exist):', error.message)
      }

      if (profile && (profile.is_admin || profile.role === 'admin')) {
        console.log('User verified as admin by profile')
        return true
      }

      console.log('User is not admin')
      return false
    } catch (error) {
      console.error('Error verifying admin user:', error)
      return false
    }
  }

  const handleAdminLogin = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "Please sign in first.",
        variant: "destructive"
      })
      return
    }

    // Simple password check (in production, use proper authentication)
    // TODO: Replace 'admin123' with your secure admin password
    const adminPasswords = [
      'admin123',           // Replace with your secure admin password
      'yourAdminPassword'   // Add backup admin password
    ]
    
    if (adminPasswords.includes(adminPassword)) {
      setIsAdmin(true)
      setShowAdminLogin(false)
      loadUsers()
      
      toast({
        title: "Admin Access Granted",
        description: "Welcome to the admin dashboard."
      })
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid admin password.",
        variant: "destructive"
      })
    }
  }

  const loadUsers = async () => {
    try {
      console.log('Loading users...')
      const data = await adminService.getAllUsersWithStats()
      console.log('Users loaded:', data.length, data)
      setUsers(data)
    } catch (error) {
      console.error('Error loading users:', error)
      toast({
        title: "Error",
        description: "Failed to load users. Please check your admin permissions.",
        variant: "destructive"
      })
      setUsers([]) // Set empty array instead of keeping loading state
    }
  }

  const loadUserAssets = async (userId: string) => {
    try {
      const assets = await adminService.getUserAssets(userId)
      setUserAssets(assets)
    } catch (error) {
      console.error('Error loading user assets:', error)
      toast({
        title: "Error",
        description: "Failed to load user assets.",
        variant: "destructive"
      })
    }
  }

  const selectUser = (user: UserWithStats) => {
    setSelectedUser(user)
    loadUserAssets(user.id)
    setEditingAsset(null)
    setShowAddAsset(false)
  }

  const updateAsset = async (assetId: string, updates: Partial<UserAsset>) => {
    try {
      await adminService.updateUserAsset(assetId, updates)
      await adminService.recalculateUserPortfolio(selectedUser!.id)
      
      // Reload data
      loadUserAssets(selectedUser!.id)
      loadUsers()
      
      toast({
        title: "Asset Updated",
        description: "Asset has been successfully updated."
      })
      setEditingAsset(null)
    } catch (error) {
      console.error('Error updating asset:', error)
      toast({
        title: "Error",
        description: "Failed to update asset.",
        variant: "destructive"
      })
    }
  }

  const addAsset = async () => {
    if (!selectedUser) return
    
    try {
      await adminService.addAssetToUser(selectedUser.id, newAsset)
      await adminService.recalculateUserPortfolio(selectedUser.id)
      
      // Reload data
      loadUserAssets(selectedUser.id)
      loadUsers()
      
      // Reset form
      setNewAsset({
        asset_name: '',
        symbol: '',
        category: 'cryptocurrency',
        investment_amount: 0,
        current_value: 0,
        quantity: 0,
        notes: '',
        status: 'active'
      })
      setShowAddAsset(false)
      
      toast({
        title: "Asset Added",
        description: "Asset has been successfully added to user's portfolio."
      })
    } catch (error) {
      console.error('Error adding asset:', error)
      toast({
        title: "Error",
        description: "Failed to add asset.",
        variant: "destructive"
      })
    }
  }

  const deleteAsset = async (assetId: string) => {
    if (!confirm('Are you sure you want to delete this asset?')) return
    
    try {
      console.log('Deleting asset:', assetId)
      await adminService.deleteUserAsset(assetId)
      
      // Recalculate portfolio after deletion
      if (selectedUser) {
        await adminService.recalculateUserPortfolio(selectedUser.id)
      }
      
      // Reload data
      if (selectedUser) {
        loadUserAssets(selectedUser.id)
      }
      loadUsers()
      
      toast({
        title: "Asset Deleted",
        description: "Asset has been successfully deleted."
      })
    } catch (error: any) {
      console.error('Error deleting asset:', error)
      toast({
        title: "Error",
        description: error.message || "Failed to delete asset.",
        variant: "destructive"
      })
    }
  }

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.user_metadata?.first_name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.user_metadata?.last_name?.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-slate-300">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (showAdminLogin || !isAdmin) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full mx-4"
        >
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">Admin Access Required</CardTitle>
              <p className="text-slate-400 mt-2">
                This area is restricted to administrators only. Please enter your admin credentials.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="admin-password" className="text-slate-300">Admin Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="Enter admin password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                    onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                  />
                </div>
              </div>
              
              {user ? (
                <div className="p-3 bg-slate-700 rounded-lg">
                  <p className="text-xs text-slate-400">Signed in as:</p>
                  <p className="text-sm text-white font-medium">{user.email}</p>
                </div>
              ) : (
                <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm">Please sign in first to access the admin panel.</p>
                </div>
              )}

              <Button 
                onClick={handleAdminLogin}
                disabled={!adminPassword || !user}
                className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50"
              >
                Access Admin Dashboard
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            {selectedUser && (
              <Button
                variant="ghost"
                onClick={() => setSelectedUser(null)}
                className="text-slate-300 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Users
              </Button>
            )}
            <h1 className="text-3xl font-bold">
              {selectedUser ? `Managing ${selectedUser.user_metadata?.first_name || selectedUser.email}` : 'Admin Dashboard'}
            </h1>
          </div>
          
          <Button onClick={loadUsers} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {!selectedUser ? (
          <>
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Total Users</p>
                      <p className="text-2xl font-bold text-white">{users.length}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Total Invested</p>
                      <p className="text-2xl font-bold text-white">
                        ${users.reduce((sum, user) => sum + user.total_invested, 0).toLocaleString()}
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Current Value</p>
                      <p className="text-2xl font-bold text-white">
                        ${users.reduce((sum, user) => sum + user.current_value, 0).toLocaleString()}
                      </p>
                    </div>
                    <Activity className="w-8 h-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Total P&L</p>
                      <p className={`text-2xl font-bold ${
                        users.reduce((sum, user) => sum + user.profit_loss, 0) >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        ${users.reduce((sum, user) => sum + user.profit_loss, 0).toLocaleString()}
                      </p>
                    </div>
                    {users.reduce((sum, user) => sum + user.profit_loss, 0) >= 0 ? (
                      <TrendingUp className="w-8 h-8 text-green-400" />
                    ) : (
                      <TrendingDown className="w-8 h-8 text-red-400" />
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-800 border-slate-700 text-white"
                />
              </div>
            </div>

            {/* Users Table */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-200">Users Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left text-slate-300 font-medium p-3">User</th>
                        <th className="text-right text-slate-300 font-medium p-3">Assets</th>
                        <th className="text-right text-slate-300 font-medium p-3">Invested</th>
                        <th className="text-right text-slate-300 font-medium p-3">Current Value</th>
                        <th className="text-right text-slate-300 font-medium p-3">P&L</th>
                        <th className="text-center text-slate-300 font-medium p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user, index) => (
                        <motion.tr
                          key={user.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="border-b border-slate-700/50 hover:bg-slate-700/20"
                        >
                          <td className="p-3">
                            <div>
                              <p className="font-medium text-white">
                                {user.user_metadata?.first_name} {user.user_metadata?.last_name}
                              </p>
                              <p className="text-sm text-slate-400">{user.email}</p>
                            </div>
                          </td>
                          <td className="p-3 text-right">
                            <span className="text-white">{user.total_assets}</span>
                          </td>
                          <td className="p-3 text-right">
                            <span className="text-white font-medium">
                              ${user.total_invested.toLocaleString()}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <span className="text-white font-medium">
                              ${user.current_value.toLocaleString()}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <span className={`font-medium ${
                              user.profit_loss >= 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                              ${user.profit_loss.toLocaleString()}
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <Button
                              size="sm"
                              onClick={() => selectUser(user)}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              <Edit3 className="w-4 h-4 mr-1" />
                              Manage
                            </Button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* User Portfolio Management */}
            <div className="space-y-6">
              {/* Add Asset Form */}
              {showAddAsset && (
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-slate-200">Add New Asset</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAddAsset(false)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-slate-300">Asset Name</Label>
                        <Input
                          value={newAsset.asset_name}
                          onChange={(e) => setNewAsset(prev => ({ ...prev, asset_name: e.target.value }))}
                          className="bg-slate-700 border-slate-600 text-white"
                          placeholder="e.g., Bitcoin"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-300">Symbol</Label>
                        <Input
                          value={newAsset.symbol}
                          onChange={(e) => setNewAsset(prev => ({ ...prev, symbol: e.target.value }))}
                          className="bg-slate-700 border-slate-600 text-white"
                          placeholder="e.g., BTC"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-300">Category</Label>
                        <Select 
                          value={newAsset.category}
                          onValueChange={(value) => setNewAsset(prev => ({ ...prev, category: value }))}
                        >
                          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-700 border-slate-600">
                            {assetCategories.map(cat => (
                              <SelectItem key={cat.value} value={cat.value} className="text-white hover:bg-slate-600">
                                {cat.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-slate-300">Investment Amount</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={newAsset.investment_amount}
                          onChange={(e) => setNewAsset(prev => ({ ...prev, investment_amount: parseFloat(e.target.value) || 0 }))}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-300">Current Value</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={newAsset.current_value}
                          onChange={(e) => setNewAsset(prev => ({ ...prev, current_value: parseFloat(e.target.value) || 0 }))}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-300">Quantity</Label>
                        <Input
                          type="number"
                          step="0.00000001"
                          value={newAsset.quantity}
                          onChange={(e) => setNewAsset(prev => ({ ...prev, quantity: parseFloat(e.target.value) || 0 }))}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button onClick={addAsset} className="bg-green-600 hover:bg-green-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Asset
                      </Button>
                      <Button variant="outline" onClick={() => setShowAddAsset(false)}>
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Assets Table */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-slate-200">Portfolio Assets</CardTitle>
                  <Button
                    onClick={() => setShowAddAsset(true)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Asset
                  </Button>
                </CardHeader>
                <CardContent>
                  {userAssets.length === 0 ? (
                    <div className="text-center py-12">
                      <PieChart className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-slate-300 mb-2">No Assets</h3>
                      <p className="text-slate-500 mb-4">This user doesn't have any assets yet</p>
                      <Button onClick={() => setShowAddAsset(true)} className="bg-green-600 hover:bg-green-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Add First Asset
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
                            <th className="text-right text-slate-300 font-medium p-3">Quantity</th>
                            <th className="text-center text-slate-300 font-medium p-3">Status</th>
                            <th className="text-center text-slate-300 font-medium p-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userAssets.map((asset) => {
                            const IconComponent = categoryIcons[asset.category] || BarChart3
                            const isEditing = editingAsset?.id === asset.id
                            
                            return (
                              <tr key={asset.id} className="border-b border-slate-700/50 hover:bg-slate-700/20">
                                <td className="p-3">
                                  <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-slate-700 rounded-lg">
                                      <IconComponent className="w-4 h-4" />
                                    </div>
                                    <div>
                                      {isEditing ? (
                                        <div className="space-y-1">
                                          <Input
                                            value={editingAsset.asset_name}
                                            onChange={(e) => setEditingAsset(prev => prev ? { ...prev, asset_name: e.target.value } : null)}
                                            className="bg-slate-600 border-slate-500 text-white text-sm"
                                          />
                                          <Input
                                            value={editingAsset.symbol}
                                            onChange={(e) => setEditingAsset(prev => prev ? { ...prev, symbol: e.target.value } : null)}
                                            className="bg-slate-600 border-slate-500 text-white text-sm"
                                          />
                                        </div>
                                      ) : (
                                        <div>
                                          <p className="font-medium text-white">{asset.asset_name}</p>
                                          <p className="text-sm text-slate-400">{asset.symbol}</p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </td>
                                <td className="p-3">
                                  {isEditing ? (
                                    <Select 
                                      value={editingAsset.category}
                                      onValueChange={(value) => setEditingAsset(prev => prev ? { ...prev, category: value } : null)}
                                    >
                                      <SelectTrigger className="bg-slate-600 border-slate-500 text-white text-sm">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent className="bg-slate-600 border-slate-500">
                                        {assetCategories.map(cat => (
                                          <SelectItem key={cat.value} value={cat.value} className="text-white">
                                            {cat.label}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  ) : (
                                    <span className="text-slate-300 capitalize">{asset.category}</span>
                                  )}
                                </td>
                                <td className="p-3 text-right">
                                  {isEditing ? (
                                    <Input
                                      type="number"
                                      step="0.01"
                                      value={editingAsset.investment_amount}
                                      onChange={(e) => setEditingAsset(prev => prev ? { ...prev, investment_amount: parseFloat(e.target.value) || 0 } : null)}
                                      className="bg-slate-600 border-slate-500 text-white text-sm w-24"
                                    />
                                  ) : (
                                    <span className="text-white font-medium">
                                      ${asset.investment_amount.toLocaleString()}
                                    </span>
                                  )}
                                </td>
                                <td className="p-3 text-right">
                                  {isEditing ? (
                                    <Input
                                      type="number"
                                      step="0.01"
                                      value={editingAsset.current_value}
                                      onChange={(e) => setEditingAsset(prev => prev ? { ...prev, current_value: parseFloat(e.target.value) || 0 } : null)}
                                      className="bg-slate-600 border-slate-500 text-white text-sm w-24"
                                    />
                                  ) : (
                                    <span className="text-white font-medium">
                                      ${asset.current_value.toLocaleString()}
                                    </span>
                                  )}
                                </td>
                                <td className="p-3 text-right">
                                  {isEditing ? (
                                    <Input
                                      type="number"
                                      step="0.00000001"
                                      value={editingAsset.quantity}
                                      onChange={(e) => setEditingAsset(prev => prev ? { ...prev, quantity: parseFloat(e.target.value) || 0 } : null)}
                                      className="bg-slate-600 border-slate-500 text-white text-sm w-24"
                                    />
                                  ) : (
                                    <span className="text-white">{asset.quantity}</span>
                                  )}
                                </td>
                                <td className="p-3 text-center">
                                  {isEditing ? (
                                    <Select 
                                      value={editingAsset.status}
                                      onValueChange={(value) => setEditingAsset(prev => prev ? { ...prev, status: value as any } : null)}
                                    >
                                      <SelectTrigger className="bg-slate-600 border-slate-500 text-white text-sm">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent className="bg-slate-600 border-slate-500">
                                        <SelectItem value="pending" className="text-white">Pending</SelectItem>
                                        <SelectItem value="active" className="text-white">Active</SelectItem>
                                        <SelectItem value="sold" className="text-white">Sold</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  ) : (
                                    <Badge 
                                      variant={asset.status === 'active' ? 'default' : asset.status === 'pending' ? 'secondary' : 'outline'}
                                      className="capitalize"
                                    >
                                      {asset.status}
                                    </Badge>
                                  )}
                                </td>
                                <td className="p-3">
                                  <div className="flex items-center justify-center space-x-2">
                                    {isEditing ? (
                                      <>
                                        <Button
                                          size="sm"
                                          onClick={() => updateAsset(asset.id!, editingAsset)}
                                          className="bg-green-600 hover:bg-green-700"
                                        >
                                          <Save className="w-3 h-3" />
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() => setEditingAsset(null)}
                                        >
                                          <X className="w-3 h-3" />
                                        </Button>
                                      </>
                                    ) : (
                                      <>
                                        <Button
                                          size="sm"
                                          onClick={() => setEditingAsset(asset)}
                                          className="bg-blue-600 hover:bg-blue-700"
                                        >
                                          <Edit3 className="w-3 h-3" />
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="destructive"
                                          onClick={() => deleteAsset(asset.id!)}
                                        >
                                          <Trash2 className="w-3 h-3" />
                                        </Button>
                                      </>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Admin