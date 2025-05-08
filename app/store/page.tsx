'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import Footer from "../footer/footer"
import { SharedHeader } from "@/components/shared-header"
import { Search, ChevronRight, Star, Clock, MapPin, Phone, Filter, SlidersHorizontal, Heart, ShoppingBag, ArrowUpRight, ArrowLeft, Store, X, MapPinned, Award, Calendar, AlignJustify } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from 'react'
import { LoginRequiredModal } from '@/components/login-required-modal'
import { StoreCard } from '@/components/store-card'
import { Badge } from "@/components/ui/badge"

export default function StorePage() {
  const router = useRouter()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loadingAnimation, setLoadingAnimation] = useState(true)
  const [actionType, setActionType] = useState<'checkout' | 'wishlist' | 'cart' | 'general'>('general')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [showFilterPanel, setShowFilterPanel] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    // Check if user is logged in
    const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    setIsLoggedIn(userLoggedIn)
    
    // Simulate loading for animation
    const timer = setTimeout(() => {
      setLoadingAnimation(false)
    }, 600)
    
    return () => clearTimeout(timer)
  }, [])

  const requireLogin = (action: 'checkout' | 'wishlist' | 'cart' | 'general' = 'general') => {
    if (!isLoggedIn) {
      setActionType(action)
      setShowLoginModal(true)
      return false
    }
    return true
  }

  // Available stores - identical to the one used in the home page
  const stores = [
    {
      id: "1",
      name: "Satish General Store",
      location: "Sector 44, Noida",
      image: "https://content3.jdmagicbox.com/v2/comp/noida/k9/011pxx11.xx11.160125130009.a8k9/catalogue/anjali-general-store-noida-sector-44-noida-general-stores-2egpcjw.jpg?height=150&width=300",
      timing: "Open 8 AM - 10 PM",
      rating: 4.2,
      distance: "0.5 km",
      contact: "+91-9876543210",
      address: "Shop No. 12, Market Road, Sector 44, Noida",
      deliveryTime: "15-20 min",
      description: "Your neighborhood supermarket with all daily essentials, fresh produce, and household items at affordable prices.",
      tags: ["Groceries", "Household", "Daily Essentials"]
    },
    {
      id: "2",
      name: "Pandit General Store",
      location: "Sector 18, Noida",
      image: "https://lh3.googleusercontent.com/gps-cs-s/AB5caB87a87mmqARf0sUuN4nXF-hUTfKpjt4Y8hZZoj-JKj4sfEJDNV2Nl1s9EX9mLnPa8MBS5Fd0Y2YvIkhLl1iD8WKYkCyUhc2AeBqO1SJpY74s19AICUnLxJ37C3ayAkzpxlj25bf=s1360-w1360-h1020?height=150&width=300",
      timing: "Open 7 AM - 11 PM",
      rating: 4.5,
      distance: "3.1 km",
      contact: "+91-9876543211",
      address: "Shop No. 5, Market Complex, Sector 18, Noida",
      deliveryTime: "20-30 min",
      description: "Family-run general store offering groceries, personal care items, and household essentials at competitive prices.",
      tags: ["Personal Care", "Groceries", "Family Owned"]
    },
    {
      id: "3",
      name: "Anuj Kirana Store",
      location: "Sector 126, Noida",
      image: "https://lh3.googleusercontent.com/gps-cs-s/AB5caB_QAIR4rpDjU1ofWAq01ZqBN0Zds7Yuz0aeaFjF0PQ1sAXnAgCYw16L1WEBWKcTaK-CiWGmkqHo1RhOZ9M4z9RRo_yABuvZIMki9by6Efiwmq_FKTfWceBVprj9txNRLCgsjuE=s1360-w1360-h1020?height=150&width=300",
      timing: "Open 9 AM - 9 PM",
      rating: 4.0,
      distance: "3.5 km",
      contact: "+91-9876543212",
      address: "Near City Center, Sector 126, Noida",
      deliveryTime: "25-35 min",
      description: "Local convenience store with a wide selection of daily needs, snacks, and beverages.",
      tags: ["Snacks", "Beverages", "Convenience"]
    },
    {
      id: "4",
      name: "Sharma General Store",
      location: "Sector 15, Noida",
      image: "https://lh3.googleusercontent.com/gps-cs-s/AB5caB_QAIR4rpDjU1ofWAq01ZqBN0Zds7Yuz0aeaFjF0PQ1sAXnAgCYw16L1WEBWKcTaK-CiWGmkqHo1RhOZ9M4z9RRo_yABuvZIMki9by6Efiwmq_FKTfWceBVprj9txNRLCgsjuE=s1360-w1360-h1020?height=150&width=300",
      timing: "Open 8 AM - 9 PM",
      rating: 4.3,
      distance: "2.3 km",
      contact: "+91-9876543213",
      address: "Main Market, Sector 15, Noida",
      deliveryTime: "15-25 min",
      description: "Trusted neighborhood store offering quality groceries and household items with personalized service.",
      tags: ["Quality", "Groceries", "Local Favorite"]
    },
    {
      id: "5",
      name: "Gupta General Store",
      location: "Sector 62, Noida",
      image: "https://content3.jdmagicbox.com/v2/comp/noida/k9/011pxx11.xx11.160125130009.a8k9/catalogue/anjali-general-store-noida-sector-44-noida-general-stores-2egpcjw.jpg?height=150&width=300",
      timing: "Open 7 AM - 10 PM",
      rating: 4.1,
      distance: "4.2 km",
      contact: "+91-9876543214",
      address: "Near Metro Station, Sector 62, Noida",
      deliveryTime: "25-40 min",
      description: "Conveniently located store offering a wide range of groceries, toiletries and household supplies.",
      tags: ["Toiletries", "Groceries", "Metro Access"]
    },
    {
      id: "6",
      name: "Singh Provision Store",
      location: "Sector 34, Noida",
      image: "https://lh3.googleusercontent.com/gps-cs-s/AB5caB87a87mmqARf0sUuN4nXF-hUTfKpjt4Y8hZZoj-JKj4sfEJDNV2Nl1s9EX9mLnPa8MBS5Fd0Y2YvIkhLl1iD8WKYkCyUhc2AeBqO1SJpY74s19AICUnLxJ37C3ayAkzpxlj25bf=s1360-w1360-h1020?height=150&width=300",
      timing: "Open 8 AM - 10 PM",
      rating: 4.4,
      distance: "1.8 km",
      contact: "+91-9876543215",
      address: "Block D, Sector 34, Noida",
      deliveryTime: "15-20 min",
      description: "Local grocery store with a friendly atmosphere offering fresh products and essential items at reasonable prices.",
      tags: ["Fresh Products", "Friendly", "Reasonable Prices"]
    }
  ]

  const filters = [
    { id: 'nearby', name: 'Nearby', icon: <MapPinned size={14} /> },
    { id: 'rating', name: 'Top Rated', icon: <Award size={14} /> },
    { id: 'open', name: 'Open Now', icon: <Calendar size={14} /> }
  ]

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'groceries', name: 'Groceries' },
    { id: 'household', name: 'Household' },
    { id: 'personal', name: 'Personal Care' },
    { id: 'beverages', name: 'Beverages' },
    { id: 'snacks', name: 'Snacks' }
  ]

  const filteredStores = stores.filter(store => {
    if (searchTerm && !store.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !store.location.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !store.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return false;
    }
    
    if (activeFilter === 'nearby') {
      // Filter for nearby stores (less than 3 km)
      return parseFloat(store.distance.replace(' km', '')) < 3;
    } else if (activeFilter === 'rating') {
      // Filter for top rated stores
      return store.rating >= 4.3;
    } else if (activeFilter === 'open') {
      // All stores are open in this example
      return true;
    }
    
    return true;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
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

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  if (loadingAnimation) {
    return (
      <motion.div 
        className="loading-container bg-gradient-to-br from-orange-50 to-amber-50 min-h-screen flex flex-col items-center justify-center"
        initial="hidden"
        animate="visible"
        variants={overlayVariants}
      >
        <motion.div 
          className="loading-spinner"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div></div>
          <div></div>
        </motion.div>
        <motion.p 
          className="mt-6 text-pastel-orange font-semibold text-lg animate-pulse"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Discovering Nearby Stores...
        </motion.p>
      </motion.div>
    )
  }

  return (
    <main className="bg-gradient-to-br from-orange-50 to-amber-50 min-h-screen relative">
      <AnimatePresence>
        {showLoginModal && (
          <LoginRequiredModal
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
            actionType={actionType}
            onLogin={() => {
              // Handle login action
              router.push('/login');
              setShowLoginModal(false);
            }}
          />
        )}
      </AnimatePresence>
      
      {/* Custom Header with Hero Section */}
      <motion.div 
        className="bg-gradient-to-r from-pastel-orange to-orange-500 text-white py-4 px-4 relative overflow-hidden"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 70,
          damping: 20
        }}
      >
        <div className="absolute right-0 top-0 opacity-10">
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="100" fill="white"/>
            <circle cx="100" cy="100" r="80" fill="white"/>
            <circle cx="100" cy="100" r="60" fill="white"/>
          </svg>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="flex items-center justify-between mb-2">
            <Link href="/home">
              <Button variant="ghost" size="icon" className="h-9 w-9 text-white hover:bg-white/20 hover:text-white">
                <ArrowLeft size={20} />
              </Button>
            </Link>
            <div className="flex gap-3">
              <motion.button 
                className="rounded-full p-2 bg-white/20 hover:bg-white/30 transition-colors"
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              >
                <AlignJustify size={18} className="text-white" />
              </motion.button>
              <Link href="/cart">
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-white relative hover:bg-white/20 hover:text-white">
                    <ShoppingBag size={20} />
                    <span className="absolute -top-1 -right-1 bg-white text-pastel-orange text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      2
                    </span>
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold mb-1">Find Nearby Stores</h1>
          <p className="text-sm text-white/80 mb-4">Discover local shops and compare prices</p>
          
          {/* Animated Search Bar */}
          <motion.div 
            className="relative mb-3"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <input
              type="text"
              placeholder="Search stores, products, or locations..."
              className="w-full py-3 pl-10 pr-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/30 focus:outline-none focus:bg-white/20 text-white placeholder-white/70 shadow-lg transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="h-5 w-5 text-white/70 absolute left-3 top-1/2 -translate-y-1/2" />
            
            <AnimatePresence>
              {searchTerm ? (
                <motion.button
                  className="absolute right-10 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                  onClick={() => setSearchTerm('')}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <X size={18} />
                </motion.button>
              ) : null}
            </AnimatePresence>
            
            <motion.button
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 w-6 h-6 rounded-full flex items-center justify-center"
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              whileTap={{ scale: 0.9 }}
            >
              <Filter size={14} className="text-white" />
            </motion.button>
          </motion.div>
          
          {/* Filter Chips */}
          <motion.div 
            className="flex gap-2 overflow-x-auto hide-scrollbar pb-1"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {filters.map(filter => (
              <motion.button
                key={filter.id}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border flex items-center gap-1 whitespace-nowrap ${
                  activeFilter === filter.id 
                    ? 'bg-white text-pastel-orange border-white' 
                    : 'bg-white/10 text-white border-white/30 hover:bg-white/20'
                }`}
                onClick={() => setActiveFilter(activeFilter === filter.id ? null : filter.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter.icon}
                <span>{filter.name}</span>
              </motion.button>
            ))}
            
            {categories.map(category => (
              <motion.button
                key={category.id}
                className="px-3 py-1.5 rounded-full text-xs font-medium border bg-white/10 text-white border-white/30 hover:bg-white/20 whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <div className="container mx-auto px-3 py-4">
        {/* Active Filters Display */}
        <AnimatePresence>
          {(activeFilter || searchTerm) && (
            <motion.div 
              className="flex items-center justify-between bg-white rounded-lg px-4 py-2 mb-3 shadow-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Filtered by:</span>
                {activeFilter && (
                  <Badge className="bg-pastel-orange/20 text-pastel-orange border-none">
                    {filters.find(f => f.id === activeFilter)?.name}
                  </Badge>
                )}
                {searchTerm && (
                  <Badge className="bg-pastel-orange/20 text-pastel-orange border-none">
                    "{searchTerm.length > 15 ? searchTerm.substring(0, 15) + '...' : searchTerm}"
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs px-2 hover:bg-pastel-orange hover:text-white"
                onClick={() => {
                  setSearchTerm('');
                  setActiveFilter(null);
                }}
              >
                Clear All
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Store Count & Sort Info */}
        <motion.div 
          className="flex justify-between items-center mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-gray-600">
            <span className="font-semibold">{filteredStores.length}</span> stores found
          </p>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Sort by:</span>
            <select className="text-xs bg-white rounded-lg border border-gray-200 px-2 py-1">
              <option>Distance</option>
              <option>Rating</option>
              <option>Alphabetical</option>
            </select>
          </div>
        </motion.div>

        {/* No Results Message */}
        <AnimatePresence>
          {filteredStores.length === 0 && (
            <motion.div 
              className="text-center py-10 bg-white rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <motion.div
                className="mx-auto w-20 h-20 bg-pastel-orange/10 rounded-full flex items-center justify-center mb-4"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Store className="h-10 w-10 text-pastel-orange" />
              </motion.div>
              <motion.div 
                className="text-gray-700 text-lg font-medium mb-2"
              >
                No stores found
              </motion.div>
              <p className="text-sm text-gray-500 mb-4">Try a different search term or filter</p>
              <motion.button
                className="px-4 py-2 bg-pastel-orange text-white rounded-lg text-sm"
                onClick={() => {setSearchTerm(''); setActiveFilter(null)}}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear Filters
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stores Grid/List View */}
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div 
              key="grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 20 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3"
            >
              {filteredStores.map((store, index) => (
                <motion.div
                  key={store.id}
                  variants={itemVariants}
                  custom={index}
                  layout
                >
                  <StoreCard
                    id={store.id}
                    name={store.name}
                    location={store.location}
                    image={store.image}
                    timing={store.timing}
                    rating={store.rating}
                    distance={store.distance}
                    size="small"
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 20 }}
              className="flex flex-col gap-3"
            >
              {filteredStores.map((store, index) => (
                <motion.div
                  key={store.id}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
                >
                  <Link href={`/store/${store.id}`} className="flex">
                    <div className="w-24 h-24 relative">
                      <Image 
                        src={store.image} 
                        alt={store.name} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                    <div className="p-3 flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-bold text-gray-900">{store.name}</h3>
                        <div className="flex items-center gap-1 bg-pastel-orange/10 px-2 py-0.5 rounded text-xs font-medium text-pastel-orange">
                          <Star size={12} className="fill-pastel-orange" />
                          <span>{store.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                        <MapPin size={12} className="text-pastel-orange/70" />
                        <span className="line-clamp-1">{store.location}</span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2 text-xs">
                        <div className="flex gap-2">
                          <div className="bg-green-100 text-green-800 font-medium px-2 py-0.5 rounded-sm">
                            {store.distance}
                          </div>
                          <div className="text-gray-500">
                            {store.timing}
                          </div>
                        </div>
                        <Button variant="link" size="sm" className="p-0 h-auto text-xs text-pastel-orange">
                          View Store
                        </Button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Featured Stores Section */}
        {filteredStores.length > 0 && !activeFilter && !searchTerm && (
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-gray-800">Popular Stores</h2>
              <Button variant="link" className="text-pastel-orange text-sm p-0 h-auto">
                See All
              </Button>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex overflow-x-auto gap-4 hide-scrollbar pb-2">
                {stores
                  .filter(store => store.rating >= 4.3)
                  .map((store) => (
                    <motion.div
                      key={`featured-${store.id}`}
                      className="min-w-[200px] bg-pastel-orange/5 rounded-lg p-3 border border-pastel-orange/20"
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(251, 146, 60, 0.1)" }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-full overflow-hidden relative">
                          <Image 
                            src={store.image} 
                            alt={store.name} 
                            fill 
                            className="object-cover" 
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm text-gray-900">{store.name}</h3>
                          <div className="flex items-center gap-1 text-xs text-pastel-orange">
                            <Star size={10} className="fill-pastel-orange" />
                            <span>{store.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-2">
                        {store.tags.map((tag, i) => (
                          <span key={i} className="text-[10px] bg-white px-1.5 py-0.5 rounded-full text-gray-600">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <Link href={`/store/${store.id}`}>
                        <Button variant="ghost" size="sm" className="w-full h-7 text-xs bg-white text-pastel-orange hover:bg-pastel-orange hover:text-white">
                          View Store
                        </Button>
                      </Link>
                    </motion.div>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Recently Viewed Section */}
        {filteredStores.length > 0 && !activeFilter && !searchTerm && (
          <motion.div
            className="mt-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-gray-800">Recently Viewed</h2>
              <Button variant="link" className="text-pastel-orange text-sm p-0 h-auto">
                Clear
              </Button>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex flex-wrap gap-3">
                {stores.slice(0, 3).map((store) => (
                  <Link key={`recent-${store.id}`} href={`/store/${store.id}`} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2 flex-1 min-w-[160px]">
                    <div className="w-10 h-10 rounded-full overflow-hidden relative">
                      <Image 
                        src={store.image} 
                        alt={store.name} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-xs text-gray-900 truncate">{store.name}</h3>
                      <p className="text-[10px] text-gray-500 truncate">{store.location}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-20 right-4 z-10 bg-pastel-orange text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <MapPinned size={22} />
      </motion.button>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilterPanel && (
          <>
            <motion.div 
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilterPanel(false)}
            />
            <motion.div 
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-40 p-5"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-5" />
              <h2 className="text-xl font-bold text-gray-800 mb-4">Filter Stores</h2>
              
              <div className="mb-5">
                <h3 className="font-medium text-sm text-gray-700 mb-3">Store Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      className="px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200 hover:border-pastel-orange hover:bg-pastel-orange/5"
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-5">
                <h3 className="font-medium text-sm text-gray-700 mb-3">Distance</h3>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200 hover:border-pastel-orange hover:bg-pastel-orange/5">
                    Less than 1 km
                  </button>
                  <button className="px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200 hover:border-pastel-orange hover:bg-pastel-orange/5">
                    1-3 km
                  </button>
                  <button className="px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200 hover:border-pastel-orange hover:bg-pastel-orange/5">
                    3-5 km
                  </button>
                  <button className="px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200 hover:border-pastel-orange hover:bg-pastel-orange/5">
                    5+ km
                  </button>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-sm text-gray-700 mb-3">Rating</h3>
                <div className="flex flex-wrap gap-2">
                  {[4, 3, 2, 1].map(rating => (
                    <button key={rating} className="px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200 hover:border-pastel-orange hover:bg-pastel-orange/5 flex items-center gap-1">
                      {rating}+ <Star size={10} className="fill-yellow-400 text-yellow-400" />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1 border-gray-300"
                  onClick={() => setShowFilterPanel(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-pastel-orange hover:bg-pastel-orange/90"
                  onClick={() => setShowFilterPanel(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  )
} 