"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/logo"

export default function LoadingScreen() {
  const router = useRouter()
  const [loadingText, setLoadingText] = useState("Fetching your nearby stores")
  const loadingTexts = [
    "Fetching your nearby stores",
    "Setting up your experience",
    "Finding the best deals for you",
    "Almost ready...",
  ]

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % loadingTexts.length
      setLoadingText(loadingTexts[currentIndex])
    }, 2000)

    // Redirect to location screen after loading
    const timeout = setTimeout(() => {
      router.push("/location")
    }, 6000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [router])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-white">
      <div className="flex flex-col items-center gap-8 max-w-md w-full text-center">
        <Logo size="xl" />

        <div className="flex flex-col items-center gap-6">
          <span className="loader"></span>
          <p className="text-dark-grey text-lg font-medium animate-pulse">{loadingText}</p>
        </div>

        <div className="w-full mt-8">
          <div className="progress-bar w-full"></div>
        </div>
      </div>
    </main>
  )
}

