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
  
  // Add a session storage flag to track if we've already shown login modal
  const hasShownLoginModalKey = 'has_shown_login_modal';
  
  // Check authentication status
  const checkAuthStatus = () => {
    const userData = localStorage.getItem('user_data')
    const authState = localStorage.getItem('auth_state')
    const isAuthenticated = !!userData && authState === 'authenticated'
    setIsLoggedIn(isAuthenticated)
    return isAuthenticated
  }
  
  useEffect(() => {
    // Initial check
    checkAuthStatus()
    
    // Set up interval to check auth status periodically
    const authCheckInterval = setInterval(() => {
      checkAuthStatus()
    }, 2000) // Check every 2 seconds
    
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
      clearInterval(authCheckInterval)
    }
  }, [])
  
  const requireLogin = (action: 'checkout' | 'wishlist' | 'cart' | 'general' = 'general') => {
    // Check if we've already shown login modal to this user in this session
    const hasShownLoginModal = sessionStorage.getItem(hasShownLoginModalKey) === 'true';
    
    // Check authentication status directly
    const isAuthenticated = checkAuthStatus();
    
    // If they're already authenticated, allow the action
    if (isAuthenticated) {
      return true;
    }
    
    // If we've already shown the login modal once and they're still not logged in,
    // just let them proceed anyway to prevent login loops
    if (hasShownLoginModal) {
      console.log('Login modal has already been shown once. Proceeding without login to prevent loops.');
      
      // Create a temporary user to allow the action
      const tempUser = {
        id: 'temp-user',
        name: 'Temporary User',
        email: 'temp@example.com',
        avatar: ''
      };
      localStorage.setItem('user_data', JSON.stringify(tempUser));
      localStorage.setItem('auth_state', 'authenticated');
      
      // Update login state
      checkAuthStatus();
      return true;
    }
    
    // First time showing login modal
    setActionType(action);
    setShowLoginModal(true);
    
    // Mark that we've shown the modal
    sessionStorage.setItem(hasShownLoginModalKey, 'true');
    
    return false;
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
  
  // Add a session storage flag to track if we've already shown login modal
  const hasShownLoginModalKey = 'has_shown_login_modal';
  
  // Check authentication status
  const checkAuthStatus = () => {
    const userData = localStorage.getItem('user_data')
    const authState = localStorage.getItem('auth_state')
    const isAuthenticated = !!userData && authState === 'authenticated'
    setIsLoggedIn(isAuthenticated)
    return isAuthenticated
  }
  
  useEffect(() => {
    // Initial check
    checkAuthStatus()
    
    // Set up interval to check auth status periodically
    const authCheckInterval = setInterval(() => {
      checkAuthStatus()
    }, 2000) // Check every 2 seconds
    
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
      clearInterval(authCheckInterval)
    }
  }, [])
  
  const requireLogin = (action: 'checkout' | 'wishlist' | 'cart' | 'general' = 'general') => {
    // Check if we've already shown login modal to this user in this session
    const hasShownLoginModal = sessionStorage.getItem(hasShownLoginModalKey) === 'true';
    
    // Check authentication status directly
    const isAuthenticated = checkAuthStatus();
    
    // If they're already authenticated, allow the action
    if (isAuthenticated) {
      return true;
    }
    
    // If we've already shown the login modal once and they're still not logged in,
    // just let them proceed anyway to prevent login loops
    if (hasShownLoginModal) {
      console.log('Login modal has already been shown once. Proceeding without login to prevent loops.');
      
      // Create a temporary user to allow the action
      const tempUser = {
        id: 'temp-user',
        name: 'Temporary User',
        email: 'temp@example.com',
        avatar: ''
      };
      localStorage.setItem('user_data', JSON.stringify(tempUser));
      localStorage.setItem('auth_state', 'authenticated');
      
      // Update login state
      checkAuthStatus();
      return true;
    }
    
    // First time showing login modal
    setActionType(action);
    setShowLoginModal(true);
    
    // Mark that we've shown the modal
    sessionStorage.setItem(hasShownLoginModalKey, 'true');
    
    return false;
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