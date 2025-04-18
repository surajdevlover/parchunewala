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
  moveAllToStore: (targetStoreId: string) => void
  hasMultipleStores: () => boolean
  getMultipleStoreDeliveryFee: () => number
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
    // Only load cart items if localStorage exists (client-side)
    if (typeof window !== 'undefined') {
      // Start with an empty cart
      setCartItems([]);
      
      const savedCart = localStorage.getItem('cartItems')
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          if (Array.isArray(parsedCart)) {
            // Check if this is the first load and if we should use saved cart
            const userAddedItems = localStorage.getItem('user_added_cart_items');
            if (userAddedItems === 'true') {
              // Only set cart items if the user has explicitly added items before
              setCartItems(parsedCart);
            } else {
              // Clear any existing cart data if this is first load
              localStorage.removeItem('cartItems');
            }
          } else {
            // If not valid array, initialize empty cart
            localStorage.removeItem('cartItems');
          }
        } catch (error) {
          console.error("Error parsing cart:", error);
          localStorage.removeItem('cartItems');
        }
      }
    }
  }, [])

  // Save cart items to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
      
      // If user adds items to cart, mark that they've explicitly added items
      if (cartItems.length > 0) {
        localStorage.setItem('user_added_cart_items', 'true');
      }
    }
  }, [cartItems])

  const addToCart = (product: Product, quantity: number, storeId?: string) => {
    if (!product || !product.id) {
      console.error("Invalid product:", product);
      return;
    }
    
    const selectedStoreId = storeId || product.storeId || stores[0].id
    const selectedStore = stores.find(store => store.id === selectedStoreId)
    
    if (!selectedStore) return
    
    // Check if cart has items from a different store
    if (cartItems.length > 0) {
      const existingStoreIds = new Set(cartItems.map(item => item.storeId))
      
      // If adding from a new store
      if (!existingStoreIds.has(selectedStoreId) && existingStoreIds.size > 0) {
        // Creating a function to return this info for use in UI
        const differentStoreInfo = {
          hasMultipleStores: true,
          currentStores: Array.from(existingStoreIds).map(id => {
            const store = stores.find(s => s.id === id)
            return store ? store.name : 'Unknown Store'
          }),
          newStore: selectedStore.name
        }
        
        // Store this information in localStorage so it can be retrieved for alert/modal
        if (typeof window !== 'undefined') {
          localStorage.setItem('multiple_store_warning', JSON.stringify(differentStoreInfo))
          
          // Dispatch a custom event to notify any listeners
          const event = new CustomEvent('multipleStoreWarning', { 
            detail: differentStoreInfo 
          })
          window.dispatchEvent(event)
          
          // Don't add the item yet - wait for user confirmation from the modal
          return;
        }
      }
    }
    
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
    const storeOption = item.product.storeOptions?.find(s => s.storeId === newStoreId)
    
    if (!storeOption || !storeOption.available) return
    
    const store = stores.find(s => s.id === newStoreId)
    if (!store) return
    
    // Create updated product with new store info
    const updatedProduct = {
      ...item.product,
      price: storeOption.price,
      storeId: newStoreId,
      storeName: storeOption.storeName
    }
    
    // Update cart item with new store info
    const updatedItems = [...cartItems]
    updatedItems[itemIndex] = {
      ...item,
      product: updatedProduct,
      storeId: newStoreId,
      storeName: storeOption.storeName
    }
    
    setCartItems(updatedItems)
  }
  
  // Move all products to a single store to consolidate the order
  const moveAllToStore = (targetStoreId: string) => {
    // Find the store
    const store = stores.find(s => s.id === targetStoreId)
    if (!store) return
    
    // Update each item individually if it has that store option
    const updatedItems = cartItems.map(item => {
      // Check if this product has an option for the target store
      const storeOption = item.product.storeOptions?.find(
        s => s.storeId === targetStoreId && s.available
      )
      
      // If not available at target store, leave it unchanged
      if (!storeOption) return item
      
      // Otherwise update to the target store
      const updatedProduct = {
        ...item.product,
        price: storeOption.price,
        storeId: targetStoreId,
        storeName: storeOption.storeName
      }
      
      return {
        ...item,
        product: updatedProduct,
        storeId: targetStoreId,
        storeName: storeOption.storeName
      }
    })
    
    setCartItems(updatedItems)
  }

  // Function to check if cart has items from multiple stores
  const hasMultipleStores = () => {
    if (cartItems.length === 0) return false;
    
    const storeIds = new Set(cartItems.map(item => item.storeId));
    return storeIds.size > 1;
  }
  
  // Function to get extra delivery fee for multiple stores
  const getMultipleStoreDeliveryFee = () => {
    if (!hasMultipleStores()) return 0;
    
    // Base charge for each additional store
    const baseMultiStoreCharge = 25;
    
    // Number of different stores
    const storeIds = new Set(cartItems.map(item => item.storeId));
    const extraStores = storeIds.size - 1;
    
    return baseMultiStoreCharge * extraStores;
  }

  // Calculate delivery fee - free over ₹199
  const calculateDeliveryFee = (storeTotal: number, storeId: string = "1") => {
    // Basic threshold for free delivery is ₹199
    const baseDeliveryFee = storeTotal >= 199 ? 0 : 15;
    
    // Add distance-based fee based on store
    let distanceFee = 0;
    if (storeId === "2") {
      distanceFee = 10; // Medium distance store
    } else if (storeId === "3") {
      distanceFee = 20; // Farthest store
    }
    
    // No distance fee if order qualifies for free delivery
    if (storeTotal >= 199) {
      return 0;
    }
    
    return baseDeliveryFee + distanceFee;
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        totalItems,
        viewProductStores,
        updateProductStore,
        moveAllToStore,
        hasMultipleStores,
        getMultipleStoreDeliveryFee
      }}
    >
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