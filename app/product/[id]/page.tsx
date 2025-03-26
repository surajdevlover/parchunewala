"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Heart, Minus, Plus, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProductScreen({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  // Mock product data - in a real app, this would come from an API
  const product = {
    id: params.id,
    name: "Amul Fresh Milk 1L",
    price: "₹100",
    description: "Fresh from the dairy farm, rich in calcium and protein.",
    rating: 4.5,
    reviews: 120,
    image: "https://cdn.zeptonow.com/cms/product_variant/e1812c8a-9ccc-4757-9c99-0cd25c686043.jpeg?height=400&width=400",
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const toggleWishlist = () => {
    setIsWishlisted((prev) => !prev)
  }

  const addToCart = () => {
    // Add to cart logic here
    console.log(`Added ${quantity} of ${product.name} to cart`)
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/home">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft size={20} />
            </Button>
          </Link>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative h-9 w-9">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-pastel-orange text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Product Image */}
      <div className="relative aspect-square w-full">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-contain p-4"
          priority
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 px-4 py-4">
        <div className="flex items-start justify-between gap-2">
          <h1 className="text-2xl font-bold text-dark-grey">{product.name}</h1>
          <Button
            variant="outline"
            size="icon"
            className={`h-9 w-9 ${isWishlisted ? "text-pastel-orange" : ""}`}
            onClick={toggleWishlist}
          >
            <Heart size={20} className={isWishlisted ? "fill-pastel-orange" : ""} />
          </Button>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-1">
            <Star size={16} className="fill-pastel-orange text-pastel-orange" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
        </div>

        <div className="mt-4">
          <p className="text-xl font-bold text-pastel-orange">{product.price}</p>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-medium text-dark-grey mb-2">Description</h2>
          <p className="text-muted-foreground">{product.description}</p>
        </div>

        {/* Quantity Selector */}
        <div className="mt-6">
          <h2 className="text-lg font-medium text-dark-grey mb-2">Quantity</h2>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
            >
              <Minus size={16} />
            </Button>
            <span className="text-lg font-medium w-8 text-center">{quantity}</span>
            <Button variant="outline" size="icon" className="h-9 w-9" onClick={incrementQuantity}>
              <Plus size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="sticky bottom-0 bg-white border-t border-border p-4">
        <Button className="w-full bg-pastel-orange text-white h-12 text-base" onClick={addToCart}>
          Add to Cart
        </Button>
      </div>
    </main>
  )
}

