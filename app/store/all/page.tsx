"use client"

import { useState } from "react"
import { SharedHeader } from "@/components/shared-header"
import { Button } from "@/components/ui/button"
import { Filter, SlidersHorizontal, Star } from "lucide-react"
import Footer from "@/app/footer/footer"
import Link from "next/link"
import Image from "next/image"

// Define interface for store data
interface Store {
  id: string;
  name: string;
  address: string;
  image: string;
  rating: number;
  distance: string;
  deliveryTime: string;
  discount: string;
  isOpen: boolean;
}

// Sample store data - in a real app this would come from an API
const stores = [
  {
    id: "store1",
    name: "Satish General Store",
    address: "Near Gandhi Market, Tilak Nagar",
    image: "/images/stores/store1.jpg",
    rating: 4.7,
    distance: "0.5 km",
    deliveryTime: "10-15 min",
    discount: "Upto 20% OFF",
    isOpen: true
  },
  {
    id: "store2",
    name: "Pandit General Store",
    address: "Block A, Rajouri Garden",
    image: "/images/stores/store2.jpg",
    rating: 4.5,
    distance: "3.1 km",
    deliveryTime: "25-30 min",
    discount: "Upto 15% OFF",
    isOpen: true
  },
  {
    id: "store3",
    name: "Anuj Kirana Store",
    address: "Sector 7, Dwarka",
    image: "/images/stores/store3.jpg",
    rating: 4.3,
    distance: "3.5 km",
    deliveryTime: "30-35 min",
    discount: "Upto 18% OFF",
    isOpen: true
  },
  {
    id: "store4",
    name: "Sharma Brothers Mart",
    address: "DDA Market, Janakpuri",
    image: "/images/stores/store4.jpg",
    rating: 4.8,
    distance: "4.2 km",
    deliveryTime: "35-40 min",
    discount: "Upto 25% OFF", 
    isOpen: true
  },
  {
    id: "store5",
    name: "PVR Market Grocery",
    address: "Near PVR, Saket",
    image: "/images/stores/store5.jpg",
    rating: 4.6,
    distance: "5.7 km",
    deliveryTime: "40-45 min",
    discount: "Upto 22% OFF",
    isOpen: true
  },
  {
    id: "store6",
    name: "Malhotra Supermarket",
    address: "Main Road, Pitampura",
    image: "/images/stores/store6.jpg",
    rating: 4.4,
    distance: "6.1 km",
    deliveryTime: "45-50 min",
    discount: "Upto 18% OFF",
    isOpen: false
  },
  {
    id: "store7",
    name: "Singh Brothers Store",
    address: "Phase 1, Mayur Vihar",
    image: "/images/stores/store7.jpg",
    rating: 4.2,
    distance: "7.3 km",
    deliveryTime: "50-55 min",
    discount: "Upto 15% OFF",
    isOpen: true
  },
  {
    id: "store8",
    name: "Aggarwal Groceries",
    address: "Near Metro Station, Rohini",
    image: "/images/stores/store8.jpg",
    rating: 4.7,
    distance: "8.2 km",
    deliveryTime: "55-60 min",
    discount: "Upto 20% OFF",
    isOpen: true
  },
  {
    id: "store9",
    name: "New Delhi Supermart",
    address: "Connaught Place",
    image: "/images/stores/store9.jpg",
    rating: 4.9,
    distance: "9.5 km",
    deliveryTime: "60-65 min",
    discount: "Upto 30% OFF",
    isOpen: false
  },
  {
    id: "store10",
    name: "Krishna Grocery",
    address: "Block D, Vasant Kunj",
    image: "/images/stores/store10.jpg",
    rating: 4.6,
    distance: "10.3 km",
    deliveryTime: "65-70 min",
    discount: "Upto 25% OFF",
    isOpen: true
  }
];

// Filter options
const sortOptions = [
  { id: "nearest", name: "Nearest" },
  { id: "fastest", name: "Fastest Delivery" },
  { id: "rating", name: "Top Rated" },
  { id: "discount", name: "Best Offers" }
];

function StoreCard({ store }: { store: Store }) {
  return (
    <Link href={`/store/${store.id}`}>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative h-36">
          <Image 
            src={store.image || "/images/placeholder-store.jpg"} 
            alt={store.name}
            className="object-cover"
            fill
          />
          <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded text-xs font-medium">
            {store.discount}
          </div>
          {!store.isOpen && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-medium">Closed Now</span>
            </div>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-medium text-gray-900 truncate">{store.name}</h3>
          <p className="text-xs text-gray-500 truncate mt-1">{store.address}</p>
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <Star size={12} className="text-yellow-500 fill-yellow-500" />
              <span className="text-xs font-medium ml-1">{store.rating}</span>
            </div>
            <div className="text-xs text-gray-500">{store.distance}</div>
          </div>
          
          <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs font-medium text-gray-700">
              {store.deliveryTime}
            </span>
            <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">
              View Store
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function AllStoresPage() {
  const [activeSort, setActiveSort] = useState("nearest");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <SharedHeader title="All Stores" showBackButton={true} />
      
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
      
      {/* Stores Grid */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {stores.map(store => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 