"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Check, MapPin, Phone, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OrderConfirmationScreen() {
  const [currentStep, setCurrentStep] = useState(1)
  const [estimatedTime, setEstimatedTime] = useState(30)

  // Mock order data
  const order = {
    id: "ORD12345",
    items: [
      { name: "Amul Fresh Milk 1L", quantity: 1, price: "₹50" },
      { name: "Fresh Bread 400g", quantity: 1, price: "₹25" },
      { name: "Organic Eggs (6 pcs)", quantity: 1, price: "₹60" },
    ],
    total: "₹135",
    deliveryPerson: "Rahul",
    contact: "+91-9876543210",
  }

  // Simulate order progress
  useEffect(() => {
    if (currentStep < 4) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1)
        setEstimatedTime((prev) => Math.max(0, prev - 10))
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [currentStep])

  const steps = [
    { id: 1, name: "Order Placed" },
    { id: 2, name: "Preparing" },
    { id: 3, name: "Out for Delivery" },
    { id: 4, name: "Delivered" },
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
          <h1 className="text-lg font-medium text-dark-grey ml-2">Order #{order.id}</h1>
        </div>
      </header>

      {/* Confirmation */}
      <div className="p-4 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-mint-green/20 flex items-center justify-center mb-4">
          <Check size={32} className="text-mint-green" />
        </div>
        <h1 className="text-2xl font-bold text-dark-grey mb-1">Order Confirmed!</h1>
        <p className="text-muted-foreground">Your order has been placed successfully</p>
      </div>

      {/* Progress Tracker */}
      <div className="px-4 py-2">
        <div className="relative flex justify-between items-center mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center relative z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.id <= currentStep
                    ? step.id === currentStep
                      ? "bg-pastel-orange text-white"
                      : "bg-mint-green text-white"
                    : "bg-light-grey text-muted-foreground"
                }`}
              >
                {step.id < currentStep ? <Check size={16} /> : <span className="text-sm">{step.id}</span>}
              </div>
              <span className="text-xs mt-1 text-center max-w-[60px]">{step.name}</span>
            </div>
          ))}

          {/* Progress Line */}
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-light-grey -z-0">
            <div
              className="h-full bg-mint-green transition-all duration-500"
              style={{ width: `${(currentStep - 1) * 33.33}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="px-4 py-2 border-t border-border">
        <h2 className="font-medium text-dark-grey mb-3">Delivery Information</h2>
        <div className="bg-light-grey rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-pastel-orange/20 flex items-center justify-center">
              <User size={20} className="text-pastel-orange" />
            </div>
            <div>
              <p className="font-medium text-dark-grey">{order.deliveryPerson}</p>
              <div className="flex items-center gap-1">
                <Phone size={14} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{order.contact}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <MapPin size={16} className="text-muted-foreground" />
            <span className="text-sm">Tracking your order</span>
          </div>

          <div className="bg-white rounded p-3">
            <p className="text-sm font-medium text-dark-grey">Estimated Delivery: {estimatedTime} mins</p>
            <div className="w-full h-2 bg-light-grey rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-pastel-orange transition-all duration-500"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="px-4 py-2 border-t border-border">
        <h2 className="font-medium text-dark-grey mb-3">Order Summary</h2>
        <div className="flex flex-col gap-2">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm text-dark-grey">{item.quantity}x</span>
                <span className="text-sm text-dark-grey">{item.name}</span>
              </div>
              <span className="text-sm font-medium text-dark-grey">{item.price}</span>
            </div>
          ))}

          <div className="border-t border-border mt-2 pt-2 flex justify-between items-center">
            <span className="font-medium text-dark-grey">Total</span>
            <span className="font-bold text-dark-grey">{order.total}</span>
          </div>
        </div>
      </div>

      {/* Track Button */}
      <div className="sticky bottom-0 bg-white border-t border-border p-4 mt-auto">
        <Button className="w-full bg-pastel-orange text-white h-12 text-base">Track Delivery</Button>
      </div>
    </main>
  )
}

