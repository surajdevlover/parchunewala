"use client"

import { useState, useEffect, useCallback, useRef } from "react"
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
import { useMediaQuery } from "@/hooks/use-media-query"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import MobileAppPrompt from "@/components/mobile-app-prompt"

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
  const isMobile = useMediaQuery("(max-width: 640px)")
  const todaysDealsRef = useRef<HTMLDivElement>(null)

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
  
  // Product sections - REPLACE with store-based sections
  const productSections = [
    {
      id: "satish",
      title: "Products from Satish General Store",
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
          storeId: "1"
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
          storeId: "1"
        },
        {
          id: "s5",
          name: "Bingo Mad Angles",
          price: "₹30",
          mrp: "₹35",
          quantity: "130 g",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/bingo-mad-angles-achaari-masti.jpeg?height=100&width=100",
          rating: 4.0,
          discount: "14% OFF",
          storeId: "1"
        },
        {
          id: "s6",
          name: "Bingo Mad Angles",
          price: "₹30",
          mrp: "₹35",
          quantity: "130 g",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/bingo-mad-angles-achaari-masti.jpeg?height=100&width=100",
          rating: 4.0,
          discount: "14% OFF",
          storeId: "1"
        }
      ]
    },
    {
      id: "pandit",
      title: "Products from Pandit General Store",
      products: [
        {
          id: "d1",
          name: "Amul Butter",
          price: "₹54",
          mrp: "₹60",
          quantity: "100 g",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/amul-butter.jpeg?height=100&width=100",
          rating: 4.8,
          discount: "10% OFF",
          storeId: "2"
        },
        {
          id: "d2",
          name: "Mother Dairy Milk",
          price: "₹67",
          mrp: "₹70",
          quantity: "1 L",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/mother-dairy-toned-milk.jpeg?height=100&width=100",
          rating: 4.6,
          discount: "4% OFF",
          storeId: "2"
        },
        {
          id: "d3",
          name: "Britannia Bread",
          price: "₹45",
          mrp: "₹50",
          quantity: "400 g",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/britannia-brown-bread.jpeg?height=100&width=100",
          rating: 4.4,
          discount: "10% OFF",
          storeId: "2"
        },
        {
          id: "d4",
          name: "Amul Cheese Slices",
          price: "₹138",
          mrp: "₹145",
          quantity: "200 g",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/amul-cheese-slices.jpeg?height=100&width=100",
          rating: 4.7,
          discount: "5% OFF",
          storeId: "2"
        },
        {
          id: "d5",
          name: "Amul Cheese Slices",
          price: "₹138",
          mrp: "₹145",
          quantity: "200 g",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/amul-cheese-slices.jpeg?height=100&width=100",
          rating: 4.7,
          discount: "5% OFF",
          storeId: "2"
        },
        {
          id: "d6",
          name: "Amul Cheese Slices",
          price: "₹138",
          mrp: "₹145",
          quantity: "200 g",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/amul-cheese-slices.jpeg?height=100&width=100",
          rating: 4.7,
          discount: "5% OFF",
          storeId: "2"
        }
      ]
    },
    {
      id: "anuj",
      title: "Products from Anuj Kirana Store",
      products: [
        {
          id: "c1",
          name: "Coca-Cola",
          price: "₹40",
          mrp: "₹45",
          quantity: "750 mL",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/coca-cola-soft-drink.jpeg?height=100&width=100",
          rating: 4.6,
          discount: "11% OFF",
          storeId: "3"
        },
        {
          id: "c2",
          name: "Sprite",
          price: "₹42",
          mrp: "₹45",
          quantity: "750 mL",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/sprite-soft-drink.jpeg?height=100&width=100",
          rating: 4.5,
          discount: "7% OFF",
          storeId: "3"
        },
        {
          id: "c3",
          name: "Minute Maid Orange",
          price: "₹38",
          mrp: "₹40",
          quantity: "1 L",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/minute-maid-pulpy-orange-juice.jpeg?height=100&width=100",
          rating: 4.3,
          discount: "5% OFF",
          storeId: "3"
        },
        {
          id: "c4",
          name: "Red Bull Energy Drink",
          price: "₹115",
          mrp: "₹125",
          quantity: "250 mL",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/red-bull-energy-drink.jpeg?height=100&width=100",
          rating: 4.4,
          discount: "8% OFF",
          storeId: "3"
        },
        {
          id: "c5",
          name: "Red Bull Energy Drink",
          price: "₹115",
          mrp: "₹125",
          quantity: "250 mL",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/red-bull-energy-drink.jpeg?height=100&width=100",
          rating: 4.4,
          discount: "8% OFF",
          storeId: "3"
        },
        {
          id: "c6",
          name: "Red Bull Energy Drink",
          price: "₹115",
          mrp: "₹125",
          quantity: "250 mL",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/red-bull-energy-drink.jpeg?height=100&width=100",
          rating: 4.4,
          discount: "8% OFF",
          storeId: "3"
        }
      ]
    }
  ]

  // Store-based product organization
  const storeProducts = [
    {
      id: "1",
      title: "Satish General Store",
      description: "10-15 min delivery • 0.5 km",
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
          storeId: "1",
          storeName: "Satish General Store",
          storeDistance: "0.5 km",
          deliveryTime: "10-15 min"
        },
        {
          id: "d1",
          name: "Amul Butter",
          price: "₹55",
          mrp: "₹60",
          quantity: "100 g",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/amul-butter.jpeg?height=100&width=100",
          rating: 4.7,
          discount: "8% OFF",
          storeId: "1",
          storeName: "Satish General Store",
          storeDistance: "0.5 km",
          deliveryTime: "10-15 min"
        },
        {
          id: "b1",
          name: "Coca-Cola",
          price: "₹40",
          mrp: "₹45",
          quantity: "750 ml",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/coca-cola.jpeg?height=100&width=100",
          rating: 4.4,
          discount: "11% OFF",
          storeId: "1",
          storeName: "Satish General Store",
          storeDistance: "0.5 km",
          deliveryTime: "10-15 min"
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
          storeId: "1",
          storeName: "Satish General Store",
          storeDistance: "0.5 km",
          deliveryTime: "10-15 min"
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
          storeId: "1",
          storeName: "Satish General Store",
          storeDistance: "0.5 km",
          deliveryTime: "10-15 min"
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
          storeId: "1",
          storeName: "Satish General Store",
          storeDistance: "0.5 km",
          deliveryTime: "10-15 min"
        }
      ]
    },
    {
      id: "2",
      title: "Pandit General Store",
      description: "15-20 min delivery • 3.1 km",
      products: [
        {
          id: "s3",
          name: "Kurkure Masala Munch",
          price: "₹20",
          mrp: "₹25",
          quantity: "90 g",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/kurkure-masala-munch.jpeg?height=100&width=100",
          rating: 4.2,
          discount: "20% OFF",
          storeId: "2",
          storeName: "Pandit General Store",
          storeDistance: "3.1 km",
          deliveryTime: "15-20 min"
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
          storeId: "2",
          storeName: "Pandit General Store",
          storeDistance: "3.1 km",
          deliveryTime: "15-20 min"
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
          storeId: "2",
          storeName: "Pandit General Store",
          storeDistance: "3.1 km",
          deliveryTime: "15-20 min"
        },
        {
          id: "g1",
          name: "Tata Sampann Toor Dal",
          price: "₹160",
          mrp: "₹189",
          quantity: "1 kg",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/tata-toor-dal.jpeg?height=100&width=100",
          rating: 4.6,
          discount: "15% OFF",
          storeId: "2",
          storeName: "Pandit General Store",
          storeDistance: "3.1 km",
          deliveryTime: "15-20 min"
        },
        {
          id: "g2",
          name: "Aashirvaad Atta",
          price: "₹345",
          mrp: "₹380",
          quantity: "5 kg",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/ashirwad-atta.jpeg?height=100&width=100",
          rating: 4.7,
          discount: "9% OFF",
          storeId: "2",
          storeName: "Pandit General Store",
          storeDistance: "3.1 km",
          deliveryTime: "15-20 min"
        },
        {
          id: "pc1",
          name: "Dove Soap",
          price: "₹89",
          mrp: "₹95",
          quantity: "100 g",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/dove-soap.jpeg?height=100&width=100",
          rating: 4.6,
          discount: "6% OFF",
          storeId: "2",
          storeName: "Pandit General Store",
          storeDistance: "3.1 km",
          deliveryTime: "15-20 min"
        }
      ]
    },
    {
      id: "3",
      title: "Anuj Kirana Store",
      description: "25-30 min delivery • 3.5 km",
      products: [
        {
          id: "s4",
          name: "Bingo Mad Angles",
          price: "₹30",
          mrp: "₹35",
          quantity: "130 g",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/bingo-mad-angles-achaari-masti.jpeg?height=100&width=100",
          rating: 4.0,
          discount: "14% OFF",
          storeId: "3",
          storeName: "Anuj Kirana Store",
          storeDistance: "3.5 km",
          deliveryTime: "25-30 min"
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
          storeId: "3",
          storeName: "Anuj Kirana Store",
          storeDistance: "3.5 km",
          deliveryTime: "25-30 min"
        },
        {
          id: "f1",
          name: "Fresh Oranges",
          price: "₹90",
          mrp: "₹110",
          quantity: "500 g",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/oranges.jpeg?height=100&width=100",
          rating: 4.4,
          discount: "18% OFF",
          storeId: "3",
          storeName: "Anuj Kirana Store",
          storeDistance: "3.5 km",
          deliveryTime: "25-30 min"
        },
        {
          id: "h1",
          name: "Surf Excel Liquid Detergent",
          price: "₹245",
          mrp: "₹290",
          quantity: "2 L",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/surf-excel.jpeg?height=100&width=100",
          rating: 4.7,
          discount: "16% OFF",
          storeId: "3",
          storeName: "Anuj Kirana Store",
          storeDistance: "3.5 km",
          deliveryTime: "25-30 min"
        },
        {
          id: "f2",
          name: "Fresh Apples",
          price: "₹140",
          mrp: "₹160",
          quantity: "4 pcs",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/apples.jpeg?height=100&width=100",
          rating: 4.5,
          discount: "12% OFF",
          storeId: "3",
          storeName: "Anuj Kirana Store",
          storeDistance: "3.5 km",
          deliveryTime: "25-30 min"
        },
        {
          id: "h2",
          name: "Harpic Toilet Cleaner",
          price: "₹170",
          mrp: "₹190",
          quantity: "1 L",
          image: "https://cdn.zeptonow.com/catalog/products/images/optimized-product-image/harpic.jpeg?height=100&width=100",
          rating: 4.6,
          discount: "11% OFF",
          storeId: "3",
          storeName: "Anuj Kirana Store",
          storeDistance: "3.5 km",
          deliveryTime: "25-30 min"
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

  // Update the handleStoreSelect function to provide a smoother scrolling experience
  const handleStoreSelect = (storeId: string | null) => {
    setSelectedStore(storeId);
    
    // Scroll to Today's Deals section with enhanced smooth behavior
    if (todaysDealsRef.current) {
      // Give time for filtered products to update
      setTimeout(() => {
        todaysDealsRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
        
        // Add a small offset to account for sticky header
        window.scrollBy({
          top: -80, // Adjust based on your header height
          behavior: 'smooth'
        });
      }, 200); // Slightly longer delay for better transition
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      {/* Location Popup */}
      {showLocationPopup && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
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
      <header className="sticky top-0 z-50 bg-gradient-to-r from-white to-pastel-orange/20 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`${isMobile ? 'hidden' : 'block'}`}>
                <Logo size="md"/>
              </div>
              
              <Link href="/location" className="flex items-center gap-1 text-gray-700 ml-4 hover:bg-pastel-orange/10 rounded-lg p-1.5 transition-colors">
                <MapPin size={16} className="text-pastel-orange" />
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500">DELIVERY TO</span>
                  <span className="text-sm font-medium truncate max-w-36 text-gray-700">
                    {location || "Select location"}
                  </span>
                </div>
              </Link>
            </div>

            {/* Search Bar */}
            <div className={`${isMobile ? 'hidden' : 'flex-grow max-w-md mx-4'}`}>
              <Link href="/search" className="relative w-full block">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-pastel-orange" />
                </div>
                <div className="w-full pl-10 pr-4 py-2 rounded-full bg-white text-gray-700 text-sm border border-gray-200 hover:border-pastel-orange/50 transition-colors shadow-sm">
                  Search for groceries, essentials...
                </div>
              </Link>
            </div>

            {/* Mobile Search Button */}
            {isMobile && (
              <Link href="/search" className="mr-2">
                <Button variant="ghost" size="icon" className="h-9 w-9 bg-pastel-orange/10 hover:bg-pastel-orange/20 text-pastel-orange">
                  <Search size={20} className="text-pastel-orange" />
                </Button>
              </Link>
            )}

            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <div className="relative">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 bg-pastel-orange/10 rounded-full p-1.5 hover:bg-pastel-orange/20 transition-colors"
                  >
                    <Avatar className="h-7 w-7 border-2 border-pastel-orange/30">
                      <AvatarFallback className="bg-pastel-orange/10 text-pastel-orange">
                        {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-700 hidden md:inline">
                      {user?.name?.split(' ')[0] || 'User'}
                    </span>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-lg z-40 py-1 border border-gray-100">
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
                  <Button className="bg-pastel-orange text-white flex items-center gap-1 hover:bg-pastel-orange/90">
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
        {/* <div className="bg-pastel-orange/5 overflow-x-auto scrollbar-hide border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex space-x-6 py-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`whitespace-nowrap px-2 py-1.5 text-sm font-medium ${
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
        </div> */}
      </header>

      {/* Main content with added top padding to prevent overlapping */}
      <div className="container mx-auto px-4 py-4 mt-2">
        {/* Categories Grid */}
        <div className="mb-6 bg-white rounded-xl shadow-sm p-5 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-60 h-60 opacity-5">
            <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="100" fill="#FDA47E"/>
              <circle cx="100" cy="100" r="80" fill="#FDA47E"/>
              <circle cx="100" cy="100" r="60" fill="#FDA47E"/>
            </svg>
          </div>
          
          <div className="flex items-center gap-2 mb-4 relative z-10">
            <div className="p-2 rounded-full bg-pastel-orange/10">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3H3V10H10V3Z" stroke="#FDA47E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 3H14V10H21V3Z" stroke="#FDA47E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 14H14V21H21V14Z" stroke="#FDA47E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 14H3V21H10V14Z" stroke="#FDA47E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="font-bold text-xl text-gray-800">Shop by Category</h2>
          </div>
          
          <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-10 gap-3">
            {categories.slice(1).map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <Link 
                  href={`/category/${category.id}`}
                  className="bg-white rounded-lg p-3 text-center flex flex-col items-center h-full border border-gray-100 hover:border-pastel-orange hover:shadow-md transition-all"
                >
                  <div className="text-3xl mb-2 bg-pastel-orange/10 w-12 h-12 rounded-full flex items-center justify-center text-pastel-orange">{category.icon}</div>
                  <p className="text-xs font-medium truncate w-full text-gray-700">{category.name}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Modified Shop by Store section */}
        <div className="mb-6 bg-white rounded-xl shadow-sm p-5 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-pastel-orange/10">
                  <Store className="h-5 w-5 text-pastel-orange" />
                </div>
                <h2 className="font-bold text-xl text-gray-800">Shop by Store</h2>
              </div>
              <Link href="/store" className="text-sm text-pastel-orange font-medium flex items-center px-3 py-1 bg-pastel-orange/10 rounded-full hover:bg-pastel-orange/20 transition-colors">
                View All <ChevronRight size={14} className="ml-1" />
              </Link>
            </div>
            
            <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar">
              <motion.button 
                className={`flex-shrink-0 px-3 py-1 rounded-full text-xs ${
                  selectedStore === null 
                    ? 'bg-pastel-orange text-white' 
                    : 'bg-pastel-orange/10 text-gray-700 hover:bg-pastel-orange/20'
                }`}
                onClick={() => handleStoreSelect(null)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                All Stores
              </motion.button>
              
              {stores.map(store => (
                <motion.button 
                  key={store.id}
                  className={`flex items-center gap-1.5 flex-shrink-0 px-3 py-1 rounded-full text-xs ${
                    selectedStore === store.id 
                      ? 'bg-pastel-orange text-white' 
                      : 'bg-pastel-orange/10 text-gray-700 hover:bg-pastel-orange/20'
                  }`}
                  onClick={() => handleStoreSelect(store.id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Store size={12} />
                  <span>{store.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Banner Slider */}
        <div className="relative rounded-xl overflow-hidden mb-6 h-48 md:h-64 shadow-lg">
          {banners.map((banner, index) => (
            <motion.div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ 
                opacity: index === currentSlide ? 1 : 0, 
                scale: index === currentSlide ? 1 : 1.05 
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-full h-full">
                <Image 
                  src={banner} 
                  alt={`Promotional banner ${index + 1}`} 
                  fill 
                  className="object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
              </div>
            </motion.div>
          ))}
          
          <motion.button 
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md z-[5]"
            onClick={prevSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={20} className="text-pastel-orange" />
          </motion.button>
          
          <motion.button 
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md z-[5]"
            onClick={nextSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={20} className="text-pastel-orange" />
          </motion.button>
          
          {/* Dots indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2 z-[5]">
            {banners.map((_, index) => (
              <motion.button
                key={index}
                className={`w-2.5 h-2.5 rounded-full ${
                  index === currentSlide ? 'bg-pastel-orange' : 'bg-white/70'
                }`}
                onClick={() => setCurrentSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={{ scale: index === currentSlide ? 1.2 : 1 }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        </div>
        
        {/* Delivery Promise */}
        <div className="bg-white rounded-xl p-5 mb-6 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative w-14 h-14">
                <Image 
                  src="/15-mins.png" 
                  alt="15 minute delivery" 
                  fill 
                  className="object-contain drop-shadow-md"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Express Delivery</h3>
                <p className="text-sm text-gray-500">Get your order in minutes</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-green-100 p-3 rounded-full">
                <Smile size={24} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">100% Satisfaction</h3>
                <p className="text-sm text-gray-500">Easy returns & refunds</p>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-blue-100 p-3 rounded-full">
                <Store size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Multiple Stores</h3>
                <p className="text-sm text-gray-500">Compare prices across stores</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Special Category Offers */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-full bg-pink-100">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 10L12 15L17 10" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 15V3" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="font-bold text-xl text-gray-800">Special Offers</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {categoryOffers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="shadow-sm"
              >
                <Link 
                  href={`/category/${offer.id}`} 
                  className="relative rounded-xl overflow-hidden aspect-[2/1] group block"
                >
                  <Image 
                    src={offer.image} 
                    alt={offer.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center p-5">
                    <h3 className="text-white font-bold text-xl mb-1">{offer.title}</h3>
                    <p className="text-white text-sm mb-3">{offer.discount}</p>
                    <span className="text-white text-xs inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm py-1 px-3 rounded-full w-fit group-hover:bg-white group-hover:text-pastel-orange transition-colors">
                      Shop now <ExternalLink size={12} className="ml-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Featured Products - Today's Deals */}
        <div ref={todaysDealsRef} className="bg-white rounded-xl p-5 mb-6 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-40 h-40 opacity-5">
            <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M197.269 135.002C217.403 93.0863 189.493 50.2053 156.788 32.678C127.127 16.8582 94.9708 17.0498 68.8505 42.2764C50.4506 60.0156 40.1301 81.5863 21.7302 99.3255C-2.55982 123.043 -7.54847 161.161 20.7385 182.708C48.1512 203.52 80.5359 189.045 115.295 182.934C152.146 176.505 177.136 176.918 197.269 135.002Z" fill="#FDA47E"/>
            </svg>
          </div>
          
          <div className="flex justify-between items-center mb-5 relative z-10">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-pastel-orange/10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.59 13.41L13.42 20.58C13.2343 20.766 13.0137 20.9135 12.7709 21.0141C12.5281 21.1148 12.2678 21.1666 12.005 21.1666C11.7422 21.1666 11.4819 21.1148 11.2391 21.0141C10.9963 20.9135 10.7757 20.766 10.59 20.58L2 12V2H12L20.59 10.59C20.9625 10.9647 21.1716 11.4716 21.1716 12C21.1716 12.5284 20.9625 13.0353 20.59 13.41Z" stroke="#FDA47E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 7H7.01" stroke="#FDA47E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="font-bold text-xl text-gray-800">Today's Deals</h2>
            </div>
            <Link href="/category/deals" className="text-sm text-pastel-orange font-medium flex items-center px-3 py-1 bg-pastel-orange/10 rounded-full hover:bg-pastel-orange/20 transition-colors">
              View All <ChevronRight size={14} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredProducts.map((product, index) => {
              // Find the store for this product
              const productStore = stores.find(store => store.id === product.storeId);
              
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    mrp={product.mrp}
                    quantity={product.quantity}
                    image={product.image}
                    rating={product.rating}
                    discount={product.discount}
                    storeId={product.storeId}
                    storeName={productStore?.name}
                    storeDistance={productStore?.distance}
                    deliveryTime={productStore?.deliveryTime}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Store Products Sections */}
        {storeProducts.map((store, index) => (
          <motion.div 
            key={store.id} 
            className="mb-6 bg-white rounded-xl p-5 shadow-sm border border-gray-100 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="absolute right-0 top-0 w-40 h-40 opacity-5">
              <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none">
                <path d="M156.409 12.3734C197.581 34.6181 224.719 76.9494 203.862 118.794C183.005 160.639 114.153 202 56.6815 183.929C-0.790478 165.858 -10.775 88.3526 10.0823 46.5076C30.9396 4.66259 115.237 -9.86116 156.409 12.3734Z" fill="#FDA47E"/>
              </svg>
            </div>
            
            <div className="flex items-center justify-between mb-5 relative z-10">
              <div>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-pastel-orange/10">
                    <Store className="h-5 w-5 text-pastel-orange" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">{store.title}</h2>
                </div>
                <p className="text-sm text-gray-500 mt-1">{store.description}</p>
              </div>
              <Link href={`/store/${store.id}`} className="text-pastel-orange text-sm font-medium flex items-center px-3 py-1 bg-pastel-orange/10 rounded-full hover:bg-pastel-orange/20 transition-colors">
                View Store <ChevronRight size={14} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {store.products.map((product, productIndex) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: productIndex * 0.05 }}
                  whileHover={{ y: -5 }}
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    mrp={product.mrp}
                    image={product.image}
                    quantity={product.quantity}
                    rating={product.rating}
                    discount={product.discount}
                    storeId={product.storeId}
                    storeName={product.storeName}
                    storeDistance={product.storeDistance}
                    deliveryTime={product.deliveryTime}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Nearby Stores */}
        <div className="bg-gradient-to-r from-pastel-orange/5 to-orange-100 rounded-xl p-5 mb-6 shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 opacity-10">
            <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="100" fill="#FDA47E"/>
              <circle cx="100" cy="100" r="80" fill="#FDA47E"/>
              <circle cx="100" cy="100" r="60" fill="#FDA47E"/>
            </svg>
          </div>
          
          <div className="flex justify-between items-center mb-5 relative z-10">
            <div className="flex items-center gap-2">
              <div className="bg-pastel-orange/20 p-2 rounded-full">
                <Store className="h-5 w-5 text-pastel-orange" />
              </div>
              <h2 className="font-bold text-xl text-gray-800">Nearby Stores</h2>
            </div>
            <Link href="/store" className="text-sm text-pastel-orange font-medium flex items-center px-3 py-1 bg-pastel-orange/20 rounded-full hover:bg-pastel-orange/30 transition-colors">
              View All <ChevronRight size={14} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stores.map((store, index) => (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <StoreCard
                  id={store.id}
                  name={store.name}
                  location={store.location}
                  image={store.image}
                  timing={store.timing}
                  rating={store.rating}
                  distance={store.distance}
                  tags={store.tags}
                  size="default"
                />
              </motion.div>
            ))}
          </div>
          
          <div className="mt-5 flex justify-center relative z-10">
            <Link href="/store">
              <Button className="bg-white border border-pastel-orange text-pastel-orange hover:bg-pastel-orange hover:text-white transition-colors">
                Explore all stores in your area
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Back to top button */}
      {showTopButton && (
        <button 
          className="fixed bottom-6 right-6 bg-pastel-orange text-white p-3 rounded-full shadow-lg z-30"
          onClick={scrollToTop}
        >
          <ChevronLeft size={20} className="rotate-90" />
        </button>
      )}

      {/* Mobile app prompt for mobile devices */}
      {isMobile && <MobileAppPrompt />}

      <Footer />
    </main>
  )
}

