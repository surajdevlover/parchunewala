"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, Home, Briefcase, MapPin, Check, CreditCard, Phone, Wallet, Clock, Plus } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default function CheckoutPage() {
  const router = useRouter()
  const { cartItems, cartTotal, clearCart } = useCart()
  const [step, setStep] = useState<'address' | 'payment' | 'summary'>('address')
  const [deliveryOption, setDeliveryOption] = useState<'standard' | 'express'>('standard')
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod'>('online')
  const [loading, setLoading] = useState(false)
  
  // Sample addresses
  const addresses = [
    { 
      id: '1', 
      type: 'home', 
      name: 'Home', 
      address: '123 Main St, Sector 44', 
      city: 'Noida', 
      pincode: '201301',
      isDefault: true
    },
    { 
      id: '2', 
      type: 'work', 
      name: 'Office', 
      address: 'Building 5, Sector 132', 
      city: 'Noida', 
      pincode: '201304',
      isDefault: false
    }
  ]
  
  const [selectedAddress, setSelectedAddress] = useState(addresses[0])
  
  // Delivery time calculations
  const getCurrentTime = () => {
    const now = new Date()
    return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  }
  
  const getDeliveryTime = () => {
    const now = new Date()
    const deliveryMinutes = deliveryOption === 'express' ? 20 : 40
    now.setMinutes(now.getMinutes() + deliveryMinutes)
    return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  }
  
  // Group cart items by store
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
  
  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      const price = parseFloat(item.product.price.replace('₹', ''))
      return sum + (price * item.quantity)
    }, 0)
  }
  
  const calculateDeliveryFee = () => {
    return deliveryOption === 'express' ? 30 : 15
  }
  
  const calculateTotal = () => {
    return calculateSubtotal() + calculateDeliveryFee()
  }
  
  const handlePlaceOrder = () => {
    setLoading(true)
    
    // Simulate order processing
    setTimeout(() => {
      clearCart()
      router.push('/order-confirmation')
    }, 1500)
  }
  
  const renderAddressSelection = () => (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Delivery Address</h2>
      
      <div className="space-y-3">
        {addresses.map((address) => (
          <div 
            key={address.id}
            className={`border rounded-lg p-3 ${
              selectedAddress.id === address.id ? 'border-pastel-orange bg-pastel-orange/5' : 'border-gray-200'
            }`}
            onClick={() => setSelectedAddress(address)}
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-2">
                <div className={`p-1.5 rounded-full ${
                  address.type === 'home' ? 'bg-blue-100' : 'bg-purple-100'
                }`}>
                  {address.type === 'home' ? 
                    <Home size={16} className="text-blue-600" /> : 
                    <Briefcase size={16} className="text-purple-600" />
                  }
                </div>
                
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-sm">{address.name}</h3>
                    {address.isDefault && (
                      <Badge variant="outline" className="text-[10px] px-1 py-0">Default</Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600">{address.address}</p>
                  <p className="text-sm text-gray-600">{address.city}, {address.pincode}</p>
                </div>
              </div>
              
              {selectedAddress.id === address.id && (
                <div className="h-5 w-5 bg-pastel-orange rounded-full flex items-center justify-center">
                  <Check size={12} className="text-white" />
                </div>
              )}
            </div>
          </div>
        ))}
        
        <Button 
          variant="outline" 
          className="w-full border-dashed border-gray-300 py-6"
          onClick={() => { /* Would open address form */ }}
        >
          <Plus size={16} className="mr-2" />
          Add New Address
        </Button>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Delivery Options</h3>
        <RadioGroup 
          defaultValue="standard" 
          value={deliveryOption}
          onValueChange={(value) => setDeliveryOption(value as 'standard' | 'express')}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2 border rounded-lg p-3">
            <RadioGroupItem value="standard" id="standard" />
            <Label htmlFor="standard" className="flex-1">
              <div className="flex justify-between w-full">
                <span>Standard Delivery</span>
                <span className="font-medium">₹15</span>
              </div>
              <p className="text-xs text-gray-500">Delivered in 30-45 minutes</p>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 border rounded-lg p-3">
            <RadioGroupItem value="express" id="express" />
            <Label htmlFor="express" className="flex-1">
              <div className="flex justify-between w-full">
                <span className="text-pastel-orange font-medium">Express Delivery</span>
                <span className="font-medium">₹30</span>
              </div>
              <p className="text-xs text-gray-500">Delivered in 15-20 minutes</p>
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      <Button 
        className="w-full bg-pastel-orange text-white mt-6"
        onClick={() => setStep('payment')}
      >
        Proceed to Payment
      </Button>
    </div>
  )
  
  const renderPaymentMethods = () => (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Payment Method</h2>
      
      <RadioGroup 
        defaultValue="online" 
        value={paymentMethod}
        onValueChange={(value) => setPaymentMethod(value as 'online' | 'cod')}
        className="space-y-3"
      >
        <div className="flex items-center space-x-2 border rounded-lg p-3">
          <RadioGroupItem value="online" id="online" />
          <Label htmlFor="online" className="flex items-center gap-2 flex-1">
            <div className="bg-blue-100 p-1.5 rounded-full">
              <CreditCard size={16} className="text-blue-600" />
            </div>
            <div>
              <span>Online Payment</span>
              <p className="text-xs text-gray-500">UPI, Credit/Debit cards, Wallets</p>
            </div>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 border rounded-lg p-3">
          <RadioGroupItem value="cod" id="cod" />
          <Label htmlFor="cod" className="flex items-center gap-2 flex-1">
            <div className="bg-green-100 p-1.5 rounded-full">
              <Wallet size={16} className="text-green-600" />
            </div>
            <span>Cash on Delivery</span>
          </Label>
        </div>
      </RadioGroup>
      
      <div className="pt-4 border-t mt-6">
        <h3 className="text-sm font-medium mb-3">Order Summary</h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>₹{calculateSubtotal()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery Fee</span>
            <span>₹{calculateDeliveryFee()}</span>
          </div>
          <div className="flex justify-between font-medium pt-2 border-t">
            <span>Total</span>
            <span>₹{calculateTotal()}</span>
          </div>
        </div>
      </div>
      
      <div className="flex gap-3 mt-6">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => setStep('address')}
        >
          Back
        </Button>
        <Button 
          className="flex-1 bg-pastel-orange text-white"
          onClick={() => setStep('summary')}
        >
          Review Order
        </Button>
      </div>
    </div>
  )
  
  const renderOrderSummary = () => (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Order Summary</h2>
      
      <div className="bg-gray-50 rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-500" />
            <span className="font-medium text-sm">Delivery Address</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 text-pastel-orange"
            onClick={() => setStep('address')}
          >
            Change
          </Button>
        </div>
        <p className="text-sm text-gray-600">{selectedAddress.address}</p>
        <p className="text-sm text-gray-600">{selectedAddress.city}, {selectedAddress.pincode}</p>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gray-500" />
            <span className="font-medium text-sm">Delivery Time</span>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          {getCurrentTime()} - {getDeliveryTime()}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {deliveryOption === 'express' ? 'Express delivery (15-20 min)' : 'Standard delivery (30-45 min)'}
        </p>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <CreditCard size={16} className="text-gray-500" />
            <span className="font-medium text-sm">Payment Method</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 text-pastel-orange"
            onClick={() => setStep('payment')}
          >
            Change
          </Button>
        </div>
        <p className="text-sm text-gray-600">
          {paymentMethod === 'online' ? 'Online Payment' : 'Cash on Delivery'}
        </p>
      </div>
      
      <div className="border rounded-lg divide-y">
        <div className="p-3">
          <h3 className="font-medium text-sm mb-3">Items ({cartItems.length})</h3>
          
          <div className="space-y-3">
            {Object.entries(storeGroups).map(([storeId, items]) => (
              <div key={storeId}>
                <p className="text-xs text-gray-500 mb-2">{items[0].storeName}</p>
                
                {items.map(item => (
                  <div key={item.product.id} className="flex gap-2 py-1">
                    <div className="relative w-10 h-10 rounded overflow-hidden flex-shrink-0">
                      <Image 
                        src={item.product.image || ""} 
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm line-clamp-1">{item.product.name}</p>
                        <p className="text-sm font-medium">{item.product.price}</p>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{item.product.quantity} × {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-3">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>₹{calculateSubtotal()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Fee</span>
              <span>₹{calculateDeliveryFee()}</span>
            </div>
            <div className="flex justify-between font-medium pt-2 border-t">
              <span>Total</span>
              <span>₹{calculateTotal()}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-3 mt-6">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => setStep('payment')}
        >
          Back
        </Button>
        <Button 
          className="flex-1 bg-pastel-orange text-white"
          onClick={handlePlaceOrder}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Place Order'}
        </Button>
      </div>
    </div>
  )
  
  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9"
              onClick={() => {
                if (step === 'address') {
                  router.push('/cart')
                } else if (step === 'payment') {
                  setStep('address')
                } else {
                  setStep('payment')
                }
              }}
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-lg font-medium text-dark-grey">
              {step === 'address' ? 'Delivery Details' : 
               step === 'payment' ? 'Payment' : 'Order Summary'}
            </h1>
          </div>
        </div>
      </header>

      <div className="container max-w-md mx-auto px-4 py-6">
        <div className="flex justify-between mb-6 text-sm">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 'address' || step === 'payment' || step === 'summary' 
                ? 'bg-pastel-orange text-white' 
                : 'bg-gray-200 text-gray-500'
            }`}>
              1
            </div>
            <span className={`mt-1 ${step === 'address' ? 'text-pastel-orange font-medium' : 'text-gray-500'}`}>
              Address
            </span>
          </div>
          
          <div className="w-full max-w-[60px] flex items-center justify-center">
            <div className={`h-0.5 w-full ${
              step === 'payment' || step === 'summary' ? 'bg-pastel-orange' : 'bg-gray-200'
            }`} />
          </div>
          
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 'payment' || step === 'summary' 
                ? 'bg-pastel-orange text-white' 
                : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
            <span className={`mt-1 ${step === 'payment' ? 'text-pastel-orange font-medium' : 'text-gray-500'}`}>
              Payment
            </span>
          </div>
          
          <div className="w-full max-w-[60px] flex items-center justify-center">
            <div className={`h-0.5 w-full ${step === 'summary' ? 'bg-pastel-orange' : 'bg-gray-200'}`} />
          </div>
          
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 'summary' 
                ? 'bg-pastel-orange text-white' 
                : 'bg-gray-200 text-gray-500'
            }`}>
              3
            </div>
            <span className={`mt-1 ${step === 'summary' ? 'text-pastel-orange font-medium' : 'text-gray-500'}`}>
              Summary
            </span>
          </div>
        </div>
        
        {step === 'address' && renderAddressSelection()}
        {step === 'payment' && renderPaymentMethods()}
        {step === 'summary' && renderOrderSummary()}
      </div>
    </main>
  )
} 