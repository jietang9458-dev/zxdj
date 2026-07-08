import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight, Crown, Share2, BookOpen, Film, Users, Warehouse, Camera, Video, Bell, Circle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
import { motion, AnimatePresence } from 'motion/react';
import { HOME_CATEGORIES, HOT_DRAMAS, APP_LOGO } from '../constants';
import Header from '../components/Header';
import { useCMS } from '../context/CMSContext';
import { useUser } from '../context/UserContext';

function NotificationModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { notifications, markAsRead } = useUser();
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    if (isOpen) {
      notifications.filter(n => !n.read).forEach(n => markAsRead(n.id));
    }
  }, [isOpen, notifications, markAsRead]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        className="relative w-80 bg-white dark:bg-[#1A1108] h-full shadow-2xl overflow-y-auto"
      >
        <div className="p-5 border-b border-gray-100 dark:border-white/5 flex justify-between items-center sticky top-0 bg-white/80 dark:bg-[#1A1108]/80 backdrop-blur-md">
          <h2 className="font-bold text-lg dark:text-white">系统通知</h2>
          <button onClick={onClose} className="p-2 -mr-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full">关闭</button>
        </div>
        <div className="p-4 space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center text-gray-400 py-10">暂无通知</div>
          ) : (
            notifications.map(n => (
              <div key={n.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-[14px] text-gray-900 dark:text-white">{n.title}</h3>
                  <span className="text-[10px] text-gray-500">{new Date(n.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
                <p className="text-[12px] text-gray-600 dark:text-gray-400 tracking-wide">{n.content}</p>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { pages, dramas, loading } = useCMS();
  const { notifications } = useUser();
  const unreadCount = notifications.filter(n => !n.read).length;
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentBanner, setCurrentBanner] = useState(0);

  const defaultBanners = [
    { 
      title: '《逆袭星途》震撼上线', 
      sub: '全网首播 · 领跑短剧赛道', 
      img: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=800&fit=crop' 
    },
    { 
      title: '明星演员孵化计划', 
      sub: '寻找下一个千万级顶流', 
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&fit=crop' 
    },
    { 
      title: '山海都市基地新片场', 
      sub: '旗舰级品质 · 影棚直供', 
      img: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&fit=crop' 
    }
  ];

  const banners = (pages.home?.banners && pages.home.banners.length > 0) ? pages.home.banners : defaultBanners;
  const appSettings = pages.settings || { logo: APP_LOGO, name: '中星影视生态链' };

  useEffect(() => {
    if (banners.length === 0) return;
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    // keyword mapping
    if (query.includes('版权') || query.includes('销售')) {
      navigate('/copyright');
    } else if (query.includes('基地') || query.includes('片场') || query.includes('拍摄')) {
      navigate('/base');
    } else if (query.includes('商城') || query.includes('商品')) {
      navigate('/mall');
    } else if (query.includes('演员') || query.includes('明星')) {
      navigate('/actors');
    } else if (query.includes('制作') || query.includes('发行')) {
      navigate('/production');
    } else if (query.includes('旅游') || query.includes('文化')) {
      navigate('/tourism');
    } else if (query.includes('直播')) {
      navigate('/live');
    } else if (query.includes('招商') || query.includes('合作')) {
      navigate('/investment');
    } else if (query.includes('钱包') || query.includes('钱')) {
      navigate('/wallet');
    } else {
      navigate(`/discover?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full transition-colors duration-300">
      {/* Home Header */}
      <div className="bg-[#1A1108] pt-14 pb-8 px-5 rounded-b-[40px] relative overflow-hidden">
        {/* Abstract Background Light */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-yellow-500/10 blur-[80px] rounded-full -mr-20 -mt-20" />
        
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2A1D0F] to-[#1A1108] backdrop-blur-xl rounded-3xl flex items-center justify-center p-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 ring-1 ring-[#D4AF37]/40 overflow-hidden group relative">
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <img 
                  src={appSettings.logo || APP_LOGO} 
                  alt="logo" 
                  className="w-full h-full object-cover filter drop-shadow-[0_0_15px_rgba(212,175,55,0.8)] transform group-hover:scale-110 transition-transform duration-700 rounded-xl" 
                  onError={(e) => {
                    // Fallback to internal icon if logo fails to load
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNENEFGMzciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWdvbiBwb2ludHM9IjEyIDIgMTUgOC41IDIyIDkuMjcgMTcgMTQuMTQgMTguMTggMjEgMTIgMTcuMjcgNS44MiAyMSA3IDE0LjE0IDIgOS4yNyA5IDguNSAxMiAyIi8+PC9zdmc+';
                  }}
                />
              </div>
              <div>
                <h1 className="text-[24px] font-black text-[#E6D5B8] tracking-tight leading-none mb-1 shadow-glow-gold filter drop-shadow-[0_0_8px_rgba(230,213,184,0.3)]">
                  {appSettings.name || '中星影视生态链'}
                </h1>
                <p className="text-[10px] text-[#D4AF37] font-black tracking-[0.3em] opacity-80 uppercase pl-0.5">
                  ZX Eco-Chain Premium
                </p>
              </div>
            </div>
            <p className="text-[13px] text-[#A69984] font-bold tracking-[0.2em] opacity-70 mt-3 pl-1 bg-white/5 inline-block px-3 py-1 rounded-full border border-white/5">
              {appSettings.slogan || '联动你我 · 链接未来'}
            </p>
          </div>

          <div className="flex flex-col gap-2 items-end">
            <button 
              onClick={() => setShowNotifications(true)}
              className="relative p-2.5 bg-white/5 rounded-xl border border-white/10 text-[#E6D5B8] active:scale-90 transition-transform"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-[#1A1108]"></span>
              )}
            </button>

          </div>
        </div>

        {/* Search Bar - Fixed Logic */}
        <form onSubmit={handleSearch} className="relative mb-10 group">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索短剧/演员/基地/活动" 
            className="w-full h-12 pl-12 pr-4 bg-[#F2EDE4] dark:bg-[#2A1D0F] rounded-full text-[14px] font-medium outline-none border-2 border-transparent focus:border-[#D4AF37]/50 dark:text-white transition-all placeholder:text-[#A69984] shadow-inner focus:shadow-[0_0_15px_rgba(212,175,55,0.2)]"
          />
          <button 
            type="submit"
            className="absolute left-1 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-[#A69984] hover:text-[#D4AF37] transition-colors"
          >
            <Search size={22} />
          </button>
        </form>

        {/* Banner Area - Carousel implementation */}
        <div className="h-[210px] w-full rounded-[32px] overflow-hidden relative border border-white/10 shadow-2xl bg-black">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentBanner}
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0"
            >
              <img 
                src={banners[currentBanner].img} 
                alt="Banner" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent flex flex-col justify-end p-8">
                <div className="flex flex-col">
                  <motion.span 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-white text-[22px] font-black tracking-tight leading-tight"
                  >
                    {banners[currentBanner].title}
                  </motion.span>
                  <motion.span 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-[#D4AF37] text-[13px] opacity-90 uppercase font-black tracking-wider mt-1"
                  >
                    {banners[currentBanner].sub}
                  </motion.span>
                </div>
                
                {/* Carousel Dots */}
                <div className="flex gap-2.5 mt-6">
                  {banners.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentBanner(idx)}
                      className={cn(
                        "transition-all duration-500 rounded-full h-1.5",
                        currentBanner === idx ? "w-8 bg-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.8)]" : "w-1.5 bg-white/40"
                      )}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Main Grid Categories */}
      <div className="px-5 mt-[-25px]">
        <div className="bg-white dark:bg-[#2A1D0F] rounded-[40px] p-7 shadow-sm border border-gray-50 dark:border-white/5 grid grid-cols-3 gap-y-8 gap-x-2">
          {(() => {
            const defaultCats = [
              { id: 'copyright', label: '版权销售', icon: <BookOpen />, path: '/copyright', color: 'bg-orange-50 text-orange-500' },
              { id: 'production', label: '拍摄制作', icon: <Film />, path: '/production', color: 'bg-blue-50 text-blue-500' },
              { id: 'actors', label: '演员孵化', icon: <Users />, path: '/actors', color: 'bg-purple-50 text-purple-500' },
              { id: 'filming', label: '影视基地', icon: <Warehouse />, path: '/base', color: 'bg-green-50 text-green-500' },
              { id: 'tourism', label: '文化旅游', icon: <Camera />, path: '/tourism', color: 'bg-yellow-50 text-yellow-500' },
              { id: 'live', label: '直播拍戏', icon: <Video />, path: '/live', color: 'bg-red-50 text-red-500' },
            ];

            const cmsCats = pages.home?.categories || [];
            
            // Merge defaults with CMS cats, preserving icons and order of defaultCats
            const cats = defaultCats.map((def, idx) => {
              const cmsCat = cmsCats.find((c: any) => c.id === def.id) || cmsCats[idx];
              if (cmsCat) {
                return { ...def, label: cmsCat.label || def.label, path: cmsCat.path || def.path };
              }
              return def;
            });

            return cats.map((cat: any, idx: number) => {
              const IconComponent = cat.icon || <Circle />; // Fallback
              return (
                <motion.div 
                  key={cat.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  onClick={() => navigate(cat.path)}
                  className="flex flex-col items-center gap-3 cursor-pointer group"
                >
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm",
                    cat.color || 'bg-gray-50 text-gray-500'
                  )}>
                    {typeof IconComponent === 'object' ? IconComponent : React.createElement(IconComponent as any, { size: 28, strokeWidth: 2.5 })}
                  </div>
                  <span className="text-[12px] font-black text-[#5A4F43] dark:text-[#E6D5B8]">{cat.label}</span>
                </motion.div>
              );
            });
          })()}
        </div>
      </div>

      {/* Stats Section with links */}
      <div className="px-5 mt-8 grid grid-cols-4 gap-2">
        {[
          { v: '100+', l: '拍摄制作', path: '/production' },
          { v: '50+', l: '拍摄基地', path: '/base' },
          { v: '1000+', l: '签约演员', path: '/actors' },
          { v: '1000W+', l: '累计观众', path: '/discover' }
        ].map((stat, idx) => (
          <div key={idx} onClick={() => navigate(stat.path)} className="flex flex-col items-center cursor-pointer">
            <span className="text-[18px] font-black text-[#3D3832] dark:text-[#E6D5B8] tabular-nums">{stat.v}</span>
            <span className="text-[11px] text-[#A69984] font-bold mt-1 tracking-tight">{stat.l}</span>
          </div>
        ))}
      </div>

      {/* Additional Quick Access Grid */}
      <div className="px-5 mt-10 grid grid-cols-2 gap-4">
        {[
          { t: '明星俱乐部', s: '近距离接触偶像', c: 'bg-[#FAF4ED]', ic: <Crown className="text-[#8B6E4E]" />, path: '/starclub' },
          { t: '招商合作', s: '携手合作共赢未来', c: 'bg-[#F2F5FA]', ic: <Share2 className="text-[#8BA3B8]" />, path: '/investment' }
        ].map((item, idx) => (
          <div 
            key={idx} 
            onClick={() => navigate(item.path)}
            className={`${item.c} dark:bg-white/5 dark:backdrop-blur-md p-6 rounded-[32px] flex items-center justify-between cursor-pointer active:scale-95 transition-all shadow-sm`}
          >
            <div>
              <h4 className="text-[14px] font-black text-[#1A1108] dark:text-white">{item.t}</h4>
              <p className="text-[10px] text-[#A69984] font-bold mt-1">{item.s}</p>
            </div>
            {item.ic}
          </div>
        ))}
      </div>


      {/* Hot Recommendation Section */}
      <div className="px-5 mt-10 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[18px] font-black text-[#1A1108] dark:text-white">热播短剧推荐</h2>
          <button onClick={() => navigate('/discover')} className="flex items-center gap-0.5 text-[#A69984] text-[13px] font-semibold hover:text-[#D4AF37] transition-colors">
            更多 <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {(dramas.length > 0 ? dramas : HOT_DRAMAS).slice(0, 3).map((drama, idx) => (
            <motion.div 
              key={drama.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              onClick={() => navigate(`/drama/${drama.id}`)}
              className="flex flex-col gap-2 group cursor-pointer"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden relative shadow-lg">
                <img 
                  src={drama.imageUrl} 
                  alt={drama.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-white text-[11px] font-bold line-clamp-1 leading-tight">
                    {drama.title}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <AnimatePresence>
        <NotificationModal isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
      </AnimatePresence>
    </div>
  );
}
