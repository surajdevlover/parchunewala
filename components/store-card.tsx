import Image from "next/image"
import Link from "next/link"
import { Clock, Star } from "lucide-react"

interface StoreCardProps {
  id: string
  name: string
  image: string
  timing: string
  location: string
  rating?: number
  distance?: string
}

export function StoreCard({ id, name, image, timing, rating, distance, location }: StoreCardProps) {
  return (
    <Link href={`/store/${id}`} className="group">
      <div className="rounded-lg overflow-hidden border border-border bg-white transition-all hover:shadow-md">
        <div className="relative aspect-video">
          <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
        </div>
        <div className="p-3">
          <h3 className="font-medium text-sm group-hover:text-pastel-orange transition-colors">{name}</h3>
          <span className="text-xs">{location}</span>
          <div className="flex items-center gap-1 mt-1">
            <Clock size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{timing}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            {rating && (
              <div className="flex items-center gap-1">
                <Star size={14} className="fill-pastel-orange text-pastel-orange" />
                <span className="text-xs font-medium">{rating}</span>
              </div>
            )}
            {distance && <span className="text-xs text-muted-foreground">{distance}</span>}
          </div>
        </div>
      </div>
    </Link>
  )
}

