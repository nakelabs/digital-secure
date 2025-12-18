import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<{ error?: AuthError }>
  signIn: (email: string, password: string) => Promise<{ error?: AuthError }>
  signOut: () => Promise<{ error?: AuthError }>
  signInWithGoogle: () => Promise<{ error?: AuthError }>
  signInWithFacebook: () => Promise<{ error?: AuthError }>
  resetPassword: (email: string) => Promise<{ error?: AuthError }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if supabase client is properly initialized
    if (!supabase || typeof supabase.auth?.getSession !== 'function') {
      console.warn('Supabase client not properly initialized')
      setLoading(false)
      return
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error getting session:', error)
      }
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    }).catch((error) => {
      console.error('Error in getSession:', error)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      if (!supabase || typeof supabase.auth?.signUp !== 'function') {
        return { error: { message: 'Authentication service not available' } as any }
      }
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            full_name: `${firstName} ${lastName}`,
          },
        },
      })
      return { error }
    } catch (error: any) {
      return { error: { message: error.message || 'Signup failed' } as any }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      if (!supabase || typeof supabase.auth?.signInWithPassword !== 'function') {
        return { error: { message: 'Authentication service not available' } as any }
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return { error }
    } catch (error: any) {
      return { error: { message: error.message || 'Login failed' } as any }
    }
  }

  const signOut = async () => {
    try {
      if (!supabase || typeof supabase.auth?.signOut !== 'function') {
        return { error: { message: 'Authentication service not available' } as any }
      }
      
      const { error } = await supabase.auth.signOut()
      return { error }
    } catch (error: any) {
      return { error: { message: error.message || 'Signout failed' } as any }
    }
  }

  const signInWithGoogle = async () => {
    try {
      if (!supabase || typeof supabase.auth?.signInWithOAuth !== 'function') {
        return { error: { message: 'OAuth service not available' } as any }
      }
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth`,
        },
      })
      return { error }
    } catch (error: any) {
      return { error: { message: error.message || 'Google login failed' } as any }
    }
  }

  const signInWithFacebook = async () => {
    try {
      if (!supabase || typeof supabase.auth?.signInWithOAuth !== 'function') {
        return { error: { message: 'OAuth service not available' } as any }
      }
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: `${window.location.origin}/auth`,
        },
      })
      return { error }
    } catch (error: any) {
      return { error: { message: error.message || 'Facebook login failed' } as any }
    }
  }

  const resetPassword = async (email: string) => {
    try {
      if (!supabase || typeof supabase.auth?.resetPasswordForEmail !== 'function') {
        return { error: { message: 'Password reset service not available' } as any }
      }
      
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth?reset=true`,
      })
      return { error }
    } catch (error: any) {
      return { error: { message: error.message || 'Password reset failed' } as any }
    }
  }

  const value: AuthContextType = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    signInWithGoogle,
    signInWithFacebook,
    resetPassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}