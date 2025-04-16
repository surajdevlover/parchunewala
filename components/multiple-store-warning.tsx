import { useState, useEffect } from 'react'
import { Store, AlertTriangle, ShoppingBag, Truck, InfoIcon, ShoppingCart } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

interface StoreWarningProps {
  onConfirm: () => void
  onCancel: () => void
}

export function MultipleStoreWarning({ onConfirm, onCancel }: StoreWarningProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [warningInfo, setWarningInfo] = useState<{
    hasMultipleStores: boolean
    currentStores: string[]
    newStore: string
  } | null>(null)
  const { hasMultipleStores, getMultipleStoreDeliveryFee, clearCart } = useCart()
  
  useEffect(() => {
    const handleMultipleStoreWarning = (event: Event) => {
      if ('detail' in event) {
        const detail = (event as CustomEvent).detail
        setWarningInfo(detail)
        setIsOpen(true)
      }
    }
    
    // Check if there's stored warning info from localStorage
    const checkStoredWarning = () => {
      const storedWarning = localStorage.getItem('multiple_store_warning')
      if (storedWarning) {
        try {
          const parsedWarning = JSON.parse(storedWarning)
          setWarningInfo(parsedWarning)
          setIsOpen(true)
          // Clear it from localStorage
          localStorage.removeItem('multiple_store_warning')
        } catch (error) {
          console.error('Error parsing warning info:', error)
        }
      }
    }
    
    // Initial check
    checkStoredWarning()
    
    // Add event listener
    window.addEventListener('multipleStoreWarning', handleMultipleStoreWarning)
    
    return () => {
      window.removeEventListener('multipleStoreWarning', handleMultipleStoreWarning)
    }
  }, [])
  
  const handleConfirm = () => {
    setIsOpen(false)
    
    // Get stored info for adding new items
    if (warningInfo) {
      // First clear the cart
      clearCart();
      
      // Now onConfirm will handle adding the new item
      onConfirm();
    }
  }
  
  const handleCancel = () => {
    setIsOpen(false)
    onCancel()
  }
  
  if (!isOpen || !warningInfo) return null
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-amber-600">
            <AlertTriangle className="h-5 w-5" />
            We deliver from only one store at a time
          </DialogTitle>
          <DialogDescription>
            Your cart has items from {warningInfo.currentStores.join(', ')}. Would you like to clear your cart and add items from {warningInfo.newStore} instead?
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-amber-100 p-2">
              <ShoppingCart className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-medium text-sm">Current cart items from:</h4>
              <ul className="mt-1 text-sm text-gray-600 space-y-1">
                {warningInfo.currentStores.map((store, i) => (
                  <li key={i} className="flex items-center gap-1">
                    <Store className="h-3 w-3" /> {store}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-blue-100 p-2">
              <Store className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-sm">You're trying to add from:</h4>
              <p className="mt-1 text-sm text-gray-600">{warningInfo.newStore}</p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-md flex gap-2">
            <InfoIcon className="h-5 w-5 text-blue-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-700 font-medium">
                Why we deliver from only one store:
              </p>
              <ul className="text-xs text-blue-700 mt-1 list-disc pl-4 space-y-1">
                <li>To ensure faster delivery times</li>
                <li>To provide free delivery on orders above ₹199</li>
                <li>To avoid extra packaging waste</li>
              </ul>
            </div>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button 
            onClick={handleCancel}
            variant="ghost"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm}
            className="bg-amber-600 hover:bg-amber-700"
          >
            Clear cart & Add new items
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 