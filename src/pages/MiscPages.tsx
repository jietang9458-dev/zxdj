import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Warehouse, BookOpen, Film, Share2, Users, Star, Gift, ShieldAlert, CheckCircle2, Crown, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { HOT_DRAMAS } from '../constants';
import { useCMS } from '../context/CMSContext';

export function Production() {
  const navigate = useNavigate();
  const { pages } = useCMS();
  const pageData = pages.production || {};
  
  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full transition-colors duration-300">
      <Header title={pageData.title || "制作发行中心"} dark />
      <div className="mx-5 mt-4 rounded-[32px] overflow-hidden h-[180px] relative shadow-xl">
        <img 
          src={pageData.banner || "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&fit=crop"} 
          className="w-full h-full object-cover" 
          alt="" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex flex-col justify-center px-8 text-white">
          <h2 className="text-[24px] font-black leading-tight">
            {pageData.title || "专业制作团队"}<br />{pageData.subtitle ? "" : "打造精品短剧"}
          </h2>
          <p className="text-[#E6D5B8] text-[13px] mt-2 opacity-90 font-bold">
            {pageData.subtitle || "全年制作发行百部以上精品短剧"}
          </p>
        </div>
      </div>
      
      {/* Category Icons */}
      <div className="px-5 mt-8 grid grid-cols-4 gap-4">
        {[
          { l: '项目孵化', Icon: BookOpen, path: '/service/flow' },
          { l: '拍摄制作', Icon: Film, path: '/service/flow' },
          { l: '后期制作', Icon: Warehouse, path: '/service/flow' },
          { l: '发行推广', Icon: Share2, path: '/service/flow' }
        ].map((item, idx) => (
          <div key={idx} onClick={() => navigate(item.path)} className="flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-all">
            <div className="w-14 h-14 rounded-full bg-[#FAF5EE] flex items-center justify-center text-[#8B6E4E]">
              <item.Icon size={24} />
            </div>
            <span className="text-[12px] font-black text-[#5A4F43]">{item.l}</span>
          </div>
        ))}
      </div>

      <div className="mx-5 mt-10 p-6 bg-white dark:bg-[#2A1D0F] rounded-[32px] shadow-sm border border-gray-50 dark:border-white/5 mb-10">
        <h3 className="text-[17px] font-black text-[#1A1108] dark:text-white mb-6">正在筹备</h3>
        <div className="space-y-6">
          {(pageData.config?.projects || [
            { t: '都市甜宠新剧', d: '筹备中', i: 'https://images.unsplash.com/photo-1544208453-ca422f28b7e2?w=100&h=100&fit=crop' },
            { t: '悬疑探案短剧', d: '筹备中', i: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=100&h=100&fit=crop' },
            { t: '古装传奇短剧', d: '筹备中', i: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=100&h=100&fit=crop' }
          ]).map((item: any, i: number) => (
            <div key={i} className="flex justify-between items-center group">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 overflow-hidden shadow-inner">
                  <img src={item.i} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="font-black text-[14px] text-[#1A1108]">{item.t}</h4>
                  <p className="text-[12px] text-[#A69984] mt-0.5">{item.d}</p>
                </div>
              </div>
              <button 
                onClick={() => navigate(`/drama/${i}`)} 
                className="bg-[#8B6E4E]/10 text-[#8B6E4E] px-4 py-2 rounded-xl text-[12px] font-black border border-[#8B6E4E]/20 active:scale-90 transition-transform"
              >
                详情
              </button>
            </div>
          ))}
        </div>
        <button 
          onClick={() => navigate('/service/flow')}
          className="w-full mt-10 h-14 bg-[#8B6E4E] text-white font-black rounded-2xl shadow-lg active:scale-95 transition-all text-[15px]"
        >
          我要投剧本
        </button>
      </div>
    </div>
  );
}

export function Actors() {
  const navigate = useNavigate();
  const { pages } = useCMS();
  const [currentIdx, setCurrentIdx] = useState(0);
  const pageData = pages.actors || {};
  
  const defaultCarousel = [
    "https://images.unsplash.com/photo-1544208453-ca422f28b7e2?q=80&w=1200",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200",
    "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200"
  ];
  
  const carouselImages = (pageData.banners && pageData.banners.length > 0) ? pageData.banners : defaultCarousel;

  useEffect(() => {
    if (carouselImages.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full transition-colors duration-300">
      <Header title={pageData.title || "明星演员孵化中心"} dark />
      
      {/* 16:9 Carousel Background */}
      <div className="mx-5 mt-4 rounded-[32px] overflow-hidden aspect-video relative shadow-xl">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIdx}
            src={carouselImages[currentIdx]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full object-cover"
            alt=""
          />
        </AnimatePresence>
        
        {/* Overlay Text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30 flex flex-col justify-end p-8 text-white">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            key={`title-${currentIdx}`}
            className="text-[26px] font-black tracking-tight"
          >
            {pageData.title || "打造明日之星"}
          </motion.h2>
          <motion.p 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            key={`desc-${currentIdx}`}
            className="text-[#E6D5B8] text-[14px] mt-2 opacity-90 font-bold uppercase tracking-[0.2em]"
          >
            {pageData.subtitle || "演员海选·培训·孵化·经纪"}
          </motion.p>
          
          {/* Indicators */}
          <div className="flex gap-1.5 mt-4">
            {carouselImages.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 rounded-full transition-all duration-300 ${i === currentIdx ? 'w-6 bg-[#D4AF37]' : 'w-2 bg-white/30'}`} 
              />
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 mt-8 grid grid-cols-4 gap-4">
        {[
          { l: '海选报名', Icon: BookOpen, path: '/audition/registration' },
          { l: '我要学艺', Icon: BookOpen, path: '/audition/learning' },
          { l: '明星孵化', Icon: Star, path: '/service/flow' },
          { l: '签约经纪', Icon: Users, path: '/service/flow' }
        ].map((item, idx) => (
          <div key={idx} onClick={() => navigate(item.path)} className="flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-all">
            <div className="w-14 h-14 rounded-full bg-[#FAF5EE] flex items-center justify-center text-[#8B6E4E]">
              <item.Icon size={24} />
            </div>
            <span className="text-[12px] font-black text-[#5A4F43]">{item.l}</span>
          </div>
        ))}
      </div>

      <div className="p-6 mb-10">
        <div className="flex justify-between items-center mb-6 px-1">
          <h3 className="text-[17px] font-black text-[#1A1108] dark:text-white">正在海选</h3>
          <span 
            onClick={() => navigate('/audition/projects')}
            className="text-[13px] text-[#A69984] font-bold cursor-pointer"
          >
            更多 &gt;
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {HOT_DRAMAS.map((drama, i) => (
            <div key={i} onClick={() => navigate(`/drama/${drama.id}`)} className="text-center group cursor-pointer">
              <div className="aspect-[3/4] rounded-2xl bg-gray-200 mb-2.5 overflow-hidden shadow-md">
                <img src={drama.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <span className="text-[12px] font-black text-[#1A1108] dark:text-[#E6D5B8] line-clamp-1">{drama.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Tourism() {
  const navigate = useNavigate();
  const { pages } = useCMS();
  const [currentIdx, setCurrentIdx] = useState(0);
  const pageData = pages.tourism || {};
  
  const defaultCarousel = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&fit=crop",
    "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=800&fit=crop",
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&fit=crop"
  ];
  
  const carouselImages = (pageData.banners && pageData.banners.length > 0) ? pageData.banners : (pageData.banner ? [pageData.banner] : defaultCarousel);

  useEffect(() => {
    if (carouselImages.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full transition-colors duration-300">
      <Header title={pageData.title || "影视文化旅游中心"} dark />
      <div className="mx-5 mt-4 rounded-[32px] overflow-hidden h-[180px] relative shadow-xl">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIdx}
            src={carouselImages[currentIdx]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full object-cover"
            alt=""
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex flex-col justify-center px-8 text-white">
          <h2 className="text-[24px] font-black leading-tight">
            {pageData.title || "参与短剧拍摄"}<br />{pageData.subtitle ? "" : "体验影视文旅"}
          </h2>
          <p className="text-[#E6D5B8] text-[13px] mt-2 opacity-90 font-bold">
            {pageData.subtitle || "深度参与拍摄体验·演员明星互动"}
          </p>
          
          {/* Carousel Indicators */}
          <div className="flex gap-1.5 mt-4">
            {carouselImages.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 rounded-full transition-all duration-300 ${i === currentIdx ? 'w-6 bg-[#D4AF37]' : 'w-2 bg-white/30'}`} 
              />
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 mt-8 grid grid-cols-4 gap-4">
        {[
          { l: '影视旅游', Icon: Warehouse, path: '/tourism/groups' },
          { l: '拍摄体验', Icon: Film, path: '/tourism/experience' },
          { l: '特色产品', Icon: Users, path: '/mall' },
          { l: '疗愈养生', Icon: Star, path: '/service/flow' }
        ].map((item, idx) => (
          <div key={idx} onClick={() => navigate(item.path)} className="flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-all">
            <div className="w-14 h-14 rounded-full bg-[#FAF5EE] flex items-center justify-center text-[#8B6E4E]">
              <item.Icon size={24} />
            </div>
            <span className="text-[12px] font-black text-[#5A4F43]">{item.l}</span>
          </div>
        ))}
      </div>

      <div className="p-6 mb-10">
        <h3 className="text-[17px] font-black text-[#1A1108] dark:text-white mb-6 px-1">热门基地</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { t: '中国盐田山海都市片场', l: '深圳 · 盐田', i: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=400&h=250&fit=crop' },
            { t: '横店影视城', l: '浙江 · 横店', i: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?q=80&w=400&h=250&fit=crop' }
          ].map((item, i) => (
            <div key={i} onClick={() => navigate('/base/1')} className="bg-white dark:bg-[#2A1D0F] rounded-[28px] overflow-hidden shadow-sm border border-gray-50 dark:border-white/5 cursor-pointer active:scale-95 transition-all">
              <div className="h-32 overflow-hidden">
                <img src={item.i} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 flex flex-col gap-1">
                <h4 className="text-[13px] font-black text-[#1A1108] line-clamp-1">{item.t}</h4>
                <p className="text-[11px] text-[#A69984] font-bold">{item.l}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TourismGroups() {
  const navigate = useNavigate();
  const { pages } = useCMS();
  const pageData = pages.tourism || {};
  
  const defaultGroups = [
    {
      id: '1',
      project: '《大汉传奇》实拍群演团',
      startTime: '2024-07-15',
      route: '横店影视城全域线路',
      duration: '3日游',
      cost: '1280元/人',
      image: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=600&fit=crop'
    },
    {
      id: '2',
      project: '《都市之王》现代戏体验团',
      startTime: '2024-07-20',
      route: '深圳盐田片场 + 大梅沙滨海旅游区',
      duration: '2日游',
      cost: '880元/人',
      image: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?q=80&w=600&fit=crop'
    }
  ];

  const groups = (pageData.groups && pageData.groups.length > 0) ? pageData.groups : defaultGroups;

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full transition-colors duration-300">
      <Header title="影视旅游组团信息" dark />
      <div className="p-5 space-y-6">
        {groups.map((group) => (
          <div key={group.id} className="bg-white dark:bg-[#2A1D0F] rounded-[32px] overflow-hidden shadow-sm border border-gray-50 dark:border-white/5">
            <div className="h-48 overflow-hidden">
              <img src={group.image} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-[18px] font-black text-[#1A1108] dark:text-white leading-tight flex-1">{group.project}</h3>
                <span className="ml-4 text-[#D4AF37] font-black text-[16px]">{group.cost}</span>
              </div>
              
              <div className="space-y-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-[#FAF5EE] dark:bg-[#3A2D1F] flex items-center justify-center text-[#8B6E4E]">
                    <Video size={14} />
                  </div>
                  <span className="text-[13px] font-bold text-[#5A4F43] dark:text-[#A69984]">开机时间：{group.startTime}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-[#FAF5EE] dark:bg-[#3A2D1F] flex items-center justify-center text-[#8B6E4E]">
                    <Warehouse size={14} />
                  </div>
                  <span className="text-[13px] font-bold text-[#5A4F43] dark:text-[#A69984]">旅游线路：{group.route}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-[#FAF5EE] dark:bg-[#3A2D1F] flex items-center justify-center text-[#8B6E4E]">
                    <Users size={14} />
                  </div>
                  <span className="text-[13px] font-bold text-[#5A4F43] dark:text-[#A69984]">行程安排：{group.duration}</span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/register')}
                className="w-full mt-6 h-12 bg-[#8B6E4E] text-white font-black rounded-2xl shadow-lg shadow-[#8B6E4E]/20 active:scale-95 transition-all text-[14px]"
              >
                我要报名
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StarClub() {
  const navigate = useNavigate();
  const { pages } = useCMS();
  const pageData = pages.starclub || {};
  
  const defaultActivities = [
    { t: '明星见面会 · 深圳站', d: '2024-06-15', l: '深圳', i: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200' },
    { t: '粉丝互动直播', d: '2024-06-18', l: '线上直播', i: 'https://images.unsplash.com/photo-1540575861501-7c91bc177d4c?w=200' }
  ];

  const activities = (pageData.activities && pageData.activities.length > 0) ? pageData.activities : defaultActivities;

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full transition-colors duration-300">
      <Header title={pageData.title || "明星俱乐部"} dark />
      <div className="mx-5 mt-4 rounded-[32px] overflow-hidden h-[180px] relative shadow-xl">
        <img 
          src={pageData.banner || "https://images.unsplash.com/photo-1514525253361-b83f8a9e2a6a?q=80&w=800&fit=crop"} 
          className="w-full h-full object-cover" 
          alt="" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex flex-col justify-center px-10 text-white">
          <h2 className="text-[24px] font-black leading-tight mb-2">
            {pageData.title || "明星互动见面会"}
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-[24px] font-black text-[#D4AF37]">
              {pageData.subtitle || "近距离接触偶像"}
            </span>
            <Crown className="text-[#D4AF37] w-10 h-10" />
          </div>
        </div>
      </div>

      <div className="px-5 mt-8 grid grid-cols-4 gap-4">
        {[
          { l: '见面会', Icon: Users, path: '/service/flow' },
          { l: '粉丝互动', Icon: Star, path: '/service/flow' },
          { l: '专属福利', Icon: Gift, path: '/mall' },
          { l: '会员特权', Icon: ShieldAlert, path: '/service/flow' }
        ].map((item, idx) => (
          <div key={idx} onClick={() => navigate(item.path)} className="flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-all">
            <div className="w-14 h-14 rounded-full bg-[#FAF5EE] flex items-center justify-center text-[#8B6E4E]">
              <item.Icon size={24} />
            </div>
            <span className="text-[12px] font-black text-[#5A4F43]">{item.l}</span>
          </div>
        ))}
      </div>

      <div className="p-6 mb-10">
        <h3 className="text-[17px] font-black text-[#1A1108] dark:text-white mb-6 px-1">近期活动</h3>
        <div className="space-y-4">
          {activities.map((item: any, i: number) => (
            <div key={i} className="bg-white dark:bg-[#2A1D0F] p-5 rounded-[32px] flex gap-5 shadow-sm border border-gray-50 dark:border-white/5">
              <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-inner">
                <img src={item.i} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-center gap-2">
                <h4 className="text-[15px] font-black text-[#1A1108]">{item.t}</h4>
                <p className="text-[12px] text-[#A69984] font-bold">{item.d} {item.l}</p>
                <div className="flex justify-end">
                  <button 
                    onClick={() => navigate('/register')}
                    className="bg-[#8B6E4E] text-white px-5 py-1.5 rounded-xl text-[12px] font-black active:scale-90 transition-transform"
                  >
                    我要报名
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Investment() {
  const navigate = useNavigate();
  const { pages } = useCMS();
  const pageData = pages.invest || {};
  
  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full transition-colors duration-300">
      <Header title={pageData.title || "招商合作"} dark />
      <div className="h-[240px] bg-[#1A1108] relative flex flex-col items-center justify-center text-center p-10">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={pageData.banner || "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800&fit=crop"} 
            className="w-full h-full object-cover grayscale" 
            alt="" 
          />
        </div>
        <h2 className="text-[28px] font-black text-white relative z-10 leading-tight">
          {pageData.title || "携手合作 共赢未来"}
        </h2>
        <p className="text-[#D4AF37] text-[18px] font-bold mt-3 relative z-10 tracking-widest">
          {pageData.subtitle || "加入中星短剧生态链"}
        </p>
      </div>

      <div className="mx-5 -mt-10 bg-white rounded-[40px] p-8 shadow-xl relative z-20">
        <h3 className="text-[17px] font-black text-[#1A1108] mb-8">合作模式</h3>
        <div className="grid grid-cols-4 gap-6">
          {[
            { l: '版权合作', Icon: BookOpen, path: '/copyright' },
            { l: '基地合作', Icon: Warehouse, path: '/base' },
            { l: '品牌合作', Icon: Star, path: '/service/flow' },
            { l: '投资合作', Icon: Users, path: '/service/flow' }
          ].map((item, idx) => (
            <div key={idx} onClick={() => navigate(item.path)} className="flex flex-col items-center gap-3 cursor-pointer active:scale-95 transition-all">
              <div className="w-14 h-14 rounded-full bg-[#F2EDE4] flex items-center justify-center text-[#8B6E4E]">
                <item.Icon size={24} />
              </div>
              <span className="text-[12px] font-black text-[#5A4F43] whitespace-nowrap">{item.l}</span>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h3 className="text-[17px] font-black text-[#1A1108] mb-8">合作优势</h3>
          <ul className="space-y-6">
            {[
              '成熟的短剧生态链平台',
              '丰富的行业资源和经验',
              '专业的团队和服务支持',
              '共赢的商业模式'
            ].map((text, i) => (
              <li key={i} className="flex items-center gap-4">
                <CheckCircle2 className="text-[#D4AF37]" size={20} />
                <span className="text-[15px] font-bold text-[#4A443E]">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <button 
          onClick={() => navigate('/service/flow')}
          className="w-full mt-12 h-14 bg-[#8B6E4E] text-white font-black rounded-2xl shadow-xl shadow-[#8B6E4E]/30 active:scale-95 transition-all text-[16px]"
        >
          我要合作
        </button>
      </div>
    </div>
  );
}

export function LiveFilming() {
  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full transition-colors duration-300">
      <Header title="直播拍戏" dark />
      <div className="p-6">
        <h3 className="text-[17px] font-black text-[#1A1108] dark:text-white mb-6">正在直播</h3>
        <div className="space-y-6">
          {[
            { t: '《逆袭星途》片场直击', u: '1.2w 观看', i: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&fit=crop' },
            { t: '古装短剧《花月令》拍摄现场', u: '8500 观看', i: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=800&fit=crop' }
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-50 relative group cursor-pointer">
              <div className="h-48 relative">
                <img src={item.i} alt="" className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1.5 animate-pulse">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" /> LIVE
                </div>
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                    <Video size={32} />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-[15px] font-black text-[#1A1108] mb-1">{item.t}</h4>
                <p className="text-[12px] text-[#A69984] font-bold">{item.u}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-[17px] font-black text-[#1A1108] mt-10 mb-6">直播预告</h3>
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-50 space-y-6">
          {[
            { t: '演员海选现场全程直播', d: '明天 14:00' },
            { t: '短剧导演公开课', d: '06月12日 19:30' }
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center pb-6 last:pb-0 border-b last:border-0 border-gray-50">
              <div>
                <h4 className="text-[14px] font-black text-[#1A1108]">{item.t}</h4>
                <p className="text-[11px] text-[#D4AF37] font-bold mt-1">{item.d}</p>
              </div>
              <button className="px-4 py-2 bg-[#F2EDE4] text-[#8B6E4E] rounded-xl text-[12px] font-black border border-[#8B6E4E]/10">预约</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FilmingExperience() {
  const navigate = useNavigate();
  const projects = [
    {
      id: '1',
      title: '《大汉传奇》筹备组',
      director: '张艺林',
      period: '15天',
      location: '横店影视城',
      image: 'https://images.unsplash.com/photo-1510711789248-087061cda288?q=80&w=600&fit=crop',
      tags: ['古装', '权谋']
    },
    {
      id: '2',
      title: '《都市之王》第二季',
      director: '李佳鸣',
      period: '10天',
      location: '成都太古里',
      image: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=600&fit=crop',
      tags: ['都市', '悬疑']
    },
    {
      id: '3',
      title: '《云南往事》筹拍中',
      director: '陈深',
      period: '20天',
      location: '大理苍山洱海',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&fit=crop',
      tags: ['剧情', '爱情']
    }
  ];

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full transition-colors duration-300">
      <Header title="筹拍项目" dark />
      <div className="p-5 space-y-5">
        {projects.map((project) => (
          <div key={project.id} className="bg-white dark:bg-[#2A1D0F] rounded-[32px] overflow-hidden shadow-sm border border-gray-50 dark:border-white/5 p-4 flex gap-4">
            <div className="w-24 h-32 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm border border-gray-100 dark:border-white/5">
              <img src={project.image} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-[#FAF5EE] dark:bg-[#3A2D1F] text-[#8B6E4E] text-[10px] font-bold rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-[17px] font-black text-[#1A1108] dark:text-white leading-tight">{project.title}</h3>
                <p className="text-[12px] font-medium text-[#8B6E4E] opacity-80 mt-1">导演：{project.director} | 周期：{project.period}</p>
                <p className="text-[12px] font-medium text-[#8B6E4E] opacity-80 mt-0.5">地点：{project.location}</p>
              </div>
              
              <button 
                onClick={() => navigate('/audition/registration')}
                className="w-full h-10 bg-[#D4AF37] text-white font-black rounded-xl shadow-lg shadow-[#D4AF37]/20 active:scale-95 transition-all text-[13px]"
              >
                我要参演
              </button>
            </div>
          </div>
        ))}
        <div className="text-center py-6">
          <p className="text-[#A69984] text-[12px] font-bold">更多项目正在积极筹备中，敬请期待...</p>
        </div>
      </div>
    </div>
  );
}
