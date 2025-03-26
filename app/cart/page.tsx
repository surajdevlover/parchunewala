"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CartItem {
  id: string
  name: string
  price: string
  quantity: number
  image: string
}

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Amul Fresh Milk 1L",
      price: "₹50",
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "2",
      name: "Fresh Bread 400g",
      price: "₹25",
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "3",
      name: "Organic Eggs (6 pcs)",
      price: "₹60",
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
    },
  ])

  const [couponCode, setCouponCode] = useState("")

  const incrementQuantity = (id: string) => {
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)))
  }

  const decrementQuantity = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item)),
    )
  }

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = Number.parseInt(item.price.replace("₹", ""))
      return total + price * item.quantity
    }, 0)
  }

  const handleApplyCoupon = () => {
    // Apply coupon logic here
    console.log(`Applied coupon: ${couponCode}`)
  }

  const handleCheckout = () => {
    // Redirect to login if not logged in, otherwise proceed to checkout
    window.location.href = "/login"
  }

  return (
    <main className="flex min-h-screen flex-col bg-white px-60">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-border px-4 py-3">
        <div className="flex items-center">
          <Link href="/home">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-lg font-medium text-dark-grey ml-2">Your Cart</h1>
        </div>
      </header>

      {cartItems.length > 0 ? (
        <>
          {/* Cart Items */}
          <div className="flex-1 p-4">
            <div className="flex flex-col gap-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 bg-light-grey rounded-lg">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-dark-grey">{item.name}</h3>
                      <button
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <p className="text-pastel-orange font-medium mt-1">{item.price}</p>

                    <div className="flex items-center gap-3 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => decrementQuantity(item.id)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </Button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => incrementQuantity(item.id)}
                      >
                        <Plus size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon */}
            <div className="mt-6">
              <h2 className="font-medium text-dark-grey mb-2">Apply Coupon</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="flex-1 px-3 py-2 rounded-md bg-light-grey border-0 focus:ring-2 focus:ring-pastel-orange focus:outline-none"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button
                  className="bg-pastel-orange text-white"
                  onClick={handleApplyCoupon}
                  disabled={!couponCode.trim()}
                >
                  Apply
                </Button>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-6">
              <h2 className="font-medium text-dark-grey mb-2">Payment Methods</h2>
              <div className="flex gap-2 overflow-x-auto pb-2">
                <div className="border border-border rounded-md p-3 min-w-[80px] flex items-center justify-center">
                  <span className="text-sm font-medium">UPI</span>
                </div>
                <div className="border border-border rounded-md p-3 min-w-[80px] flex items-center justify-center">
                  <span className="text-sm font-medium">Card</span>
                </div>
                <div className="border border-border rounded-md p-3 min-w-[80px] flex items-center justify-center">
                  <span className="text-sm font-medium">COD</span>
                </div>
                <div className="border border-border rounded-md p-3 min-w-[80px] flex items-center justify-center">
                  <span className="text-sm font-medium">Wallet</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout */}
          <div className="sticky bottom-0 bg-white border-t border-border p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-dark-grey font-medium">Total:</span>
              <span className="text-xl font-bold text-dark-grey">₹{calculateTotal()}</span>
            </div>
            <Button className="w-full bg-pastel-orange text-white h-12 text-base" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <ShoppingCart size={64} className="text-muted-foreground mb-4" />
          <h2 className="text-xl font-bold text-dark-grey mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground text-center mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link href="/home">
            <Button className="bg-pastel-orange text-white">Start Shopping</Button>
          </Link>
        </div>
      )}
    </main>
  )
}

