"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/logo"
import Image from "next/image"
import { ShoppingBag, FastForward, Droplets, Star, Truck } from "lucide-react"

export default function LoadingScreen() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [animationPhase, setAnimationPhase] = useState(0)

  const foodImages = [
    "/images/groceries.png",
    "/images/fruits.png",
    "/images/vegetables.png",
    "/images/dairy.png",
    "/images/snacks.png",
  ]

  const loadingTexts = [
    "Finding your local stores",
    "Preparing fresh deals for you",
    "Getting the fastest delivery slots",
    "Comparing prices for best deals",
    "Almost ready to serve you",
  ]

  const features = [
    { icon: <FastForward className="h-6 w-6 text-pastel-orange" />, text: "10-min delivery" },
    { icon: <Star className="h-6 w-6 text-pastel-orange" />, text: "Top quality products" },
    { icon: <ShoppingBag className="h-6 w-6 text-pastel-orange" />, text: "Best price guaranteed" },
    { icon: <Truck className="h-6 w-6 text-pastel-orange" />, text: "Free delivery" },
  ]
  
  useEffect(() => {
    // Image rotation
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % foodImages.length)
    }, 1000)

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prevProgress + 4
      })
    }, 150)
    
    // Animation phases
    const phaseInterval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 3)
    }, 1500)

    // Redirect to home page after loading
    const timeout = setTimeout(() => {
      router.push("/home")
    }, 4500)
    
    return () => {
      clearInterval(imageInterval)
      clearInterval(progressInterval)
      clearInterval(phaseInterval)
      clearTimeout(timeout)
    }
  }, [router, foodImages.length])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-orange-50 to-white">
      <div className="flex flex-col items-center gap-8 max-w-md w-full text-center">
        <div className="mb-4 transform transition-all duration-700 hover:scale-110">
          <Logo size="xl" />
          <div className="flex justify-center mt-2">
            {[0, 1, 2].map((i) => (
              <Droplets 
                key={i} 
                className={`h-5 w-5 mx-1 text-pastel-orange transform transition-all duration-500 ${
                  animationPhase === i ? 'translate-y-1 opacity-100' : 'translate-y-0 opacity-30'
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="relative w-36 h-36 mb-6">
          <div className="absolute inset-0 w-full h-full rounded-full bg-pastel-orange/10 animate-ping"></div>
          {foodImages.map((src, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="w-36 h-36 bg-pastel-orange rounded-full flex items-center justify-center">
                <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center p-2">
                  <Image
                    src={src}
                    alt="Food categories"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-dark-grey text-lg font-medium">
          {loadingTexts[currentImageIndex % loadingTexts.length]}
        </p>

        <div className="w-full mt-5 mb-8">
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-pastel-orange rounded-full transition-all duration-200 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Setting up your delivery experience...
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
              <div className="p-2 mb-2">
                {feature.icon}
              </div>
              <p className="text-sm font-medium text-gray-700">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

// Add the float animation to your globals.css
// @keyframes float {
//   0%, 100% { transform: translateY(0) rotate(0deg); }
//   50% { transform: translateY(-20px) rotate(5deg); }
// }

