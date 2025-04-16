"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart, X } from "lucide-react"

interface MobileAppPromptProps {
  onClose: () => void
}

export function MobileAppPrompt({ onClose }: MobileAppPromptProps) {
  const dismissPrompt = () => {
    // Store in localStorage only on client-side
    if (typeof window !== 'undefined') {
      localStorage.setItem('app_prompt_dismissed', 'true')
    }
    onClose()
  }

  const downloadApp = () => {
    // Open app store or play store in a new tab
    window.open('https://play.google.com/store', '_blank')
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-3 shadow-lg z-30 border-t border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-12 w-12 bg-pastel-orange rounded-md flex items-center justify-center mr-3">
            <ShoppingCart size={20} className="text-white" />
          </div>
          <div>
            <h4 className="text-sm font-medium">Get instant delivery with our app</h4>
            <p className="text-[10px] text-gray-600">10-minute delivery, lower prices & exclusive offers!</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            className="h-9 px-3 text-xs bg-pastel-orange hover:bg-pastel-orange/90 text-white"
            onClick={downloadApp}
          >
            Get App
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-gray-400 hover:bg-gray-100"
            onClick={dismissPrompt}
          >
            <X size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
} 