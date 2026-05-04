import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Warehouse, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { BASES } from '../constants';
import { useCMS } from '../context/CMSContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const REGIONS = ['华南', '华中', '西南', '华东', '华北'];

export default function BaseList() {
  const { bases } = useCMS();
  const navigate = useNavigate();

  const currentBases = (bases.length > 0 ? bases : BASES).map(b => ({ ...b, region: b.region || '华南' }));
  const availableRegions = Array.from(new Set(currentBases.map(b => b.region)));
  const regionsToDisplay = availableRegions.length > 0 ? availableRegions : REGIONS;

  const [activeRegion, setActiveRegion] = useState(regionsToDisplay[0]);

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full transition-colors duration-300">
      <Header title="基地列表" dark />
      
      {/* Tabs */}
      <div className="flex gap-4 px-5 overflow-x-auto py-4 scrollbar-hide border-b border-gray-100 dark:border-white/5 bg-white dark:bg-[#1A1108] sticky top-24 z-30">
        {regionsToDisplay.map((region) => (
          <button
            key={region}
            onClick={() => setActiveRegion(region)}
            className={cn(
              "px-6 py-2 rounded-xl text-[14px] font-bold whitespace-nowrap transition-all",
              activeRegion === region 
                ? "bg-[#F2EDE4] text-[#D4AF37]" 
                : "text-gray-400"
            )}
          >
            {region}
          </button>
        ))}
      </div>

      <div className="px-5 py-6">
        {(() => {
          const region = activeRegion;
          const regionBases = currentBases.filter(b => b.region === region);

          return (
            <div key={region} className="mb-10 last:mb-0">
              <div className="flex flex-col mb-6">
                <h2 className="text-[20px] font-black text-[#1A1108] dark:text-white">{region}</h2>
                <div className="w-8 h-1 bg-[#D4AF37] mt-1.5 rounded-full" />
              </div>

              {regionBases.length > 0 ? (
                <div className="space-y-6">
                  {regionBases.map((base, idx) => (
                    <motion.div
                      key={`${region}-${base.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      onClick={() => navigate(`/base/${base.id}`)}
                      className="bg-white dark:bg-[#2A1D0F] rounded-[32px] p-4 flex gap-5 shadow-sm border border-gray-50 dark:border-white/5 cursor-pointer active:scale-95 transition-all"
                    >
                      <div className="w-32 h-32 rounded-[24px] overflow-hidden flex-shrink-0 shadow-inner">
                        <img src={base.imageUrl} alt={base.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col justify-center gap-3">
                        <h3 className="text-[16px] font-black text-[#1A1108] dark:text-white line-clamp-1">{base.title}</h3>
                        <div className="flex items-center gap-1.5 text-[#A69984] font-bold text-[12px]">
                          <MapPin size={14} className="text-[#D4AF37]" />
                          {base.location}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {base.tags.map(tag => (
                            <span key={tag} className="px-2.5 py-1 bg-[#FAF9F6] text-[#A69984] text-[10px] font-black rounded-lg border border-gray-100 uppercase">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-20 flex flex-col items-center justify-center text-gray-300">
                  <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <Warehouse size={48} strokeWidth={1} />
                  </div>
                  <span className="text-[15px] font-black text-[#A69984] opacity-50">该区域暂无基地</span>
                </div>
              )}
            </div>
          );
        })()}
      </div>
    </div>
  );
}
