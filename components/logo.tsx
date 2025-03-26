import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizes = {
    sm: { width: 100, height: 10 },
    md: { width: 120, height: 30 },
    lg: { width: 200, height: 20 },
    xl: { width: 230, height: 40 }
  }

  return (
    <Link href="/" className="{className}">
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Parchunewala_logo.jpg-rkXIlJNJYc9YM4mwO7bWe4yJ0XFcJE.jpeg"
        // src="Logo.jpeg"
        alt="ParchuneWala Logo"
        width={sizes[size].width}
        height={sizes[size].height}
        priority
        className="object-contain"
      />
    </Link>
  )
}

