"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MapPin, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"

export default function LocationScreen() {
  const router = useRouter()
  const [location, setLocation] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleUseCurrentLocation = () => {
    setIsLoading(true)
    // Simulate getting location
    setTimeout(() => {
      setIsLoading(false)
      router.push("/home")
    }, 1500)
  }

  const handleManualLocation = (e: React.FormEvent) => {
    e.preventDefault()
    if (location.trim()) {
      router.push("/home")
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-6 bg-white">
      <div className="flex flex-col items-center gap-8 max-w-md w-full">
        <div className="flex flex-col items-center gap-2 w-full">
          <Logo size="md" />
          <h1 className="text-2xl font-bold text-dark-grey mt-6">Set Your Location</h1>
        </div>

        <div className="flex flex-col gap-4 w-full mt-4">
          <Button
            className="bg-pastel-orange text-white w-full flex items-center gap-2 h-12"
            onClick={handleUseCurrentLocation}
            disabled={isLoading}
          >
            <MapPin size={18} />
            {isLoading ? "Getting location..." : "Use Current Location"}
          </Button>

          <div className="relative w-full">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={18} className="text-muted-foreground" />
            </div>
            <form onSubmit={handleManualLocation}>
              <input
                type="text"
                placeholder="Enter your city, area or pincode (e.g., Mumbai, Andheri, 400053)"
                className="w-full pl-10 pr-4 py-3 rounded-md bg-light-grey border-0 focus:ring-2 focus:ring-pastel-orange focus:outline-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <Button type="submit" className="bg-mint-green text-white w-full mt-3 h-12" disabled={!location.trim()}>
                Enter Location Manually
              </Button>
            </form>
          </div>
        </div>

        <p className="text-dark-grey text-center mt-6">We'll show you stores and products near you.</p>
      </div>
    </main>
  )
}

