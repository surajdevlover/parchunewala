"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Eye, EyeOff, Loader2, Info, AlertCircle, CheckCircle2, XCircle, AlertTriangle, ShieldCheck, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/logo"
import { useAuth } from "@/lib/auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function RegisterScreen() {
  const router = useRouter()
  const { register, isLoading } = useAuth()
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  })
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState<"" | "weak" | "moderate" | "strong">("")
  const [showPasswordMismatch, setShowPasswordMismatch] = useState(false)
  
  // Capitalize first letter of each word in name
  useEffect(() => {
    if (formData.name) {
      const capitalized = formData.name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      if (capitalized !== formData.name) {
        setFormData(prev => ({
          ...prev,
          name: capitalized
        }));
      }
    }
  }, [formData.name]);

  // Check password strength
  useEffect(() => {
    if (formData.password) {
      // Check password strength
      const hasUpperCase = /[A-Z]/.test(formData.password);
      const hasLowerCase = /[a-z]/.test(formData.password);
      const hasNumbers = /\d/.test(formData.password);
      const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password);
      
      const strength = 
        (hasUpperCase ? 1 : 0) + 
        (hasLowerCase ? 1 : 0) + 
        (hasNumbers ? 1 : 0) + 
        (hasSpecialChars ? 1 : 0) + 
        (formData.password.length >= 8 ? 1 : 0);
      
      if (strength <= 2) {
        setPasswordStrength("weak");
      } else if (strength <= 3) {
        setPasswordStrength("moderate");
      } else {
        setPasswordStrength("strong");
      }
    } else {
      setPasswordStrength("");
    }
    
    // Check if passwords match
    if (formData.password && formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        setShowPasswordMismatch(true);
      } else {
        setShowPasswordMismatch(false);
      }
    } else {
      setShowPasswordMismatch(false);
    }
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    // For phone field, only allow numeric input
    if (name === 'phone' && value !== '' && !/^\d*$/.test(value)) {
      setFieldErrors(prev => ({
        ...prev,
        phone: "Phone number must contain only digits"
      }));
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear field-specific error
    setFieldErrors(prev => ({
      ...prev,
      [name]: ""
    }));
    
    // Clear general error
    if (error) setError("");
  }
  
  const validateForm = (): boolean => {
    let isValid = true;
    const newFieldErrors = {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: ""
    };
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newFieldErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    
    // Phone validation - must be exactly 10 digits
    if (formData.phone && formData.phone.length !== 10) {
      newFieldErrors.phone = "Phone number must be exactly 10 digits";
      isValid = false;
    }
    
    // Password validation
    if (formData.password.length < 6) {
      newFieldErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newFieldErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }
    
    setFieldErrors(newFieldErrors);
    return isValid;
  }
  
  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case "weak":
        return "text-red-500";
      case "moderate":
        return "text-yellow-500";
      case "strong":
        return "text-green-600";
      default:
        return "text-gray-400";
    }
  };

  const getPasswordStrengthIcon = () => {
    switch (passwordStrength) {
      case "weak":
        return <ShieldCheck size={16} className="text-red-500" />;
      case "moderate":
        return <Shield size={16} className="text-yellow-500" />;
      case "strong":
        return <ShieldCheck size={16} className="text-green-600" />;
      default:
        return null;
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all fields
    if (!validateForm()) {
      return;
    }
    
    try {
      await register(formData.name, formData.email, formData.phone, formData.password)
      setRegistrationSuccess(true)
      
      // Simulate sending confirmation email
      setEmailSent(true)
      
      // Redirect to login page after 3 seconds
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.")
    }
  }
  
  const toggleShowPassword = () => {
    setShowPassword(prev => !prev)
  }
  
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(prev => !prev)
  }

  return (
    <main className="min-h-screen bg-white md:bg-cover" style={{ backgroundImage: 'url(/images/back.avif)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-white border-b border-border px-4 py-3">
        <div className="flex items-center">
          <Link href="/login">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft size={20} />
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-20 pb-10 flex flex-col min-h-screen">
        <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
          {registrationSuccess && (
            <Alert className="mb-4 bg-green-50 border-green-200">
              <AlertDescription className="flex flex-col">
                <div className="flex items-center text-green-600 font-medium">
                  <Info size={16} className="mr-2" />
                  Registration successful!
                </div>
                {emailSent && (
                  <p className="text-green-600 text-sm mt-1 ml-6">
                    A confirmation email has been sent to <span className="font-medium">{formData.email}</span>.
                    Redirecting to login...
                  </p>
                )}
              </AlertDescription>
            </Alert>
          )}
          
          <div className="bg-white/95 p-6 md:p-8 rounded-xl shadow-lg w-full backdrop-blur-sm">
            <div className="mb-6 md:mb-8 text-center">
              <Logo size="lg" className="mx-auto mb-4" />
              <h1 className="text-xl md:text-2xl font-semibold mb-1">Create Account</h1>
              <p className="text-gray-500 text-sm md:text-base">Sign up to get started</p>
            </div>
            
            {error && (
              <div className="w-full p-3 mb-4 bg-red-50 text-red-600 text-sm rounded-md">
                {error}
              </div>
            )}
            
            <form className="w-full space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  Full Name <span className="text-red-500 ml-1">*</span>
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full ${fieldErrors.name ? 'border-red-300' : ''}`}
                />
                {fieldErrors.name && (
                  <p className="mt-1 text-sm text-red-500">{fieldErrors.name}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  Email <span className="text-red-500 ml-1">*</span>
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full ${fieldErrors.email ? 'border-red-300' : ''}`}
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-sm text-red-500">{fieldErrors.email}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">A confirmation email will be sent to this address</p>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  Phone Number <span className="text-red-500 ml-1">*</span>
                </label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter your 10-digit phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={10}
                  pattern="[0-9]{10}"
                  required
                  className={`w-full ${fieldErrors.phone ? 'border-red-300' : ''}`}
                />
                {fieldErrors.phone && (
                  <p className="mt-1 text-sm text-red-500">{fieldErrors.phone}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  Password <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={`w-full pr-10 ${fieldErrors.password ? 'border-red-300' : ''}`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p className="mt-1 text-sm text-red-500">{fieldErrors.password}</p>
                )}
                
                {/* Password strength indicator */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center">
                      {getPasswordStrengthIcon()}
                      <p className={`text-xs ml-1 ${getPasswordStrengthColor()}`}>
                        Password strength: <span className="font-medium">{passwordStrength}</span>
                      </p>
                    </div>
                    <div className="mt-1 flex w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          passwordStrength === "weak" 
                            ? "bg-red-500 w-1/3" 
                            : passwordStrength === "moderate" 
                              ? "bg-yellow-500 w-2/3" 
                              : "bg-green-600 w-full"
                        }`}
                      />
                    </div>
                    <div className="mt-1.5">
                      <ul className="text-xs text-gray-500 space-y-1">
                        <li className="flex items-center">
                          <span className={`mr-1 ${formData.password.length >= 8 ? "text-green-600" : "text-gray-400"}`}>
                            {formData.password.length >= 8 ? "✓" : "•"}
                          </span>
                          At least 8 characters
                        </li>
                        <li className="flex items-center">
                          <span className={`mr-1 ${/[A-Z]/.test(formData.password) ? "text-green-600" : "text-gray-400"}`}>
                            {/[A-Z]/.test(formData.password) ? "✓" : "•"}
                          </span>
                          Contains uppercase letter
                        </li>
                        <li className="flex items-center">
                          <span className={`mr-1 ${/\d/.test(formData.password) ? "text-green-600" : "text-gray-400"}`}>
                            {/\d/.test(formData.password) ? "✓" : "•"}
                          </span>
                          Contains number
                        </li>
                        <li className="flex items-center">
                          <span className={`mr-1 ${/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password) ? "text-green-600" : "text-gray-400"}`}>
                            {/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password) ? "✓" : "•"}
                          </span>
                          Contains special character
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  Confirm Password <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className={`w-full pr-10 ${fieldErrors.confirmPassword || showPasswordMismatch ? 'border-red-300' : formData.confirmPassword && formData.password === formData.confirmPassword ? 'border-green-300' : ''}`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={toggleShowConfirmPassword}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {fieldErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">{fieldErrors.confirmPassword}</p>
                )}
                
                {/* Password match indicator */}
                {formData.confirmPassword && (
                  <div className="mt-1 flex items-center">
                    {formData.password === formData.confirmPassword ? (
                      <>
                        <CheckCircle2 size={14} className="text-green-600" />
                        <p className="text-xs text-green-600 ml-1">Passwords match</p>
                      </>
                    ) : (
                      <>
                        <XCircle size={14} className="text-red-500" />
                        <p className="text-xs text-red-500 ml-1">Passwords do not match</p>
                      </>
                    )}
                  </div>
                )}
              </div>
              
              <div className="mb-1">
                <p className="text-xs text-gray-500 flex items-center">
                  <span className="text-red-500 mr-1">*</span> All fields are required
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-pastel-orange text-white h-11"
                disabled={isLoading || registrationSuccess}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin mr-2" />
                    Creating Account...
                  </>
                ) : (
                  'Sign Up'
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-pastel-orange font-medium">
                  Login
                </Link>
              </p>
            </div>
            
            <div className="mt-6 text-center text-xs text-gray-500">
              <p>By signing up, you agree to our</p>
              <div className="flex justify-center gap-2 mt-1">
                <Link href="/terms" className="text-pastel-orange">Terms of Service</Link>
                <span>&</span>
                <Link href="/privacy" className="text-pastel-orange">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Success Popup */}
      {registrationSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-center mb-2">Registration Successful!</h3>
            <p className="text-center text-gray-600 mb-1">Thank you for creating an account.</p>
            <p className="text-center text-gray-600 mb-4">
              A confirmation email has been sent to <span className="font-medium">{formData.email}</span>
            </p>
            
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-4">You will be redirected to the login page shortly...</p>
              <Button 
                className="w-full bg-pastel-orange text-white"
                onClick={() => router.push('/login')}
              >
                Go to Login
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Password Mismatch Popup */}
      {showPasswordMismatch && formData.confirmPassword && (
        <div className="fixed bottom-4 right-4 bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg z-40 max-w-sm animate-fade-in">
          <div className="flex items-start">
            <AlertTriangle className="text-red-500 mt-0.5 mr-3" size={20} />
            <div>
              <h4 className="font-medium text-red-700">Passwords Don't Match</h4>
              <p className="text-sm text-red-600 mt-1">
                The password and confirmation password must be identical. Please check and try again.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
} 