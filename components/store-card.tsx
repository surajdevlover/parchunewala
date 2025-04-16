import Image from "next/image"
import Link from "next/link"
import { MapPin, Clock, Star, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface StoreCardProps {
  id: string
  name: string
  location: string
  image: string
  timing: string
  rating: number
  distance: string
  products?: number
  discount?: string
  deliveryFee?: string
}

export function StoreCard({ 
  id, 
  name, 
  location, 
  image, 
  timing, 
  rating, 
  distance,
  products = Math.floor(Math.random() * 500 + 500),
  discount = "Up to 20% OFF",
  deliveryFee = "Free delivery on orders above ₹199"
}: StoreCardProps) {
  return (
    <div className="group bg-white border border-gray-200 rounded-lg overflow-hidden transition-all hover:shadow-md">
      <Link href={`/store/${id}`} className="block">
        <div className="relative h-32 w-full">
          <Image 
            src={image} 
            alt={name} 
            fill 
            className="object-cover" 
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white px-2 py-0.5 rounded text-xs font-medium">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            <span>{rating}</span>
          </div>
          {discount && (
            <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
              {discount}
            </div>
          )}
        </div>
        
        <div className="p-3">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold text-gray-900 line-clamp-1 group-hover:text-pastel-orange transition-colors">
              {name}
            </h3>
            <Badge variant="outline" className="text-xs bg-pastel-orange/10 text-pastel-orange border-pastel-orange">
              {products}+ items
            </Badge>
          </div>
          
          <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
            <MapPin size={12} />
            <span className="line-clamp-1">{location}</span>
          </div>
          
          <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
            <Clock size={12} />
            <span>{timing}</span>
          </div>
          
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center text-xs text-gray-700">
              <div className="bg-green-100 text-green-800 font-medium px-2 py-0.5 rounded-sm">
                {distance}
              </div>
            </div>
            
            <Button variant="ghost" size="sm" className="h-8 text-xs text-pastel-orange hover:bg-pastel-orange/10 hover:text-pastel-orange">
              View Store <ExternalLink size={12} className="ml-1" />
            </Button>
          </div>
          
          <div className="mt-2 text-xs text-gray-500">
            {deliveryFee}
          </div>
        </div>
      </Link>
    </div>
  )
}

