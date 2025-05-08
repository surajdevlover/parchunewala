"use client"

import { useState } from "react"
import { SharedHeader } from "@/components/shared-header"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal, Store } from "lucide-react"
import Footer from "@/app/footer/footer"
import { motion } from "framer-motion"
import { StoreCard } from "@/components/store-card"

export default function AllStoresPage() {
  const [activeSort, setActiveSort] = useState("nearest")
  const [showFilters, setShowFilters] = useState(false)

  // Available stores - identical to the one used in the home page
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
    },
    {
      id: "4",
      name: "Sharma General Store",
      location: "Sector 15, Noida",
      image: "https://lh3.googleusercontent.com/gps-cs-s/AB5caB_QAIR4rpDjU1ofWAq01ZqBN0Zds7Yuz0aeaFjF0PQ1sAXnAgCYw16L1WEBWKcTaK-CiWGmkqHo1RhOZ9M4z9RRo_yABuvZIMki9by6Efiwmq_FKTfWceBVprj9txNRLCgsjuE=s1360-w1360-h1020?height=150&width=300",
      timing: "Open 8 AM - 9 PM",
      rating: 4.3,
      distance: "2.3 km"
    },
    {
      id: "5",
      name: "Gupta General Store",
      location: "Sector 62, Noida",
      image: "https://content3.jdmagicbox.com/v2/comp/noida/k9/011pxx11.xx11.160125130009.a8k9/catalogue/anjali-general-store-noida-sector-44-noida-general-stores-2egpcjw.jpg?height=150&width=300",
      timing: "Open 7 AM - 10 PM",
      rating: 4.1,
      distance: "4.2 km"
    },
    {
      id: "6",
      name: "Singh Provision Store",
      location: "Sector 34, Noida",
      image: "https://lh3.googleusercontent.com/gps-cs-s/AB5caB87a87mmqARf0sUuN4nXF-hUTfKpjt4Y8hZZoj-JKj4sfEJDNV2Nl1s9EX9mLnPa8MBS5Fd0Y2YvIkhLl1iD8WKYkCyUhc2AeBqO1SJpY74s19AICUnLxJ37C3ayAkzpxlj25bf=s1360-w1360-h1020?height=150&width=300",
      timing: "Open 8 AM - 10 PM",
      rating: 4.4,
      distance: "1.8 km"
    }
  ]

  // Sort options
  const sortOptions = [
    { id: "nearest", name: "Nearest" },
    { id: "fastest", name: "Fastest Delivery" },
    { id: "rating", name: "Top Rated" },
    { id: "discount", name: "Best Offers" }
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

  return (
    <main className="bg-gradient-to-br from-orange-50 to-amber-50 min-h-screen">
      <SharedHeader title="All Stores" showBackButton={true} showLogo={true} />
      
      <div className="container mx-auto px-4 py-6">
        {/* Search and Filter */}
        <motion.div 
          className="mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search stores..."
                className="w-full py-2.5 pl-10 pr-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pastel-orange focus:border-transparent shadow-sm transition-all"
              />
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <Button variant="outline" className="border-gray-300 rounded-xl hover:bg-pastel-orange hover:text-white hover:border-pastel-orange transition-colors">
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>

        {/* Sorting Options */}
        <motion.div
          className="mb-6 overflow-x-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex gap-3 pb-2">
            {sortOptions.map(option => (
              <button
                key={option.id}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm ${
                  activeSort === option.id 
                    ? 'bg-pastel-orange text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveSort(option.id)}
              >
                {option.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Store Info Banner */}
        <motion.div 
          className="bg-white rounded-xl p-4 mb-6 shadow-sm"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <div className="bg-pastel-orange/10 p-3 rounded-full">
              <Store className="h-6 w-6 text-pastel-orange" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-gray-800">All Available Stores</h2>
              <p className="text-sm text-gray-500">Find local stores and compare prices</p>
            </div>
          </div>
        </motion.div>

        {/* Stores Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {stores.map(store => (
            <motion.div
              key={store.id}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <StoreCard
                id={store.id}
                name={store.name}
                location={store.location}
                image={store.image}
                timing={store.timing}
                rating={store.rating}
                distance={store.distance}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Footer />
    </main>
  )
} 