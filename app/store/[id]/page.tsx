"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Clock, MapPin, Phone, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"

export default function StoreScreen({ params }: { params: { id: string } }) {
  // Mock store data - in a real app, this would come from an API
  const store = {
    id: params.id,
    name: "LocalMart - Andheri",
    image: "/placeholder.svg?height=200&width=600",
    timing: "Open 8 AM - 10 PM",
    contact: "+91-9876543210",
    address: "Shop No. 12, Market Road, Andheri West, Mumbai",
    rating: 4.2,
    reviews: 500,
  }

  // Mock products data
  const products = [
    {
      id: "1",
      name: "Amul Fresh Milk 1L",
      price: "₹50",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.5,
    },
    {
      id: "2",
      name: "Fresh Bread 400g",
      price: "₹25",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.2,
    },
    {
      id: "3",
      name: "Organic Eggs (6 pcs)",
      price: "₹60",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.7,
    },
    {
      id: "4",
      name: "Basmati Rice 1kg",
      price: "₹120",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.3,
    },
  ]

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-border px-4 py-3">
        <div className="flex items-center">
          <Link href="/home">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-lg font-medium text-dark-grey ml-2">{store.name}</h1>
        </div>
      </header>

      {/* Store Banner */}
      <div className="relative aspect-[3/1] w-full">
        <Image src={store.image || "/placeholder.svg"} alt={store.name} fill className="object-cover" priority />
      </div>

      {/* Store Details */}
      <div className="px-4 py-4">
        <div className="flex items-start justify-between gap-2">
          <h1 className="text-2xl font-bold text-dark-grey">{store.name}</h1>
          <div className="flex items-center gap-1 bg-light-grey px-2 py-1 rounded">
            <Star size={16} className="fill-pastel-orange text-pastel-orange" />
            <span className="text-sm font-medium">{store.rating}</span>
            <span className="text-xs text-muted-foreground">({store.reviews} reviews)</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock size={16} />
            <span className="text-sm">{store.timing}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone size={16} />
            <span className="text-sm">{store.contact}</span>
          </div>
          <div className="flex items-start gap-2 text-muted-foreground">
            <MapPin size={16} className="mt-0.5 flex-shrink-0" />
            <span className="text-sm">{store.address}</span>
          </div>
        </div>

        <Button className="w-full mt-4 bg-pastel-orange text-white">Visit Store</Button>
      </div>

      {/* Products */}
      <div className="px-4 py-2">
        <h2 className="font-bold text-lg text-dark-grey mb-3">Available Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              rating={product.rating}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

