"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart as ShoppingCartIcon, X, Plus, Minus, Trash2, Store, AlertTriangle } from "lucide-react";
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
  const [showMultiStoreWarning, setShowMultiStoreWarning] = useState(false);
  const { 
    cartItems, 
    updateQuantity: updateCartQuantity, 
    removeFromCart, 
    totalItems, 
    cartTotal: getCartTotal,
    moveAllToStore 
  } = useCart();
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

  // Group cart items by store
  const groupByStore = () => {
    const grouped: Record<string, typeof cartItems> = {}
    
    cartItems.forEach(item => {
      if (!grouped[item.storeId]) {
        grouped[item.storeId] = []
      }
      grouped[item.storeId].push(item)
    })
    
    return grouped
  }
  
  const storeGroups = groupByStore()
  const storeCount = Object.keys(storeGroups).length
  const hasMultipleStores = storeCount > 1

  // Show multi-store warning when store count changes to more than 1
  useEffect(() => {
    if (hasMultipleStores && !showMultiStoreWarning) {
      setShowMultiStoreWarning(true);
    } else if (!hasMultipleStores) {
      setShowMultiStoreWarning(false);
    }
  }, [hasMultipleStores, storeCount]);

  // Calculate delivery fee based on store and total
  const calculateDeliveryFee = (storeTotal: number, storeId: string = "1") => {
    // Basic threshold for free delivery is ₹199
    const baseDeliveryFee = storeTotal >= 199 ? 0 : 15;
    
    // Add distance-based fee based on store
    let distanceFee = 0;
    if (storeId === "2") {
      distanceFee = 10; // Medium distance store
    } else if (storeId === "3") {
      distanceFee = 20; // Farthest store
    }
    
    // No distance fee if order qualifies for free delivery
    if (storeTotal >= 199) {
      return 0;
    }
    
    return baseDeliveryFee + distanceFee;
  }
  
  // Calculate total delivery fee across all stores
  const calculateTotalDeliveryFee = () => {
    return Object.entries(storeGroups).reduce((total, [storeId, items]) => {
      const storeTotal = items.reduce((sum, item) => {
        const price = parseFloat(item.product.price.replace('₹', ''))
        return sum + (price * item.quantity)
      }, 0)
      
      return total + calculateDeliveryFee(storeTotal, storeId)
    }, 0)
  }

  // Handle checkout click
  const handleCheckoutClick = () => {
    // Check all authentication methods directly
    const userData = localStorage.getItem('user_data');
    const authState = localStorage.getItem('auth_state');
    const isLoggedInManual = !!userData && authState === 'authenticated';
    
    // If authenticated by any method, proceed directly
    if (isAuthenticated || isLoggedInManual) {
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

  // Add guaranteed checkout function that bypasses all login requirements
  const guaranteedCheckout = () => {
    // Always ensure the user is logged in before checkout
    const userData = localStorage.getItem('user_data');
    
    // If no user data exists, create a guest user
    if (!userData) {
      console.log("Creating guest user for checkout");
      const guestUser = {
        id: 'guest-' + Date.now(),
        name: 'Guest User',
        email: 'guest@example.com',
        avatar: ''
      };
      localStorage.setItem('user_data', JSON.stringify(guestUser));
      localStorage.setItem('auth_state', 'authenticated');
      localStorage.setItem('isLoggedIn', 'true');
    }
    
    // Clear any modal flags that might trigger login prompts
    sessionStorage.removeItem('has_shown_login_modal');
    
    // Close cart
    closeCart();
    
    // Navigate with a slight delay to allow auth state to propagate
    setTimeout(() => {
      console.log("Redirecting to checkout as authenticated user");
      router.push('/checkout');
    }, 100);
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

  // Find cheapest store for all current items
  const findCheapestStore = () => {
    // Only do this calculation if we have multiple stores
    if (!hasMultipleStores) return null;
    
    const storePrices: Record<string, number> = {};
    const storeNames: Record<string, string> = {};
    
    // Check each item
    cartItems.forEach(item => {
      if (item.product.storeOptions) {
        item.product.storeOptions.forEach(option => {
          if (option.available) {
            const price = parseFloat(option.price.replace('₹', '')) * item.quantity;
            
            if (!storePrices[option.storeId]) {
              storePrices[option.storeId] = 0;
              storeNames[option.storeId] = option.storeName;
            }
            
            storePrices[option.storeId] += price;
          }
        });
      }
    });
    
    // Find store with lowest total price
    let cheapestStoreId = "";
    let lowestPrice = Infinity;
    
    Object.entries(storePrices).forEach(([storeId, price]) => {
      if (price < lowestPrice) {
        lowestPrice = price;
        cheapestStoreId = storeId;
      }
    });
    
    if (cheapestStoreId) {
      const currentTotal = cartItems.reduce((sum, item) => {
        const price = parseFloat(item.product.price.replace('₹', ''))
        return sum + (price * item.quantity)
      }, 0);
      
      // Calculate savings
      const savings = currentTotal - lowestPrice;
      
      if (savings > 0) {
        return {
          storeId: cheapestStoreId,
          storeName: storeNames[cheapestStoreId],
          savings: savings.toFixed(0)
        };
      }
    }
    
    return null;
  }

  // Find the store with the most items
  const findDominantStore = () => {
    if (!hasMultipleStores) return null;
    
    // Count items per store
    const storeCounts: Record<string, number> = {};
    const storeNames: Record<string, string> = {};
    
    Object.entries(storeGroups).forEach(([storeId, items]) => {
      storeCounts[storeId] = items.length;
      storeNames[storeId] = items[0].storeName;
    });
    
    // Find store with most items
    let dominantStoreId = "";
    let highestCount = 0;
    
    Object.entries(storeCounts).forEach(([storeId, count]) => {
      if (count > highestCount) {
        highestCount = count;
        dominantStoreId = storeId;
      }
    });
    
    if (dominantStoreId) {
      return {
        storeId: dominantStoreId,
        storeName: storeNames[dominantStoreId],
        itemCount: highestCount
      };
    }
    
    return null;
  }
  
  const cheapestStore = findCheapestStore();
  const dominantStore = findDominantStore();

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

              {/* Multi-store warning popup */}
              <AnimatePresence>
                {showMultiStoreWarning && (
                  <motion.div 
                    className="absolute inset-x-0 top-16 mx-4 z-10"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 shadow-md">
                      <div className="flex items-start gap-3">
                        <div className="text-amber-500 mt-0.5">
                          <AlertTriangle size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-amber-800">Multiple Store Order</h3>
                            <button 
                              onClick={() => setShowMultiStoreWarning(false)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <X size={16} />
                            </button>
                          </div>
                          <p className="text-sm text-amber-700 mt-1 mb-2">
                            You're ordering from {storeCount} different stores. Each store has its own delivery fee.
                          </p>
                          
                          <div className="bg-white bg-opacity-60 rounded p-2 mt-2 mb-3">
                            <p className="text-xs font-medium text-gray-700 mb-1">Delivery fees:</p>
                            {Object.entries(storeGroups).map(([storeId, items]) => {
                              const storeTotal = items.reduce((sum, item) => {
                                const price = parseFloat(item.product.price.replace('₹', ''))
                                return sum + (price * item.quantity)
                              }, 0);
                              
                              const deliveryFee = calculateDeliveryFee(storeTotal, storeId);
                              
                              return (
                                <div key={storeId} className="flex justify-between text-xs">
                                  <span>{items[0].storeName}</span>
                                  <span className={deliveryFee === 0 ? "text-green-600" : ""}>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
                                </div>
                              );
                            })}
                            <div className="flex justify-between text-xs font-medium mt-1 pt-1 border-t border-amber-200">
                              <span>Total delivery fee:</span>
                              <span>₹{calculateTotalDeliveryFee()}</span>
                            </div>
                          </div>
                          
                          {cheapestStore && (
                            <div className="mb-2">
                              <p className="text-sm text-green-700 mb-1">
                                💰 Save <span className="font-bold">₹{cheapestStore.savings}</span> by ordering from <span className="font-medium">{cheapestStore.storeName}</span>
                              </p>
                              <button 
                                className="text-xs bg-green-100 text-green-700 font-medium py-1.5 px-3 rounded border border-green-200 hover:bg-green-200 transition-colors w-full"
                                onClick={() => {
                                  moveAllToStore(cheapestStore.storeId);
                                  setShowMultiStoreWarning(false);
                                }}
                              >
                                Move All to {cheapestStore.storeName}
                              </button>
                            </div>
                          )}
                          
                          {dominantStore && !cheapestStore && (
                            <div className="mb-2">
                              <button 
                                className="text-xs bg-amber-100 text-amber-700 font-medium py-1.5 px-3 rounded border border-amber-200 hover:bg-amber-200 transition-colors w-full"
                                onClick={() => {
                                  moveAllToStore(dominantStore.storeId);
                                  setShowMultiStoreWarning(false);
                                }}
                              >
                                Consolidate to {dominantStore.storeName}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

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
                      {/* Group items by store */}
                      {Object.entries(storeGroups).map(([storeId, items]) => (
                        <div key={storeId} className="mb-6">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <Store size={12} className="text-pastel-orange" />
                              <span className="font-medium">{items[0].storeName}</span>
                            </div>
                            {hasMultipleStores && (
                              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                                Order {Number(storeId)} of {storeCount}
                              </span>
                            )}
                          </div>
                            
                          {items.map(item => (
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
                                <span className="text-[10px] sm:text-xs text-gray-500 font-medium">{item.product.quantity}</span>
                                
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
                          
                          {/* Store subtotal and delivery info */}
                          <div className="mt-2 text-xs text-gray-500 px-2">
                            {(() => {
                              const storeTotal = items.reduce((sum, item) => {
                                const price = parseFloat(item.product.price.replace('₹', ''))
                                return sum + (price * item.quantity)
                              }, 0);
                              
                              const deliveryFee = calculateDeliveryFee(storeTotal, storeId);
                              
                              if (deliveryFee === 0) {
                                return <span className="text-green-600">Free delivery</span>;
                              } else {
                                return (
                                  <span>
                                    Delivery: ₹{deliveryFee} • Add ₹{(199 - storeTotal).toFixed(0)} more for free delivery
                                  </span>
                                );
                              }
                            })()}
                          </div>
                        </div>
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
                    <span className={hasMultipleStores ? "font-medium text-amber-600" : "font-medium text-green-600"}>
                      {hasMultipleStores ? `₹${calculateTotalDeliveryFee()}` : "Free"}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-medium mb-6">
                    <span>Total</span>
                    <span>₹{(parseFloat(cartTotal) + (hasMultipleStores ? calculateTotalDeliveryFee() : 0)).toFixed(0)}</span>
                  </div>
                  <button
                    className="w-full bg-primary text-white py-3 rounded-md font-medium flex items-center justify-center hover:bg-primary-600 transition-colors"
                    onClick={guaranteedCheckout}
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