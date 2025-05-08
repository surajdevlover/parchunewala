import Image from "next/image"
import Link from "next/link"
import { MapPin, Clock, Star, ExternalLink, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState } from "react"

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
  size?: 'default' | 'small'
  tags?: string[]
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
  deliveryFee = "Free delivery on orders above ₹199",
  size = 'default',
  tags = ["Groceries", "Daily Essentials"]
}: StoreCardProps) {
  const isSmall = size === 'small';
  const [isFavorite, setIsFavorite] = useState(false);
  
  return (
    <motion.div 
      className={`group bg-white border border-gray-200 rounded-lg overflow-hidden transition-all hover:shadow-md ${isSmall ? 'text-xs' : ''}`}
      whileHover={{ 
        y: -5, 
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        borderColor: "#FDA47E"
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <Link href={`/store/${id}`} className="block">
          <div className={`relative ${isSmall ? 'h-20' : 'h-32'} w-full overflow-hidden`}>
            <Image 
              src={image} 
              alt={name} 
              fill 
              className="object-cover transition-transform duration-500 group-hover:scale-110" 
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent"></div>
            <motion.div 
              className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded-full text-xs font-medium"
              whileHover={{ scale: 1.05 }}
            >
              <Star size={10} className="fill-yellow-400 text-yellow-400" />
              <span>{rating}</span>
            </motion.div>
            {discount && !isSmall && (
              <motion.div 
                className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {discount}
              </motion.div>
            )}
          </div>
        </Link>
        
        <motion.button
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm z-10"
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsFavorite(!isFavorite)}
          style={{ display: isSmall ? 'none' : 'block' }}
        >
          <Heart 
            size={16} 
            className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"} 
          />
        </motion.button>
      </div>
      
      <Link href={`/store/${id}`} className="block">
        <div className={`${isSmall ? 'p-1.5' : 'p-3'}`}>
          <div className="flex justify-between items-start mb-1">
            <h3 className={`font-bold text-gray-900 line-clamp-1 group-hover:text-pastel-orange transition-colors ${isSmall ? 'text-xs' : ''}`}>
              {name}
            </h3>
            {!isSmall && (
              <Badge variant="outline" className="text-xs bg-pastel-orange/10 text-pastel-orange border-pastel-orange">
                {products}+ items
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
            <MapPin size={isSmall ? 10 : 12} className="text-pastel-orange/70" />
            <span className="line-clamp-1">{location}</span>
          </div>
          
          {!isSmall && (
            <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
              <Clock size={12} />
              <span>{timing}</span>
            </div>
          )}
          
          <div className="flex justify-between items-center mt-1">
            <motion.div 
              className={`bg-green-100 text-green-800 font-medium px-2 py-0.5 rounded-full ${isSmall ? 'text-[10px]' : 'text-xs'}`}
              whileHover={{ scale: 1.05 }}
            >
              {distance}
            </motion.div>
            
            {isSmall ? (
              <div className="flex flex-wrap gap-1">
                {tags.slice(0, 1).map((tag, i) => (
                  <span key={i} className="text-[8px] bg-gray-100 px-1 py-0.5 rounded-full text-gray-500">
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <Button variant="ghost" size="sm" className="h-8 text-xs text-pastel-orange hover:bg-pastel-orange/10 hover:text-pastel-orange">
                View Store <ExternalLink size={12} className="ml-1" />
              </Button>
            )}
          </div>
          
          {!isSmall && (
            <>
              <div className="mt-2 text-xs text-gray-500">
                {deliveryFee}
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {tags.map((tag, i) => (
                  <span key={i} className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded-full text-gray-500">
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

