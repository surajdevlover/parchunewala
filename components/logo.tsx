import Image from "next/image"
import Link from "next/link"
import logo from "./Logo-1.png"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizes = {
    sm: { width: 100, height: 10 },
    md: { width: 120, height: 30 },
    lg: { width: 200, height: 40 },
    xl: { width: 230, height: 60 }
  }

  return (
    <Link href="/" className={className}>
      <Image
        src={logo}
        alt="ParchuneWala Logo"
        width={sizes[size].width}
        height={sizes[size].height}
        priority
        className="object-contain"
      />
    </Link>
  )
}

