import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CompareProvider } from "@/lib/compare-context"
import { CartProvider } from "@/lib/cart-context"
import { AuthProvider } from "@/lib/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Quick Grocery",
  description: "Quick delivery of groceries and essentials",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased">
        <AuthProvider>
          <CartProvider>
            <CompareProvider>
              {children}
            </CompareProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

import './globals.css'