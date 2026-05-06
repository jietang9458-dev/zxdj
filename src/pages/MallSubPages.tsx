import React, { useState } from 'react';
import Header from '../components/Header';
import { Search, Filter, ShoppingBag, Star, Crown, Cpu } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { MALL_PRODUCTS } from '../constants';
import { motion } from 'motion/react';
import { useCMS } from '../context/CMSContext';

// 通用的分类产品列表页面
export default function MallCategory() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { products } = useCMS();
  const currentProducts = products && products.length > 0 ? products : MALL_PRODUCTS;
  
  const [searchQuery, setSearchQuery] = useState(new URLSearchParams(window.location.search).get('q') || '');
  
  // 根据路由参数模拟不同的产品数据和标题
  const categoryConfig: { [key: string]: { title: string, banner: string, icon: any, filterTag: string } } = {
    'creative': { 
      title: '文创产品', 
      banner: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800',
      icon: <Star size={20} />,
      filterTag: '文创产品'
    },
    'specialty': { 
      title: '特色产品', 
      banner: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
      icon: <ShoppingBag size={20} />,
      filterTag: '特色产品'
    },
    'star': { 
      title: '明星周边', 
      banner: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
      icon: <Crown size={20} />,
      filterTag: '明星周边'
    },
    'digital': { 
      title: '数字藏品', 
      banner: 'https://images.unsplash.com/photo-1620712943543-bcc4628c6bb5?w=800',
      icon: <Cpu size={20} />,
      filterTag: '数字藏品'
    }
  };

  const config = categoryConfig[category || 'creative'] || {
    title: category ? (category.includes('馆') ? category : `${category}馆`) : '特色产品馆',
    banner: 'https://images.unsplash.com/photo-1541604193435-225878996233?w=800',
    icon: <ShoppingBag size={20} />,
    filterTag: category || ''
  };

  let matchingProducts = currentProducts;
  if (config.filterTag) {
    matchingProducts = currentProducts.filter(p => {
      // If no pavilion or category is set, it's a mock product, show it unless we really want strict filtering
      // We will do a loose match on the data.
      if (!p.pavilion && !p.category) return true;
      return p.category?.includes(config.filterTag) || p.pavilion?.includes(config.filterTag);
    });
  }

  // If there are specific pavilion categories
  const filteredProducts = matchingProducts.filter(p => !searchQuery || p.title.includes(searchQuery));

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full transition-colors duration-300">
      <Header title={config.title.endsWith('馆') ? config.title : config.title} dark />
      
      {/* Search & Filter */}
      <div className="px-5 py-4 flex gap-3">
        <div className="relative flex-1">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`搜索${config.title}`} 
            className="w-full h-11 pl-11 pr-4 bg-white dark:bg-[#2A1D0F] rounded-2xl text-[13px] outline-none shadow-sm font-medium dark:text-white"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
        </div>
        <button className="w-11 h-11 bg-white dark:bg-[#2A1D0F] rounded-2xl flex items-center justify-center text-[#A69984] shadow-sm">
          <Filter size={18} />
        </button>
      </div>

      {/* Banner */}
      <div className="mx-5 mb-8 rounded-[32px] overflow-hidden h-32 relative shadow-lg">
        <img src={config.banner} className="w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-black/40 flex items-center px-8">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mr-4">
            {config.icon}
          </div>
          <h2 className="text-white text-[18px] font-black">{config.title.includes('馆') ? config.title : `${config.title}馆`}</h2>
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-5 grid grid-cols-2 gap-4 mb-10">
        {filteredProducts.map((prod, i) => (
          <motion.div 
            key={prod.id || i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => navigate(`/product/${prod.id}`)}
            className="bg-white rounded-[28px] overflow-hidden shadow-sm border border-gray-50 flex flex-col cursor-pointer active:scale-95 transition-all"
          >
            <div className="aspect-square relative">
              <img src={prod.imageUrl} alt="" className="w-full h-full object-cover" />
              {category === 'digital' && (
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-[9px] text-[#D4AF37] font-black border border-[#D4AF37]/30">
                  NFT 认证
                </div>
              )}
            </div>
            <div className="p-4 flex flex-col gap-1">
              <h4 className="text-[13px] font-bold text-[#1A1108] line-clamp-1">{prod.title}</h4>
              <div className="flex flex-col gap-y-0.5 mt-1">
                {prod.originalPrice && (
                  <span className="text-[10px] text-gray-500 line-through">¥ {prod.originalPrice}</span>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-[15px] font-black text-[#8B6E4E]">¥ {prod.memberPrice || prod.price}</span>
                  <span className="text-[10px] text-[#A69984] font-bold">128人付款</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
