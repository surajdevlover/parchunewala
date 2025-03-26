"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Search, ShoppingCart, Apple, Coffee, Beef, Sandwich, Tv, Pill, Heart } from "lucide-react"
import { Logo } from "@/components/logo"
import { ProductCard } from "@/components/product-card"
import { StoreCard } from "@/components/store-card"
import { CategoryCard } from "@/components/category-card"
import { Button } from "@/components/ui/button"

export default function HomeScreen() {
  const [location] = useState("Noida,Uttar Pradesh")

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-border px-20">
        <div className="flex items-center mx-auto">
          <Logo size="md"/>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-dark-grey ml-20">
              <MapPin size={25} />
              <span className="text-sm font-medium">{location}</span>
            </div>

            {/* Search Bar */}
            <div className=" py-8 bg-white ml-20">
              <Link href="/search" className="relative w-full block">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-muted-foreground" />
                </div>
                <div className="w-full pl-10 pr-4 py-3 rounded-md bg-light-grey text-muted-foreground text-sm">
                  Search for products, e.g., Amul Milk, Bread...
                </div>
              </Link>
            </div>

            <Link href="/login"> 
              <Button className="ml-80 bg-yellow-300 text-pastel-green hover:bg-red/80 w-fit">
                Login
              </Button>
            </Link>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative ml-5">
                <ShoppingCart size={30} />
                <span className="absolute -top-1 -right-1 bg-pastel-orange text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Search Bar
      <div className="px-4 py-3 bg-white">
        <Link href="/search" className="relative w-full block">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={18} className="text-muted-foreground" />
          </div>
          <div className="w-full pl-10 pr-4 py-3 rounded-md bg-light-grey text-muted-foreground text-sm">
            Search for products, e.g., Amul Milk, Bread...
          </div>
        </Link>
      </div> */}
      <div className="flex min-h-screen flex-col bg-white px-40">
        {/* Categories */}
        <div className="px-4 py-4 ">
          <h2 className="font-bold text-lg text-dark-grey mb-3">Categories</h2>
          <div className="flex justify-between overflow-x-auto gap-0 pb-2 -mx-1 px-1">
            <CategoryCard name="Groceries" href="/category/groceries" icon={Apple} color="orange" />
            <CategoryCard name="Beverages" href="/category/beverages" icon={Coffee} color="green" />
            <CategoryCard name="Dairy" href="/category/dairy" icon={Beef} color="orange" />
            <CategoryCard name="Snacks" href="/category/snacks" icon={Sandwich} color="green" />
            <CategoryCard name="Electronics" href="/category/electronics" icon={Tv} color="orange" />
            <CategoryCard name="Medical" href="/category/medical" icon={Pill} color="green" />
            <CategoryCard name="Personal Care" href="/category/personal-care" icon={Heart} color="orange" />
          </div>
        </div>

        {/* Featured Products */}
        <div className="px-4 py-2">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-lg text-dark-grey">Featured Products</h2>
            <Link href="/category/featured" className="text-sm text-pastel-orange">
              See All
            </Link>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-7 md:grid-cols-7 gap-3 hover:bg-light-green">
            <ProductCard
              id="1"
              name="Aashirvaad Multigrain Atta"
              price="₹327"
              mrp="₹404"
              quantity="5 Kg"
              image="https://cdn.zeptonow.com/cms/product_variant/e1812c8a-9ccc-4757-9c99-0cd25c686043.jpeg?height=100&width=100"
              rating={4.5}
              discount="14% OFF"
            />
            <ProductCard
              id="2"
              name="Sundrop Superlite Advanced Sunflower Oil"
              price="₹608"
              mrp="₹639"
              quantity="3 L"
              image="https://cdn.zeptonow.com/cms/product_variant/93be0c88-124c-43e2-9333-6fd304c322f1.jpeg?height=100&width=100"
              rating={4.2}
              discount="3% OFF"
            />
            <ProductCard
              id="3"
              name="Wild Stone For Men"
              price="₹380"
              mrp="₹690"
              quantity="100 ML"
              image="https://cdn.zeptonow.com/inventory/product/1bb219ec-7b91-4824-8f7d-9d10a6a9995b-/tmp/20231003-1649451.jpeg?height=100&width=100"
              rating={4.7}
              discount="30% OFF"
            />
            <ProductCard
              id="4"
              name="Britannia 50-50 Maska Chaska Biscuit 300 g Combo"
              price="₹120"
              mrp="₹240"
              quantity="900 g"
              image="https://cdn.zeptonow.com/cms/product_variant/da022b28-0158-4f39-9335-d18755432e91.jpg?height=100&width=100"
              rating={4.3}
              discount="50% OFF"
            />
            <ProductCard
              id="3"
              name="Bonn White Bread"
              price="₹54"
              mrp="₹60"
              quantity="700 g"
              image="https://cdn.zeptonow.com/cms/product_variant/d12ee83b-4cd5-4dfe-88b0-05b5e1d4c414.jpeg?height=100&width=100"
              rating={4.7}
              discount="10% OFF"
            />
            <ProductCard
              id="3"
              name="Tide Matic Liquid Detergent"
              price="₹309"
              mrp="₹449"
              quantity="2 L"
              image="https://cdn.zeptonow.com/cms/product_variant/c3c04a73-f254-467f-94f5-ae6a548093ec.jpeg?height=100&width=100"
              rating={4.7}
              discount="29% OFF"
            />
            <ProductCard
              id="3"
              name="Wild Stone For Men"
              price="₹319"
              mrp="₹359"
              quantity="500 g"
              image="https://cdn.zeptonow.com/cms/product_variant/cf80423c-e07b-48f8-860d-da870b0ecd8c.jpg?height=100&width=100"
              rating={4.7}
              discount="12% OFF"
            />
          </div>
        </div>

        {/* Nearby Stores */}
        <div className="px-4 py-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-lg text-dark-grey">Nearby Stores</h2>
            <Link href="/stores" className="text-sm text-pastel-orange">
              See All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <StoreCard
              id="1"
              name="Satish Genral Store"
              location="Sector 44, Noida"
              image="https://content3.jdmagicbox.com/v2/comp/noida/k9/011pxx11.xx11.160125130009.a8k9/catalogue/anjali-general-store-noida-sector-44-noida-general-stores-2egpcjw.jpg?height=150&width=300"
              timing="Open 8 AM - 10 PM"
              rating={4.2}
              distance="0.5 km"
            />
            <StoreCard
              id="2"
              name="Pandit General Store"
              location="Sector 18, Noida"
              image="https://lh3.googleusercontent.com/gps-cs-s/AB5caB87a87mmqARf0sUuN4nXF-hUTfKpjt4Y8hZZoj-JKj4sfEJDNV2Nl1s9EX9mLnPa8MBS5Fd0Y2YvIkhLl1iD8WKYkCyUhc2AeBqO1SJpY74s19AICUnLxJ37C3ayAkzpxlj25bf=s1360-w1360-h1020?height=150&width=300"
              timing="Open 7 AM - 11 PM"
              rating={4.5}
              distance="3.1 km"
            />
            <StoreCard
              id="3"
              name="Anuj Kirana Store"
              location="Sector 126, Noida"
              image="https://lh3.googleusercontent.com/gps-cs-s/AB5caB_QAIR4rpDjU1ofWAq01ZqBN0Zds7Yuz0aeaFjF0PQ1sAXnAgCYw16L1WEBWKcTaK-CiWGmkqHo1RhOZ9M4z9RRo_yABuvZIMki9by6Efiwmq_FKTfWceBVprj9txNRLCgsjuE=s1360-w1360-h1020?height=150&width=300"
              timing="Open 9 AM - 9 PM"
              rating={4.0}
              distance="3.5 km"
            />
          </div>
        </div>

        {/* Deals */}
        <div className="px-4 py-2">
          <h2 className="font-bold text-lg text-dark-grey mb-3">Today's Deals</h2>
          <div className="relative rounded-lg overflow-hidden">
            <Image
              src="https://images.freekaamaal.com/post_images/1687159730.webp?height=30&width=100"
              alt="Special Deals"
              width={100}
              height={30}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-pastel-orange/80 to-transparent flex flex-col justify-center p-6">
              <h3 className="text-grey font-bold text-xl mb-2">Weekend Special</h3>
              <p className="text-grey text-md mb-4">Get up to 20% off on fresh produce</p>

              <Link href="/deal">
                <Button className="bg-green-200 text-pastel-white hover:bg-white/90 w-fit">Shop Now</Button>
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

