import Image from "next/image"
import Link from "next/link"
import { Star, Plus, Check, Sparkles, Truck, Store } from "lucide-react"
import discount_img from "./output-onlinepngtools.png"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { useCart } from "@/lib/cart-context"

interface ProductCardProps {
  id: string
  name: string
  price: string
  mrp: string
  image: string
  quantity: string
  rating?: number
  discount?: string
  storeId?: string
  storeName?: string
  storeDistance?: string
  deliveryTime?: string
}

export function ProductCard({ 
  id, 
  name, 
  price, 
  image, 
  rating, 
  discount, 
  quantity, 
  mrp,
  storeId = "1",
  storeName = "Nearby Store",
  storeDistance = "0.5 km",
  deliveryTime = "10-15 min"
}: ProductCardProps) {
  const { addToCart } = useCart()
  const [addedToCart, setAddedToCart] = useState(false)
  const [showStoreWarning, setShowStoreWarning] = useState(false)
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // The warning event will be triggered in the cart context if needed
    addToCart({
      id,
      name,
      price,
      mrp,
      image,
      quantity,
      rating,
      discount,
      storeId,
      storeName
    }, 1, storeId)
    
    // Listen for multiple store warning event
    if (typeof window !== 'undefined') {
      const handleMultipleStoreWarning = (event: Event) => {
        setShowStoreWarning(true)
        setTimeout(() => setShowStoreWarning(false), 3000)
      }
      
      // Add listener for warning event
      window.addEventListener('multipleStoreWarning', handleMultipleStoreWarning)
      
      // Only set added to cart if no warning was shown
      setTimeout(() => {
        // If we're still showing store warning, we didn't actually add to cart
        if (!showStoreWarning) {
          setAddedToCart(true)
          // Reset the added state after 1.5 seconds
          setTimeout(() => {
            setAddedToCart(false)
          }, 1500)
        }
        
        // Clean up event listener
        window.removeEventListener('multipleStoreWarning', handleMultipleStoreWarning)
      }, 200)
    }
  }
  
  // Calculate discount percentage for display
  const getDiscountPercent = () => {
    if (!mrp || !price) return null
    const priceNum = parseInt(price.replace(/[^\d]/g, ''))
    const mrpNum = parseInt(mrp.replace(/[^\d]/g, ''))
    if (isNaN(priceNum) || isNaN(mrpNum) || mrpNum <= priceNum) return null
    return Math.round(((mrpNum - priceNum) / mrpNum) * 100)
  }
  
  const discountPercent = getDiscountPercent()
  
  return (
    <div className="group rounded-xl overflow-hidden border border-gray-200 bg-white transition-all hover:shadow-md">
      <div className="relative aspect-square w-full">
        <Link href={`/product/${id}`}>
          <div className="relative w-full h-full">
            <Image src={image || ""} alt={name} fill className="object-contain p-2" />
            
            {discountPercent && (
              <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                {discountPercent}% OFF
              </div>
            )}
            
            {/* Store Badge */}
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 px-1.5 py-0.5 rounded-sm text-xs shadow-sm">
              <Store size={10} className="text-pastel-orange" />
              <span className="font-medium text-[10px] sm:text-xs truncate max-w-[80px]">{storeName}</span>
            </div>
            
            {/* Delivery time badge */}
            {deliveryTime && (
              <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/90 px-1.5 py-0.5 rounded-sm text-xs shadow-sm">
                <Truck size={10} className="text-pastel-orange" />
                <span className="font-medium text-[10px] sm:text-xs">{deliveryTime}</span>
              </div>
            )}
          </div>
        </Link>
        
        {/* Add to cart button */}
        <div className="absolute bottom-2 right-2 z-1">
          <Button
            size="icon"
            className={`rounded-full h-7 w-7 sm:h-8 sm:w-8 transition-all ${
              addedToCart 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-pastel-orange hover:bg-pastel-orange/90'
            }`}
            onClick={handleAddToCart}
          >
            {addedToCart ? <Check className="h-3 w-3 sm:h-4 sm:w-4" /> : <Plus className="h-3 w-3 sm:h-4 sm:w-4" />}
          </Button>
        </div>
        
        {/* Multiple store warning toast */}
        {showStoreWarning && (
          <div className="absolute left-0 right-0 mx-auto w-[90%] bottom-[40%] bg-amber-600 text-white text-xs font-medium px-2 py-1.5 rounded text-center animate-bounce">
            Items from different store in your cart
          </div>
        )}
      </div>
      
      <div className="p-2 sm:p-3">
        <Link href={`/product/${id}`}>
          {/* Product name and quantity */}
          <div>
            <h3 className="font-medium text-xs sm:text-sm line-clamp-1 group-hover:text-pastel-orange transition-colors">{name}</h3>
            <span className="text-[10px] sm:text-xs text-gray-500 font-medium">{quantity}</span>
          </div>
          
          {/* Price section */}
          <div className="flex justify-between items-center mt-1.5 sm:mt-2">
            <div>
              <p className="font-bold text-sm text-gray-900">{price} 
                {mrp && (
                  <span className="font-normal text-[10px] sm:text-xs text-gray-400 line-through ml-1">{mrp}</span>
                )}
              </p>
            </div>
            
            {rating && (
              <div className="flex items-center gap-0.5 bg-green-100 px-1 py-0.5 rounded">
                <Star size={8} className="fill-green-600 text-green-600 sm:h-2.5 sm:w-2.5" />
                <span className="text-[10px] sm:text-xs text-green-700 font-medium">{rating}</span>
              </div>
            )}
          </div>
          
          {discount && discount !== "0% OFF" && (
            <div className="mt-1">
              <Badge variant="pastel-outline" shape="pill" className="text-[8px] sm:text-[10px] px-1 sm:px-1.5 py-0 sm:py-0.5">
                <Sparkles className="h-2 w-2 sm:h-2.5 sm:w-2.5 mr-0.5 sm:mr-1" /> {discount}
              </Badge>
            </div>
          )}
        </Link>
      </div>
    </div>
  )
}

