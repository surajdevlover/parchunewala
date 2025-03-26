"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("")
  const [recentSearches] = useState(["Amul Milk", "Bread", "Eggs", "Instant Noodles", "Organic Apples"])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search logic here
  }

  return (
    <main className="flex min-h-screen flex-col w-xl">
      {/* Search Header */}
      <div className="sticky top-0 z-10 border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Link href="/home">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft size={20} />
            </Button>
          </Link>

          <form onSubmit={handleSearch} className="flex-1 relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={18} className="text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search for products (e.g., instant noodles, organic apples)"
              className="w-full pl-10 pr-10 py-2 rounded-md bg-light-grey border-0 focus:ring-2 focus:ring-pastel-orange focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searchQuery && (
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setSearchQuery("")}
              >
                <X size={18} className="text-muted-foreground" />
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Recent Searches */}
      {!searchQuery && (
        <div className="px-4 py-4">
          <h2 className="font-medium text-dark-grey mb-3">Recent Searches</h2>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                className="px-3 py-1.5 bg-light-grey rounded-full text-sm text-dark-grey hover:bg-pastel-orange/10"
                onClick={() => setSearchQuery(search)}
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Items */}
      {!searchQuery ? (
        <div className="px-4 py-2">
          <h2 className="font-medium text-dark-grey mb-3">Recommended For You</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          <ProductCard
              id="1"
              name="Aashirvaad Multigrain Atta"
              price="₹327"
              mrp="₹404"
              quantity="5 Kg"
              image="https://cdn.zeptonow.com/cms/product_variant/e1812c8a-9ccc-4757-9c99-0cd25c686043.jpeg?height=200&width=200"
              rating={4.5}
            />
            <ProductCard
              id="2"
              name="Sundrop Superlite Advanced Sunflower Oil"
              price="₹608"
              mrp="₹639"
              quantity="3 L"
              image="https://cdn.zeptonow.com/cms/product_variant/93be0c88-124c-43e2-9333-6fd304c322f1.jpeg?height=200&width=200"
              rating={4.2}
              discount="10% OFF"
            />
            <ProductCard
              id="3"
              name="Organic Eggs"
              price="₹60"
              mrp="₹404"
              quantity="6 pcs"
              image="/placeholder.svg?height=200&width=200"
              rating={4.7}
            />
            <ProductCard
              id="4"
              name="Basmati Rice"
              price="₹120"
              mrp="₹404"
              quantity="1 Kg"
              image="/placeholder.svg?height=200&width=200"
              rating={4.3}
              discount="15% OFF"
            />
          </div>
        </div>
      ) : (
        <div className="px-4 py-4">
          <p className="text-muted-foreground text-sm mb-4">Showing results for "{searchQuery}"</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        <ProductCard
              id="3"
              name="Organic Eggs"
              price="₹60"
              mrp="₹404"
              quantity="6 pcs"
              image="/placeholder.svg?height=200&width=200"
              rating={4.7}
            />
            <ProductCard
              id="4"
              name="Basmati Rice"
              price="₹120"
              mrp="₹404"
              quantity="1 Kg"
              image="/placeholder.svg?height=200&width=200"
              rating={4.3}
              discount="15% OFF"
            />
          </div>
        </div>
      )}
    </main>
  )
}

