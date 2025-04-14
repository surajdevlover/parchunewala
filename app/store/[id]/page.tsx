"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Clock, MapPin, Phone, Star, Search, Heart, Filter, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useState } from "react"

export default function StoreScreen({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("all")
  const [isFavorite, setIsFavorite] = useState(false)
  
  // Mock store data - in a real app, this would come from an API
  const store = {
    id: params.id,
    name: "LocalMart Supermarket",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    banner: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    timing: "Open 8 AM - 10 PM",
    contact: "+91-9876543210",
    address: "Shop No. 12, Market Road, Andheri West, Mumbai",
    rating: 4.2,
    reviews: 500,
    deliveryTime: "15-20 min",
    distance: "1.2 km away",
    description: "Your neighborhood supermarket with all daily essentials, fresh produce, and household items at affordable prices."
  }

  // Store categories
  const categories = [
    { id: "all", name: "All" },
    { id: "groceries", name: "Groceries" },
    { id: "fruits", name: "Fruits & Vegetables" },
    { id: "dairy", name: "Dairy & Breakfast" },
    { id: "snacks", name: "Snacks" },
    { id: "beverages", name: "Beverages" },
  ]

  // Mock products data organized by category
  const productsByCategory = {
    groceries: [
      {
        id: "g1",
        name: "Tata Salt",
        price: "₹20",
        mrp: "₹22",
        quantity: "1 kg",
        image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/tata-salt.jpeg?height=100&width=100",
        rating: 4.8,
        discount: "9% OFF"
      },
      {
        id: "g2",
        name: "Fortune Sunflower Oil",
        price: "₹200",
        mrp: "₹220",
        quantity: "1 L",
        image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/fortune-sunflower-oil.jpeg?height=100&width=100",
        rating: 4.3,
        discount: "9% OFF"
      }
    ],
    fruits: [
      {
        id: "f1",
        name: "Fresh Apples",
        price: "₹120",
        mrp: "₹150",
        quantity: "1 kg",
        image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/fresh-apples.jpeg?height=100&width=100",
        rating: 4.6,
        discount: "20% OFF"
      },
      {
        id: "f2",
        name: "Organic Bananas",
        price: "₹60",
        mrp: "₹70",
        quantity: "6 pcs",
        image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/organic-bananas.jpeg?height=100&width=100",
        rating: 4.7,
        discount: "14% OFF"
      }
    ],
    dairy: [
      {
        id: "d1",
        name: "Amul Butter",
        price: "₹55",
        mrp: "₹60",
        quantity: "100 g",
        image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/amul-butter.jpeg?height=100&width=100",
        rating: 4.9,
        discount: "8% OFF"
      },
      {
        id: "d2",
        name: "Fresh Milk",
        price: "₹30",
        mrp: "₹35",
        quantity: "500 ml",
        image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/fresh-milk.jpeg?height=100&width=100",
        rating: 4.5,
        discount: "14% OFF"
      }
    ],
    snacks: [
      {
        id: "s1",
        name: "Lay's Chips",
        price: "₹20",
        mrp: "₹25",
        quantity: "52 g",
        image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/lays-chips.jpeg?height=100&width=100",
        rating: 4.7,
        discount: "20% OFF"
      },
      {
        id: "s2",
        name: "Dark Fantasy Biscuits",
        price: "₹60",
        mrp: "₹75",
        quantity: "300 g",
        image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/dark-fantasy-biscuits.jpeg?height=100&width=100",
        rating: 4.8,
        discount: "20% OFF"
      }
    ],
    beverages: [
      {
        id: "b1",
        name: "Coca Cola",
        price: "₹40",
        mrp: "₹45",
        quantity: "750 ml",
        image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/coca-cola.jpeg?height=100&width=100",
        rating: 4.5,
        discount: "11% OFF"
      },
      {
        id: "b2",
        name: "Red Bull",
        price: "₹115",
        mrp: "₹125",
        quantity: "250 ml",
        image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/red-bull.jpeg?height=100&width=100",
        rating: 4.6,
        discount: "8% OFF"
      }
    ]
  }

  // All products combined for the "all" category
  const allProducts = [
    ...productsByCategory.groceries,
    ...productsByCategory.fruits,
    ...productsByCategory.dairy,
    ...productsByCategory.snacks,
    ...productsByCategory.beverages
  ]

  // Get current products based on active tab
  const getCurrentProducts = () => {
    if (activeTab === 'all') return allProducts
    return productsByCategory[activeTab as keyof typeof productsByCategory] || []
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/home">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <ArrowLeft size={20} />
              </Button>
            </Link>
            <h1 className="text-lg font-medium text-dark-grey">{store.name}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9"
              onClick={toggleFavorite}
            >
              <Heart 
                size={20} 
                className={isFavorite ? "fill-pastel-orange text-pastel-orange" : "text-gray-600"}
              />
            </Button>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="h-9 w-9 relative">
                <ShoppingCart size={20} className="text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-pastel-orange text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  2
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Store Banner */}
      <div className="relative w-full h-56">
        <Image src={store.banner || "/placeholder.svg"} alt={store.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/60"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-start justify-between gap-3">
            <div className="flex gap-3 items-center">
              <Avatar className="h-16 w-16 border-2 border-white">
                <AvatarFallback className="bg-pastel-orange text-white text-lg">
                  {store.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-bold">{store.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                    <span>{store.rating}</span>
                  </div>
                  <div className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                    <Clock size={12} className="inline mr-1" />
                    <span>{store.deliveryTime}</span>
                  </div>
                  <div className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                    <MapPin size={12} className="inline mr-1" />
                    <span>{store.distance}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Store Details */}
      <div className="px-4 py-4 bg-white">
        <p className="text-sm text-gray-600 mb-3">{store.description}</p>
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock size={16} className="text-pastel-orange" />
            <span>{store.timing}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone size={16} className="text-pastel-orange" />
            <span>{store.contact}</span>
          </div>
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <MapPin size={16} className="mt-0.5 text-pastel-orange flex-shrink-0" />
            <span>{store.address}</span>
          </div>
        </div>
      </div>
      
      {/* Search and Filter */}
      <div className="sticky top-16 z-10 bg-white border-y border-gray-100 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search products in this store" 
              className="pl-10 h-10 bg-gray-50 border-gray-200"
            />
          </div>
          <Button variant="outline" size="icon" className="h-10 w-10 flex-shrink-0">
            <Filter size={18} />
          </Button>
        </div>
      </div>
      
      {/* Category Tabs */}
      <div className="bg-white sticky top-[107px] z-10 border-b border-gray-100">
        <div className="px-1">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <div className="overflow-x-auto hide-scrollbar">
              <TabsList className="bg-transparent h-12 p-0 space-x-1">
                {categories.map(category => (
                  <TabsTrigger 
                    key={category.id}
                    value={category.id}
                    className="py-2 px-4 h-10 data-[state=active]:bg-pastel-orange/10 data-[state=active]:text-pastel-orange rounded-full"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {/* Products section */}
            <div className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {getCurrentProducts().map((product) => (
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
          </Tabs>
        </div>
      </div>
    </main>
  )
}

