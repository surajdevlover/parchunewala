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
import { motion } from "framer-motion"

export default function RegisterScreen() {
  const router = useRouter()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  
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
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }
  
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
    
    setIsLoading(true)
    try {
      // In a real app, would call an API endpoint to register user
      // For demo, we'll simulate registration success and then login
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      const success = await login(formData.email, formData.password)
      if (success) {
        setRegistrationSuccess(true)
        setEmailSent(true)
        
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          router.push("/login")
        }, 3000)
      } else {
        setError("Registration failed. Please try again.")
      }
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }
  
  const toggleShowPassword = () => {
    setShowPassword(prev => !prev)
  }
  
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(prev => !prev)
  }
  
  const handleBackClick = () => {
    router.back()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center">
        <button 
          onClick={handleBackClick} 
          className="p-2 rounded-full hover:bg-white/60 transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      <motion.div 
        className="flex flex-col items-center justify-center flex-1 px-4 py-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6"
          variants={itemVariants}
        >
          {registrationSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
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
            </motion.div>
          )}
          
          <motion.div className="mb-6 text-center" variants={itemVariants}>
            <div className="mx-auto mb-4 flex justify-center">
              <Logo size="md" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
            <p className="text-gray-600 text-sm mt-1">Join ParchuneWala to enjoy hassle-free shopping</p>
          </motion.div>

          {error && (
            <motion.div 
              className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full ${fieldErrors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                  required
                />
                {fieldErrors.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={12} className="mr-1" />
                    {fieldErrors.name}
                  </p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className={`w-full ${fieldErrors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                  required
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={12} className="mr-1" />
                    {fieldErrors.email}
                  </p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your 10-digit phone number"
                  className={`w-full ${fieldErrors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
                  required
                  maxLength={10}
                />
                {fieldErrors.phone && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={12} className="mr-1" />
                    {fieldErrors.phone}
                  </p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className={`w-full pr-10 ${fieldErrors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {passwordStrength && (
                  <div className="mt-1 flex items-center text-xs">
                    {getPasswordStrengthIcon()}
                    <span className={`ml-1 ${getPasswordStrengthColor()}`}>
                      Password strength: {passwordStrength}
                    </span>
                  </div>
                )}
                {fieldErrors.password && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={12} className="mr-1" />
                    {fieldErrors.password}
                  </p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className={`w-full pr-10 ${fieldErrors.confirmPassword || showPasswordMismatch ? 'border-red-500 focus:ring-red-500' : ''}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleShowConfirmPassword}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {showPasswordMismatch && !fieldErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <XCircle size={12} className="mr-1" />
                    Passwords don't match
                  </p>
                )}
                {fieldErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={12} className="mr-1" />
                    {fieldErrors.confirmPassword}
                  </p>
                )}
              </motion.div>

              <motion.div className="pt-2" variants={itemVariants}>
                <Button
                  type="submit"
                  className="w-full bg-pastel-orange hover:bg-pastel-orange/90 text-white py-2 rounded-lg transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </motion.div>
            </div>
          </form>

          <motion.div className="mt-6 text-center" variants={itemVariants}>
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-pastel-orange hover:underline">
                Log In
              </Link>
            </p>
          </motion.div>
          
          <motion.div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500 text-center" variants={itemVariants}>
            By creating an account, you agree to our{' '}
            <Link href="/terms-of-service" className="text-pastel-orange hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy-policy" className="text-pastel-orange hover:underline">
              Privacy Policy
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  )
} 