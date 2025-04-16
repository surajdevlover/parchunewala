"use client"

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowLeft, Menu } from "lucide-react"
import { Logo } from "./logo"
import { useRouter } from 'next/navigation'
import { ShoppingCart } from "./shopping-cart"
import { useState } from 'react'

interface SharedHeaderProps {
  title: string
  showBackButton?: boolean
  showLogo?: boolean
}

export function SharedHeader({ title, showBackButton = true, showLogo = false }: SharedHeaderProps) {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const handleBackClick = () => {
    router.back()
  }
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }
  
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-2">
          {showBackButton && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9"
              onClick={handleBackClick}
            >
              <ArrowLeft size={20} />
            </Button>
          )}
          
          {showLogo && (
            <div className="mr-2">
              <Logo size="sm" />
            </div>
          )}
          
          <h1 className="font-medium text-lg">{title}</h1>
          
          <div className="ml-auto flex items-center gap-1 md:gap-4">
            <nav className="hidden md:block">
              <ul className="flex gap-6 text-sm font-medium">
                <li><Link href="/about-us" className="text-gray-600 hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/careers" className="text-gray-600 hover:text-primary transition-colors">Careers</Link></li>
                <li><Link href="/blog" className="text-gray-600 hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="/press" className="text-gray-600 hover:text-primary transition-colors">Press</Link></li>
                <li><Link href="/partner-with-us" className="text-gray-600 hover:text-primary transition-colors">Partner with Us</Link></li>
                <li><Link href="/security" className="text-gray-600 hover:text-primary transition-colors">Security</Link></li>
                <li><Link href="/cookie-policy" className="text-gray-600 hover:text-primary transition-colors">Cookie Policy</Link></li>
              </ul>
            </nav>
            
            {/* Shopping Cart */}
            <ShoppingCart />
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9 md:hidden"
              onClick={toggleMobileMenu}
            >
              <Menu size={20} />
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-2 border-t pt-3">
            <nav>
              <ul className="flex flex-col gap-3 text-sm font-medium">
                <li><Link href="/about-us" className="text-gray-600 hover:text-primary transition-colors block py-1">About Us</Link></li>
                <li><Link href="/careers" className="text-gray-600 hover:text-primary transition-colors block py-1">Careers</Link></li>
                <li><Link href="/blog" className="text-gray-600 hover:text-primary transition-colors block py-1">Blog</Link></li>
                <li><Link href="/press" className="text-gray-600 hover:text-primary transition-colors block py-1">Press</Link></li>
                <li><Link href="/partner-with-us" className="text-gray-600 hover:text-primary transition-colors block py-1">Partner with Us</Link></li>
                <li><Link href="/security" className="text-gray-600 hover:text-primary transition-colors block py-1">Security</Link></li>
                <li><Link href="/cookie-policy" className="text-gray-600 hover:text-primary transition-colors block py-1">Cookie Policy</Link></li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
} 