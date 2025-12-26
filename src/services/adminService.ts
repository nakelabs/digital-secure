import { supabase } from '@/lib/supabase'
import { UserAsset, UserBalance, UserTransaction } from './database'

export interface AdminUser {
  id: string
  email: string
  user_metadata: {
    first_name?: string
    last_name?: string
    avatar_url?: string
  }
  created_at: string
  last_sign_in_at?: string
}

export interface UserWithStats extends AdminUser {
  total_assets: number
  total_invested: number
  current_value: number
  profit_loss: number
}

class AdminService {
  private async enableAdminMode() {
    try {
      // Get current user and verify admin access
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error || !user) {
        throw new Error('No authenticated user')
      }

      console.log('Admin check - User email:', user.email)
      console.log('Admin check - User metadata:', user.user_metadata)
      
      if (user.email !== 'nakelabss@gmail.com') {
        throw new Error('Unauthorized: Admin access required')
      }
      
      // Verify the JWT contains the email we need for RLS
      const { data: { session } } = await supabase.auth.getSession()
      console.log('Session JWT email:', session?.access_token ? 'Token exists' : 'No token')
      
      console.log('Admin mode verified for:', user.email)
      return true
    } catch (error) {
      console.error('Error enabling admin mode:', error)
      throw error
    }
  }

  // Get all users with their portfolio stats (simplified approach)
  async getAllUsersWithStats(): Promise<UserWithStats[]> {
    try {
      console.log('Fetching all users...')
      
      // First, try to get all users from profiles table
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name')

      console.log('Profiles found:', profiles?.length || 0, profiles)

      // Also get users from auth (current user at least)
      const { data: authData } = await supabase.auth.getUser()
      console.log('Current auth user:', authData.user?.id)

      // Collect all unique user IDs
      const userIds = new Set<string>()
      
      // Add users from profiles
      if (profiles) {
        profiles.forEach(profile => userIds.add(profile.id))
      }
      
      // Add current authenticated user
      if (authData.user) {
        userIds.add(authData.user.id)
      }

      // Get all user assets to add any additional users
      const { data: allAssets, error: assetsError } = await supabase
        .from('user_assets')
        .select('user_id, investment_amount, current_value')

      if (!assetsError && allAssets) {
        allAssets.forEach(asset => userIds.add(asset.user_id))
      }

      // Get all user balances to add any additional users
      const { data: allBalances } = await supabase
        .from('user_balances')
        .select('user_id, total_invested, current_portfolio_value, total_profit_loss')

      if (allBalances) {
        allBalances.forEach(balance => userIds.add(balance.user_id))
      }

      console.log('All found user IDs:', Array.from(userIds))

      if (userIds.size === 0) {
        console.log('No users found')
        return []
      }

      // Create user stats for each user
      const usersWithStats: UserWithStats[] = []

      for (const userId of userIds) {
        // Get user profile info
        const profile = profiles?.find(p => p.id === userId)
        
        // Get user assets
        const userAssets = allAssets?.filter(asset => asset.user_id === userId) || []
        const userBalance = allBalances?.find(balance => balance.user_id === userId)
        
        const totalAssets = userAssets.length
        const totalInvested = userAssets.reduce((sum, asset) => sum + (asset.investment_amount || 0), 0)
        const currentValue = userAssets.reduce((sum, asset) => sum + (asset.current_value || 0), 0)
        const profitLoss = currentValue - totalInvested

        // Set user info
        let userEmail = `user-${userId.substring(0, 8)}@example.com`
        let firstName = profile?.first_name || 'User'
        let lastName = profile?.last_name || userId.substring(0, 8)

        // If this is the current user, get their real email
        if (authData.user && authData.user.id === userId) {
          userEmail = authData.user.email || userEmail
          firstName = authData.user.user_metadata?.first_name || firstName
          lastName = authData.user.user_metadata?.last_name || lastName
        }

        usersWithStats.push({
          id: userId,
          email: userEmail,
          user_metadata: {
            first_name: firstName,
            last_name: lastName,
          },
          created_at: new Date().toISOString(),
          last_sign_in_at: new Date().toISOString(),
          total_assets: totalAssets,
          total_invested: totalInvested,
          current_value: currentValue,
          profit_loss: profitLoss
        })
      }

      console.log('Returning real users:', usersWithStats.length, usersWithStats)
      return usersWithStats

    } catch (error) {
      console.error('Error fetching users:', error)
      return []
    }
  }

  // Get specific user's assets (works with RLS policies)
  async getUserAssets(userId: string): Promise<UserAsset[]> {
    // Fetch from database
    try {
      const { data, error } = await supabase
        .from('user_assets')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching user assets:', error)
        return []
      }
      
      console.log(`Found ${data?.length || 0} assets for user ${userId}`)
      return data || []
    } catch (error) {
      console.error('Error in getUserAssets:', error)
      return []
    }
  }

  // Get specific user's balance
  async getUserBalance(userId: string): Promise<UserBalance | null> {
    const { data, error } = await supabase
      .from('user_balances')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching user balance:', error)
      return null
    }
    return data
  }

  // Get specific user's transactions
  async getUserTransactions(userId: string): Promise<UserTransaction[]> {
    const { data, error } = await supabase
      .from('user_transactions')
      .select('*')
      .eq('user_id', userId)
      .order('transaction_date', { ascending: false })

    if (error) {
      console.error('Error fetching user transactions:', error)
      return []
    }
    return data || []
  }

  // Update user's asset (with admin privileges)
  async updateUserAsset(assetId: string, updates: Partial<UserAsset>): Promise<UserAsset> {
    try {
      await this.enableAdminMode()
      console.log('Updating asset with admin privileges:', assetId)
      
      const { data, error } = await supabase
        .from('user_assets')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', assetId)
        .select()
        .single()

      if (error) {
        console.error('Error updating asset:', error)
        throw error
      }
      
      return data
    } catch (error) {
      console.error('Error in updateUserAsset:', error)
      throw error
    }
  }

  // Update user's balance
  async updateUserBalance(userId: string, updates: Partial<UserBalance>): Promise<UserBalance> {
    const { data, error } = await supabase
      .from('user_balances')
      .upsert({
        user_id: userId,
        ...updates,
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Add asset to user's portfolio
  async addAssetToUser(userId: string, asset: Omit<UserAsset, 'id' | 'user_id'>): Promise<UserAsset> {
    const { data, error } = await supabase
      .from('user_assets')
      .insert({
        ...asset,
        user_id: userId
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Delete user's asset (with admin privileges)
  async deleteUserAsset(assetId: string): Promise<void> {
    try {
      await this.enableAdminMode()
      console.log('Attempting to delete asset with admin privileges:', assetId)
      
      // Get the asset first to confirm it exists
      const { data: asset, error: fetchError } = await supabase
        .from('user_assets')
        .select('*')
        .eq('id', assetId)
        .single()

      if (fetchError) {
        throw new Error(`Asset not found: ${fetchError.message}`)
      }

      console.log('Found asset to delete:', asset.asset_name, 'owned by:', asset.user_id)
      
      // Delete the asset
      const { error: deleteError } = await supabase
        .from('user_assets')
        .delete()
        .eq('id', assetId)

      if (deleteError) {
        console.error('Delete failed:', deleteError.message)
        throw new Error(`Failed to delete asset: ${deleteError.message}`)
      }
      
      console.log('Asset deleted successfully')
      
    } catch (error) {
      console.error('Error in deleteUserAsset:', error)
      throw error
    }
  }

  // Add transaction to user
  async addTransactionToUser(userId: string, transaction: Omit<UserTransaction, 'id' | 'user_id'>): Promise<UserTransaction> {
    const { data, error } = await supabase
      .from('user_transactions')
      .insert({
        ...transaction,
        user_id: userId
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Recalculate user's portfolio (helper function)
  async recalculateUserPortfolio(userId: string): Promise<void> {
    const assets = await this.getUserAssets(userId)
    
    const totalInvested = assets.reduce((sum, asset) => sum + asset.investment_amount, 0)
    const currentValue = assets.reduce((sum, asset) => sum + asset.current_value, 0)
    const profitLoss = currentValue - totalInvested

    await this.updateUserBalance(userId, {
      total_invested: totalInvested,
      current_portfolio_value: currentValue,
      total_profit_loss: profitLoss
    })
  }
}

export const adminService = new AdminService()