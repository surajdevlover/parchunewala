"use client"

import { Logo } from "@/components/logo"
import Image from "next/image"
import { ShoppingBag, FastForward, Star, Truck } from "lucide-react"

export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="flex flex-col items-center gap-8 max-w-md w-full text-center">
        {/* Logo */}
        <div className="mb-8 relative">
          <Logo size="xl" className="relative z-10" />
        </div>
        
        {/* Hero shimmer */}
        <div className="w-full h-40 rounded-2xl bg-gradient-to-r from-gray-200 via-white/20 to-gray-200 bg-[length:400%_100%] animate-shimmer mb-8"></div>
        
        {/* Categories shimmer */}
        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <div className="h-6 w-36 rounded-md bg-gradient-to-r from-gray-200 via-white/20 to-gray-200 bg-[length:400%_100%] animate-shimmer"></div>
            <div className="h-5 w-16 rounded-md bg-gradient-to-r from-gray-200 via-white/20 to-gray-200 bg-[length:400%_100%] animate-shimmer"></div>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-200 via-white/20 to-gray-200 bg-[length:400%_100%] animate-shimmer mb-2"></div>
                <div className="h-4 w-16 rounded-md bg-gradient-to-r from-gray-200 via-white/20 to-gray-200 bg-[length:400%_100%] animate-shimmer mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Featured products shimmer */}
        <div className="w-full mt-4">
          <div className="flex justify-between items-center mb-4">
            <div className="h-6 w-40 rounded-md bg-gradient-to-r from-gray-200 via-white/20 to-gray-200 bg-[length:400%_100%] animate-shimmer"></div>
            <div className="h-5 w-16 rounded-md bg-gradient-to-r from-gray-200 via-white/20 to-gray-200 bg-[length:400%_100%] animate-shimmer"></div>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col bg-white rounded-xl p-3 shadow-sm">
                <div className="w-full h-32 rounded-lg bg-gradient-to-r from-gray-200 via-white/20 to-gray-200 bg-[length:400%_100%] animate-shimmer mb-3"></div>
                <div className="h-5 w-3/4 rounded-md bg-gradient-to-r from-gray-200 via-white/20 to-gray-200 bg-[length:400%_100%] animate-shimmer mb-2"></div>
                <div className="h-4 w-1/2 rounded-md bg-gradient-to-r from-gray-200 via-white/20 to-gray-200 bg-[length:400%_100%] animate-shimmer mb-2"></div>
                <div className="flex justify-between items-center mt-1">
                  <div className="h-5 w-16 rounded-md bg-gradient-to-r from-gray-200 via-white/20 to-gray-200 bg-[length:400%_100%] animate-shimmer"></div>
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-gray-200 via-white/20 to-gray-200 bg-[length:400%_100%] animate-shimmer"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Features shimmer */}
        <div className="w-full mt-4">
          <div className="grid grid-cols-2 gap-4 w-full">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-200 via-white/20 to-gray-200 bg-[length:400%_100%] animate-shimmer mr-2"></div>
                <div className="h-4 w-24 rounded-md bg-gradient-to-r from-gray-200 via-white/20 to-gray-200 bg-[length:400%_100%] animate-shimmer"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom navigation shimmer */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3">
          <div className="flex justify-around items-center">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-md bg-gradient-to-r from-gray-200 via-white/20 to-gray-200 bg-[length:400%_100%] animate-shimmer mb-1"></div>
                <div className="h-3 w-12 rounded-md bg-gradient-to-r from-gray-200 via-white/20 to-gray-200 bg-[length:400%_100%] animate-shimmer"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

