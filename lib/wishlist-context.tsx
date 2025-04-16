"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Product = {
  id: string
  name: string
  price: string
  mrp: string
  image: string
  quantity: string
  rating?: number
  discount?: string
}

interface WishlistContextType {
  wishlistItems: Product[]
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  isWishlisted: (productId: string) => boolean
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([])

  // Load wishlist items from localStorage on initial render
  useEffect(() => {
    const savedItems = localStorage.getItem('wishlistItems')
    if (savedItems) {
      setWishlistItems(JSON.parse(savedItems))
    }
  }, [])

  // Save wishlist items to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const addToWishlist = (product: Product) => {
    if (!isWishlisted(product.id)) {
      setWishlistItems(prev => [...prev, product])
    }
  }

  const removeFromWishlist = (productId: string) => {
    setWishlistItems(prev => prev.filter(product => product.id !== productId))
  }

  const isWishlisted = (productId: string) => {
    return wishlistItems.some(product => product.id === productId)
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  return (
    <WishlistContext.Provider value={{ 
      wishlistItems, 
      addToWishlist, 
      removeFromWishlist, 
      isWishlisted,
      clearWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
} 