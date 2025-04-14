"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Trash2, Plus, Minus, ChevronDown, ChevronUp } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

export default function CartScreen() {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    cartTotal,
    totalItems,
    viewProductStores,
    updateProductStore
  } = useCart()
  
  const [expandedStores, setExpandedStores] = useState<Record<string, boolean>>({})
  
  const toggleStoreExpand = (productId: string) => {
    setExpandedStores(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }))
  }
  
  const groupByStore = () => {
    const grouped: Record<string, typeof cartItems> = {}
    
    cartItems.forEach(item => {
      if (!grouped[item.storeId]) {
        grouped[item.storeId] = []
      }
      grouped[item.storeId].push(item)
    })
    
    return grouped
  }
  
  const storeGroups = groupByStore()
  const storeCount = Object.keys(storeGroups).length
  
  // Calculate delivery fee - free over ₹99
  const calculateDelivery = (storeTotal: number) => {
    return storeTotal >= 99 ? 0 : 15
  }

  const router = useRouter()

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/home">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <ArrowLeft size={20} />
              </Button>
            </Link>
            <h1 className="text-lg font-medium text-dark-grey">Your Cart ({totalItems()})</h1>
          </div>
        </div>
      </header>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 p-6">
          <div className="w-28 h-28 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Image 
              src="/images/empty-cart.png" 
              alt="Empty Cart" 
              width={60} 
              height={60}
              className="opacity-50"
            />
          </div>
          <h2 className="text-xl font-medium text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 text-center mb-6">
            Add items to your cart to get started
          </p>
          <Link href="/home">
            <Button className="bg-pastel-orange text-white">
              Start Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-4 container mx-auto px-4 py-6">
          <div className="flex-1">
            {Object.entries(storeGroups).map(([storeId, items]) => {
              const storeTotal = items.reduce((sum, item) => {
                const price = parseFloat(item.product.price.replace('₹', ''))
                return sum + (price * item.quantity)
              }, 0)
              
              const deliveryFee = calculateDelivery(storeTotal)
              
              return (
                <div key={storeId} className="bg-white rounded-lg overflow-hidden mb-4 shadow-sm">
                  <div className="p-4 border-b border-gray-100">
                    <h2 className="font-medium">
                      {items[0].storeName}
                      {storeCount > 1 && (
                        <span className="text-sm font-normal ml-2 text-gray-500">
                          (Order {Number(storeId)} of {storeCount})
                        </span>
                      )}
                    </h2>
                  </div>
                  
                  <div className="divide-y divide-gray-100">
                    {items.map((item) => (
                      <div key={item.product.id} className="p-4">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 relative w-16 h-16 rounded-md overflow-hidden">
                            <Image 
                              src={item.product.image || ""} 
                              alt={item.product.name} 
                              fill 
                              className="object-cover"
                            />
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="font-medium text-sm">{item.product.name}</h3>
                            <p className="text-xs text-gray-500">{item.product.quantity}</p>
                            
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-2">
                                <p className="font-bold text-dark-grey">{item.product.price}</p>
                                <p className="text-xs text-gray-400 line-through">{item.product.mrp}</p>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <button 
                                  className="w-6 h-6 rounded-full flex items-center justify-center border border-gray-300"
                                  onClick={() => updateQuantity(item.product.id, storeId, item.quantity - 1)}
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <button 
                                  className="w-6 h-6 rounded-full flex items-center justify-center border border-gray-300"
                                  onClick={() => updateQuantity(item.product.id, storeId, item.quantity + 1)}
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center mt-3">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 text-red-500 px-0"
                                onClick={() => removeFromCart(item.product.id, storeId)}
                              >
                                <Trash2 size={14} className="mr-1" />
                                Remove
                              </Button>
                              
                              {/* Compare prices from other stores */}
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-pastel-orange h-7 flex items-center"
                                    onClick={() => toggleStoreExpand(item.product.id)}
                                  >
                                    Compare stores
                                    <ChevronDown size={14} className="ml-1" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                  <DialogHeader>
                                    <DialogTitle>Compare Store Prices</DialogTitle>
                                    <DialogDescription>
                                      Find the best price for {item.product.name}
                                    </DialogDescription>
                                  </DialogHeader>
                                  
                                  <div className="grid gap-2 py-4">
                                    {item.product.storeOptions?.map(store => {
                                      const isCurrentStore = store.storeId === storeId
                                      const isCheapest = 
                                        parseFloat(store.price.replace('₹', '')) === 
                                        Math.min(...(item.product.storeOptions || [])
                                          .filter(s => s.available)
                                          .map(s => parseFloat(s.price.replace('₹', ''))))
                                      
                                      return (
                                        <div 
                                          key={store.storeId} 
                                          className={`border rounded-lg p-3 ${
                                            !store.available 
                                              ? 'bg-gray-50 opacity-60' 
                                              : isCurrentStore 
                                                ? 'border-pastel-orange bg-pastel-orange/5' 
                                                : isCheapest 
                                                  ? 'border-green-200 bg-green-50' 
                                                  : ''
                                          }`}
                                        >
                                          <div className="flex justify-between items-center">
                                            <div>
                                              <p className="font-medium">{store.storeName}</p>
                                              <p className={`text-sm ${isCheapest && store.available ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
                                                {store.price} 
                                                {isCheapest && store.available && ' (Best price)'}
                                                {!store.available && ' (Out of stock)'}
                                              </p>
                                            </div>
                                            
                                            {store.available && !isCurrentStore && (
                                              <Button 
                                                size="sm"
                                                variant="outline"
                                                onClick={() => updateProductStore(item.product.id, store.storeId)}
                                                className="border-pastel-orange text-pastel-orange hover:bg-pastel-orange/10"
                                              >
                                                Switch
                                              </Button>
                                            )}
                                            
                                            {isCurrentStore && (
                                              <span className="text-xs px-2 py-1 bg-pastel-orange/20 text-pastel-orange rounded-full">
                                                Current
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      )
                                    })}
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Store subtotal */}
                  <div className="p-4 bg-gray-50">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Subtotal</span>
                      <span>₹{storeTotal.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Delivery Fee</span>
                      <span>{deliveryFee > 0 ? `₹${deliveryFee}` : 'FREE'}</span>
                    </div>
                    {deliveryFee > 0 && (
                      <div className="text-xs text-gray-500 mb-2">
                        Add items worth ₹{(99 - storeTotal).toFixed(0)} more for free delivery
                      </div>
                    )}
                    <div className="flex justify-between font-medium pt-2 border-t border-gray-200 mt-2">
                      <span>Store Total</span>
                      <span>₹{(storeTotal + deliveryFee).toFixed(0)}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          
          <div className="w-full md:w-80 h-fit sticky top-20">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="font-medium mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Items ({totalItems()})</span>
                  <span>{cartTotal()}</span>
                </div>
                
                {Object.entries(storeGroups).map(([storeId, items]) => {
                  const storeTotal = items.reduce((sum, item) => {
                    const price = parseFloat(item.product.price.replace('₹', ''))
                    return sum + (price * item.quantity)
                  }, 0)
                  
                  const deliveryFee = calculateDelivery(storeTotal)
                  
                  return (
                    <div key={storeId} className="flex justify-between text-sm">
                      <span>Delivery ({items[0].storeName})</span>
                      <span>{deliveryFee > 0 ? `₹${deliveryFee}` : 'FREE'}</span>
                    </div>
                  )
                })}
              </div>
              
              <div className="flex justify-between font-medium py-3 border-t border-gray-200">
                <span>Total</span>
                <span>
                  {(() => {
                    const itemsTotal = parseFloat(cartTotal().replace('₹', ''))
                    const deliveryTotal = Object.entries(storeGroups).reduce((sum, [storeId, items]) => {
                      const storeTotal = items.reduce((acc, item) => {
                        const price = parseFloat(item.product.price.replace('₹', ''))
                        return acc + (price * item.quantity)
                      }, 0)
                      
                      return sum + calculateDelivery(storeTotal)
                    }, 0)
                    
                    return `₹${(itemsTotal + deliveryTotal).toFixed(0)}`
                  })()}
                </span>
              </div>
              
              <Button 
                className="w-full bg-pastel-orange text-white mt-4 py-6 text-base font-medium hover:bg-pastel-orange/90"
                onClick={() => router.push('/checkout')}
              >
                Proceed to Checkout • {(() => {
                  const itemsTotal = parseFloat(cartTotal().replace('₹', ''))
                  const deliveryTotal = Object.entries(storeGroups).reduce((sum, [storeId, items]) => {
                    const storeTotal = items.reduce((acc, item) => {
                      const price = parseFloat(item.product.price.replace('₹', ''))
                      return acc + (price * item.quantity)
                    }, 0)
                    
                    return sum + calculateDelivery(storeTotal)
                  }, 0)
                  
                  return `₹${(itemsTotal + deliveryTotal).toFixed(0)}`
                })()}
              </Button>
              
              <p className="text-xs text-gray-500 text-center mt-3">
                Free delivery on orders above ₹99
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

