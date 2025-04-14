"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Search, ShoppingCart, ChevronLeft, ChevronRight, Clock, Smile, User, LogIn, Store, ExternalLink, LogOut } from "lucide-react"
import { Logo } from "@/components/logo"
import { ProductCard } from "@/components/product-card"
import { StoreCard } from "@/components/store-card"
import { CategoryCard } from "@/components/category-card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Footer from "../footer/footer"
import { useRouter } from "next/navigation"

export default function HomeScreen() {
  const [location, setLocation] = useState("")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeCategory, setActiveCategory] = useState("all")
  const [showTopButton, setShowTopButton] = useState(false)
  const { totalItems: cartItemCount } = useCart()
  const { user, isAuthenticated, logout } = useAuth()
  const [selectedStore, setSelectedStore] = useState<string | null>(null)
  const [showLocationPopup, setShowLocationPopup] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const router = useRouter()

  // Categories with icons
  const categories = [
    { id: "all", name: "All" },
    { id: "groceries", name: "Groceries", icon: "🥑" },
    { id: "fruits", name: "Fruits & Vegetables", icon: "🍎" },
    { id: "dairy", name: "Dairy & Breakfast", icon: "🥛" },
    { id: "snacks", name: "Snacks", icon: "🍿" },
    { id: "beverages", name: "Beverages", icon: "☕" },
    { id: "personal", name: "Personal Care", icon: "🧴" },
    { id: "household", name: "Household", icon: "🧹" },
    { id: "baby", name: "Baby Care", icon: "🍼" },
    { id: "electronics", name: "Electronics", icon: "💻" }
  ]

  // New Image Banners
  const banners = [
    "/Slice-2_10.png",
    "/Slice-3_9.png",
    "/Slice-4_9.png",
    "/Slice-5_4.png",
    "/Slice-6_5.png",
  ]
  
  // Available stores
  const stores = [
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
  
  // Featured products
  const featuredProducts = [
    {
      id: "1",
      name: "Aashirvaad Multigrain Atta",
      price: "₹327",
      mrp: "₹404",
      quantity: "5 Kg",
      image: "https://cdn.zeptonow.com/cms/product_variant/e1812c8a-9ccc-4757-9c99-0cd25c686043.jpeg?height=100&width=100",
      rating: 4.5,
      discount: "14% OFF",
      storeId: "1"
    },
    {
      id: "2",
      name: "Sundrop Superlite Advanced Sunflower Oil",
      price: "₹608",
      mrp: "₹639",
      quantity: "3 L",
      image: "https://cdn.zeptonow.com/cms/product_variant/93be0c88-124c-43e2-9333-6fd304c322f1.jpeg?height=100&width=100",
      rating: 4.2,
      discount: "3% OFF",
      storeId: "1"
    },
    {
      id: "3",
      name: "Wild Stone For Men",
      price: "₹380",
      mrp: "₹690",
      quantity: "100 ML",
      image: "https://cdn.zeptonow.com/inventory/product/1bb219ec-7b91-4824-8f7d-9d10a6a9995b-/tmp/20231003-1649451.jpeg?height=100&width=100",
      rating: 4.7,
      discount: "30% OFF",
      storeId: "2"
    },
    {
      id: "4",
      name: "Britannia 50-50 Maska Chaska Biscuit 300 g Combo",
      price: "₹120",
      mrp: "₹240",
      quantity: "900 g",
      image: "https://cdn.zeptonow.com/cms/product_variant/da022b28-0158-4f39-9335-d18755432e91.jpg?height=100&width=100",
      rating: 4.3,
      discount: "50% OFF",
      storeId: "3"
    },
    {
      id: "5",
      name: "Bonn White Bread",
      price: "₹54",
      mrp: "₹60",
      quantity: "700 g",
      image: "https://cdn.zeptonow.com/cms/product_variant/d12ee83b-4cd5-4dfe-88b0-05b5e1d4c414.jpeg?height=100&width=100",
      rating: 4.7,
      discount: "10% OFF",
      storeId: "1"
    },
    {
      id: "6",
      name: "Tide Matic Liquid Detergent",
      price: "₹309",
      mrp: "₹449",
      quantity: "2 L",
      image: "https://cdn.zeptonow.com/cms/product_variant/c3c04a73-f254-467f-94f5-ae6a548093ec.jpeg?height=100&width=100",
      rating: 4.7,
      discount: "29% OFF",
      storeId: "2"
    }
  ]

  // Special offers based on categories
  const categoryOffers = [
    { 
      id: "fruits", 
      title: "Fresh Fruits",
      image: "/pharmacy-WEB.jpg",
      discount: "Up to 20% OFF"
    },
    { 
      id: "dairy", 
      title: "Dairy Products",
      image: "/Pet-Care_WEB.jpg",
      discount: "Up to 15% OFF"
    },
    { 
      id: "snacks", 
      title: "Snack Corner",
      image: "/paan-corner_web.png",
      discount: "Up to 25% OFF"
    }
  ]
  
  // New product categories sections
  const productSections = [
    {
      id: "snacks",
      title: "Snacks & Munchies",
      products: [
        {
          id: "s1",
          name: "Lay's Classic Salted Chips",
          price: "₹20",
          mrp: "₹25",
          quantity: "52 g",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/lay-s-classic-salted-chips.jpeg?height=100&width=100",
          rating: 4.5,
          discount: "20% OFF",
          storeId: "1"
        },
        {
          id: "s2",
          name: "Haldiram's Aloo Bhujia",
          price: "₹55",
          mrp: "₹70",
          quantity: "200 g",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/haldiram-s-aloo-bhujia.jpeg?height=100&width=100",
          rating: 4.3,
          discount: "21% OFF",
          storeId: "1"
        },
        {
          id: "s3",
          name: "Kurkure Masala Munch",
          price: "₹20",
          mrp: "₹25",
          quantity: "90 g",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/kurkure-masala-munch.jpeg?height=100&width=100",
          rating: 4.2,
          discount: "20% OFF",
          storeId: "2"
        },
        {
          id: "s4",
          name: "Bingo Mad Angles",
          price: "₹30",
          mrp: "₹35",
          quantity: "130 g",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/bingo-mad-angles-achaari-masti.jpeg?height=100&width=100",
          rating: 4.0,
          discount: "14% OFF",
          storeId: "3"
        }
      ]
    },
    {
      id: "dairy",
      title: "Dairy, Bread & Eggs",
      products: [
        {
          id: "d1",
          name: "Amul Butter",
          price: "₹55",
          mrp: "₹60",
          quantity: "100 g",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/amul-butter.jpeg?height=100&width=100",
          rating: 4.7,
          discount: "8% OFF",
          storeId: "1"
        },
        {
          id: "d2",
          name: "Mother Dairy Milk",
          price: "₹30",
          mrp: "₹32",
          quantity: "500 ml",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/mother-dairy-milk.jpeg?height=100&width=100",
          rating: 4.5,
          discount: "6% OFF",
          storeId: "1"
        },
        {
          id: "d3",
          name: "Farm Fresh Eggs",
          price: "₹90",
          mrp: "₹100",
          quantity: "12 pcs",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/farm-fresh-eggs.jpeg?height=100&width=100",
          rating: 4.3,
          discount: "10% OFF",
          storeId: "2"
        },
        {
          id: "d4",
          name: "Britannia Brown Bread",
          price: "₹45",
          mrp: "₹50",
          quantity: "400 g",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/britannia-brown-bread.jpeg?height=100&width=100",
          rating: 4.6,
          discount: "10% OFF",
          storeId: "1"
        }
      ]
    },
    {
      id: "beverages",
      title: "Cold Drinks & Juices",
      products: [
        {
          id: "b1",
          name: "Coca-Cola",
          price: "₹40",
          mrp: "₹45",
          quantity: "750 ml",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/coca-cola.jpeg?height=100&width=100",
          rating: 4.4,
          discount: "11% OFF",
          storeId: "1"
        },
        {
          id: "b2",
          name: "Real Fruit Juice",
          price: "₹110",
          mrp: "₹125",
          quantity: "1 L",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/real-fruit-juice.jpeg?height=100&width=100",
          rating: 4.3,
          discount: "12% OFF",
          storeId: "1"
        },
        {
          id: "b3",
          name: "Red Bull Energy Drink",
          price: "₹115",
          mrp: "₹125",
          quantity: "250 ml",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/red-bull-energy-drink.jpeg?height=100&width=100",
          rating: 4.5,
          discount: "8% OFF",
          storeId: "2"
        },
        {
          id: "b4",
          name: "Pepsi Black",
          price: "₹35",
          mrp: "₹40",
          quantity: "750 ml",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/pepsi-black.jpeg?height=100&width=100",
          rating: 4.1,
          discount: "12% OFF",
          storeId: "3"
        }
      ]
    }
  ]

  useEffect(() => {
    // Get saved location from localStorage
    const savedLocation = localStorage.getItem('userLocation')
    if (savedLocation) {
      const locationData = JSON.parse(savedLocation)
      setLocation(locationData.address)
    } else {
      // Show location popup if no location is saved
      setShowLocationPopup(true)
    }
    
    // Banner slider auto rotation
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % banners.length)
    }, 5000)
    
    // Scroll event to show/hide back to top button
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopButton(true)
      } else {
        setShowTopButton(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [banners.length])
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % banners.length)
  }

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + banners.length) % banners.length)
  }

  // Filter products by selected store
  const filteredProducts = selectedStore
    ? featuredProducts.filter(product => product.storeId === selectedStore)
    : featuredProducts

  const handleLogout = useCallback(() => {
    // Call the logout function from auth context
    logout();
    // Hide the user menu
    setShowUserMenu(false);
    // Redirect to login page
    router.push('/login');
  }, [logout, router]);

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      {/* Location Popup */}
      {showLocationPopup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4">Choose your location</h2>
            <p className="text-gray-600 mb-4">To enjoy all that Quick Grocery has to offer you, we need your location</p>
            
            <Link href="/location" className="block">
              <Button className="w-full bg-pastel-orange text-white h-11 mb-3">
                <MapPin size={18} className="mr-2" />
                Choose location
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              className="w-full h-11"
              onClick={() => setShowLocationPopup(false)}
            >
              Skip for now
            </Button>
          </div>
        </div>
      )}
      
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
          <Logo size="md"/>
              
              <Link href="/location" className="flex items-center gap-1 text-gray-700 ml-4">
                <MapPin size={16} className="text-pastel-orange" />
                <div className="flex flex-col">
                  <span className="text-xs font-medium">DELIVERY TO</span>
                  <span className="text-sm font-medium truncate max-w-36">
                    {location || "Select location"}
                  </span>
                </div>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-grow max-w-md mx-4">
              <Link href="/search" className="relative w-full block">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <div className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-100 text-gray-500 text-sm border border-gray-200">
                  Search for groceries, essentials...
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <div className="relative">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2"
                  >
                    <Avatar className="h-9 w-9 border border-gray-200">
                      <AvatarFallback className="bg-pastel-orange/10 text-pastel-orange">
                        {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-700 hidden md:inline">
                      {user?.name?.split(' ')[0] || 'User'}
                    </span>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-lg z-50 py-1">
                      <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        My Profile
                      </Link>
                      <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        My Orders
                      </Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login" className="block"> 
                  <Button className="bg-pastel-orange text-white flex items-center gap-1">
                    <LogIn size={16} />
                    <span className="hidden md:inline">Login</span>
                  </Button>
                </Link>
              )}

              <Link href="/cart">
                <div className="relative">
                  <Button variant="outline" className="gap-2 h-9 bg-pastel-orange/10 border-pastel-orange text-pastel-orange hover:bg-pastel-orange/20">
                    <ShoppingCart size={18} />
                    <span>My Cart</span>
                  </Button>
                  {cartItemCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pastel-orange text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {cartItemCount()}
                </span>
                  )}
                </div>
            </Link>
            </div>
          </div>
        </div>
        
        {/* Category Navigation */}
        <div className="bg-white border-t overflow-x-auto scrollbar-hide">
          <div className="container mx-auto px-4">
            <div className="flex space-x-6 py-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`whitespace-nowrap px-1 py-1.5 text-sm font-medium ${
                    activeCategory === category.id 
                      ? 'text-pastel-orange border-b-2 border-pastel-orange' 
                      : 'text-gray-600 hover:text-pastel-orange'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.icon && <span className="mr-1">{category.icon}</span>}
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4">
        {/* Store Selection */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <h2 className="font-bold text-lg text-gray-800 mb-3">Shop by Store</h2>
          <div className="flex overflow-x-auto gap-3 pb-2">
            <button 
              className={`flex-shrink-0 px-4 py-2 rounded-full ${
                selectedStore === null 
                  ? 'bg-pastel-orange text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedStore(null)}
            >
              All Stores
            </button>
            {stores.map(store => (
              <button 
                key={store.id}
                className={`flex items-center gap-2 flex-shrink-0 px-4 py-2 rounded-full ${
                  selectedStore === store.id 
                    ? 'bg-pastel-orange text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedStore(store.id)}
              >
                <Store size={16} />
                {store.name}
              </button>
            ))}
          </div>
        </div>

        {/* Banner Slider */}
        <div className="relative rounded-lg overflow-hidden mb-6 h-48 md:h-64">
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="relative w-full h-full">
                <Image 
                  src={banner} 
                  alt={`Promotional banner ${index + 1}`} 
                  fill 
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          ))}
          
          <button 
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md"
            onClick={prevSlide}
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md"
            onClick={nextSlide}
          >
            <ChevronRight size={20} />
          </button>
          
          {/* Dots indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentSlide ? 'bg-pastel-orange' : 'bg-white/70'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
        
        {/* Delivery Promise */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <Image 
                  src="/15-mins.png" 
                  alt="15 minute delivery" 
                  fill 
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-medium text-sm">Express Delivery</h3>
                <p className="text-xs text-gray-500">Get your order in minutes</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <Smile size={18} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-sm">100% Satisfaction</h3>
                <p className="text-xs text-gray-500">Easy returns & refunds</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Store size={18} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-sm">Multiple Stores</h3>
                <p className="text-xs text-gray-500">Compare prices across stores</p>
              </div>
            </div>
          </div>
        </div>

        {/* Special Category Offers */}
        <div className="mb-6">
          <h2 className="font-bold text-lg text-gray-800 mb-3">Special Offers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {categoryOffers.map(offer => (
              <Link 
                key={offer.id} 
                href={`/category/${offer.id}`} 
                className="relative rounded-lg overflow-hidden aspect-[2/1] group"
              >
                <Image 
                  src={offer.image} 
                  alt={offer.title} 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center p-4">
                  <h3 className="text-white font-bold text-lg">{offer.title}</h3>
                  <p className="text-white text-sm">{offer.discount}</p>
                  <span className="text-white text-xs mt-2 inline-flex items-center gap-1 group-hover:underline">
                    Shop now <ExternalLink size={12} />
                  </span>
                </div>
            </Link>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mb-6">
          <h2 className="font-bold text-lg text-gray-800 mb-3">Shop by Category</h2>
          <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-10 gap-2">
            {categories.slice(1).map(category => (
              <Link 
                key={category.id} 
                href={`/category/${category.id}`}
                className="bg-white rounded-lg p-2 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-2xl mb-1">{category.icon}</div>
                <p className="text-xs font-medium truncate">{category.name}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg text-gray-800">Today's Deals</h2>
            <Link href="/category/deals" className="text-sm text-pastel-orange font-medium">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                mrp={product.mrp}
                quantity={product.quantity}
                image={product.image}
                rating={product.rating}
                discount={product.discount}
                storeId={product.storeId}
              />
            ))}
          </div>
        </div>

        {/* Product Sections */}
        {productSections.map(section => (
          <div key={section.id} className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <Link href={`/search?category=${section.id}`} className="text-pastel-orange text-sm font-medium">
                View All
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {section.products.map(product => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  mrp={product.mrp}
                  image={product.image}
                  quantity={product.quantity}
                  rating={product.rating}
                  discount={product.discount}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Nearby Stores */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg text-gray-800">Nearby Stores</h2>
            <Link href="/store" className="text-sm text-pastel-orange font-medium">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stores.map(store => (
              <StoreCard
                key={store.id}
                id={store.id}
                name={store.name}
                location={store.location}
                image={store.image}
                timing={store.timing}
                rating={store.rating}
                distance={store.distance}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Back to top button */}
      {showTopButton && (
        <button 
          className="fixed bottom-6 right-6 bg-pastel-orange text-white p-3 rounded-full shadow-lg"
          onClick={scrollToTop}
        >
          <ChevronLeft size={20} className="rotate-90" />
        </button>
      )}

      <Footer />
    </main>
  )
}

