"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  socialLogin: (provider: 'google' | 'facebook') => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in from localStorage
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem('user_data')
        if (userData) {
          setUser(JSON.parse(userData))
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call to your backend
    // For demo purposes, we're just simulating a login
    
    try {
      // Simple validation for demo
      if (email && password.length >= 6) {
        // Create a mock user
        const mockUser = {
          id: '1',
          name: email.split('@')[0],
          email,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=random`
        }

        // Store in localStorage
        localStorage.setItem('user_data', JSON.stringify(mockUser))
        localStorage.setItem('auth_state', 'authenticated')

        // Update context
        setUser(mockUser)
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const socialLogin = async (provider: 'google' | 'facebook'): Promise<boolean> => {
    // In a real app, this would trigger OAuth flow with the provider
    // For demo purposes, we're just simulating a successful login
    
    try {
      // Create a mock user based on the provider
      const mockUser = {
        id: provider === 'google' ? 'g-123456' : 'fb-123456',
        name: provider === 'google' ? 'Google User' : 'Facebook User',
        email: provider === 'google' ? 'google.user@example.com' : 'facebook.user@example.com',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(provider === 'google' ? 'Google User' : 'Facebook User')}&background=random`
      }

      // Store in localStorage
      localStorage.setItem('user_data', JSON.stringify(mockUser))
      localStorage.setItem('auth_state', 'authenticated')

      // Update context
      setUser(mockUser)
      return true
    } catch (error) {
      console.error(`${provider} login error:`, error)
      return false
    }
  }

  const logout = () => {
    // Clear local storage
    localStorage.removeItem('user_data')
    localStorage.removeItem('auth_state')
    
    // Update context
    setUser(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, socialLogin, logout }}>
      {!isLoading && children}
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