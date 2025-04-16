"use client"

import { useState, useEffect } from "react"

export function useMobileDetection() {
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    // Skip on server side
    if (typeof window === 'undefined') return
    
    // Check if the user is on a mobile device using a basic check
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
    
    // Check if we should show the prompt based on localStorage
    const promptDismissed = localStorage.getItem('app_prompt_dismissed')
    
    // Show prompt for mobile users who haven't dismissed it
    if (isMobile && promptDismissed !== 'true') {
      setShowPrompt(true)
    }
  }, [])

  return { showPrompt, setShowPrompt }
} 