import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Only log in development
if (import.meta.env.DEV) {
  console.log('Supabase URL:', supabaseUrl)
  console.log('Supabase Key exists:', !!supabaseAnonKey)
}

// Create a fallback client for development/build purposes
let supabaseClient

try {
  if (!supabaseUrl || !supabaseAnonKey) {
    // Create a mock client for build purposes
    console.warn('Supabase environment variables missing. Using fallback configuration.')
    supabaseClient = createClient('https://placeholder.supabase.co', 'placeholder-key', {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    })
  } else {
    supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  }
} catch (error) {
  console.error('Error creating Supabase client:', error)
  // Fallback client
  supabaseClient = createClient('https://placeholder.supabase.co', 'placeholder-key')
}

export const supabase = supabaseClient