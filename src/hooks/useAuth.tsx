
import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/integrations/supabase/client'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  isSupabaseConnected: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const getSession = async () => {
      setIsLoading(true)
      
      if (!supabase) {
        console.error('Supabase client not available')
        setIsSupabaseConnected(false)
        setIsLoading(false)
        return
      }
      
      try {
        // FIRST check for existing session before setting up listener
        // to prevent race conditions
        const { data: { session: existingSession }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error fetching session:', error)
        }
        
        // Set initial state based on existing session
        setSession(existingSession)
        setUser(existingSession?.user ?? null)
        
        // THEN set up auth state listener for future changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, updatedSession) => {
            console.log('Auth state change:', event, !!updatedSession)
            setSession(updatedSession)
            setUser(updatedSession?.user ?? null)
            
            // Important: Set isLoading to false AFTER updating user/session state
            setIsLoading(false)
          }
        )
        
        // Set loading to false after initial session check
        setIsLoading(false)
        
        return () => subscription.unsubscribe()
      } catch (error) {
        console.error('Failed to get session:', error)
        setIsLoading(false)
      }
    }

    getSession()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      if (!supabase) {
        throw new Error('Supabase is not connected')
      }
      
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) throw error
      
      toast.success(
        "Welcome back!",
        {
          description: "You have successfully signed in.",
        }
      )
    } catch (error: any) {
      console.error('Sign in error:', error)
      
      // Handle specific error cases
      if (error.message.includes('Invalid login')) {
        toast.error("Invalid login credentials", {
          description: "The email or password you entered is incorrect.",
        })
      } else if (error.message.includes('Email not confirmed')) {
        toast.error("Email not verified", {
          description: "Please check your email and verify your account before signing in.",
        })
      } else {
        toast.error("Sign in failed", {
          description: error.message || "Please try again",
        })
      }
      
      throw error
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      if (!supabase) {
        throw new Error('Supabase is not connected')
      }
      
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
      })
      
      if (error) throw error
      
      toast.success(
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
        toast.error("Email already registered", {
          description: "This email is already in use. Try signing in instead.",
        })
      } else {
        toast.error("Sign up failed", {
          description: error.message || "Please try again",
        })
      }
      
      throw error
    }
  }

  const signOut = async () => {
    try {
      if (!supabase) {
        throw new Error('Supabase is not connected')
      }
      
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      toast.success("Signed out successfully")
      navigate('/')
    } catch (error: any) {
      toast.error("Sign out failed", {
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
