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

interface CompareContextType {
  comparedProducts: Product[]
  addToCompare: (product: Product) => void
  removeFromCompare: (productId: string) => void
  isComparing: (productId: string) => boolean
  clearAll: () => void
}

const CompareContext = createContext<CompareContextType | undefined>(undefined)

export function CompareProvider({ children }: { children: ReactNode }) {
  const [comparedProducts, setComparedProducts] = useState<Product[]>([])

  // Load compared products from localStorage on initial render
  useEffect(() => {
    const savedProducts = localStorage.getItem('comparedProducts')
    if (savedProducts) {
      setComparedProducts(JSON.parse(savedProducts))
    }
  }, [])

  // Save compared products to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('comparedProducts', JSON.stringify(comparedProducts))
  }, [comparedProducts])

  const addToCompare = (product: Product) => {
    if (comparedProducts.length < 4 && !isComparing(product.id)) {
      setComparedProducts(prev => [...prev, product])
    }
  }

  const removeFromCompare = (productId: string) => {
    setComparedProducts(prev => prev.filter(product => product.id !== productId))
  }

  const isComparing = (productId: string) => {
    return comparedProducts.some(product => product.id === productId)
  }

  const clearAll = () => {
    setComparedProducts([])
  }

  return (
    <CompareContext.Provider value={{ 
      comparedProducts, 
      addToCompare, 
      removeFromCompare, 
      isComparing,
      clearAll
    }}>
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const context = useContext(CompareContext)
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider')
  }
  return context
} 