"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  title?: string;
  message?: string;
  actionType?: "wishlist" | "cart" | "checkout" | "general";
}

export function LoginRequiredModal({
  isOpen,
  onClose,
  onLogin,
  title = "Login Required",
  message = "Please login to continue shopping and access all features",
  actionType = "general"
}: LoginRequiredModalProps) {
  interface AuthDebugState {
    userData: any | null;
    authState: string | null;
    isAuthenticated: boolean;
  }
  
  const [authDebug, setAuthDebug] = useState<AuthDebugState>({
    userData: null,
    authState: null,
    isAuthenticated: false
  });

  // Update debug info
  useEffect(() => {
    const updateDebug = () => {
      const userData = localStorage.getItem('user_data')
      const authState = localStorage.getItem('auth_state')
      const isAuthenticated = !!userData && authState === 'authenticated'
      
      setAuthDebug({
        userData: userData ? JSON.parse(userData) : null,
        authState,
        isAuthenticated
      })
    }
    
    if (isOpen) {
      updateDebug()
      const interval = setInterval(updateDebug, 1000)
      return () => clearInterval(interval)
    }
  }, [isOpen])

  // Define action-specific messages and icons
  const getContent = () => {
    switch (actionType) {
      case "wishlist":
        return {
          title: "Login to Save Items",
          message: "Please login to add items to your wishlist and save them for later",
          icon: <Heart className="h-8 w-8 text-primary" />
        };
      case "cart":
        return {
          title: "Login to Add to Cart",
          message: "Please login to add items to your cart and proceed with checkout",
          icon: <ShoppingBag className="h-8 w-8 text-primary" />
        };
      case "checkout":
        return {
          title: "Login to Checkout",
          message: "Please login to complete your purchase and proceed to checkout",
          icon: <ShoppingBag className="h-8 w-8 text-primary" />
        };
      default:
        return {
          title,
          message,
          icon: <User className="h-8 w-8 text-primary" />
        };
    }
  };

  const content = getContent();

  // Close modal when ESC key is pressed
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-black/25"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div 
            className="bg-white rounded-lg shadow-xl w-[90%] max-w-md z-10 overflow-hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-medium">{content.title}</h2>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  {content.icon}
                </div>
                <p className="text-gray-700">{content.message}</p>
              </div>
              
              <div className="flex flex-col gap-3">
                <Button 
                  onClick={onLogin}
                  className="w-full"
                >
                  Login
                </Button>
                <Button 
                  variant="outline" 
                  onClick={onClose}
                  className="w-full"
                >
                  Continue Browsing
                </Button>
              </div>
              
              {/* Debug Info (hidden in production) */}
              {process.env.NODE_ENV !== 'production' && (
                <div className="mt-4 pt-4 border-t text-xs text-gray-500">
                  <div className="font-semibold">Auth Debug:</div>
                  <div>Auth State: {authDebug.authState || 'not set'}</div>
                  <div>Is Authenticated: {authDebug.isAuthenticated ? 'Yes' : 'No'}</div>
                  {authDebug.userData && (
                    <div>User: {authDebug.userData.email}</div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 