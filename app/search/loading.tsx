"use client"

import { useState, useEffect } from "react"
import { Logo } from "@/components/logo"
import Image from "next/image"
import { Search, Sparkles, Package, Store, MapPin, Zap } from "lucide-react"

export default function Loading() {
  const [progress, setProgress] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [animationPhase, setAnimationPhase] = useState(0)

  const searchTerms = [
    "fresh vegetables",
    "household essentials",
    "breakfast items",
    "snacks & beverages",
    "dairy products"
  ]

  const searchResults = [
    { icon: <Package className="h-6 w-6 text-pastel-orange" />, text: "Products" },
    { icon: <Store className="h-6 w-6 text-pastel-orange" />, text: "Stores" },
    { icon: <MapPin className="h-6 w-6 text-pastel-orange" />, text: "Locations" },
    { icon: <Sparkles className="h-6 w-6 text-pastel-orange" />, text: "Offers" }
  ]
  
  useEffect(() => {
    // Search term rotation
    const termInterval = setInterval(() => {
      setSearchTerm((prevIndex) => {
        const newIndex = (searchTerms.indexOf(prevIndex) + 1) % searchTerms.length
        return searchTerms[newIndex]
      })
    }, 1200)

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(progressInterval)
          return 0 // Reset to create a continuous loop
        }
        return prevProgress + 3
      })
    }, 120)
    
    // Animation phases
    const phaseInterval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4)
    }, 800)
    
    return () => {
      clearInterval(termInterval)
      clearInterval(progressInterval)
      clearInterval(phaseInterval)
    }
  }, [searchTerms.length])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="flex flex-col items-center gap-8 max-w-md w-full text-center relative">
        {/* Background animated elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className="absolute rounded-full bg-gradient-to-br from-pastel-orange/15 to-pastel-orange/5"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 15}s`,
                animationDelay: `${Math.random() * 5}s`,
                animation: `float infinite ease-in-out`,
                filter: 'blur(1px)'
              }}
            />
          ))}
        </div>
        
        {/* Logo with pulse effect */}
        <div className="mb-6 transform transition-all duration-700 hover:scale-110 relative">
          <div className="absolute inset-0 rounded-full bg-pastel-orange/20 animate-ping opacity-30"></div>
          <div className="absolute -inset-2 bg-gradient-to-r from-pastel-orange/0 via-pastel-orange/20 to-pastel-orange/0 rounded-full animate-pulse"></div>
          <Logo size="lg" className="relative z-10" />
          <div className="mt-2 flex justify-center">
            <div className="text-sm font-medium text-gray-600">Search & Discover</div>
          </div>
        </div>
        
        {/* Search animation */}
        <div className="relative w-full max-w-sm mx-auto mb-8 group">
          <div className="relative">
            <div className="bg-white border border-gray-200 rounded-full h-12 px-5 pr-10 w-full flex items-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <Search className="text-pastel-orange mr-3 animate-pulse" size={20} />
              <div className="h-5 overflow-hidden relative flex-1">
                {searchTerms.map((term, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-500 ${
                      term === searchTerm ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                    }`}
                  >
                    <p className="text-gray-600 text-left font-medium">{term}</p>
                  </div>
                ))}
              </div>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <div 
                    key={i} 
                    className={`w-2 h-2 rounded-full bg-gradient-to-r from-pastel-orange to-pastel-orange/70 transition-opacity duration-300 ${
                      (animationPhase + i) % 3 === 0 ? 'opacity-100 scale-100' : 'opacity-30 scale-75'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Animated spotlight effect */}
          <div 
            className="absolute -inset-2 bg-gradient-to-r from-transparent via-pastel-orange/10 to-transparent"
            style={{
              transform: `translateX(${(progress - 50) * 2}%)`,
              opacity: 0.7,
              filter: 'blur(10px)',
              transition: 'transform 0.5s ease-out',
              height: '200%',
              top: '-50%',
              width: '30%',
              left: '35%',
              borderRadius: '50%'
            }}
          ></div>
          
          {/* Animated underline */}
          <div className="h-1 mt-1 bg-gray-200 rounded-full overflow-hidden w-full shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-pastel-orange/60 via-pastel-orange to-pastel-orange/60 rounded-full transition-all duration-200 ease-in-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-white/30 blur-sm"></div>
            </div>
          </div>
          
          {/* Animated search results appearing */}
          <div className="mt-6 space-y-3">
            {searchResults.map((result, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg p-3 shadow-sm border border-gray-100 flex items-center transition-all duration-500 hover:border-pastel-orange/20 hover:shadow-md ${
                  index <= animationPhase 
                    ? "opacity-100 translate-x-0" 
                    : "opacity-0 translate-x-10"
                }`}
                style={{ 
                  transitionDelay: `${index * 200}ms`,
                  transform: `scale(${1 - (index * 0.05)})`,
                  transformOrigin: 'top center'
                }}
              >
                <div className="mr-3 p-2 bg-gradient-to-br from-pastel-orange/20 to-pastel-orange/5 rounded-full">
                  {result.icon}
                </div>
                <div className="flex-1">
                  <div className="h-4 w-28 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-pulse"></div>
                </div>
                <Zap className="w-4 h-4 text-pastel-orange/40" />
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-gray-600 text-sm relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white to-transparent"></div>
          <span className="relative inline-flex items-center">
            <span className="animate-pulse mr-2">⚡</span>
            <span>Finding the freshest items for you...</span>
          </span>
        </div>
      </div>
    </main>
  )
}

