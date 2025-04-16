"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart as ShoppingCartIcon, X, Plus, Minus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { LoginRequiredModal } from "@/components/login-required-modal";

export function ShoppingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { cartItems, updateQuantity: updateCartQuantity, removeFromCart, totalItems, cartTotal: getCartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Handlers
  const toggleCart = () => setIsOpen(!isOpen);
  const closeCart = () => setIsOpen(false);

  const handleUpdateQuantity = (id: string, storeId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id, storeId);
      return;
    }
    
    updateCartQuantity(id, storeId, newQuantity);
  };

  const handleRemoveItem = (id: string, storeId: string) => {
    removeFromCart(id, storeId);
  };

  // Get item count from cart context
  const itemCount = totalItems();
  
  // Calculate total from cart context
  const cartTotal = getCartTotal().replace('₹', '');

  // Handle checkout click
  const handleCheckoutClick = () => {
    if (isAuthenticated) {
      closeCart();
      router.push('/checkout');
    } else {
      setShowLoginModal(true);
    }
  };

  // Handle login click from modal
  const handleLoginClick = () => {
    closeCart();
    router.push('/login');
    setShowLoginModal(false);
  };

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const cartVariants = {
    hidden: { x: "100%" },
    visible: { 
      x: 0,
      transition: { type: "spring", damping: 25, stiffness: 250 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", damping: 25 }
    },
    exit: { 
      opacity: 0, 
      x: 20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <>
      {/* Cart toggle button */}
      <button 
        onClick={toggleCart}
        className="relative p-2 text-gray-700 hover:text-primary transition-colors"
        aria-label="Shopping cart"
      >
        <ShoppingCartIcon className="h-6 w-6" />
        {itemCount > 0 && (
          <span className="absolute top-0 right-0 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>

      {/* Cart sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              className="fixed inset-0 bg-black/25 z-40"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={backdropVariants}
              onClick={closeCart}
            />

            {/* Cart panel */}
            <motion.div 
              className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 flex flex-col"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={cartVariants}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-medium">Your Cart ({itemCount})</h2>
                <button 
                  onClick={closeCart}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close cart"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Cart content */}
              <div className="flex-1 overflow-y-auto p-4">
                {isLoading ? (
                  <div className="flex flex-col gap-4">
                    {[1, 2].map(i => (
                      <div key={i} className="flex gap-4 animate-pulse">
                        <div className="bg-gray-200 h-16 w-16 rounded"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : cartItems.length > 0 ? (
                  <motion.ul className="space-y-4">
                    <AnimatePresence mode="popLayout">
                      {cartItems.map(item => (
                        <motion.li 
                          key={`${item.product.id}-${item.storeId}`}
                          className="flex items-start gap-3 pb-4 border-b"
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          layout
                        >
                          <div className="relative h-16 w-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                            <Image 
                              src={item.product.image || "/images/product-placeholder.jpg"} 
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="text-sm font-medium line-clamp-2">{item.product.name}</h3>
                            <p className="text-xs text-gray-500 mt-0.5">{item.product.quantity}</p>
                            
                            <div className="flex justify-between items-center mt-2">
                              <div className="flex items-center border rounded-md">
                                <button 
                                  onClick={() => handleUpdateQuantity(item.product.id, item.storeId, item.quantity - 1)}
                                  className="p-1 hover:bg-gray-100"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="h-3.5 w-3.5" />
                                </button>
                                <span className="px-2 text-sm">{item.quantity}</span>
                                <button 
                                  onClick={() => handleUpdateQuantity(item.product.id, item.storeId, item.quantity + 1)}
                                  className="p-1 hover:bg-gray-100"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                </button>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{item.product.price}</span>
                                <button 
                                  onClick={() => handleRemoveItem(item.product.id, item.storeId)}
                                  className="text-red-500 p-1 hover:bg-red-50 rounded-full transition-colors"
                                  aria-label="Remove item"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </motion.ul>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-4">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <ShoppingCartIcon className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">Your cart is empty</h3>
                    <p className="text-gray-500 text-sm mb-6">Add items to your cart to see them here</p>
                    <button 
                      onClick={closeCart}
                      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-600 transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                )}
              </div>

              {/* Cart footer */}
              {cartItems.length > 0 && (
                <div className="border-t p-4">
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-600">Delivery</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-medium mb-6">
                    <span>Total</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <button
                    className="w-full bg-primary text-white py-3 rounded-md font-medium flex items-center justify-center hover:bg-primary-600 transition-colors"
                    onClick={handleCheckoutClick}
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    className="w-full mt-2 border border-gray-300 py-2.5 rounded-md text-sm hover:bg-gray-50 transition-colors"
                    onClick={closeCart}
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Login Required Modal */}
      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLoginClick}
        actionType="cart"
      />
    </>
  );
} 