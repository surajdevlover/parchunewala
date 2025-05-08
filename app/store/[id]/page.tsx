"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Clock, MapPin, Phone, Star, Search, Heart, Filter, ShoppingCart, Grid, List, Info, Package, Share, ChevronRight, ChevronLeft, Menu, ChevronDown, Check, Shield, Truck, AlertCircle, Bookmark, BookmarkCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect, useRef } from "react"
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function StoreScreen({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")
  const [isFavorite, setIsFavorite] = useState(false)
  const [storeData, setStoreData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showStoreInfo, setShowStoreInfo] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [selectedSort, setSelectedSort] = useState<string | null>(null)
  const [showProductInfo, setShowProductInfo] = useState<string | null>(null)
  const [currentImage, setCurrentImage] = useState(0)
  const isMobile = useMediaQuery("(max-width: 640px)")
  const categoryScrollRef = useRef<HTMLDivElement>(null)
  
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
      minOrder: "₹99",
      deliveryFee: "₹15",
      freeDeliveryAbove: "₹199",
      paymentMethods: ["Cash on Delivery", "Online Payment", "UPI"],
      images: [
        "https://content3.jdmagicbox.com/v2/comp/noida/k9/011pxx11.xx11.160125130009.a8k9/catalogue/anjali-general-store-noida-sector-44-noida-general-stores-2egpcjw.jpg?height=150&width=300",
        "https://lh3.googleusercontent.com/p/AF1QipOXhWYEDlkKHtdYo8I5eDO-QJbK3ELZ6plOfpwA=s1360-w1360-h1020",
        "https://lh3.googleusercontent.com/p/AF1QipPrPVYH9J1X03LVHD6jbIgfxaWzQm4QOoUmoYPX=s1360-w1360-h1020"
      ]
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
      minOrder: "₹149",
      deliveryFee: "₹20",
      freeDeliveryAbove: "₹299",
      paymentMethods: ["Cash on Delivery", "Online Payment", "UPI"],
      images: [
        "https://lh3.googleusercontent.com/gps-cs-s/AB5caB87a87mmqARf0sUuN4nXF-hUTfKpjt4Y8hZZoj-JKj4sfEJDNV2Nl1s9EX9mLnPa8MBS5Fd0Y2YvIkhLl1iD8WKYkCyUhc2AeBqO1SJpY74s19AICUnLxJ37C3ayAkzpxlj25bf=s1360-w1360-h1020?height=150&width=300",
        "https://lh3.googleusercontent.com/p/AF1QipNh-o_85PShP0XrSVLYLSRwRyMfwJ2J9x9u-2RH=s1360-w1360-h1020",
        "https://lh3.googleusercontent.com/p/AF1QipM0sYFJX_KlWQRWauzLJM2ImXxA-4Cshz-Sojfh=s1360-w1360-h1020"
      ]
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
      minOrder: "₹199",
      deliveryFee: "₹25",
      freeDeliveryAbove: "₹399",
      paymentMethods: ["Cash on Delivery", "Online Payment"],
      images: [
        "https://lh3.googleusercontent.com/gps-cs-s/AB5caB_QAIR4rpDjU1ofWAq01ZqBN0Zds7Yuz0aeaFjF0PQ1sAXnAgCYw16L1WEBWKcTaK-CiWGmkqHo1RhOZ9M4z9RRo_yABuvZIMki9by6Efiwmq_FKTfWceBVprj9txNRLCgsjuE=s1360-w1360-h1020?height=150&width=300",
        "https://lh3.googleusercontent.com/p/AF1QipPTwwONJOVYxHCMi-hG-jgMJGcTUSgH0cxQaVQB=s1360-w1360-h1020",
        "https://lh3.googleusercontent.com/p/AF1QipM9Y11FTlFsL3-VbM0aJrOrE1pKXXLGwDeJ9hSo=s1360-w1360-h1020"
      ]
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
      minOrder: "₹99",
      deliveryFee: "₹10",
      freeDeliveryAbove: "₹149",
      paymentMethods: ["Cash on Delivery", "UPI"],
      images: [
        "https://lh3.googleusercontent.com/gps-cs-s/AB5caB_QAIR4rpDjU1ofWAq01ZqBN0Zds7Yuz0aeaFjF0PQ1sAXnAgCYw16L1WEBWKcTaK-CiWGmkqHo1RhOZ9M4z9RRo_yABuvZIMki9by6Efiwmq_FKTfWceBVprj9txNRLCgsjuE=s1360-w1360-h1020?height=150&width=300",
        "https://lh3.googleusercontent.com/p/AF1QipPhGjEh-Z_YrFJlJHq2dX-XbCnzGyTc_bE9qlbt=s1360-w1360-h1020"
      ]
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
      minOrder: "₹149",
      deliveryFee: "₹30",
      freeDeliveryAbove: "₹349",
      paymentMethods: ["Cash on Delivery", "Online Payment", "UPI"],
      images: [
        "https://content3.jdmagicbox.com/v2/comp/noida/k9/011pxx11.xx11.160125130009.a8k9/catalogue/anjali-general-store-noida-sector-44-noida-general-stores-2egpcjw.jpg?height=150&width=300",
        "https://lh3.googleusercontent.com/p/AF1QipMiOxUHxQdYjjyw3Kj2rREUgHgA4rLk0qB3i-Ev=s1360-w1360-h1020"
      ]
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
      minOrder: "₹99",
      deliveryFee: "₹20",
      freeDeliveryAbove: "₹199",
      paymentMethods: ["Cash on Delivery", "Online Payment", "UPI"],
      images: [
        "https://lh3.googleusercontent.com/gps-cs-s/AB5caB87a87mmqARf0sUuN4nXF-hUTfKpjt4Y8hZZoj-JKj4sfEJDNV2Nl1s9EX9mLnPa8MBS5Fd0Y2YvIkhLl1iD8WKYkCyUhc2AeBqO1SJpY74s19AICUnLxJ37C3ayAkzpxlj25bf=s1360-w1360-h1020?height=150&width=300",
        "https://lh3.googleusercontent.com/p/AF1QipMfpwBYWaGZ4LlFiy6EEuK-HW4RHvMqoXSQkF4n=s1360-w1360-h1020"
      ]
    }
  ]

  useEffect(() => {
    // Find the store data by ID
    const store = stores.find(s => s.id === params.id)
    if (store) {
      setStoreData(store)
    } else {
      // If store not found, redirect back to stores list
      router.push('/store')
    }
    
    setLoading(false)
  }, [params.id, router])

  // Store categories
  const categories = [
    { id: "all", name: "All", icon: "🏪" },
    { id: "groceries", name: "Groceries", icon: "🛒" },
    { id: "fruits", name: "Fruits & Vegetables", icon: "🍎" },
    { id: "dairy", name: "Dairy & Breakfast", icon: "🥛" },
    { id: "snacks", name: "Snacks", icon: "🍿" },
    { id: "beverages", name: "Beverages", icon: "☕" },
  ]

  // Sort options
  const sortOptions = [
    { id: "price-low", name: "Price: Low to High" },
    { id: "price-high", name: "Price: High to Low" },
    { id: "rating", name: "Rating" },
    { id: "discount", name: "Discount" }
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
        discount: "9% OFF",
        description: "Pure, fine-grained iodized salt for all your cooking needs. Helps maintain good health with essential iodine content.",
        images: [
          "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/tata-salt.jpeg?height=100&width=100",
          "https://cdn.grofers.com/app/images/products/sliding_image/105c.jpg"
        ]
      },
      {
        id: "g2",
        name: "Fortune Sunflower Oil",
        price: "₹200",
        mrp: "₹220",
        quantity: "1 L",
        image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/fortune-sunflower-oil.jpeg?height=100&width=100",
        rating: 4.3,
        discount: "9% OFF",
        description: "Refined sunflower oil, light in taste and texture. Perfect for everyday cooking, with the goodness of vitamin E.",
        images: [
          "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/fortune-sunflower-oil.jpeg?height=100&width=100",
          "https://cdn.grofers.com/app/images/products/sliding_image/391c.jpg"
        ]
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
        discount: "20% OFF",
        description: "Crisp, juicy apples that are perfect for snacking or baking. Rich in antioxidants and dietary fiber.",
        images: [
          "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/fresh-apples.jpeg?height=100&width=100",
          "https://cdn.grofers.com/app/images/products/sliding_image/20c.jpg"
        ]
      },
      {
        id: "f2",
        name: "Organic Bananas",
        price: "₹60",
        mrp: "₹70",
        quantity: "6 pcs",
        image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/organic-bananas.jpeg?height=100&width=100",
        rating: 4.7,
        discount: "14% OFF",
        description: "Naturally ripened bananas grown without chemicals. A perfect on-the-go energy booster packed with potassium.",
        images: [
          "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/organic-bananas.jpeg?height=100&width=100",
          "https://cdn.grofers.com/app/images/products/sliding_image/42c.jpg"
        ]
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
        discount: "8% OFF",
        description: "Creamy, smooth butter made from pasteurized cream. Perfect for spreading on bread or adding flavor to your cooking.",
        images: [
          "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/amul-butter.jpeg?height=100&width=100",
          "https://cdn.grofers.com/app/images/products/sliding_image/73c.jpg"
        ]
      },
      {
        id: "d2",
        name: "Fresh Milk",
        price: "₹30",
        mrp: "₹35",
        quantity: "500 ml",
        image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/fresh-milk.jpeg?height=100&width=100",
        rating: 4.5,
        discount: "14% OFF",
        description: "Pasteurized whole milk sourced from healthy cows. Rich in calcium and protein for strong bones and muscles.",
        images: [
          "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/fresh-milk.jpeg?height=100&width=100",
          "https://cdn.grofers.com/app/images/products/sliding_image/68c.jpg"
        ]
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
        discount: "20% OFF",
        description: "Crispy potato chips with the perfect balance of salt. Made from farm-fresh potatoes for an irresistible crunch.",
        images: [
          "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/lays-chips.jpeg?height=100&width=100",
          "https://cdn.grofers.com/app/images/products/sliding_image/456c.jpg"
        ]
      },
      {
        id: "s2",
        name: "Dark Fantasy Biscuits",
        price: "₹60",
        mrp: "₹75",
        quantity: "300 g",
        image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/dark-fantasy-biscuits.jpeg?height=100&width=100",
        rating: 4.8,
        discount: "20% OFF",
        description: "Chocolate sandwich cookies with a rich, creamy filling. The perfect indulgence for your sweet cravings.",
        images: [
          "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/dark-fantasy-biscuits.jpeg?height=100&width=100",
          "https://cdn.grofers.com/app/images/products/sliding_image/334c.jpg"
        ]
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
        discount: "11% OFF",
        description: "Refreshing carbonated soft drink with the classic cola flavor that everyone loves. Best served chilled.",
        images: [
          "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/coca-cola.jpeg?height=100&width=100",
          "https://cdn.grofers.com/app/images/products/sliding_image/145c.jpg"
        ]
      },
      {
        id: "b2",
        name: "Red Bull",
        price: "₹115",
        mrp: "₹125",
        quantity: "250 ml",
        image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/red-bull.jpeg?height=100&width=100",
        rating: 4.6,
        discount: "8% OFF",
        description: "Energy drink that vitalizes body and mind. Contains caffeine, taurine, B-group vitamins, and sugars for increased performance.",
        images: [
          "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/red-bull.jpeg?height=100&width=100",
          "https://cdn.grofers.com/app/images/products/sliding_image/204c.jpg"
        ]
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
    if (activeTab === "all") {
      return allProducts
    }
    return productsByCategory[activeTab as keyof typeof productsByCategory] || []
  }

  // Filter products based on search
  const getFilteredProducts = () => {
    const currentProducts = getCurrentProducts()
    if (!searchValue) return currentProducts
    
    return currentProducts.filter(product => 
      product.name.toLowerCase().includes(searchValue.toLowerCase())
    )
  }

  // Sort products
  const getSortedProducts = () => {
    const filteredProducts = getFilteredProducts()
    
    if (!selectedSort) return filteredProducts
    
    const getNumericPrice = (price: string) => parseFloat(price.replace('₹', '').replace(',', ''))
    
    return [...filteredProducts].sort((a, b) => {
      switch (selectedSort) {
        case "price-low":
          return getNumericPrice(a.price) - getNumericPrice(b.price)
        case "price-high":
          return getNumericPrice(b.price) - getNumericPrice(a.price)
        case "rating":
          return b.rating - a.rating
        case "discount":
          return parseInt(b.discount) - parseInt(a.discount)
        default:
          return 0
      }
    })
  }

  const displayedProducts = getSortedProducts()

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  // Category scroll controls
  const scrollLeft = () => {
    if (categoryScrollRef.current) {
      categoryScrollRef.current.scrollBy({ left: -100, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (categoryScrollRef.current) {
      categoryScrollRef.current.scrollBy({ left: 100, behavior: 'smooth' })
    }
  }

  // Handle image gallery navigation
  const nextImage = () => {
    if (!storeData?.images) return
    setCurrentImage((prev) => (prev + 1) % storeData.images.length)
  }

  const prevImage = () => {
    if (!storeData?.images) return
    setCurrentImage((prev) => (prev - 1 + storeData.images.length) % storeData.images.length)
  }

  const handleSortChange = (sortId: string) => {
    setSelectedSort(sortId)
    setShowFilterMenu(false)
  }

  if (loading) {
    return (
      <div className="loading-container bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="loading-spinner">
          <div></div>
          <div></div>
        </div>
        <p className="mt-6 text-pastel-orange font-semibold text-lg animate-pulse">Loading Store Details...</p>
      </div>
    )
  }

  if (!storeData) {
    return null // This will not render since we redirect in the useEffect
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/store">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <ArrowLeft size={20} />
              </Button>
            </Link>
            <h1 className="text-lg font-medium text-dark-grey">{storeData.name}</h1>
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
        <Image src={storeData.image || "/placeholder.svg"} alt={storeData.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/60"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-start justify-between gap-3">
            <div className="flex gap-3 items-center">
              <Avatar className="h-16 w-16 border-2 border-white">
                <AvatarFallback className="bg-pastel-orange text-white text-lg">
                  {storeData.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-bold">{storeData.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                    <span>{storeData.rating}</span>
                  </div>
                  <div className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                    <Clock size={12} className="inline mr-1" />
                    <span>{storeData.deliveryTime}</span>
                  </div>
                  <div className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                    <MapPin size={12} className="inline mr-1" />
                    <span>{storeData.distance}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Store Details */}
      <div className="px-4 py-4 bg-white">
        <p className="text-sm text-gray-600 mb-3">{storeData.description}</p>
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock size={16} className="text-pastel-orange" />
            <span>{storeData.timing}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone size={16} className="text-pastel-orange" />
            <span>{storeData.contact}</span>
          </div>
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <MapPin size={16} className="mt-0.5 text-pastel-orange flex-shrink-0" />
            <span>{storeData.address}</span>
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
                {displayedProducts.map((product) => (
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

