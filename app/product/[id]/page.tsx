"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Heart, Minus, Plus, ShoppingCart, Star, Clock, Shield, Truck, ChevronDown, ChevronUp, Sparkles, Menu, LogOut, User, X, Search, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { LoginRequiredModal } from "@/components/login-required-modal"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useMobileDetection } from "@/lib/use-mobile-detection"
import { MobileAppPrompt } from "@/components/mobile-app-prompt"
import { useWishlist } from "@/lib/wishlist-context"
import { stores } from "@/lib/data"
import { StoreComparison } from "@/components/store-comparison"

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

export default function ProductScreen({ params }: { params: { id: string } }) {
  // Standard state hooks
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [isSpecsExpanded, setIsSpecsExpanded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  
  // Use the mobile detection hook
  const { showPrompt: showMobilePrompt, setShowPrompt: setShowMobilePrompt } = useMobilePrompt();

  const router = useRouter()
  const { addToCart, totalItems } = useCart()
  const { isAuthenticated, logout, user } = useAuth()
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist()

  // Sample product data - In a real app, this would come from an API call
  const product = {
    id: String(params.id),
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
      }
    ]
  }

  // State for selectedStore
  const [selectedStoreId, setSelectedStoreId] = useState(stores[0].id)
  
  // Find the selected store
  const selectedStore = stores.find(store => store.id === selectedStoreId) || stores[0]
  
  // Simulate loading state
  useEffect(() => {
    setIsLoading(true)
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
      <header className="sticky top-0 z-10 bg-white shadow-sm">
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
      <main className="container mx-auto px-4 py-6">
        {/* Product images */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex flex-col md:flex-row md:gap-8">
            <div className="md:w-2/5">
              <div className="relative aspect-square w-full mb-3">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex gap-2 justify-center">
                {product.images.map((image, index) => (
                  <button 
                    key={index} 
                    className={`border rounded-md overflow-hidden w-16 h-16 relative ${selectedImage === index ? 'border-pastel-orange' : 'border-gray-200'}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - view ${index + 1}`}
                      fill
                      className="object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="md:w-3/5 mt-6 md:mt-0">
              {/* Product name and basic info */}
              <h1 className="text-xl font-semibold text-gray-800 mb-1">
                {product.name}
              </h1>
              
              <div className="flex items-center text-sm text-gray-500 mb-4 gap-2">
                <span>{product.quantity}</span>
                <span>•</span>
                <div className="flex items-center">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1">{product.rating}</span>
                  <span className="ml-1">({product.reviews} reviews)</span>
                </div>
              </div>
              
              {/* Store selector */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Available at:</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {stores.map(store => (
                    <button
                      key={store.id}
                      className={`border rounded-lg p-2 flex items-start gap-2 ${selectedStoreId === store.id ? 'border-pastel-orange bg-pastel-orange/5' : 'border-gray-200'}`}
                      onClick={() => setSelectedStoreId(store.id)}
                    >
                      <Truck size={16} className={selectedStoreId === store.id ? 'text-pastel-orange' : 'text-gray-400'} />
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-gray-800 line-clamp-1">{store.name}</p>
                        <p className="text-xs text-gray-500">{store.distance}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Price info */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl font-semibold">{selectedStore.price}</span>
                <span className="text-gray-500 line-through">{product.mrp}</span>
                <span className="text-green-600 text-sm font-medium">{product.discount}</span>
              </div>
              
              {/* Quantity selector */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Quantity:</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center border rounded-md">
                    <button 
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 rounded-l-md"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <div className="w-10 text-center">{quantity}</div>
                    <button 
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-md"
                      onClick={incrementQuantity}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Delivery info */}
              <div className="bg-green-50 p-3 rounded-md mb-6">
                <p className="text-sm text-green-800">
                  Delivery available in <span className="font-medium">2-3 hours</span> for this location
                </p>
              </div>
              
              {/* Add to cart and buy now buttons */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full border-pastel-orange text-pastel-orange hover:bg-pastel-orange/5"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <Button 
                  size="lg" 
                  className="w-full bg-pastel-orange hover:bg-pastel-orange/90 text-white"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Description and specifications */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          {/* Description */}
          <div className="mb-4 pb-4 border-b border-gray-100">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            >
              <h2 className="text-lg font-medium text-gray-800">Product Description</h2>
              <button className="text-gray-500 p-1">
                {isDescriptionExpanded ? 
                  <Minus size={18} /> :
                  <Plus size={18} />
                }
              </button>
            </div>
            
            {isDescriptionExpanded && (
              <div className="mt-3">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}
          </div>
          
          {/* Specifications */}
          <div>
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setIsSpecsExpanded(!isSpecsExpanded)}
            >
              <h2 className="text-lg font-medium text-gray-800">Specifications</h2>
              <button className="text-gray-500 p-1">
                {isSpecsExpanded ? 
                  <Minus size={18} /> :
                  <Plus size={18} />
                }
              </button>
            </div>
            
            {isSpecsExpanded && (
              <div className="mt-3">
                <table className="w-full">
                  <tbody>
                    {product.specifications.map((spec, index) => (
                      <tr key={index} className="border-b border-gray-100 last:border-0">
                        <td className="py-2 pr-4 text-sm text-gray-500 align-top w-1/3">{spec.name}</td>
                        <td className="py-2 text-sm text-gray-800">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        
        {/* Store comparison section */}
        <section className="mt-6">
          <StoreComparison product={product} />
        </section>
        
        {/* Similar products */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800">You Might Also Like</h2>
            <Link href="/category/atta-and-flour" className="text-pastel-orange text-sm">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {similarProducts.map(product => (
              <ProductCard 
                key={product.id}
                {...product}
              />
            ))}
          </div>
        </div>
      </main>
      
      {/* Scroll to top button */}
      <Button
        className="fixed bottom-4 right-4 z-20 rounded-full h-12 w-12 bg-pastel-orange text-white shadow-lg flex items-center justify-center hover:bg-pastel-orange/90"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUp size={20} />
      </Button>
    </div>
  )
}
