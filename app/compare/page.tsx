"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Star, Check, X, ShoppingCart, Plus } from "lucide-react"
import { useCompare } from "@/lib/compare-context"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"

export default function CompareScreen() {
  const { comparedProducts, removeFromCompare, clearAll } = useCompare()
  const { addToCart } = useCart()
  const [showDifferences, setShowDifferences] = useState(false)
  const [addedToCart, setAddedToCart] = useState<Record<string, boolean>>({})

  const specifications = [
    { name: "Price", key: "price" },
    { name: "MRP", key: "mrp" },
    { name: "Quantity", key: "quantity" },
    { name: "Rating", key: "rating" },
    { name: "Discount", key: "discount" }
  ]
  
  const handleAddToCart = (product: any) => {
    addToCart(product, 1)
    
    // Show added indicator
    setAddedToCart(prev => ({
      ...prev,
      [product.id]: true
    }))
    
    // Reset after 1.5 seconds
    setTimeout(() => {
      setAddedToCart(prev => ({
        ...prev,
        [product.id]: false
      }))
    }, 1500)
  }

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
            <h1 className="text-lg font-medium text-dark-grey">Compare Products</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowDifferences(!showDifferences)}
              className={showDifferences ? "bg-pastel-orange/10 text-pastel-orange" : ""}
            >
              {showDifferences ? "Show All" : "Show Differences"}
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearAll}
              className="text-red-500"
            >
              Clear All
            </Button>
          </div>
        </div>
      </header>

      {comparedProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 p-6">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <ShoppingCart size={40} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-medium text-gray-800 mb-2">No Products to Compare</h2>
          <p className="text-gray-500 text-center mb-6">
            Add some products to compare their features and prices
          </p>
          <Link href="/home">
            <Button className="bg-pastel-orange text-white">
              Browse Products
            </Button>
          </Link>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-4 text-left w-36 min-w-36 bg-gray-50 sticky left-0 z-1">
                    <span className="text-sm font-medium text-gray-500">Products</span>
                  </th>
                  
                  {comparedProducts.map((product) => (
                    <th key={product.id} className="p-4 text-center border-l border-gray-100">
                      <div className="w-40 min-w-40 relative">
                        <button 
                          className="absolute -top-2 -right-2 bg-gray-100 p-1 rounded-full hover:bg-gray-200"
                          onClick={() => removeFromCompare(product.id)}
                        >
                          <X size={16} className="text-gray-500" />
                        </button>
                        
                        <div className="aspect-square relative mb-3">
                          <Image 
                            src={product.image || ""} 
                            alt={product.name} 
                            fill 
                            className="object-cover rounded-md"
                          />
                        </div>
                        
                        <h3 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h3>
                        
                        <div className="flex justify-center items-center gap-2 mt-2">
                          <span className="font-bold text-dark-grey">{product.price}</span>
                          <span className="text-xs text-gray-400 line-through">{product.mrp}</span>
                        </div>
                        
                        {product.rating && (
                          <div className="flex justify-center items-center gap-1 mt-1 text-sm">
                            <Star size={14} className="fill-pastel-orange text-pastel-orange" />
                            <span>{product.rating}</span>
                          </div>
                        )}
                        
                        <Button 
                          className={`w-full mt-3 h-9 flex items-center justify-center gap-1 ${
                            addedToCart[product.id] 
                              ? 'bg-green-500 hover:bg-green-600' 
                              : 'bg-pastel-orange hover:bg-pastel-orange/90'
                          }`}
                          onClick={() => handleAddToCart(product)}
                        >
                          {addedToCart[product.id] ? (
                            <>
                              <Check className="h-4 w-4" /> Added
                            </>
                          ) : (
                            <>
                              <Plus className="h-4 w-4" /> Add to Cart
                            </>
                          )}
                        </Button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              
              <tbody>
                {specifications.map((spec) => {
                  // Skip this row if showing differences only and all values are the same
                  if (showDifferences) {
                    const values = comparedProducts.map(p => p[spec.key as keyof typeof p])
                    const allSame = values.every(v => v === values[0])
                    if (allSame) return null
                  }
                  
                  return (
                    <tr key={spec.name} className="border-t border-gray-100">
                      <td className="p-4 text-left bg-gray-50 sticky left-0 font-medium text-gray-700">
                        {spec.name}
                      </td>
                      
                      {comparedProducts.map((product) => {
                        const value = product[spec.key as keyof typeof product]
                        const values = comparedProducts.map(p => p[spec.key as keyof typeof p])
                        const isHighlight = spec.key === 'price' && value === Math.min(...values.map(v => parseFloat(String(v).replace('₹', ''))))
                        
                        return (
                          <td 
                            key={`${product.id}-${spec.key}`}
                            className={`p-4 text-center border-l border-gray-100 ${isHighlight ? 'bg-green-50' : ''}`}
                          >
                            {value || '-'}
                            {isHighlight && <span className="ml-1 text-green-600 text-xs">(Lowest)</span>}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          
          {comparedProducts.length < 4 && (
            <div className="mt-4 text-center">
              <Link href="/home">
                <Button variant="outline" className="border-pastel-orange text-pastel-orange hover:bg-pastel-orange/10">
                  Add More Products to Compare
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </main>
  )
} 