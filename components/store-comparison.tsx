import { useState } from 'react'
import { Check, Plus, Star, Store, ArrowRight, ExternalLink, AlertCircle } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'

interface StoreOption {
  storeId: string
  storeName: string
  price: string
  available: boolean
  distance?: string
  rating?: number
  deliveryTime?: string
  image?: string
}

interface StoreComparisonProps {
  product: {
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
    storeOptions?: StoreOption[]
  }
}

export function StoreComparison({ product }: StoreComparisonProps) {
  const { addToCart } = useCart()
  const [selectedStore, setSelectedStore] = useState(product.storeId || (product.storeOptions?.[0]?.storeId || '1'))
  const [addedStores, setAddedStores] = useState<Record<string, boolean>>({})
  
  if (!product.storeOptions || product.storeOptions.length <= 1) {
    return null
  }
  
  // Sort by price - available stores first, then by lowest price
  const sortedStores = [...product.storeOptions].sort((a, b) => {
    if (a.available !== b.available) {
      return a.available ? -1 : 1
    }
    
    const priceA = parseFloat(a.price.replace('₹', ''))
    const priceB = parseFloat(b.price.replace('₹', ''))
    return priceA - priceB
  })
  
  // Find cheapest store
  const cheapestStore = sortedStores.find(store => store.available)
  
  const handleAddToCart = (storeId: string) => {
    const storeOption = sortedStores.find(store => store.storeId === storeId)
    if (!storeOption || !storeOption.available) return
    
    addToCart({
      ...product,
      price: storeOption.price,
      storeId: storeOption.storeId,
      storeName: storeOption.storeName
    }, 1, storeOption.storeId)
    
    setAddedStores(prev => ({
      ...prev,
      [storeId]: true
    }))
    
    // Reset after 1.5 seconds
    setTimeout(() => {
      setAddedStores(prev => ({
        ...prev,
        [storeId]: false
      }))
    }, 1500)
  }
  
  return (
    <div className="mt-8 border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b">
        <h3 className="font-semibold text-gray-800">Compare Prices from Different Stores</h3>
        <p className="text-xs text-gray-500 mt-1">
          This product is available at multiple stores with different prices
        </p>
      </div>
      
      <div>
        {sortedStores.map((store, index) => {
          const isLowestPrice = store.storeId === cheapestStore?.storeId && store.available
          
          // Calculate percentage difference from the cheapest
          let priceDiff = 0
          if (cheapestStore && store.available && store.storeId !== cheapestStore.storeId) {
            const thisPrice = parseFloat(store.price.replace('₹', ''))
            const lowestPrice = parseFloat(cheapestStore.price.replace('₹', ''))
            priceDiff = Math.round(((thisPrice - lowestPrice) / lowestPrice) * 100)
          }
          
          return (
            <div 
              key={store.storeId} 
              className={`flex items-center border-b last:border-b-0 p-4 ${
                isLowestPrice ? 'bg-green-50' : ''
              }`}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                {store.image ? (
                  <Image 
                    src={store.image} 
                    alt={store.storeName} 
                    width={40} 
                    height={40} 
                    className="object-cover"
                  />
                ) : (
                  <Store className="h-5 w-5 text-gray-400" />
                )}
              </div>
              
              <div className="ml-3 flex-grow">
                <div className="flex items-center">
                  <h4 className="font-medium text-sm">{store.storeName}</h4>
                  {isLowestPrice && (
                    <span className="ml-2 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                      Best Price
                    </span>
                  )}
                </div>
                
                {store.rating && (
                  <div className="flex items-center mt-1">
                    <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs text-gray-600 ml-1">{store.rating}</span>
                  </div>
                )}
                
                {store.distance && (
                  <div className="text-xs text-gray-500 mt-0.5">
                    {store.distance} • {store.deliveryTime || '15-20 min'}
                  </div>
                )}
              </div>
              
              <div className="text-right flex flex-col items-end">
                <div className="font-semibold text-sm">
                  {store.price}
                </div>
                
                {priceDiff > 0 && (
                  <div className="text-xs text-red-500">
                    +{priceDiff}% more
                  </div>
                )}
                
                {!store.available ? (
                  <div className="mt-2 text-xs text-gray-500 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Not available
                  </div>
                ) : (
                  <Button
                    size="sm"
                    variant={isLowestPrice ? "default" : "outline"}
                    className={`mt-2 h-8 ${
                      isLowestPrice 
                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                        : 'border-pastel-orange text-pastel-orange hover:bg-pastel-orange/10'
                    }`}
                    onClick={() => handleAddToCart(store.storeId)}
                  >
                    {addedStores[store.storeId] ? (
                      <>
                        <Check className="h-3.5 w-3.5 mr-1" />
                        Added
                      </>
                    ) : (
                      <>
                        <Plus className="h-3.5 w-3.5 mr-1" />
                        Add
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="bg-blue-50 p-3 text-xs text-blue-700 flex items-start gap-2">
        <ExternalLink className="h-4 w-4 flex-shrink-0 mt-0.5" />
        <p>
          <span className="font-medium">Free delivery on orders of ₹199 or more from a single store.</span> We recommend 
          ordering all products from the same store to avoid additional delivery charges.
        </p>
      </div>
    </div>
  )
} 