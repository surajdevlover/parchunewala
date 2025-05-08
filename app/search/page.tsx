"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, MapPin, Star, Truck, Clock, ShoppingBag, Store, Loader2, Filter, Grid, List, SlidersHorizontal, ArrowDownUp, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ProductCard } from "@/components/product-card"
import { Badge } from "@/components/ui/badge"
import { MarketplaceComparison } from "@/components/marketplace-comparison"
import { stores } from "@/lib/data"
import { useMediaQuery } from "@/hooks/use-media-query"

// Define interfaces for type safety
interface Product {
  id: string
  name: string
  price: string
  mrp: string
  image: string
  quantity: string
  rating: number
  discount: string
  storeId: string
  storeName: string
  deliveryTime: string
}

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  
  const [searchQuery, setSearchQuery] = useState(query)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedSort, setSelectedSort] = useState<string | null>(null)
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [selectedMarketProduct, setSelectedMarketProduct] = useState<Product | null>(null)
  const isMobile = useMediaQuery("(max-width: 640px)")
  
  // Sample product search results
  const products: Product[] = [
    {
      id: "1",
      name: "Aashirvaad Multigrain Atta",
      price: "₹327",
      mrp: "₹404",
      image: "/363209a.jpg",
      quantity: "5 Kg",
      rating: 4.5,
      discount: "18% OFF",
      storeId: "1",
      storeName: "Satish General Store",
      deliveryTime: "15-20 min"
    },
    {
      id: "2",
      name: "Fortune Chakki Fresh Atta",
      price: "₹332",
      mrp: "₹375",
      image: "/480934a.jpg",
      quantity: "5 Kg",
      rating: 4.7,
      discount: "11% OFF",
      storeId: "2",
      storeName: "Pandit General Store",
      deliveryTime: "20-25 min"
    },
    {
      id: "3",
      name: "Chakki Atta Fresh",
      price: "₹289",
      mrp: "₹350",
      image: "/395091a.jpg",
      quantity: "10 Kg",
      rating: 4.3,
      discount: "17% OFF",
      storeId: "3",
      storeName: "Anuj Kirana Store",
      deliveryTime: "25-30 min"
    },
    {
      id: "4",
      name: "Organic Tattva Wheat Flour",
      price: "₹410",
      mrp: "₹450",
      image: "/363209a.jpg",
      quantity: "5 Kg",
      rating: 4.8,
      discount: "9% OFF",
      storeId: "1",
      storeName: "Satish General Store",
      deliveryTime: "15-20 min"
    },
    {
      id: "5",
      name: "Tata Salt",
      price: "₹24",
      mrp: "₹28",
      image: "/252412a.jpg",
      quantity: "1 Kg",
      rating: 4.9,
      discount: "14% OFF",
      storeId: "2",
      storeName: "Pandit General Store",
      deliveryTime: "20-25 min"
    },
    {
      id: "6",
      name: "Saffola Gold Oil",
      price: "₹210",
      mrp: "₹250",
      image: "/329549a.jpg",
      quantity: "1 L",
      rating: 4.6,
      discount: "16% OFF",
      storeId: "3",
      storeName: "Anuj Kirana Store",
      deliveryTime: "25-30 min"
    }
  ]
  
  // Filter options
  const filterOptions = [
    { id: "price-low", name: "Price: Low to High" },
    { id: "price-high", name: "Price: High to Low" },
    { id: "rating", name: "Rating" },
    { id: "discount", name: "Discount" },
    { id: "delivery", name: "Delivery Time" }
  ]
  
  // Filter chips
  const filterChips = [
    { id: "all", name: "All" },
    { id: "grocery", name: "Grocery" },
    { id: "dairy", name: "Dairy" },
    { id: "beverages", name: "Beverages" },
    { id: "snacks", name: "Snacks" },
    { id: "personal-care", name: "Personal Care" }
  ]
  
  // Simulate search loading
  useEffect(() => {
    if (query) {
      setIsLoading(true)
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 800)
      
      return () => clearTimeout(timer)
    }
  }, [query])
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setIsLoading(true)
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }
  
  const handleFilterClick = (filterId: string) => {
    setActiveFilter(activeFilter === filterId ? null : filterId)
  }
  
  const handleSortChange = (sortId: string) => {
    setSelectedSort(sortId)
    setShowFilterMenu(false)
  }
  
  // Filter products based on selected filter
  const filteredProducts = activeFilter && activeFilter !== "all" 
    ? products.filter(product => {
        // This is just an example - in a real app, filter by proper categories
        if (activeFilter === "grocery") {
          return product.name.toLowerCase().includes("atta") || product.name.toLowerCase().includes("salt")
        }
        if (activeFilter === "dairy") {
          return product.name.toLowerCase().includes("milk") || product.name.toLowerCase().includes("butter")
        }
        return true
      })
    : products
    
  // Sort products based on selected sorting option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!selectedSort) return 0
    
    const getNumericPrice = (price: string) => parseFloat(price.replace('₹', '').replace(',', ''))
    
    switch (selectedSort) {
      case "price-low":
        return getNumericPrice(a.price) - getNumericPrice(b.price)
      case "price-high":
        return getNumericPrice(b.price) - getNumericPrice(a.price)
      case "rating":
        return b.rating - a.rating
      case "discount":
        return parseFloat(b.discount) - parseFloat(a.discount)
      case "delivery":
        return parseInt(a.deliveryTime) - parseInt(b.deliveryTime)
      default:
        return 0
    }
  })
  
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header with gradient */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-white to-pastel-orange/20 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2">
            <Link href="/home">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <ArrowLeft size={20} />
              </Button>
            </Link>
            <div className="flex-1">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  className="w-full pl-10 pr-4 py-2 h-10 rounded-full border-gray-200 focus-visible:ring-pastel-orange"
                  placeholder="Search for products, stores, and more"
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={18} className="text-pastel-orange" />
                </div>
                {searchQuery && (
                  <Button 
                    type="submit" 
                    size="sm" 
                    className="absolute right-1 top-1/2 -translate-y-1/2 bg-pastel-orange text-white h-8 rounded-full"
                  >
                    Search
                  </Button>
                )}
              </form>
            </div>
          </div>
        </div>
        
        {/* Filter chips and view mode toggle */}
        {query && (
          <div className="border-t border-gray-100 bg-white/80 backdrop-blur-sm">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between py-2">
                <div className="flex overflow-x-auto hide-scrollbar space-x-2">
                  {filterChips.map((chip) => (
                    <Badge
                      key={chip.id}
                      variant="outline"
                      className={`cursor-pointer whitespace-nowrap px-3 py-1 text-xs rounded-full ${
                        activeFilter === chip.id || (chip.id === 'all' && !activeFilter)
                          ? 'bg-pastel-orange text-white border-transparent'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-pastel-orange/50'
                      }`}
                      onClick={() => handleFilterClick(chip.id)}
                    >
                      {chip.name}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 gap-1 text-xs"
                      onClick={() => setShowFilterMenu(!showFilterMenu)}
                    >
                      <SlidersHorizontal size={14} />
                      {selectedSort ? filterOptions.find(f => f.id === selectedSort)?.name : "Sort"}
                    </Button>
                    
                    {showFilterMenu && (
                      <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg z-40 py-1 border border-gray-100">
                        {filterOptions.map((option) => (
                          <button
                            key={option.id}
                            className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                            onClick={() => handleSortChange(option.id)}
                          >
                            {selectedSort === option.id && <Check size={14} className="text-pastel-orange" />}
                            <span className={selectedSort === option.id ? "text-pastel-orange" : ""}>
                              {option.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="border rounded-md flex">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 w-8 p-0 ${viewMode === 'grid' ? 'bg-pastel-orange/10 text-pastel-orange' : ''}`}
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 w-8 p-0 ${viewMode === 'list' ? 'bg-pastel-orange/10 text-pastel-orange' : ''}`}
                      onClick={() => setViewMode('list')}
                    >
                      <List size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
      
      <div className="container mx-auto px-4 py-6">
        {!query && (
          <div className="text-center py-12">
            <div className="relative h-32 w-32 mx-auto mb-4 opacity-80">
              <Image src="/search-illustration.png" alt="Search" fill className="object-contain" />
            </div>
            <h2 className="text-xl font-medium text-gray-800 mb-2">Search for products or stores</h2>
            <p className="text-gray-500 mb-4 max-w-md mx-auto">
              Find exactly what you're looking for with price comparisons across multiple marketplaces
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              <Button variant="outline" size="sm" onClick={() => { setSearchQuery("milk"); handleSearch(new Event('submit') as any); }}>
                Milk
              </Button>
              <Button variant="outline" size="sm" onClick={() => { setSearchQuery("atta"); handleSearch(new Event('submit') as any); }}>
                Atta
              </Button>
              <Button variant="outline" size="sm" onClick={() => { setSearchQuery("salt"); handleSearch(new Event('submit') as any); }}>
                Salt
              </Button>
              <Button variant="outline" size="sm" onClick={() => { setSearchQuery("oil"); handleSearch(new Event('submit') as any); }}>
                Oil
              </Button>
              <Button variant="outline" size="sm" onClick={() => { setSearchQuery("snacks"); handleSearch(new Event('submit') as any); }}>
                Snacks
              </Button>
            </div>
          </div>
        )}
        
        {/* Loading State */}
        {isLoading && query && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 size={40} className="animate-spin text-pastel-orange mb-4" />
            <p className="text-gray-600">Searching for "{query}"...</p>
          </div>
        )}
        
        {/* Results */}
        {!isLoading && query && (
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Selected product comparison */}
                {selectedMarketProduct && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                  >
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-pastel-orange/30">
                      <div className="flex justify-between items-center p-4 bg-pastel-orange/10">
                        <h3 className="font-semibold text-gray-800">Marketplace Comparison</h3>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8 text-gray-500"
                          onClick={() => setSelectedMarketProduct(null)}
                        >
                          Close
                        </Button>
                      </div>
                      
                      <div className="p-4 border-b">
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                            <Image 
                              src={selectedMarketProduct.image} 
                              alt={selectedMarketProduct.name} 
                              fill 
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">{selectedMarketProduct.name}</h4>
                            <div className="flex items-center text-sm text-gray-500">
                              <span className="mr-2">{selectedMarketProduct.quantity}</span>
                              <span className="flex items-center">
                                <Star size={14} className="text-yellow-400 mr-1 fill-yellow-400" />
                                {selectedMarketProduct.rating}
                              </span>
                            </div>
                            <div className="flex items-center mt-1">
                              <p className="font-semibold text-pastel-orange">{selectedMarketProduct.price}</p>
                              <p className="ml-2 text-sm text-gray-500 line-through">{selectedMarketProduct.mrp}</p>
                              <Badge className="ml-2 bg-green-100 text-green-800 text-xs border-0">
                                {selectedMarketProduct.discount}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <MarketplaceComparison
                        productQuery={selectedMarketProduct.name}
                        ownStorePrice={selectedMarketProduct.price}
                        ownStoreId={selectedMarketProduct.storeId}
                      />
                    </div>
                  </motion.div>
                )}

                {(activeTab === "all" || activeTab === "products") && (
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-medium text-gray-800">Products</h2>
                      {sortedProducts.length > 0 && (
                        <span className="text-sm text-gray-500">{sortedProducts.length} found</span>
                      )}
                    </div>
                    
                    {sortedProducts.length > 0 ? (
                      <div className={viewMode === 'grid' 
                        ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" 
                        : "flex flex-col space-y-4"
                      }>
                        {sortedProducts.map((product, index) => (
                          <motion.div
                            key={product.id}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.05 * index }}
                            onClick={() => setSelectedMarketProduct(product)}
                            className="cursor-pointer"
                          >
                            {viewMode === 'grid' ? (
                              <ProductCard {...product} />
                            ) : (
                              <div className="bg-white p-3 rounded-lg shadow-sm flex gap-3 hover:shadow-md transition-shadow">
                                <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                                  <Image 
                                    src={product.image} 
                                    alt={product.name} 
                                    fill 
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-grow">
                                  <h3 className="font-medium text-gray-800 text-sm">{product.name}</h3>
                                  <p className="text-xs text-gray-500">{product.quantity}</p>
                                  <div className="flex items-center mt-1 mb-1">
                                    <span className="text-xs flex items-center text-gray-600">
                                      <Star size={12} className="text-yellow-400 fill-yellow-400 mr-1" />
                                      {product.rating}
                                    </span>
                                    <span className="mx-2 text-gray-300">|</span>
                                    <span className="text-xs flex items-center text-gray-600">
                                      <Store size={12} className="mr-1" />
                                      {product.storeName}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      <p className="font-semibold text-pastel-orange">{product.price}</p>
                                      <p className="ml-2 text-xs text-gray-400 line-through">{product.mrp}</p>
                                    </div>
                                    <Badge className="bg-green-100 text-green-800 text-[10px] border-0">
                                      {product.discount}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                        <div className="flex justify-center mb-4">
                          <ShoppingBag size={64} className="text-gray-300" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">No products found</h3>
                        <p className="text-gray-500 mb-6">
                          We couldn't find any products matching "{query}"
                        </p>
                      </div>
                    )}
                  </div>
                )}
                
                {(activeTab === "all" || activeTab === "stores") && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-medium text-gray-800">Stores</h2>
                      {stores.length > 0 && (
                        <span className="text-sm text-gray-500">{stores.length} found</span>
                      )}
                    </div>
                    
                    {stores.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {stores.map((store, index) => (
                          <motion.div
                            key={store.id}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 * index }}
                          >
                            <Link href={`/store/${store.id}`} className="block">
                              <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
                                <div className="relative h-36 bg-gray-100">
                                  <Image 
                                    src={store.image} 
                                    alt={store.name} 
                                    fill 
                                    className="object-cover"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                  <div className="absolute bottom-0 left-0 p-3 text-white">
                                    <h3 className="font-semibold">{store.name}</h3>
                                    <div className="flex items-center text-sm">
                                      <MapPin size={14} className="mr-1" />
                                      {store.location}
                                    </div>
                                  </div>
                                </div>
                                <div className="p-3">
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center">
                                      <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                      <span className="ml-1 text-sm font-medium">{store.rating}</span>
                                    </div>
                                    <span className="text-xs text-gray-500">{store.distance}</span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center text-sm text-gray-500">
                                      <Clock size={14} className="mr-1" />
                                      {store.timing}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                      <Truck size={14} className="mr-1" />
                                      {store.deliveryTime || "15-20 min"}
                                    </div>
                                  </div>
                                  <div className="mt-2 flex flex-wrap gap-1">
                                    {store.tags?.slice(0, 3).map((tag, i) => (
                                      <Badge key={i} variant="outline" className="text-[8px] px-1 py-0 bg-gray-50">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                        <div className="flex justify-center mb-4">
                          <Store size={64} className="text-gray-300" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">No stores found</h3>
                        <p className="text-gray-500 mb-6">
                          We couldn't find any stores matching "{query}"
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  )
}

