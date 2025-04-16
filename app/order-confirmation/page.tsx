"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { 
  Check, 
  ChevronRight, 
  Clock, 
  MapPin, 
  Phone, 
  Receipt, 
  User, 
  CheckCircle,
  Truck,
  Package,
  Home,
  MessageCircle,
  Navigation,
  Store
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function OrderConfirmationPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(0)
  const [estimatedTime, setEstimatedTime] = useState(20)
  const [selectedTab, setSelectedTab] = useState("live")
  const [deliveryCoordinates, setDeliveryCoordinates] = useState({ lat: 28.536, lng: 77.265 })
  
  useEffect(() => {
    // Simulate order progress
    const interval = setInterval(() => {
      if (currentStep < 4) {
        setCurrentStep(prev => {
          const nextStep = prev + 1
          setProgress((nextStep - 1) * 33.33)
          return nextStep
        })
        
        setEstimatedTime(prev => Math.max(5, prev - 5))
        
        // Simulate delivery movement on map
        setDeliveryCoordinates(prev => ({
          lat: prev.lat + 0.002,
          lng: prev.lng + 0.003
        }))
      } else {
        clearInterval(interval)
      }
    }, 10000) // Every 10 seconds for demo
    
    return () => clearInterval(interval)
  }, [])
  
  // Mock order data
  const order = {
    id: "OD" + Math.floor(10000000 + Math.random() * 90000000),
    items: [
      { id: 1, name: "Fresh Vegetables Basket", quantity: 1, price: "₹199" },
      { id: 2, name: "Whole Grain Bread", quantity: 2, price: "₹35" }
    ],
    total: "₹269",
    deliveryFee: "₹15",
    subtotal: "₹254",
    paymentMethod: "Online Payment",
    deliveryAddress: "123 Main St, Sector 44, Noida, 201301",
    deliveryTime: new Date().toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    }),
    storeName: "Quick Grocery Store",
    storeAddress: "Shop 12, Market Complex, Sector 18, Noida"
  }
  
  const steps = [
    { 
      id: 1, 
      title: "Order Confirmed", 
      description: "Your order has been received",
      icon: <CheckCircle className="h-6 w-6 text-white" />,
      time: "Just now",
      location: "At store"
    },
    { 
      id: 2, 
      title: "Order Processed", 
      description: "Your items are being packed",
      icon: <Package className="h-6 w-6 text-white" />,
      time: "In 5 mins",
      location: "At store"
    },
    { 
      id: 3, 
      title: "Out for Delivery", 
      description: "Your order is on the way",
      icon: <Truck className="h-6 w-6 text-white" />,
      time: "In 10 mins",
      location: "3.2 km away"
    },
    { 
      id: 4, 
      title: "Delivered", 
      description: "Enjoy your items!",
      icon: <Home className="h-6 w-6 text-white" />,
      time: "In 20 mins",
      location: "Your location"
    }
  ]

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/home">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <ChevronRight className="h-5 w-5 rotate-180" />
              </Button>
            </Link>
            <h1 className="text-lg font-medium text-dark-grey">Live Order Tracking</h1>
          </div>
          <Button 
            variant="outline"
            size="sm"
            onClick={() => router.push("/orders")}
          >
            My Orders
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 flex flex-col h-full">
        {/* Order Status Banner */}
        <div className="bg-pastel-orange text-white rounded-lg p-4 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="font-medium text-lg">Delivery in progress</h2>
              <p className="text-sm opacity-90">Order #{order.id}</p>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span className="text-sm font-medium">
                {estimatedTime} min
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mt-4">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <User size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-white">Rahul D.</h3>
              <p className="text-xs text-white/80">Your delivery partner</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 text-white"
            >
              <Phone size={18} />
            </Button>
          </div>
        </div>
        
        {/* Delivery Tracking Tabs */}
        <div className="bg-white rounded-lg border mb-6 overflow-hidden">
          <Tabs defaultValue="live" className="w-full" onValueChange={setSelectedTab}>
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="live">Live Tracking</TabsTrigger>
              <TabsTrigger value="details">Order Details</TabsTrigger>
            </TabsList>
            
            <TabsContent value="live" className="p-0">
              {/* Swiggy-style Map with Markers */}
              <div className="relative h-64 bg-gray-100">
                <Image 
                  src="/map-placeholder.jpg" 
                  alt="Delivery Map"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/600x300?text=Delivery+Map"
                  }}
                />
                
                {/* Store marker */}
                <div className="absolute left-1/4 top-1/3 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="h-8 w-8 rounded-full bg-white shadow-md flex items-center justify-center">
                      <Store size={18} className="text-pastel-orange" />
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-xs shadow-md whitespace-nowrap mt-1">
                      Store
                    </div>
                  </div>
                </div>
                
                {/* Delivery person marker */}
                <div className="absolute" style={{
                  left: `${30 + (currentStep * 10)}%`, 
                  top: `${35 + (currentStep * 5)}%`, 
                  transform: 'translate(-50%, -50%)'
                }}>
                  <div className="relative animate-pulse">
                    <div className="h-10 w-10 rounded-full bg-pastel-orange flex items-center justify-center">
                      <Navigation size={20} className="text-white" />
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-xs shadow-md whitespace-nowrap mt-1">
                      Delivery Partner
                    </div>
                  </div>
                </div>
                
                {/* Destination marker */}
                <div className="absolute right-1/4 bottom-1/4 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="h-8 w-8 rounded-full bg-white shadow-md flex items-center justify-center">
                      <Home size={18} className="text-pastel-orange" />
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-xs shadow-md whitespace-nowrap mt-1">
                      Your location
                    </div>
                  </div>
                </div>
                
                {/* Delivery route line */}
                <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                  <path 
                    d={`M ${25}% ${33}% C ${25 + (currentStep * 8)}% ${33 + (currentStep * 3)}%, ${65 - (currentStep * 5)}% ${65 + (currentStep * 3)}%, ${75}% ${75}%`} 
                    stroke="rgba(255, 110, 64, 0.8)" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeDasharray="5,5" 
                    fill="none" 
                  />
                </svg>
              </div>
              
              {/* Current status */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex gap-4 items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-pastel-orange`}>
                    {steps[currentStep - 1].icon}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium">{steps[currentStep - 1].title}</h3>
                    <p className="text-sm text-gray-500">{steps[currentStep - 1].description}</p>
                    <div className="mt-1 flex items-center text-xs text-pastel-orange">
                      <MapPin size={12} className="mr-1" />
                      <span>{steps[currentStep - 1].location}</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1 h-8 rounded-full text-pastel-orange border-pastel-orange"
                  >
                    <MessageCircle size={14} />
                    <span>Chat</span>
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="details">
              {/* Order details */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 bg-pastel-orange/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Store size={18} className="text-pastel-orange" />
                  </div>
                  <div>
                    <h3 className="font-medium">{order.storeName}</h3>
                    <p className="text-xs text-gray-500">{order.storeAddress}</p>
                  </div>
                </div>
              </div>
              
              {/* Order items */}
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-medium mb-3">Your Order</h3>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-pastel-orange rounded-full"></div>
                        <span className="text-sm">{item.name} x{item.quantity}</span>
                      </div>
                      <span className="text-sm font-medium">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Payment details */}
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-medium mb-3">Bill Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{order.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className={order.deliveryFee === "₹0" || order.deliveryFee === "Free" ? "text-green-600 font-medium" : ""}>
                      {order.deliveryFee === "₹0" || order.deliveryFee === "Free" ? "FREE" : order.deliveryFee}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-green-600 mb-1">
                    <span>Free delivery on orders above ₹199!</span>
                  </div>
                  <div className="flex justify-between font-medium border-t border-gray-100 pt-2 mt-2">
                    <span>Total</span>
                    <span>{order.total}</span>
                  </div>
                </div>
              </div>
              
              {/* Delivery Address */}
              <div className="p-4">
                <h3 className="font-medium mb-2">Delivery Address</h3>
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="text-pastel-orange flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">{order.deliveryAddress}</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Progress Tracker */}
        <div className="bg-white rounded-lg border mb-6">
          <div className="p-4">
            <h3 className="font-medium mb-4">Order Progress</h3>
            
            <div className="relative">
              {/* Progress line */}
              <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-200"></div>
              
              {/* Progress fill */}
              <div 
                className="absolute left-4 top-2 w-0.5 bg-pastel-orange transition-all duration-500"
                style={{ height: `${progress}%` }}
              ></div>
              
              {/* Steps */}
              <div className="space-y-5">
                {steps.map((step) => (
                  <div key={step.id} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                      step.id <= currentStep ? 'bg-pastel-orange' : 'bg-gray-200'
                    }`}>
                      {step.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className={`font-medium ${
                          step.id <= currentStep ? 'text-gray-900' : 'text-gray-400'
                        }`}>
                          {step.title}
                        </h4>
                        <span className={`text-xs ${
                          step.id <= currentStep ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          {step.time}
                        </span>
                      </div>
                      <p className={`text-sm ${
                        step.id <= currentStep ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Support Actions */}
        <div className="bg-white rounded-lg border">
          <div className="grid grid-cols-2 divide-x divide-gray-100">
            <Button variant="ghost" className="py-4 h-auto">
              <Phone size={18} className="mr-2 text-pastel-orange" />
              <span>Call Support</span>
            </Button>
            <Button variant="ghost" className="py-4 h-auto">
              <MessageCircle size={18} className="mr-2 text-pastel-orange" />
              <span>Help Chat</span>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

