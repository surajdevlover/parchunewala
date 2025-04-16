"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { SharedHeader } from "@/components/shared-header"
import { Button } from "@/components/ui/button"
import { Filter, SlidersHorizontal } from "lucide-react"
import Footer from "@/app/footer/footer"
import Link from "next/link"

// Sample product data - in a real app this would come from an API
const products = [
  {
    id: "prod1",
    name: "Fresh Red Tomatoes",
    price: "₹49",
    mrp: "₹60",
    image: "/images/products/tomato.jpg",
    quantity: "500g",
    rating: 4.5,
    discount: "18% OFF",
    storeId: "1",
    storeName: "Satish General Store",
    storeDistance: "0.5 km",
    deliveryTime: "10-15 min"
  },
  {
    id: "prod2",
    name: "Ripe Yellow Bananas",
    price: "₹39",
    mrp: "₹45",
    image: "/images/products/banana.jpg",
    quantity: "6 pcs",
    rating: 4.7,
    discount: "13% OFF",
    storeId: "1",
    storeName: "Satish General Store",
    storeDistance: "0.5 km",
    deliveryTime: "10-15 min"
  },
  {
    id: "prod3",
    name: "Red Delicious Apples",
    price: "₹89",
    mrp: "₹110",
    image: "/images/products/apple.jpg",
    quantity: "4 pcs",
    rating: 4.3,
    discount: "19% OFF",
    storeId: "2",
    storeName: "Pandit General Store",
    storeDistance: "3.1 km",
    deliveryTime: "25-30 min"
  },
  {
    id: "prod4",
    name: "Fresh Green Broccoli",
    price: "₹69",
    mrp: "₹85",
    image: "/images/products/broccoli.jpg",
    quantity: "1 pc (250-300g)",
    rating: 4.6,
    discount: "19% OFF",
    storeId: "3",
    storeName: "Anuj Kirana Store",
    storeDistance: "3.5 km",
    deliveryTime: "30-35 min"
  },
  {
    id: "prod5",
    name: "Brown Potatoes",
    price: "₹35",
    mrp: "₹40",
    image: "/images/products/potato.jpg",
    quantity: "1 kg",
    rating: 4.4,
    discount: "12% OFF",
    storeId: "1",
    storeName: "Satish General Store",
    storeDistance: "0.5 km",
    deliveryTime: "10-15 min"
  },
  {
    id: "prod6",
    name: "Green Bell Peppers",
    price: "₹49",
    mrp: "₹59",
    image: "/images/products/bellpepper.jpg",
    quantity: "500g",
    rating: 4.2,
    discount: "17% OFF",
    storeId: "2",
    storeName: "Pandit General Store",
    storeDistance: "3.1 km",
    deliveryTime: "25-30 min"
  },
  {
    id: "prod7",
    name: "Fresh Ginger",
    price: "₹19",
    mrp: "₹25",
    image: "/images/products/ginger.jpg",
    quantity: "100g",
    rating: 4.3,
    discount: "24% OFF",
    storeId: "1",
    storeName: "Satish General Store",
    storeDistance: "0.5 km",
    deliveryTime: "10-15 min"
  },
  {
    id: "prod8",
    name: "Organic Carrots",
    price: "₹45",
    mrp: "₹55",
    image: "/images/products/carrot.jpg",
    quantity: "500g",
    rating: 4.5,
    discount: "18% OFF",
    storeId: "3",
    storeName: "Anuj Kirana Store",
    storeDistance: "3.5 km",
    deliveryTime: "30-35 min"
  },
  {
    id: "prod9",
    name: "Fresh Onions",
    price: "₹39",
    mrp: "₹50",
    image: "/images/products/onion.jpg",
    quantity: "1 kg",
    rating: 4.6,
    discount: "22% OFF",
    storeId: "1",
    storeName: "Satish General Store",
    storeDistance: "0.5 km",
    deliveryTime: "10-15 min"
  },
  {
    id: "prod10",
    name: "Green Okra",
    price: "₹59",
    mrp: "₹70",
    image: "/images/products/okra.jpg",
    quantity: "500g",
    rating: 4.1,
    discount: "16% OFF",
    storeId: "2",
    storeName: "Pandit General Store",
    storeDistance: "3.1 km",
    deliveryTime: "25-30 min"
  },
  {
    id: "prod11",
    name: "Cucumber",
    price: "₹29",
    mrp: "₹35",
    image: "/images/products/cucumber.jpg",
    quantity: "500g",
    rating: 4.7,
    discount: "17% OFF",
    storeId: "1",
    storeName: "Satish General Store",
    storeDistance: "0.5 km",
    deliveryTime: "10-15 min"
  },
  {
    id: "prod12",
    name: "Fresh Mint Leaves",
    price: "₹15",
    mrp: "₹20",
    image: "/images/products/mint.jpg",
    quantity: "100g",
    rating: 4.4,
    discount: "25% OFF",
    storeId: "3",
    storeName: "Anuj Kirana Store",
    storeDistance: "3.5 km",
    deliveryTime: "30-35 min"
  }
];

// Filter options
const sortOptions = [
  { id: "relevance", name: "Relevance" },
  { id: "price-low", name: "Price: Low to High" },
  { id: "price-high", name: "Price: High to Low" },
  { id: "discount", name: "Discount" },
  { id: "newest", name: "Newest First" }
];

export default function AllProductsPage() {
  const [activeSort, setActiveSort] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <SharedHeader title="All Products" showBackButton={true} />
      
      {/* Filters */}
      <div className="bg-white border-b sticky top-[56px] z-10">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex overflow-x-auto scrollbar-hide py-1 gap-3">
              {sortOptions.map(option => (
                <button
                  key={option.id}
                  className={`whitespace-nowrap px-3 py-1 rounded-full text-sm ${
                    activeSort === option.id 
                      ? 'bg-pastel-orange text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setActiveSort(option.id)}
                >
                  {option.name}
                </button>
              ))}
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-shrink-0"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={16} className="mr-1" />
              Filters
            </Button>
          </div>
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {products.map(product => (
            <ProductCard
              key={product.id}
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
          ))}
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 