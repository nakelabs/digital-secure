import { supabase } from '@/lib/supabase'

export interface UserAsset {
  id?: string
  user_id?: string
  asset_name: string
  symbol: string
  category: string
  investment_amount: number
  current_value: number
  quantity: number
  purchase_date?: string
  notes?: string
  status: 'pending' | 'active' | 'sold'
  created_at?: string
  updated_at?: string
}

export interface UserBalance {
  id?: string
  user_id?: string
  total_invested: number
  current_portfolio_value: number
  available_cash: number
  total_profit_loss: number
  updated_at?: string
}

export interface UserTransaction {
  id?: string
  user_id?: string
  asset_id?: string
  type: 'purchase' | 'sale' | 'dividend' | 'fee'
  amount: number
  transaction_date?: string
  description?: string
}

class DatabaseService {
  // User Assets
  async createUserAsset(asset: Omit<UserAsset, 'id' | 'user_id'>) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('No authenticated user')

    const { data, error } = await supabase
      .from('user_assets')
      .insert({
        ...asset,
        user_id: user.id
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  async getUserAssets() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('No authenticated user')

    const { data, error } = await supabase
      .from('user_assets')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  async updateUserAsset(id: string, updates: Partial<UserAsset>) {
    const { data, error } = await supabase
      .from('user_assets')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async deleteUserAsset(id: string) {
    const { error } = await supabase
      .from('user_assets')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  // User Balance
  async getUserBalance() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('No authenticated user')

    const { data, error } = await supabase
      .from('user_balances')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return data
  }

  async updateUserBalance(balance: Partial<UserBalance>) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('No authenticated user')

    const { data, error } = await supabase
      .from('user_balances')
      .upsert({
        user_id: user.id,
        ...balance,
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Transactions
  async createTransaction(transaction: Omit<UserTransaction, 'id' | 'user_id'>) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('No authenticated user')

    const { data, error } = await supabase
      .from('user_transactions')
      .insert({
        ...transaction,
        user_id: user.id
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  async getUserTransactions() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('No authenticated user')

    const { data, error } = await supabase
      .from('user_transactions')
      .select('*')
      .eq('user_id', user.id)
      .order('transaction_date', { ascending: false })

    if (error) throw error
    return data || []
  }

  // Portfolio calculations
  async getPortfolioStats() {
    const assets = await this.getUserAssets()
    
    const totalInvested = assets.reduce((sum, asset) => sum + asset.investment_amount, 0)
    const currentValue = assets.reduce((sum, asset) => sum + asset.current_value, 0)
    const profitLoss = currentValue - totalInvested
    const profitLossPercentage = totalInvested > 0 ? (profitLoss / totalInvested) * 100 : 0

    return {
      totalInvested,
      currentValue,
      profitLoss,
      profitLossPercentage,
      assetCount: assets.length,
      assets
    }
  }
}

export const dbService = new DatabaseService()