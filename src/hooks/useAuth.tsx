
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
  signUp: (email: string, password: string) => Promise<void>
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
      
      const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) throw error
      
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      })
      
      navigate('/dashboard')
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message || "Please try again",
        variant: "destructive",
      })
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      if (!supabaseClient) {
        throw new Error('Supabase is not connected')
      }
      
      const { error } = await supabaseClient.auth.signUp({
        email,
        password,
      })
      
      if (error) throw error
      
      toast({
        title: "Account created!",
        description: "Please check your email for verification.",
      })
      
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message || "Please try again",
        variant: "destructive",
      })
    }
  }

  const signOut = async () => {
    try {
      if (!supabaseClient) {
        throw new Error('Supabase is not connected')
      }
      
      const { error } = await supabaseClient.auth.signOut()
      if (error) throw error
      navigate('/')
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message || "Please try again",
        variant: "destructive",
      })
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
