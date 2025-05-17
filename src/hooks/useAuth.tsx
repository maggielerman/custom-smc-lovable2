import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabaseClient, getSupabaseClient } from '@/lib/supabase'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import { toast as sonnerToast } from 'sonner'

type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>  // This stays as Promise<void>
  signOut: () => Promise<void>
  isSupabaseConnected: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(!!supabaseClient)
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    const getSession = async () => {
      setIsLoading(true)
      
      if (!supabaseClient) {
        setIsLoading(false)
        return
      }
      
      try {
        const { data: { session }, error } = await supabaseClient.auth.getSession()
        
        if (error) {
          console.error('Error fetching session:', error)
        }
        
        setSession(session)
        setUser(session?.user ?? null)
      } catch (error) {
        console.error('Failed to get session:', error)
      } finally {
        setIsLoading(false)
      }
    }

    getSession()

    if (supabaseClient) {
      const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
      })

      return () => subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      if (!supabaseClient) {
        throw new Error('Supabase is not connected')
      }
      
      const { error, data } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) throw error
      
      sonnerToast.success(
        "Welcome back!",
        {
          description: "You have successfully signed in.",
        }
      )
      
      navigate('/')
    } catch (error: any) {
      console.error('Sign in error:', error)
      
      // Handle specific error cases
      if (error.message.includes('Invalid login')) {
        sonnerToast.error("Invalid login credentials", {
          description: "The email or password you entered is incorrect.",
        })
      } else if (error.message.includes('Email not confirmed')) {
        sonnerToast.error("Email not verified", {
          description: "Please check your email and verify your account before signing in.",
        })
      } else {
        sonnerToast.error("Sign in failed", {
          description: error.message || "Please try again",
        })
      }
      
      throw error
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      if (!supabaseClient) {
        throw new Error('Supabase is not connected')
      }
      
      const { error, data } = await supabaseClient.auth.signUp({
        email,
        password,
      })
      
      if (error) throw error
      
      sonnerToast.success(
        "Account created!",
        {
          description: "Please check your email for verification.",
        }
      )
      
      // Don't return data, just void to match the Promise<void> type
      
    } catch (error: any) {
      console.error('Sign up error:', error)
      
      // Handle specific error cases
      if (error.message.includes('already registered')) {
        sonnerToast.error("Email already registered", {
          description: "This email is already in use. Try signing in instead.",
        })
      } else {
        sonnerToast.error("Sign up failed", {
          description: error.message || "Please try again",
        })
      }
      
      throw error
    }
  }

  const signOut = async () => {
    try {
      if (!supabaseClient) {
        throw new Error('Supabase is not connected')
      }
      
      const { error } = await supabaseClient.auth.signOut()
      if (error) throw error
      
      sonnerToast.success("Signed out successfully")
      navigate('/')
    } catch (error: any) {
      sonnerToast.error("Sign out failed", {
        description: error.message || "Please try again",
      })
      console.error('Sign out error:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, session, isLoading, signIn, signUp, signOut, isSupabaseConnected }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
