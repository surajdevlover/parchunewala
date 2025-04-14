"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { 
  emailPasswordSignIn, 
  emailPasswordSignUp, 
  mockGoogleSignIn, 
  mockFacebookSignIn 
} from "@/db/auth-service"
import { User as DbUser } from "@/db/models/user"

// Use our model's User type
type User = DbUser;

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, phone: string, password: string) => Promise<void>
  googleLogin: () => Promise<void>
  facebookLogin: () => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  // Check for existing user session on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])
  
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      
      if (!email || !password) {
        throw new Error('Email and password are required')
      }
      
      const user = await emailPasswordSignIn(email, password)
      
      if (!user) {
        throw new Error('Invalid email or password')
      }
      
      setUser(user)
      localStorage.setItem('currentUser', JSON.stringify(user))
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }
  
  const register = async (name: string, email: string, phone: string, password: string) => {
    try {
      setIsLoading(true)
      
      // Basic validation
      if (!name || !email || !password) {
        throw new Error('Name, email and password are required')
      }
      
      const user = await emailPasswordSignUp(name, email, password, phone)
      
      if (!user) {
        throw new Error('Registration failed. Email may already be in use.')
      }
      
      setUser(user)
      localStorage.setItem('currentUser', JSON.stringify(user))
    } catch (error) {
      console.error('Registration failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }
  
  const googleLogin = async () => {
    try {
      setIsLoading(true)
      
      // In a real app, this would use the Google OAuth flow
      const user = await mockGoogleSignIn()
      
      setUser(user)
      localStorage.setItem('currentUser', JSON.stringify(user))
    } catch (error) {
      console.error('Google login failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }
  
  const facebookLogin = async () => {
    try {
      setIsLoading(true)
      
      // In a real app, this would use the Facebook OAuth flow
      const user = await mockFacebookSignIn()
      
      setUser(user)
      localStorage.setItem('currentUser', JSON.stringify(user))
    } catch (error) {
      console.error('Facebook login failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }
  
  const logout = () => {
    setUser(null)
    localStorage.removeItem('currentUser')
  }
  
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        login, 
        register,
        googleLogin,
        facebookLogin,
        logout, 
        isAuthenticated: !!user 
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