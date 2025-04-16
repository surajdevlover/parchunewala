"use client";

import { FiChevronLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface SharedHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
}

export function SharedHeader({ 
  title, 
  subtitle, 
  showBackButton = true 
}: SharedHeaderProps) {
  const router = useRouter();

  return (
    <div className="bg-white shadow-sm">
      <div className="px-4 py-3 flex items-center">
        {showBackButton && (
          <button 
            onClick={() => router.back()}
            className="mr-3 p-1 rounded-full hover:bg-gray-100"
          >
            <FiChevronLeft size={22} />
          </button>
        )}
        <div>
          <h1 className="font-bold text-xl">{title}</h1>
          {subtitle && (
            <p className="text-gray-500 text-sm">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
} 