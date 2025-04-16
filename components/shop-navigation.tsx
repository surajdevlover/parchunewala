"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ChevronRight, ShoppingBag } from "lucide-react";

// Category navigation data
const categories = [
  { id: "groceries", name: "Groceries", icon: "🛒", color: "#4CAF50" },
  { id: "fruits-vegetables", name: "Fruits & Vegetables", icon: "🥬", color: "#8BC34A" },
  { id: "dairy-breakfast", name: "Dairy & Breakfast", icon: "🥛", color: "#03A9F4" },
  { id: "snacks", name: "Snacks", icon: "🍿", color: "#FFC107" },
  { id: "beverages", name: "Beverages", icon: "🥤", color: "#E91E63" },
  { id: "personal-care", name: "Personal Care", icon: "🧴", color: "#9C27B0" },
  { id: "household", name: "Household", icon: "🧹", color: "#795548" },
  { id: "baby-care", name: "Baby Care", icon: "🍼", color: "#FF9800" },
  { id: "electronics", name: "Electronics", icon: "🔌", color: "#607D8B" }
];

export function ShopNavigation() {
  const pathname = usePathname();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center gap-2 mb-4 border-b pb-3">
        <ShoppingBag className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Shop Categories</h2>
      </div>
      
      <motion.div 
        className="grid gap-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {categories.map((category) => {
          const isActive = pathname === `/categories/${category.id}` || 
                          pathname === `/categories/${category.id}/`;
          
          return (
            <motion.div key={category.id} variants={itemVariants}>
              <Link 
                href={`/categories/${category.id}`}
                className={`
                  flex items-center justify-between p-2.5 rounded-md transition-all
                  ${isActive 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'hover:bg-gray-50 text-gray-700'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span 
                    className="flex items-center justify-center h-8 w-8 rounded-full text-lg"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    {category.icon}
                  </span>
                  <span>{category.name}</span>
                </div>
                
                <ChevronRight 
                  className={`h-4 w-4 transition-transform ${isActive ? 'text-primary' : 'text-gray-400'}`} 
                />
              </Link>
            </motion.div>
          );
        })}
        
        <motion.div variants={itemVariants}>
          <Link 
            href="/categories/all"
            className={`
              flex items-center justify-between p-2.5 rounded-md transition-all mt-2 border-t pt-4
              ${pathname === '/categories/all' 
                ? 'text-primary font-medium' 
                : 'text-gray-700 hover:text-primary'
              }
            `}
          >
            <span className="font-medium">View All Categories</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
} 