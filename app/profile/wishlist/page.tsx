"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/lib/wishlist-context"
import { useCart } from "@/lib/cart-context"
import { ArrowLeft, Trash2, ShoppingCart, Heart } from "lucide-react"
import { useState } from "react"
import Footer from "../../footer/footer"

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({})

  const handleAddToCart = (product: any) => {
    setIsLoading({...isLoading, [product.id]: true})
    
    setTimeout(() => {
      addToCart(product, 1)
      setIsLoading({...isLoading, [product.id]: false})
    }, 500)
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2">
            <Link href="/profile">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <ArrowLeft size={20} />
              </Button>
            </Link>
            <h1 className="font-medium text-lg">My Wishlist</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Wishlist header with count and clear button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'Item' : 'Items'}
          </h2>
          {wishlistItems.length > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearWishlist}
              className="text-gray-500 gap-1"
            >
              <Trash2 size={16} />
              Clear All
            </Button>
          )}
        </div>

        {/* Wishlist items */}
        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <Heart size={64} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 mb-6">
              Items you add to your wishlist will appear here.
            </p>
            <Link href="/home">
              <Button className="bg-pastel-orange text-white">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wishlistItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col"
              >
                <div className="relative">
                  <Link href={`/product/${item.id}`}>
                    <div className="w-full aspect-square relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>
                  <Button 
                    onClick={() => removeFromWishlist(item.id)} 
                    className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white text-gray-700 rounded-full"
                    variant="ghost"
                    size="icon"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
                
                <div className="p-4 flex-grow flex flex-col">
                  <Link href={`/product/${item.id}`} className="block mb-1">
                    <h3 className="font-medium text-gray-800 line-clamp-2 hover:text-pastel-orange transition">
                      {item.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-lg font-semibold">{item.price}</span>
                    {item.mrp && (
                      <span className="text-sm text-gray-500 line-through">{item.mrp}</span>
                    )}
                    {item.discount && (
                      <span className="text-xs text-green-500 font-medium">{item.discount}</span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-4">{item.quantity}</p>
                  
                  <div className="mt-auto">
                    <Button 
                      onClick={() => handleAddToCart(item)} 
                      className="w-full bg-pastel-orange text-white gap-1"
                      disabled={isLoading[item.id]}
                    >
                      {isLoading[item.id] ? (
                        <div className="animate-spin h-5 w-5 border-2 border-white border-opacity-20 border-t-white rounded-full"></div>
                      ) : (
                        <>
                          <ShoppingCart size={16} />
                          Add to Cart
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
} 