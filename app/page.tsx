"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/logo"
import Image from "next/image"
import { ShoppingBag, FastForward, Droplets, Star, Truck, ShoppingCart, ArrowRight, BadgePercent } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Home() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [animationPhase, setAnimationPhase] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

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
      setIsLoading(false)
      router.push("/home")
    }, 4500)

    return () => {
      clearInterval(imageInterval)
      clearInterval(progressInterval)
      clearInterval(phaseInterval)
      clearTimeout(timeout)
    }
  }, [router, foodImages.length])

  const benefits = [
    {
      icon: <FastForward className="w-6 h-6" />,
      title: "Fast Delivery",
      description: "Get your groceries delivered in 20 minutes"
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Local Stores",
      description: "Support local businesses in your neighborhood"
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: "Fresh Products",
      description: "Quality guaranteed or get instant refund"
    },
    {
      icon: <BadgePercent className="w-6 h-6" />,
      title: "Special Offers",
      description: "Discover exclusive deals and discounts"
    }
  ]

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-pastel-orange/5 via-white to-pastel-orange/10">
        <div className="flex flex-col items-center gap-8 max-w-md w-full text-center relative">
          {/* Background animated elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            {/* Grid lines - horizontal */}
            {[...Array(5)].map((_, i) => (
              <div 
                key={`h-${i}`} 
                className="absolute h-px bg-pastel-orange/10 left-0 right-0"
                style={{
                  top: `${(i + 1) * 20}%`,
                  opacity: 0.1 + (i * 0.05),
                }}
              />
            ))}
            
            {/* Floating food decorations */}
            {[...Array(8)].map((_, i) => (
              <div 
                key={`f-${i}`} 
                className="absolute rounded-full bg-gradient-to-br from-pastel-orange/15 to-pastel-orange/5 animate-float"
                style={{
                  width: `${Math.random() * 80 + 40}px`,
                  height: `${Math.random() * 80 + 40}px`,
                  top: `${Math.random() * 80 + 10}%`,
                  left: `${Math.random() * 80 + 10}%`,
                  animationDuration: `${Math.random() * 8 + 12}s`,
                  animationDelay: `${Math.random() * 5}s`,
                  filter: 'blur(1px)'
                }}
              />
            ))}
          </div>
          
          {/* Logo with pulse effect */}
          <div className="mb-4 transform transition-all duration-700 hover:scale-110 relative">
            <div className="absolute inset-0 rounded-full bg-pastel-orange/20 animate-ping opacity-30"></div>
            <div className="absolute -inset-2 bg-gradient-to-r from-pastel-orange/0 via-pastel-orange/20 to-pastel-orange/0 rounded-full animate-pulse"></div>
            <Logo size="xl" className="relative z-10" />
            <div className="flex justify-center mt-3 relative">
              <div className="absolute inset-x-0 -bottom-2 h-1 bg-gradient-to-r from-transparent via-pastel-orange to-transparent opacity-70 rounded-full"></div>
              {[0, 1, 2].map((i) => (
                <Droplets 
                  key={i} 
                  className={`h-5 w-5 mx-1 text-pastel-orange transform transition-all duration-500 ${
                    animationPhase === i ? 'translate-y-1 opacity-100 scale-110' : 'translate-y-0 opacity-30 scale-100'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Rotating image with enhanced animation */}
          <div className="relative w-40 h-40 mb-6 group">
            <div className="absolute inset-0 w-full h-full rounded-full bg-pastel-orange/10 animate-pulse"></div>
            <div className="absolute inset-0 w-full h-full rounded-full bg-pastel-orange/5 animate-ping opacity-50"></div>
            
            {/* Decorative dots */}
            <div className="absolute inset-0 w-full h-full rounded-full">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-2 h-2 bg-pastel-orange/40 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${i * 30}deg) translateY(-48px) translateX(-50%)`,
                  }}
                />
              ))}
            </div>
            
            {foodImages.map((src, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ${
                  index === currentImageIndex ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
              >
                <div className="w-40 h-40 bg-gradient-to-br from-pastel-orange to-pastel-orange/70 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-pastel-orange/30">
                  <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center p-2 shadow-inner">
                    <Image
                      src={src}
                      alt="Food categories"
                      width={80}
                      height={80}
                      className="object-contain drop-shadow-md"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Loading text with fade transition */}
          <div className="h-8 mb-2">
            {loadingTexts.map((text, index) => (
              <p 
                key={index}
                className={`text-dark-grey text-lg font-medium transition-all duration-500 absolute left-0 right-0 ${
                  index === currentImageIndex % loadingTexts.length ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
              >
                {text}
              </p>
            ))}
          </div>

          {/* Enhanced progress bar */}
          <div className="w-full mt-3 mb-8 group">
            <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner relative">
              <div 
                className="h-full bg-gradient-to-r from-pastel-orange/80 via-pastel-orange to-pastel-orange/80 rounded-full transition-all duration-200 ease-in-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-white/30 blur-sm"></div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2 group-hover:text-pastel-orange transition-colors">
              Setting up your delivery experience...
            </p>
          </div>
          
          {/* Feature cards with hover effects */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] hover:bg-orange-50/50 border border-transparent hover:border-pastel-orange/20"
              >
                <div className="p-2 mb-2 transition-transform duration-300 hover:scale-110 bg-gradient-to-br from-pastel-orange/10 to-transparent rounded-full">
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

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pastel-orange/10 to-pastel-orange/5 pb-8">
        <div className="container mx-auto px-4 pt-8 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              Shop from Your <span className="text-pastel-orange">Local Stores</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-600 mb-8 max-w-2xl"
            >
              Get groceries and essentials delivered in 20 minutes from nearby stores with our new neighborhood shopping experience.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button 
                onClick={() => router.push("/home")}
                className="bg-pastel-orange hover:bg-pastel-orange/90 text-white px-8 py-6 text-lg font-medium rounded-full flex items-center"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose ParchuneWala?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're reimagining local shopping with technology that connects you to neighborhood stores.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="bg-pastel-orange/10 w-12 h-12 rounded-full flex items-center justify-center text-pastel-orange mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* App Showcase */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="md:w-1/2 mb-10 md:mb-0"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Download Our App</h2>
              <p className="text-gray-600 mb-6">
                Get the full experience with our mobile app. Order faster, track deliveries in real-time, and get exclusive app-only offers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                  App Store
                </Button>
                <Button className="bg-pastel-orange hover:bg-pastel-orange/90 text-white">
                  Google Play
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:w-1/2 relative h-80 md:h-96"
            >
              <div className="relative h-full w-full">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-full">
                  <div className="relative w-full h-full bg-white rounded-3xl shadow-xl overflow-hidden border-8 border-gray-800">
                    <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 flex items-center justify-center">
                      <div className="w-16 h-1.5 bg-gray-700 rounded-full"></div>
                    </div>
                    <div className="absolute inset-0 pt-6">
                      <div className="w-full h-full bg-pastel-orange/10 flex items-center justify-center">
                        <div className="text-center p-4">
                          <ShoppingCart size={48} className="text-pastel-orange mx-auto mb-4" />
                          <h3 className="text-xl font-bold text-gray-900">ParchuneWala</h3>
                          <p className="text-sm text-gray-600">Your neighborhood, delivered</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't take our word for it, hear from our satisfied customers.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  {index === 0 && "Absolutely love this service! The delivery is super fast, and I can support local stores in my neighborhood. Game changer for busy weekdays."}
                  {index === 1 && "I've been using ParchuneWala for the past month and I'm impressed with the quality of products and the speed of delivery. Great for last-minute grocery needs!"}
                  {index === 2 && "The app is so easy to use and I love that I can choose from multiple stores in my area. The prices are the same as in-store which is a huge plus."}
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-pastel-orange/20 flex items-center justify-center text-pastel-orange font-bold mr-3">
                    {index === 0 && "AB"}
                    {index === 1 && "RK"}
                    {index === 2 && "MP"}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {index === 0 && "Ananya Banerjee"}
                      {index === 1 && "Rahul Kumar"}
                      {index === 2 && "Meera Patel"}
                    </h4>
                    <p className="text-sm text-gray-500">Verified Customer</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-pastel-orange/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Shop Locally?</h2>
            <p className="text-gray-600 mb-8">
              Join thousands of customers who've made the switch to neighborhood shopping with ParchuneWala.
            </p>
            <Button 
              onClick={() => router.push("/home")}
              className="bg-pastel-orange hover:bg-pastel-orange/90 text-white px-8 py-6 text-lg font-medium rounded-full"
            >
              Get Started Now
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ParchuneWala</h3>
              <p className="text-gray-400 mb-4">Your neighborhood, delivered.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Categories</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Stores</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Offers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Partner With Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} ParchuneWala. All rights reserved.</p>
        </div>
      </div>
      </footer>
    </main>
  )
}

// Add the float animation to your globals.css
// @keyframes float {
//   0%, 100% { transform: translateY(0) rotate(0deg); }
//   50% { transform: translateY(-20px) rotate(5deg); }
// }

