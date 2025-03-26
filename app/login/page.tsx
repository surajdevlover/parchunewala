"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"

export default function LoginScreen() {
  const router = useRouter()
  const [email, setEmail] = useState("demo@parchuneWala.com")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Login logic here
    router.push("/order-confirmation")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-white">
      <div className="flex flex-col items-center gap-8 max-w-md w-full">
        <Logo size="lg"/>

        <div className="flex flex-col gap-2 w-full text-center">
          <h1 className="text-2xl font-bold text-dark-grey">Login to Continue</h1>
          <p className="text-muted-foreground">Please login to complete your purchase</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-dark-grey">
              Email or Phone
            </label>
            <input
              id="email"
              type="text"
              className="px-3 py-2 rounded-md bg-light-grey border-0 focus:ring-2 focus:ring-pastel-orange focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-dark-grey">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 rounded-md bg-light-grey border-0 focus:ring-2 focus:ring-pastel-orange focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={18} className="text-muted-foreground" />
                ) : (
                  <Eye size={18} className="text-muted-foreground" />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-sm text-pastel-orange">
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" className="w-full bg-pastel-orange text-white h-12 text-base mt-2">
            Login
          </Button>
        </form>

        <div className="flex items-center gap-1">
          <span className="text-muted-foreground">Don't have an account?</span>
          <Link href="/signup" className="text-pastel-orange font-medium">
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  )
}

