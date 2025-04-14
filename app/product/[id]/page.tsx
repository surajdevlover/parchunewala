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

// Fix the useMobileDetection hook outside the component
const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  
  useEffect(() => {
    // Only run on client
    const checkMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobile(checkMobile);
    
    // Check localStorage only on client side
    const hasBeenDismissed = localStorage.getItem('app_prompt_dismissed') === 'true';
    
    if (checkMobile && !hasBeenDismissed) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  return { showPrompt, setShowPrompt };
};

export default function ProductScreen({ params }: { params: { id: string } }) {
  // Standard state hooks
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [isSpecsExpanded, setIsSpecsExpanded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  
  // Use the mobile detection hook
  const { showPrompt: showMobilePrompt, setShowPrompt: setShowMobilePrompt } = useMobileDetection();

  const router = useRouter()
  const { addToCart, totalItems } = useCart()
  const { isAuthenticated, logout, user } = useAuth()

  // Sample product data - In a real app, this would come from an API call
  const product = {
    id: params.id,
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
    ]
  }

  // Similar products
  const similarProducts = [
    {
      id: "101",
      name: "Fortune Chakki Fresh Atta",
      price: "₹289",
      mrp: "₹350",
      quantity: "5 Kg",
      image: "/252412a.jpg",
      rating: 4.3,
      discount: "17% OFF"
    },
    {
      id: "102",
      name: "Pillsbury Chakki Fresh Atta",
      price: "₹304",
      mrp: "₹380",
      quantity: "5 Kg",
      image: "/359045a.jpg",
      rating: 4.1,
      discount: "20% OFF"
    },
    {
      id: "103",
      name: "Nature Fresh Sampoorna Atta",
      price: "₹279",
      mrp: "₹320",
      quantity: "5 Kg",
      image: "/523829a.jpg",
      rating: 4.4,
      discount: "12% OFF"
    },
    {
      id: "104",
      name: "Aashirvaad Select Atta",
      price: "₹340",
      mrp: "₹400",
      quantity: "5 Kg",
      image: "/409780a.jpg",
      rating: 4.6,
      discount: "15% OFF"
    }
  ]

  // Stores that offer this product
  const stores = [
    {
      id: "1",
      name: "Satish General Store",
      distance: "0.5 km",
      delivery: "10-15 min",
      price: product.price
    },
    {
      id: "2",
      name: "Pandit General Store",
      distance: "3.1 km",
      delivery: "15-20 min",
      price: "₹331"
    },
    {
      id: "3",
      name: "Anuj Kirana Store",
      distance: "3.5 km",
      delivery: "20-25 min",
      price: "₹325"
    }
  ]

  const [selectedStore, setSelectedStore] = useState(stores[0])

  useEffect(() => {
    // Simulate loading time for product data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  // Improve the dismissAppPrompt function
  const dismissAppPrompt = useCallback(() => {
    setShowMobilePrompt(false);
    // Store in localStorage only on client-side
    if (typeof window !== 'undefined') {
      localStorage.setItem('app_prompt_dismissed', 'true');
    }
  }, [setShowMobilePrompt]);
  
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
      setShowLoginModal(true);
      return;
    }
    
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
      setShowLoginModal(true);
      return;
    }

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
      setShowLoginModal(true);
      return;
    }
    
    setIsWishlisted(prev => !prev);
  };
  
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
    <main className="min-h-screen bg-gray-50">
      {/* Completely redesigned Blinkit mobile header */}
      <header className="sticky top-0 z-50 bg-white">
        {/* Delivery location bar */}
        <div className="bg-[#0c831f] text-white py-2 px-3 flex items-center">
          <div className="flex-1 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
              <path d="M7 1.5C4.33 1.5 2.1667 3.6667 2.1667 6.3333C2.1667 8.0833 3.1667 9.8 4.15 11.0333C4.9667 12.05 5.8 12.8167 6.4167 13.3C6.5834 13.4333 6.7334 13.55 6.8667 13.65C6.9334 13.7 7 13.75 7.0667 13.8C7.1334 13.75 7.2 13.7 7.2667 13.65C7.4 13.55 7.55 13.4333 7.7167 13.3C8.3334 12.8167 9.1667 12.05 9.9834 11.0333C10.9667 9.8 12 8.0833 12 6.3333C11.8334 3.6667 9.6667 1.5 7 1.5ZM7 8.5C5.8 8.5 4.8334 7.5 4.8334 6.3333C4.8334 5.1667 5.8 4.1667 7 4.1667C8.2 4.1667 9.1667 5.1667 9.1667 6.3333C9.1667 7.5 8.2 8.5 7 8.5Z" fill="currentColor"/>
            </svg>
            <span className="text-xs font-medium">Delhi 110001</span>
            <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
              <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="text-xs font-medium flex items-center">
              <svg className="w-3.5 h-3.5 mr-0.5" viewBox="0 0 14 14" fill="none">
                <path d="M11.6667 5.75L12.25 5.08333C12.5833 4.75 12.5833 4.25 12.25 3.91667L10.0833 1.75C9.75 1.41667 9.25 1.41667 8.91667 1.75L8.25 2.33333M11.6667 5.75L4.75 12.6667H2.33333V10.25L9.25 3.33333M11.6667 5.75L9.25 3.33333M8.25 2.33333L9.25 3.33333" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Offers
            </button>
          </div>
        </div>
        
        {/* Main header with logo and icons */}
        <div className="py-2.5 px-3 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <Link href="/home" className="outline-none">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full p-0 text-gray-700 hover:bg-gray-100">
                <ArrowLeft size={18} />
              </Button>
            </Link>
            <Link href="/" className="outline-none hidden xs:block">
              <div className="flex items-center">
                <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                  <path d="M21.931 6.35626C23.1277 7.19309 23.9231 8.47254 24.1178 9.84996C24.3126 11.2333 23.8919 12.646 23.0142 13.7799C21.7923 15.4012 20.1179 16.7068 18.0001 17.5001C17.8774 17.5576 17.7465 17.5874 17.6173 17.5876C17.346 17.5909 17.0827 17.4934 16.8793 17.3107C16.675 17.1281 16.5424 16.873 16.5067 16.5953C16.4711 16.3187 16.5371 16.0369 16.6933 15.8066C16.8504 15.5761 17.086 15.4125 17.3534 15.3436C19.0626 14.7058 20.3542 13.6501 21.292 12.4001C21.8173 11.6999 22.0626 10.8345 21.9542 9.95937C21.8442 9.08429 21.3876 8.29372 20.6792 7.76251C20.2884 7.46251 19.8267 7.25937 19.352 7.14996C19.0179 7.05154 18.6594 7.01095 18.3001 7.03748C18.018 7.05232 17.7456 6.9721 17.5226 6.80937C17.2993 6.64663 17.1408 6.40917 17.076 6.14172C17.0122 5.8755 17.0474 5.59326 17.1753 5.35155C17.3034 5.10985 17.5162 4.92611 17.7742 4.83748C18.2657 4.69996 18.7875 4.63748 19.3089 4.65626C20.2456 4.70155 21.1392 4.99996 21.931 6.35626ZM18.1209 9.92813C18.1209 10.2116 18.0093 10.4828 17.8087 10.6848C17.608 10.8868 17.3355 10.9993 17.0501 10.9993C16.7646 10.9993 16.4921 10.8868 16.2914 10.6848C16.0909 10.4828 15.9792 10.2116 15.9792 9.92813C15.9792 9.64461 16.0909 9.37342 16.2914 9.17143C16.4921 8.96944 16.7646 8.85696 17.0501 8.85696C17.3355 8.85696 17.608 8.96944 17.8087 9.17143C18.0093 9.37342 18.1209 9.64461 18.1209 9.92813Z" fill="#0C831F"/>
                  <path d="M15.8944 15.4001C18.0475 14.6658 19.6007 13.5141 20.6239 12.1141C21.0799 11.491 21.2887 10.7323 21.1985 9.9658C21.106 9.19934 20.7235 8.49698 20.1287 8.03751C19.6867 7.69364 19.153 7.48413 18.5882 7.4376C17.853 7.38751 17.1202 7.53751 16.4482 7.86876C15.2252 8.44687 14.1767 9.41566 13.2767 10.7892C13.1735 10.9423 13.073 11.0955 12.9702 11.2509C12.5097 11.5126 12.0352 11.8376 11.5491 12.2563C9.70325 13.8295 8.55856 15.4517 8.10638 17.1236C7.99762 17.5001 7.95091 17.8845 7.97856 18.2642C8.02528 18.9189 8.28013 19.5611 8.73231 20.0564C9.36294 20.7533 10.2559 21.0486 11.1632 20.8611C12.4935 20.589 13.8958 19.7502 15.4444 18.324C15.7138 18.0752 15.9761 17.8123 16.2337 17.5376C16.8364 17.228 17.4814 16.8329 18.1665 16.3799C17.2217 16.5486 16.3352 16.7939 15.8944 15.4001ZM13.2207 14.3439C13.0202 14.1418 12.9087 13.8703 12.9087 13.5864C12.9087 13.3026 13.0202 13.031 13.2207 12.829C13.4212 12.627 13.6935 12.5143 13.9788 12.5143C14.264 12.5143 14.5363 12.627 14.7368 12.829C14.9373 13.031 15.0488 13.3026 15.0488 13.5864C15.0488 13.8703 14.9373 14.1418 14.7368 14.3439C14.5363 14.5459 14.264 14.6586 13.9788 14.6586C13.6935 14.6586 13.4212 14.5459 13.2207 14.3439Z" fill="#FFE031"/>
                  <path d="M12.2279 17.9611C11.0629 19.1876 10.0048 19.8705 9.18524 20.0564C8.73047 20.1658 8.29524 20.117 7.93571 19.8892C7.57618 19.6627 7.32524 19.2908 7.24571 18.8252C7.19119 18.4783 7.24571 18.117 7.37401 17.7627C7.38352 17.7345 7.39762 17.7095 7.41171 17.6814C7.41171 17.6814 7.46618 17.5498 7.51143 17.4345C7.59095 17.2455 7.7549 16.8939 8.06856 16.4658C8.70304 15.5986 9.7259 14.6892 11.2304 13.8564C11.6797 13.6189 12.1149 13.4049 12.5292 13.2158C12.7321 12.877 12.9635 12.5477 13.2159 12.2277C14.0495 11.0011 15.0143 10.1236 16.1397 9.56403C16.7721 9.25949 17.4374 9.09676 18.1168 9.08926C18.5591 9.08926 19.0047 9.1517 19.4359 9.28926C20.1945 9.5267 20.836 10.03 21.2239 10.7033C21.61 11.3767 21.7669 12.1748 21.6339 12.9376C21.5647 13.3267 21.4237 13.7077 21.2145 14.0705C20.5485 15.2861 19.3193 16.4845 17.4997 17.4189C17.0359 17.6736 16.562 17.9002 16.0835 18.0955C15.8552 18.4064 15.6129 18.7033 15.3526 18.9893C13.9623 20.492 12.6342 21.5626 11.1323 21.9142C10.8186 21.9908 10.4973 22.0283 10.1761 22.0236C9.0692 22.0236 7.9647 21.5486 7.19738 20.6814C6.63929 20.0439 6.32571 19.2705 6.27049 18.4783C6.22003 17.9939 6.27714 17.5033 6.44095 17.0283C6.57619 16.6486 6.77429 16.2814 7.03452 15.9283C7.75856 14.9439 9.09715 13.5236 11.2371 12.0049C11.4733 11.8299 11.7141 11.6564 11.9549 11.4939C11.8929 11.4 11.8333 11.3173 11.7714 11.2252C10.9331 10.0517 10.3099 8.97358 9.91714 8.01884C9.70762 7.5111 9.62333 7.00337 9.67381 6.52358C9.72428 6.04379 9.9081 5.61732 10.2057 5.31278C10.503 5.00824 10.9002 4.8267 11.3833 4.85497C12.1216 4.90027 12.8883 5.3127 13.6075 6.08926C14.6621 7.22355 15.5431 9.01416 16.2411 11.328C16.3079 11.5627 16.3723 11.8017 16.4367 12.0439C16.8081 11.8736 17.1768 11.7189 17.5384 11.5798C17.139 10.5111 16.6842 9.50493 16.1492 8.56403C15.3036 7.08926 14.3482 5.95497 13.3602 5.28926C12.8977 4.9847 12.3962 4.82197 11.8835 4.80817C11.0654 4.78453 10.3216 5.17358 9.81595 5.92358C9.31047 6.67358 9.12714 7.75031 9.57239 8.9252C9.99333 9.96903 10.6583 11.1142 11.5679 12.367C11.1014 12.6299 10.6349 12.9142 10.1784 13.2158C9.2904 13.8236 8.51357 14.4658 7.85524 15.1142C7.41357 15.5674 7.03947 16.0495 6.72571 16.5674C6.39809 17.1048 6.15667 17.6814 6.01667 18.3173C5.93238 18.7423 5.90381 19.1767 5.93714 19.6033C6.00186 20.5814 6.37547 21.5299 7.03947 22.3173C8.00714 23.4517 9.39047 24.0283 10.837 24.0283C11.2555 24.0345 11.674 23.9908 12.0854 23.8986C13.9097 23.4767 15.4629 22.2205 17.0359 20.4939C18.2613 19.1345 19.3517 17.4939 20.28 15.5814C20.5818 14.9969 20.797 14.3752 20.9193 13.7345C21.0966 12.7517 20.9697 11.7345 20.5367 10.8299C20.1035 9.92527 19.3564 9.19683 18.4514 8.80778C17.9285 8.60027 17.3703 8.50026 16.7979 8.50965C15.9099 8.52345 14.977 8.7939 14.0121 9.28926C12.5966 10.0095 11.4357 11.1486 10.5357 12.5142C9.64524 13.8783 9.13976 15.3548 9.05524 16.8236C9.03143 17.328 9.08667 17.8205 9.21952 18.2971C9.35238 18.7736 9.56667 19.2127 9.86171 19.5955C9.96619 19.7205 10.0799 19.8361 10.1883 19.9283C10.4038 19.8549 10.619 19.7658 10.834 19.6627C11.3606 19.4173 11.8787 19.0814 12.3845 18.6736C12.3295 18.4314 12.2939 18.1939 12.2866 17.9627C12.2841 17.9628 12.2575 17.9609 12.2279 17.9611Z" fill="#0C831F"/>
                </svg>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-gray-700"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <User size={18} />
              </Button>
              
              <Link href="/cart">
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full text-gray-700"
                    onClick={(e) => {
                      if (!isAuthenticated) {
                        e.preventDefault();
                        setShowLoginModal(true);
                      }
                    }}
                  >
                    <ShoppingCart size={18} />
                  </Button>
                  {totalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#0c831f] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                      {totalItems()}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Product info with quick delivery */}
        <div className="px-3 py-2.5 border-b border-gray-100">
          <h1 className="text-base font-medium text-gray-900 leading-snug">{product.name}</h1>
          <div className="mt-1 flex items-center text-xs gap-2">
            <div className="flex items-center gap-1 text-[#0c831f]">
              <Clock size={12} />
              <span className="font-medium">10 min delivery</span>
            </div>
            <span className="h-1 w-1 rounded-full bg-gray-300"></span>
            <div className="flex items-center gap-0.5">
              <Star size={12} fill="#0c831f" className="text-[#0c831f]" />
              <span className="text-gray-700 font-medium">{product.rating}</span>
            </div>
          </div>
        </div>
        
        {/* Search bar */}
        <div className="p-3 border-b border-gray-100">
          <div className="flex items-center bg-gray-100 rounded-md pl-3 py-2.5">
            <Search size={16} className="text-gray-500 mr-2" />
            <span className="text-gray-500 text-sm">Search for products, brands and more</span>
          </div>
        </div>
        
        {/* User menu dropdown - Fixed positioning for reliability */}
        {showUserMenu && (
          <div className="absolute top-[calc(100%+1px)] right-0 left-0 bg-white shadow-xl border-b border-gray-100 w-full z-40">
            {isAuthenticated ? (
              <>
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 bg-pastel-orange/10">
                      <AvatarFallback className="text-pastel-orange">
                        {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Hello, {user?.name?.split(' ')[0] || 'User'}</p>
                      <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <Link href="/profile" className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-3 text-gray-700">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <User size={16} className="text-gray-700" />
                    </div>
                    My Profile
                  </Link>
                  <Link href="/orders" className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-3 text-gray-700">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <Clock size={16} className="text-gray-700" />
                    </div>
                    My Orders
                  </Link>
                  <div className="border-t border-gray-100 mt-1">
                    <button 
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-3 text-red-500"
                      onClick={handleLogout}
                    >
                      <div className="h-8 w-8 rounded-full bg-red-50 flex items-center justify-center">
                        <LogOut size={16} className="text-red-500" />
                      </div>
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-4">
                <h3 className="text-base font-medium mb-3 text-gray-900">Login to continue</h3>
                <p className="text-xs text-gray-600 mb-4">Get access to your orders, offers and recommendations</p>
                
                <Link href="/login" className="block mb-2.5">
                  <Button 
                    variant="default" 
                    className="w-full py-2 text-sm h-10 bg-[#0c831f] hover:bg-[#0c831f]/90 text-white"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register" className="block">
                  <Button 
                    variant="outline" 
                    className="w-full py-2 text-sm h-10 border-[#0c831f] text-[#0c831f] hover:bg-[#0c831f]/5"
                  >
                    Create New Account
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </header>
      
      {/* Mobile App Download Prompt - Blinkit style */}
      {showMobilePrompt && (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-3 shadow-lg z-30 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-[#0c831f] rounded-md flex items-center justify-center mr-3">
                <ShoppingCart size={20} className="text-white" />
              </div>
              <div>
                <h4 className="text-sm font-medium">Get instant delivery with our app</h4>
                <p className="text-[10px] text-gray-600">10-minute delivery, lower prices & exclusive offers!</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                className="h-9 px-3 text-xs bg-[#0c831f] hover:bg-[#0c831f]/90 text-white"
                onClick={() => window.open('https://play.google.com/store', '_blank')}
              >
                Get App
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-gray-400 hover:bg-gray-100"
                onClick={dismissAppPrompt}
              >
                <X size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Product Details */}
      <div className="max-w-7xl mx-auto p-2 xs:p-3 sm:p-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Product hero section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 xs:gap-4 p-2 xs:p-3 sm:p-4">
            {/* Product Image */}
            <div className="relative">
              <div className="relative rounded-lg overflow-hidden aspect-square bg-white">
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain p-2 xs:p-3 sm:p-4"
                  priority
                />
                
                {/* Discount badge */}
                {product.discount && (
                  <div className="absolute top-1.5 xs:top-2 left-1.5 xs:left-2 bg-pastel-orange text-white text-[10px] xs:text-xs font-bold px-1.5 xs:px-2 py-0.5 xs:py-1 rounded">
                    {product.discount}
                  </div>
                )}
              </div>
              
              {/* Thumbnail images */}
              <div className="flex justify-center gap-1.5 xs:gap-2 mt-2 xs:mt-3 sm:mt-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 border rounded-md overflow-hidden ${
                      selectedImage === idx ? 'ring-2 ring-pastel-orange' : ''
                    }`}
                  >
                    <Image src={img} alt={`Product view ${idx + 1}`} width={64} height={64} className="object-contain" />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="space-y-2 xs:space-y-3 sm:space-y-4">
              <div>
                <h1 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900">{product.name}</h1>
                <p className="text-gray-500 text-[10px] xs:text-xs sm:text-sm">{product.quantity}</p>
                
                {/* Ratings */}
                <div className="flex items-center gap-1.5 xs:gap-2 mt-1">
                  <div className="flex items-center gap-0.5 xs:gap-1 bg-green-100 px-1.5 xs:px-2 py-0.5 rounded text-green-800">
                    <Star size={10} className="xs:hidden" fill="currentColor" />
                    <Star size={12} className="hidden xs:block sm:hidden" fill="currentColor" />
                    <Star size={14} className="hidden sm:block" fill="currentColor" />
                    <span className="text-[10px] xs:text-xs sm:text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-gray-500 text-[10px] xs:text-xs sm:text-sm">{product.reviews} reviews</span>
                </div>
              </div>
              
              {/* Store selector */}
              <div className="bg-gray-50 p-1.5 xs:p-2 sm:p-3 rounded-lg">
                <h3 className="text-[10px] xs:text-xs sm:text-sm font-medium mb-1.5 xs:mb-2 flex items-center gap-1">
                  <Truck size={12} className="xs:hidden text-pastel-orange" />
                  <Truck size={14} className="hidden xs:block sm:hidden text-pastel-orange" />
                  <Truck size={16} className="hidden sm:block text-pastel-orange" />
                  Available from multiple stores
                </h3>
                <div className="grid grid-cols-1 gap-1.5 xs:gap-2">
                  {stores.map(store => (
                    <button
                      key={store.id}
                      className={`text-left p-1.5 xs:p-2 rounded-md border ${
                        selectedStore.id === store.id 
                          ? 'border-pastel-orange bg-pastel-orange/5' 
                          : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedStore(store)}
                    >
                      <div className="flex justify-between">
                        <span className="font-medium text-[10px] xs:text-xs sm:text-sm">{store.name}</span>
                        <span className="font-bold text-[10px] xs:text-xs sm:text-sm">{store.price}</span>
                      </div>
                      <div className="flex justify-between mt-0.5 xs:mt-1">
                        <span className="text-[8px] xs:text-[10px] sm:text-xs text-gray-500">{store.distance}</span>
                        <span className="text-[8px] xs:text-[10px] sm:text-xs text-gray-500">Delivery in {store.delivery}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Price */}
              <div className="flex items-baseline gap-1.5 xs:gap-2">
                <span className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900">{selectedStore.price}</span>
                {product.mrp && (
                  <span className="text-gray-500 text-[10px] xs:text-xs sm:text-sm line-through">{product.mrp}</span>
                )}
                {product.discount && (
                  <span className="text-green-600 text-[10px] xs:text-xs sm:text-sm font-medium">{product.discount}</span>
                )}
              </div>
              
              {/* Quantity selector */}
              <div className="flex flex-wrap gap-1.5 xs:gap-2 mt-3 xs:mt-4 sm:mt-6">
                <div className="flex gap-1.5 xs:gap-2 sm:gap-3 items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-7 w-7 xs:h-8 xs:w-8 sm:h-9 sm:w-9"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-2.5 w-2.5 xs:h-3 xs:w-3 sm:h-4 sm:w-4" />
                  </Button>
                  <span className="font-medium w-5 xs:w-6 sm:w-8 text-center text-sm xs:text-base">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-7 w-7 xs:h-8 xs:w-8 sm:h-9 sm:w-9"
                    onClick={incrementQuantity}
                  >
                    <Plus className="h-2.5 w-2.5 xs:h-3 xs:w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
                <div className="flex-1 flex gap-1.5 xs:gap-2 sm:gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-pastel-orange text-pastel-orange hover:bg-pastel-orange/10 text-[10px] xs:text-xs sm:text-sm h-8 xs:h-9 sm:h-10"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    className="flex-1 bg-pastel-orange text-white font-semibold text-[10px] xs:text-xs sm:text-sm h-8 xs:h-9 sm:h-10 hover:bg-pastel-orange/90"
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
              
              {/* Delivery info */}
              <div className="border-t pt-2 xs:pt-3 sm:pt-4 space-y-1.5 xs:space-y-2">
                <div className="flex items-center gap-1.5 xs:gap-2">
                  <Clock size={12} className="xs:hidden text-pastel-orange" />
                  <Clock size={14} className="hidden xs:block sm:hidden text-pastel-orange" />
                  <Clock size={16} className="hidden sm:block text-pastel-orange" />
                  <span className="text-[10px] xs:text-xs sm:text-sm text-gray-700">Delivery in {selectedStore.delivery}</span>
                </div>
                <div className="flex items-center gap-1.5 xs:gap-2">
                  <Shield size={12} className="xs:hidden text-pastel-orange" />
                  <Shield size={14} className="hidden xs:block sm:hidden text-pastel-orange" />
                  <Shield size={16} className="hidden sm:block text-pastel-orange" />
                  <span className="text-[10px] xs:text-xs sm:text-sm text-gray-700">100% Quality Guarantee</span>
                </div>
                <div className="flex items-center gap-1.5 xs:gap-2">
                  <Sparkles size={12} className="xs:hidden text-pastel-orange" />
                  <Sparkles size={14} className="hidden xs:block sm:hidden text-pastel-orange" />
                  <Sparkles size={16} className="hidden sm:block text-pastel-orange" />
                  <span className="text-[10px] xs:text-xs sm:text-sm text-gray-700">Free delivery on orders above ₹99</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Description section */}
          <div className="p-2 xs:p-3 sm:p-4 border-t">
            <button 
              className="flex justify-between items-center w-full py-1.5 xs:py-2"
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            >
              <h2 className="text-sm xs:text-base sm:text-lg font-medium text-gray-900">Product Description</h2>
              {isDescriptionExpanded ? 
                <ChevronUp size={16} className="xs:hidden" /> : 
                <ChevronDown size={16} className="xs:hidden" />
              }
              {isDescriptionExpanded ? 
                <ChevronUp size={18} className="hidden xs:block sm:hidden" /> : 
                <ChevronDown size={18} className="hidden xs:block sm:hidden" />
              }
              {isDescriptionExpanded ? 
                <ChevronUp size={20} className="hidden sm:block" /> : 
                <ChevronDown size={20} className="hidden sm:block" />
              }
            </button>
            
            {isDescriptionExpanded && (
              <div className="mt-1.5 xs:mt-2 text-[10px] xs:text-xs sm:text-sm text-gray-700">
                <p>{product.description}</p>
              </div>
            )}
          </div>
          
          {/* Specifications section */}
          <div className="p-2 xs:p-3 sm:p-4 border-t">
            <button 
              className="flex justify-between items-center w-full py-1.5 xs:py-2"
              onClick={() => setIsSpecsExpanded(!isSpecsExpanded)}
            >
              <h2 className="text-sm xs:text-base sm:text-lg font-medium text-gray-900">Specifications</h2>
              {isSpecsExpanded ? 
                <ChevronUp size={16} className="xs:hidden" /> : 
                <ChevronDown size={16} className="xs:hidden" />
              }
              {isSpecsExpanded ? 
                <ChevronUp size={18} className="hidden xs:block sm:hidden" /> : 
                <ChevronDown size={18} className="hidden xs:block sm:hidden" />
              }
              {isSpecsExpanded ? 
                <ChevronUp size={20} className="hidden sm:block" /> : 
                <ChevronDown size={20} className="hidden sm:block" />
              }
            </button>
            
            {isSpecsExpanded && (
              <div className="mt-1.5 xs:mt-2 space-y-1.5 xs:space-y-2">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="grid grid-cols-2 gap-1.5 xs:gap-2 text-[10px] xs:text-xs sm:text-sm">
                    <span className="text-gray-500">{spec.name}</span>
                    <span className="text-gray-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Similar Products */}
        <div className="mt-4 xs:mt-6 sm:mt-8">
          <div className="flex justify-between items-center mb-2 xs:mb-3 sm:mb-4">
            <h2 className="text-base xs:text-lg sm:text-xl font-semibold">You Might Also Like</h2>
            <Link href="/category/flour" className="text-pastel-orange text-[10px] xs:text-xs sm:text-sm font-medium">View All</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5 xs:gap-2 sm:gap-4">
            {similarProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                mrp={product.mrp}
                image={product.image}
                rating={product.rating}
                discount={product.discount}
                quantity={product.quantity}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Login Required Modal */}
      <LoginRequiredModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        continueShopping={() => setShowLoginModal(false)}
        actionType="checkout"
      />

      {/* Adjust positioning and z-index for floating button */}
      <Button
        className="fixed bottom-4 right-4 z-20 rounded-full h-12 w-12 bg-pastel-orange text-white shadow-lg flex items-center justify-center hover:bg-pastel-orange/90"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUp size={20} />
      </Button>
    </main>
  )
}
