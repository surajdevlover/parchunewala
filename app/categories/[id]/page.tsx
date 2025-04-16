"use client"

import { useState, useEffect, FormEvent } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { SharedHeader } from "@/components/shared-header"
import Footer from "@/app/footer/footer"
import { Button } from "@/components/ui/button"
import { 
  Filter, Tag, SlidersHorizontal, Search, 
  ChevronDown, Heart, Star, ShoppingBag, 
  TrendingUp, Clock, PlusCircle, MinusCircle, Plus
} from "lucide-react"
import { cn } from "@/lib/utils"

// Define interfaces
interface Category {
  id: string;
  name: string;
  image: string;
  bannerImage: string;
  description: string;
  itemsCount: number;
  featuredBrands: Brand[];
  subcategories: Subcategory[];
}

interface Brand {
  id: string;
  name: string;
  logo: string;
}

interface Subcategory {
  id: string;
  name: string;
  itemsCount: number;
}

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  description: string;
  weight: string;
  rating: number;
  ratingCount: number;
  isNew?: boolean;
  isTrending?: boolean;
  discount?: number;
  estimatedDelivery: string;
}

// Categories data - in a real app this would come from an API
const categoriesData: Record<string, Category> = {
  "groceries": {
    id: "groceries",
    name: "Groceries",
    image: "/images/categories/groceries.jpg",
    bannerImage: "/images/banners/groceries-banner.jpg",
    description: "Essential grocery items for your daily needs.",
    itemsCount: 156,
    featuredBrands: [
      { id: "b1", name: "Fresh Farms", logo: "/images/brands/fresh-farms.png" },
      { id: "b2", name: "Nature's Best", logo: "/images/brands/natures-best.png" },
      { id: "b3", name: "Daily Essentials", logo: "/images/brands/daily-essentials.png" },
      { id: "b4", name: "Organic Valley", logo: "/images/brands/organic-valley.png" }
    ],
    subcategories: [
      { id: "sc1", name: "Rice & Grains", itemsCount: 34 },
      { id: "sc2", name: "Flour & Baking", itemsCount: 21 },
      { id: "sc3", name: "Pulses & Legumes", itemsCount: 29 },
      { id: "sc4", name: "Spices & Seasonings", itemsCount: 42 },
      { id: "sc5", name: "Cooking Oils", itemsCount: 18 }
    ]
  },
  "fruits-vegetables": {
    id: "fruits-vegetables",
    name: "Fruits & Vegetables",
    image: "/images/categories/fruits-vegetables.jpg",
    bannerImage: "/images/banners/fruits-vegetables-banner.jpg",
    description: "Fresh fruits and vegetables delivered daily to your doorstep.",
    itemsCount: 143,
    featuredBrands: [
      { id: "b5", name: "Farm Fresh", logo: "/images/brands/farm-fresh.png" },
      { id: "b6", name: "Organic Harvest", logo: "/images/brands/organic-harvest.png" },
      { id: "b7", name: "Nature's Basket", logo: "/images/brands/natures-basket.png" },
      { id: "b8", name: "Fresh Express", logo: "/images/brands/fresh-express.png" }
    ],
    subcategories: [
      { id: "sc6", name: "Fresh Fruits", itemsCount: 38 },
      { id: "sc7", name: "Fresh Vegetables", itemsCount: 45 },
      { id: "sc8", name: "Exotic Fruits", itemsCount: 22 },
      { id: "sc9", name: "Organic Produce", itemsCount: 18 },
      { id: "sc10", name: "Herbs & Seasonings", itemsCount: 20 }
    ]
  },
  "dairy-breakfast": {
    id: "dairy-breakfast",
    name: "Dairy & Breakfast",
    image: "/images/categories/dairy-breakfast.jpg",
    bannerImage: "/images/banners/dairy-breakfast-banner.jpg",
    description: "Fresh dairy products and breakfast essentials to start your day right.",
    itemsCount: 87,
    featuredBrands: [
      { id: "b9", name: "Amul", logo: "/images/brands/amul.png" },
      { id: "b10", name: "Nestle", logo: "/images/brands/nestle.png" },
      { id: "b11", name: "Kellogg's", logo: "/images/brands/kelloggs.png" },
      { id: "b12", name: "Mother Dairy", logo: "/images/brands/mother-dairy.png" }
    ],
    subcategories: [
      { id: "sc11", name: "Milk & Cream", itemsCount: 12 },
      { id: "sc12", name: "Butter & Cheese", itemsCount: 18 },
      { id: "sc13", name: "Curd & Yogurt", itemsCount: 15 },
      { id: "sc14", name: "Bread & Buns", itemsCount: 22 },
      { id: "sc15", name: "Breakfast Cereals", itemsCount: 20 }
    ]
  },
  "snacks": {
    id: "snacks",
    name: "Snacks",
    image: "/images/categories/snacks.jpg",
    bannerImage: "/images/banners/snacks-banner.jpg",
    description: "Delicious snacks for anytime cravings.",
    itemsCount: 112,
    featuredBrands: [
      { id: "b13", name: "Lay's", logo: "/images/brands/lays.png" },
      { id: "b14", name: "Britannia", logo: "/images/brands/britannia.png" },
      { id: "b15", name: "Haldiram's", logo: "/images/brands/haldirams.png" },
      { id: "b16", name: "Parle", logo: "/images/brands/parle.png" }
    ],
    subcategories: [
      { id: "sc16", name: "Chips & Crisps", itemsCount: 25 },
      { id: "sc17", name: "Biscuits & Cookies", itemsCount: 30 },
      { id: "sc18", name: "Namkeen & Savories", itemsCount: 22 },
      { id: "sc19", name: "Chocolates & Candies", itemsCount: 18 },
      { id: "sc20", name: "Nuts & Dry Fruits", itemsCount: 17 }
    ]
  },
  "beverages": {
    id: "beverages",
    name: "Beverages",
    image: "/images/categories/beverages.jpg",
    bannerImage: "/images/banners/beverages-banner.jpg",
    description: "Refreshing drinks and beverages for every occasion.",
    itemsCount: 98,
    featuredBrands: [
      { id: "b17", name: "Coca-Cola", logo: "/images/brands/coca-cola.png" },
      { id: "b18", name: "Pepsi", logo: "/images/brands/pepsi.png" },
      { id: "b19", name: "Tata Tea", logo: "/images/brands/tata-tea.png" },
      { id: "b20", name: "Real", logo: "/images/brands/real.png" }
    ],
    subcategories: [
      { id: "sc21", name: "Soft Drinks", itemsCount: 20 },
      { id: "sc22", name: "Juices", itemsCount: 18 },
      { id: "sc23", name: "Tea & Coffee", itemsCount: 25 },
      { id: "sc24", name: "Health Drinks", itemsCount: 15 },
      { id: "sc25", name: "Water & Soda", itemsCount: 10 }
    ]
  },
  "personal-care": {
    id: "personal-care",
    name: "Personal Care",
    image: "/images/categories/personal-care.jpg",
    bannerImage: "/images/banners/personal-care-banner.jpg",
    description: "Personal care and hygiene products for your daily needs.",
    itemsCount: 76,
    featuredBrands: [
      { id: "b21", name: "Dove", logo: "/images/brands/dove.png" },
      { id: "b22", name: "Nivea", logo: "/images/brands/nivea.png" },
      { id: "b23", name: "Himalaya", logo: "/images/brands/himalaya.png" },
      { id: "b24", name: "Colgate", logo: "/images/brands/colgate.png" }
    ],
    subcategories: [
      { id: "sc26", name: "Bath & Body", itemsCount: 18 },
      { id: "sc27", name: "Hair Care", itemsCount: 15 },
      { id: "sc28", name: "Skin Care", itemsCount: 22 },
      { id: "sc29", name: "Oral Care", itemsCount: 10 },
      { id: "sc30", name: "Makeup & Cosmetics", itemsCount: 11 }
    ]
  },
  "household": {
    id: "household",
    name: "Household",
    image: "/images/categories/household.jpg",
    bannerImage: "/images/banners/household-banner.jpg",
    description: "Everything you need to keep your home clean and organized.",
    itemsCount: 65,
    featuredBrands: [
      { id: "b25", name: "Surf Excel", logo: "/images/brands/surf-excel.png" },
      { id: "b26", name: "Harpic", logo: "/images/brands/harpic.png" },
      { id: "b27", name: "Vim", logo: "/images/brands/vim.png" },
      { id: "b28", name: "Lizol", logo: "/images/brands/lizol.png" }
    ],
    subcategories: [
      { id: "sc31", name: "Detergents & Laundry", itemsCount: 15 },
      { id: "sc32", name: "Cleaning Supplies", itemsCount: 20 },
      { id: "sc33", name: "Kitchen Essentials", itemsCount: 12 },
      { id: "sc34", name: "Home Utilities", itemsCount: 10 },
      { id: "sc35", name: "Paper & Disposables", itemsCount: 8 }
    ]
  },
  "baby-care": {
    id: "baby-care",
    name: "Baby Care",
    image: "/images/categories/baby-care.jpg",
    bannerImage: "/images/banners/baby-care-banner.jpg",
    description: "Essential products for your little ones.",
    itemsCount: 52,
    featuredBrands: [
      { id: "b29", name: "Pampers", logo: "/images/brands/pampers.png" },
      { id: "b30", name: "Johnson's", logo: "/images/brands/johnsons.png" },
      { id: "b31", name: "Huggies", logo: "/images/brands/huggies.png" },
      { id: "b32", name: "Cerelac", logo: "/images/brands/cerelac.png" }
    ],
    subcategories: [
      { id: "sc36", name: "Diapers & Wipes", itemsCount: 15 },
      { id: "sc37", name: "Baby Food", itemsCount: 12 },
      { id: "sc38", name: "Bath & Skin Care", itemsCount: 10 },
      { id: "sc39", name: "Baby Accessories", itemsCount: 8 },
      { id: "sc40", name: "Feeding & Nursing", itemsCount: 7 }
    ]
  },
  "electronics": {
    id: "electronics",
    name: "Electronics",
    image: "/images/categories/electronics.jpg",
    bannerImage: "/images/banners/electronics-banner.jpg",
    description: "Latest gadgets and electronic items at competitive prices.",
    itemsCount: 84,
    featuredBrands: [
      { id: "b33", name: "Samsung", logo: "/images/brands/samsung.png" },
      { id: "b34", name: "Apple", logo: "/images/brands/apple.png" },
      { id: "b35", name: "Mi", logo: "/images/brands/mi.png" },
      { id: "b36", name: "JBL", logo: "/images/brands/jbl.png" }
    ],
    subcategories: [
      { id: "sc41", name: "Mobile Phones", itemsCount: 20 },
      { id: "sc42", name: "Mobile Accessories", itemsCount: 25 },
      { id: "sc43", name: "Audio & Headphones", itemsCount: 15 },
      { id: "sc44", name: "Small Appliances", itemsCount: 12 },
      { id: "sc45", name: "Computer Accessories", itemsCount: 12 }
    ]
  }
};

// Sample products data
const products: Record<string, Product[]> = {
  "groceries": [
    {
      id: "p1",
      name: "Basmati Rice Premium",
      image: "/images/products/basmati-rice.jpg",
      price: 149,
      originalPrice: 199,
      description: "Premium quality basmati rice for everyday cooking.",
      weight: "1 kg",
      rating: 4.7,
      ratingCount: 256,
      discount: 25,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p2",
      name: "Whole Wheat Flour",
      image: "/images/products/wheat-flour.jpg",
      price: 60,
      description: "100% whole wheat flour, perfect for chapatis and bread.",
      weight: "1 kg",
      rating: 4.5,
      ratingCount: 189,
      isNew: true,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p3",
      name: "Toor Dal",
      image: "/images/products/toor-dal.jpg",
      price: 120,
      originalPrice: 150,
      description: "High-quality toor dal for nutritious meals.",
      weight: "500 g",
      rating: 4.6,
      ratingCount: 312,
      discount: 20,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p4",
      name: "Turmeric Powder",
      image: "/images/products/turmeric.jpg",
      price: 55,
      description: "Pure and fresh turmeric powder for flavorful cooking.",
      weight: "100 g",
      rating: 4.4,
      ratingCount: 156,
      isTrending: true,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p5",
      name: "Sunflower Oil",
      image: "/images/products/sunflower-oil.jpg",
      price: 140,
      originalPrice: 160,
      description: "Refined sunflower oil for healthy cooking.",
      weight: "1 L",
      rating: 4.3,
      ratingCount: 87,
      discount: 12,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p6",
      name: "Masala Blend",
      image: "/images/products/masala-blend.jpg",
      price: 80,
      description: "Special blend of spices for perfect curries.",
      weight: "100 g",
      rating: 4.8,
      ratingCount: 203,
      isNew: true,
      estimatedDelivery: "10-15 min"
    }
  ],
  "fruits-vegetables": [
    {
      id: "p7",
      name: "Fresh Organic Apples",
      image: "/images/products/apples.jpg",
      price: 149,
      originalPrice: 199,
      description: "Sweet and juicy organic apples freshly harvested from local farms.",
      weight: "1 kg",
      rating: 4.7,
      ratingCount: 256,
      discount: 25,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p8",
      name: "Red Onions",
      image: "/images/products/onions.jpg",
      price: 40,
      description: "Fresh and firm red onions.",
      weight: "1 kg",
      rating: 4.3,
      ratingCount: 120,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p9",
      name: "Fresh Tomatoes",
      image: "/images/products/tomatoes.jpg",
      price: 30,
      originalPrice: 40,
      description: "Ripe, juicy tomatoes perfect for curries and salads.",
      weight: "500 g",
      rating: 4.5,
      ratingCount: 178,
      discount: 25,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p10",
      name: "Organic Bananas",
      image: "/images/products/bananas.jpg",
      price: 60,
      description: "Naturally ripened organic bananas.",
      weight: "6 pcs",
      rating: 4.6,
      ratingCount: 189,
      isNew: true,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p11",
      name: "Mixed Vegetables",
      image: "/images/products/mixed-vegetables.jpg",
      price: 99,
      originalPrice: 120,
      description: "Assorted fresh vegetables - carrots, beans, peas, and corn.",
      weight: "500 g",
      rating: 4.3,
      ratingCount: 87,
      discount: 17,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p12",
      name: "Avocado",
      image: "/images/products/avocado.jpg",
      price: 120,
      description: "Premium imported avocados, rich and creamy.",
      weight: "2 pcs",
      rating: 4.7,
      ratingCount: 95,
      isTrending: true,
      estimatedDelivery: "10-15 min"
    }
  ],
  "dairy-breakfast": [
    {
      id: "p13",
      name: "Organic Milk",
      image: "/images/products/milk.jpg",
      price: 60,
      originalPrice: 70,
      description: "Fresh organic cow milk, pasteurized and vitamin-enriched.",
      weight: "500 ml",
      rating: 4.6,
      ratingCount: 312,
      discount: 14,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p14",
      name: "Farm Fresh Eggs",
      image: "/images/products/eggs.jpg",
      price: 90,
      description: "Free-range eggs from organically fed chickens.",
      weight: "12 pcs",
      rating: 4.5,
      ratingCount: 189,
      isNew: true,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p15",
      name: "Cheddar Cheese Block",
      image: "/images/products/cheese.jpg",
      price: 150,
      originalPrice: 180,
      description: "Premium cheddar cheese, perfect for sandwiches and cooking.",
      weight: "200 g",
      rating: 4.7,
      ratingCount: 142,
      discount: 16,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p16",
      name: "Whole Wheat Bread",
      image: "/images/products/bread.jpg",
      price: 45,
      description: "Freshly baked whole wheat bread with no preservatives.",
      weight: "400 g",
      rating: 4.4,
      ratingCount: 156,
      isTrending: true,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p17",
      name: "Honey Greek Yogurt",
      image: "/images/products/yogurt.jpg",
      price: 85,
      originalPrice: 100,
      description: "Creamy Greek yogurt blended with pure honey.",
      weight: "400 g",
      rating: 4.8,
      ratingCount: 203,
      discount: 15,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p18",
      name: "Breakfast Muesli",
      image: "/images/products/muesli.jpg",
      price: 280,
      description: "Crunchy muesli with dried fruits and nuts.",
      weight: "750 g",
      rating: 4.5,
      ratingCount: 128,
      isNew: true,
      estimatedDelivery: "10-15 min"
    }
  ],
  "snacks": [
    {
      id: "p19",
      name: "Classic Potato Chips",
      image: "/images/products/chips.jpg",
      price: 30,
      originalPrice: 40,
      description: "Crispy and crunchy salted potato chips.",
      weight: "150 g",
      rating: 4.5,
      ratingCount: 320,
      discount: 25,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p20",
      name: "Chocolate Cookies",
      image: "/images/products/cookies.jpg",
      price: 45,
      description: "Delicious cookies with chocolate chips.",
      weight: "200 g",
      rating: 4.7,
      ratingCount: 247,
      isTrending: true,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p21",
      name: "Mixed Namkeen",
      image: "/images/products/namkeen.jpg",
      price: 60,
      originalPrice: 75,
      description: "Spicy and crunchy traditional Indian snack mix.",
      weight: "200 g",
      rating: 4.6,
      ratingCount: 186,
      discount: 20,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p22",
      name: "Cashew Nuts",
      image: "/images/products/cashews.jpg",
      price: 280,
      description: "Premium quality roasted and salted cashew nuts.",
      weight: "250 g",
      rating: 4.8,
      ratingCount: 142,
      isNew: true,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p23",
      name: "Dark Chocolate Bar",
      image: "/images/products/chocolate.jpg",
      price: 120,
      originalPrice: 150,
      description: "Rich dark chocolate with 70% cocoa.",
      weight: "100 g",
      rating: 4.9,
      ratingCount: 215,
      discount: 20,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p24",
      name: "Granola Bars",
      image: "/images/products/granola-bars.jpg",
      price: 160,
      description: "Healthy granola bars with oats and honey.",
      weight: "6 pcs",
      rating: 4.4,
      ratingCount: 157,
      isTrending: true,
      estimatedDelivery: "10-15 min"
    }
  ],
  "beverages": [
    {
      id: "p25",
      name: "Freshly Ground Coffee",
      image: "/images/products/coffee.jpg",
      price: 349,
      originalPrice: 399,
      description: "Premium dark roast coffee beans, freshly ground.",
      weight: "250 g",
      rating: 4.8,
      ratingCount: 203,
      discount: 12,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p26",
      name: "Green Tea",
      image: "/images/products/green-tea.jpg",
      price: 180,
      description: "Pure green tea leaves, rich in antioxidants.",
      weight: "100 g",
      rating: 4.7,
      ratingCount: 167,
      isNew: true,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p27",
      name: "Orange Juice",
      image: "/images/products/orange-juice.jpg",
      price: 110,
      originalPrice: 130,
      description: "100% natural orange juice, no added sugar.",
      weight: "1 L",
      rating: 4.5,
      ratingCount: 142,
      discount: 15,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p28",
      name: "Cola Drink",
      image: "/images/products/cola.jpg",
      price: 40,
      description: "Classic cola drink, perfect with ice.",
      weight: "750 ml",
      rating: 4.4,
      ratingCount: 284,
      isTrending: true,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p29",
      name: "Mineral Water",
      image: "/images/products/water.jpg",
      price: 20,
      originalPrice: 25,
      description: "Pure mineral water sourced from mountains.",
      weight: "1 L",
      rating: 4.3,
      ratingCount: 95,
      discount: 20,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p30",
      name: "Energy Drink",
      image: "/images/products/energy-drink.jpg",
      price: 85,
      description: "Energy drink with vitamins and caffeine.",
      weight: "250 ml",
      rating: 4.2,
      ratingCount: 123,
      isNew: true,
      estimatedDelivery: "10-15 min"
    }
  ],
  "personal-care": [
    {
      id: "p31",
      name: "Shower Gel",
      image: "/images/products/shower-gel.jpg",
      price: 180,
      originalPrice: 210,
      description: "Refreshing shower gel with essential oils.",
      weight: "500 ml",
      rating: 4.6,
      ratingCount: 187,
      discount: 14,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p32",
      name: "Shampoo",
      image: "/images/products/shampoo.jpg",
      price: 240,
      description: "Nourishing shampoo for smooth and silky hair.",
      weight: "400 ml",
      rating: 4.7,
      ratingCount: 234,
      isNew: true,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p33",
      name: "Face Wash",
      image: "/images/products/face-wash.jpg",
      price: 140,
      originalPrice: 175,
      description: "Gentle face wash for all skin types.",
      weight: "150 ml",
      rating: 4.5,
      ratingCount: 156,
      discount: 20,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p34",
      name: "Toothpaste",
      image: "/images/products/toothpaste.jpg",
      price: 90,
      description: "Fluoride toothpaste for complete protection.",
      weight: "150 g",
      rating: 4.4,
      ratingCount: 198,
      isTrending: true,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p35",
      name: "Hand Cream",
      image: "/images/products/hand-cream.jpg",
      price: 160,
      originalPrice: 190,
      description: "Moisturizing hand cream with shea butter.",
      weight: "75 ml",
      rating: 4.8,
      ratingCount: 143,
      discount: 15,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p36",
      name: "Lip Balm",
      image: "/images/products/lip-balm.jpg",
      price: 60,
      description: "Hydrating lip balm with SPF protection.",
      weight: "5 g",
      rating: 4.3,
      ratingCount: 112,
      isNew: true,
      estimatedDelivery: "10-15 min"
    }
  ],
  "household": [
    {
      id: "p37",
      name: "Laundry Detergent",
      image: "/images/products/detergent.jpg",
      price: 240,
      originalPrice: 299,
      description: "Powerful stain-removing laundry detergent.",
      weight: "1 kg",
      rating: 4.7,
      ratingCount: 287,
      discount: 20,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p38",
      name: "All-Purpose Cleaner",
      image: "/images/products/cleaner.jpg",
      price: 120,
      description: "Effective cleaner for all surfaces.",
      weight: "500 ml",
      rating: 4.5,
      ratingCount: 169,
      isNew: true,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p39",
      name: "Toilet Cleaner",
      image: "/images/products/toilet-cleaner.jpg",
      price: 85,
      originalPrice: 110,
      description: "Powerful toilet cleaner with germ protection.",
      weight: "750 ml",
      rating: 4.6,
      ratingCount: 213,
      discount: 22,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p40",
      name: "Kitchen Towels",
      image: "/images/products/kitchen-towels.jpg",
      price: 60,
      description: "Absorbent kitchen towels for everyday use.",
      weight: "2 rolls",
      rating: 4.3,
      ratingCount: 156,
      isTrending: true,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p41",
      name: "Dishwashing Liquid",
      image: "/images/products/dish-liquid.jpg",
      price: 110,
      originalPrice: 130,
      description: "Effective dishwashing liquid with lemon extract.",
      weight: "500 ml",
      rating: 4.4,
      ratingCount: 178,
      discount: 15,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p42",
      name: "Air Freshener",
      image: "/images/products/air-freshener.jpg",
      price: 150,
      description: "Long-lasting air freshener with floral scent.",
      weight: "300 ml",
      rating: 4.2,
      ratingCount: 134,
      isNew: true,
      estimatedDelivery: "10-15 min"
    }
  ],
  "baby-care": [
    {
      id: "p43",
      name: "Diapers Pack",
      image: "/images/products/diapers.jpg",
      price: 499,
      originalPrice: 599,
      description: "Ultra-absorbent baby diapers, soft on skin.",
      weight: "40 pcs",
      rating: 4.8,
      ratingCount: 324,
      discount: 16,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p44",
      name: "Baby Wipes",
      image: "/images/products/baby-wipes.jpg",
      price: 140,
      description: "Gentle baby wipes for sensitive skin.",
      weight: "80 pcs",
      rating: 4.7,
      ratingCount: 267,
      isNew: true,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p45",
      name: "Baby Shampoo",
      image: "/images/products/baby-shampoo.jpg",
      price: 160,
      originalPrice: 195,
      description: "Tear-free baby shampoo with natural ingredients.",
      weight: "200 ml",
      rating: 4.9,
      ratingCount: 189,
      discount: 18,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p46",
      name: "Baby Lotion",
      image: "/images/products/baby-lotion.jpg",
      price: 180,
      description: "Gentle moisturizing lotion for baby's skin.",
      weight: "250 ml",
      rating: 4.6,
      ratingCount: 213,
      isTrending: true,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p47",
      name: "Baby Food Cereal",
      image: "/images/products/baby-cereal.jpg",
      price: 240,
      originalPrice: 270,
      description: "Nutritious rice cereal for babies, fortified with vitamins.",
      weight: "300 g",
      rating: 4.5,
      ratingCount: 156,
      discount: 11,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p48",
      name: "Baby Feeding Bottle",
      image: "/images/products/feeding-bottle.jpg",
      price: 220,
      description: "BPA-free feeding bottle with anti-colic system.",
      weight: "1 pc",
      rating: 4.7,
      ratingCount: 178,
      isNew: true,
      estimatedDelivery: "10-15 min"
    }
  ],
  "electronics": [
    {
      id: "p49",
      name: "Wireless Earbuds",
      image: "/images/products/earbuds.jpg",
      price: 1499,
      originalPrice: 1999,
      description: "High-quality wireless earbuds with noise cancellation.",
      weight: "1 pc",
      rating: 4.6,
      ratingCount: 356,
      discount: 25,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p50",
      name: "Power Bank",
      image: "/images/products/power-bank.jpg",
      price: 899,
      description: "10000mAh power bank with fast charging.",
      weight: "1 pc",
      rating: 4.5,
      ratingCount: 278,
      isNew: true,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p51",
      name: "Phone Charger",
      image: "/images/products/phone-charger.jpg",
      price: 299,
      originalPrice: 399,
      description: "Fast charging USB-C phone charger with cable.",
      weight: "1 pc",
      rating: 4.4,
      ratingCount: 189,
      discount: 25,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p52",
      name: "Bluetooth Speaker",
      image: "/images/products/bluetooth-speaker.jpg",
      price: 1299,
      description: "Portable Bluetooth speaker with 12-hour battery life.",
      weight: "1 pc",
      rating: 4.7,
      ratingCount: 245,
      isTrending: true,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p53",
      name: "Phone Case",
      image: "/images/products/phone-case.jpg",
      price: 299,
      originalPrice: 399,
      description: "Durable and stylish phone case for protection.",
      weight: "1 pc",
      rating: 4.3,
      ratingCount: 167,
      discount: 25,
      estimatedDelivery: "10-15 min"
    },
    {
      id: "p54",
      name: "USB Flash Drive",
      image: "/images/products/usb-drive.jpg",
      price: 499,
      description: "64GB USB flash drive for easy data storage.",
      weight: "1 pc",
      rating: 4.5,
      ratingCount: 132,
      isNew: true,
      estimatedDelivery: "10-15 min"
    }
  ]
};

// Filter options
const filterOptions = [
  { id: "all", name: "All" },
  { id: "new", name: "New Arrivals" },
  { id: "trending", name: "Trending" },
  { id: "discounted", name: "Discounted" },
  { id: "top-rated", name: "Top Rated" }
];

// Sort options
const sortOptions = [
  { id: "popular", name: "Most Popular" },
  { id: "price-low", name: "Price: Low to High" },
  { id: "price-high", name: "Price: High to Low" },
  { id: "rating", name: "Highest Rated" },
  { id: "newest", name: "Newest First" }
];

function ProductCard({ product, index }: { product: Product; index: number }) {
  const router = useRouter();
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3, 
        delay: index * 0.05,
        ease: "easeOut" 
      }
    },
    hover: { 
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2 }
    }
  };

  // Add to cart function (to be replaced with actual functionality)
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    // Add cart functionality here
    alert(`Added ${product.name} to cart!`);
  };
  
  // Navigate to product detail page
  const goToProductDetail = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm overflow-hidden h-full cursor-pointer"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onClick={goToProductDetail}
    >
      <div className="relative">
        {/* Product Image with zoom effect */}
        <div className="relative h-40 overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transform transition-transform group-hover:scale-110"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.discount && (
              <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded">
                {product.discount}% OFF
              </span>
            )}
            {product.isNew && (
              <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded">
                NEW
              </span>
            )}
            {product.isTrending && (
              <span className="bg-purple-500 text-white text-xs px-1.5 py-0.5 rounded">
                TRENDING
              </span>
            )}
          </div>
        </div>
        
        {/* Quick add button */}
        <Button
          size="icon"
          className="absolute right-2 bottom-2 bg-white shadow-md h-8 w-8 rounded-full opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
          onClick={handleAddToCart}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="p-3">
        {/* Product name */}
        <h3 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h3>
        
        {/* Weight */}
        <p className="text-xs text-gray-500 mb-1">{product.weight}</p>
        
        {/* Price */}
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-bold">₹{product.price}</span>
          
          {product.originalPrice && (
            <span className="text-gray-500 line-through text-xs">
              ₹{product.originalPrice}
            </span>
          )}
        </div>
        
        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex items-center text-amber-400">
            <Star className="h-3 w-3 fill-current" />
            <span className="text-xs ml-1">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-500">({product.ratingCount})</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function CategoryPage() {
  const { id } = useParams();
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeSortOption, setActiveSortOption] = useState("popular");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollY, setScrollY] = useState(0);
  
  // Get category data
  const categoryId = Array.isArray(id) ? id[0] : id;
  const category = categoriesData[categoryId as string];
  
  // If category doesn't exist
  if (!category) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col">
        <SharedHeader title="Category Not Found" showBackButton={true} />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-6">The category you're looking for doesn't exist.</p>
          <Link href="/categories/all">
            <Button className="bg-pastel-orange text-white">
              View All Categories
            </Button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  // Get and filter products
  const categoryProducts = products[categoryId as string] || [];
  
  const filteredProducts = categoryProducts.filter(product => {
    // Apply search filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply category filter
    switch (activeFilter) {
      case "new":
        return product.isNew;
      case "trending":
        return product.isTrending;
      case "discounted":
        return product.discount && product.discount > 0;
      case "top-rated":
        return product.rating >= 4.5;
      case "all":
      default:
        return true;
    }
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (activeSortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      case "popular":
      default:
        return b.ratingCount - a.ratingCount;
    }
  });

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <SharedHeader title={category.name} showBackButton={true} showLogo={true} />
      
      {/* Banner with parallax effect */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${category.bannerImage})`,
            transform: `translateY(${scrollY * 0.25}px)`,
            backgroundPosition: `center ${50 + scrollY * 0.05}%`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pastel-orange/70 to-black/50" />
        </div>
        
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl text-white"
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{category.name}</h1>
              <p className="text-white/90 mb-4">{category.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-sm bg-white/20 px-2 py-1 rounded-full">
                  {category.itemsCount} Items
                </span>
                <span className="text-sm bg-white/20 px-2 py-1 rounded-full">
                  {category.subcategories.length} Subcategories
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Subcategories Scrollable Row */}
      <div className="bg-white border-b py-3">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide gap-3 pb-1">
            {category.subcategories.map((subcategory, index) => (
              <motion.div
                key={subcategory.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex-shrink-0"
              >
                <Button 
                  variant="outline" 
                  className="rounded-full border-gray-200 font-normal"
                >
                  {subcategory.name} ({subcategory.itemsCount})
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Featured Brands */}
      <div className="bg-white/50 py-4">
        <div className="container mx-auto px-4">
          <h2 className="text-lg font-medium text-gray-800 mb-3">Featured Brands</h2>
          <div className="grid grid-cols-4 gap-3">
            {category.featuredBrands.map((brand, index) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm p-3 flex items-center justify-center h-16"
              >
                <Image 
                  src={brand.logo} 
                  alt={brand.name} 
                  width={80} 
                  height={40} 
                  className="object-contain" 
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Filters and Search */}
      <div className="sticky top-[56px] z-10 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-2">
          {isSearchVisible ? (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="py-2"
            >
              <div className="relative">
                <input
                  type="text"
                  className="w-full h-10 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:border-pastel-orange"
                  placeholder={`Search in ${category.name}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </motion.div>
          ) : null}
          
          <div className="flex items-center justify-between py-1">
            <div className="flex overflow-x-auto scrollbar-hide gap-2">
              {filterOptions.map(option => (
                <button
                  key={option.id}
                  className={`whitespace-nowrap px-3 py-1 rounded-full text-sm ${
                    activeFilter === option.id 
                      ? 'bg-pastel-orange text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setActiveFilter(option.id)}
                >
                  {option.name}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-9 w-9 rounded-full"
                onClick={() => setIsSearchVisible(!isSearchVisible)}
              >
                <Search size={18} />
              </Button>
              
              <div className="relative">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                >
                  <SlidersHorizontal size={14} />
                  Sort
                  <ChevronDown size={14} className={`transition-transform ${isFilterMenuOpen ? 'rotate-180' : ''}`} />
                </Button>
                
                {isFilterMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg py-2 w-48 z-20"
                  >
                    {sortOptions.map(option => (
                      <button
                        key={option.id}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                          activeSortOption === option.id ? 'text-pastel-orange font-medium' : 'text-gray-700'
                        }`}
                        onClick={() => {
                          setActiveSortOption(option.id);
                          setIsFilterMenuOpen(false);
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
      </div>
      
      {/* Products Grid */}
      <div className="flex-1 py-4">
        <div className="container mx-auto px-4">
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {sortedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md mx-auto"
              >
                <Search size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-800 mb-1">No products found</h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery 
                    ? `No results for "${searchQuery}" in this category.` 
                    : "No products match the selected filters."
                  }
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setActiveFilter("all");
                    setSearchQuery("");
                  }}
                >
                  Clear Filters
                </Button>
              </motion.div>
            </div>
          )}
        </div>
      </div>
      
      {/* Floating Cart Button - conditionally rendered if there are items in cart */}
      <div className="fixed bottom-4 right-4 z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-pastel-orange text-white rounded-full px-4 py-3 shadow-lg flex items-center gap-2"
        >
          <ShoppingBag size={20} />
          <span className="font-medium">View Cart • ₹349</span>
        </motion.div>
      </div>
      
      <Footer />
    </main>
  );
} 