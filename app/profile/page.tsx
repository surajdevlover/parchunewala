"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, User, MapPin, ShoppingBag, Clock, LogOut, Heart, Settings, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfileScreen() {
  const [user, setUser] = useState({
    name: "Rahul Kumar",
    phone: "+91 9876543210",
    email: "rahul.kumar@example.com",
  })
  
  const [addresses, setAddresses] = useState([
    {
      id: "1",
      type: "Home",
      address: "123, Sector 44, Noida, Uttar Pradesh - 201301",
      isDefault: true
    },
    {
      id: "2",
      type: "Office",
      address: "Block B, Sector 62, Noida, Uttar Pradesh - 201309",
      isDefault: false
    }
  ])
  
  const [orders, setOrders] = useState([
    {
      id: "ORD123456",
      date: "12 Jun, 2023",
      totalItems: 8,
      amount: "₹658",
      status: "Delivered",
      storeName: "Satish General Store"
    },
    {
      id: "ORD123123",
      date: "5 Jun, 2023",
      totalItems: 5,
      amount: "₹420",
      status: "Delivered",
      storeName: "Pandit General Store"
    },
    {
      id: "ORD122456",
      date: "25 May, 2023",
      totalItems: 3,
      amount: "₹210",
      status: "Delivered",
      storeName: "Anuj Kirana Store"
    }
  ])

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
            <h1 className="text-lg font-medium text-dark-grey">My Account</h1>
          </div>
          
          <Link href="/settings">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Settings size={20} className="text-gray-600" />
            </Button>
          </Link>
        </div>
      </header>

      <div className="container max-w-3xl mx-auto px-4 py-6">
        {/* User Profile Card */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm mb-6">
          <div className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-pastel-orange">
                <AvatarImage src="" alt={user.name} />
                <AvatarFallback className="bg-pastel-orange/10 text-pastel-orange text-xl">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">{user.name}</h2>
                    <p className="text-gray-500 text-sm">{user.phone}</p>
                    <p className="text-gray-500 text-sm">{user.email}</p>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1 border-pastel-orange text-pastel-orange hover:bg-pastel-orange/10"
                  >
                    <Edit size={14} />
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs for different sections */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-6 bg-white rounded-lg p-1">
            <TabsTrigger value="orders" className="data-[state=active]:bg-pastel-orange data-[state=active]:text-white">Orders</TabsTrigger>
            <TabsTrigger value="addresses" className="data-[state=active]:bg-pastel-orange data-[state=active]:text-white">Addresses</TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-pastel-orange data-[state=active]:text-white">Settings</TabsTrigger>
          </TabsList>
          
          {/* Orders Tab */}
          <TabsContent value="orders" className="mt-0">
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <ShoppingBag size={16} className="text-pastel-orange" />
                          <h3 className="font-medium">{order.id}</h3>
                        </div>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-blue-100 text-blue-600'
                      }`}>
                        {order.status}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex flex-col">
                        <span className="text-gray-500">Store</span>
                        <span className="font-medium">{order.storeName}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-gray-500">Items</span>
                        <span className="font-medium">{order.totalItems}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-gray-500">Amount</span>
                        <span className="font-medium">{order.amount}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t flex justify-end">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-pastel-orange border-pastel-orange hover:bg-pastel-orange/10"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                <p className="text-gray-500 mb-4">Once you place your first order, it will appear here</p>
                <Link href="/home">
                  <Button className="bg-pastel-orange text-white">Start Shopping</Button>
                </Link>
              </div>
            )}
          </TabsContent>
          
          {/* Addresses Tab */}
          <TabsContent value="addresses" className="mt-0">
            <div className="space-y-4">
              {addresses.map(address => (
                <div key={address.id} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between">
                    <div className="flex items-start gap-3">
                      <MapPin size={20} className="text-pastel-orange flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{address.type}</h3>
                          {address.isDefault && (
                            <span className="bg-pastel-orange/10 text-pastel-orange px-2 py-0.5 text-xs rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{address.address}</p>
                      </div>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 text-gray-500 hover:text-pastel-orange"
                    >
                      <Edit size={16} />
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button 
                className="w-full bg-white text-pastel-orange border border-dashed border-pastel-orange hover:bg-pastel-orange/5"
              >
                + Add New Address
              </Button>
            </div>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings" className="mt-0">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="divide-y">
                <Link href="/profile/wishlist" className="flex items-center justify-between p-4 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Heart size={20} className="text-pastel-orange" />
                    <span>Wishlist</span>
                  </div>
                  <ArrowLeft size={16} className="rotate-180 text-gray-400" />
                </Link>
                
                <Link href="/profile/help" className="flex items-center justify-between p-4 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Clock size={20} className="text-pastel-orange" />
                    <span>Order History</span>
                  </div>
                  <ArrowLeft size={16} className="rotate-180 text-gray-400" />
                </Link>
                
                <Link href="/profile/help" className="flex items-center justify-between p-4 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <User size={20} className="text-pastel-orange" />
                    <span>Account Details</span>
                  </div>
                  <ArrowLeft size={16} className="rotate-180 text-gray-400" />
                </Link>
                
                <div className="p-4">
                  <Button 
                    variant="outline" 
                    className="w-full text-red-500 border-red-200 hover:bg-red-50"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
} 