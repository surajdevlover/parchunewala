import Link from "next/link"
import type { LucideIcon } from "lucide-react"

interface CategoryCardProps {
  name: string
  href: string
  icon: LucideIcon
  color?: "orange" | "green"
}

export function CategoryCard({ name, href, icon: Icon, color = "orange" }: CategoryCardProps) {
  const bgColor = color === "orange" ? "bg-pastel-orange/10" : "bg-mint-green/10"
  const textColor = color === "orange" ? "text-pastel-orange" : "text-mint-green"

  return (
    <Link href={href} className="group">
      <div className="flex flex-col items-center gap-4 p-3">
        <div
          className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}
        >
          <Icon size={20} className={textColor} />
        </div>
        <span className="text-xs leading-4 font-semibold text-dark-grey">{name}</span>
      </div>
    </Link>
  )
}

