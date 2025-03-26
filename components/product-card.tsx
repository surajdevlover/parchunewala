import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

interface ProductCardProps {
  id: string
  name: string
  price: string
  mrp: string
  image: string
  quantity: string
  rating?: number
  discount?: string
}

export function ProductCard({ id, name, price, image, rating, discount, quantity, mrp }: ProductCardProps) {
  return (
    <Link href={`/product/${id}`} className="group">
      <div className="rounded-lg overflow-hidden border border-border bg-white transition-all hover:shadow-lg">
        <div className="relative aspect-square">
          <Image src={image || ""} alt={name} fill className="object-cover" />
          {discount && (
            <div className="absolute top-2 right-2 bg-pastel-orange text-white text-xs font-medium px-2 py-1 rounded">
              {discount}
            </div>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-medium text-sm line-clamp-1 group-hover:text-pastel-orange transition-colors">{name}</h3>
          <span className="text-sm font-medium">{quantity}</span>
          <div className="flex justify-between items-center mt-2">
            <p className="font-bold text-dark-grey">{price} 
              <span className="font-body text-xs line-clamp-2 !text-1xs text-skin-primary-void/30 line-through sm:!mb-[0.3rem] md:!mb-[0.3rem] sm:!text-[12px] !mt-[6px]"> {mrp}</span>
            </p>
            {rating && (
              <div className="flex items-center gap-1">
                <Star size={14} className="fill-pastel-orange text-pastel-orange" />
                <span  >{rating}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

