"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Trash2, Plus, Minus, ChevronDown, ChevronUp, Store, Truck, Sparkles, AlertTriangle, ShoppingCart, Tag } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { useLogin } from "@/components/login-check"
import { SharedHeader } from "@/components/shared-header"
import { useAuth } from "@/lib/auth-context"
import { MultipleStoreWarning } from "@/components/multiple-store-warning"

// Define type for auth debug
interface AuthDebugState {
  loginCheck: boolean;
  authContext: boolean;
  userData: any | null;
  authState: string | null;
}

// Development-only debug component
function AuthDebugInfo({ authDebug }: { authDebug: AuthDebugState }) {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 text-xs max-w-xs opacity-80 hover:opacity-100 transition-opacity">
      <h3 className="font-bold mb-2">Auth Debug Info</h3>
      <div className="grid grid-cols-2 gap-1">
        <span className="font-medium">Login Check:</span>
        <span className={authDebug.loginCheck ? "text-green-600" : "text-red-600"}>
          {authDebug.loginCheck ? "Logged In" : "Not Logged In"}
        </span>
        
        <span className="font-medium">Auth Context:</span>
        <span className={authDebug.authContext ? "text-green-600" : "text-red-600"}>
          {authDebug.authContext ? "Authenticated" : "Not Authenticated"}
        </span>
        
        <span className="font-medium">Auth State:</span>
        <span>{authDebug.authState || "null"}</span>
        
        {authDebug.userData && (
          <>
            <span className="font-medium">User:</span>
            <span>{authDebug.userData.email}</span>
          </>
        )}
      </div>
    </div>
  );
}

export default function CartScreen() {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    cartTotal,
    totalItems,
    viewProductStores,
    updateProductStore,
    moveAllToStore,
    clearCart,
    hasMultipleStores: checkMultipleStores,
    getMultipleStoreDeliveryFee
  } = useCart()
  
  const { isLoggedIn, requireLogin } = useLogin()
  const { isAuthenticated } = useAuth()
  const [expandedStores, setExpandedStores] = useState<Record<string, boolean>>({})
  
  // Debug state
  const [authDebug, setAuthDebug] = useState<AuthDebugState>({
    loginCheck: isLoggedIn,
    authContext: isAuthenticated,
    userData: null,
    authState: null
  })
  
  // Update debug info periodically
  useEffect(() => {
    const updateDebug = () => {
      const userData = localStorage.getItem('user_data')
      const authState = localStorage.getItem('auth_state')
      
      setAuthDebug({
        loginCheck: isLoggedIn,
        authContext: isAuthenticated,
        userData: userData ? JSON.parse(userData) : null,
        authState
      })
    }
    
    updateDebug()
    const interval = setInterval(updateDebug, 2000)
    return () => clearInterval(interval)
  }, [isLoggedIn, isAuthenticated])
  
  // Clear all default cart items immediately on mount
  useEffect(() => {
    // First page load only - check if we need to clear default cart items
    const userAddedItems = localStorage.getItem('user_added_cart_items');
    
    if (!userAddedItems && cartItems.length > 0) {
      // This is the first load and there are items in cart that weren't explicitly added
      clearCart();
      console.log("Cleared default cart items");
    }
    
    // Set flag so we don't clear again
    if (!userAddedItems) {
      localStorage.setItem('user_added_cart_items', 'true');
    }
  }, [clearCart, cartItems.length]);
  
  const toggleStoreExpand = (productId: string) => {
    setExpandedStores(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }))
  }
  
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
  
  // Calculate delivery fee - free over ₹199
  const calculateDelivery = (storeTotal: number) => {
    return storeTotal >= 199 ? 0 : 15
  }

  // Calculate delivery fee - free over ₹199, with store-based logic
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

  const router = useRouter()
  
  const handleProceedToCheckout = () => {
    // Check both authentication systems
    const userData = localStorage.getItem('user_data');
    const authState = localStorage.getItem('auth_state');
    const manualAuthCheck = !!userData && authState === 'authenticated';
    
    // If authenticated in either system, proceed directly
    if (isAuthenticated || isLoggedIn || manualAuthCheck) {
      router.push('/checkout');
      return;
    }
    
    // Otherwise use the requireLogin function which will show the modal
    if (requireLogin('cart')) {
      router.push('/checkout');
    }
  }

  // Create a function that guarantees checkout without login prompts
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
    
    // Force a refresh of auth state in all contexts
    setTimeout(() => {
      // Navigate directly to checkout
      console.log("Redirecting to checkout as authenticated user");
      router.push('/checkout');
    }, 100);
  }

  // Function to calculate the total delivery fees from all stores
  const calculateTotalDeliveryFee = () => {
    let totalDeliveryFee = 0;
    
    // Loop through each store group and calculate the delivery fee
    Object.entries(storeGroups).forEach(([storeId, items]) => {
      const storeTotal = items.reduce((sum, item) => {
        const price = parseFloat(item.product.price.replace('₹', ''));
        return sum + (price * item.quantity);
      }, 0);
      
      // Add this store's delivery fee to the total
      totalDeliveryFee += calculateDeliveryFee(storeTotal, storeId);
    });
    
    return totalDeliveryFee;
  };

  // Find cheapest store for all current items
  const findCheapestStore = () => {
    // Only do this calculation if we have multiple stores
    if (!checkMultipleStores()) return null;
    
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

  const cheapestStore = findCheapestStore();

  // Handle multiple store warning responses
  const handleMultipleStoreAccept = () => {
    // User accepted the extra fee, do nothing
    console.log("User accepted multiple store fee")
  }
  
  const handleMultipleStoreCancel = () => {
    // Clear cart and redirect to home
    clearCart()
    router.push('/home')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SharedHeader 
        title={`Your Cart (${totalItems()} items)`}
        showBackButton={true}
      />
      
      {/* Multiple store warning dialog */}
      <MultipleStoreWarning 
        onConfirm={handleMultipleStoreAccept}
        onCancel={handleMultipleStoreCancel}
      />
      
      {/* Empty cart view */}
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-grow p-6">
          <div className="w-40 h-40 rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <ShoppingCart size={80} className="text-gray-300" />
          </div>
          <h1 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h1>
          <p className="text-gray-500 text-center mb-6 max-w-md">
            Looks like you haven't added anything to your cart yet. Go ahead and explore our products.
          </p>
          <Button onClick={() => router.push('/home')} className="bg-pastel-orange hover:bg-pastel-orange/90">
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-6 flex-grow">
          <div className="flex items-center mb-4">
            <button onClick={() => router.push('/home')} className="text-gray-500 hover:text-gray-700 mr-2">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold">Your Cart ({totalItems()} items)</h1>
          </div>

          {/* Multiple store warning banner - if items are from multiple stores */}
          {checkMultipleStores() && (
            <div className="mb-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-amber-800">Items from Multiple Stores</h3>
                  <p className="text-sm text-amber-700 mt-1">
                    Your cart contains items from different stores. An additional delivery fee of 
                    <span className="font-semibold"> ₹{getMultipleStoreDeliveryFee()}</span> will be applied.
                  </p>
                  <p className="text-xs text-amber-600 mt-1">
                    For free delivery, consider ordering from a single store.
                  </p>
                  <div className="mt-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-white border-amber-200 text-amber-700 hover:bg-amber-50"
                      onClick={() => {
                        // Find the store with most items and move all items to that store
                        const storeItems: Record<string, number> = {}
                        cartItems.forEach(item => {
                          storeItems[item.storeId] = (storeItems[item.storeId] || 0) + 1
                        })
                        
                        let maxStore = cartItems[0]?.storeId || "1"
                        let maxCount = 0
                        
                        Object.entries(storeItems).forEach(([storeId, count]) => {
                          if (count > maxCount) {
                            maxStore = storeId
                            maxCount = count
                          }
                        })
                        
                        moveAllToStore(maxStore)
                      }}
                    >
                      <Store className="h-3.5 w-3.5 mr-1" />
                      Consolidate to one store
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Offer section */}
          <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-green-100 p-2 flex-shrink-0">
                <Tag className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-green-800">Free Delivery Offer</h3>
                <p className="text-sm text-green-700 mt-1">
                  Get free delivery on orders above ₹199 from each store!
                </p>
                {Object.entries(storeGroups).map(([storeId, items]) => {
                  const storeSubtotal = items.reduce((sum, item) => {
                    const price = parseFloat(item.product.price.replace('₹', ''));
                    return sum + (price * item.quantity);
                  }, 0);
                  
                  const storeFirstItem = items[0];
                  const storeName = storeFirstItem?.storeName || `Store ${storeId}`;
                  
                  return (
                    <div key={storeId} className="mt-2 text-xs border-t border-green-200 pt-2">
                      <span className="font-medium">{storeName}:</span> {
                        storeSubtotal >= 199 
                          ? <span className="text-green-700">You qualify for free delivery!</span>
                          : <span>Add ₹{(199 - storeSubtotal).toFixed(0)} more for free delivery</span>
                      }
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Order summary section */}
          <div className="sticky top-20 bg-white p-4 rounded-lg shadow-sm">
            <h2 className="font-bold text-lg mb-4">Order Summary</h2>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{cartTotal()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span>
                  {calculateTotalDeliveryFee() === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    `₹${calculateTotalDeliveryFee()}`
                  )}
                </span>
              </div>
              
              {/* Multiple store fee if applicable */}
              {checkMultipleStores() && (
                <div className="flex justify-between text-red-600">
                  <span>Multiple Store Fee</span>
                  <span>₹{getMultipleStoreDeliveryFee()}</span>
                </div>
              )}
              
              <div className="border-t border-dashed my-2 pt-2"></div>
              
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>
                  ₹{(
                    parseFloat(cartTotal().replace('₹', '')) + 
                    calculateTotalDeliveryFee() + 
                    (checkMultipleStores() ? getMultipleStoreDeliveryFee() : 0)
                  ).toFixed(0)}
                </span>
              </div>
            </div>
            
            {/* Rest of the order summary */}
          </div>
          
          {/* Store delivery info */}
          {Object.entries(storeGroups).map(([storeId, items]) => {
            const storeSubtotal = items.reduce((sum, item) => {
              const price = parseFloat(item.product.price.replace('₹', ''));
              return sum + (price * item.quantity);
            }, 0);
            
            return (
              <div key={storeId} className="bg-gray-50 p-3 text-xs">
                <div className="flex items-center justify-between text-gray-600">
                  <div className="flex items-center gap-1">
                    <Truck size={14} className="text-pastel-orange" />
                    <span>Delivery Fee:</span>
                  </div>
                  <div>
                    {calculateDeliveryFee(storeSubtotal, storeId) === 0 ? (
                      <span className="text-green-600 font-medium">FREE</span>
                    ) : (
                      <span>₹{calculateDeliveryFee(storeSubtotal, storeId)}</span>
                    )}
                  </div>
                </div>
                
                {storeSubtotal < 199 && (
                  <div className="mt-2 text-xs text-gray-500">
                    Add ₹{(199 - storeSubtotal).toFixed(0)} more to get free delivery
                  </div>
                )}
              </div>
            );
          })}

          {/* Store comparison section - only show when cart has items */}
          {cartItems.length > 0 && (
            <div className="mt-6 mb-4 bg-white rounded-lg shadow-sm p-4">
              <h2 className="font-bold text-lg mb-4">Compare Prices Across Stores</h2>
              
              <div className="space-y-4">
                {Object.entries(storeGroups).map(([currentStoreId, items]) => {
                  // For each store group, find price comparison with other stores
                  const currentStoreTotal = items.reduce((sum, item) => {
                    const price = parseFloat(item.product.price.replace('₹', ''));
                    return sum + (price * item.quantity);
                  }, 0);
                  
                  // Check if all these items are available at other stores
                  const otherStores: Record<string, {
                    name: string,
                    total: number,
                    savings: number,
                    available: boolean,
                    items: number
                  }> = {};
                  
                  // Check each item's availability and price at other stores
                  items.forEach(item => {
                    if (item.product.storeOptions) {
                      item.product.storeOptions.forEach(option => {
                        if (option.storeId !== currentStoreId) {
                          if (!otherStores[option.storeId]) {
                            otherStores[option.storeId] = {
                              name: option.storeName,
                              total: 0,
                              savings: 0,
                              available: true,
                              items: 0
                            };
                          }
                          
                          if (option.available) {
                            const price = parseFloat(option.price.replace('₹', ''));
                            otherStores[option.storeId].total += price * item.quantity;
                            otherStores[option.storeId].items++;
                          } else {
                            // If any item isn't available, mark the whole store as unavailable
                            otherStores[option.storeId].available = false;
                          }
                        }
                      });
                    }
                  });
                  
                  // Calculate savings for each store
                  Object.values(otherStores).forEach(store => {
                    if (store.available) {
                      store.savings = currentStoreTotal - store.total;
                    }
                  });
                  
                  // Filter to only stores where all items are available
                  const availableStores = Object.entries(otherStores)
                    .filter(([_, store]) => store.available && store.items === items.length)
                    .sort((a, b) => b[1].savings - a[1].savings);
                  
                  if (availableStores.length === 0) return null;
                  
                  return (
                    <div key={currentStoreId} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 border-b">
                        <h3 className="font-medium">{items[0].storeName}</h3>
                        <p className="text-xs text-gray-500">Your current selection - ₹{currentStoreTotal}</p>
                      </div>
                      
                      <div className="divide-y">
                        {availableStores.map(([storeId, store]) => (
                          <div key={storeId} className="flex justify-between items-center p-4">
                            <div>
                              <h4 className="font-medium">{store.name}</h4>
                              <p className="text-sm text-gray-600">₹{store.total} ({store.savings > 0 ? 'Save' : 'Costs'} ₹{Math.abs(store.savings)})</p>
                            </div>
                            
                            {store.savings > 0 && (
                              <Button
                                size="sm"
                                onClick={() => moveAllToStore(storeId)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Switch & Save
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                <p>Compare prices across stores to find the best deal. Switching stores will replace your current cart items.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

