"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CategoryCard } from "@/components/category-card"
import { Apple, Coffee, Beef, Sandwich, Tv, Pill, Heart } from "lucide-react"

export default function CategoriesScreen() {
  const [categories] = useState([
    { name: "Groceries", href: "/category/groceries", icon: Apple, color: "orange" },
    { name: "Beverages", href: "/category/beverages", icon: Coffee, color: "green" },
    { name: "Dairy", href: "/category/dairy", icon: Beef, color: "orange" },
    { name: "Snacks", href: "/category/snacks", icon: Sandwich, color: "green" },
    { name: "Electronics", href: "/category/electronics", icon: Tv, color: "orange" },
    { name: "Medical", href: "/category/medical", icon: Pill, color: "green" },
    { name: "Personal Care", href: "/category/personal-care", icon: Heart, color: "orange" },
  ])

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-border px-4 py-3">
        <div className="flex items-center">
          <Link href="/home">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-lg font-medium text-dark-grey ml-2">Categories</h1>
        </div>
      </header>

      {/* Categories Grid */}
      <div className="p-4">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-1">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              name={category.name}
              href={category.href}
              icon={category.icon}
              color={category.color as "orange" | "green"}
            />
          ))}
        </div>
      </div>

      {/* Subcategories */}
      <div className="px-4 py-2">
        <h2 className="font-bold text-lg text-dark-grey mb-3">Popular Subcategories</h2>
        <div className="grid gap-1">
          <Link
            href="/category/groceries/fresh-produce"
            className="flex items-center justify-between p-3 rounded-md hover:bg-light-grey"
          >
            <span className="text-dark-grey">Fresh Produce</span>
            <ChevronRight size={18} className="text-muted-foreground" />
          </Link>
          <Link
            href="/category/groceries/staples"
            className="flex items-center justify-between p-3 rounded-md hover:bg-light-grey"
          >
            <span className="text-dark-grey">Staples</span>
            <ChevronRight size={18} className="text-muted-foreground" />
          </Link>
          <Link
            href="/category/beverages/cold-drinks"
            className="flex items-center justify-between p-3 rounded-md hover:bg-light-grey"
          >
            <span className="text-dark-grey">Cold Drinks</span>
            <ChevronRight size={18} className="text-muted-foreground" />
          </Link>
          <Link
            href="/category/beverages/hot-drinks"
            className="flex items-center justify-between p-3 rounded-md hover:bg-light-grey"
          >
            <span className="text-dark-grey">Hot Drinks</span>
            <ChevronRight size={18} className="text-muted-foreground" />
          </Link>
        </div>
      </div>
    </main>
  )
}

