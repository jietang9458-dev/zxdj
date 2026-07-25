import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, PlayCircle } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { HOT_DRAMAS } from '../constants';
import { motion } from 'framer-motion';

export default function HotDramas() {
  const navigate = useNavigate();
  const { dramas } = useCMS();
  
  const displayDramas = dramas.length > 0 ? dramas : HOT_DRAMAS;

  return (
    <div className="pb-24 bg-[#FAF9F7] min-h-screen dark:bg-[#1A1108]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-[#1A1108]/80 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 py-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-700 dark:text-gray-300">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-[17px] font-bold text-[#1A1108] dark:text-white">热播短剧推荐</h1>
          <div className="w-10"></div>
        </div>
      </div>

      {/* List */}
      <div className="p-4 space-y-4">
        {displayDramas.map((drama, idx) => (
          <motion.div 
            key={drama.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-[#2A2118] rounded-2xl p-4 shadow-sm flex gap-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => {
              if (drama.playUrl) {
                window.location.href = drama.playUrl;
              } else {
                navigate(`/drama/${drama.id}`);
              }
            }}
          >
            {/* Poster */}
            <div className="w-24 shrink-0">
              <div className="aspect-[3/4] rounded-xl overflow-hidden relative shadow-md">
                <img src={drama.imageUrl} alt={drama.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <PlayCircle className="text-white/80" size={32} />
                </div>
              </div>
            </div>
            
            {/* Description */}
            <div className="flex-1 flex flex-col py-1">
              <h2 className="text-[16px] font-bold text-[#1A1108] dark:text-white mb-2 leading-tight line-clamp-2">
                {drama.title}
              </h2>
              <div className="text-[13px] text-gray-500 dark:text-gray-400 line-clamp-4 leading-relaxed">
                {drama.description || "暂无故事介绍。该剧内容精彩绝伦，情节跌宕起伏，敬请点击观看欣赏完整正片。"}
              </div>
              {drama.recommended && (
                <div className="mt-auto pt-2">
                  <span className="inline-block px-2 py-1 bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-[10px] font-bold rounded">
                    强烈推荐
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
