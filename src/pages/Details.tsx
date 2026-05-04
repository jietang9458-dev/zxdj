import React from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import { Heart, Share2, Play, Star, MapPin, ShoppingBag, MessageSquare, ChevronRight, CheckCircle2, User } from 'lucide-react';
import { HOT_DRAMAS, MALL_PRODUCTS } from '../constants';
import { motion } from 'motion/react';

// 1. 短剧详情页
export function DramaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isLive = searchParams.get('live') === 'true';
  const drama = HOT_DRAMAS.find(d => d.id === id) || HOT_DRAMAS[0];
  
  return (
    <div className="bg-[#FAF9F6] min-h-full pb-28">
      <Header title={isLive ? `正在直播：${drama.title}` : drama.title} dark />
      
      {/* 16:9 Poster Section */}
      <div className="w-full aspect-video relative overflow-hidden bg-black mt-2 shadow-sm">
        <img 
          src={drama.imageUrl} 
          alt={drama.title} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Live Overlay */}
        <div className="absolute top-4 left-6 flex items-center gap-2">
          {isLive && (
            <>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-red-600 text-white rounded text-[10px] font-black animate-pulse">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                LIVE
              </div>
              <div className="px-2 py-1 bg-black/40 backdrop-blur-md text-white/90 text-[10px] font-bold rounded">
                12,842 观看
              </div>
            </>
          )}
        </div>

        <div className="absolute bottom-4 left-6">
          <span className="px-3 py-1 bg-[#D4AF37] text-white text-[10px] font-black rounded-md uppercase tracking-wider">
            {isLive ? '拍摄现况' : '剧集详情'}
          </span>
        </div>

        {isLive && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white"
            >
              <Play size={32} fill="currentColor" className="ml-1" />
            </motion.button>
          </div>
        )}
      </div>
      
      <div className="px-6 mt-8">
        <div className="flex flex-col mb-8">
          <h1 className="text-[24px] font-black text-[#1A1108] leading-tight mb-3">
            {drama.title}
          </h1>
          <div className="flex items-center gap-2">
            {['都市', '霸道总裁', '逆袭'].map((tag, i) => (
              <span key={i} className="text-[12px] text-[#A69984] font-bold">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {isLive ? (
          <div className="bg-white dark:bg-[#2A1D0F] rounded-3xl p-5 border border-gray-50 shadow-sm mb-10">
            <h4 className="text-[14px] font-black text-[#1A1108] mb-3">直播动态</h4>
            <ul className="space-y-3">
              {[
                { time: '14:20', msg: '导演正在给演员讲戏' },
                { time: '14:15', msg: '第45场第2次拍摄准备中' },
                { time: '14:00', msg: '剧组午休结束，正式开工' },
              ].map((log, i) => (
                <li key={i} className="flex gap-3 text-[13px]">
                  <span className="text-[#D4AF37] font-black shrink-0">{log.time}</span>
                  <span className="text-[#4A443E] font-medium">{log.msg}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6 mb-10 py-6 border-y border-gray-100/50">
            <div className="text-center">
              <p className="text-[18px] font-black text-[#1A1108]">9.8</p>
              <p className="text-[11px] text-[#A69984] font-bold mt-1">综合评分</p>
            </div>
            <div className="text-center border-x border-gray-100/50">
              <p className="text-[18px] font-black text-[#1A1108]">1.2k</p>
              <p className="text-[11px] text-[#A69984] font-bold mt-1">意向投递</p>
            </div>
            <div className="text-center">
              <p className="text-[18px] font-black text-[#1A1108]">筹备中</p>
              <p className="text-[11px] text-[#A69984] font-bold mt-1">当前状态</p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <h3 className="text-[17px] font-black text-[#1A1108] mb-4 flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#D4AF37] rounded-full" />
              项目简介
            </h3>
            <p className="text-[15px] text-[#4A443E] leading-relaxed font-medium">
              这是一个讲述普通职员如何一步步逆袭成为商业巨头的故事。在遭遇背叛和打击后，主角凭借着惊人的毅力和智慧，在充满挑战的娱乐圈和商业圈中闯出了一片天地。本项目目前处于前期筹备阶段，已完成剧本大纲及前10集初稿，诚邀各方合作伙伴加盟。
            </p>
          </div>

          <div>
            <h3 className="text-[17px] font-black text-[#1A1108] mb-4 flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#D4AF37] rounded-full" />
              主创团队
            </h3>
            <div className="flex gap-4 items-center bg-white p-4 rounded-2xl border border-gray-50 shadow-sm">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-[14px] font-black text-[#1A1108]">张导演</p>
                <p className="text-[12px] text-[#A69984] font-bold">从业10年 · 执导作品累计播放10亿+</p>
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={() => navigate('/audition/registration')}
          className="w-full mt-12 h-14 bg-[#D4AF37] text-white font-black rounded-2xl shadow-xl shadow-yellow-500/10 active:scale-95 transition-all text-[15px]"
        >
          我要参加海选
        </button>
      </div>
    </div>
  );
}

// 2. 演员详情页
export function ActorDetail() {
  const { name } = useParams();
  const navigate = useNavigate();
  
  return (
    <div className="bg-[#FAF9F6] min-h-full pb-20">
      <Header title="演员详情" transparent dark />
      <div className="h-[400px] w-full relative -mt-24">
        <img src="https://images.unsplash.com/photo-1544208453-ca422f28b7e2?w=800" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-transparent to-transparent" />
      </div>

      <div className="mx-5 -mt-20 bg-white rounded-[40px] p-8 shadow-xl relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-[24px] font-black text-[#1A1108] mb-2">{name || '李子涵'}</h1>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-yellow-50 text-[#D4AF37] text-[11px] font-black rounded-lg">实力派</span>
              <span className="px-3 py-1 bg-blue-50 text-blue-500 text-[11px] font-black rounded-lg">百变戏路</span>
            </div>
          </div>
          <button className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-[#D4AF37] shadow-sm">
            <Share2 size={20} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-10 py-6 border-y border-gray-50">
          <div className="text-center">
            <p className="text-[18px] font-black text-[#1A1108]">168cm</p>
            <p className="text-[11px] text-[#A69984] font-bold mt-1">身高</p>
          </div>
          <div className="text-center">
            <p className="text-[18px] font-black text-[#1A1108]">48kg</p>
            <p className="text-[11px] text-[#A69984] font-bold mt-1">体重</p>
          </div>
          <div className="text-center">
            <p className="text-[18px] font-black text-[#1A1108]">双子座</p>
            <p className="text-[11px] text-[#A69984] font-bold mt-1">星座</p>
          </div>
        </div>

        <h3 className="text-[17px] font-black text-[#1A1108] mb-4">代表作品</h3>
        <div className="space-y-4">
          {HOT_DRAMAS.slice(0, 2).map((drama, i) => (
            <div key={i} className="flex gap-4 items-center bg-gray-50 p-4 rounded-2xl">
              <div className="w-12 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <img src={drama.imageUrl} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-[14px] font-black text-[#1A1108]">{drama.title}</h4>
                <p className="text-[11px] text-[#A69984] font-bold">饰：首席执行官</p>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={() => navigate('/audition/registration')}
          className="w-full mt-10 h-14 bg-[#8B6E4E] text-white font-black rounded-2xl shadow-lg active:scale-95 transition-all text-[15px]"
        >
          我要参加海选
        </button>
      </div>
    </div>
  );
}

// 3. 资讯详情页
export function PostDetail() {
  const { id } = useParams();
  
  return (
    <div className="bg-white min-h-full pb-20">
      <Header title="资讯详情" />
      <div className="p-8">
        <h1 className="text-[24px] font-black text-[#1A1108] leading-tight mb-6">
          中星短剧生态链战略发布会圆满成功：开启短剧3.0时代
        </h1>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-[#FAF5EE] flex items-center justify-center text-[#8B6E4E]">
            <User size={20} />
          </div>
          <div>
            <p className="text-[14px] font-black text-[#1A1108]">官方媒体中心</p>
            <p className="text-[12px] text-[#A69984] font-bold">2024-06-10 14:30</p>
          </div>
        </div>
        
        <div className="aspect-video rounded-3xl overflow-hidden mb-8 shadow-sm">
          <img src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800" alt="" className="w-full h-full object-cover" />
        </div>

        <div className="prose prose-sm max-w-none text-[#4A443E] leading-relaxed space-y-4 font-medium">
          <p>
            2024年6月10日，中星短剧生态链在深圳盐田基地成功举办了夏季战略发布会。本次发布会吸引了来自全国各地的影视制作人、导演、编剧以及投资者。
          </p>
          <p>
            发布会上，公司CEO宣布了“星链计划”，旨在通过整合全产业链资源，为短剧创作者提供从版权购买、拍摄制作到全球发行的全方位支持。
          </p>
          <p className="font-black text-[#1A1108] text-[16px] py-4">双轮驱动：内容与技术并重</p>
          <p>
            中星短剧将投入超过1亿元人民币用于精品内容的孵化。同时，平台还将引入AI辅助剧本创作和后期制作工具，大幅提升生产效率。
          </p>
        </div>
      </div>
      
      {/* Interaction Bar */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-8 h-12 flex items-center justify-between z-50">
        <div className="bg-white/90 backdrop-blur-md w-full h-full rounded-full border border-gray-100 flex items-center px-6 gap-6 shadow-lg">
          <div className="flex-1 text-gray-400 text-[13px] font-bold">写下你的看法...</div>
          <div className="flex gap-4 text-[#A69984]">
            <span className="flex items-center gap-1"><Heart size={18} /> 45</span>
            <span className="flex items-center gap-1"><MessageSquare size={18} /> 12</span>
            <Share2 size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. 商品详情页
export function ProductDetail() {
  const { id } = useParams();
  const product = MALL_PRODUCTS.find(p => p.id === id) || MALL_PRODUCTS[0];

  return (
    <div className="bg-[#FAF9F6] min-h-full pb-32">
      <Header title="商品详情" transparent dark />
      <div className="aspect-square w-full relative -mt-24">
        <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
      </div>

      <div className="mx-5 -mt-10 bg-white rounded-[40px] p-8 shadow-xl relative z-10">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[28px] font-black text-[#8B6E4E]">¥ {product.price}</span>
          <div className="flex items-center gap-1 text-[#D4AF37] bg-yellow-50 px-3 py-1.5 rounded-full text-[12px] font-black">
            <Star size={14} fill="currentColor" /> 热销排行 No.1
          </div>
        </div>
        <h1 className="text-[20px] font-black text-[#1A1108] mb-6 leading-tight">{product.title}</h1>
        
        <div className="space-y-4 mb-10">
          {[
            '全球限量发行，具有极高收藏价值',
            '匠心制作，品质保证',
            '下单即送品牌专属伴手礼'
          ].map((text, i) => (
            <div key={i} className="flex items-center gap-3 text-[13px] text-[#4A443E] font-bold">
              <CheckCircle2 size={18} className="text-[#D4AF37]" />
              {text}
            </div>
          ))}
        </div>

        <h3 className="text-[17px] font-black text-[#1A1108] mb-6">详情介绍</h3>
        <div className="prose prose-sm text-[#A69984] font-medium leading-relaxed mb-10">
          <p>这款中星短剧纪念周边，专为忠实影迷打造。采用高品质材料，每一个细节都经过精心雕琢，承载了整个生态链的文化内涵...</p>
        </div>

        <div className="flex gap-4 h-16">
          <button className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white border-2 border-gray-100 flex items-center justify-center text-[#1A1108] shadow-lg active:scale-95 transition-all">
            <ShoppingBag size={24} />
          </button>
          <button className="flex-1 h-16 bg-[#1A1108] text-white font-black rounded-2xl shadow-xl shadow-black/20 active:scale-95 transition-all text-[16px]">
            立即购买
          </button>
        </div>
      </div>
    </div>
  );
}
