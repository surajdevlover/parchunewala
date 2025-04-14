"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Store = {
  id: string
  name: string
  location: string
  image: string
  timing: string
  rating: number
  distance: string
}

type Product = {
  id: string
  name: string
  price: string
  mrp: string
  image: string
  quantity: string
  rating?: number
  discount?: string
  storeId?: string
  storeName?: string
  storeOptions?: Array<{
    storeId: string
    storeName: string
    price: string
    available: boolean
  }>
}

type CartItem = {
  product: Product
  quantity: number
  storeId: string
  storeName: string
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (product: Product, quantity: number, storeId?: string) => void
  removeFromCart: (productId: string, storeId: string) => void
  updateQuantity: (productId: string, storeId: string, quantity: number) => void
  clearCart: () => void
  cartTotal: () => string
  totalItems: () => number
  viewProductStores: (productId: string) => Product["storeOptions"] | undefined
  updateProductStore: (productId: string, storeId: string) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Sample stores data
  const stores: Store[] = [
    {
      id: "1",
      name: "Satish General Store",
      location: "Sector 44, Noida",
      image: "https://content3.jdmagicbox.com/v2/comp/noida/k9/011pxx11.xx11.160125130009.a8k9/catalogue/anjali-general-store-noida-sector-44-noida-general-stores-2egpcjw.jpg?height=150&width=300",
      timing: "Open 8 AM - 10 PM",
      rating: 4.2,
      distance: "0.5 km"
    },
    {
      id: "2",
      name: "Pandit General Store",
      location: "Sector 18, Noida",
      image: "https://lh3.googleusercontent.com/gps-cs-s/AB5caB87a87mmqARf0sUuN4nXF-hUTfKpjt4Y8hZZoj-JKj4sfEJDNV2Nl1s9EX9mLnPa8MBS5Fd0Y2YvIkhLl1iD8WKYkCyUhc2AeBqO1SJpY74s19AICUnLxJ37C3ayAkzpxlj25bf=s1360-w1360-h1020?height=150&width=300",
      timing: "Open 7 AM - 11 PM",
      rating: 4.5,
      distance: "3.1 km"
    },
    {
      id: "3",
      name: "Anuj Kirana Store",
      location: "Sector 126, Noida",
      image: "https://lh3.googleusercontent.com/gps-cs-s/AB5caB_QAIR4rpDjU1ofWAq01ZqBN0Zds7Yuz0aeaFjF0PQ1sAXnAgCYw16L1WEBWKcTaK-CiWGmkqHo1RhOZ9M4z9RRo_yABuvZIMki9by6Efiwmq_FKTfWceBVprj9txNRLCgsjuE=s1360-w1360-h1020?height=150&width=300",
      timing: "Open 9 AM - 9 PM",
      rating: 4.0,
      distance: "3.5 km"
    }
  ]

  // Load cart items from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  // Save cart items to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product: Product, quantity: number, storeId?: string) => {
    const selectedStoreId = storeId || product.storeId || stores[0].id
    const selectedStore = stores.find(store => store.id === selectedStoreId)
    
    if (!selectedStore) return
    
    // Check if this product from this store is already in cart
    const existingItemIndex = cartItems.findIndex(
      item => item.product.id === product.id && item.storeId === selectedStoreId
    )
    
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      const updatedItems = [...cartItems]
      updatedItems[existingItemIndex].quantity += quantity
      setCartItems(updatedItems)
    } else {
      // Add new item with store info
      const newProduct = {
        ...product,
        storeId: selectedStoreId,
        storeName: selectedStore.name,
        storeOptions: stores.map(store => ({
          storeId: store.id,
          storeName: store.name,
          price: adjustPriceForStore(product.price, store.id),
          available: Math.random() > 0.2 // 80% chance item is available at a store
        }))
      }
      
      setCartItems([
        ...cartItems, 
        { 
          product: newProduct,
          quantity,
          storeId: selectedStoreId,
          storeName: selectedStore.name
        }
      ])
    }
  }

  // Helper to simulate different prices at different stores
  const adjustPriceForStore = (basePrice: string, storeId: string): string => {
    const numericPrice = parseFloat(basePrice.replace('₹', ''))
    let adjustment = 0
    
    switch (storeId) {
      case '1':
        adjustment = 0 // Base price
        break
      case '2':
        adjustment = Math.floor(Math.random() * 15) - 10 // -10 to +5
        break
      case '3':
        adjustment = Math.floor(Math.random() * 20) - 10 // -10 to +10
        break
      default:
        adjustment = 0
    }
    
    return `₹${(numericPrice + adjustment).toFixed(0)}`
  }

  const removeFromCart = (productId: string, storeId: string) => {
    setCartItems(prev => prev.filter(
      item => !(item.product.id === productId && item.storeId === storeId)
    ))
  }

  const updateQuantity = (productId: string, storeId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, storeId)
      return
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.product.id === productId && item.storeId === storeId
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const cartTotal = () => {
    const total = cartItems.reduce((sum, item) => {
      const price = parseFloat(item.product.price.replace('₹', ''))
      return sum + (price * item.quantity)
    }, 0)
    
    return `₹${total.toFixed(0)}`
  }

  const totalItems = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  // Get store options for a product comparison
  const viewProductStores = (productId: string) => {
    const item = cartItems.find(item => item.product.id === productId)
    return item?.product.storeOptions
  }

  // Update the store for a specific product in cart
  const updateProductStore = (productId: string, newStoreId: string) => {
    const itemIndex = cartItems.findIndex(item => item.product.id === productId)
    
    if (itemIndex === -1) return
    
    const item = cartItems[itemIndex]
    const newStore = stores.find(store => store.id === newStoreId)
    const storeOption = item.product.storeOptions?.find(option => option.storeId === newStoreId)
    
    if (!newStore || !storeOption) return
    
    const updatedItems = [...cartItems]
    
    // Remove the item from its current store
    updatedItems.splice(itemIndex, 1)
    
    // Check if this product already exists in the new store's cart
    const existingInNewStoreIndex = updatedItems.findIndex(
      i => i.product.id === productId && i.storeId === newStoreId
    )
    
    if (existingInNewStoreIndex >= 0) {
      // If it exists in the new store, update quantity
      updatedItems[existingInNewStoreIndex].quantity += item.quantity
    } else {
      // Otherwise add as new item in the new store
      updatedItems.push({
        product: {
          ...item.product,
          price: storeOption.price,
          storeId: newStoreId,
          storeName: newStore.name
        },
        quantity: item.quantity,
        storeId: newStoreId,
        storeName: newStore.name
      })
    }
    
    setCartItems(updatedItems)
  }

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      totalItems,
      viewProductStores,
      updateProductStore
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 