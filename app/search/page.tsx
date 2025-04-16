"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, MapPin, Star, Truck, Clock, ShoppingBag, Store, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ProductCard } from "@/components/product-card"
import { stores } from "@/lib/data"

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  
  const [searchQuery, setSearchQuery] = useState(query)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  
  // Sample product search results
  const products = [
    {
      id: "1",
      name: "Aashirvaad Multigrain Atta",
      price: "₹327",
      mrp: "₹404",
      image: "/363209a.jpg",
      quantity: "5 Kg",
      rating: 4.5,
      discount: "18% OFF"
    },
    {
      id: "2",
      name: "Fortune Chakki Fresh Atta",
      price: "₹332",
      mrp: "₹375",
      image: "/480934a.jpg",
      quantity: "5 Kg",
      rating: 4.7,
      discount: "11% OFF"
    },
    {
      id: "3",
      name: "Chakki Atta Fresh",
      price: "₹289",
      mrp: "₹350",
      image: "/395091a.jpg",
      quantity: "10 Kg",
      rating: 4.3,
      discount: "17% OFF"
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
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }
  
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
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
                  className="w-full pl-10 pr-4 py-2 h-10 rounded-md border-gray-200 focus-visible:ring-pastel-orange"
                  placeholder="Search for products, stores, and more"
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                {searchQuery && (
                  <Button 
                    type="submit" 
                    size="sm" 
                    className="absolute right-1 top-1/2 -translate-y-1/2 bg-pastel-orange text-white h-8"
                  >
                    Search
                  </Button>
                )}
              </form>
            </div>
          </div>
        </div>
        
        {/* Tab Navigation */}
        {query && (
          <div className="border-t border-gray-100">
            <div className="container mx-auto px-4">
              <div className="flex overflow-x-auto scrollbar-hide space-x-4 py-2">
                <Button 
                  variant={activeTab === "all" ? "default" : "ghost"} 
                  onClick={() => setActiveTab("all")}
                  className={activeTab === "all" ? "bg-pastel-orange text-white" : ""}
                  size="sm"
                >
                  All
                </Button>
                <Button 
                  variant={activeTab === "products" ? "default" : "ghost"} 
                  onClick={() => setActiveTab("products")}
                  className={activeTab === "products" ? "bg-pastel-orange text-white" : ""}
                  size="sm"
                >
                  Products
                </Button>
                <Button 
                  variant={activeTab === "stores" ? "default" : "ghost"} 
                  onClick={() => setActiveTab("stores")}
                  className={activeTab === "stores" ? "bg-pastel-orange text-white" : ""}
                  size="sm"
                >
                  Stores
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
      
      <div className="container mx-auto px-4 py-6">
        {!query && (
          <div className="text-center py-12">
            <div className="relative h-32 w-32 mx-auto mb-4 opacity-50">
              <Image src="/search-illustration.png" alt="Search" fill className="object-contain" />
            </div>
            <h2 className="text-xl font-medium text-gray-800 mb-2">Search for products or stores</h2>
            <p className="text-gray-500 mb-4 max-w-md mx-auto">
              Find exactly what you're looking for by searching for product names, categories, or store names
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              <Button variant="outline" size="sm" onClick={() => setSearchQuery("milk")}>Milk</Button>
              <Button variant="outline" size="sm" onClick={() => setSearchQuery("vegetables")}>Vegetables</Button>
              <Button variant="outline" size="sm" onClick={() => setSearchQuery("bread")}>Bread</Button>
              <Button variant="outline" size="sm" onClick={() => setSearchQuery("snacks")}>Snacks</Button>
              <Button variant="outline" size="sm" onClick={() => setSearchQuery("fruits")}>Fruits</Button>
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
                {(activeTab === "all" || activeTab === "products") && (
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-medium text-gray-800">Products</h2>
                      {products.length > 0 && (
                        <span className="text-sm text-gray-500">{products.length} found</span>
                      )}
                    </div>
                    
                    {products.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {products.map(product => (
                          <motion.div
                            key={product.id}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 * parseInt(product.id) }}
                          >
                            <ProductCard {...product} />
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
                                <div className="flex items-center p-4 border-b border-gray-100">
                                  <div className="h-12 w-12 bg-pastel-orange/10 rounded-full flex items-center justify-center mr-3">
                                    <Store size={20} className="text-pastel-orange" />
                                  </div>
                                  <div>
                                    <h3 className="font-medium text-gray-800">{store.name}</h3>
                                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                                      <MapPin size={12} />
                                      <span>{store.distance}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="p-4">
                                  <div className="flex items-center justify-between text-sm mb-2">
                                    <div className="flex items-center gap-1 text-gray-600">
                                      <Clock size={14} />
                                      <span>{store.delivery}</span>
                                    </div>
                                    <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded text-green-700">
                                      <Star size={12} fill="currentColor" />
                                      <span>4.2</span>
                                    </div>
                                  </div>
                                  <Button className="w-full mt-2 bg-pastel-orange text-white">View Store</Button>
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

