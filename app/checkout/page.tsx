"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, Home, Briefcase, MapPin, Check, CreditCard, Phone, Wallet, Clock, Plus, Tag } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SharedHeader } from "@/components/shared-header"

export default function CheckoutPage() {
  const router = useRouter()
  const { cartItems, cartTotal, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [deliveryOption, setDeliveryOption] = useState<'standard' | 'express'>('standard')
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod'>('online')
  const [loading, setLoading] = useState(false)
  
  // Auto-authenticate on page load if needed
  // This ensures the checkout page is always accessible
  useEffect(() => {
    // Ensure user is authenticated
    const userData = localStorage.getItem('user_data');
    const authState = localStorage.getItem('auth_state');
    
    if (!userData || authState !== 'authenticated') {
      console.log("Auto-authenticating on checkout page");
      // Create a guest user
      const guestUser = {
        id: 'guest-checkout-' + Date.now(),
        name: 'Guest Checkout',
        email: 'guest-checkout@example.com',
        avatar: ''
      };
      localStorage.setItem('user_data', JSON.stringify(guestUser));
      localStorage.setItem('auth_state', 'authenticated');
      localStorage.setItem('isLoggedIn', 'true');
    }
    
    // Clear any modal flags
    sessionStorage.removeItem('has_shown_login_modal');
  }, []);
  
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
      const price = typeof item.product.price === 'string' 
        ? parseFloat(item.product.price.replace('₹', '')) 
        : item.product.price;
      return sum + (price * item.quantity)
    }, 0)
  }
  
  const calculateDeliveryFee = () => {
    // If using express delivery, charge ₹30 regardless of subtotal
    if (deliveryOption === 'express') {
      return 30;
    }
    
    // For standard delivery, free if total purchase is above ₹199
    const subtotal = calculateSubtotal();
    return subtotal >= 199 ? 0 : 15;
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
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  }
  
  // Sample cart items data
  const sampleCartItems = [
    {
      id: "p1",
      name: "Basmati Rice Premium",
      image: "/images/products/basmati-rice.jpg",
      price: 149,
      quantity: 2,
      weight: "1 kg"
    },
    {
      id: "p23",
      name: "Dark Chocolate Bar",
      image: "/images/products/chocolate.jpg",
      price: 120,
      quantity: 1,
      weight: "100 g"
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <SharedHeader title="Checkout" showBackButton={true} />
      
      <div className="container mx-auto px-4 py-6">
        {/* Step indicator */}
        {step < 4 && (
          <div className="mb-6">
            <div className="flex items-center justify-between max-w-xl mx-auto">
              <div className={`flex flex-col items-center ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                  1
                </div>
                <span className="text-xs">Address</span>
              </div>
              
              <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`} />
              
              <div className={`flex flex-col items-center ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                  2
                </div>
                <span className="text-xs">Payment</span>
              </div>
              
              <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`} />
              
              <div className={`flex flex-col items-center ${step >= 3 ? 'text-primary' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                  3
                </div>
                <span className="text-xs">Review</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Content based on step */}
        {step === 1 && (
          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="md:col-span-2">
              <motion.div 
                className="bg-white rounded-lg shadow-sm p-4 mb-6"
                variants={itemVariants}
              >
                <h2 className="text-lg font-medium mb-4">Delivery Address</h2>
                
                <RadioGroup 
                  value={selectedAddress.id} 
                  onValueChange={(value) => setSelectedAddress(addresses.find(a => a.id === value) || addresses[0])}
                  className="space-y-4"
                >
                  {addresses.map(address => (
                    <div 
                      key={address.id} 
                      className={`border rounded-lg p-4 transition-colors ${selectedAddress.id === address.id ? 'border-primary' : 'border-gray-200'}`}
                    >
                      <div className="flex gap-2">
                        <RadioGroupItem id={address.id} value={address.id} />
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <Label htmlFor={address.id} className="font-medium">
                              {address.name}
                            </Label>
                            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                              {address.type}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {address.address}, {address.city}, {address.pincode}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {address.isDefault && (
                              <Badge variant="outline" className="text-[10px] px-1 py-0">Default</Badge>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4 border-dashed"
                  onClick={() => { /* Would open address form */ }}
                >
                  <Plus size={16} className="mr-2" />
                  Add New Address
                </Button>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-lg shadow-sm p-4 mb-6"
                variants={itemVariants}
              >
                <h2 className="text-lg font-medium mb-4">Delivery Time</h2>
                
                <RadioGroup 
                  defaultValue="standard"
                  value={deliveryOption}
                  onValueChange={(value) => setDeliveryOption(value as 'standard' | 'express')}
                  className="space-y-3"
                >
                  <div className="border rounded-lg p-3">
                    <div className="flex gap-2">
                      <RadioGroupItem id="standard" value="standard" />
                      <div className="flex-1">
                        <Label htmlFor="standard" className="font-medium flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-primary" />
                          Standard Delivery (30-45 min)
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">
                          Your order will be delivered within 30-45 minutes
                        </p>
                      </div>
                      <div className="text-green-600 font-medium">
                        Free
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                    <div className="flex gap-2">
                      <RadioGroupItem id="express" value="express" />
                      <div className="flex-1">
                        <Label htmlFor="express" className="font-medium flex items-center text-gray-400">
                          <Clock className="h-4 w-4 mr-2" />
                          Express Delivery (15-20 min)
                        </Label>
                        <p className="text-sm text-gray-400 mt-1">
                          Additional ₹30
                        </p>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </motion.div>
            </div>
            
            <div className="md:col-span-1">
              <OrderSummary 
                items={cartItems}
                subtotal={calculateSubtotal()}
                deliveryFee={calculateDeliveryFee()}
                total={calculateTotal()}
                storeGroups={storeGroups}
              />
              
              <motion.div variants={itemVariants}>
                <Button 
                  className="w-full mt-4"
                  onClick={() => setStep(2)}
                >
                  Continue to Payment
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
        
        {step === 2 && (
          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="md:col-span-2">
              <motion.div 
                className="bg-white rounded-lg shadow-sm p-4 mb-6"
                variants={itemVariants}
              >
                <h2 className="text-lg font-medium mb-4">Payment Method</h2>
                
                <Tabs defaultValue="online" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="online">Online Payment</TabsTrigger>
                    <TabsTrigger value="cod">Cash on Delivery</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="online" className="space-y-4">
                    <RadioGroup 
                      defaultValue="upi"
                      className="space-y-3"
                    >
                      <div className="border rounded-lg p-3">
                        <div className="flex gap-2">
                          <RadioGroupItem id="upi" value="upi" />
                          <div className="flex-1">
                            <Label htmlFor="upi" className="font-medium">
                              UPI
                            </Label>
                            <p className="text-sm text-gray-600 mt-1">
                              Pay using UPI apps like Google Pay, PhonePe, etc.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-3">
                        <div className="flex gap-2">
                          <RadioGroupItem id="card" value="card" />
                          <div className="flex-1">
                            <Label htmlFor="card" className="font-medium">
                              Credit/Debit Card
                            </Label>
                            <p className="text-sm text-gray-600 mt-1">
                              Pay using Visa, Mastercard, RuPay or any other card
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-3">
                        <div className="flex gap-2">
                          <RadioGroupItem id="netbanking" value="netbanking" />
                          <div className="flex-1">
                            <Label htmlFor="netbanking" className="font-medium">
                              Net Banking
                            </Label>
                            <p className="text-sm text-gray-600 mt-1">
                              Pay through your bank account
                            </p>
                          </div>
                        </div>
                      </div>
                    </RadioGroup>
                  </TabsContent>
                  
                  <TabsContent value="cod">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Wallet className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Cash on Delivery</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Pay with cash when your order is delivered.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>
            
            <div className="md:col-span-1">
              <OrderSummary 
                items={cartItems}
                subtotal={calculateSubtotal()}
                deliveryFee={calculateDeliveryFee()}
                total={calculateTotal()}
                storeGroups={storeGroups}
              />
              
              <motion.div 
                className="flex flex-col gap-3 mt-4"
                variants={itemVariants}
              >
                <Button 
                  className="w-full"
                  onClick={() => setStep(3)}
                >
                  Review Order
                </Button>
                
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => setStep(1)}
                >
                  Back to Address
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
        
        {step === 3 && (
          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="md:col-span-2">
              <motion.div 
                className="bg-white rounded-lg shadow-sm p-4 mb-6"
                variants={itemVariants}
              >
                <h2 className="text-lg font-medium mb-4">Order Details</h2>
                
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <div key={item.product.id} className="flex gap-3 border-b pb-4">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image 
                          src={item.product.image || ""} 
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-sm">{item.product.name}</h3>
                        <div className="text-xs text-gray-500">
                          {item.product.quantity} · 1 pc
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">₹{item.product.price} × {item.quantity}</span>
                          <span className="font-medium">₹{+item.product.price * item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                className="grid md:grid-cols-2 gap-4 mb-6"
                variants={itemVariants}
              >
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-primary" />
                    Delivery Address
                  </h3>
                  
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">
                      {selectedAddress.name}
                    </p>
                    <p>
                      {selectedAddress.address}, {selectedAddress.city}, {selectedAddress.pincode}
                    </p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    Delivery Time
                  </h3>
                  
                  <div className="text-sm text-gray-600">
                    <p>
                      {getCurrentTime()} - {getDeliveryTime()}
                    </p>
                    <p className="mt-1">
                      {deliveryOption === 'express' ? 'Express delivery (15-20 min)' : 'Standard delivery (30-45 min)'}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="md:col-span-1">
              <OrderSummary 
                items={cartItems}
                subtotal={calculateSubtotal()}
                deliveryFee={calculateDeliveryFee()}
                total={calculateTotal()}
                showItems={false}
                storeGroups={storeGroups}
              />
              
              <motion.div 
                className="flex flex-col gap-3 mt-4"
                variants={itemVariants}
              >
                <Button 
                  className="w-full"
                  onClick={handlePlaceOrder}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Place Order"}
                </Button>
                
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => setStep(2)}
                  disabled={loading}
                >
                  Back to Payment
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
        
        {step === 4 && (
          <motion.div
            className="max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={24} className="text-green-600" />
              </div>
              
              <h2 className="text-xl font-semibold mb-2">Order Placed Successfully!</h2>
              <p className="text-gray-600 mb-6">
                Your order has been placed successfully and will be delivered within 15-30 minutes.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Order ID</span>
                  <span className="font-medium">#ORD12345678</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Delivery</span>
                  <span className="font-medium">15-30 minutes</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <Button 
                  onClick={() => router.push('/orders')}
                >
                  Track Order
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => router.push('/')}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Trust indicators */}
      <div className="bg-white border-t mt-8 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-2">
              <Check size={16} className="text-primary" />
              <span className="text-sm">Secure Payment</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Home size={16} className="text-primary" />
              <span className="text-sm">Fast Delivery</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-primary" />
              <span className="text-sm">Quick 15-30 min Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Order summary component
function OrderSummary({ 
  items, 
  subtotal, 
  deliveryFee, 
  total,
  showItems = true,
  storeGroups = {},
}: { 
  items: any[]; 
  subtotal: number; 
  deliveryFee: number; 
  total: number;
  showItems?: boolean;
  storeGroups?: Record<string, any[]>;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sticky top-20">
      <h2 className="text-lg font-medium mb-4">Order Summary</h2>
      
      {/* Free Delivery Offer */}
      <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-3">
        <div className="flex items-start gap-2">
          <div className="rounded-full bg-green-100 p-1.5 flex-shrink-0">
            <Tag className="h-4 w-4 text-green-600" />
          </div>
          <div>
            <h3 className="font-medium text-sm text-green-800">Free Delivery Offer</h3>
            <p className="text-xs text-green-700 mt-0.5">
              Get free delivery on orders above ₹199 from each store!
            </p>
            {Object.entries(storeGroups).map(([storeId, items]) => {
              const storeSubtotal = items.reduce((sum: number, item: any) => {
                const price = parseFloat(item.product.price.replace('₹', ''));
                return sum + (price * item.quantity);
              }, 0);
              
              const storeFirstItem = items[0];
              const storeName = storeFirstItem?.storeName || `Store ${storeId}`;
              
              return (
                <div key={storeId} className="mt-1.5 text-xs border-t border-green-200 pt-1">
                  <span className="font-medium">{storeName}:</span> {
                    storeSubtotal >= 199 
                      ? <span className="text-green-700">You qualify for free delivery!</span>
                      : <span>Add ₹{(199 - storeSubtotal).toFixed(0)} more for free delivery</span>
                  }
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {showItems && (
        <div className="space-y-3 mb-4 max-h-56 overflow-y-auto">
          {items.map(item => (
            <div key={item.product.id} className="flex gap-2">
              <div className="relative h-12 w-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                <Image 
                  src={item.product.image || ""} 
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="text-sm font-medium line-clamp-1">{item.product.name}</h3>
                <div className="flex justify-between items-center mt-0.5">
                  <span className="text-xs text-gray-500">{item.quantity} × ₹{item.product.price}</span>
                  <span className="text-sm font-medium">₹{Number(item.product.price) * item.quantity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="space-y-2 pt-3 border-t">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Delivery Fee</span>
          <span className="text-green-600">₹{deliveryFee}</span>
        </div>
        
        <div className="flex justify-between font-medium text-lg pt-2 border-t mt-2">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>
    </div>
  );
} 