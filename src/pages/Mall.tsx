import React from 'react';
import Header from '../components/Header';
import { Search, PenTool, Sparkles, Diamond } from 'lucide-react';
import { MALL_PRODUCTS } from '../constants';
import { useNavigate } from 'react-router-dom';

import { useCMS } from '../context/CMSContext';

export default function Mall() {
  const navigate = useNavigate();
  const { products } = useCMS();
  const currentProducts = products.length > 0 ? products : MALL_PRODUCTS;
  
  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full transition-colors duration-300">
      <Header title="商城" dark />
      
      {/* Search Bar */}
      <div className="px-5 mt-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="搜索商品" 
            className="w-full h-11 pl-11 pr-4 bg-[#F2EDE4] dark:bg-[#2A1D0F] rounded-full text-[13px] outline-none border border-transparent focus:border-[#D4AF37]/30 dark:text-white transition-all placeholder:text-[#A69984]"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A69984]" size={18} />
        </div>
      </div>

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
            {[
              '深圳特色产品馆', '武汉特色产品馆', '成都特色产品馆', '宜昌特色产品馆', '赣州特色产品馆',
              ...Array(15).fill('XX特色产品馆')
            ].map((name, idx) => (
              <div 
                key={idx} 
                onClick={() => navigate(`/mall/${encodeURIComponent(name === 'XX特色产品馆' ? `XX${idx + 1}特色产品馆` : name)}`)}
                className="group relative h-32 rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95"
              >
              <img 
                src={`https://images.unsplash.com/photo-${[
                  '1581009146145-b5ef03a74e7f', // fruit/produce
                  '1504674900247-0877df9cc836', // food
                  '1511919884226-fd3cad34687c', // crafts
                  '1512418490979-92798cfecbf2', // decor
                  '1550989460-0adf9ea622e2', // store
                  '1560624056-444268fc36b6', // pottery
                  '1542838132-92c53300491e', // marketplace
                  '1563245393-2708304910e5', // shop
                ][idx % 8]}?q=80&w=400&fit=crop`} 
                alt={name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center p-4">
                <span className="text-white text-[15px] font-black text-center leading-tight drop-shadow-md">
                  {name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
