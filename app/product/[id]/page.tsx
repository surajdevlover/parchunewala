"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Heart, Minus, Plus, ShoppingCart, Star, Clock, Shield, Truck, ChevronDown, ChevronUp, Sparkles, Menu, LogOut, User, X, Search, ArrowUp, ExternalLink, AlertCircle, Store, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { LoginRequiredModal } from "@/components/login-required-modal"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useMobileDetection } from "@/lib/use-mobile-detection"
import MobileAppPrompt from "@/components/mobile-app-prompt"
import { useWishlist } from "@/lib/wishlist-context"
import { stores } from "@/lib/data"
import { motion } from "framer-motion"
import { MarketplaceComparison } from "@/components/marketplace-comparison"
import React from "react"

// Define the ProductCardProps interface directly here instead of importing it
interface ProductCardProps {
  id: string
  name: string
  price: string
  mrp: string
  image: string
  quantity: string
  rating?: number
  discount?: string
}

// Use the mobile detection hook
const useMobilePrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    // Skip on server side
    if (typeof window === 'undefined') return
    
    // Check if the user is on a mobile device using a basic check
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
    
    // Check if we should show the prompt based on localStorage
    const promptDismissed = localStorage.getItem('app_prompt_dismissed')
    
    // Show prompt for mobile users who haven't dismissed it
    if (isMobile && promptDismissed !== 'true') {
      setShowPrompt(true)
    }
  }, [])

  return { showPrompt, setShowPrompt }
}

export default function ProductScreen({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params using React.use()
  const resolvedParams = React.use(params);
  
  // Standard state hooks
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(true) // Auto-expand description
  const [isSpecsExpanded, setIsSpecsExpanded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  
  // Use the mobile detection hook
  const { showPrompt: showMobilePrompt, setShowPrompt: setShowMobilePrompt } = useMobilePrompt();
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile viewport on client side
  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const router = useRouter()
  const { addToCart, totalItems } = useCart()
  const { isAuthenticated, logout, user } = useAuth()
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist()

  // Sample product data - In a real app, this would come from an API call
  const product = {
    id: String(resolvedParams.id),
    name: "Aashirvaad Multigrain Atta",
    price: "₹327",
    mrp: "₹404",
    discount: "18% OFF",
    description: "Aashirvaad Multigrain Atta is a blend of 6 grains - wheat, soy, channa, oat, maize and psyllium husk. This wholesome multigrain blend is high in fiber and protein, suitable for making soft and delicious rotis that keep you energetic throughout the day.",
    quantity: "5 Kg",
    rating: 4.5,
    reviews: 120,
    specifications: [
      { name: "Weight", value: "5 Kg" },
      { name: "Ingredients", value: "Wheat, Soy, Channa, Oat, Maize, Psyllium Husk" },
      { name: "Shelf Life", value: "6 months from packaging" },
      { name: "Storage Instructions", value: "Store in a cool, dry place away from direct sunlight" },
      { name: "Country of Origin", value: "India" },
    ],
    images: [
      "/363209a.jpg",
      "/395091a.jpg",
      "/480934a.jpg"
    ],
    // Add store options for comparison
    storeOptions: [
      {
        storeId: "1",
        storeName: "Satish General Store",
        price: "₹327",
        available: true,
        distance: "0.5 km",
        rating: 4.2,
        deliveryTime: "10-15 min"
      },
      {
        storeId: "2",
        storeName: "Pandit General Store",
        price: "₹335",
        available: true,
        distance: "3.1 km",
        rating: 4.5,
        deliveryTime: "25-30 min"
      },
      {
        storeId: "3",
        storeName: "Anuj Kirana Store",
        price: "₹320",
        available: true,
        distance: "3.5 km",
        rating: 4.0,
        deliveryTime: "30-35 min"
      },
      {
        storeId: "4",
        storeName: "Quick Mart Grocery",
        price: "₹329",
        available: true,
        distance: "1.8 km",
        rating: 4.3,
        deliveryTime: "15-20 min"
      },
      {
        storeId: "5",
        storeName: "Fresh Harvest Market",
        price: "₹330",
        available: true,
        distance: "2.2 km",
        rating: 4.6,
        deliveryTime: "20-25 min"
      },
      {
        storeId: "6",
        storeName: "Sharma Provision Store",
        price: "₹345",
        available: false,
        distance: "0.8 km",
        rating: 4.1,
        deliveryTime: "10-15 min"
      },
      {
        storeId: "7",
        storeName: "Local Bazaar",
        price: "₹325",
        available: true,
        distance: "1.5 km",
        rating: 3.9,
        deliveryTime: "15-20 min"
      }
    ]
  }

  // Find cheapest store option
  const sortedStoreOptions = [...product.storeOptions].sort((a, b) => {
    if (a.available !== b.available) {
      return a.available ? -1 : 1
    }
    
    const priceA = parseFloat(a.price.replace('₹', ''))
    const priceB = parseFloat(b.price.replace('₹', ''))
    return priceA - priceB
  })
  
  // Set initially selected store to the cheapest available one
  const cheapestStore = sortedStoreOptions.find(store => store.available)
  const cheapestStoreId = cheapestStore?.storeId || "1"

  // State for selectedStore
  const [selectedStoreId, setSelectedStoreId] = useState(cheapestStoreId)
  // State for price updates from marketplaces
  const [updatedPrice, setUpdatedPrice] = useState<string | null>(null)
  
  // Find the selected store option and store data
  const selectedStoreOption = product.storeOptions.find(s => s.storeId === selectedStoreId)
  const selectedStore = stores.find(store => store.id === selectedStoreId) || stores[0]
  
  // Calculate savings amount using the selected store's price
  const currentPrice = parseFloat((updatedPrice || selectedStoreOption?.price || selectedStore.price).replace('₹', ''))
  const originalPrice = parseFloat(product.mrp.replace('₹', ''))
  const savingsAmount = originalPrice - currentPrice
  const savingsPercent = Math.round((savingsAmount / originalPrice) * 100)
  
  // Ensure marketplace price is always based on the selected store
  const handleUpdatePrice = (newPrice: string) => {
    setUpdatedPrice(newPrice)
  }
  
  // Simulate loading state
  useEffect(() => {
    setIsLoading(true)
    setUpdatedPrice(null) // Reset updated price when changing store
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [selectedStoreId])

  // Toggle mobile app prompt visibility
  const toggleMobilePrompt = () => {
    setShowMobilePrompt(!showMobilePrompt)
  }
  
  // Fix the logout function
  const handleLogout = useCallback(() => {
    // Hide the user menu
    setShowUserMenu(false);
    
    // Call the logout function 
    if (logout) {
      logout();
    }
    
    // Use router for navigation instead of direct window access
    router.replace('/login');
    
    // Clear storage in a separate effect to avoid hydration issues
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        localStorage.removeItem('user_token');
        localStorage.removeItem('user_data');
        localStorage.removeItem('auth_state');
        localStorage.removeItem('cartItems'); // Also clear cart items on logout
      }, 0);
    }
  }, [logout, router]);
  
  const handleProfileEdit = () => {
    setShowUserMenu(false);
    router.push('/profile/edit');
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1)
  const decrementQuantity = () => quantity > 1 && setQuantity(prev => prev - 1)
  
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      // Redirect to login page with a return URL instead of showing modal
      router.push(`/login?redirect=${encodeURIComponent(`/product/${product.id}`)}`);
      return;
    }
    
    // Mark that the user has explicitly added an item to cart
    localStorage.setItem('user_added_cart_items', 'true');
    
    addToCart({
      id: product.id,
      name: product.name,
      price: selectedStore.price,
      image: product.images[0],
      mrp: product.mrp,
      quantity: product.quantity
    }, quantity, selectedStore.id);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      // Redirect to login page with a return URL instead of showing modal
      router.push(`/login?redirect=${encodeURIComponent('/checkout')}`);
      return;
    }

    // Mark that the user has explicitly added an item to cart
    localStorage.setItem('user_added_cart_items', 'true');
    
    addToCart({
      id: product.id,
      name: product.name,
      price: selectedStore.price,
      image: product.images[0],
      mrp: product.mrp,
      quantity: product.quantity
    }, quantity, selectedStore.id);
    
    router.push("/checkout");
  };

  const handleWishlist = () => {
    if (!isAuthenticated) {
      // Redirect to login page with a return URL
      router.push(`/login?redirect=${encodeURIComponent(`/product/${product.id}`)}`);
      return;
    }
    
    if (isWishlisted(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: selectedStore.price,
        image: product.images[0],
        mrp: product.mrp,
        quantity: product.quantity
      });
    }
  };

  // Similar products
  const similarProducts: ProductCardProps[] = [
    {
      id: "2",
      name: "Chakki Atta Fresh",
      price: "₹289",
      mrp: "₹350",
      image: "/395091a.jpg",
      quantity: "10 Kg",
      rating: 4.3,
      discount: "17% OFF"
    },
    {
      id: "3",
      name: "Fortune Chakki Fresh Atta",
      price: "₹332",
      mrp: "₹375",
      image: "/480934a.jpg",
      quantity: "5 Kg",
      rating: 4.7,
      discount: "11% OFF"
    },
    {
      id: "4",
      name: "Organic Tattva Wheat Flour",
      price: "₹410",
      mrp: "₹450",
      image: "/363209a.jpg",
      quantity: "5 Kg",
      rating: 4.8,
      discount: "9% OFF"
    }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="h-32 w-32 bg-gray-100 rounded-full flex items-center justify-center mb-4 relative overflow-hidden">
            <Image 
              src="/15-mins.png" 
              alt="Quick Delivery" 
              width={80} 
              height={80}
              className="animate-pulse"
            />
            <div className="absolute inset-0 border-t-4 border-pastel-orange rounded-full animate-spin"></div>
          </div>
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-36 animate-pulse"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile app prompt */}
      {showMobilePrompt && (
        <MobileAppPrompt onClose={toggleMobilePrompt} />
      )}
      
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/category/atta-and-flour" prefetch={false}>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <ArrowLeft size={20} />
                </Button>
              </Link>
              <h1 className="font-medium text-lg line-clamp-1">Product</h1>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Wishlist button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-9 w-9 relative" 
                onClick={handleWishlist}
              >
                <Heart 
                  size={20} 
                  className={isWishlisted(product.id) ? "fill-red-500 text-red-500" : ""} 
                />
              </Button>
              
              {/* Cart button with count */}
              <Link href="/cart">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-9 w-9 relative"
                >
                  <ShoppingCart size={20} />
                  {totalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pastel-orange text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {totalItems()}
                    </span>
                  )}
                </Button>
              </Link>
              
              {/* User menu */}
              {isAuthenticated ? (
                <div className="relative">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9" 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                  >
                    <User size={20} />
                  </Button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      <Link 
                        href="/profile" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Profile
                      </Link>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleProfileEdit}
                      >
                        Edit Profile
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Login Required Modal */}
      <LoginRequiredModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onLogin={() => router.push('/login')}
        actionType="wishlist"
      />

      {/* Main product content */}
      <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
        {/* Product images and info */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex flex-col md:flex-row md:gap-8">
            <div className="md:w-2/5">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-square w-full mb-3"
              >
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-contain"
                  priority
                />
                {/* Discount tag */}
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded"
                >
                  {product.discount}
                </motion.div>
                {/* Wishlist button overlay */}
                <motion.button 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full shadow-sm hover:bg-white"
                  onClick={handleWishlist}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart 
                    size={18} 
                    className={isWishlisted(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"} 
                  />
                </motion.button>
              </motion.div>
              <div className="flex gap-2 justify-center">
                {product.images.map((image, index) => (
                  <motion.button 
                    key={index} 
                    className={`border rounded-md overflow-hidden w-16 h-16 relative ${selectedImage === index ? 'border-pastel-orange' : 'border-gray-200'}`}
                    onClick={() => setSelectedImage(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - view ${index + 1}`}
                      fill
                      className="object-contain"
                    />
                  </motion.button>
                ))}
              </div>
            </div>
            
            <div className="md:w-3/5 mt-6 md:mt-0">
              {/* Product name and basic info */}
              <motion.h1 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl font-semibold text-gray-800 mb-1"
              >
                {product.name}
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center text-sm text-gray-500 mb-4 gap-2"
              >
                <span>{product.quantity}</span>
                <span>•</span>
                <div className="flex items-center">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1">{product.rating}</span>
                  <span className="ml-1">({product.reviews} reviews)</span>
                </div>
              </motion.div>
              
              {/* Store selector with improved styling */}
              <div className="mb-6">
                <h3 className="text-base font-medium text-gray-800 mb-3">Available at:</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-[300px] overflow-y-auto pr-1">
                  {sortedStoreOptions.map((storeOption, index) => {
                    // Find the store in our stores list or create a placeholder
                    const store = stores.find(s => s.id === storeOption.storeId) || {
                      id: storeOption.storeId,
                      name: storeOption.storeName,
                      image: ""
                    };
                    
                    const isCheapest = storeOption.storeId === cheapestStoreId && storeOption.available;
                    
                    // Calculate percentage difference from the cheapest
                    let priceDiff = 0;
                    if (cheapestStore && storeOption.available && storeOption.storeId !== cheapestStoreId) {
                      const thisPrice = parseFloat(storeOption.price.replace('₹', ''));
                      const lowestPrice = parseFloat(cheapestStore.price.replace('₹', ''));
                      priceDiff = Math.round(((thisPrice - lowestPrice) / lowestPrice) * 100);
                    }
                    
                    return (
                      <motion.div 
                      key={storeOption.storeId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        className={`bg-white border rounded-lg overflow-hidden shadow-sm ${
                          selectedStoreId === storeOption.storeId 
                            ? 'border-pastel-orange ring-1 ring-pastel-orange/20' 
                            : 'border-gray-200 hover:border-gray-300'
                        } ${!storeOption.available ? 'opacity-60' : ''}
                          cursor-pointer transition-all duration-200 text-xs
                        `}
                        onClick={() => storeOption.available && setSelectedStoreId(storeOption.storeId)}
                    >
                        {/* Store header with price */}
                        <div className={`px-2 py-1.5 flex items-center justify-between ${
                          isCheapest ? 'bg-green-50 border-b border-green-100' : 
                          selectedStoreId === store.id ? 'bg-pastel-orange/5 border-b border-pastel-orange/10' : 
                          'bg-gray-50 border-b border-gray-100'
                        }`}>
                          <div className="flex items-center gap-1.5">
                            <div className="flex-shrink-0 w-5 h-5 rounded-full overflow-hidden bg-white flex items-center justify-center border border-gray-200">
                              <Store className={`h-3 w-3 ${selectedStoreId === store.id ? 'text-pastel-orange' : 'text-gray-500'}`} />
                            </div>
                            <h4 className="font-medium text-[11px] truncate max-w-[80px]">{store.name}</h4>
                          </div>
                          <div className="flex items-center">
                            {isCheapest && (
                              <motion.span 
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                className="text-[8px] bg-green-100 text-green-700 px-1 py-0.5 rounded-full font-medium flex items-center gap-0.5"
                              >
                                <Star className="h-1.5 w-1.5 fill-green-600" />
                                Best
                              </motion.span>
                            )}
                          </div>
                        </div>
                        
                        {/* Store details and actions */}
                        <div className="p-2">
                          {/* Price and ratings row */}
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center text-[8px] text-gray-500">
                              <Star className="h-2 w-2 text-amber-400 fill-amber-400 mr-0.5" />
                              <span className="text-[8px] text-gray-600">{storeOption.rating}</span>
                              <span className="mx-0.5">•</span>
                              <span>{storeOption.distance}</span>
                            </div>
                            
                            <div className="flex flex-col items-end">
                              <div className="font-bold text-xs text-gray-900">
                                {storeOption.price}
                              </div>
                              
                              {priceDiff > 0 && (
                                <div className="text-[8px] text-red-500 flex items-center">
                                  <ArrowUp className="h-1.5 w-1.5 mr-0.5" />
                                  {priceDiff}%
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Delivery info */}
                          <div className="text-[8px] text-gray-500 mb-1.5 flex items-center">
                            <Truck className="h-2 w-2 mr-0.5 text-gray-400" />
                            <span>{storeOption.deliveryTime || '15-20 min'}</span>
                          </div>
                          
                          {/* Not available or Action buttons */}
                          {!storeOption.available ? (
                            <div className="text-[8px] text-gray-500 flex items-center justify-center bg-gray-50 py-1 rounded">
                              <AlertCircle className="h-2 w-2 mr-0.5" />
                              Not available
                            </div>
                          ) : (
                            <div className="flex gap-1 mt-1 justify-end">
                              {selectedStoreId === store.id ? (
                                <motion.div 
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="w-full py-1 text-[9px] flex items-center justify-center gap-0.5 bg-pastel-orange/5 text-pastel-orange rounded font-medium"
                                >
                                  <Check className="h-2 w-2" />
                                  Selected
                                </motion.div>
                              ) : (
                                <>
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex-1 h-5 px-1.5 text-[9px] rounded border border-gray-200 bg-white text-gray-700 font-medium"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedStoreId(store.id);
                                    }}
                                  >
                                    Select
                                  </motion.button>
                                  
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`h-5 px-1.5 text-[9px] rounded flex items-center justify-center flex-1 ${
                                      isCheapest 
                                        ? 'bg-green-600 hover:bg-green-700 text-white font-medium' 
                                        : 'border border-pastel-orange text-pastel-orange hover:bg-pastel-orange/10 font-medium'
                                    }`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedStoreId(store.id);
                                      handleAddToCart();
                                    }}
                                  >
                                    <Plus className="h-2 w-2 mr-0.5" />
                                    Add
                                  </motion.button>
                                </>
                              )}
                            </div>
                          )}
                      </div>
                      </motion.div>
                    );
                  })}
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-blue-50 p-2.5 text-xs text-blue-700 flex items-start gap-2 mt-3 rounded-md"
                >
                  <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                  <p>
                    <span className="font-medium">Free delivery on orders of ₹199 or more from a single store.</span> We recommend 
                    ordering all products from the same store to avoid additional delivery charges.
                  </p>
                </motion.div>
              </div>
              
              {/* Price info with better visualization */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-baseline gap-2 mb-5 bg-green-50 p-3 rounded-md"
              >
                <span className="text-2xl font-semibold text-gray-900">{updatedPrice || selectedStoreOption?.price || selectedStore.price}</span>
                <span className="text-gray-500 line-through">{product.mrp}</span>
                <div className="flex items-center ml-2">
                  <span className="text-green-600 text-sm font-medium">
                    You save: ₹{savingsAmount} ({savingsPercent}%)
                  </span>
                </div>
              </motion.div>
              
              {/* Quantity selector */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-6"
              >
                <h3 className="text-sm font-medium text-gray-700 mb-2">Quantity:</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center border rounded-md">
                    <motion.button 
                      whileHover={{ backgroundColor: "#f3f4f6" }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 rounded-l-md"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus size={16} />
                    </motion.button>
                    <div className="w-12 text-center font-medium">{quantity}</div>
                    <motion.button 
                      whileHover={{ backgroundColor: "#f3f4f6" }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-md"
                      onClick={incrementQuantity}
                    >
                      <Plus size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
              
              {/* Delivery info */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 p-3 rounded-md mb-6 bg-blue-50 text-blue-800"
              >
                <Truck className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm">
                  Delivery available in <span className="font-medium">2-3 hours</span> for this location
                </p>
              </motion.div>
              
              {/* Add to cart and buy now buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 gap-3 mb-6"
              >
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-12 flex items-center justify-center px-4 py-2 font-medium rounded-md border border-pastel-orange text-pastel-orange hover:bg-pastel-orange/5"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Add to Cart
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-12 flex items-center justify-center px-4 py-2 font-medium rounded-md bg-pastel-orange hover:bg-pastel-orange/90 text-white"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Description and specifications */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-4 mb-4"
        >
          {/* Description */}
          <div className="mb-4 pb-4 border-b border-gray-100">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            >
              <h2 className="text-lg font-medium text-gray-800">Product Description</h2>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-500 p-1"
              >
                {isDescriptionExpanded ? 
                  <Minus size={18} /> :
                  <Plus size={18} />
                }
              </motion.button>
            </div>
            
            {isDescriptionExpanded && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-3"
              >
                <p className="text-gray-600 text-sm leading-relaxed">
                  {product.description}
                </p>
              </motion.div>
            )}
          </div>
          
          {/* Specifications */}
          <div>
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setIsSpecsExpanded(!isSpecsExpanded)}
            >
              <h2 className="text-lg font-medium text-gray-800">Specifications</h2>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-500 p-1"
              >
                {isSpecsExpanded ? 
                  <Minus size={18} /> :
                  <Plus size={18} />
                }
              </motion.button>
            </div>
            
            {isSpecsExpanded && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-3"
              >
                <table className="w-full">
                  <tbody>
                    {product.specifications.map((spec, index) => (
                      <motion.tr 
                        key={index} 
                        className="border-b border-gray-100 last:border-0"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <td className="py-2 pr-4 text-sm text-gray-500 align-top w-1/3">{spec.name}</td>
                        <td className="py-2 text-sm text-gray-800">{spec.value}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
          </div>
        </motion.div>
        
        {/* Marketplace comparison */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8"
        >
          <MarketplaceComparison 
            productQuery={product.name} 
            ownStorePrice={updatedPrice || selectedStoreOption?.price || selectedStore.price}
            ownStoreId={selectedStoreId}
            onUpdatePrice={handleUpdatePrice}
          />
        </motion.div>
        
        {/* Similar products */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm p-4 mb-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800">You Might Also Like</h2>
            <Link href="/category/atta-and-flour" className="text-pastel-orange text-sm">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {similarProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + (index * 0.05) }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <ProductCard 
                {...product}
              />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
      
      {/* Sticky bottom bar for mobile */}
      {isMobile && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] p-3 z-20"
        >
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full h-12 flex items-center justify-center rounded-md border border-pastel-orange text-pastel-orange bg-white"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={16} className="mr-1.5" />
              Add to Cart
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full h-12 flex items-center justify-center rounded-md bg-pastel-orange text-white"
              onClick={handleBuyNow}
            >
              Buy Now
            </motion.button>
          </div>
        </motion.div>
      )}
      
      {/* Scroll to top button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-20 md:bottom-4 right-4 z-20 rounded-full h-10 w-10 bg-pastel-orange text-white shadow-lg flex items-center justify-center hover:bg-pastel-orange/90"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUp size={18} />
      </motion.button>
    </div>
  )
}
