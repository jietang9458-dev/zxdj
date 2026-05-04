import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { motion, AnimatePresence } from 'motion/react';
import { HOT_DRAMAS } from '../constants';
import { ShoppingCart, LayoutGrid, Database, ShieldCheck, Video, Radio, Activity } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

function ScrollingText({ items }: { items: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div className="relative h-5 overflow-hidden flex justify-end min-w-[120px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -15, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="font-bold text-[#1A1108] dark:text-[#E6D5B8] absolute right-0"
        >
          {items[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function Copyright() {
  const navigate = useNavigate();
  const { dramas, pages } = useCMS();
  const currentDramas = dramas.length > 0 ? dramas : HOT_DRAMAS;
  const pageData = pages.copyright || {};
  
  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full transition-colors duration-300">
      <Header title={pageData.title || "版权营销中心"} dark />
      
      {/* Banner */}
      <div className="mx-5 mt-4 rounded-3xl overflow-hidden h-[180px] relative shadow-xl">
        <img 
          src={pageData.banner || "https://images.unsplash.com/photo-1454165833767-027508496b60?q=80&w=800&h=400&fit=crop"} 
          alt="Copyright" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-8">
          <h2 className="text-white text-[24px] font-bold leading-tight">
            {pageData.title || "销售短剧版权"}<br />{pageData.subtitle ? "" : "突破收入瓶颈"}
          </h2>
          <p className="text-[#E6D5B8] text-[13px] mt-2 opacity-90">{pageData.subtitle || "拥有短剧版权实现财富自由"}</p>
        </div>
      </div>

      {/* Grid Menu */}
      <div className="px-5 mt-6 grid grid-cols-4 gap-4">
        {[
          { l: '购买版权', ic: <ShoppingCart size={22} />, path: '/copyright/purchase', color: 'bg-orange-50 text-orange-500' },
          { l: '销售模式', ic: <LayoutGrid size={22} />, path: '/copyright/model', color: 'bg-blue-50 text-blue-500' },
          { l: '版权库', ic: <Database size={22} />, path: '/copyright/library', color: 'bg-purple-50 text-purple-500' },
          { l: '版权公示', ic: <ShieldCheck size={22} />, path: '/copyright/publicity', color: 'bg-green-50 text-green-500' }
        ].map((item, idx) => (
          <div key={idx} onClick={() => navigate(item.path)} className="flex flex-col items-center gap-2 cursor-pointer active:scale-90 transition-transform group">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border border-transparent group-hover:border-[#D4AF37]/20 shadow-sm transition-all ${item.color}`}>
              {item.ic}
            </div>
            <span className="text-[12px] text-[#4A443E] dark:text-[#E6D5B8] font-bold">{item.l}</span>
          </div>
        ))}
      </div>

      {/* Section 1 */}
      <div className="px-5 mt-8">
        <h3 className="text-[16px] font-black text-[#1A1108] dark:text-white mb-4 flex items-center gap-2">
          <Video className="text-[#D4AF37]" size={20} />
          剧组片场拍摄直播及直播预告
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {currentDramas.map((drama, idx) => (
            <div 
              key={idx} 
              className="flex-shrink-0 w-36 cursor-pointer active:scale-95 transition-transform"
              onClick={() => navigate(`/drama/${drama.id || idx}?live=true`)}
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-md mb-2">
                <img src={drama.imageUrl} alt="" className="w-full h-full object-cover" />
              </div>
              <p className="text-[12px] font-bold text-[#1A1108] dark:text-white/80 line-clamp-1">{drama.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic List */}
      <div className="mx-5 mt-4 p-6 bg-white dark:bg-[#2A1D0F] rounded-[32px] shadow-sm border border-gray-50 dark:border-white/5 relative overflow-hidden group">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#D4AF37]/5 rounded-full blur-2xl group-hover:bg-[#D4AF37]/10 transition-colors" />
        <h3 className="text-[16px] font-black text-[#1A1108] dark:text-white mb-4 flex items-center gap-2">
          <Activity className="text-red-500" size={20} />
          短剧版权销售动态
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-[#A69984]">已售罄短剧版权:</span>
            <ScrollingText items={["ZXDJ (A) 0021", "ZXDJ (B) 0101", "ZXDJ (C) 0201"]} />
          </div>
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-[#A69984]">热销中短剧版权:</span>
            <ScrollingText items={["ZXDJ (A) 0023", "ZXDJ (B) 0102", "ZXDJ (C) 0202"]} />
          </div>
        </div>
      </div>
    </div>
  );
}
