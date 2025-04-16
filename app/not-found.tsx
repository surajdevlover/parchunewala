"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home, Search, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function NotFound() {
  const router = useRouter()
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9"
              onClick={() => router.back()}
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="font-medium text-lg">Page Not Found</h1>
          </div>
        </div>
      </header>
      
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full mx-auto text-center"
        >
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 0.8
            }}
            className="w-32 h-32 bg-pastel-orange/10 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <AlertCircle size={64} className="text-pastel-orange" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          </motion.div>
          
          <motion.p 
            className="text-gray-600 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            The page you are looking for doesn't exist or has been moved.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Link href="/">
                <Button className="w-full sm:w-auto bg-pastel-orange text-white gap-2">
                  <Home size={18} />
                  Go to Homepage
                </Button>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <Link href="/search">
                <Button variant="outline" className="w-full sm:w-auto gap-2">
                  <Search size={18} />
                  Search Products
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <footer className="py-4 bg-white">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ParchuneWala. All rights reserved.
        </div>
      </footer>
    </div>
  )
} 