"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X } from 'lucide-react';

interface MobileAppPromptProps {
  onClose?: () => void;
}

export default function MobileAppPrompt({ onClose }: MobileAppPromptProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user has previously dismissed the prompt
    const appPromptDismissed = localStorage.getItem('appPromptDismissed');
    
    if (!appPromptDismissed) {
      // Delay showing the prompt by 3 seconds
      const timer = setTimeout(() => {
        setShow(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem('appPromptDismissed', 'true');
    if (onClose) {
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-pastel-orange/5 p-3 border-t border-pastel-orange/20 shadow-md z-30 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 flex-shrink-0">
          <div className="bg-pastel-orange rounded-lg flex items-center justify-center w-full h-full">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3H21V21H3V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 9H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 21V9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-gray-800">Get instant delivery with our app</h4>
          <p className="text-xs text-gray-500">Faster checkout, easier access, special discounts!</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={handleDismiss}
          className="text-gray-500 p-1.5"
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
        <Link href="#" className="bg-pastel-orange text-white text-xs font-medium px-3 py-1.5 rounded-md whitespace-nowrap">
          Get App
        </Link>
      </div>
    </div>
  );
} 