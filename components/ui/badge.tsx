import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        "pastel-orange": "border-transparent bg-pastel-orange text-white hover:bg-pastel-orange/90",
        "pastel-outline": "border-pastel-orange text-pastel-orange bg-pastel-orange/5",
        "green": "border-transparent bg-green-500 text-white hover:bg-green-600",
        "green-light": "border-transparent bg-green-100 text-green-800",
        "blue-light": "border-transparent bg-blue-100 text-blue-800",
        "count": "border-gray-200 bg-white text-gray-800 shadow-sm",
      },
      shape: {
        rounded: "rounded-full",
        pill: "rounded-md",
        square: "rounded-none",
      }
    },
    defaultVariants: {
      variant: "default",
      shape: "rounded",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, shape, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, shape }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
