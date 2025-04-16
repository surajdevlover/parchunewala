"use client"

import React from 'react';
import { useEffect, useState } from "react"
import { ArrowLeft, ArrowRight, Award, Box, Heart, Shield, Star, Truck } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function ProductLoading() {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(0)
  const [detailIndex, setDetailIndex] = useState(0)

  const productDetails = [
    "Loading product details...",
    "Checking availability...",
    "Fetching reviews...",
    "Getting similar products...",
  ]

  const productFeatures = [
    { icon: <Truck className="h-5 w-5 text-pastel-orange" />, text: "Fast Delivery" },
    { icon: <Shield className="h-5 w-5 text-pastel-orange" />, text: "Secure Payment" },
    { icon: <Award className="h-5 w-5 text-pastel-orange" />, text: "Quality Guarantee" },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 1
        if (newProgress >= 100) {
          clearInterval(timer)
          return 100
        }
        return newProgress
      })
    }, 50)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (progress > 30 && progress < 90) {
      setPhase(1)
    } else if (progress >= 90) {
      setPhase(2)
    }
  }, [progress])

  useEffect(() => {
    const interval = setInterval(() => {
      setDetailIndex((prevIndex: number) => (prevIndex + 1) % productDetails.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [productDetails.length])

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image Loading */}
        <div className="w-full md:w-1/2">
          <div className="shimmer-effect bg-gray-200 w-full aspect-square rounded-lg relative">
            <div className="shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
          
          {/* Thumbnail Images Loading */}
          <div className="mt-4 flex gap-2 overflow-x-auto">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="shimmer-effect flex-shrink-0 w-16 h-16 bg-gray-200 rounded-md relative">
                <div className="shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Product Information Loading */}
        <div className="w-full md:w-1/2">
          {/* Title Loading */}
          <div className="shimmer-effect bg-gray-200 h-8 w-3/4 rounded-md mb-2 relative">
            <div className="shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
          <div className="shimmer-effect bg-gray-200 h-6 w-1/2 rounded-md mb-4 relative">
            <div className="shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
          
          {/* Rating Loading */}
          <div className="flex items-center gap-2 mb-4">
            <div className="shimmer-effect bg-gray-200 h-5 w-32 rounded-md relative">
              <div className="shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>
          </div>
          
          {/* Price Loading */}
          <div className="shimmer-effect bg-gray-200 h-8 w-1/3 rounded-md mb-4 relative">
            <div className="shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
          
          {/* Store Selection Loading */}
          <div className="shimmer-effect bg-gray-200 h-10 w-full rounded-md mb-4 relative">
            <div className="shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
          
          {/* Quantity Loading */}
          <div className="shimmer-effect bg-gray-200 h-10 w-1/3 rounded-md mb-4 relative">
            <div className="shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
          
          {/* Action Buttons Loading */}
          <div className="flex gap-4 mb-6">
            <div className="shimmer-effect bg-gray-200 h-12 w-full rounded-md relative">
              <div className="shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>
            <div className="shimmer-effect bg-gray-200 h-12 w-full rounded-md relative">
              <div className="shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>
          </div>
          
          {/* Delivery Info Loading */}
          <div className="shimmer-effect bg-gray-200 h-8 w-full rounded-md mb-4 relative">
            <div className="shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
          <div className="shimmer-effect bg-gray-200 h-8 w-full rounded-md mb-2 relative">
            <div className="shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
        </div>
      </div>
      
      {/* Description Loading */}
      <div className="mt-8">
        <div className="shimmer-effect bg-gray-200 h-6 w-48 rounded-md mb-4 relative">
          <div className="shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
        <div className="space-y-2">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="shimmer-effect bg-gray-200 h-4 w-full rounded-md relative">
              <div className="shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Specifications Loading */}
      <div className="mt-8">
        <div className="shimmer-effect bg-gray-200 h-6 w-48 rounded-md mb-4 relative">
          <div className="shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="shimmer-effect bg-gray-200 h-10 w-full rounded-md relative">
              <div className="shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Similar Products Loading */}
      <div className="mt-12">
        <div className="shimmer-effect bg-gray-200 h-6 w-64 rounded-md mb-6 relative">
          <div className="shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="shimmer-effect bg-gray-200 h-64 w-full rounded-lg relative">
              <div className="shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 