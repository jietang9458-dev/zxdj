import ImageCropperModal from "../components/ImageCropperModal";
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Share2, MoreHorizontal, User, ImagePlus, Send, Heart, MessageCircle, X, Plus, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Header from '../components/Header';
import { useUser } from '../context/UserContext';
import { useCMS } from '../context/CMSContext';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}



export default function Discover() {
  const navigate = useNavigate();
  const { profile } = useUser();
  const { pages } = useCMS();

  const [activeTab, setActiveTab] = useState('推荐');
  const [searchQuery, setSearchQuery] = useState('');
  
  
  
        
    
  
  
  const urlSearchQuery = new URLSearchParams(window.location.search).get('q') || searchQuery;

  const newsData = pages.news || {};
  const cmsPosts = [
    ...(newsData.shortDramaNews || []).map((n: any, i: number) => ({ id: `sd_${i}`, t: n.title, u: n.desc, d: '刚刚', blocks: n.blocks, img: n.imageUrl, cat: '行业资讯', isRecommended: !!n.isRecommended })),
    ...(newsData.ecosystemNews || []).map((n: any, i: number) => ({ id: `eco_${i}`, t: n.title, u: n.desc, d: '刚刚', blocks: n.blocks, img: n.imageUrl, cat: '生态链资讯', isRecommended: !!n.isRecommended })),
    ...(newsData.bts || []).map((n: any, i: number) => ({ id: `bts_${i}`, t: n.title, u: n.desc, d: '刚刚', blocks: n.blocks, img: n.imageUrl, cat: '拍摄花絮', isRecommended: !!n.isRecommended })),
    ...(newsData.successCases || []).map((n: any, i: number) => ({ id: `sc_${i}`, t: n.title, u: n.desc, d: '刚刚', blocks: n.blocks, img: n.imageUrl, cat: '成功案例', isRecommended: !!n.isRecommended }))
  ];
  
   

  const allPosts = [...cmsPosts];

  const filteredPosts = (activeTab === '推荐' 
    ? allPosts.filter((p: any) => p.isRecommended  || false) 
    : allPosts.filter(p => p.cat === activeTab)
  ).filter(p => !urlSearchQuery || p.t?.includes(urlSearchQuery) || p.u?.includes(urlSearchQuery));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/discover?q=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate(`/discover`);
    }
  };


  
  
  
  
    
  
  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full transition-colors duration-300 pb-24">
      <Header title="发现" dark showBack={false} />
      
      {/* Search Bar */}
      <div className="px-5 mt-4">
        <form onSubmit={handleSearch} className="relative">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索感兴趣的话题" 
            className="w-full h-12 pl-12 pr-4 bg-[#F2EDE4] dark:bg-[#2A1D0F] rounded-full text-[14px] font-medium outline-none border-2 border-transparent focus:border-[#D4AF37]/30 dark:text-white transition-all placeholder:text-[#A69984]"
          />
          <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A69984]">
            <Search size={20} />
          </button>
        </form>
      </div>

      {/* Categories / Tabs */}
      <div className="flex gap-8 px-6 overflow-x-auto scrollbar-hide bg-white dark:bg-[#1A1108] mt-6 py-4 sticky top-24 z-30 border-b border-gray-50 dark:border-white/5">
        {['推荐', '行业资讯', '生态链资讯', '拍摄花絮', '成功案例'].map((t) => (
          <button 
            key={t} 
            onClick={() => setActiveTab(t)}
            className={cn(
              "text-[15px] font-black whitespace-nowrap transition-all relative pb-2",
              activeTab === t ? 'text-[#8B6E4E] dark:text-[#E6D5B8]' : 'text-gray-400 dark:text-gray-600'
            )}
          >
            {t}
            {activeTab === t && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-[#D4AF37] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="p-5 space-y-5">
        <AnimatePresence mode="popLayout">
          

          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, i) => {
              
              return (
                <motion.div 
                  key={post.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white dark:bg-[#2A1D0F] rounded-[32px] overflow-hidden shadow-sm border border-gray-50 dark:border-white/5"
                >
                  {post.img && (
                    <div className="w-full aspect-[16/9] overflow-hidden relative">
                      <img src={post.img} alt="" className="w-full h-full object-cover" />
                      <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-[11px] font-bold rounded-full">
                        {post.cat}
                      </div>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-[18px] font-black text-[#1A1108] dark:text-white leading-tight mb-4">
                      {post.t}
                    </h3>
                    
                    {post.blocks && post.blocks.length > 0 ? (
                      <div className="space-y-4 mt-4">
                        {post.blocks.map((block: any, idx: number) => (
                          <div key={idx}>
                            {block.type === 'text' ? (
                              <p className="text-[14px] text-[#4A443E] dark:text-[#E6D5B8] leading-relaxed whitespace-pre-wrap">
                                {block.content}
                              </p>
                            ) : block.type === 'image' && block.url ? (
                              <img src={block.url} alt="" className="w-full rounded-2xl" />
                            ) : null}
                          </div>
                        ))}
                      </div>
                    ) : post.d && post.d !== '刚刚发布' ? (
                      <p className="text-[14px] text-[#4A443E] dark:text-[#E6D5B8] leading-relaxed whitespace-pre-wrap">
                        {post.d}
                      </p>
                    ) : null}
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="py-20 text-center text-[#A69984] font-bold opacity-40">暂无相关资讯</div>
          )}
        </AnimatePresence>
      </div>

          </div>
  );
}


