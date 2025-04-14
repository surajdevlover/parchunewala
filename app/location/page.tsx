"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { MapPin, Search, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import Image from "next/image"

export default function LocationScreen() {
  const router = useRouter()
  const [location, setLocation] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [coordinates, setCoordinates] = useState<{lat: number; lon: number} | null>(null)
  const [showMap, setShowMap] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load OpenStreetMap script
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo='
    script.crossOrigin = ''
    script.async = true
    
    document.head.appendChild(script)
    
    // Add CSS for the map
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='
    link.crossOrigin = ''
    
    document.head.appendChild(link)
    
    return () => {
      document.head.removeChild(script)
      document.head.removeChild(link)
    }
  }, [])

  useEffect(() => {
    if (showMap && mapRef.current && coordinates) {
      // Initialize map when coordinates are available
      const L = (window as any).L
      if (!L) return

      const map = L.map(mapRef.current).setView([coordinates.lat, coordinates.lon], 15)
      
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map)
      
      // Add marker for selected location
      L.marker([coordinates.lat, coordinates.lon]).addTo(map)
        .bindPopup('Your selected location')
        .openPopup()
        
      // Clean up map instance on component unmount
      return () => {
        map.remove()
      }
    }
  }, [showMap, coordinates])

  const handleUseCurrentLocation = () => {
    setIsLoading(true)
    
    // Use the browser's geolocation API
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude
          const lon = position.coords.longitude
          
          // Reverse geocode to get address
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`
            )
            const data = await response.json()
            
            if (data && data.display_name) {
              setLocation(data.display_name)
              setCoordinates({ lat, lon })
              setShowMap(true)
              
              // Save location data to localStorage
              localStorage.setItem('userLocation', JSON.stringify({
                address: data.display_name,
                coordinates: { lat, lon }
              }))
            }
          } catch (error) {
            console.error("Error getting location:", error)
          }
          
          setIsLoading(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsLoading(false)
        }
      )
    } else {
      setIsLoading(false)
      alert("Geolocation is not supported by your browser")
    }
  }

  const handleSearch = async (query: string) => {
    setLocation(query)
    
    if (query.length > 2) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
        )
        const data = await response.json()
        setSuggestions(data)
      } catch (error) {
        console.error("Error searching locations:", error)
      }
    } else {
      setSuggestions([])
    }
  }

  const selectLocation = (suggestion: any) => {
    setLocation(suggestion.display_name)
    setCoordinates({ lat: parseFloat(suggestion.lat), lon: parseFloat(suggestion.lon) })
    setSuggestions([])
    setShowMap(true)
    
    // Save location data to localStorage
    localStorage.setItem('userLocation', JSON.stringify({
      address: suggestion.display_name,
      coordinates: { lat: parseFloat(suggestion.lat), lon: parseFloat(suggestion.lon) }
    }))
  }

  const handleConfirmLocation = () => {
    if (location && coordinates) {
      router.push("/home")
    } else {
      alert("Please select a location")
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
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin size={18} />}
            {isLoading ? "Getting location..." : "Use Current Location"}
          </Button>

          <div className="relative w-full">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={18} className="text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search for your location"
              className="w-full pl-10 pr-4 py-3 rounded-md bg-light-grey border-0 focus:ring-2 focus:ring-pastel-orange focus:outline-none"
              value={location}
              onChange={(e) => handleSearch(e.target.value)}
            />
            
            {suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                {suggestions.map((suggestion, index) => (
                  <div 
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => selectLocation(suggestion)}
                  >
                    {suggestion.display_name}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {showMap && (
            <div className="w-full mt-2 rounded-lg overflow-hidden border border-gray-200" style={{ height: "200px" }}>
              <div ref={mapRef} className="h-full w-full"></div>
            </div>
          )}
          
          <Button 
            className="bg-mint-green text-white w-full mt-3 h-12" 
            disabled={!location || !coordinates}
            onClick={handleConfirmLocation}
          >
            Confirm Location
          </Button>
        </div>

        <p className="text-dark-grey text-center mt-6">We'll show you stores and products near you.</p>
      </div>
    </main>
  )
}

