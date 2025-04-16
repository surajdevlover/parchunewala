'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import Footer from "../footer/footer"
import { SharedHeader } from "@/components/shared-header"
import { Search, ChevronRight, Star, Clock, MapPin, Phone, Filter, SlidersHorizontal, Heart, ShoppingBag, ArrowUpRight, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from 'react'
import { LoginRequiredModal } from '@/components/login-required-modal'

export default function StorePage() {
  const router = useRouter()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loadingAnimation, setLoadingAnimation] = useState(true)
  const [actionType, setActionType] = useState<'checkout' | 'wishlist' | 'generic'>('generic')

  useEffect(() => {
    // Check if user is logged in
    const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    setIsLoggedIn(userLoggedIn)
    
    // Simulate loading for animation
    const timer = setTimeout(() => {
      setLoadingAnimation(false)
    }, 800)
    
    return () => clearTimeout(timer)
  }, [])

  const requireLogin = (action: 'checkout' | 'wishlist' | 'generic' = 'generic') => {
    if (!isLoggedIn) {
      setActionType(action)
      setShowLoginModal(true)
      return false
    }
    return true
  }

  const handleAddToCart = (productId: string) => {
    if (requireLogin('generic')) {
      // Add to cart logic here
      console.log("Adding to cart:", productId)
    }
  }

  const handleBackClick = () => {
    router.back()
  }

  const storeInfo = {
    id: "123",
    name: "Sharma General Store",
    rating: 4.7,
    ratingCount: 243,
    image: "/images/store-banner.jpg",
    logo: "/images/store-logo.jpg",
    address: "123 Market Street, Sector 12, Noida",
    distance: "1.5 km",
    deliveryTime: "20-30 min",
    openingHours: "8:00 AM - 10:00 PM",
    contact: "+91 98765 43210"
  }

  const categories = [
    { id: "fruits", name: "Fruits & Vegetables", icon: "/icons/fruits.png" },
    { id: "dairy", name: "Dairy & Breakfast", icon: "/icons/dairy.png" },
    { id: "snacks", name: "Snacks & Munchies", icon: "/icons/snacks.png" },
    { id: "beverages", name: "Beverages", icon: "/icons/beverages.png" },
    { id: "bakery", name: "Bakery & Biscuits", icon: "/icons/bakery.png" },
    { id: "staples", name: "Staples & Grains", icon: "/icons/staples.png" },
    { id: "personal", name: "Personal Care", icon: "/icons/personal-care.png" },
    { id: "household", name: "Household", icon: "/icons/household.png" }
  ]

  const featuredProducts = [
    {
      id: "p1",
      name: "Fresh Organic Bananas",
      image: "/images/product-banana.jpg",
      price: 45,
      mrp: 60,
      discount: "25% OFF",
      unit: "6 pcs (approx. 1kg)"
    },
    {
      id: "p2",
      name: "Toned Milk 500ml",
      image: "/images/product-milk.jpg",
      price: 30,
      mrp: 35,
      discount: "14% OFF",
      unit: "500 ml"
    },
    {
      id: "p3",
      name: "Whole Wheat Bread",
      image: "/images/product-bread.jpg",
      price: 40,
      mrp: 45,
      discount: "11% OFF",
      unit: "400g"
    },
    {
      id: "p4",
      name: "Mixed Vegetable Pack",
      image: "/images/product-vegetables.jpg",
      price: 120,
      mrp: 150,
      discount: "20% OFF",
      unit: "1 kg pack"
    },
    {
      id: "p5",
      name: "Assorted Cookies",
      image: "/images/product-cookies.jpg",
      price: 99,
      mrp: 120,
      discount: "18% OFF",
      unit: "300g pack"
    },
    {
      id: "p6",
      name: "Tomato Ketchup",
      image: "/images/product-ketchup.jpg",
      price: 85,
      mrp: 100,
      discount: "15% OFF",
      unit: "500g"
    }
  ]

  const bestSellers = [
    {
      id: "bs1",
      name: "Basmati Rice Premium",
      image: "/images/product-rice.jpg",
      price: 250,
      mrp: 300,
      discount: "17% OFF",
      unit: "5 kg"
    },
    {
      id: "bs2",
      name: "Cold Pressed Coconut Oil",
      image: "/images/product-oil.jpg",
      price: 210,
      mrp: 240,
      discount: "13% OFF",
      unit: "1 liter"
    },
    {
      id: "bs3",
      name: "Honey Natural",
      image: "/images/product-honey.jpg",
      price: 180,
      mrp: 220,
      discount: "18% OFF",
      unit: "500g"
    },
    {
      id: "bs4",
      name: "Spice Blend Box",
      image: "/images/product-spices.jpg",
      price: 299,
      mrp: 350,
      discount: "15% OFF",
      unit: "Set of 8"
    }
  ]

  const offers = [
    {
      id: "o1",
      title: "20% OFF on first order",
      code: "FIRST20",
      image: "/images/offer-1.jpg",
      description: "Use code FIRST20 at checkout"
    },
    {
      id: "o2",
      title: "Free delivery on orders above ₹499",
      code: "FREEDEL",
      image: "/images/offer-2.jpg",
      description: "No coupon needed"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  if (loadingAnimation) {
    return (
      <div className="loading-container bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="loading-spinner">
          <div></div>
          <div></div>
        </div>
        <p className="mt-6 text-pastel-orange font-semibold text-lg animate-pulse">Loading Store...</p>
      </div>
    )
  }

  return (
    <main className="bg-gradient-to-br from-orange-50 to-amber-50 min-h-screen">
      {showLoginModal && (
        <LoginRequiredModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          actionType={actionType}
          continueShopping={() => setShowLoginModal(false)}
        />
      )}
      
      <SharedHeader 
        title={storeInfo.name}
        showLogo={false}
        showBackButton={false}
      />

      {/* Hero Section with Store Info */}
      <motion.div 
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back button */}
        <button 
          onClick={handleBackClick} 
          className="absolute top-4 left-4 z-10 bg-white/80 p-2 rounded-full shadow-md"
        >
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </button>

        <div className="h-48 w-full overflow-hidden relative rounded-b-3xl">
          <Image
            src={storeInfo.image}
            alt={storeInfo.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex items-end -mt-16 mb-6 relative z-10"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="h-24 w-24 rounded-xl overflow-hidden border-4 border-white shadow-lg bg-white">
              <Image
                src={storeInfo.logo}
                alt={storeInfo.name}
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
            <div className="ml-4 pb-2">
              <h1 className="text-white text-2xl font-bold drop-shadow-md">{storeInfo.name}</h1>
              <div className="flex items-center mt-1">
                <div className="flex items-center bg-yellow-500 px-2 py-0.5 rounded-md text-xs font-medium text-white">
                  <Star className="h-3 w-3 fill-white mr-1" />
                  {storeInfo.rating}
                </div>
                <span className="text-white text-xs ml-2">{storeInfo.ratingCount} ratings</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Store Details */}
      <motion.div 
        className="container mx-auto px-4 mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="bg-white rounded-xl shadow-md p-4 backdrop-blur-sm bg-white/90">
          <div className="flex flex-wrap gap-y-3">
            <div className="w-1/2 flex items-center">
              <div className="bg-pastel-orange/10 p-2 rounded-lg mr-3">
                <MapPin className="h-4 w-4 text-pastel-orange" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Distance</div>
                <div className="text-sm font-medium">{storeInfo.distance}</div>
              </div>
            </div>
            <div className="w-1/2 flex items-center">
              <div className="bg-pastel-orange/10 p-2 rounded-lg mr-3">
                <Clock className="h-4 w-4 text-pastel-orange" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Delivery Time</div>
                <div className="text-sm font-medium">{storeInfo.deliveryTime}</div>
              </div>
            </div>
            <div className="w-1/2 flex items-center">
              <div className="bg-pastel-orange/10 p-2 rounded-lg mr-3">
                <Clock className="h-4 w-4 text-pastel-orange" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Open Hours</div>
                <div className="text-sm font-medium">{storeInfo.openingHours}</div>
              </div>
            </div>
            <div className="w-1/2 flex items-center">
              <div className="bg-pastel-orange/10 p-2 rounded-lg mr-3">
                <Phone className="h-4 w-4 text-pastel-orange" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Contact</div>
                <div className="text-sm font-medium">{storeInfo.contact}</div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4 text-pastel-orange inline mr-1" />
              {storeInfo.address}
            </div>
            <div className="flex gap-2">
              <Link href={`/store/${storeInfo.id}/info`}>
                <Button variant="outline" size="sm" className="text-xs px-3 py-1 h-auto border-pastel-orange text-pastel-orange hover:bg-pastel-orange hover:text-white transition-colors">
                  Store Info
                </Button>
              </Link>
              <Link href={`https://maps.google.com?q=${encodeURIComponent(storeInfo.address)}`} target="_blank">
                <Button variant="outline" size="sm" className="text-xs px-3 py-1 h-auto border-pastel-orange text-pastel-orange hover:bg-pastel-orange hover:text-white transition-colors">
                  Get Directions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div 
        className="container mx-auto px-4 mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full py-2.5 pl-10 pr-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pastel-orange focus:border-transparent shadow-sm transition-all"
            />
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <Button variant="outline" className="border-gray-300 rounded-xl hover:bg-pastel-orange hover:text-white hover:border-pastel-orange transition-colors">
            <SlidersHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </motion.div>

      {/* Offers Carousel */}
      <motion.div 
        className="container mx-auto px-4 mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 scrollbar-hide">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 max-w-xs relative rounded-xl overflow-hidden shadow-md"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 300 }}
            >
              <div className="relative h-36">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-pastel-orange/90 to-pastel-orange/60 p-4 flex flex-col justify-between">
                  <div className="bg-white text-pastel-orange text-xs font-bold px-2 py-1 rounded-lg w-fit shadow-sm">
                    {offer.code}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{offer.title}</h3>
                    <p className="text-white text-sm">{offer.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div 
        className="container mx-auto px-4 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Shop by Category</h2>
          <Link href={`/store/${storeInfo.id}/categories`} className="text-pastel-orange text-sm font-medium flex items-center">
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Link 
                href={`/store/${storeInfo.id}/category/${category.id}`}
                className="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-pastel-orange/30 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-pastel-orange/10 flex items-center justify-center mb-2">
                  <Image 
                    src={category.icon} 
                    alt={category.name} 
                    width={28} 
                    height={28} 
                  />
                </div>
                <span className="text-xs text-center text-gray-700 line-clamp-2">{category.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Featured Products */}
      <motion.div 
        className="container mx-auto px-4 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{ delayChildren: 0.6 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Featured Products</h2>
          <Link href={`/store/${storeInfo.id}/featured`} className="text-pastel-orange text-sm font-medium flex items-center">
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Link
                href={`/product/${product.id}`}
                className="bg-white rounded-xl overflow-hidden shadow-md flex flex-col h-full border border-gray-100 hover:border-pastel-orange/30 transition-all"
              >
                <div className="relative">
                  <div className="h-40 relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {product.discount && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-lg shadow-sm">
                      {product.discount}
                    </div>
                  )}
                  <button 
                    className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow-sm hover:bg-pastel-orange hover:text-white transition-colors"
                    onClick={(e) => {
                      e.preventDefault()
                      requireLogin('wishlist')
                      // Add to wishlist logic when logged in
                    }}
                  >
                    <Heart className="h-4 w-4" />
                  </button>
                </div>

                <div className="p-3 flex-1 flex flex-col">
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">{product.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{product.unit}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold text-gray-800">₹{product.price}</span>
                      {product.mrp > product.price && (
                        <span className="text-xs text-gray-500 line-through ml-1">₹{product.mrp}</span>
                      )}
                    </div>
                    <button 
                      className="bg-pastel-orange/10 text-pastel-orange p-1.5 rounded-full hover:bg-pastel-orange hover:text-white transition-colors"
                      onClick={(e) => {
                        e.preventDefault()
                        handleAddToCart(product.id)
                      }}
                    >
                      <ShoppingBag className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Best Sellers */}
      <motion.div 
        className="container mx-auto px-4 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{ delayChildren: 0.7 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Best Sellers</h2>
          <Link href={`/store/${storeInfo.id}/best-sellers`} className="text-pastel-orange text-sm font-medium flex items-center">
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bestSellers.map((product, index) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <Link
                  href={`/product/${product.id}`}
                  className="flex border border-gray-100 rounded-xl overflow-hidden p-2 hover:border-pastel-orange/30 transition-all"
                >
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                    {product.discount && (
                      <div className="absolute -top-1 -left-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded shadow-sm">
                        {product.discount}
                      </div>
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium text-gray-800 line-clamp-2">{product.name}</h3>
                    <p className="text-xs text-gray-500">{product.unit}</p>
                    <div className="mt-1.5 flex items-center justify-between">
                      <div>
                        <span className="text-sm font-bold text-gray-800">₹{product.price}</span>
                        {product.mrp > product.price && (
                          <span className="text-xs text-gray-500 line-through ml-1">₹{product.mrp}</span>
                        )}
                      </div>
                      <button 
                        className="bg-pastel-orange text-white p-1.5 rounded-lg hover:bg-pastel-orange/90 transition-colors shadow-sm"
                        onClick={(e) => {
                          e.preventDefault()
                          handleAddToCart(product.id)
                        }}
                      >
                        <ShoppingBag className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Recent Purchases/Trending */}
      <motion.div 
        className="container mx-auto px-4 mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{ delayChildren: 0.8 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Trending Now</h2>
          <Link href={`/store/${storeInfo.id}/trending`} className="text-pastel-orange text-sm font-medium flex items-center">
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 scrollbar-hide">
          {featuredProducts.slice(0, 4).map((product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="flex-shrink-0 w-44"
            >
              <Link
                href={`/product/${product.id}`}
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:border-pastel-orange/30 transition-all block h-full"
              >
                <div className="relative h-40">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  {product.discount && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-lg shadow-sm">
                      {product.discount}
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-800">₹{product.price}</span>
                    <button 
                      className="bg-pastel-orange text-white p-1.5 rounded-lg hover:bg-pastel-orange/90 transition-colors shadow-sm"
                      onClick={(e) => {
                        e.preventDefault()
                        handleAddToCart(product.id)
                      }}
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Floating Cart Button */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, type: "spring" }}
      >
        <Link 
          href="/cart" 
          className="fixed bottom-6 right-6 bg-gradient-to-r from-pastel-orange to-amber-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
        >
          <ShoppingBag className="h-6 w-6" />
          <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center shadow-md">5</span>
        </Link>
      </motion.div>

      <Footer />
    </main>
  )
} 