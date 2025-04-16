import { Suspense } from "react";
import { ShopNavigation } from "@/components/shop-navigation";
import { SharedHeader } from "@/components/shared-header";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Categories | Parchun",
  description: "Browse our wide range of categories for all your daily needs.",
};

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SharedHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/4">
            <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>}>
              <ShopNavigation />
            </Suspense>
            
            {/* Featured sections or promotions could go here */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-5 shadow-sm border border-primary-200 mb-6">
              <h3 className="font-medium text-primary-900 mb-2">First Time Order?</h3>
              <p className="text-sm text-primary-800 mb-4">Use code <span className="font-bold">WELCOME20</span> to get 20% off on your first order!</p>
              <div className="text-xs text-primary-700">*T&C Apply</div>
            </div>
          </div>
          <div className="w-full lg:w-3/4">
            <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>}>
              {children}
            </Suspense>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 