"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { useAuth } from "@/lib/auth-context"
import { LoginRequiredModal } from "@/components/login-required-modal"

export default function TobaccoConfirmationScreen() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)

  const handleConfirmAge = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true)
      return
    }
    router.push("/product/tobacco-1")
  }

  const handleDenyAge = () => {
    router.push("/home")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-white" 
      style={{ backgroundImage: 'url(/Slice-19.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-lg shadow-lg flex flex-col items-center gap-8 max-w-md w-full text-center">
        <Logo size="md" />

        <div className="relative w-32 h-32 mx-auto">
          <Image src="/480935a.jpg" alt="Tobacco Product" fill className="object-contain" />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-dark-grey">Age Verification</h1>
          <p className="text-dark-grey">You must be 18+ to purchase tobacco products</p>
          {!isAuthenticated && (
            <div className="flex items-center justify-center gap-2 text-sm text-pastel-orange">
              <LogIn size={16} />
              <span>Login required for age verification</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 w-full mt-4">
          <Button className="bg-pastel-orange text-white w-full" onClick={handleConfirmAge}>
            Yes, I am 18+
          </Button>

          <Button variant="outline" className="w-full" onClick={handleDenyAge}>
            No
          </Button>
        </div>

        {isAuthenticated ? null : (
          <div className="w-full mt-4 pt-4 border-t border-gray-100">
            <p className="text-center text-gray-500 text-sm mb-4">Login to continue</p>
            <Link href="/login">
              <Button className="w-full bg-pastel-orange text-white">
                <LogIn size={16} className="mr-2" />
                Log in to verify age
              </Button>
            </Link>
          </div>
        )}
      </div>
      
      {/* Login Required Modal */}
      <LoginRequiredModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        actionType="generic"
      />
    </main>
  )
}

