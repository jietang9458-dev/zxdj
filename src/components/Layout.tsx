import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Warehouse, Compass, ShoppingCart, User, Battery, Signal, Wifi } from 'lucide-react';
import { TAB_BAR } from '../constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useTheme } from '../context/ThemeContext';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const IconMap: { [key: string]: any } = {
  Home,
  Warehouse,
  Compass,
  ShoppingCart,
  User,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 bg-[#F0F0F0] dark:bg-black flex justify-center items-center py-0 sm:py-10 antialiased transition-colors duration-500">
      {/* Mobile Frame Container */}
      <div className={cn(
        "w-full h-full sm:max-w-[430px] sm:h-[844px] shadow-[0_0_100px_rgba(0,0,0,0.1)] relative flex flex-col overflow-hidden sm:rounded-[3.5rem] border-0 sm:border-[12px] border-[#1A1A1A] transition-colors duration-300",
        theme === 'dark' ? "bg-[#1A1108]" : "bg-white"
      )}>
        
        {/* Dynamic Island Area */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1A1A1A] rounded-b-2xl z-[60] pointer-events-none sm:block hidden" />

        {/* WeChat/iOS Status Bar */}
        <div className={cn(
          "h-12 px-9 flex justify-between items-center text-[14px] font-bold bg-transparent absolute top-0 w-full z-50",
          theme === 'dark' ? "text-white/80" : "text-black/80"
        )}>
          <span className="sm:inline hidden">9:41</span>
          <div className="flex items-center gap-1.5 sm:inline-flex hidden">
            <Signal size={14} />
            <Wifi size={14} />
            <Battery size={20} className="ml-1" />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pb-[90px] scrollbar-hide pt-0">
          {children}
        </div>

        {/* Bottom Tab Bar - Matches Frame Width */}
        <div className={cn(
          "absolute bottom-0 w-full backdrop-blur-xl border-t px-4 py-2 flex justify-around items-center h-[88px] z-50 pb-6 transition-colors duration-300",
          theme === 'dark' 
            ? "bg-[#1A1108]/95 border-white/5" 
            : "bg-white/98 border-gray-100"
        )}>
          {TAB_BAR.map((item) => {
            const Icon = IconMap[item.icon];
            const isActive = 
              item.path === '/' 
              ? location.pathname === '/' 
              : location.pathname.startsWith(item.path);
            
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 transition-all duration-300 w-16",
                  isActive ? "text-[#D4AF37]" : "text-[#B0B0B0]"
                )}
              >
                <div className={cn(
                  "p-1 rounded-xl transition-all",
                  isActive ? "scale-110" : "scale-100"
                )}>
                  <Icon size={25} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={cn(
                  "text-[10px] font-black tracking-tight",
                  isActive ? "opacity-100" : "opacity-80"
                )}>
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-36 h-[5px] bg-[#1A1A1A] rounded-full z-50 pointer-events-none opacity-20 sm:block hidden" />
      </div>

      {/* Decorative Background Labels */}
      <div className="fixed top-10 left-10 text-gray-300 dark:text-white/5 font-black text-4xl pointer-events-none sm:block hidden">ZX SHORT DRAMA</div>
      <div className="fixed bottom-10 right-10 text-gray-300 dark:text-white/5 font-black text-4xl pointer-events-none sm:block hidden">ECO-CHAIN</div>
    </div>
  );
}
