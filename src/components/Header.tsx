import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MoreHorizontal, Circle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useTheme } from '../context/ThemeContext';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface HeaderProps {
  title: string;
  dark?: boolean;
  transparent?: boolean;
  showBack?: boolean;
}

export default function Header({ title, dark: forceDark = false, transparent = false, showBack = true }: HeaderProps) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const isDark = forceDark || theme === 'dark';

  return (
    <div className={cn(
      "h-24 pt-11 px-4 flex items-center justify-between sticky top-0 z-40 transition-colors duration-300",
      transparent ? "bg-transparent" : isDark ? "bg-[#1A1108]" : "bg-white",
      !transparent && "border-b border-white/5"
    )}>
      <div className="flex items-center gap-2">
        {showBack && (
          <button 
            onClick={() => navigate(-1)}
            className={cn(
              "p-2 rounded-full",
              isDark ? "text-white" : "text-gray-900"
            )}
          >
            <ChevronLeft size={24} />
          </button>
        )}
        <h1 className={cn(
          "text-[17px] font-semibold tracking-tight",
          isDark ? "text-white" : "text-gray-900",
          !showBack && "pl-2"
        )}>
          {title}
        </h1>
      </div>

      {/* Mini Program Capsule Button */}
      <div className={cn(
        "flex items-center gap-3 px-3 py-1.5 rounded-full border",
        isDark ? "bg-black/20 border-white/10 text-white" : "bg-white/80 border-gray-200 text-gray-900"
      )}>
        <MoreHorizontal size={18} />
        <div className={cn("w-px h-3", isDark ? "bg-white/10" : "bg-gray-200")} />
        <Circle size={14} fill="currentColor" />
      </div>
    </div>
  );
}
