import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  continueShopping?: () => void;
  actionType?: 'checkout' | 'wishlist' | 'generic';
}

export function LoginRequiredModal({
  isOpen,
  onClose,
  continueShopping,
  actionType = 'generic',
}: LoginRequiredModalProps) {
  const router = useRouter();
  const [isClosing, setIsClosing] = useState(false);

  const handleLogin = () => {
    router.push('/login');
    onClose();
  };

  const getTitle = () => {
    switch (actionType) {
      case 'checkout':
        return 'Login Required for Checkout';
      case 'wishlist':
        return 'Login to Save Items';
      default:
        return 'Login Required';
    }
  };

  const getMessage = () => {
    switch (actionType) {
      case 'checkout':
        return 'Please login to your account to complete your purchase.';
      case 'wishlist':
        return 'Please login to add items to your wishlist.';
      default:
        return 'Please login to continue.';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>{getMessage()}</DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center mt-2">
          <div className="relative w-40 h-40 mb-4">
            <Image 
              src="/Slice-13.png" 
              alt="Login required" 
              fill 
              className="object-contain"
            />
          </div>
          
          <div className="flex flex-col w-full gap-3">
            <Button
              onClick={handleLogin}
              className="bg-pastel-orange text-white hover:bg-pastel-orange/90"
            >
              Login Now
            </Button>
            
            <Button
              variant="outline"
              onClick={continueShopping || onClose}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 