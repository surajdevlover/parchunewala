"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { SlidersHorizontal, Search, ChevronDown, ArrowRight } from "lucide-react"
import { SharedHeader } from "@/components/shared-header"
import { Button } from "@/components/ui/button"
import Footer from "@/app/footer/footer"
import { motion } from "framer-motion"

// Define interface for category data
interface Category {
  id: string;
  name: string;
  image: string;
  itemsCount: number;
  color: string;
  description: string;
  icon: React.ReactNode;
}

// Sample category data - in a real app this would come from an API
const categories: Category[] = [
  {
    id: "groceries",
    name: "Groceries",
    image: "/images/categories/groceries.jpg",
    itemsCount: 156,
    color: "from-green-400 to-green-600",
    description: "Essential grocery items for your daily needs",
    icon: <span className="text-xl">🥑</span>
  },
  {
    id: "fruits-vegetables",
    name: "Fruits & Vegetables",
    image: "/images/categories/fruits-vegetables.jpg",
    itemsCount: 143,
    color: "from-red-400 to-green-500",
    description: "Fresh fruits and vegetables delivered daily",
    icon: <span className="text-xl">🍎</span>
  },
  {
    id: "dairy-breakfast",
    name: "Dairy & Breakfast",
    image: "/images/categories/dairy-breakfast.jpg",
    itemsCount: 87,
    color: "from-blue-300 to-sky-500",
    description: "Fresh dairy products and breakfast essentials",
    icon: <span className="text-xl">🥛</span>
  },
  {
    id: "snacks",
    name: "Snacks",
    image: "/images/categories/snacks.jpg",
    itemsCount: 112,
    color: "from-amber-300 to-amber-600",
    description: "Delicious snacks for anytime cravings",
    icon: <span className="text-xl">🍿</span>
  },
  {
    id: "beverages",
    name: "Beverages",
    image: "/images/categories/beverages.jpg",
    itemsCount: 98,
    color: "from-yellow-400 to-orange-600",
    description: "Refreshing drinks and beverages",
    icon: <span className="text-xl">☕</span>
  },
  {
    id: "personal-care",
    name: "Personal Care",
    image: "/images/categories/personal-care.jpg",
    itemsCount: 76,
    color: "from-indigo-400 to-purple-600",
    description: "Personal care and hygiene products",
    icon: <span className="text-xl">🧴</span>
  },
  {
    id: "household",
    name: "Household",
    image: "/images/categories/household.jpg",
    itemsCount: 65,
    color: "from-teal-400 to-teal-600",
    description: "Everything you need for your home",
    icon: <span className="text-xl">🧹</span>
  },
  {
    id: "baby-care",
    name: "Baby Care",
    image: "/images/categories/baby-care.jpg",
    itemsCount: 52,
    color: "from-pink-300 to-pink-500",
    description: "Essential products for your little ones",
    icon: <span className="text-xl">🍼</span>
  },
  {
    id: "electronics",
    name: "Electronics",
    image: "/images/categories/electronics.jpg",
    itemsCount: 84,
    color: "from-gray-600 to-gray-800",
    description: "Latest gadgets and electronic items",
    icon: <span className="text-xl">💻</span>
  }
];

// Sort options for categories
const sortOptions = [
  { id: "popular", name: "Most Popular" },
  { id: "az", name: "A-Z" },
  { id: "za", name: "Z-A" },
  { id: "items", name: "Most Items" }
];

// Popular searches
const popularSearches = [
  "Fresh Fruits", "Vegetables", "Milk", "Bread", "Rice", "Spices", 
  "Chicken", "Personal Care", "Snacks", "Breakfast"
];

// Featured collections with colorful gradients
const featuredCollections = [
  { name: "Festive Essentials", color: "from-orange-400 to-red-500", image: "/images/collections/festive.jpg" },
  { name: "Organic Produce", color: "from-green-400 to-emerald-600", image: "/images/collections/organic.jpg" },
  { name: "Healthy Breakfast", color: "from-blue-400 to-indigo-600", image: "/images/collections/breakfast.jpg" },
  { name: "Snacks & Munchies", color: "from-amber-400 to-yellow-600", image: "/images/collections/snacks.jpg" }
];

function CategoryCard({ category, index }: { category: Category; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/categories/${category.id}`} className="block">
        <div className="relative aspect-[4/3] w-full">
          <Image 
            src={category.image} 
            alt={category.name}
            fill
            className="object-cover transition-transform duration-500"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-70`} />
          
          {/* Category icon with circle background */}
          <div className="absolute top-3 left-3 bg-white/30 backdrop-blur-sm rounded-full p-2">
            <div className="text-white">{category.icon}</div>
          </div>
        </div>
        
        <div className="absolute bottom-0 inset-x-0 p-4 text-white">
          <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
          <p className="text-white/90 text-sm line-clamp-1">{category.description}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm bg-white/20 px-2 py-0.5 rounded-full">
              {category.itemsCount} items
            </span>
            <div className="bg-white/30 backdrop-blur-sm rounded-full p-1">
              <ArrowRight size={16} className="text-white" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function AllCategoriesPage() {
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  // Function to sort categories based on selected option
  const getSortedCategories = () => {
    switch (sortBy) {
      case "az":
        return [...categories].sort((a, b) => a.name.localeCompare(b.name));
      case "za":
        return [...categories].sort((a, b) => b.name.localeCompare(a.name));
      case "items":
        return [...categories].sort((a, b) => b.itemsCount - a.itemsCount);
      case "popular":
      default:
        return categories; // Assuming default order is by popularity
    }
  };

  const filteredCategories = getSortedCategories().filter(category => 
    searchQuery ? category.name.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  // Define variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <SharedHeader title="All Categories" showBackButton={true} showLogo={true} />
      
      {/* Hero banner */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-40 bg-gradient-to-r from-pastel-orange to-orange-500 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/images/categories/pattern.svg')] opacity-20 bg-repeat"></div>
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-lg text-white">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold mb-2"
            >
              Explore Categories
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white/90"
            >
              Find everything you need across our various categories
            </motion.p>
          </div>
        </div>
      </motion.div>
      
      {/* Search */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <input
              type="text"
              className="w-full h-11 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:border-pastel-orange bg-gray-50"
              placeholder="Search for categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </motion.div>
          
          {/* Popular searches */}
          {!searchQuery && (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-3"
            >
              <p className="text-xs text-gray-500 mb-2">Popular Searches:</p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.slice(0, 5).map((term, index) => (
                  <motion.button
                    key={term}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full hover:bg-gray-200"
                    onClick={() => setSearchQuery(term)}
                  >
                    {term}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Filters */}
      <div className="sticky top-[56px] z-10 bg-white border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex overflow-x-auto scrollbar-hide py-1 gap-2">
              {sortOptions.map((option, index) => (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`whitespace-nowrap px-3 py-1 rounded-full text-sm ${
                    sortBy === option.id 
                      ? 'bg-pastel-orange text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setSortBy(option.id)}
                >
                  {option.name}
                </motion.button>
              ))}
            </div>
            
            <div className="relative">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
              >
                <SlidersHorizontal size={14} />
                Filters
                <ChevronDown 
                  size={14} 
                  className={`transition-transform duration-300 ${isSortMenuOpen ? 'rotate-180' : ''}`} 
                />
              </Button>
              
              {isSortMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg py-2 w-48 z-20"
                >
                  {sortOptions.map(option => (
                    <button
                      key={option.id}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                        sortBy === option.id ? 'text-pastel-orange font-medium' : 'text-gray-700'
                      }`}
                      onClick={() => {
                        setSortBy(option.id);
                        setIsSortMenuOpen(false);
                      }}
                    >
                      {option.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Collections (visible only if not searching) */}
      {!searchQuery && (
        <div className="bg-white py-4">
          <div className="container mx-auto px-4">
            <h2 className="text-lg font-medium text-gray-800 mb-3">Featured Collections</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {featuredCollections.map((collection, index) => (
                <motion.div
                  key={collection.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="relative rounded-lg overflow-hidden aspect-[3/2]"
                >
                  <div className={`absolute inset-0 ${collection.color} opacity-80`} />
                  <Image 
                    src={collection.image} 
                    alt={collection.name}
                    fill
                    className="object-cover mix-blend-overlay"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white font-semibold text-lg text-center">{collection.name}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Categories Grid */}
      <div className="flex-1 py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, index) => (
                <CategoryCard key={category.id} category={category} index={index} />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12"
              >
                <Search size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-800 mb-2">No categories found</h3>
                <p className="text-gray-600 mb-4">
                  No categories match your search for "{searchQuery}"
                </p>
                <Button 
                  variant="outline"
                  onClick={() => setSearchQuery("")}
                >
                  Clear Search
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 