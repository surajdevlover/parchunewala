"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Search, X, Clock, Tag, ShoppingBag, Bookmark, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"

// Define the product interface
interface Product {
  id: string
  name: string
  price: string
  mrp: string
  quantity: string
  image: string
  rating: number
  discount: string
  category: string
}

// Sample product data
const allProducts: Product[] = [
  {
    id: "1",
    name: "Aashirvaad Multigrain Atta",
    price: "₹327",
    mrp: "₹404",
    quantity: "5 Kg",
    image: "https://cdn.zeptonow.com/cms/product_variant/e1812c8a-9ccc-4757-9c99-0cd25c686043.jpeg?height=200&width=200",
    rating: 4.5,
    discount: "20% OFF",
    category: "grocery"
  },
  {
    id: "2",
    name: "Sundrop Sunflower Oil",
    price: "₹608",
    mrp: "₹639",
    quantity: "3 L",
    image: "https://cdn.zeptonow.com/cms/product_variant/93be0c88-124c-43e2-9333-6fd304c322f1.jpeg?height=200&width=200",
    rating: 4.2,
    discount: "5% OFF",
    category: "grocery"
  },
  {
    id: "3",
    name: "Fortune Besan",
    price: "₹52",
    mrp: "₹60",
    quantity: "500 g",
    image: "https://cdn.zeptonow.com/inventory/product/e4e6ec25-e9b7-4c91-be86-0282b186ab4d-/tmp/20230309-16321.png?height=200&width=200",
    rating: 4.7,
    discount: "13% OFF",
    category: "grocery"
  },
  {
    id: "4",
    name: "Tata Salt",
    price: "₹25",
    mrp: "₹28",
    quantity: "1 Kg",
    image: "https://cdn.zeptonow.com/inventory/product/6ac7a142-0af0-4eab-ad6b-30deeef12f1d-/tmp/20230309-16321.png?height=200&width=200",
    rating: 4.3,
    discount: "10% OFF",
    category: "grocery"
  },
  {
    id: "5",
    name: "Mother Dairy Milk",
    price: "₹33",
    mrp: "₹35",
    quantity: "500 ml",
    image: "https://cdn.zeptonow.com/inventory/product/e99e4af1-f4b4-4d6d-bbd2-4f0a07f94a87-/tmp/20230309-16321.png?height=200&width=200",
    rating: 4.6,
    discount: "6% OFF",
    category: "dairy"
  },
  {
    id: "6",
    name: "Amul Butter",
    price: "₹54",
    mrp: "₹60",
    quantity: "100 g",
    image: "https://cdn.zeptonow.com/cms/product_variant/d12ee83b-4cd5-4dfe-88b0-05b5e1d4c414.jpeg?height=200&width=200",
    rating: 4.8,
    discount: "10% OFF",
    category: "dairy"
  },
  {
    id: "7",
    name: "Britannia 50-50 Biscuits",
    price: "₹28",
    mrp: "₹30",
    quantity: "150 g",
    image: "https://cdn.zeptonow.com/cms/product_variant/c3c04a73-f254-467f-94f5-ae6a548093ec.jpeg?height=200&width=200",
    rating: 4.4,
    discount: "7% OFF",
    category: "snacks"
  },
  {
    id: "8",
    name: "Maggi Noodles",
    price: "₹58",
    mrp: "₹60",
    quantity: "4 pack",
    image: "https://cdn.zeptonow.com/cms/product_variant/cf80423c-e07b-48f8-860d-da870b0ecd8c.jpg?height=200&width=200",
    rating: 4.5,
    discount: "3% OFF",
    category: "snacks"
  }
];

// Define Category interface
interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("")
  const [recentSearches, setRecentSearches] = useState<string[]>(["Atta", "Milk", "Oil", "Fresh Vegetables"])
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState("all")
  
  const categories: Category[] = [
    { id: "all", name: "All", icon: <Sparkles size={16} /> },
    { id: "grocery", name: "Grocery", icon: <ShoppingBag size={16} /> },
    { id: "dairy", name: "Dairy", icon: <Clock size={16} /> },
    { id: "snacks", name: "Snacks", icon: <Tag size={16} /> },
    { id: "fruits", name: "Fruits & Vegetables", icon: <Bookmark size={16} /> }
  ]

  // Simulate search API call
  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearching(true)
      
      // Simulate API delay
      const timeout = setTimeout(() => {
        const filtered = allProducts.filter(product => 
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setSearchResults(filtered)
        
        // Generate suggestions based on query
        const suggestionList = allProducts
          .map(p => p.name)
          .filter(name => 
            name.toLowerCase().includes(searchQuery.toLowerCase()) && 
            name.toLowerCase() !== searchQuery.toLowerCase()
          )
          .slice(0, 5)
        
        setSuggestions(suggestionList)
        setIsSearching(false)
      }, 300)
      
      return () => clearTimeout(timeout)
    } else {
      setSearchResults([])
      setSuggestions([])
    }
  }, [searchQuery])
  
  // Filter products by category when active category changes
  useEffect(() => {
    if (searchQuery && activeCategory !== 'all') {
      setSearchResults(
        allProducts.filter(
          product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
            product.category === activeCategory
        )
      )
    } else if (searchQuery) {
      setSearchResults(
        allProducts.filter(
          product => product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    }
  }, [activeCategory, searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (searchQuery.trim()) {
      // Add to recent searches if not already there
      if (!recentSearches.includes(searchQuery)) {
        setRecentSearches(prev => [searchQuery, ...prev.slice(0, 4)])
      }
      
      // Update search results based on current category filter
      if (activeCategory !== 'all') {
        setSearchResults(
          allProducts.filter(
            product => 
              product.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
              product.category === activeCategory
          )
        )
      } else {
        setSearchResults(
          allProducts.filter(
            product => product.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        )
      }
      
      setSuggestions([])
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    
    // Update recent searches
    if (!recentSearches.includes(suggestion)) {
      setRecentSearches(prev => [suggestion, ...prev.slice(0, 4)])
    }
    
    // Update search results
    if (activeCategory !== 'all') {
      setSearchResults(
        allProducts.filter(
          product => 
            product.name.toLowerCase().includes(suggestion.toLowerCase()) && 
            product.category === activeCategory
        )
      )
    } else {
      setSearchResults(
        allProducts.filter(
          product => product.name.toLowerCase().includes(suggestion.toLowerCase())
        )
      )
    }
    
    setSuggestions([])
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2">
            <Link href="/home">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <ArrowLeft size={20} />
              </Button>
            </Link>

            <form onSubmit={handleSearch} className="flex-1 relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for milk, bread, eggs..."
                className="w-full pl-10 pr-10 py-3 rounded-md bg-gray-100 border-0 focus:ring-2 focus:ring-pastel-orange focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setSearchQuery("")}
                >
                  <X size={18} className="text-gray-400" />
                </button>
              )}
            </form>
          </div>
          
          {/* Category filters - only show when there's a search query */}
          {searchQuery && (
            <div className="flex overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2 pt-1">
              <div className="flex space-x-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-1 whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium ${
                      activeCategory === category.id 
                        ? 'bg-pastel-orange text-white' 
                        : 'bg-white text-gray-700 border border-gray-200'
                    }`}
                  >
                    {category.icon}
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        {/* Search Suggestions */}
        {suggestions.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
            {suggestions.map((suggestion, index) => (
              <button 
                key={index}
                className="block w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-0"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-gray-400" />
                  <span>{suggestion}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Recent Searches */}
        {!searchQuery && recentSearches.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-medium text-gray-900">Recent Searches</h2>
              <button 
                className="text-sm text-pastel-orange"
                onClick={() => setRecentSearches([])}
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200"
                  onClick={() => setSearchQuery(search)}
                >
                  <Clock size={14} />
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {isSearching && (
          <div className="my-8 flex flex-col items-center">
            <div className="animate-pulse space-y-4 w-full max-w-md">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-md bg-gray-200"></div>
                <div className="flex-1">
                  <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                  <div className="h-3 w-1/2 bg-gray-200 rounded mt-2"></div>
                  <div className="h-3 w-1/4 bg-gray-200 rounded mt-2"></div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-md bg-gray-200"></div>
                <div className="flex-1">
                  <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                  <div className="h-3 w-1/3 bg-gray-200 rounded mt-2"></div>
                  <div className="h-3 w-1/4 bg-gray-200 rounded mt-2"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchQuery && !isSearching && searchResults.length > 0 && (
          <div>
            <p className="text-sm text-gray-500 mb-4">
              Showing results for "{searchQuery}"
              {activeCategory !== 'all' && ` in ${categories.find(c => c.id === activeCategory)?.name}`}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {searchResults.map(product => (
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
                />
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {searchQuery && !isSearching && searchResults.length === 0 && (
          <div className="my-12 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search size={32} className="text-gray-400" />
            </div>
            <h2 className="text-lg font-medium text-gray-900 mb-2">No results found</h2>
            <p className="text-gray-500 max-w-md">
              We couldn't find anything matching "{searchQuery}".
              {activeCategory !== 'all' && ` Try searching in a different category or remove filters.`}
            </p>
          </div>
        )}

        {/* Trending Searches - Only show when no search query */}
        {!searchQuery && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h2 className="font-medium text-gray-900 mb-3">Trending Searches</h2>
            <div className="grid grid-cols-2 gap-2">
              {["Milk", "Fresh Vegetables", "Instant Noodles", "Cooking Oil", 
                "Snacks", "Eggs", "Bread", "Coffee"].map((item, index) => (
                <button
                  key={index}
                  className="flex items-center justify-between px-4 py-3 border rounded-lg hover:bg-gray-50"
                  onClick={() => setSearchQuery(item)}
                >
                  <span className="text-sm font-medium">{item}</span>
                  <Search size={16} className="text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Recommended Products - Only show when no search query */}
        {!searchQuery && (
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="font-medium text-gray-900 mb-3">Popular Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {allProducts.slice(0, 8).map(product => (
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
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

