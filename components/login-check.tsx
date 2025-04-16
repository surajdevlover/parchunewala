'use client'

import { useState, useEffect } from 'react'
import { LoginRequiredModal } from './login-required-modal'
import { useRouter } from 'next/navigation'

interface LoginCheckProps {
  children: React.ReactNode
}

export function LoginCheck({ children }: LoginCheckProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [actionType, setActionType] = useState<'checkout' | 'wishlist' | 'cart' | 'general'>('general')
  const router = useRouter()
  
  useEffect(() => {
    // Check if user is logged in
    const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    setIsLoggedIn(userLoggedIn)
  }, [])
  
  const requireLogin = (action: 'checkout' | 'wishlist' | 'cart' | 'general' = 'general') => {
    if (!isLoggedIn) {
      setActionType(action)
      setShowLoginModal(true)
      return false
    }
    return true
  }
  
  const handleLoginClick = () => {
    setShowLoginModal(false)
    router.push('/login')
  }
  
  return (
    <>
      {showLoginModal && (
        <LoginRequiredModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLoginClick}
          actionType={actionType}
        />
      )}
      {children}
    </>
  )
}

// Create a global context for login state
import { createContext, useContext } from 'react'

interface LoginContextType {
  isLoggedIn: boolean
  requireLogin: (action?: 'checkout' | 'wishlist' | 'cart' | 'general') => boolean
}

const LoginContext = createContext<LoginContextType | undefined>(undefined)

export function LoginProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [actionType, setActionType] = useState<'checkout' | 'wishlist' | 'cart' | 'general'>('general')
  const router = useRouter()
  
  useEffect(() => {
    // Check if user is logged in
    const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    setIsLoggedIn(userLoggedIn)
    
    // Set up navigation history tracking
    const handleRouteChange = () => {
      const currentPath = window.location.pathname
      
      // Get existing history from session storage or initialize empty array
      const navigationHistory = JSON.parse(sessionStorage.getItem('navigationHistory') || '[]')
      
      // Only add to history if it's a different page
      if (navigationHistory.length === 0 || navigationHistory[navigationHistory.length - 1] !== currentPath) {
        navigationHistory.push(currentPath)
        // Limit history to last 10 pages
        if (navigationHistory.length > 10) {
          navigationHistory.shift()
        }
        sessionStorage.setItem('navigationHistory', JSON.stringify(navigationHistory))
      }
    }
    
    // Track initial page
    handleRouteChange()
    
    // Set up back button listener
    const handlePopState = () => {
      // When back button is pressed, we let the browser handle the navigation
      // but update our history tracking
      const navigationHistory = JSON.parse(sessionStorage.getItem('navigationHistory') || '[]')
      if (navigationHistory.length > 0) {
        navigationHistory.pop() // Remove the current page
        sessionStorage.setItem('navigationHistory', JSON.stringify(navigationHistory))
      }
    }
    
    window.addEventListener('popstate', handlePopState)
    
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])
  
  const requireLogin = (action: 'checkout' | 'wishlist' | 'cart' | 'general' = 'general') => {
    if (!isLoggedIn) {
      setActionType(action)
      setShowLoginModal(true)
      return false
    }
    return true
  }
  
  const handleLoginClick = () => {
    setShowLoginModal(false)
    router.push('/login')
  }
  
  return (
    <LoginContext.Provider value={{ isLoggedIn, requireLogin }}>
      {showLoginModal && (
        <LoginRequiredModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLoginClick}
          actionType={actionType}
        />
      )}
      {children}
    </LoginContext.Provider>
  )
}

export function useLogin() {
  const context = useContext(LoginContext)
  if (context === undefined) {
    throw new Error('useLogin must be used within a LoginProvider')
  }
  return context
} 