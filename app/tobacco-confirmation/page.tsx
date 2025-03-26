"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"

export default function TobaccoConfirmationScreen() {
  const router = useRouter()

  const handleConfirmAge = () => {
    router.push("/product/tobacco-1")
  }

  const handleDenyAge = () => {
    router.push("/home")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-white">
      <div className="flex flex-col items-center gap-8 max-w-md w-full text-center">
        <Logo size="md" />

        <div className="relative w-32 h-32 mx-auto">
          <Image src="/placeholder.svg?height=200&width=200" alt="Tobacco Product" fill className="object-contain" />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-dark-grey">Age Verification</h1>
          <p className="text-dark-grey">You must be 18+ to purchase tobacco products</p>
        </div>

        <div className="flex flex-col gap-3 w-full mt-4">
          <Button className="bg-pastel-orange text-white w-full" onClick={handleConfirmAge}>
            Yes, I am 18+
          </Button>

          <Button variant="outline" className="w-full" onClick={handleDenyAge}>
            No
          </Button>
        </div>
      </div>
    </main>
  )
}

