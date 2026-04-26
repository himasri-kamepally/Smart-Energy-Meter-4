'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { supabase } from './supabase'
import { useRouter } from 'next/navigation'

export interface User {
  id: string
  email: string
  name: string
  dailyLimit: number
  billEstimateRate: number
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; message?: string }>
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  updateProfile: (name: string, dailyLimit?: number) => Promise<{ success: boolean; message?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Fetch profile for the current session
  const fetchProfile = useCallback(async (userId: string, email: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          // Profile doesn't exist, create it (shouldn't happen with signup logic but good fallback)
          return null
        }
        throw error
      }

      return {
        id: data.id,
        email: email,
        name: data.name,
        dailyLimit: data.daily_limit || 5.0,
        billEstimateRate: data.bill_estimate_rate || 13.0,
      } as User
    } catch (err) {
      console.error('Error fetching profile:', err)
      return null
    }
  }, [])

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        const profile = await fetchProfile(session.user.id, session.user.email || '')
        setUser(profile)
      }
      
      setIsLoading(false)
    }

    checkSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const profile = await fetchProfile(session.user.id, session.user.email || '')
        setUser(profile)
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [fetchProfile])

  const signup = async (email: string, password: string, name: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          },
        },
      })

      if (error) throw error
      
      return { success: true }
    } catch (error: any) {
      return { success: false, message: error.message }
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      return { success: true }
    } catch (error: any) {
      return { success: false, message: error.message }
    }
  }

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/dashboard',
      },
    })
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push('/')
  }

  const updateProfile = async (name: string, dailyLimit?: number) => {
    if (!user) return { success: false, message: 'Not authenticated' }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          name, 
          daily_limit: dailyLimit ?? user.dailyLimit 
        })
        .eq('id', user.id)

      if (error) throw error

      setUser({ 
        ...user, 
        name, 
        dailyLimit: dailyLimit ?? user.dailyLimit 
      })
      
      return { success: true }
    } catch (error: any) {
      return { success: false, message: error.message }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signup,
        login,
        loginWithGoogle,
        logout,
        updateProfile,
      }}
    >
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
