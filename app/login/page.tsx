"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Eye, EyeOff, Loader2, LogOut, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/logo"
import { useAuth } from "@/lib/auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// In a real app, these would be environment variables
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"
const FACEBOOK_APP_ID = "YOUR_FACEBOOK_APP_ID"

export default function LoginScreen() {
  const router = useRouter()
  const { login, googleLogin, facebookLogin, logout, isLoading, isAuthenticated, user } = useAuth()
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [socialLoading, setSocialLoading] = useState({
    google: false,
    facebook: false
  })
  const [justLoggedOut, setJustLoggedOut] = useState(false)
  
  useEffect(() => {
    // Check if the user was redirected here after logout
    const params = new URLSearchParams(window.location.search)
    if (params.get('logout') === 'true') {
      setJustLoggedOut(true)
      // Auto clear the message after 3 seconds
      const timer = setTimeout(() => setJustLoggedOut(false), 3000)
      return () => clearTimeout(timer)
    }
    
    // If already authenticated, show logout option
    if (isAuthenticated) {
      setJustLoggedOut(false)
    }
    
    // Load Google API if needed (in a real app)
    // const loadGoogleScript = () => {
    //   const script = document.createElement('script')
    //   script.src = 'https://accounts.google.com/gsi/client'
    //   script.async = true
    //   script.defer = true
    //   document.body.appendChild(script)
    //   return () => document.body.removeChild(script)
    // }
    
    // Load Facebook API if needed (in a real app)
    // const loadFacebookScript = () => {
    //   const script = document.createElement('script')
    //   script.src = 'https://connect.facebook.net/en_US/sdk.js'
    //   script.async = true
    //   script.defer = true
    //   document.body.appendChild(script)
    //   window.fbAsyncInit = () => {
    //     window.FB.init({
    //       appId: FACEBOOK_APP_ID,
    //       cookie: true,
    //       xfbml: true,
    //       version: 'v18.0'
    //     })
    //   }
    //   return () => document.body.removeChild(script)
    // }
    
    // const googleCleanup = loadGoogleScript()
    // const facebookCleanup = loadFacebookScript()
    
    // return () => {
    //   googleCleanup()
    //   facebookCleanup()
    // }
  }, [isAuthenticated])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user types
    if (error) setError("")
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await login(formData.email, formData.password)
      router.push("/home")
    } catch (err) {
      setError("Invalid email or password")
    }
  }
  
  const handleGoogleLogin = async () => {
    try {
      setSocialLoading(prev => ({ ...prev, google: true }))
      
      // In a real app, you would use the Google API
      // const googleUser = await new Promise((resolve) => {
      //   window.google.accounts.id.initialize({
      //     client_id: GOOGLE_CLIENT_ID,
      //     callback: (response) => resolve(response)
      //   })
      //   window.google.accounts.id.prompt()
      // })
      
      await googleLogin()
      router.push("/home")
    } catch (err) {
      setError("Google login failed. Please try again.")
    } finally {
      setSocialLoading(prev => ({ ...prev, google: false }))
    }
  }
  
  const handleFacebookLogin = async () => {
    try {
      setSocialLoading(prev => ({ ...prev, facebook: true }))
      
      // In a real app, you would use the Facebook API
      // const facebookUser = await new Promise((resolve, reject) => {
      //   window.FB.login((response) => {
      //     if (response.authResponse) {
      //       resolve(response)
      //     } else {
      //       reject(new Error('Facebook login failed'))
      //     }
      //   }, { scope: 'email,public_profile' })
      // })
      
      await facebookLogin()
      router.push("/home")
    } catch (err) {
      setError("Facebook login failed. Please try again.")
    } finally {
      setSocialLoading(prev => ({ ...prev, facebook: false }))
    }
  }
  
  const handleLogout = () => {
    logout()
    setJustLoggedOut(true)
    // Add logout=true to the URL for state persistence
    router.push('/login?logout=true')
  }
  
  const toggleShowPassword = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <main className="min-h-screen bg-white md:bg-cover" style={{ backgroundImage: 'url(/Slice-15.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-white border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/home">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <ArrowLeft size={20} />
              </Button>
            </Link>
          </div>
          
          {isAuthenticated && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>You are logged in as {user?.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 pt-20 pb-10 flex flex-col min-h-screen">
        <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
          {justLoggedOut && (
            <Alert className="mb-4 bg-green-50 border-green-200">
              <AlertDescription className="flex items-center text-green-600">
                <Info size={16} className="mr-2" />
                You have been successfully logged out.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="bg-white/95 p-6 md:p-8 rounded-xl shadow-lg w-full backdrop-blur-sm">
            <div className="mb-6 md:mb-8 text-center">
              <Logo size="lg" className="mx-auto mb-4" />
              <h1 className="text-xl md:text-2xl font-semibold mb-1">Welcome back</h1>
              <p className="text-gray-500 text-sm md:text-base">Login to your account</p>
            </div>
            
            {error && (
              <div className="w-full p-3 mb-4 bg-red-50 text-red-600 text-sm rounded-md">
                {error}
              </div>
            )}
            
            <form className="w-full space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email or Phone Number
                </label>
                <Input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter your email or phone"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="flex justify-end mt-1">
                  <Link href="/forgot-password" className="text-xs text-pastel-orange">
                    Forgot Password?
                  </Link>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-pastel-orange text-white h-11"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin mr-2" />
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-pastel-orange font-medium">
                  Sign up
                </Link>
              </p>
            </div>
            
            <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-100 w-full">
              <p className="text-center text-gray-500 text-sm mb-4">Or continue with</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="h-11"
                  onClick={handleGoogleLogin}
                  disabled={socialLoading.google || isLoading}
                >
                  {socialLoading.google ? (
                    <Loader2 size={18} className="animate-spin mr-2" />
                  ) : (
                    <Image 
                      src="/images/google.svg" 
                      alt="Google" 
                      width={20} 
                      height={20} 
                      className="mr-2"
                    />
                  )}
                  Sign in with Google
                </Button>
                <Button 
                  variant="outline" 
                  className="h-11"
                  onClick={handleFacebookLogin}
                  disabled={socialLoading.facebook || isLoading}
                >
                  {socialLoading.facebook ? (
                    <Loader2 size={18} className="animate-spin mr-2" />
                  ) : (
                    <Image 
                      src="/images/facebook.svg" 
                      alt="Facebook" 
                      width={20} 
                      height={20} 
                      className="mr-2"
                    />
                  )}
                  Sign in with Facebook
                </Button>
              </div>
            </div>
            
            <div className="mt-6 text-center text-xs text-gray-500">
              <p>By continuing, you agree to our</p>
              <div className="flex justify-center gap-2 mt-1">
                <Link href="/terms" className="text-pastel-orange">Terms of Service</Link>
                <span>&</span>
                <Link href="/privacy" className="text-pastel-orange">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

