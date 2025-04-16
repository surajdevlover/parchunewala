"use client"

import { useState, useEffect } from "react"
import { Logo } from "@/components/logo"
import Image from "next/image"
import { MapPin, Navigation, Compass, Map, Target, Building, Home } from "lucide-react"

export default function Loading() {
  const [progress, setProgress] = useState(0)
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0)
  const [animationPhase, setAnimationPhase] = useState(0)

  const locations = [
    "Finding nearby stores",
    "Discovering your neighborhood",
    "Locating delivery zones",
    "Mapping your area",
    "Finding the fastest routes"
  ]

  const locationPoints = [
    { icon: <Building className="h-6 w-6 text-pastel-orange" />, text: "Local Stores" },
    { icon: <Home className="h-6 w-6 text-pastel-orange" />, text: "Your Home" },
    { icon: <Target className="h-6 w-6 text-pastel-orange" />, text: "Popular Places" },
    { icon: <Map className="h-6 w-6 text-pastel-orange" />, text: "Delivery Zones" }
  ]
  
  useEffect(() => {
    // Location message rotation
    const locationInterval = setInterval(() => {
      setCurrentLocationIndex((prevIndex) => (prevIndex + 1) % locations.length)
    }, 1500)

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(progressInterval)
          return 0 // Reset to create a continuous loop
        }
        return prevProgress + 2
      })
    }, 100)
    
    // Animation phases
    const phaseInterval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4)
    }, 800)
    
    return () => {
      clearInterval(locationInterval)
      clearInterval(progressInterval)
      clearInterval(phaseInterval)
    }
  }, [locations.length])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="flex flex-col items-center gap-8 max-w-md w-full text-center relative">
        {/* Background animated elements - map-like patterns */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* Grid lines - horizontal */}
          {[...Array(8)].map((_, i) => (
            <div 
              key={`h-${i}`} 
              className="absolute h-px bg-pastel-orange/10 left-0 right-0"
              style={{
                top: `${(i + 1) * 10}%`,
                opacity: 0.1 + (i * 0.05),
              }}
            />
          ))}
          
          {/* Grid lines - vertical */}
          {[...Array(8)].map((_, i) => (
            <div 
              key={`v-${i}`} 
              className="absolute w-px bg-pastel-orange/10 top-0 bottom-0"
              style={{
                left: `${(i + 1) * 10}%`,
                opacity: 0.1 + (i * 0.05),
              }}
            />
          ))}
          
          {/* Floating location markers */}
          {[...Array(6)].map((_, i) => (
            <div 
              key={`m-${i}`} 
              className="absolute rounded-full bg-gradient-to-br from-pastel-orange/20 to-pastel-orange/5 flex items-center justify-center animate-float"
              style={{
                width: `${Math.random() * 60 + 30}px`,
                height: `${Math.random() * 60 + 30}px`,
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
                animationDuration: `${Math.random() * 5 + 10}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            >
              <div className="w-2 h-2 bg-pastel-orange/30 rounded-full"></div>
            </div>
          ))}
        </div>
        
        {/* Logo with pulse effect */}
        <div className="mb-6 transform transition-all duration-700 hover:scale-110 relative">
          <div className="absolute inset-0 rounded-full bg-pastel-orange/20 animate-ping opacity-30"></div>
          <div className="absolute -inset-2 bg-gradient-to-r from-pastel-orange/0 via-pastel-orange/20 to-pastel-orange/0 rounded-full animate-pulse"></div>
          <Logo size="lg" className="relative z-10" />
          <div className="mt-2 flex justify-center">
            <div className="text-sm font-medium text-gray-600">Location Services</div>
          </div>
        </div>
        
        {/* Map visualization */}
        <div className="relative w-56 h-56 mb-6 mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full"></div>
          
          {/* Map circle with pulse */}
          <div className="absolute inset-4 rounded-full overflow-hidden shadow-inner bg-gradient-to-r from-blue-100 to-green-100 border border-gray-200">
            {/* Map grid lines */}
            <div className="absolute inset-0 opacity-30">
              {[...Array(6)].map((_, i) => (
                <div key={`hm-${i}`} className="absolute h-px bg-gray-500/20 left-0 right-0" style={{ top: `${(i + 1) * 16}%` }} />
              ))}
              {[...Array(6)].map((_, i) => (
                <div key={`vm-${i}`} className="absolute w-px bg-gray-500/20 top-0 bottom-0" style={{ left: `${(i + 1) * 16}%` }} />
              ))}
            </div>
            
            {/* Roads */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-white transform -translate-y-1/2"></div>
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white transform -translate-x-1/2"></div>
            
            {/* Pulsing location marker */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-pastel-orange/20 animate-ping absolute -inset-3"></div>
                <div className="w-10 h-10 rounded-full bg-pastel-orange/30 animate-pulse absolute -inset-0"></div>
                <div className="bg-pastel-orange text-white p-1 rounded-full relative z-10">
                  <MapPin size={20} />
                </div>
              </div>
            </div>
            
            {/* Moving navigation indicator */}
            <div 
              className="absolute w-8 h-8 flex items-center justify-center"
              style={{
                top: `${10 + (Math.sin(progress / 10) * 30 + 30)}%`,
                left: `${10 + (Math.cos(progress / 10) * 30 + 30)}%`,
                transition: 'all 1s ease-in-out',
              }}
            >
              <Navigation 
                size={16} 
                className="text-pastel-orange transform -rotate-45" 
                style={{ 
                  transform: `rotate(${progress * 3.6}deg)`,
                  opacity: 0.7
                }}
              />
            </div>
            
            {/* Random location points */}
            {[...Array(5)].map((_, i) => (
              <div 
                key={`loc-${i}`}
                className="absolute w-2 h-2 rounded-full bg-pastel-orange/50"
                style={{
                  top: `${15 + (i * 15)}%`,
                  left: `${20 + (i * 10)}%`,
                  opacity: (animationPhase === i % 4) ? 1 : 0.3,
                  transform: (animationPhase === i % 4) ? 'scale(1.5)' : 'scale(1)',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
          
          {/* Compass decoration */}
          <div className="absolute -top-2 -right-2 animate-pulse">
            <Compass size={24} className="text-pastel-orange/70" />
          </div>
        </div>
        
        {/* Location message */}
        <div className="h-8 mb-2">
          {locations.map((text, index) => (
            <p 
              key={index}
              className={`text-gray-700 text-lg font-medium transition-all duration-500 absolute left-0 right-0 ${
                index === currentLocationIndex ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              {text}
            </p>
          ))}
        </div>

        {/* Enhanced progress bar */}
        <div className="w-full mt-3 mb-8 group">
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner relative">
            <div 
              className="h-full bg-gradient-to-r from-blue-400/80 via-pastel-orange to-pastel-orange/60 rounded-full transition-all duration-200 ease-in-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/30 blur-sm"></div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2 group-hover:text-pastel-orange transition-colors">
            Preparing your location experience...
          </p>
        </div>
        
        {/* Location points */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
          {locationPoints.map((point, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:border-pastel-orange/20 border border-transparent ${
                index <= animationPhase ? "opacity-100 scale-100" : "opacity-70 scale-95"
              }`}
              style={{ 
                transitionDelay: `${index * 150}ms`,
              }}
            >
              <div className="p-2 mb-2 transition-transform duration-300 hover:scale-110 bg-gradient-to-br from-pastel-orange/10 to-transparent rounded-full">
                {point.icon}
              </div>
              <p className="text-sm font-medium text-gray-700">{point.text}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}