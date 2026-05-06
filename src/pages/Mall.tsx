import React, { useState } from 'react';
import Header from '../components/Header';
import { Search, PenTool, Sparkles, Diamond } from 'lucide-react';
import { MALL_PRODUCTS } from '../constants';
import { useNavigate } from 'react-router-dom';

import { useCMS } from '../context/CMSContext';

export default function Mall() {
  const navigate = useNavigate();
  const { products, pages } = useCMS();
  const currentProducts = products.length > 0 ? products : MALL_PRODUCTS;
  const [searchQuery, setSearchQuery] = useState('');
  const [internalQuery, setInternalQuery] = useState('');
  const [showNoResultMap, setShowNoResultMap] = useState(false);
  const mallData = pages.mall || {};
  
  // Try to get configured pavilions
  const configuredPavilions = mallData.pavilions && mallData.pavilions.length > 0 ? mallData.pavilions : [];
  
  // Extract unique pavilions from CMS products as fallback
  const cmsPavilions = Array.from(new Set((products || []).map((p: any) => p.pavilion).filter(Boolean)));
  
  const defaultPavilions = [
    { title: '深圳特色产品馆', imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef03a74e7f?q=80&w=400&fit=crop' },
    { title: '武汉特色产品馆', imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400&fit=crop' },
    { title: '成都特色产品馆', imageUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=400&fit=crop' },
    { title: '宜昌特色产品馆', imageUrl: 'https://images.unsplash.com/photo-1512418490979-92798cfecbf2?q=80&w=400&fit=crop' },
  ];

  const allPavilions = configuredPavilions.length > 0 ? configuredPavilions : 
                      cmsPavilions.length > 0 ? cmsPavilions.map((p, idx) => ({ title: p as string, imageUrl: `https://images.unsplash.com/photo-${['1581009146145-b5ef03a74e7f','1504674900247-0877df9cc836','1511919884226-fd3cad34687c'][idx % 3]}?q=80&w=400&fit=crop` })) : 
                      defaultPavilions;

  const filteredPavilions = allPavilions.filter((p: any) => !searchQuery || p.title.includes(searchQuery));

  const handleSearch = () => {
    setSearchQuery(internalQuery);
    const matches = allPavilions.filter((p: any) => p.title.includes(internalQuery));
    if (internalQuery && matches.length === 0) {
      setShowNoResultMap(true);
      setTimeout(() => setShowNoResultMap(false), 2000);
    }
  };

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full transition-colors duration-300">
      <Header title="商城" dark />
      
      {/* Search Bar */}
      <div className="px-5 mt-4">
        <div className="relative">
          <input 
            type="text" 
            value={internalQuery}
            onChange={(e) => setInternalQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="搜索商品馆" 
            className="w-full h-11 pl-11 pr-4 bg-[#F2EDE4] dark:bg-[#2A1D0F] rounded-full text-[13px] outline-none border border-transparent focus:border-[#D4AF37]/30 dark:text-white transition-all placeholder:text-[#A69984]"
          />
          <Search 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A69984]" 
            size={18} 
          />
          <button 
            onClick={handleSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#D4AF37] text-white px-3 py-1.5 rounded-full text-[11px] font-bold shadow-sm"
          >
            搜索
          </button>
        </div>
      </div>
      
      {showNoResultMap && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-6 py-4 rounded-2xl z-50 text-[14px] font-bold shadow-2xl backdrop-blur-md">
          该产品还未上线，敬请期待。
        </div>
      )}


      {/* Banner */}
      <div className="mx-5 mt-6 rounded-3xl overflow-hidden h-[180px] relative shadow-xl">
        <img 
          src="https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=800&h=400&fit=crop" 
          alt="Mall" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-8">
          <h2 className="text-white text-[20px] font-bold leading-tight">
            中星文创 · 官方商城
          </h2>
          <p className="text-[#E6D5B8] text-[12px] mt-2 opacity-90 uppercase font-medium tracking-wider">精选好物</p>
        </div>
      </div>

      {/* Grid Menu */}
      <div className="px-5 mt-8 grid grid-cols-3 gap-4">
        {[
          { l: '文创产品', ic: <PenTool size={24} />, path: '/mall/creative', color: 'bg-orange-50 text-orange-500' },
          { l: '明星周边', ic: <Sparkles size={24} />, path: '/mall/star', color: 'bg-blue-50 text-blue-500' },
          { l: '数字藏品', ic: <Diamond size={24} />, path: '/mall/digital', color: 'bg-purple-50 text-purple-500' }
        ].map((item, idx) => (
          <div key={idx} onClick={() => navigate(item.path)} className="flex flex-col items-center gap-2 cursor-pointer active:scale-90 transition-transform group">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border border-transparent group-hover:border-[#D4AF37]/20 shadow-sm transition-all ${item.color}`}>
              {item.ic}
            </div>
            <span className="text-[11px] text-[#4A443E] dark:text-[#E6D5B8] font-bold whitespace-nowrap">{item.l}</span>
          </div>
        ))}
      </div>

      {/* Pavilions Section */}
      <div className="px-5 mt-10 mb-10">
        <h3 className="text-[17px] font-black text-[#1A1108] dark:text-white mb-6">特色产品馆</h3>
        <div className="grid grid-cols-2 gap-4">
            {filteredPavilions.map((pavilion: any, idx: number) => (
              <div 
                key={idx} 
                onClick={() => navigate(`/mall/${encodeURIComponent(pavilion.title)}`)}
                className="group relative h-32 rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95"
              >
              <img 
                src={pavilion.imageUrl || pavilion.image || pavilion.banner || 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400&fit=crop'} 
                alt={pavilion.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center p-4">
                <span className="text-white text-[15px] font-black text-center leading-tight drop-shadow-md">
                  {pavilion.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
